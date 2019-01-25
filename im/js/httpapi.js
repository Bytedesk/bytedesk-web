/**
 * bytedesk.com
 */
var httpapi = {

  /**
   * 注册
   * 实例：
   * httpapi.register('my_test_im', '昵称mytest', '123456', 'vip');
   * 
   * @param {*} username 用户名
   * @param {*} nickname 昵称
   * @param {*} password 密码
   * @param {*} subDomain 企业号: 测试期间固定写死为 ’vip‘
   */
  register: function(username, nickname, password, subDomain) {
    //
    $.ajax({
      url: data.HTTP_HOST + "/visitor/api/register/user",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      type: "post",
      data: JSON.stringify({
        username: username,
        nickname: nickname,
        password: password,
        subDomain: subDomain,
        client: data.client
      }),
      success:function(response) {
        console.log("register:", response.data);
      },
      error: function(error) {
        console.log(error);
      }
    });
  },

  /**
   * 登录:
   * 
   * 测试用户：
   * 用户名：test1、test2、...., test15
   * 密码：123456
   * 企业号：vip
   * 
   * @param {*} username 用户名
   * @param {*} password 密码
   * @param {*} subDomain 企业号
   */
  login: function () {
    //
    var subDomain = $("#subdomain").val();
    var username = $("#username").val();
    var password = $("#password").val();
    //
    data.username = username + "@" + subDomain;
    data.password = password;
    data.subDomain = subDomain;
    //
    httpapi.doLogin();
  },
  /**
   * 调用授权接口
   */
  doLogin: function () {
    console.log('do login: ', data.username, data.password);
    //
    $.ajax({
      url: data.HTTP_HOST + "/oauth/token",
      type: "post",
      data: { 
        "username": data.username,
        "password": data.password,
        "grant_type": "password",
        "scope": "all"
      },
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Basic Y2xpZW50OnNlY3JldA==');
      },
      success:function(response){
        console.log("login success: ", response);
        // 本地存储，
        data.passport.token = response;
        // 本地存储
        localStorage.username = data.username;
        localStorage.password = data.password;
        localStorage.subDomain = data.subDomain;
        // localStorage 存储
        localStorage.setItem(data.token, JSON.stringify(response));
        // TODO: 显示聊天窗口, 暂未启用
        utils.switchChat();
        // 初始化加载基本信息
        httpapi.init();
      },
      error: function(error) {
        console.log(error);
      }
    });
  },
  /**
   * 初始化加载基本信息: 1. 用户个人资料；2. 联系人；3.群组等
   * FIXME: 401报错自动清理本地存储access_token, 然后重新获取access_token
   */
  init: function() {
    console.log("init");
    $.ajax({
      url: data.HTTP_HOST +
      "/api/user/init?access_token=" +
      data.passport.token.access_token,
      type: "get",
      data: {
        client: data.client
      },
      success:function(response){
        console.log(response.data);
        // 用户信息
        var info = response.data.info
        utils.storeUserinfo(info);

        // 全部联系人
        var contacts = response.data.contacts
        // 本地存储
        utils.storeFriends(contacts);
        // 界面显示
        utils.appendTestUsers(contacts);

        // 群组
        var groups = response.data.groups
        utils.storeGroups(groups);

        // 用户工作组
        var workGroups = response.data.workGroups
        utils.storeWorkGroups(workGroups);

        // 用户会话
        var agentThreads = response.data.agentThreads
        utils.storeThreads(agentThreads);

        // 联系人会话
        var contactThreads = response.data.contactThreads
        utils.storeThreads(contactThreads);

        // 群组会话
        var groupThreads = response.data.groupThreads
        utils.storeGroups(groupThreads);

        // 排队
        var queues = response.data.queues
        utils.storeQueues(queues);

        // 建立长连接
        stompapi.byteDeskConnect()
      },
      error: function(xhr, textStatus, errorThrown){
        console.log(xhr, textStatus, errorThrown)
    　　if (xhr.status == 401) {
    　　　　console.log('is 401');
      　} else{
          console.log('other error')
    　　 }
  　　}
    });
  },

  /**
   * 退出登录
   */
  logout: function() {
    //
    $.ajax({
      url: data.HTTP_HOST +
      "/api/user/logout?access_token=" +
      data.passport.token.access_token,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      type: "post",
      data: JSON.stringify({
        client: data.client
      }),
      success:function(response){
        console.log("logout:", response.data);
        // 清空本地缓存
        localStorage.removeItem('access_token')
      },
      error: function(error) {
        console.log(error);
      }
    });
  },

  /**
   * 加载客服会话访客聊天记录
   * 
   * @param {*} uid 访客uid
   * @param {*} page 聊天记录起始页面，首页为0
   * @param {*} size 聊天记录每页消息条数，如：20
   */
  getMessages: function(uid, page, size) {
    $.ajax({
      url: data.HTTP_HOST +
      "/api/messages/user?access_token=" +
      data.passport.token.access_token,
      type: "get",
      data: {
        uid: uid,
        page: page,
        size: size,
        client: data.client
      },
      success:function(response){
        console.log("get user messages success:", response);
      },
      error: function(error) {
        console.log("get user messages error:", error);
      }
    });
  },

  /**
   * 加载一对一联系人消息
   * 
   * @param {*} cid 联系人uid
   * @param {*} page 聊天记录起始页面，首页为0
   * @param {*} size 聊天记录每页消息条数，如：20
   */
  getContactMessages: function(cid, page, size) {
    $.ajax({
      url: data.HTTP_HOST +
      "/api/messages/contact?access_token=" +
      data.passport.token.access_token,
      type: "get",
      data: {
        cid: cid,
        page: page,
        size: size,
        client: data.client
      },
      success:function(response){
        console.log("get contacts messages success:", response);
      },
      error: function(error) {
        console.log("get contacts messages error:", error);
      }
    });
  },

  /**
   * 加载群组消息
   * 
   * @param {*} gid 群组gid
   * @param {*} page 聊天记录起始页面，首页为0
   * @param {*} size 聊天记录每页消息条数，如：20
   */
  getGroupMessages: function(gid, page, size) {
    $.ajax({
      url: data.HTTP_HOST +
      "/api/messages/group?access_token=" +
      data.passport.token.access_token,
      type: "get",
      data: {
        gid: gid,
        page: page,
        size: size,
        client: data.client
      },
      success:function(response){
        console.log("get group messages success:", response);
      },
      error: function(error) {
        console.log("get group messages error:", error);
      }
    });
  },

  /**
   * 获取客服全部联系人
   */
  getContacts: function() {
    $.ajax({
      url: data.HTTP_HOST +
      "/api/user/contacts?access_token=" +
      data.passport.token.access_token,
      type: "get",
      data: {
        client: data.client
      },
      success:function(response){
        console.log("get contacts success:", response);
        var contacts = response.data
        // 界面显示
        utils.appendTestUsers(contacts);
      },
      error: function(error) {
        console.log("get contacts error:", error);
      }
    });
  },

  /**
   * 获取全部群组
   */
  getGroups: function() {
    $.ajax({
      url: data.HTTP_HOST +
      "/api/group/get?access_token=" +
      data.passport.token.access_token,
      type: "get",
      data: {
        client: data.client
      },
      success:function(response){
        console.log("get groups success:", response);
        var groups = response.data;
        utils.appendGroups(groups);
      },
      error: function(error) {
        console.log("get groups error:", error);
      }
    });
  },

  /**
   * 获取群组详情
   * 
   * @param {*} gid 群组唯一gid
   */
  getGroupDetail: function(gid) {
    $.ajax({
      url: data.HTTP_HOST +
      "/api/group/detail?access_token=" +
      data.passport.token.access_token,
      type: "get",
      data: {
        gid: gid,
        client: data.client
      },
      success:function(response){
        console.log("get group detail success:", response);
      },
      error: function(error) {
        console.log("get group detail error:", error);
      }
    });
  },

  /**
   * 获取群组全部成员
   * 
   * @param {*} gid 群组唯一gid
   */
  getGroupMembers: function(gid) {
    $.ajax({
      url: data.HTTP_HOST +
      "/api/group/members?access_token=" +
      data.passport.token.access_token,
      type: "get",
      data: {
        gid: gid,
        client: data.client
      },
      success:function(response){
        console.log("get group detail success:", response);
      },
      error: function(error) {
        console.log("get group detail error:", error);
      }
    });
  },

  /**
   * 创建群组
   * @param {*} nickname 群组昵称
   * @param {*} selectedContacts 群组成员uid数组，如 [1111, 2222, 3333]
   */
  createGroup: function(nickname, selectedContacts) {
    $.ajax({
      url: data.HTTP_HOST +
      "/api/group/create?access_token=" +
      data.passport.token.access_token,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      type: "post",
      data: JSON.stringify({
        nickname: nickname,
        selectedContacts: selectedContacts,
        client: data.client
      }),
      success:function(response){
        console.log("create group success: ", response);
      },
      error: function(error) {
        console.log("create group error: ", error);
      }
    });
  },

  /**
   * 更新群组: 群名称等
   * 
   * @param {string} gid 群组唯一gid
   * @param {string} nickname 群组新昵称
   */
  updateGroupNickname: function(gid, nickname) {
    $.ajax({
      url: data.HTTP_HOST +
      "/api/group/update/nickname?access_token=" +
      data.passport.token.access_token,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      type: "post",
      data: JSON.stringify({
        gid: gid,
        nickname: nickname,
        client: data.client
      }),
      success:function(response){
        console.log("update group nickname success: ", response);
      },
      error: function(error) {
        console.log("update group nickname error: ", error);
      }
    });
  },

  /**
   * 更新群组公告
   * @param {string} gid 群组唯一gid
   * @param {string} announcement 群组公告
   */
  updateGroupAnnouncement: function(gid, announcement) {
    $.ajax({
      url: data.HTTP_HOST +
      "/api/group/update/announcement?access_token=" +
      data.passport.token.access_token,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      type: "post",
      data: JSON.stringify({
        gid: gid,
        announcement: announcement,
        client: data.client
      }),
      success:function(response){
        console.log("update group announcement success: ", response);
      },
      error: function(error) {
        console.log("update group announcement error: ", error);
      }
    });
  },

  /**
   * 更新群组简介
   * @param {string} gid 群组唯一gid
   * @param {string} description 群简介
   */
  updateGroupDescription: function(gid, description) {
    $.ajax({
      url: data.HTTP_HOST +
      "/api/group/update/description?access_token=" +
      data.passport.token.access_token,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      type: "post",
      data: JSON.stringify({
        gid: gid,
        description: description,
        client: data.client
      }),
      success:function(response){
        console.log("update group description success: ", response);
      },
      error: function(error) {
        console.log("update group description error: ", error);
      }
    });
  },

  /**
   * 邀请/直接拉入群
   * @param {*} uid 被邀请人uid
   * @param {*} gid 群组唯一gid
   */
  inviteGroup: function(uid, gid) {
    $.ajax({
      url: data.HTTP_HOST +
      "/api/group/invite?access_token=" +
      data.passport.token.access_token,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      type: "post",
      data: JSON.stringify({
        gid: gid,
        uid: uid,
        client: data.client
      }),
      success:function(response){
        console.log("invite group success: ", response);
      },
      error: function(error) {
        console.log("invite group error: ", error);
      }
    });
  },

  /**
   * 主动申请入群
   * @param {string} gid 群组唯一gid
   */
  applyGroup: function(gid) {
    $.ajax({
      url: data.HTTP_HOST +
      "/api/group/apply?access_token=" +
      data.passport.token.access_token,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      type: "post",
      data: JSON.stringify({
        gid: gid,
        client: data.client
      }),
      success:function(response){
        console.log("apply group success: ", response);
      },
      error: function(error) {
        console.log("apply group error: ", error);
      }
    });
  },

  /**
   * 主动申请入群：同意
   * @param {*} nid 通知唯一nid
   */
  applyGroupApprove: function(nid) {
    $.ajax({
      url: data.HTTP_HOST +
      "/api/group/apply/approve?access_token=" +
      data.passport.token.access_token,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      type: "post",
      data: JSON.stringify({
        nid: nid,
        client: data.client
      }),
      success:function(response){
        console.log("apply group success: ", response);
      },
      error: function(error) {
        console.log("apply group error: ", error);
      }
    });
  },

  /**
   * 主动申请入群:拒绝
   * @param {*} nid 通知唯一nid
   */
  applyGroupDeny: function(nid) {
    $.ajax({
      url: data.HTTP_HOST +
      "/api/group/apply/deny?access_token=" +
      data.passport.token.access_token,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      type: "post",
      data: JSON.stringify({
        nid: nid,
        client: data.client
      }),
      success:function(response){
        console.log("apply group deny success: ", response);
      },
      error: function(error) {
        console.log("deny group error: ", error);
      }
    });
  },

  /**
   * 踢人
   * @param {string} gid 群组唯一gid
   * @param {string} uid 被踢用户唯一uid
   */
  kickGroupMember: function(gid, uid) {
    $.ajax({
      url: data.HTTP_HOST +
      "/api/group/kick?access_token=" +
      data.passport.token.access_token,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      type: "post",
      data: JSON.stringify({
        gid: gid,
        uid: uid,
        client: data.client
      }),
      success:function(response){
        console.log("kick group member success: ", response);
      },
      error: function(error) {
        console.log("kick group member error: ", error);
      }
    });
  },

  /**
   * 禁言
   * @param {*} gid 群组唯一gid
   * @param {*} uid 被禁言用户唯一uid
   */
  muteGroupMember: function(gid, uid) {
    $.ajax({
      url: data.HTTP_HOST +
      "/api/group/mute?access_token=" +
      data.passport.token.access_token,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      type: "post",
      data: JSON.stringify({
        gid: gid,
        uid: uid,
        client: data.client
      }),
      success:function(response){
        console.log("mute group success: ", response);
      },
      error: function(error) {
        console.log("mute group error: ", error);
      }
    });
  },

  /**
   * 移交群组
   * @param {string} gid 群组唯一gid
   * @param {string} uid 被移交用户uid
   */
  transferGroup: function(gid, uid) {
    $.ajax({
      url: data.HTTP_HOST +
      "/api/group/transfer?access_token=" +
      data.passport.token.access_token,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      type: "post",
      data: JSON.stringify({
        gid: gid,
        uid: uid,
        client: data.client
      }),
      success:function(response){
        console.log("transfer group success: ", response);
      },
      error: function(error) {
        console.log("transfer group error: ", error);
      }
    });
  },

  /**
   * 移交群组：同意
   * @param {*} nid 通知唯一nid
   */
  transferGroupApprove: function(nid) {
    $.ajax({
      url: data.HTTP_HOST +
      "/api/group/transfer/approve?access_token=" +
      data.passport.token.access_token,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      type: "post",
      data: JSON.stringify({
        nid: nid,
        client: data.client
      }),
      success:function(response){
        console.log("transfer group approve success: ", response);
      },
      error: function(error) {
        console.log("transfer group approve error: ", error);
      }
    });
  },

  /**
   * 移交群组: 拒绝
   * @param {string} nid 通知唯一nid
   */
  transferGroupDeny: function(nid) {
    $.ajax({
      url: data.HTTP_HOST +
      "/api/group/transfer/deny?access_token=" +
      data.passport.token.access_token,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      type: "post",
      data: JSON.stringify({
        nid: nid,
        client: data.client
      }),
      success:function(response){
        console.log("transfer group deny success: ", response);
      },
      error: function(error) {
        console.log("transfer group deny error: ", error);
      }
    });
  },

  /**
   * 退出群组
   * @param {string} gid 群组唯一gid
   */
  withdrawGroup: function(gid) {
    $.ajax({
      url: data.HTTP_HOST +
      "/api/group/withdraw?access_token=" +
      data.passport.token.access_token,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      type: "post",
      data: JSON.stringify({
        gid: gid,
        client: data.client
      }),
      success:function(response){
        console.log("withdraw group success: ", response);
      },
      error: function(error) {
        console.log("withdraw group error: ", error);
      }
    });
  },

  /**
   * 解散群组
   * @param {string} gid 群组唯一gid
   */
  dismissGroup: function(gid) {
    $.ajax({
      url: data.HTTP_HOST +
      "/api/group/dismiss?access_token=" +
      data.passport.token.access_token,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      type: "post",
      data: JSON.stringify({
        gid: gid,
        client: data.client
      }),
      success:function(response){
        console.log("dismiss group success: ", response);
      },
      error: function(error) {
        console.log("dismiss group error: ", error);
      }
    });
  },

  /**
   * 搜索过滤群组
   * @param {string} keyword 关键词
   */
  filterGroup: function(keyword) {
    $.ajax({
      url: data.HTTP_HOST +
      "/api/group/filter?access_token=" +
      data.passport.token.access_token,
      type: "get",
      data: {
        keyword: keyword,
        client: data.client
      },
      success:function(response){
        console.log("filter group success:", response);
      },
      error: function(error) {
        console.log("filter group error:", error);
      }
    });
  },

  /**
   * 获取关注
   * @param {int} page 起始页码，如：0
   * @param {int} size 每页大小，如：20
   */
  getFollows: function(page, size) {
    $.ajax({
      url: data.HTTP_HOST +
      "/api/user/follows?access_token=" +
      data.passport.token.access_token,
      type: "get",
      data: {
        page: page,
        size: size,
        client: data.client
      },
      success:function(response){
        console.log("get follows success:", response);
        var follows = response.data;
        utils.appendFollows(follows);
      },
      error: function(error) {
        console.log("get follows error:", error);
      }
    });
  },

  /**
   * 获取粉丝
   * @param {int} page 起始页码，如：0
   * @param {int} size 每页大小，如：20
   */
  getFans: function(page, size) {
    $.ajax({
      url: data.HTTP_HOST +
      "/api/user/fans?access_token=" +
      data.passport.token.access_token,
      type: "get",
      data: {
        page: page,
        size: size,
        client: data.client
      },
      success:function(response){
        console.log("get fans success:", response);
        var fans = response.data;
        utils.appendFans(fans);
      },
      error: function(error) {
        console.log("get fans error:", error);
      }
    });
  },

  /**
   * 获取好友
   * @param {int} page 起始页码，如：0
   * @param {int} size 每页大小，如：20
   */
  getFriends: function(page, size) {
    $.ajax({
      url: data.HTTP_HOST +
      "/api/user/friends?access_token=" +
      data.passport.token.access_token,
      type: "get",
      data: {
        page: page,
        size: size,
        client: data.client
      },
      success:function(response){
        console.log("get friends success:", response);
        var friends = response.data;
        utils.appendFriends(friends);
      },
      error: function(error) {
        console.log("get friends error:", error);
      }
    });
  },

  /**
   * 添加关注
   * @param {*} uid 用户唯一uid
   */
  addFollow: function(uid) {
    $.ajax({
      url: data.HTTP_HOST +
      "/api/user/follow?access_token=" +
      data.passport.token.access_token,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      type: "post",
      data: JSON.stringify({
        uid: uid,
        client: data.client
      }),
      success:function(response){
        console.log("addFollow success: ", response);
      },
      error: function(error) {
        console.log("addFollow error: ", error);
      }
    });
  },

  /**
   * 取消关注
   * @param {*} uid 用户唯一uid
   */
  unFollow: function(uid) {
    $.ajax({
      url: data.HTTP_HOST +
      "/api/user/unfollow?access_token=" +
      data.passport.token.access_token,
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      type: "post",
      data: JSON.stringify({
        uid: uid,
        client: data.client
      }),
      success:function(response){
        console.log("unfollow success: ", response);
      },
      error: function(error) {
        console.log("unfollow error: ", error);
      }
    });
  },

  /**
   * 判断是否关注
   * @param {*} uid 用户唯一uid
   */
  isFollowed: function(uid) {
    $.ajax({
      url: data.HTTP_HOST +
      "/api/user/isfollowed?access_token=" +
      data.passport.token.access_token,
      type: "get",
      data: {
        uid,
        client: data.client
      },
      success:function(response){
        console.log("isfollowed success:", response);
      },
      error: function(error) {
        console.log("isfollowed error:", error);
      }
    });
  },

  /**
   * 判断好友关系
   * @param {*} uid 用户唯一uid
   */
  getRelation: function(uid) {
    $.ajax({
      url: data.HTTP_HOST +
      "/api/user/relation?access_token=" +
      data.passport.token.access_token,
      type: "get",
      data: {
        uid,
        client: data.client
      },
      success:function(response){
        console.log("get relation success:", response);
      },
      error: function(error) {
        console.log("get relation error:", error);
      }
    });
  },

  /**
   * 分页获取拉黑访客
   * @param {int} page 起始页码，如：0
   * @param {int} size 每页大小，如：20
   */
  getBlocks: function(page, size) {
    $.ajax({
      url: data.HTTP_HOST +
      "/api/block/get?access_token=" +
      data.passport.token.access_token,
      type: "get",
      data: {
        page: page,
        size: size,
        client: data.client
      },
      success:function(response){
        console.log("get relation success:", response);
        var blocks = response.data;
        utils.appendBlocks(blocks);
      },
      error: function(error) {
        console.log("get relation error:", error);
      }
    });
  },

  /**
   * 添加黑名单
   * @param {*} uid 用户uid
   * @param {*} type 写死固定值：'默认类型'
   * @param {*} note 备注
   */
  addBlock: function(uid, type, note) {
    $.ajax({
      url: data.HTTP_HOST +
      "/api/block/add?access_token=" +
      data.passport.token.access_token,
      type: "get",
      data: {
        uid,
        type,
        note,
        client: data.client
      },
      success:function(response){
        console.log("isfollowed success:", response);
      },
      error: function(error) {
        console.log("isfollowed error:", error);
      }
    });
  },

  /**
   * 取消黑名单
   * @param {string} uid 用户uid
   */
  removeBlock: function(uid) {
    $.ajax({
      url: data.HTTP_HOST +
      "/api/block/remove?access_token=" +
      data.passport.token.access_token,
      type: "get",
      data: {
        uid,
        client: data.client
      },
      success:function(response){
        console.log("isfollowed success:", response);
      },
      error: function(error) {
        console.log("isfollowed error:", error);
      }
    });
  }

};

