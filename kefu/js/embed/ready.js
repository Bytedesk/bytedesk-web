/**
 * client js
 * @version 1.2.0
 * @author www.bytedesk.com
 * @date 2018/11/12
 */
var kefu = {
  //
  created: function() {
    console.log('created');
    // 嵌入窗口形式
    data.adminUid = window.adminUid;
    data.workGroupWid = window.workGroupWid;
    data.subDomain = window.subDomain;
    data.type = window.type;
    data.agentUid = window.agentUid;
    //
    data.uid = localStorage.uid;
    data.username = localStorage.username;
    data.password = localStorage.password;
    if (data.password === undefined || data.password === null) {
      data.password = data.username;
    }
    var tokenLocal = localStorage.getItem(data.token);
    if (tokenLocal != null) {
      data.passport.token = JSON.parse(tokenLocal);
    }
    // TODO: 获取浏览器信息，提交给服务器
    console.log(
      "adminUid: " + data.adminUid + 
      " workGroupWid: " + data.workGroupWid + 
      " subDomain: " + data.subDomain
    );
  },
  mounted: function() {
    console.log('mounted');
    if (
      data.passport.token.access_token !== null &&
      data.passport.token.access_token !== undefined &&
      data.passport.token.access_token !== ""
    ) {
      httpapi.login();
    } else {
      httpapi.requestUsername();
    }
  }
};

(function () {
  // ie ajax cross domain requests
  $.support.cors = true;
  // 使ie支持startsWith
  if (!String.prototype.startsWith) {
    String.prototype.startsWith = function(searchString, position) {
       position = position || 0;
      return this.indexOf(searchString, position) === position;
    };
  }
  // 使ie支持includes
  if (!String.prototype.includes) {
    String.prototype.includes = function (str) {
      var returnValue = false;
      if (this.indexOf(str) !== -1) {
        returnValue = true;
      }
      return returnValue;
    }
  }
  // 屏幕宽度小于340的时候，隐藏右侧栏
  // console.log("window width: " + $(window).width())
  $('input[id=imagefile]').change(function(result) {
    console.log("upload:", $(this).val(), $(this));
    //
    var formdata = new FormData();
    formdata.append("file_name", utils.guid());
    formdata.append("username", data.username);
    formdata.append("file", $('input[id=imagefile]')[0].files[0]);
    formdata.append("client", data.client);
    //
    $.ajax({
      url: data.HTTP_HOST + "/visitor/api/upload/image",
      contentType: false,
      cache: false,
      processData: false,
      mimeTypes:"multipart/form-data",
      type: "post",
      data: formdata,
      success:function(response){
        console.log('upload response:', response.data)
        var imageUrl = response.data;
        stompapi.sendImageMessage(imageUrl);
      },
      error: function(error) {
        console.log(error);
      }
    });
  });
  //
  $('#byteDesk-start').click(function(){
    if (utils.isMobile()) {
      console.log('is mobile browser');
      window.open('http://www.xiaper.com');
    } else {
      console.log('is pc browser');
      document.getElementById("byteDesk-app-wrapper").style.display = '';
      document.getElementById("byteDesk-start").style.display = 'none';
      // TODO: 判断是否处于会话状态，如果没有，则请求会话
      if (data.thread.id === 0) {
        httpapi.requestThread();
      }
    }
  });
  $('#byteDesk-max').click(function(){
    // console.log('max');
    window.open(data.URL_ROOT_PATH + 'pc.html?uid=201808221551193&wid=201807171659201&type=workGroup&aid=&ph=ph')
  });
  $('#byteDesk-close').click(function(){
    document.getElementById("byteDesk-app-wrapper").style.display = 'none';
    document.getElementById("byteDesk-start").style.display = '';
  });
  $('#byteDesk-input-emoji').click(function(){
    utils.switchEmotion();
  });
  $('#byteDesk-upload-image').click(function(){
    utils.showUploadDialog();
  });
  $('#byteDesk-message-rate').click(function(){
    console.log('rate')
    $('#byteDesk-rate').show();
    $('#byteDesk-main').hide();
  });
  $('#byteDesk-rate-close').click(function(){
    $('#byteDesk-rate').hide();
    $('#byteDesk-main').show();
  });
  $('#byteDesk-leave-close').click(function(){
    $('#byteDesk-leave').hide();
    $('#byteDesk-main').show();
  });
  $('#byteDesk-input-pc-send').click(function(){
    console.log('send text message');
    stompapi.sendTextMessage();
  });
  //
  kefu.created();
  kefu.mounted();
})();