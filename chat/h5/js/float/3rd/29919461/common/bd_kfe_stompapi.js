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
    // TODO: 3. 显示送达、已读状态
    // 防止重复订阅
    if (bd_kfe_data.subscribedTopics.indexOf(topic) !== -1) {
      return;
    }
    bd_kfe_data.subscribedTopics.push(topic);
    //
    bd_kfe_data.stompClient.subscribe("/topic/" + topic, function (message) {
      // console.log('message :', message, 'body:', message.body);
      var messageObject = JSON.parse(message.body);
      //
      if ((messageObject.type === "text"
          || messageObject.type === "image" 
          || messageObject.type === "file") 
          && messageObject.user.uid !== bd_kfe_data.uid // 区分非当前用户发送的消息
      ) {
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
        bd_kfe_stompapi.sendReceiptMessage(mid, "received");
        bd_kfe_stompapi.sendReceiptMessage(mid, "read");
        // 设置左上角头像为客服头像 和 昵称
        // TODO: 优化协议，避免每次收到消息都设置
        $('#byteDesk-agent-avatar').attr('src', messageObject.user.avatar);
        $('#byteDesk-agent-nickname').text(messageObject.user.nickname);
        $('#byteDesk-agent-description').text(messageObject.user.description);
        //
        if (bd_kfe_data.browserTabHidden) {
          document.title = "收到新客服消息";
        }
      } else if (messageObject.type === "notification_browse_invite") {
        bd_kfe_data.browseInviteBIid = messageObject.browseInvite.bIid;
        // 客服邀请您参加会话
        // bd_kfe_httpapi.acceptInviteBrowse();
        // bd_kfe_httpapi.rejectInviteBrowse();
      } else if (messageObject.type === "notification_queue") {
        // 排队
        // 1. 保存thread
        // bd_kfe_data.thread = messageObject.thread;
        // 2. 订阅会话消息
        // bd_kfe_stompapi.subscribeTopic(bd_kfe_data.threadTopic());
        // 防止会话超时自动关闭，重新标记本地打开会话
        bd_kfe_data.isThreadClosed = false;
      } else if (messageObject.type === "notification_queue_accept") {
        // 接入访客
        messageObject.createdAt = messageObject.timestamp;
        messageObject.content = messageObject.text.content;
        // // 1. 保存thread
        // bd_kfe_data.thread = messageObject.thread;
        // // 2. 订阅会话消息
        // bd_kfe_stompapi.subscribeTopic(bd_kfe_data.threadTopic());
        // // 防止会话超时自动关闭，重新标记本地打开会话
        bd_kfe_data.isThreadClosed = false;
      } else if (messageObject.type === "notification_invite_rate") {
        // 邀请评价
        messageObject.createdAt = messageObject.timestamp;
        messageObject.content = messageObject.extra.content;
        bd_kfe_data.isInviteRate = true;
        $("#byteDesk-main").hide();
        $("#byteDesk-leave").hide();
        $("#byteDesk-rate").show();
      } else if (messageObject.type === 'notification_rate_result') {
        // 访客评价结果
        messageObject.createdAt = messageObject.timestamp;
        messageObject.content = messageObject.extra.content;
      } else if (
        messageObject.type === "notification_agent_close" ||
        messageObject.type === "notification_auto_close"
      ) {
        // 新protobuf转换json
        messageObject.createdAt = messageObject.timestamp;
        messageObject.content = messageObject.text.content;
        // TODO: 会话关闭，添加按钮方便用户点击重新请求会话
        bd_kfe_data.isThreadClosed = true;
      } else if (messageObject.type === "notification_preview") {
        // 监听客服端输入状态
        if (messageObject.user.uid !== bd_kfe_data.uid) {
          bd_kfe_data.inputTipVisible = true;
          bd_kfe_utils.toggleInputTip(true);
          setTimeout(function () {
            bd_kfe_data.inputTipVisible = false;
            bd_kfe_utils.toggleInputTip(false);
          }, 5000);
        }
      } else if (messageObject.type === 'notification_receipt') {
        // {"mid":"45f9266c-c29d-a6e6-1c3a-f03677689993","type":"notification_receipt","user":{"uid":"201808221551193"},"status":"read"}
        // 消息状态：送达 received、已读 read
        if (messageObject.user.uid !== bd_kfe_data.uid) {
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
        // {"type":"notification_recall","mid":"ad58c6c9-acfd-23cf-52da-a2a0d2a30907","user":{"uid":"201808221551193"}}
        // TODO: 隐藏本条消息
        console.log('消息撤回:', messageObject.recall.mid);
        $("#content-" + messageObject.recall.mid).text('消息已撤回');
        // $("#other" + messageObject.mid).hide();
      }
      //
      if (
        messageObject.type !== "notification_preview" &&
        messageObject.type !== "notification_receipt" &&
        messageObject.type !== "notification_recall" &&
        messageObject.type !== "notification_connect" &&
        messageObject.type !== "notification_disconnect"
      ) {
        bd_kfe_data.isRobot = false;
        bd_kfe_utils.pushToMessageArray(messageObject);
        bd_kfe_utils.scrollToBottom();
      } else {
        
      }
      // and acknowledge it
      // FIXME: PRECONDITION_FAILED - unknown delivery tag 8
      // message.ack()
      // }, {ack: 'client'});
    });
  },
  // /**
  //  * 订阅一对一会话, 这里用来监听消息发送回执
  //  * 必须携带前缀 '/user/'
  //  */
  // subscribeQueue: function () {
  //   bd_kfe_data.stompClient.subscribe("/user/queue/ack", function (message) {
  //     // TODO: mid对应的消息成功发送到服务器, 也即发送成功, body: {"mid":"dc5bbafd-af4f-861b-3f6a-cdca4e82d31a"}
  //     console.log("ack body:", message.body);
  //   });
  // },
  /**
   * 输入框变化
   */
  onInputChange: function () {
    // 机器人对话的时候，无需发送输入状态
    if (bd_kfe_data.isRobot || bd_kfe_data.isThreadClosed) {
      return;
    }
    var localId = bd_kfe_utils.guid();
    var content = $.trim($("#byteDesk-input-textarea").val());
    var json = {
      "mid": localId,
      "timestamp": bd_kfe_utils.currentTimestamp(),
      "client": bd_kfe_data.client,
      "version": "1",
      "type": "notification_preview",
      "user": {
        "uid": bd_kfe_data.uid,
        "nickname": bd_kfe_data.thread.visitor.nickname,
        "avatar": bd_kfe_data.thread.visitor.avatar
      },
      "preview": {
        "content": content === undefined ? " " : content 
      },
      "thread": {
        "tid": bd_kfe_data.thread.tid,
        "type": bd_kfe_data.thread.type,
        // TODO: 根据内容类型设置不同, 如: [图片]
        "content": content,
        "nickname": bd_kfe_data.thread.visitor.nickname,
        "avatar": bd_kfe_data.thread.visitor.avatar,
        "topic": bd_kfe_data.threadTopic(),
        "timestamp": bd_kfe_utils.currentTimestamp(),
        "unreadCount": 0
      }
    };
    bd_kfe_data.stompClient.send(
      "/app/" + bd_kfe_data.threadTopic(), {},
      JSON.stringify(json)
    );
  },
  /**
   * 发送消息
   */
  sendTextMessage: function () {
    // 获取输入框内值
    var content = $.trim($("#byteDesk-input-textarea").val());
    if (content.length === 0) {
      return;
    }
    console.log('send text:', content);
    if (bd_kfe_data.isRobot) {
      //
      bd_kfe_httpapi.messageAnswer(content);
    } else {
      //
      if (bd_kfe_data.isThreadClosed) {
        alert("会话已经结束");
        return;
      }
      // TODO: 1. 本地显示发送状态，
      // TODO: 2. 待发送成功之后，隐藏状态
      var localId = bd_kfe_utils.guid();
      var message = {
        mid: localId,
        type: 'text',
        content: content,
        imageUrl: content,
        createdAt: bd_kfe_utils.currentTimestamp(),
        localId: localId,
        status: 'sending',
        user: {
          uid: bd_kfe_data.uid,
          username: bd_kfe_data.username,
          nickname: bd_kfe_data.nickname,
          avatar: bd_kfe_data.avatar
        }
      };
      bd_kfe_utils.pushToMessageArray(message);
      // 发送/广播会话消息
      var json = {
        "mid": localId,
        "timestamp": bd_kfe_utils.currentTimestamp(),
        "client": bd_kfe_data.client,
        "version": "1",
        "type": "text",
        "user": {
          "uid": bd_kfe_data.uid,
          "nickname": bd_kfe_data.thread.visitor.nickname,
          "avatar": bd_kfe_data.thread.visitor.avatar
        },
        "text": {
          "content": content
        },
        "thread": {
          "tid": bd_kfe_data.thread.tid,
          "type": bd_kfe_data.thread.type,
          // TODO: 根据内容类型设置不同, 如: [图片]
          "content": content,
          "nickname": bd_kfe_data.thread.visitor.nickname,
          "avatar": bd_kfe_data.thread.visitor.avatar,
          "topic": bd_kfe_data.threadTopic(),
          "timestamp": bd_kfe_utils.currentTimestamp(),
          "unreadCount": 0
        }
      };
      bd_kfe_data.stompClient.send("/app/" + bd_kfe_data.threadTopic(), {}, 
        JSON.stringify(json)
      );
    }
    // 清空输入框
    $("#byteDesk-input-textarea").val("");
  },
  sendImageMessage: function (imageUrl) {
    //
    if (bd_kfe_data.isRobot) {
      alert("自助服务暂不支持图片");
      return;
    } 
    //
    if (bd_kfe_data.isThreadClosed) {
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
        uid: bd_kfe_data.uid,
        username: bd_kfe_data.username,
        nickname: bd_kfe_data.nickname,
        avatar: bd_kfe_data.avatar
      }
    };
    bd_kfe_utils.pushToMessageArray(message);
    // 发送/广播会话消息
    var json = {
      "mid": localId,
      "timestamp": bd_kfe_utils.currentTimestamp(),
      "client": bd_kfe_data.client,
      "version": "1",
      "type": "image",
      "user": {
        "uid": bd_kfe_data.uid,
        "nickname": bd_kfe_data.thread.visitor.nickname,
        "avatar": bd_kfe_data.thread.visitor.avatar
      },
      "image": {
        "imageUrl": imageUrl
      },
      "thread": {
        "tid": bd_kfe_data.thread.tid,
        "type": bd_kfe_data.thread.type,
        "content": "[图片]",
        "nickname": bd_kfe_data.thread.visitor.nickname,
        "avatar": bd_kfe_data.thread.visitor.avatar,
        "topic": bd_kfe_data.threadTopic(),
        "timestamp": bd_kfe_utils.currentTimestamp(),
        "unreadCount": 0
      }
    };
    bd_kfe_data.stompClient.send("/app/" + bd_kfe_data.threadTopic(), {},
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
      "client": bd_kfe_data.client,
      "version": "1",
      "type": "notification_receipt",
      "user": {
        "uid": bd_kfe_data.uid,
        "nickname": bd_kfe_data.thread.visitor.nickname,
        "avatar": bd_kfe_data.thread.visitor.avatar
      },
      "receipt": {
        "mid": mid,
        "status": status
      },
      "thread": {
        "tid": bd_kfe_data.thread.tid,
        "type": bd_kfe_data.thread.type,
        // TODO: 根据内容类型设置不同, 如: [图片]
        // "content": content,
        "nickname": bd_kfe_data.thread.visitor.nickname,
        "avatar": bd_kfe_data.thread.visitor.avatar,
        "topic": bd_kfe_data.threadTopic(),
        "timestamp": bd_kfe_utils.currentTimestamp(),
        "unreadCount": 0
      }
    };
    bd_kfe_data.stompClient.send(
      "/app/" + bd_kfe_data.threadTopic(), {},
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
      "client": bd_kfe_data.client,
      "version": "1",
      "type": "notification_recall",
      "user": {
        "uid": bd_kfe_data.uid,
        "nickname": bd_kfe_data.thread.visitor.nickname,
        "avatar": bd_kfe_data.thread.visitor.avatar
      },
      "recall": {
        "mid": mid
      },
      "thread": {
        "tid": bd_kfe_data.thread.tid,
        "type": bd_kfe_data.thread.type,
        // TODO: 根据内容类型设置不同, 如: [图片]
        // "content": content,
        "nickname": bd_kfe_data.thread.visitor.nickname,
        "avatar": bd_kfe_data.thread.visitor.avatar,
        "topic": bd_kfe_data.threadTopic(),
        "timestamp": bd_kfe_utils.currentTimestamp(),
        "unreadCount": 0
      }
    };
    bd_kfe_data.stompClient.send(
      "/app/" + bd_kfe_data.threadTopic(), {},
      JSON.stringify(json)
    );
    // 收到消息后，向服务器发送回执
  },
  //
  sendBrowseMessage: function () {
    // 会话未关闭，进行中，直接返回
    if (!bd_kfe_data.isThreadClosed) {
      return;
    }
    var content = {
      referrer: encodeURI(document.referrer),
      url: encodeURI(window.location.href),
      title: encodeURI(document.title)
    };
    // 发送/广播会话消息
    var json = {
      "mid": bd_kfe_utils.guid(),
      "timestamp": bd_kfe_utils.currentTimestamp(),
      "client": bd_kfe_data.client,
      "version": "1",
      "type": "notification_notice",
      "user": {
        "uid": bd_kfe_data.uid,
        "nickname": bd_kfe_data.nickname,
        "avatar": bd_kfe_data.avatar
      },
      "notice": {
        "topic": window.adminUid,
        "type": "notification_browse",
        "content": JSON.stringify(content)
      }
    };
    bd_kfe_data.stompClient.send("/app/" + window.adminUid, {}, 
      JSON.stringify(json)
    );
    //
    setTimeout(function () {
      console.log("sendBrowseMessage...");
      bd_kfe_stompapi.sendBrowseMessage();
    }, 10000);
  },
  /**
   * http://docs.spring.io/spring/docs/current/spring-framework-reference/web.html#websocket-stomp-authentication
   */
  byteDeskConnect: function () {
    console.log('start stomp connection');
    var socket = new SockJS(
      bd_kfe_data.STOMP_HOST +
      "/stomp/?access_token=" +
      bd_kfe_data.passport.token.access_token
    );
    bd_kfe_data.stompClient = Stomp.over(socket);
    bd_kfe_data.stompClient.reconnect_delay = 1000;
    // client will send heartbeats every 10000ms, default 10000
    bd_kfe_data.stompClient.heartbeat.outgoing = 20000;
    // client does not want to receive heartbeats from the server, default 10000
    bd_kfe_data.stompClient.heartbeat.incoming = 20000;
    // to disable logging, set it to an empty function:
    // bd_kfe_data.stompClient.debug = function (value) {}
    // 连接bytedesk，如果后台开启了登录，需要登录之后才行
    bd_kfe_data.stompClient.connect({},
      function (frame) {
        // console.log('stompConnected: ' + frame + " username：" + frame.headers['user-name']);
        bd_kfe_data.isConnected = true;
        // bd_kfe_utils.updateConnection(true);
        // 订阅回执
        // bd_kfe_stompapi.subscribeQueue();
        // 获取 websocket 连接的 sessionId
        // FIXME: Uncaught TypeError: Cannot read property '1' of null
        bd_kfe_data.sessionId = /\/([^\/]+)\/websocket/.exec(socket._transport.url)[1];
        console.log("connected, session id: " + bd_kfe_data.sessionId + ", socket._transport.url:" + socket._transport.url);
        // 更新浏览记录
        bd_kfe_httpapi.browse()
        // 订阅会话消息，处理断开重连的情况
        bd_kfe_stompapi.subscribeTopic(bd_kfe_data.uid);
        if (
          bd_kfe_data.thread.topic !== null &&
          bd_kfe_data.thread.topic !== undefined
        ) {
          bd_kfe_stompapi.subscribeTopic(bd_kfe_data.threadTopic());
        }
        // 显示icon漂浮框
        if (document.getElementById("byteDesk-app-wrapper").style.display === 'none') {
          document.getElementById("byteDesk-start").style.display = '';
        }
        //
        // setTimeout(function () {
        //   console.log("sendBrowseMessage...");
        //   bd_kfe_stompapi.sendBrowseMessage();
        // }, 1000);
      },
      function (error) {
        console.log("连接断开【" + error + "】");
        bd_kfe_data.isConnected = false;
        // bd_kfe_utils.updateConnection(false);
        // 为断开重连做准备
        bd_kfe_data.subscribedTopics = [];
        // 10秒后重新连接，实际效果：每10秒重连一次，直到连接成功
        setTimeout(function () {
          console.log("reconnecting...");
          bd_kfe_stompapi.byteDeskConnect();
        }, 5000);
      }
    );
  }
};
