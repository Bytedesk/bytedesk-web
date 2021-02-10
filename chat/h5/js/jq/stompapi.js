/**
 * bytedesk.com
 */
/**
 * @apiDefine Message 消息
 *
 * 发送消息相关接口
 */
/**
 * @apiDefine ResponseResultSuccess
 * @apiSuccess {String} message 返回提示
 * @apiSuccess {Number} status_code 状态码
 * @apiSuccess {String} data 返回内容
 */
var stompapi = {
  /**
   * @api {} 长连接订阅主题
   * @apiName subscribeTopic
   * @apiGroup Message
   * @apiVersion 1.5.6
   * @apiPermission afterLogin
   * 
   * @apiParam {String} topic 订阅主题
   * 
   * @apiDescription 用户登录成功之后必须订阅相关主题才能接收到消息。
   * 其中：客服会话主题格式为：'thread.xxxx'，单聊主题格式为：'contact.xxx'，群聊主题格式为：'group.xxx'
   */
  subscribeTopic: function (topic) {
    // 防止重复订阅
    if (data.subscribedTopics.indexOf(topic) !== -1) {
      return;
    }
    data.subscribedTopics.push(topic);
    //
    data.stompClient.subscribe("/topic/" + topic, function (message) {
      // console.log('message :', message, 'body:', message.body);
      var messageObject = JSON.parse(message.body);
      if (messageObject.user.uid === data.uid) {
        return;
      }
      if (
        (messageObject.type === "text" 
        || messageObject.type === "image" 
        || messageObject.type === "file") 
        // && messageObject.user.uid !== data.uid
      ) {
        //
        // 新protobuf转换json
        messageObject.createdAt = messageObject.timestamp;
        if (messageObject.type === "text") {
          messageObject.content = messageObject.text.content;
        } else if (messageObject.type === "image") {
          messageObject.imageUrl = messageObject.image.imageUrl;
        }
        //
        var mid = messageObject.mid;
        // 发送消息回执：消息送达、消息已读
        stompapi.sendReceiptMessage(mid, "received");
        stompapi.sendReceiptMessage(mid, "read");
        //
        if (data.browserTabHidden) {
          document.title = "收到新客服消息";
        }
      } else if (messageObject.type === "notification_browse_invite") {
        data.browseInviteBIid = messageObject.browseInvite.bIid;
        // 客服邀请您参加会话
        // httpapi.acceptInviteBrowse();
        // httpapi.rejectInviteBrowse();
      } else if (messageObject.type === "notification_queue") {
        // 排队
      } else if (messageObject.type === "notification_queue_accept") {
        // 1. 保存thread
        data.thread = messageObject.thread;
        // 2. 订阅会话消息
        stompapi.subscribeTopic(data.threadTopic());
      } else if (messageObject.type === "notification_invite_rate") {
        // 邀请评价
        data.rateDialogVisible = true;
        data.isInviteRate = true;
        $("#byteDesk-chat").hide();
        $("#byteDesk-leave").hide();
        $("#byteDesk-rate").show();
      } else if (
        messageObject.type === "notification_agent_close" ||
        messageObject.type === "notification_auto_close"
      ) {
        //
        // 新protobuf转换json
        messageObject.createdAt = messageObject.timestamp;
        messageObject.content = messageObject.text.content;
        // TODO: 会话关闭，添加按钮方便用户点击重新请求会话
        data.isThreadClosed = true;
      } else if (messageObject.type === "notification_preview") {
        if (messageObject.user.username !== data.username) {
          data.inputTipVisible = true;
          bd_kfe_utils.toggleInputTip(true);
          setTimeout(function () {
            data.inputTipVisible = false;
            bd_kfe_utils.toggleInputTip(false);
          }, 5000);
        }
      } else if (messageObject.type === 'notification_receipt') {
        // 消息状态：送达 received、已读 read
        if (messageObject.user.uid !== data.uid) {
          console.log('消息状态：送达、已读');
          if ($("#status-" + messageObject.receipt.mid).text() == '已读') {
            return;
          }
          if (messageObject.receipt.status == 'received') {
            $("#status-" + messageObject.receipt.mid).text('送达');
          } else if (messageObject.receipt.status == 'read') {
            $("#status-" + messageObject.receipt.mid).text('已读');
          }
        }
      } else if (messageObject.type === 'notification_recall') {
        // TODO: 隐藏本条消息
        console.log('消息撤回:', messageObject.recall.mid);
        $("#content-" + messageObject.recall.mid).text('消息已撤回');
      }
      //
      if (
        messageObject.type !== "notification_preview" &&
        messageObject.type !== "notification_receipt" &&
        messageObject.type !== "notification_recall" &&
        messageObject.type !== "notification_connect" &&
        messageObject.type !== "notification_disconnect"
      ) {
        data.isRobot = false;
        bd_kfe_utils.pushMessage(messageObject);
        bd_kfe_utils.scrollToBottom();
      } else {
        // TODO: 监听客服端输入状态
      }
      // and acknowledge it
      // FIXME: PRECONDITION_FAILED - unknown delivery tag 8
      // message.ack()
      // }, {ack: 'client'});
    });
  },
  /**
   * 订阅一对一会话,
   * 必须携带前缀 '/user/'
   *
   * @param queue
   */
  // subscribeQueue: function (queue) {
  //   data.stompClient.subscribe("/user/queue/" + queue, function (message) {
  //     console.log(queue, ":", message, "body:", message.body);
  //   });
  // },
  /**
   * 输入框变化
   */
  onInputChange: function () {
    if (data.isRobot || data.isThreadClosed) {
      return;
    }
    var localId = bd_kfe_utils.guid();
    var content = $.trim($("#inputcontent").val());
    var json = {
      "mid": localId,
      "timestamp": bd_kfe_utils.currentTimestamp(),
      "client": data.client,
      "version": "1",
      "type": "notification_preview",
      "user": {
        "uid": data.uid,
        "nickname": data.thread.visitor.nickname,
        "avatar": data.thread.visitor.avatar
      },
      "preview": {
        "content": content === undefined ? " " : content 
      },
      "thread": {
        "tid": data.thread.tid,
        "type": data.thread.type,
        // TODO: 根据内容类型设置不同, 如: [图片]
        "content": content,
        "nickname": data.thread.visitor.nickname,
        "avatar": data.thread.visitor.avatar,
        "topic": data.threadTopic(),
        "timestamp": bd_kfe_utils.currentTimestamp(),
        "unreadCount": 0
      }
    };
    data.stompClient.send(
      "/app/" + data.threadTopic(), {},
      JSON.stringify(json)
    );
  },
  /**
   * 发送消息
   */
  sendTextMessage: function () {
    //
    var content = $.trim($("#inputcontent").val());
    if (content.length === 0) {
      return;
    }
    //
    if (data.isRobot) {
      httpapi.messageAnswer(content);
    } else {
      //
      if (data.isThreadClosed) {
        alert("会话已经结束");
        return;
      }
      var localId = bd_kfe_utils.guid();
      var message = {
        mid: localId,
        type: "text",
        content: content,
        imageUrl: content,
        createdAt: bd_kfe_utils.currentTimestamp(),
        localId: localId,
        status: 'sending',
        user: {
          uid: data.uid,
          username: data.username,
          nickname: data.username,
          avatar: 'https://chainsnow.oss-cn-shenzhen.aliyuncs.com/avatars/chrome_default_avatar.png'
        }
      }
      bd_kfe_utils.pushToMessageArray(message);
      // 发送/广播会话消息
      var json = {
        "mid": localId,
        "timestamp": bd_kfe_utils.currentTimestamp(),
        "client": data.client,
        "version": "1",
        "type": "text",
        "user": {
          "uid": data.thread.visitor.uid,
          "nickname": data.thread.visitor.nickname,
          "avatar": data.thread.visitor.avatar
        },
        "text": {
          "content": content
        },
        "thread": {
          "tid": data.thread.tid,
          "type": data.thread.type,
          // TODO: 根据内容类型设置不同, 如: [图片]
          "content": content,
          "nickname": data.thread.visitor.nickname,
          "avatar": data.thread.visitor.avatar,
          "topic": data.threadTopic(),
          "timestamp": bd_kfe_utils.currentTimestamp(),
          "unreadCount": 0
        }
      };
      data.stompClient.send("/app/" + data.threadTopic(), {},
        JSON.stringify(json)
      );
    }
    // 清空输入框
    $("#inputcontent").val("");
  },
  sendImageMessage: function (imageUrl) {
    //
    if (data.isRobot) {
      alert("自助服务暂不支持图片");
      return;
    } 
    //
    if (data.isThreadClosed) {
      alert("会话已经结束");
      return;
    }
    var localId = bd_kfe_utils.guid();
    var message = {
      mid: localId,
      type: 'image',
      content: imageUrl,
      imageUrl: imageUrl,
      createdAt: bd_kfe_utils.currentTimestamp(),
      localId: localId,
      status: 'sending',
      user: {
        uid: data.uid,
        username: data.username,
        nickname: data.username,
        avatar: 'https://chainsnow.oss-cn-shenzhen.aliyuncs.com/avatars/chrome_default_avatar.png'
      }
    };
    bd_kfe_utils.pushToMessageArray(message);
    // 发送/广播会话消息
    // stompapi.sendImageMessageSync(imageUrl);
    var json = {
      "mid": localId,
      "timestamp": bd_kfe_utils.currentTimestamp(),
      "client": data.client,
      "version": "1",
      "type": "image",
      "user": {
        "uid": data.uid,
        "nickname": data.thread.visitor.nickname,
        "avatar": data.thread.visitor.avatar
      },
      "image": {
        "imageUrl": imageUrl
      },
      "thread": {
        "tid": data.thread.tid,
        "type": data.thread.type,
        "content": "[图片]",
        "nickname": data.thread.visitor.nickname,
        "avatar": data.thread.visitor.avatar,
        "topic": data.threadTopic(),
        "timestamp": bd_kfe_utils.currentTimestamp(),
        "unreadCount": 0
      }
    };
    data.stompClient.send("/app/" + data.threadTopic(), {},
      JSON.stringify(json)
    );
  },
  /**
   * 消息回执：收到消息之后回复给消息发送方
   * 消息content字段存放status: 1. received, 2. read
   */
  sendReceiptMessage: function (mid, status) {
    var localId = bd_kfe_utils.guid();
    var json = {
      "mid": localId,
      "timestamp": bd_kfe_utils.currentTimestamp(),
      "client": data.client,
      "version": "1",
      "type": "notification_receipt",
      "user": {
        "uid": data.uid,
        "nickname": data.thread.visitor.nickname,
        "avatar": data.thread.visitor.avatar
      },
      "receipt": {
        "mid": mid,
        "status": status
      },
      "thread": {
        "tid": data.thread.tid,
        "type": data.thread.type,
        // TODO: 根据内容类型设置不同, 如: [图片]
        // "content": content,
        "nickname": data.thread.visitor.nickname,
        "avatar": data.thread.visitor.avatar,
        "topic": data.threadTopic(),
        "timestamp": bd_kfe_utils.currentTimestamp(),
        "unreadCount": 0
      }
    };
    data.stompClient.send(
      "/app/" + data.threadTopic(), {},
      JSON.stringify(json)
    );
    // 收到消息后，向服务器发送回执
  },
  /**
   * 消息撤回
   */
  sendRecallMessage: function (mid) {
    var localId = bd_kfe_utils.guid();
    var json = {
      "mid": localId,
      "timestamp": bd_kfe_utils.currentTimestamp(),
      "client": data.client,
      "version": "1",
      "type": "notification_recall",
      "user": {
        "uid": data.uid,
        "nickname": data.thread.visitor.nickname,
        "avatar": data.thread.visitor.avatar
      },
      "recall": {
        "mid": mid
      },
      "thread": {
        "tid": data.thread.tid,
        "type": data.thread.type,
        // TODO: 根据内容类型设置不同, 如: [图片]
        // "content": content,
        "nickname": data.thread.visitor.nickname,
        "avatar": data.thread.visitor.avatar,
        "topic": data.threadTopic(),
        "timestamp": bd_kfe_utils.currentTimestamp(),
        "unreadCount": 0
      }
    };
    data.stompClient.send(
      "/app/" + data.threadTopic(), {},
      JSON.stringify(json)
    );
    // 收到消息后，向服务器发送回执
  },
  /**
   * @api {} 建立长连接
   * @apiName byteDeskConnect
   * @apiGroup Message
   * @apiVersion 1.5.6
   * @apiPermission none
   * 
   * @apiDescription 建立长连接。长连接形式，不支持http请求。
   */
  byteDeskConnect: function () {
    console.log('start stomp connection');
    var socket = new SockJS(
      data.STOMP_HOST +
      "/stomp/?access_token=" +
      data.passport.token.access_token
    );
    data.stompClient = Stomp.over(socket);
    data.stompClient.reconnect_delay = 1000;
    // client will send heartbeats every 10000ms, default 10000
    data.stompClient.heartbeat.outgoing = 20000;
    // client does not want to receive heartbeats from the server, default 10000
    data.stompClient.heartbeat.incoming = 20000;
    // to disable logging, set it to an empty function:
    // data.stompClient.debug = function (value) {}
    // 连接bytedesk，如果后台开启了登录，需要登录之后才行
    data.stompClient.connect(
      {},
      function (frame) {
        // console.log('stompConnected: ' + frame + " username：" + frame.headers['user-name']);
        data.isConnected = true;
        bd_kfe_utils.updateConnection(true);
        // 获取 websocket 连接的 sessionId
        // FIXME: Uncaught TypeError: Cannot read property '1' of null
        // data.sessionId = /\/([^\/]+)\/websocket/.exec(socket._transport.url)[1];
        // console.log("connected, session id: " + data.sessionId);
        // // 更新浏览记录
        // httpapi.browse()
        // 订阅会话消息，处理断开重连的情况
        if (
          data.thread.tid !== null &&
          data.thread.tid !== undefined &&
          data.thread.tid !== ""
        ) {
          stompapi.subscribeTopic(data.threadTopic());
        }
        // 接受通知
        // stompapi.subscribeQueue('notification');
        // 订阅错误消息
        // stompapi.subscribeQueue('errors');
      },
      function (error) {
        console.log("连接断开【" + error + "】");
        data.isConnected = false;
        bd_kfe_utils.updateConnection(false);
        // 为断开重连做准备
        data.subscribedTopics = [];
        // 10秒后重新连接，实际效果：每10秒重连一次，直到连接成功
        setTimeout(function () {
          console.log("reconnecting...");
          stompapi.byteDeskConnect();
        }, 10000);
      }
    );
  }
};
