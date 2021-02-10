

var backUp = {

  /**
   * @api {get} /api/v2/answer/message 输入内容，请求智能答案V2
   * @apiName messageAnswerV2
   * @apiGroup Robot
   * @apiVersion 1.4.8
   * @apiPermission afterLogin
   * 
   * @apiParam {String} access_token 访问令牌
   * @apiParam {String} wid 工作组唯一wid, 当 type === 'appointed' 时，可设置为空 ''
   * @apiParam {String} type 区分工作组会话 'workGroup'、指定坐席会话 'appointed'
   * @apiParam {String} aid 指定客服uid, 只有当type === 'appointed'时有效, 当 type === 'workGroup' 时，可设置为空 ''
   * @apiParam {String} content 内容
   * @apiParam {String} client 固定写死为 'web'
   * 
   * @apiDescription 输入内容，请求智能答案V2
   *
   * @apiUse ResponseResultSuccess
   */
  messageAnswerV2: function (type, wid, aid, content) {
    $.ajax({
      url: data.HTTP_HOST +
      "/api/v2/answer/message",
      contentType: "application/json; charset=utf-8",
      type: "get",
      data: {
        type: type,
        wid: wid,
        aid: aid,
        content: content,
        client: data.client
      },
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + bd_kfe_data.passport.token.access_token);
      },
      success:function(response){
        console.log("message answer success v2:", response.data);
        if (response.status_code === 200) {
          // 正确匹配到答案
          var queryMessage = response.data.query;
          var replyMessage = response.data.reply;
          //
          // 答案中添加 '有帮助'、'无帮助'，访客点击可反馈答案是否有用
          //
          bd_kfe_utils.pushToMessageArray(queryMessage);
          // 包含’人工‘二字
          if (content.indexOf('人工') !== -1) {
            // 请求人工客服
            bd_kfe_httpapi.requestAgent()
          } else {
            bd_kfe_utils.pushRightAnswerToMessageArray(replyMessage);
          }
          //
          bd_kfe_utils.scrollToBottom();
        } else if (response.status_code === 201) {
          // 未匹配到答案
          var queryMessage = response.data.query;
          var replyMessage = response.data.reply;
          //
          // 回答内容中添加 '人工客服' 字样，访客点击可直接联系人工客服
          bd_kfe_utils.pushToMessageArray(queryMessage);
          // 包含’人工‘二字
          if (content.indexOf('人工') !== -1) {
            // 请求人工客服
            bd_kfe_httpapi.requestAgent()
          } else {
             bd_kfe_utils.pushNoAnswerToMessageArray(replyMessage);
          }
          //
          bd_kfe_utils.scrollToBottom();
        } else {
          alert(response.message);
        }
      },
      error: function(error) {
        console.log("query answers error:", error);
      }
    });
  },
  /**
   * @api {get} /proto/hello getProto
   * @apiName getProto
   * @apiGroup User
   * @apiVersion 1.5.6
   * @apiPermission afterLogin
   * 
   * @apiParam {String} access_token 访问令牌
   * 
   * @apiDescription test
   *
   * @apiUse ResponseResultSuccess
   */
  // getProto: function () {
  //   $.ajax({
  //     url: bd_kfe_data.HTTP_HOST + "/proto/hello",
  //     type: "get",
  //     // headers: {
  //     //     Accept: "application/x-protobuf"
  //     // },
  //     success:function(response){
  //       console.log("get proto success:", response);
  //       var helloData = proto.HelloData.deserializeBinary(bd_kfe_utils.str2bytes(response));
  //       console.log('helloData content: ', helloData.getContent());
  //     },
  //     error: function(error) {
  //       console.log("get proto error:", error);
  //     }
  //   });
  // },
  /**
   * @api {get} /proto/hello2 getProto2
   * @apiName getProto2
   * @apiGroup User
   * @apiVersion 1.5.6
   * @apiPermission afterLogin
   * 
   * @apiParam {String} access_token 访问令牌
   * @apiParam {String} content 内容
   * 
   * @apiDescription test
   *
   * @apiUse ResponseResultSuccess
   */
  // getProto2: function (content) {
  //   $.ajax({
  //     url: bd_kfe_data.HTTP_HOST +
  //     "/proto/hello2",
  //     type: "get",
  //     data: {
  //       content: content
  //     },
  //     // headers: {
  //     //   Accept: "application/x-protobuf"
  //     // },
  //     success:function(response){
  //       console.log("get proto2 success:", response);
  //       var helloData = proto.HelloData.deserializeBinary(bd_kfe_utils.str2bytes(response));
  //       console.log('helloData content: ', helloData.getContent());
  //     },
  //     error: function(error) {
  //       console.log("get proto2 error:", error);
  //     }
  //   });
  // },
  /**
   * @api {post} /proto/hello test
   * @apiName postProto
   * @apiGroup User
   * @apiVersion 1.4.7
   * @apiPermission afterLogin
   * 
   * @apiParam {String} content 内容
   * 
   * @apiDescription 
   *
   * @apiUse ResponseResultSuccess
   */
  // postProto: function (content) {
  //   var helloData = new proto.HelloData();
  //   helloData.setContent(content);
  //   //
  //   var bytes = helloData.serializeBinary();
  //   var blob = new Blob([bytes], { type: 'buffer' });
  //   $.ajax({
  //     url: bd_kfe_data.HTTP_HOST + "/proto/hello",
  //     contentType: "application/x-protobuf",
  //     type: "post",
  //     processData: false,
  //     data: blob,
  //     success:function(response){
  //       console.log("post proto: ", response);
  //       var helloData = proto.HelloData.deserializeBinary(bd_kfe_utils.str2bytes(response));
  //       console.log('helloData content: ', helloData.getContent());
  //     },
  //     error: function(error) {
  //       console.log('post proto error: ', error);
  //     }
  //   });
  // },
}