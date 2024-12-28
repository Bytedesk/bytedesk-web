/**
 * bytedesk.com
 */
/**
 * @apiDefine Message 消息
 *
 * 发送消息相关
 */
var bd_kfe_stompapi = {
  /**
   * 必须添加前缀 '/topic/'
   * @param topic
   */
  subscribeTopic: function (topic) {
    // bd_kfe_utils.printLog("subscribeTopic:" + topic)
    // 防止重复订阅
    if (bd_kfe_data.subscribedTopics.indexOf(topic) !== -1) {
      return;
    }
    bd_kfe_data.subscribedTopics.push(topic);
    //
    bd_kfe_data.stompClient.subscribe("/topic/" + topic, function (message) {
      // bd_kfe_utils.printLog('message :', message, 'body:', message.body);
      console.log('topic:', topic, 'body:', message.body);
      var messageObject = JSON.parse(message.body);
      // 先插入本地
      bd_kfe_utils.pushToMessageArray(messageObject);
      // and acknowledge it
      // FIXME: PRECONDITION_FAILED - unknown delivery tag 8
      // message.ack()
      // }, {ack: 'client'});
    });
  },
  // 输入框变化
  onInputChange: function () {
    // 机器人对话的时候，无需发送输入状态
    if (bd_kfe_data.isRobot) {
      // TODO: 显示输入联想
      var content = $.trim($("#bytedesk_input_textarea").val());
      bd_kfe_httpapi.previewAnswer(content)
      return
    }
    if (bd_kfe_data.isThreadClosed) {
      return;
    }
    bd_kfe_stompapi.delaySendPreviewMessage()
  },
  sendFormMessage: function () {
    //
    var name = $.trim($("#bytedesk_form-name").val());
    var mobile = $.trim($("#bytedesk_form-mobile").val());
    var email = $.trim($("#bytedesk_form-email").val());
    var age = $.trim($("#bytedesk_form-age").val());
    var job = $.trim($("#bytedesk_form-job").val());
    if (age.length > 0 && isNaN(age)) {
      var langText = "年龄必须为数字"
      if (bd_kfe_data.lang === "en") {
        langText = "Age should be Number"
      }
      alert(langText);
      return;
    }
    //
    let formContent = JSON.stringify({
      'form': {
        'realname': name,
        'mobile': mobile,
        'email': email,
        'age': age,
        'job': job,
      }
    })
    var localId = bd_kfe_utils.guid();
    var json = {
      "uid": localId,
      "timestamp": bd_kfe_utils.currentTimestamp(),
      "client": bd_kfe_data.client,
      "version": "1",
      "type": "notification_form_result",
      "user": {
        "uid": bd_kfe_data.my_uid(),
        "username": bd_kfe_data.my_username(),
        "nickname": bd_kfe_data.my_nickname(),
        "avatar": bd_kfe_data.my_avatar(),
        "extra": {
          "agent": false
        }
      },
      "form": {
        "content": formContent
      },
      "thread": {
        "uid": bd_kfe_data.thread.uid,
        "type": bd_kfe_data.thread.type,
        "content": "[表单]",
        "nickname": bd_kfe_data.my_nickname(),
        "avatar": bd_kfe_data.my_avatar(),
        "topic": bd_kfe_data.threadTopic(),
        "client": bd_kfe_data.client,
        "timestamp": bd_kfe_utils.currentTimestamp(),
        "unreadCount": 0
      }
    };
    bd_kfe_stompapi.doSendMessage(json)
    // bd_kfe_data.stompClient.send(
    //   "/app/" + bd_kfe_data.threadTopic(), {},
    //   JSON.stringify(json)
    // );
    //
    bd_kfe_utils.showMessage()
    $("#bytedesk_form-name-div").hide();
    $("#bytedesk_form-mobile-div").hide();
    $("#bytedesk_form-email-div").hide();
    $("#bytedesk_form-age-div").hide();
    $("#bytedesk_form-job-div").hide();
  },
  sendBrowseMessage: function () {
  },
  sendCommodityMessageSync: function () {
  },
  appendCommodityInfo: function () {
  },
  commodityInfo: function () {
    //
    let commodity = {
      "id": bd_kfe_utils.getUrlParam("goods_id"),
      "title": bd_kfe_utils.getUrlParam("goods_title"),
      "content": bd_kfe_utils.getUrlParam("goods_content"),
      "price": bd_kfe_utils.getUrlParam("goods_price"),
      "url": bd_kfe_utils.getUrlParam("goods_url"),
      "imageUrl": bd_kfe_utils.getUrlParam("goods_imageUrl"),
      "categoryCode": bd_kfe_utils.getUrlParam("goods_categoryCode"),
      "type": "commodity"
    }
    return JSON.stringify(commodity)
  },
  // 发送预知消息
  sendPreviewMessage: function () {
  },
  sendTextMessage: function () {
    // 获取输入框内值
    var inputContent = $.trim($("#bytedesk_input_textarea").val());
    inputContent = bd_kfe_utils.escapeHTML(inputContent);
    if (inputContent.length === 0) {
      var langText = "消息不能为空"
      if (bd_kfe_data.lang === "en") {
        langText = "Message Should Not be Null"
      }
      alert(langText);
      return;
    }
    if (inputContent.length >= 500) {
      var langText = "消息长度太长，请分多次发送"
      if (bd_kfe_data.lang === "en") {
        langText = "Message Too Long"
      }
      alert(langText);
      return;
    }
    // bd_kfe_utils.printLog('send text:', inputContent);
    // if (bd_kfe_data.isRobot) {
    //   bd_kfe_httpapi.messageAnswer(inputContent);
    // } else {
    //   bd_kfe_stompapi.sendTextMessageSync(inputContent)
    // }
    // 发送/广播会话消息
		bd_kfe_stompapi.sendMessage(bd_kfe_data.MESSAGE_TYPE_TEXT, inputContent)
    // 清空输入框
    $("#bytedesk_input_textarea").val("");
  },
  sendImageMessage: function (content) {
    bd_kfe_stompapi.sendMessage(bd_kfe_data.MESSAGE_TYPE_IMAGE, content)
  },
  sendVoiceMessage: function (content) {
    bd_kfe_stompapi.sendMessage(bd_kfe_data.MESSAGE_TYPE_VOICE, content)
  },
  sendVideoMessage: function (content) {
    bd_kfe_stompapi.sendMessage(bd_kfe_data.MESSAGE_TYPE_VIDEO, content)
  },
  sendFileMessage: function (content) {
    bd_kfe_stompapi.sendMessage(bd_kfe_data.MESSAGE_TYPE_FILE, content)
  },
  sendReceiptMessage: function (uid, status) {
  },
  sendRecallMessage: function (uid) {
  },
  sendMessage(type, content) {
    //
    var messageExtra = {
      orgUid: bd_kfe_data.orgUid
    }
    var json = {
      "uid": bd_kfe_utils.guid(),
      "type": type,
      "content": content,
      "status": bd_kfe_data.MESSAGE_STATUS_SENDING,
      "createdAt": bd_kfe_utils.currentTimestamp(),
      "client": bd_kfe_data.HTTP_CLIENT,
      "extra": JSON.stringify(messageExtra),
      "user": {
        "uid": bd_kfe_data.uid,
        "nickname": bd_kfe_data.nickname,
        "avatar": bd_kfe_data.avatar
      },
      "thread": {
        "uid": bd_kfe_data.thread.uid,
        "topic": bd_kfe_data.thread.topic,
        "type": bd_kfe_data.thread.type,
        "state": bd_kfe_data.thread.state,
        "user": bd_kfe_data.thread.user
      }
    };
    bd_kfe_stompapi.doSendMessage(json);
  },
  // 发送消息
  doSendMessage: function (jsonObject) {
    console.log('doSendMessage:', jsonObject);
    //
    if (bd_kfe_data.isConnected) {
      // 发送长连接消息
      bd_kfe_data.stompClient.send("/app/" + bd_kfe_data.threadTopic(), {},
        JSON.stringify(jsonObject)
      );
    } else {
      // 调用rest接口发送消息
      bd_kfe_stompapi.sendRestMessage(JSON.stringify(jsonObject))
    }
    // 先插入本地
    bd_kfe_utils.pushToMessageArray(jsonObject);
  },
  // 在长连接断开的情况下，发送消息
  sendRestMessage: function (json) {
    $.ajax({
      url: bd_kfe_data.BASE_URL + "/visitor/api/v1/message/send",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      type: "post",
      data: JSON.stringify({ 
        json: json, 
        client: bd_kfe_data.HTTP_CLIENT
      }),
      success: function (response) {
        bd_kfe_utils.printLog(response)
        // 更新消息发送状态
        // bd_kfe_utils.printLog("send rest message: ", response.data);
        // let message = JSON.parse(response.data)
        // for (let i = app.messages.length - 1; i >= 0; i--) {
        //   const msg = app.messages[i]
        //   // bd_kfe_utils.printLog('uid:', msg.uid, message.uid)
        //   if (msg.uid === message.uid) {
        //     // 可更新顺序 read > received > stored > sending, 前面的状态可更新后面的
        //     if (app.messages[i].status === 'read' ||
        //       app.messages[i].status === 'received') {
        //       return
        //     }
        //     Vue.set(app.messages[i], 'status', 'stored')
        //     return;
        //   }
        // }
      },
      error: function (error) {
        bd_kfe_utils.printLog(error);
      }
    });
  },
  /**
   * http://docs.spring.io/spring/docs/current/spring-framework-reference/web.html#websocket-stomp-authentication
   */
  byteDeskConnect: function () {
    // bd_kfe_utils.printLog('start stomp connection');
    // var socket = new SockJS(bd_kfe_data.STOMP_SOCKJS_URL);
    // bd_kfe_data.stompClient = Stomp.over(socket);

    // https://jmesnil.net/stomp-websocket/doc/
    // https://github.com/pengjinning/stomp-websocket
    bd_kfe_data.stompClient = Stomp.client(bd_kfe_data.STOMP_WS_URL);
    bd_kfe_data.stompClient.reconnect_delay = 1000;
    // client will send heartbeats every 10000ms, default 10000
    bd_kfe_data.stompClient.heartbeat.outgoing = 20000;
    // client does not want to receive heartbeats from the server, default 10000
    bd_kfe_data.stompClient.heartbeat.incoming = 20000;
    // to disable logging, set it to an empty function:
    if (bd_kfe_data.IS_DEBUG) {
      bd_kfe_data.stompClient.debug = function (value) { }
    }
    // 连接bytedesk，如果后台开启了登录，需要登录之后才行
    bd_kfe_data.stompClient.connect({}, function (frame) {
      bd_kfe_utils.printLog('stompConnected: ' + frame + " username：" + frame.headers['user-name']);
      bd_kfe_data.isConnected = true;
      // bd_kfe_utils.updateConnection(true);
      // 订阅回执
      // bd_kfe_stompapi.subscribeQueue();
      // 获取 websocket 连接的 sessionId
      // socket._transport.url: ws://127.0.0.1:8000/stomp/817/3sycd2aj/websocket?access_token=xxx
      // bd_kfe_utils.printLog("socket._transport.url:" + socket._transport.url);
      // FIXME: Uncaught TypeError: Cannot read property '1' of null
      // var paths = /\/([^\/]+)\/websocket/.exec(socket._transport.url)
      // if (paths != null && paths.length > 1) {
      //   bd_kfe_data.sessionId = paths[1];
      //   // bd_kfe_utils.printLog("session id: " + bd_kfe_data.sessionId);
      // }
      // 更新浏览记录
      // bd_kfe_httpapi.browse()
      // 订阅会话消息，处理断开重连的情况
      bd_kfe_stompapi.subscribeTopic(bd_kfe_data.uid);
      if (
        bd_kfe_data.thread.topic !== "" &&
        bd_kfe_data.thread.topic !== null &&
        bd_kfe_data.thread.topic !== undefined
      ) {
        bd_kfe_stompapi.subscribeTopic(bd_kfe_data.threadTopic());
      }
      // 发送附言
      if (bd_kfe_data.preload !== "1") {
        // 非预加载
        if (bd_kfe_data.postscript !== null && bd_kfe_data.postscript !== undefined && bd_kfe_data.postscript !== '') {
          var postcontent = bd_kfe_data.postScriptPrefix + bd_kfe_data.postscript
          bd_kfe_stompapi.sendTextMessageSync(postcontent)
        }
      }
      //
      // setTimeout(function () {
      //   bd_kfe_utils.printLog("sendBrowseMessage...");
      //   bd_kfe_stompapi.sendBrowseMessage();
      // }, 10000);
    },
      function (error) {
        bd_kfe_utils.printLog("连接断开【" + error + "】");
        bd_kfe_data.isConnected = false;
        // 为断开重连做准备
        bd_kfe_data.subscribedTopics = [];
        // 10秒后重新连接，实际效果：每10秒重连一次，直到连接成功
        setTimeout(function () {
          bd_kfe_utils.printLog("reconnecting...");
          bd_kfe_stompapi.byteDeskConnect();
        }, 5000);
      }
    );
  },
};
