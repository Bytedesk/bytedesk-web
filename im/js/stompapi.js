/**
 * 
 */
var stompapi = {
  /**
   * 发送同步消息
   */
  sendTextMessageSync: function (content) {
    stompapi.sendMessageSync("text", content);
  },
  sendImageMessageSync: function (content) {
    stompapi.sendMessageSync("image", content);
  },
  sendMessageSync: function (type, content) {
    //
    var localId = utils.guid();
    $.ajax({
      url: data.HTTP_HOST +
      "/api/messages/send?access_token=" +
      data.passport.token.access_token,
      type: "post",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify({
        tid: data.thread.tid,
        type: type,
        content: content,
        status: "sending",
        localId: localId,
        sessionType: "thread",
        client: data.client
      }),
      success:function(response){
        console.log("sendMessageSync:" + response.data);
        if (response.status_code !== 200) {
          alert(response.message);
        }
      },
      error: function(error) {
        console.log(error);
      }
    });
  },
  /**
   * 必须添加前缀 '/topic/'
   * @param topic
   */
  subscribeTopic: function (topic) {
    // 防止重复订阅
    if (data.subscribedTopics.indexOf(topic) !== -1) {
      return;
    }
    data.subscribedTopics.push(topic);
    //
    data.stompClient.subscribe("/topic/" + topic, function (msg) {
      // console.log('message :', msg, 'body:', msg.body);
      var message = JSON.parse(msg.body)
      if (message.type === constants.MESSAGE_TYPE_TEXT ||
          message.type === constants.MESSAGE_TYPE_IMAGE ||
          message.type === constants.MESSAGE_TYPE_FILE
      ) {
        // 文本、图片消息 + 上线、离线消息
        if (message.thread.type === constants.THREAD_TYPE_THREAD) {
          // 客服会话
        } else if (message.thread.type === constants.THREAD_TYPE_CONTACT) {
          // 一对一消息, 广播，主页面监听
          // 不含自己发送的消息
          if (data.userInfo.uid !== message.user.uid) {
            var content = ''
            if (message.type === constants.MESSAGE_TYPE_TEXT) {
              content = message.content
            } else if (message.type === constants.MESSAGE_TYPE_IMAGE) {
              content = 'img[' + message.imageUrl + ']'
            }
            data.layim.getMessage({
              id: message.user.uid, // 接收者：消息的来源ID（如果是私聊，则是用户id，如果是群聊，则是群组id）
              username: message.user.realName, // 消息来源用户名
              avatar: message.user.avatar, // 消息来源用户头像
              type: 'friend', // 聊天窗口来源类型，从发送消息传递的to里面获取
              content: content, // 消息内容
              cid: 0, // 消息id，可不传。除非你要对消息进行一些操作（如撤回）
              mine: false, // 是否我发送的消息，如果为true，则会显示在右方
              fromid: message.user.uid, // 消息的发送者id（比如群组中的某个消息发送者），可用于自动解决浏览器多窗口时的一些问题
              timestamp: moment(message.createdAt).valueOf() // 服务端时间戳毫秒数。注意：如果你返回的是标准的 unix 时间戳，记得要 *1000
            })
          }
        } else if (message.thread.type === constants.THREAD_TYPE_GROUP) {
          // 群组消息, 广播，主页面监听
          if (data.userInfo.uid !== message.user.uid) {
            var content = ''
            if (message.type === constants.MESSAGE_TYPE_TEXT) {
              content = message.content
            } else if (message.type === constants.MESSAGE_TYPE_IMAGE) {
              content = 'img[' + message.imageUrl + ']'
            }
            data.layim.getMessage({
              id: message.gid, // 接收者：消息的来源ID（如果是私聊，则是用户id，如果是群聊，则是群组id）
              username: message.user.realName, // 消息来源用户名
              avatar: message.user.avatar, // 消息来源用户头像
              type: 'group', // 聊天窗口来源类型，从发送消息传递的to里面获取
              content: content, // 消息内容
              cid: 0, // 消息id，可不传。除非你要对消息进行一些操作（如撤回）
              mine: false, // 是否我发送的消息，如果为true，则会显示在右方
              fromid: message.user.uid, // 消息的发送者id（比如群组中的某个消息发送者），可用于自动解决浏览器多窗口时的一些问题
              timestamp: moment(message.createdAt).valueOf() // 服务端时间戳毫秒数。注意：如果你返回的是标准的 unix 时间戳，记得要 *1000
            })
          }
        }
      } 

    });
  },
  /**
   * 输入框变化
   */
  onInputChange: function () {
    var content = $.trim($("#inputcontent").val());
    data.stompClient.send(
      "/app/" + data.threadTopic(),
      {},
      JSON.stringify({
        type: "notification_preview",
        content: content,
        client: data.client
      })
    );
  },
  sendReceiptMessage: function (mid, status) {
    // 收到消息后，向服务器发送回执
    data.stompClient.send(
      "/app/" + data.threadTopic(),
      {},
      JSON.stringify({
        type: "notification_receipt",
        content: mid,
        status: status,
        client: data.client
      })
    );
  },
  /**
   * 发送联系人文本信息
   * var payload = { uid: '' content: '' }
   */
  sendContactTextMessage: function(payload) {
    var uid = payload.uid
    var content = payload.content
    var topic = 'contact.' + uid
    data.stompClient.send('/app/' + topic, {}, JSON.stringify({
      'type': constants.MESSAGE_TYPE_TEXT,
      'content': content,
      'localId': utils.guid(),
      'client': data.client}))
  },

  /**
   * 发送联系人图片消息
   * var payload = { uid: '' content: '' }
   */
  sendContactImageMessage: function(payload){
    var uid = payload.uid
    var imageUrl = payload.imageUrl
    var topic = 'contact.' + uid
    data.stompClient.send('/app/' + topic, {}, JSON.stringify({
      'type': constants.MESSAGE_TYPE_IMAGE,
      'imageUrl': imageUrl,
      'localId': utils.guid(),
      'client': data.client}))
  },

  /**
   * 发送联系人文件消息
   */
  sendContactFileMessage: function(payload) {
    var uid = payload.uid
    var fileUrl = payload.fileUrl
    var format = payload.format
    var topic = 'contact.' + uid
    data.stompClient.send('/app/' + topic, {}, JSON.stringify({
      'type': constants.MESSAGE_TYPE_FILE,
      'fileUrl': fileUrl,
      'format': format,
      'localId': utils.guid(),
      'client': data.client}))
  },

  /**
   * 发送自定义消息
   * var payload = { uid: '' content: '' }
   */
  sendContactCustomMessage: function(payload){
    var uid = payload.uid
    var content = payload.content
    var topic = 'contact.' + uid
    data.stompClient.send('/app/' + topic, {}, JSON.stringify({
      'type': constants.MESSAGE_TYPE_CUSTOM,
      'content': content,
      'localId': utils.guid(),
      'client': data.client}))
  },

  /**
   * 发送群组文本信息
   * var payload = { uid: '' content: '' }
   */
  sendGroupTextMessage: function(payload) {
    var uid = payload.uid
    var content = payload.content
    var topic = 'group.' + uid
    data.stompClient.send('/app/' + topic, {}, JSON.stringify({
      'type': constants.MESSAGE_TYPE_TEXT,
      'content': content,
      'localId': utils.guid(),
      'client': data.client}))
  },

  /**
   * 发送群组图片消息
   * var payload = { uid: '' content: '' }
   */
  sendGroupImageMessage: function(payload) {
    var uid = payload.uid
    var imageUrl = payload.imageUrl
    var topic = 'group.' + uid
    data.stompClient.send('/app/' + topic, {}, JSON.stringify({
      'type': constants.MESSAGE_TYPE_IMAGE,
      'imageUrl': imageUrl,
      'localId': utils.guid(),
      'client': data.client}))
  },

  /**
   * 发送群组文件消息
   */
  sendGroupFileMessage: function(payload) {
    var uid = payload.uid
    var fileUrl = payload.fileUrl
    var format = payload.format
    var topic = 'group.' + uid
    data.stompClient.send('/app/' + topic, {}, JSON.stringify({
      'type': constants.MESSAGE_TYPE_FILE,
      'fileUrl': fileUrl,
      'format': format,
      'localId': utils.guid(),
      'client': data.client}))
  },

  /**
   * 发送自定义消息
   * var payload = { uid: '' content: '' }
   */
  sendGroupCustomMessage: function(payload) {
    var uid = payload.uid
    var content = payload.content
    var topic = 'group.' + uid
    data.stompClient.send('/app/' + topic, {}, JSON.stringify({
      'type': constants.MESSAGE_TYPE_CUSTOM,
      'content': content,
      'localId': utils.guid(),
      'client': data.client}))
  },
  /**
   * 建立长连接
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
        utils.updateConnection(true);
        // 获取 websocket 连接的 sessionId
        // FIXME: Uncaught TypeError: Cannot read property '1' of null
        // var sessionId = /\/([^\/]+)\/websocket/.exec(socket._transport.url)[1];
        // console.log("connected, session id: " + sessionId);

        // 订阅公司信息
        var subDomainTopic = 'subDomain.' + data.userInfo.subDomain
        stompapi.subscribeTopic(subDomainTopic)

        // 订阅工作组消息
        var workGroups = data.workGroups
        for (var i = 0; i < workGroups.length; i++) {
          var workGroup = workGroups[i]
          // 工作组会话
          var topic = 'workGroup.' + workGroup.wid
          stompapi.subscribeTopic(topic)
        }

        // 添加订阅群组会话topic
        var groups = data.groups
        for (var i = 0; i < groups.length; i++) {
          const group = groups[i]
          var topicGroup = 'group.' + group.gid
          stompapi.subscribeTopic(topicGroup)
        }

        // 订阅会话thread
        var threads = data.threads
        for (var j = 0; j < threads.length; j++) {
          var thread = threads[j]
          var topic = 'thread.' + thread.tid
          stompapi.subscribeTopic(topic)
        }
        
        // 订阅同事消息
        var topic = 'contact.' + data.userInfo.uid
        stompapi.subscribeTopic(topic)
        // 订阅个人消息, 因为可能同时登录多个客户端，所以也是订阅topic...
        topic = 'user.' + data.userInfo.uid
        stompapi.subscribeTopic(topic)
        
        // 使用layim作为演示UI, 初始化layim界面
        layim.initIM();
      },
      function (error) {
        console.log("连接断开【" + error + "】");
        data.isConnected = false;
        utils.updateConnection(false);
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
