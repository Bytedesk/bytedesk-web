/**
 * bytedesk.com
 */
var bd_kfe_utils = {
  //
  switchEmoji: function() {
    if (!bd_kfe_data.disabled) {
      bd_kfe_data.show_emoji = !bd_kfe_data.show_emoji;
    }
  },
  switchAgent: function() {
    bd_kfe_data.showLeaveMessage = false;
    $("#byteDesk-main").show();
    $("#byteDesk-leave").hide();
    $("#byteDesk-rate").hide();
    bd_kfe_data.isRobot = false;
    bd_kfe_httpapi.requestThread();
  },
  switchLeaveMessage: function() {
    console.log("switch leave message");
    bd_kfe_data.showLeaveMessage = true;
    $("#byteDesk-main").hide();
    $("#byteDesk-leave").show();
    $("#byteDesk-rate").hide();
  },
  hideLeaveMessage: function() {
    bd_kfe_data.showLeaveMessage = false;
    $("#byteDesk-main").show();
    $("#byteDesk-leave").hide();
  },
  switchForm: function () {
    $("#byteDesk-main").hide();
    $("#byteDesk-leave").hide();
    $("#byteDesk-rate").hide();
    $("#byteDesk-form").show();
  },
  showMessage: function() {
    $("#byteDesk-main").show();
    $("#byteDesk-form").hide();
    $("#byteDesk-leave").hide();
    $("#byteDesk-rate").hide();
  },
  switchRobot: function() {
    console.log("switch robot");
    bd_kfe_data.showLeaveMessage = false;
    $("#byteDesk-main").show();
    $("#byteDesk-leave").hide();
    $("#byteDesk-rate").hide();
    bd_kfe_data.isRobot = true;
    bd_kfe_httpapi.requestRobot();
  },
  switchEmotion: function() {
    console.log("switch emotion");
    bd_kfe_data.show_emoji = !bd_kfe_data.show_emoji;
    if (bd_kfe_data.show_emoji) {
      $("#byteDesk-input-emoji-box").show();
      console.log('show')
    } else {
      $("#byteDesk-input-emoji-box").hide();
      console.log('hide')
    }
  },
  switchRate: function() {
    console.log("switch rate");
    // bd_kfe_data.rateDialogVisible = true;
    $("#byteDesk-main").hide();
    $("#byteDesk-leave").hide();
    $("#byteDesk-rate").show();
  },
  hideRate: function() {
    // bd_kfe_data.rateDialogVisible = false;
    $("#byteDesk-main").show();
    $("#byteDesk-rate").hide();
  },
  showUploadImageDialog: function() {
    console.log("show upload dialog");
    if (bd_kfe_data.isRobot) {
      alert("自助服务暂不支持图片");
      return;
    }
    if (bd_kfe_data.isThreadClosed) {
      alert("会话已经结束");
      return;
    }
    $('input[id=imagefile]').click();
  },
  showUploadFileDialog: function() {
    console.log("show upload dialog");
    if (bd_kfe_data.isRobot) {
      alert("自助服务暂不支持图片");
      return;
    }
    if (bd_kfe_data.isThreadClosed) {
      alert("会话已经结束");
      return;
    }
    $('input[id=filefile]').click();
  },
  clearMessages: function() {
    console.log("clearMessages");
  },
  emotionUrl: function(file) {
    return bd_kfe_data.emojiBaseUrl + file;
  },
  // emotionClicked: function(emotion) {
  //   bd_kfe_data.inputContent += emotion;
  //   bd_kfe_data.show_emoji = false;
  // },
  imageClicked: function(imageUrl) {
    // console.log('image clicked:', imageUrl)
    bd_kfe_data.currentImageUrl = imageUrl;
    window.open(imageUrl);
    // bd_kfe_data.imageDialogVisible = true;
  },
  fileClicked: function(fileUrl) {
    window.open(fileUrl);
  },
  voiceClicked: function(voiceUrl) {
    bd_kfe_data.currentVoiceUrl = voiceUrl;
    window.open(voiceUrl);
  },
  //
  is_self: function(message) {
    return message.user.uid === bd_kfe_data.uid;
  },
  // 发送状态
  is_sending: function(message) {
    return message.status === "sending";
  },
  is_stored: function(message) {
    return message.status === "stored";
  },
  is_received: function(message) {
    return message.status === "received";
  },
  is_error: function(message) {
    return message.status === "error";
  },
  is_read: function(message) {
    return message.status === "readCount";
  },
  // 消息类型
  is_type_text: function(message) {
    return (
      message.type === "text" ||
      message.type === "notification_thread" ||
      message.type === "notification_auto_close"
    );
  },
  is_type_robot: function(message) {
    return message.type === "robot";
  },
  is_type_image: function(message) {
    return message.type === "image";
  },
  is_type_file: function(message) {
    return message.type === "file";
  },
  is_type_voice: function(message) {
    return message.type === "voice";
  },
  is_type_questionnaire: function(message) {
    return message.type === "questionnaire";
  },
  is_type_company: function(message) {
    return message.type === "company";
  },
  is_type_workGroup: function(message) {
    return message.type === "workGroup";
  },
  is_type_notification: function(message) {
    return (
      message.type !== "notification_preview" &&
      message.type !== "notification_thread" &&
      // message.type !== "notification_auto_close" &&
      message.type.startsWith("notification")
    );
  },
  //  在发送信息之后，将输入的内容中属于表情的部分替换成emoji图片标签
  //  再经过v-html 渲染成真正的图片
  replaceFace: function(content) {
    if (content === null || content === undefined) {
      return "";
    }
    var emotionMap = bd_kfe_data.emotionMap;
    var reg = /\[[\u4E00-\u9FA5NoOK]+\]/g;
    var matchresult = content.match(reg);
    var result = content;
    if (matchresult) {
      for (var i = 0; i < matchresult.length; i++) {
        result = result.replace(
          matchresult[i],
          "<img height='25px' width='25px' style='margin-bottom:4px;' src='" +
            bd_kfe_data.emotionBaseUrl +
            emotionMap[matchresult[i]] +
            "'>"
        );
      }
    }
    return result;
  },
  //
  scrollToBottom: function() {
    // 聊天记录滚动到最底部
    $("#byteDesk-message-ul").animate(
      { scrollTop: $("#byteDesk-message-ul")[0].scrollHeight },
      "slow"
    );
  },
  //
  pushToMessageArray: function(message, isPrepend = false) {
    // 本地发送的消息
    var contains = false;
    if (message.status === 'sending') {
      bd_kfe_data.messages.push(message);
    } else {
      //
      for (var i = bd_kfe_data.messages.length - 1; i >= 0; i--) {
        var msg = bd_kfe_data.messages[i];
        if (msg.mid === message.mid) {
          bd_kfe_data.messages.splice(i, 1);
          bd_kfe_data.messages.push(message);
          contains = true;
        }
      }
    }
    if (!contains) {
      bd_kfe_data.messages.push(message);
    } else {
      return;
    }
    // console.log("4");
    // TODO: 插入到界面
    if (bd_kfe_utils.is_type_notification(message)) {
      if (isPrepend) {
        $("#byteDesk-message-ul").prepend(
          "<li><p class='byteDesk-timestamp'>" +
          "<span>" +
            message.createdAt +
            "</span><br/>" +
            "<span>" +
            message.content +
            "</span>" +
            "</p></li>"
        );
      } else {
        $("#byteDesk-message-ul").append(
          "<li><p class='byteDesk-timestamp'>" +
          "<span>" +
            message.createdAt +
            "</span><br/>" +
            "<span>" +
            message.content +
            "</span>" +
            "</p></li>"
        );
      }
      // 会话关闭之后，在系统提示语后面添加 ‘人工客服’，方便访客可以重新发起会话
      if (message.type === 'notification_auto_close' || 
        message.type === 'notification_agent_close') {
          if (isPrepend) {
            $("#byteDesk-message-ul").prepend(
              "<li><p class='byteDesk-timestamp'>" +
                "<span style='color:#007bff; cursor: pointer;' onclick='bd_kfe_httpapi.requestThread()'>联系客服</span>" +
              "</p></li>"
            );
          } else {
            $("#byteDesk-message-ul").append(
              "<li><p class='byteDesk-timestamp'>" +
                "<span style='color:#007bff; cursor: pointer;' onclick='bd_kfe_httpapi.requestThread()'>联系客服</span>" +
              "</p></li>"
            );
          }
      }
      if (message.type === 'notification_rate_helpless') {
          if (isPrepend) {
            $("#byteDesk-message-ul").prepend(
              "<li><p class='byteDesk-timestamp'>" +
                "<span style='color:#007bff; cursor: pointer;' onclick='bd_kfe_httpapi.requestAgent()'>人工客服</span>" +
              "</p></li>"
            );
          } else {
            $("#byteDesk-message-ul").append(
              "<li><p class='byteDesk-timestamp'>" +
                "<span style='color:#007bff; cursor: pointer;' onclick='bd_kfe_httpapi.requestAgent()'>人工客服</span>" +
              "</p></li>"
            );
          }
      }
      //
    } else {
      //
      var content =
        "<p class='byteDesk-timestamp'><span>" + message.createdAt + "</span><br/></p>";
      content +=
        "<img class='byteDesk-avatar' width='30' height='30' src='" +
        message.user.avatar +
        "'/>";
      if (!bd_kfe_utils.is_self(message)) {
        content += "<div class='byteDesk-nickname'>" + message.user.nickname + "</div>";
      }
      if (bd_kfe_utils.is_type_text(message)) {
        // TODO: 点击消息内容，弹窗用户选择：复制消息内容 or 撤回消息(3分钟之内)
        content += "<div class='byteDesk-text' id='content-" + message.mid + "'>" + 
        bd_kfe_utils.replaceFace(message.content) + 
        "</div>";
        content += "<div class='byteDesk-status' id='status-" + message.mid + "'></div>";
      } else if (bd_kfe_utils.is_type_image(message)) {
        content +=
          "<div class='byteDesk-text' id='content-" + message.mid + "'>" +
          "<img src='" +
          message.imageUrl +
          "' alt='[图片]' class='image' onclick=\"bd_kfe_utils.imageClicked('" +
          encodeURI(message.imageUrl) +
          "')\"/>" +
          "</div>";
      } else if (bd_kfe_utils.is_type_file(message)) {
        content +=
          "<div class='byteDesk-text' id='content-" + message.mid + "'>" +
          "<img src='https://www.bytedesk.com/img/input/file.png' alt='[文件]' style='height:30px;width:30px;' onclick=\"bd_kfe_utils.fileClicked('" +
          encodeURI(message.fileUrl) +
          "')\"/>" +
          "<span><a href='" +
          encodeURI(message.fileUrl) +
          "' target='_blank'>查看文件</a></span >" +
          "</div>";
      } else if (bd_kfe_utils.is_type_voice(message)) {
        content +=
          "<div class='byteDesk-text' id='content-" + message.mid + "'>" +
          "<img src='https://www.bytedesk.com/img/input/voice_received.png' alt='[语音]' style='voice' onclick=\"bd_kfe_utils.voiceClicked('" +
          message.voiceUrl +
          "')\"/>" +
          "</div>";
      } else if (bd_kfe_utils.is_type_robot(message)) {
        // console.log("robot:", message.content);
        // TODO: 添加 ‘有帮助’ 和 ‘无帮助’
        var question = "";
        for (var j = 0; j < message.answers.length; j++) {
          var answer = message.answers[j];
          question += "<br/><span style='color:#007bff; cursor: pointer;' onclick='bd_kfe_httpapi.queryAnswer(" + answer.aid + ")'>" + answer.question + "</span>";
        }
        //
        content +=
          "<div class='byteDesk-text'>" +
          "<span>" + message.content + "</span>" +
          question +
          "</div>";
      } else if (bd_kfe_utils.is_type_questionnaire(message)) {
        var questionnaire = "";
        for (var i = 0; i < message.questionnaire.questionnaireItems[0].questionnaireItemItems.length; i++) {
          var item = message.questionnaire.questionnaireItems[0].questionnaireItemItems[i];
          questionnaire +=
            "<br/><span style='color: #007bff; cursor: pointer;' onclick='bd_kfe_httpapi.chooseQuestionnaire(" +
            item.qid +
            ")'>" +
            item.content +
            "</span>";
        }
        content +=
          "<div class='byteDesk-text'>" +
          "<span>" +
          message.questionnaire.questionnaireItems[0].title +
          "</span>" +
          questionnaire +
          "</div>";
      } else if (bd_kfe_utils.is_type_company(message)) {
        var company = "";
        for (var i = 0; i < message.company.countries.length; i++) {
          var item = message.company.countries[i];
          company +=
            "<br/><span style='color: #007bff; cursor: pointer;' onclick='bd_kfe_httpapi.chooseCountry(" +
            message.company.cid +
            ", " +
            item.cid +
            ")'>" +
            item.name +
            "</span>";
        }
        content +=
          "<div class='byteDesk-text'>" +
          "<span>" +
          message.content +
          "</span>" +
          company +
          "</div>";
      } else if (bd_kfe_utils.is_type_workGroup(message)) {
        var workGroup = "";
        for (var i = 0; i < message.workGroups.length; i++) {
          var item = message.workGroups[i];
          workGroup +=
            "<br/><span style='color: #007bff; cursor: pointer;' onclick='bd_kfe_httpapi.chooseWorkGroup(" +
            item.wid + ",\"" + item.nickname + "\"" +
            ")'>" +
            item.nickname +
            "</span>";
        }
        content +=
          "<div class='byteDesk-text'>" +
          "<span>" +
          message.content +
          "</span>" +
          workGroup +
          "</div>";
      } 
      //
      if (bd_kfe_utils.is_self(message)) {
        if (isPrepend) {
          $("#byteDesk-message-ul").prepend("<li><div class='self'>" + content + "</div></li>");
        } else {
          $("#byteDesk-message-ul").append("<li><div class='self'>" + content + "</div></li>");
        }
        
      } else {
        if (isPrepend) {
          $("#byteDesk-message-ul").prepend("<li><div class='other' id='other" + message.mid + "'>" + content + "</div></li>");
        } else {
          $("#byteDesk-message-ul").append("<li><div class='other' id='other" + message.mid + "'>" + content + "</div></li>");
        }
      }
    }
    //
    bd_kfe_utils.scrollToBottom();
  },
  // 收到机器人正确答案
  pushRightAnswerToMessageArray: function(message) {
    // 本地发送的消息
    if (message.status === 'sending') {
      bd_kfe_data.messages.push(message);
      return;
    }
    //
    var contains = false;
    for (var i = bd_kfe_data.messages.length - 1; i >= 0; i--) {
      var msg = bd_kfe_data.messages[i];
      // 根据localId替换本地消息，也即更新本地消息状态
      if (msg.mid === message.mid) {
        bd_kfe_data.messages.splice(i, 1);
        bd_kfe_data.messages.push(message);
        contains = true;
      }
    }
    if (!contains) {
      bd_kfe_data.messages.push(message);
    } else {
      return;
    }
    //
    var content = "<p class='byteDesk-timestamp'><span>" + message.createdAt + "</span><br/></p>";
    content += "<img class='byteDesk-avatar' width='30' height='30' src='" + message.user.avatar + "'/>";
    if (!bd_kfe_utils.is_self(message)) {
      content += "<div class='byteDesk-nickname'>" + message.user.nickname + "</div>";
    }
    // 添加 ‘有帮助’ 和 ‘无帮助’
    var question = "";
    for (var j = 0; j < message.answers.length; j++) {
      var answer = message.answers[j];
      question += "<br/><span style='color:#007bff; cursor: pointer;' onclick='bd_kfe_httpapi.queryAnswer(" + answer.aid + ")'>" + answer.question + "</span>";
    }
    //
    var isHelpfull = "<br/><span style='color:#007bff; cursor: pointer;' onclick='bd_kfe_httpapi.rateAnswer(" + message.answer.aid + "," + message.mid + ",true)'>有帮助</span>" + 
      "<span style='color:#007bff; cursor: pointer; margin-left: 5px;' onclick='bd_kfe_httpapi.rateAnswer(" + message.answer.aid + "," + message.mid + ",false)'>无帮助</span>";
    //
    content +=
      "<div class='byteDesk-text'>" +
      "<span>" + message.content + "</span>" +
      question + isHelpfull +
      "</div>";
    //
    $("#byteDesk-message-ul").append("<li><div class='other'>" + content + "</div></li>");
    bd_kfe_utils.scrollToBottom();
  },
  // 未匹配到机器人答案
  pushNoAnswerToMessageArray: function(message) {
    // 本地发送的消息
    if (message.status === 'sending') {
      bd_kfe_data.messages.push(message);
      return;
    }
    //
    var contains = false;
    for (var i = bd_kfe_data.messages.length - 1; i >= 0; i--) {
      var msg = bd_kfe_data.messages[i];
      // 根据localId替换本地消息，也即更新本地消息状态
      if (msg.mid === message.mid) {
        bd_kfe_data.messages.splice(i, 1);
        bd_kfe_data.messages.push(message);
        contains = true;
      }
    }
    if (!contains) {
      bd_kfe_data.messages.push(message);
    } else {
      return;
    }
    //
    var content = "<p class='byteDesk-timestamp'><span>" + message.createdAt + "</span><br/></p>";
    content +=
      "<img class='byteDesk-avatar' width='30' height='30' src='" +
      message.user.avatar +
      "'/>";
    if (!bd_kfe_utils.is_self(message)) {
      content += "<div class='byteDesk-nickname'>" + message.user.nickname + "</div>";
    }
    // TODO: 回答内容中添加 '人工客服' 字样，访客点击可直接联系人工客服
    var question = "";
    for (var j = 0; j < message.answers.length; j++) {
      var answer = message.answers[j];
      question += "<br/><span style='color:#007bff; cursor: pointer;' onclick='bd_kfe_httpapi.queryAnswer(" + answer.aid + ")'>" + answer.question + "</span>";
    }
    //
    var contactAgent = "<br/><span style='color:#007bff; cursor: pointer;' onclick='bd_kfe_httpapi.requestAgent()'>人工客服</span>";
    //
    content +=
      "<div class='byteDesk-text'>" +
      "<span>" + message.content + "</span>" +
      question + contactAgent +
      "</div>";
    //
    $("#byteDesk-message-ul").append("<li><div class='other'>" + content + "</div></li>");
    bd_kfe_utils.scrollToBottom();
  },
  //
  getUrlParam: function(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg); //匹配目标参数
    if (r != null) return decodeURIComponent(r[2]);
    return null; //返回参数值
  },
  //
  pushAnswers: function(answers) {
    var content = "";
    for (var i = 0; i < answers.length; i++) {
      var answer = answers[i];
      content +=
        "<li class='byteDesk-question' onclick='bd_kfe_httpapi.queryAnswer(" +
        answer.aid +
        ")'>" +
        answer.question +
        "</li>";
    }
    $("#byteDesk-question").append(content);
  },
  //
  updateConnection: function(isConnected) {
    if (isConnected) {
      $("#byteDesk-connected-image").attr(
        "src",
        "https://bytedesk.oss-cn-shenzhen.aliyuncs.com/util/connected.png"
      );
    } else {
      $("#byteDesk-connected-image").attr(
        "src",
        "https://bytedesk.oss-cn-shenzhen.aliyuncs.com/util/disconnected.png"
      );
    }
  },
  //
  onKeyUp: function(event) {
    var key = event.keyCode || window.event.keyCode;
    // console.log("onKeyUp:", key);
    if (key === 13) {
      bd_kfe_stompapi.sendTextMessage();
    }
    // 发送消息预知
    bd_kfe_stompapi.onInputChange();
  },
  //
  toggleInputTip: function(show) {
    if (show) {
      $("#byteDesk-message-tip").show();
    } else {
      $("#byteDesk-message-tip").hide();
    }
  },
  //
  rateStarChoose: function(index) {
    if (index == 1) {
      if ($("#ratestar1").attr("src") == "//cdn.bytedesk.com/assets/img/rate/ratestar_selected.png") {
        $("#ratestar2").attr("src", "//cdn.bytedesk.com/assets/img/rate/ratestar_unselected.png");
        $("#ratestar3").attr("src", "//cdn.bytedesk.com/assets/img/rate/ratestar_unselected.png");
        $("#ratestar4").attr("src", "//cdn.bytedesk.com/assets/img/rate/ratestar_unselected.png");
        $("#ratestar5").attr("src", "//cdn.bytedesk.com/assets/img/rate/ratestar_unselected.png");
      } else {
        $("#ratestar1").attr("src", "//cdn.bytedesk.com/assets/img/rate/ratestar_selected.png");
      }
      $("#ratescore").text("恶劣");
      bd_kfe_data.rateScore = 1;
    } else if (index == 2) {
      if ($("#ratestar2").attr("src") == "//cdn.bytedesk.com/assets/img/rate/ratestar_selected.png") {
        $("#ratestar3").attr("src", "//cdn.bytedesk.com/assets/img/rate/ratestar_unselected.png");
        $("#ratestar4").attr("src", "//cdn.bytedesk.com/assets/img/rate/ratestar_unselected.png");
        $("#ratestar5").attr("src", "//cdn.bytedesk.com/assets/img/rate/ratestar_unselected.png");
      } else {
        $("#ratestar1").attr("src", "//cdn.bytedesk.com/assets/img/rate/ratestar_selected.png");
        $("#ratestar2").attr("src", "//cdn.bytedesk.com/assets/img/rate/ratestar_selected.png");
      }
      $("#ratescore").text("较差");
      bd_kfe_data.rateScore = 2;
    } else if (index == 3) {
      if ($("#ratestar3").attr("src") == "//cdn.bytedesk.com/assets/img/rate/ratestar_selected.png") {
        $("#ratestar4").attr("src", "//cdn.bytedesk.com/assets/img/rate/ratestar_unselected.png");
        $("#ratestar5").attr("src", "//cdn.bytedesk.com/assets/img/rate/ratestar_unselected.png");
      } else {
        $("#ratestar2").attr("src", "//cdn.bytedesk.com/assets/img/rate/ratestar_selected.png");
        $("#ratestar3").attr("src", "//cdn.bytedesk.com/assets/img/rate/ratestar_selected.png");
      }
      $("#ratescore").text("一般");
      bd_kfe_data.rateScore = 3;
    } else if (index == 4) {
      if ($("#ratestar4").attr("src") == "//cdn.bytedesk.com/assets/img/rate/ratestar_selected.png") {
        $("#ratestar5").attr("src", "//cdn.bytedesk.com/assets/img/rate/ratestar_unselected.png");
      } else {
        $("#ratestar1").attr("src", "//cdn.bytedesk.com/assets/img/rate/ratestar_selected.png");
        $("#ratestar2").attr("src", "//cdn.bytedesk.com/assets/img/rate/ratestar_selected.png");
        $("#ratestar3").attr("src", "//cdn.bytedesk.com/assets/img/rate/ratestar_selected.png");
        $("#ratestar4").attr("src", "//cdn.bytedesk.com/assets/img/rate/ratestar_selected.png");
      }
      $("#ratescore").text("较好");
      bd_kfe_data.rateScore = 4;
    } else if (index == 5) {
      if ($("#ratestar5").attr("src") == "//cdn.bytedesk.com/assets/img/rate/ratestar_selected.png") {
      } else {
        $("#ratestar1").attr("src", "//cdn.bytedesk.com/assets/img/rate/ratestar_selected.png");
        $("#ratestar2").attr("src", "//cdn.bytedesk.com/assets/img/rate/ratestar_selected.png");
        $("#ratestar3").attr("src", "//cdn.bytedesk.com/assets/img/rate/ratestar_selected.png");
        $("#ratestar4").attr("src", "//cdn.bytedesk.com/assets/img/rate/ratestar_selected.png");
        $("#ratestar5").attr("src", "//cdn.bytedesk.com/assets/img/rate/ratestar_selected.png");
      }
      $("#ratescore").text("非常满意");
      bd_kfe_data.rateScore = 5;
    }
  },
  //
  guid: function() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return (
      s4() +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      "-" +
      s4() +
      s4() +
      s4()
    );
  },
  currentTimestamp: function() {
    return moment().format('YYYY-MM-DD HH:mm:ss');
  },
  //
  isMobile: function() { 
		function Android() {
			return navigator.userAgent.match(/Android/i);
		}
		function BlackBerry() {
			return navigator.userAgent.match(/BlackBerry/i);
		}
		function iOS() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		}
		function Opera() {
			return navigator.userAgent.match(/Opera Mini/i);
		}
		function Windows() {
			return navigator.userAgent.match(/IEMobile/i);
		}
		return Android() || BlackBerry() || iOS() || Opera() || Windows();
	},
  //
  emotionClicked: function(emotionText) {
    console.log('imageclicked:'+emotionText);
    var originalText = $("#byteDesk-input-textarea").val();
    $("#byteDesk-input-textarea").val(originalText + emotionText);
    $("#byteDesk-input-emoji-box").hide();
    bd_kfe_data.show_emoji = false;
  },
  processEmotion: function(body) {
    var emotionMap = {
      "[微笑]": "appkefu_f001.png",
      "[撇嘴]": "appkefu_f002.png",
      "[色]": "appkefu_f003.png",
      "[发呆]": "appkefu_f004.png",
      "[得意]": "appkefu_f005.png",
      "[流泪]": "appkefu_f006.png",
      "[害羞]": "appkefu_f007.png",
      "[闭嘴]": "appkefu_f008.png",
      "[睡]": "appkefu_f009.png",
      "[大哭]": "appkefu_f010.png",

      "[尴尬]": "appkefu_f011.png",
      "[发怒]": "appkefu_f012.png",
      "[调皮]": "appkefu_f013.png",
      "[呲牙]": "appkefu_f014.png",
      "[惊讶]": "appkefu_f015.png",
      "[难过]": "appkefu_f016.png",
      "[酷]": "appkefu_f017.png",
      "[冷汗]": "appkefu_f018.png",
      "[抓狂]": "appkefu_f019.png",
      "[吐]": "appkefu_f020.png",

      "[偷笑]": "appkefu_f021.png",
      "[愉快]": "appkefu_f022.png",
      "[白眼]": "appkefu_f023.png",
      "[傲慢]": "appkefu_f024.png",
      "[饥饿]": "appkefu_f025.png",
      "[困]": "appkefu_f026.png",
      "[惊恐]": "appkefu_f027.png",
      "[流汗]": "appkefu_f028.png",
      "[憨笑]": "appkefu_f029.png",
      "[悠闲]": "appkefu_f030.png",

      "[奋斗]": "appkefu_f031.png",
      "[咒骂]": "appkefu_f032.png",
      "[疑问]": "appkefu_f033.png",
      "[嘘]": "appkefu_f034.png",
      "[晕]": "appkefu_f035.png",
      "[疯了]": "appkefu_f036.png",
      "[衰]": "appkefu_f037.png",
      "[骷髅]": "appkefu_f038.png",
      "[敲打]": "appkefu_f039.png",
      "[再见]": "appkefu_f040.png",

      "[擦汗]": "appkefu_f041.png",
      "[抠鼻]": "appkefu_f042.png",
      "[鼓掌]": "appkefu_f043.png",
      "[糗大了]": "appkefu_f044.png",
      "[坏笑]": "appkefu_f045.png",
      "[左哼哼]": "appkefu_f046.png",
      "[右哼哼]": "appkefu_f047.png",
      "[哈欠]": "appkefu_f048.png",
      "[鄙视]": "appkefu_f049.png",
      "[委屈]": "appkefu_f050.png",

      ///////////////////////////////
      "[快哭]": "appkefu_f051.png",
      "[阴险]": "appkefu_f052.png",
      "[亲亲]": "appkefu_f053.png",
      "[吓]": "appkefu_f054.png",
      "[可怜]": "appkefu_f055.png",
      "[菜刀]": "appkefu_f056.png",
      "[西瓜]": "appkefu_f057.png",
      "[啤酒]": "appkefu_f058.png",
      "[篮球]": "appkefu_f059.png",
      "[乒乓]": "appkefu_f050.png",

      "[咖啡]": "appkefu_f061.png",
      "[饭]": "appkefu_f062.png",
      "[猪头]": "appkefu_f063.png",
      "[玫瑰]": "appkefu_f064.png",
      "[凋谢]": "appkefu_f065.png",
      "[嘴唇]": "appkefu_f066.png",
      "[爱心]": "appkefu_f067.png",
      "[心碎]": "appkefu_f068.png",
      "[蛋糕]": "appkefu_f069.png",
      "[闪电]": "appkefu_f070.png",

      "[炸弹]": "appkefu_f071.png",
      "[刀]": "appkefu_f072.png",
      "[足球]": "appkefu_f073.png",
      "[瓢虫]": "appkefu_f074.png",
      "[便便]": "appkefu_f075.png",
      "[月亮]": "appkefu_f076.png",
      "[太阳]": "appkefu_f077.png",
      "[礼物]": "appkefu_f078.png",
      "[拥抱]": "appkefu_f079.png",
      "[强]": "appkefu_f080.png",

      "[弱]": "appkefu_f081.png",
      "[握手]": "appkefu_f082.png",
      "[胜利]": "appkefu_f083.png",
      "[抱拳]": "appkefu_f084.png",
      "[勾引]": "appkefu_f085.png",
      "[拳头]": "appkefu_f086.png",
      "[差劲]": "appkefu_f087.png",
      "[爱你]": "appkefu_f088.png",
      "[No]": "appkefu_f089.png",
      "[OK]": "appkefu_f080.png",

      "[爱情]": "appkefu_f091.png",
      "[飞吻]": "appkefu_f092.png",
      "[跳跳]": "appkefu_f093.png",
      "[发抖]": "appkefu_f094.png",
      "[怄火]": "appkefu_f095.png",
      "[转圈]": "appkefu_f096.png",
      "[磕头]": "appkefu_f097.png",
      "[回头]": "appkefu_f098.png",
      "[跳绳]": "appkefu_f099.png",
      "[投降]": "appkefu_f100.png",

      "[激动]": "appkefu_f101.png",
      "[乱舞]": "appkefu_f102.png",
      "[献吻]": "appkefu_f103.png",
      "[左太极]": "appkefu_f104.png",
      "[右太极]": "appkefu_f105.png"
    };
    var reg = /\[[\u4E00-\u9FA5NoOK]+\]/g;
    var matchresult = body.match(reg);
    var result = body;
    if (matchresult) {
      for (var i = 0; i < matchresult.length; i++) {
        result = result.replace(
          matchresult[i],
          "<img height='25px' width='25px' src = '//cdn.bytedesk.com/assets/img/emo/" +
            emotionMap[matchresult[i]] +
            "'>"
        );
      }
    }
    return result;
  },
  // 播放提示音
  playAudio: function () {
    var audio = document.getElementById('audioPlay')
    // 浏览器支持 audio
    audio.play()
  },
  uploadImage: function(file) {
    //
    var filename = bd_kfe_utils.guid() + '.png'
    var formdata = new FormData();
    formdata.append("file_name", filename);
    formdata.append("username", bd_kfe_data.username);
    formdata.append("file", file);
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
          bd_kfe_stompapi.sendImageMessage(imageUrl)
      },
      error: function(error) {
          console.log(error);
      }
    });
  },
  imgReader: function( item ){
    var file = item.getAsFile();
    bd_kfe_utils.uploadImage(file)
  },
  /**
   * 这里因为浏览器会把Ajax返回的二进制数据当做文本数据，
   * 所以写个str2bytes方法把接收到的文本数据按字节一个个做与运算来还原成二进制byte
   */
  str2bytes: function(str) {
    var bytes = [];
    for (var i = 0, len = str.length; i < len; ++i) {
        var c = str.charCodeAt(i);
        var byte = c & 0xff;
        bytes.push(byte);
    }
    return bytes;
  }
};
