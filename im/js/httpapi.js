/**
 * bytedesk.com
 */
var httpapi = {

  /**
   * 注册
   * @param {*} username 用户名
   * @param {*} password 密码
   * @param {*} subDomain 企业号
   */
  register: function(username, password, subDomain) {
    //
    $.ajax({
      url: data.HTTP_HOST + "/api/visitor/register/user",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      type: "post",
      data: JSON.stringify({
        username: username,
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
   * 201901171638181
   */
  doLogin: function () {
    console.log('do login: ', data.username, data.password);
    //
    $.ajax({
      url: data.HTTP_HOST + "/oauth/token",
      // contentType: "application/json; charset=utf-8",
      // dataType: "json",
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
        utils.storeFriends(contacts);

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
  }


};

