/**
 * bytedesk.com
 */
var im = {
  /**
   * 从localStorage加载历史缓存数据
   */
  created: function() {
    console.log("created");
    //
    data.uid = localStorage.uid;
    data.username = localStorage.username;
    data.password = data.username;
    var tokenLocal = localStorage.getItem(data.token);
    if (tokenLocal != null) {
      data.passport.token = JSON.parse(tokenLocal);
    }

  },
  /**
   * 通过缓存判断是否需要登录
   */
  mounted: function() {
    console.log("mount");
    if (
      data.passport.token.access_token !== null &&
      data.passport.token.access_token !== undefined &&
      data.passport.token.access_token !== ""
    ) {
      // 之前登录过，初始化数据：加载好友
      httpapi.init();
      
    } else {
      // 提示需要登录
      utils.switchLogin()
    }
  }
  
};

/**
 * 
 */
$(document).ready(function () {
  // ie Ajax cross domain requests
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
  // 上传并发送图片
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
  im.created();
  im.mounted();
});
