/**
 * client js
 * @version 1.2.0
 * @author www.bytedesk.com
 * @date 2018/11/12
 */
var bd_kfe_kefu = {
  //
  created: function() {
    // 嵌入窗口形式
    bd_kfe_data.adminUid = window.adminUid;
    bd_kfe_data.workGroupWid = window.workGroupWid;
    bd_kfe_data.subDomain = window.subDomain;
    bd_kfe_data.type = window.type;
    bd_kfe_data.agentUid = window.agentUid;
    //
    bd_kfe_data.uid = localStorage.bd_kfe_uid;
    bd_kfe_data.username = localStorage.bd_kfe_username;
    bd_kfe_data.nickname = localStorage.bd_kfe_nickname;
    bd_kfe_data.password = bd_kfe_data.username;
  },
  mounted: function() {
    if (
      bd_kfe_data.username !== null &&
      bd_kfe_data.username !== undefined &&
      bd_kfe_data.username !== ""
    ) {
      bd_kfe_httpapi.login();
    } else {
      bd_kfe_httpapi.requestUsername();
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
    };
  }
  // 屏幕宽度小于340的时候，隐藏右侧栏
  // console.log("window width: " + $(window).width())
  $('input[id=imagefile]').change(function(result) {
    console.log("upload:", $(this).val(), $(this));
    //
    var formdata = new FormData();
    formdata.append("file_name", bd_kfe_utils.guid());
    formdata.append("username", bd_kfe_data.username);
    formdata.append("file", $('input[id=imagefile]')[0].files[0]);
    formdata.append("client", bd_kfe_data.client);
    //
    $.ajax({
      url: bd_kfe_data.HTTP_HOST + "/visitor/api/upload/image",
      contentType: false,
      cache: false,
      processData: false,
      mimeTypes:"multipart/form-data",
      type: "post",
      data: formdata,
      success:function(response){
        console.log('upload response:', response.data)
        var imageUrl = response.data;
        bd_kfe_stompapi.sendImageMessage(imageUrl);
      },
      error: function(error) {
        console.log(error);
      }
    });
  });
  $('input[id=filefile]').change(function(result) {
    console.log("upload file:", $(this).val(), $(this));
    //
    var formdata = new FormData();
    formdata.append("file_name", bd_kfe_utils.guid());
    formdata.append("username", bd_kfe_data.username);
    formdata.append("file", $('input[id=filefile]')[0].files[0]);
    formdata.append("client", bd_kfe_data.client);
    //
    $.ajax({
      url: bd_kfe_data.HTTP_HOST + "/visitor/api/upload/file",
      contentType: false,
      cache: false,
      processData: false,
      mimeTypes:"multipart/form-data",
      type: "post",
      data: formdata,
      success:function(response){
        console.log('upload response:', response.data)
        var fileUrl = response.data;
        bd_kfe_stompapi.sendFileMessage(fileUrl);
      },
      error: function(error) {
        console.log(error);
      }
    });
  });
  //
  $('#byteDesk-start').click(function(){
    if (bd_kfe_utils.isMobile()) {
      console.log('is mobile browser');
      window.open(bd_kfe_data.URL_ROOT_PATH + 'chat?sub=' + window.subDomain + '&uid=' + window.adminUid + '&wid=' + window.workGroupWid + '&type=' + window.type + '&aid=' + window.agentUid + '&ph=ph');
    } else {
      console.log('is pc browser');
      document.getElementById("byteDesk-app-wrapper").style.display = '';
      document.getElementById("byteDesk-start").style.display = 'none';
      // TODO: 判断是否处于会话状态，如果没有，则请求会话
      if (bd_kfe_data.thread.id === 0) {
        bd_kfe_httpapi.requestThread();
      }
    }
  });
  $('#byteDesk-max').click(function(){
    // window.open(bd_kfe_data.URL_ROOT_PATH + 'chatjq?sub=' + window.subDomain + '&uid=' + window.adminUid + '&wid=' + window.workGroupWid + '&type=' + window.type + '&aid=' + window.agentUid + '&ph=ph');
    window.open(bd_kfe_data.URL_ROOT_PATH + 'chat?sub=' + window.subDomain + '&uid=' + window.adminUid + '&wid=' + window.workGroupWid + '&type=' + window.type + '&aid=' + window.agentUid + '&ph=ph');
  });
  $('#byteDesk-minus').click(function(){
    document.getElementById("byteDesk-app-wrapper").style.display = 'none';
    document.getElementById("byteDesk-start").style.display = '';
  });
  $('#byteDesk-close').click(function(){
    document.getElementById("byteDesk-app-wrapper").style.display = 'none';
    document.getElementById("byteDesk-start").style.display = '';
  });
  $('#byteDesk-input-emoji').click(function(){
    bd_kfe_utils.switchEmotion();
  });
  $('#byteDesk-jietu').click(function(){
    alert('直接使用QQ/微信截图，Ctrl+V粘贴到输入框，即可直接发送截图')
  });
  $('#byteDesk-upload-image').click(function(){
    bd_kfe_utils.showUploadImageDialog();
  });
  $('#byteDesk-upload-file').click(function(){
    bd_kfe_utils.showUploadFileDialog();
  });
  $('#byteDesk-message-rate').click(function(){
    console.log('rate');
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
    bd_kfe_stompapi.sendTextMessage();
  });
  $('#byteDesk-input-mobile-send-btn').click(function() {
    console.log('collect mobile');
    bd_kfe_httpapi.sendMobile();
  });
  //
  // 监听浏览器显示或隐藏当前页面
  bd_kfe_data.browserTitle = document.title;
  document.addEventListener('visibilitychange', function(){
    if (document.visibilityState === 'hidden') {
      bd_kfe_data.browserTabHidden = true
    } else if (document.visibilityState === 'visible') {
      bd_kfe_data.browserTabHidden = false;
      document.title = bd_kfe_data.browserTitle;
    }
  })
  // 监听输入框粘贴图片，支持qq、微信等截图
  document.getElementById( 'byteDesk-input-textarea' ).addEventListener('paste', function( e ){
    // 添加到事件对象中的访问系统剪贴板的接口
    var clipboardData = e.clipboardData,
        i = 0,
        items, item, types;
    if( clipboardData ){
        items = clipboardData.items;
        if( !items ){
            return;
        }
        item = items[0];
        // 保存在剪贴板中的数据类型
        types = clipboardData.types || [];
        for( ; i < types.length; i++ ){
            if( types[i] === 'Files' ){
                item = items[i];
                break;
            }
        }
        // 判断是否为图片数据
        if( item && item.kind === 'file' && item.type.match(/^image\//i) ){
          bd_kfe_utils.imgReader( item );
        }
    }
  });
  //
  bd_kfe_kefu.created();
  bd_kfe_kefu.mounted();
  // for testing
  // bd_kfe_httpapi.getProto2('javascript test get content');
  // bd_kfe_httpapi.postProto('javascript test post content');
})();