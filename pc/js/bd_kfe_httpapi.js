/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2022-03-10 14:53:39
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-10-25 14:45:39
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
 */
var bd_kfe_httpapi = {
  
  // 初始化用户信息
  init: function () {
    let uid = localStorage.getItem(bd_kfe_data.VISITOR_UID);
    let nickname = localStorage.getItem(bd_kfe_data.VISITOR_NICKNAME);
    let avatar = localStorage.getItem(bd_kfe_data.VISITOR_AVATAR);
    //
    $.ajax({
      url: bd_kfe_data.BASE_URL + "/visitor/api/v1/init",
      contentType: "application/json; charset=utf-8",
      type: "get",
      data: {
        'orgUid': bd_kfe_data.org,
        'uid': uid,
        'nickname': nickname,
        'avatar': avatar,
        'client': bd_kfe_data.HTTP_CLIENT
      },
      success: function (response) {
        console.log('init:', uid, nickname, avatar, response)
        //
        bd_kfe_data.uid = response.data.uid;
        bd_kfe_data.nickname = response.data.nickname;
        bd_kfe_data.avatar = response.data.avatar;
        // 本地存储
        localStorage.setItem(bd_kfe_data.VISITOR_UID, bd_kfe_data.uid);
        localStorage.setItem(bd_kfe_data.VISITOR_NICKNAME, bd_kfe_data.nickname);
        localStorage.setItem(bd_kfe_data.VISITOR_AVATAR, bd_kfe_data.avatar);
        // 
        bd_kfe_httpapi.requestThread(false);
      },
      error: function (error) {
        console.log('init:', error);
        //Do Something to handle error
        // bd_kfe_utils.printLog(error);
      }
    });
  },

  // 请求会话
  requestThread: function (forceAgent = false) {
    $.ajax({
      url: bd_kfe_data.BASE_URL + "/visitor/api/v1/thread",
      contentType: "application/json; charset=utf-8",
      type: "get",
      data: {
        'orgUid': bd_kfe_data.org,
        'type': bd_kfe_data.t,
        'sid': bd_kfe_data.sid,
        // 
        'uid': bd_kfe_data.uid,
        'nickname': bd_kfe_data.nickname,
        'avatar': bd_kfe_data.avatar,
        // 
        'forceAgent': forceAgent,
        'client': bd_kfe_data.HTTP_CLIENT
      },
      success: function (response) {
        console.log('requestThread:', response);
        // bd_kfe_utils.printLog("requestThread:" + response);
        // 
        bd_kfe_httpapi.dealWithThread(response);
      },
      error: function (error) {
        bd_kfe_utils.printLog(error);
        // token过期
        bd_kfe_httpapi.login();
      }
    });
    // 请求指纹
    // bd_kfe_httpapi.fingerPrint2();
  },

  /**
   * 处理返回结果
   * @param {*} response 
   */
  dealWithThread: function (response) {
    // bd_kfe_utils.printLog("dealWithThread:" + JSON.stringify(response));
    $("#bytedesk_loading").hide()
    var message = response.data;
    if (response.code === 200) {
      //
      bd_kfe_utils.pushToMessageArray(message);
      // 1. 保存thread
      bd_kfe_data.thread = message.thread;
    } 
    $('#bytedesk_agent_avatar').attr('src', message.user.avatar);
    $('#bytedesk_agent_nickname').text(message.user.nickname);
    // $('#bytedesk_agent_description').text(message.user.description);

    bd_kfe_utils.scrollToBottom();
    // 建立长连接
    bd_kfe_stompapi.byteDeskConnect();
    // 通知当前网址
    // bd_kfe_httpapi.browse()
  },
  

  
  /**
   * 获取设备指纹
   */
  fingerPrint2: function () {
    // #获取全部
    var deviceInfo = DeviceInfo.getDeviceInfo({ domain: '' })
    // bd_kfe_utils.printLog('fingerprint2:' + JSON.stringify(deviceInfo));
    // var url = bd_kfe_data.websiteUrl //window.location.href;
    // url = url.endsWith("#") ? url.substring(0, url.length - 1) : url;
    // console.log('fingerPrint2 url:', bd_kfe_data.websiteUrl, bd_kfe_data.refererUrl)
    // 
    $.ajax({
      url: bd_kfe_data.BASE_URL + "/api/fingerprint2/browser",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      type: "post",
      data: JSON.stringify({
        browserInfo: encodeURI(deviceInfo.browserInfo),
        deviceType: encodeURI(deviceInfo.deviceType),
        fingerprint: encodeURI(deviceInfo.fingerprint),
        language: encodeURI(deviceInfo.language),
        os: encodeURI(deviceInfo.os),
        osVersion: encodeURI(deviceInfo.osVersion),
        referrer: encodeURI(bd_kfe_data.refererUrl),
        url: encodeURI(bd_kfe_data.websiteUrl),
        client: bd_kfe_data.client
      }),
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + bd_kfe_data.passport.token.access_token);
      },
      success: function (response) {
        // bd_kfe_utils.printLog("fingerprint2: " + JSON.stringify(response));
      },
      error: function (error) {
        bd_kfe_utils.printLog(error);
      }
    });
  },
  /**
   * 通知服务器，访客浏览网页中
   * 修改为POST请求方式
   */
  browse: function () {
    //
    if (!bd_kfe_data.thread.tid || bd_kfe_data.thread.tid.trim().length == 0) {
      bd_kfe_utils.printLog("thread tid is null");
      return
    }
    // 
    var url = bd_kfe_data.websiteUrl //window.location.href;
    url = url.endsWith("#") ? url.substring(0, url.length - 1) : url;
    //
    // console.log('browse tid:', bd_kfe_data.thread.tid)
    // console.log('browse url: ', url);
    // console.log('browse preUrl: ', bd_kfe_data.refererUrl);
    // console.log('browse title:', bd_kfe_data.websiteTitle)
    // 
    if (bd_kfe_data.websiteTitle && bd_kfe_data.websiteTitle.length > 6) {
      bd_kfe_data.websiteTitle = bd_kfe_data.websiteTitle.substring(0, 6)
    }
    // console.log('browse title2:', bd_kfe_data.websiteTitle)
    //
    $.ajax({
      url: bd_kfe_data.BASE_URL +
        "/api/thread/set/url",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      type: "post",
      data: JSON.stringify({
        tid: bd_kfe_data.thread.tid,
        preUrl: encodeURI(bd_kfe_data.refererUrl),
        url: encodeURI(url),
        title: encodeURI(bd_kfe_data.websiteTitle)
      }),
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + bd_kfe_data.passport.token.access_token);
      },
      success: function (response) {
        // console.log('response: ', response)
        bd_kfe_utils.printLog("browse:" + JSON.stringify(response.data));
      },
      error: function (error) {
        bd_kfe_utils.printLog(error);
      }
    });
    // var keywords = document.getElementsByName("keywords")[0].content;
    // var description = document.getElementsByName("description")[0].content;
    // $.ajax({
    //   url: bd_kfe_data.BASE_URL +
    //     "/api/browse/notify",
    //   contentType: "application/json; charset=utf-8",
    //   dataType: "json",
    //   type: "post",
    //   data: JSON.stringify({
    //     adminUid: bd_kfe_data.adminUid,
    //     client: bd_kfe_data.client,
    //     sessionId: bd_kfe_data.sessionId,
    //     referrer: encodeURI(bd_kfe_data.refererUrl),
    //     url: encodeURI(url),
    //     title: encodeURI(bd_kfe_data.websiteTitle)
    //   }),
    //   beforeSend: function (xhr) {
    //     xhr.setRequestHeader('Authorization', 'Bearer ' + bd_kfe_data.passport.token.access_token);
    //   },
    //   success: function (response) {
    //     // bd_kfe_utils.printLog("browse:" + JSON.stringify(response.data));
    //   },
    //   error: function (error) {
    //     bd_kfe_utils.printLog(error);
    //   }
    // });
  },
  
  /**
   * @api {get} /api/rate/do 满意度评价
   * @apiName rate
   * @apiGroup User
   * @apiVersion 1.4.7
   * @apiPermission afterLogin
   * 
   * @apiParam {String} access_token 访问令牌
   * @apiParam {String} uId 管理员uid
   * @apiParam {String} wId 工作组唯一wid
   * @apiParam {String} type 区分工作组会话 'workGroup'、指定坐席会话 'appointed'
   * @apiParam {String} aId 指定客服uid, 只有当type === 'appointed'时有效
   * @apiParam {String} tid 会话tid
   * @apiParam {String} score 分数
   * @apiParam {String} note 备注
   * @apiParam {String} invite 是否邀请评价
   * @apiParam {String} client 固定写死为 'web'
   * 
   * @apiDescription 满意度评价
   *
   * @apiUse ResponseResultSuccess
   */
  rate: function () {
    bd_kfe_data.rateContent = $("#suggestcontent").val();
    //
    $.ajax({
      url: bd_kfe_data.BASE_URL +
        "/api/rate/do",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      type: "post",
      data: JSON.stringify({
        tid: bd_kfe_data.thread.tid,
        score: bd_kfe_data.rateScore,
        note: bd_kfe_data.rateContent,
        invite: bd_kfe_data.isInviteRate,
        client: bd_kfe_data.client
      }),
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + bd_kfe_data.passport.token.access_token);
      },
      success: function (response) {
        bd_kfe_utils.printLog("rate: " + response.data);
        bd_kfe_data.isRated = true;
        //
        if (response.status_code === 200) {
          // alert("评价成功");
          $("#bytedesk_main").show();
          $("#bytedesk_rate").hide();
        } else {
          alert(response.message);
        }
      },
      error: function (error) {
        bd_kfe_utils.printLog(error);
        alert(error);
      }
    });
  },
  /**
   * @api {get} /api/thread/visitor/close 关闭当前窗口
   * @apiName closeWebPage
   * @apiGroup User
   * @apiVersion 1.4.7
   * @apiPermission afterLogin
   * 
   * @apiParam {String} access_token 访问令牌
   * @apiParam {String} tid 会话tid
   * @apiParam {String} client 固定写死为 'web'
   * 
   * @apiDescription 关闭当前窗口
   *
   * @apiUse ResponseResultSuccess
   */
  closeWebPage: function () {
    $.ajax({
      url: bd_kfe_data.BASE_URL +
        "/api/thread/visitor/close",
      type: "post",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      data: JSON.stringify({
        tid: bd_kfe_data.thread.tid,
        client: bd_kfe_data.client
      }),
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + bd_kfe_data.passport.token.access_token);
      },
      success: function (response) {
        bd_kfe_utils.printLog("close thread: " + response.data);
        // 关闭当前窗口
        if (navigator.userAgent.indexOf("MSIE") > 0) {
          if (navigator.userAgent.indexOf("MSIE 6.0") > 0) {
            window.opener = null;
            window.close();
          } else {
            window.open("", "_top");
            window.top.close();
          }
        } else if (navigator.userAgent.indexOf("Firefox") > 0) {
          window.location.href = "about:blank ";
          window.opener = null;
          window.open("", "_self", "");
          window.close();
        } else {
          window.opener = null;
          window.open("", "_self", "");
          window.close();
        }
      },
      error: function (error) {
        bd_kfe_utils.printLog(error);
        alert(error);
      }
    });
  },
  // 显示加载更多历史消息
  showLoadHistoryMessage() {
    if (bd_kfe_data.history !== "1") {
      return
    }
    $("#bytedesk_more").show();
  },
  /**
   * @api {get} /api/messages/user 加载更多聊天记录
   * @apiName loadHistoryMessages
   * @apiGroup User
   * @apiVersion 1.4.7
   * @apiPermission afterLogin
   * 
   * @apiParam {String} access_token 访问令牌
   * @apiParam {String} wId 工作组唯一wid
   * @apiParam {String} type 区分工作组会话 'workGroup'、指定坐席会话 'appointed'
   * @apiParam {String} aId 指定客服uid, 只有当type === 'appointed'时有效
   * @apiParam {String} client 固定写死为 'web'
   * 
   * @apiDescription 加载更多聊天记录
   * TODO: 访客端暂时不开放聊天记录
   *
   * @apiUse ResponseResultSuccess
   */
  loadHistoryMessages: function (isPrepend = false) {
    // 
    if (bd_kfe_data.history !== "1") {
      return
    }
    // 
    var loadingText = "加载中..."
    if (bd_kfe_data.lang === "en") {
      loadingText = "Loading..."
    }
    $("#bytedesk_more").text(loadingText)
    // 
    let uni_wid = bd_kfe_data.type === 'appointed' ? bd_kfe_data.agentUid : bd_kfe_data.workGroupWid;
    // 
    $.ajax({
      url: bd_kfe_data.BASE_URL +
        "/api/messages/user/wid",
      type: "get",
      data: {
        wid: uni_wid,
        page: bd_kfe_data.page,
        size: 20,
        client: bd_kfe_data.client
      },
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + bd_kfe_data.passport.token.access_token);
      },
      success: function (response) {
        bd_kfe_utils.printLog('loadHistoryMessages: ' + JSON.stringify(response.data));
        var loadingText = "加载更多消息"
        if (bd_kfe_data.lang === "en") {
          loadingText = "Loading More"
        }
        $("#bytedesk_more").text(loadingText)
        // 
        if (response.status_code === 200) {
          bd_kfe_data.page += 1;
          // 是否还有更多历史记录
          bd_kfe_data.hasMoreHistoryMessage = !response.data.last
          if (bd_kfe_data.hasMoreHistoryMessage) {
            $('#bytedesk_more').show()
          } else {
            $('#bytedesk_more').hide()
          }
          //
          var length = response.data.content.length
          for (var i = 0; i < length; i++) {
            var message = response.data.content[i];
            // if (message.type === 'notification_form_request' ||
            //   message.type === 'notification_form_result') {
            //   // 暂时忽略表单消息
            // }
            if (message.type === 'notification_thread_reentry') {
              // 连续的 ‘继续会话’ 消息，只显示最后一条
              if (i + 1 < length) {
                var nextmsg = response.data.content[i + 1];
                if (nextmsg.type === 'notification_thread_reentry') {
                  continue
                } else {
                  bd_kfe_utils.pushToMessageArray(message, true);
                }
              }
            } else {
              bd_kfe_utils.pushToMessageArray(message, true);
            }
          }
          // for (var i = length - 1; i >= 0 ; i--) {
          //   var message = response.data.content[i];
          //   if (message.type === 'notification_form_request' ||
          //     message.type === 'notification_form_result') {
          //     // TODO: 暂时忽略表单消息
          //   } else {
          //     bd_kfe_utils.pushToMessageArray(message, isPrepend);
          //   }
          // }
          // bd_kfe_utils.scrollToBottom();
        } else {
          alert(response.message);
        }
      },
      error: function (error) {
        bd_kfe_utils.printLog(error);
        $('#bytedesk_more').hide()
      }
    });
  },
  // 输入联想
  previewAnswer: function (content) {
    $('#bytedesk_faq_preview').html("");
    $.ajax({
      url: bd_kfe_data.BASE_URL +
        "/api/elastic/robot/preview",
      contentType: "application/json; charset=utf-8",
      type: "get",
      data: {
        wid: bd_kfe_data.workGroupWid,
        content: content,
        client: bd_kfe_data.client
      },
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + bd_kfe_data.passport.token.access_token);
      },
      success: function (response) {
        // bd_kfe_utils.printLog("preview answer success:" + JSON.stringify(response.data));
        $('#bytedesk_faq_preview').html("");
        // preview answer success:{"totalHits":1,"totalHitsRelation":"EQUAL_TO","maxScore":1.7009872,"scrollId":null,
        // "searchHits":[{"id":"211","score":1.7009872,"sortValues":[],
        // "content":{"id":211,"aid":"202206061702191","question":"问题1","answer":"答案1","similars":"","keywords":"","channels":"uniapp,flutter_android,flutter_ios,web_pc,web_h5,android,ios,wechat_mp,wechat_mini,wechat_kefu","orderNo":0,"workGroupWids":"201812200005351,201807171659201,201809061716221,201808101819291","uid":"201808221551193"},
        //  "highlightFields":{"question":["<span style=\"color:red;\">问题</span>1"]}}],"aggregations":null,"empty":false}
        if (response.data.totalHits > 0) {
          // 界面显示提示列表
          $('#bytedesk_faq_preview').show()
          //
          for (let i = 0; i < response.data.searchHits.length && i < 4; i++) {
            const element = response.data.searchHits[i];
            var question = element.content.question
            var answer = element.content.answer
            // console.log('question:', question, ' answer:', answer)
            // 界面显示提示列表
            var item = "<span class=\"bytedesk_faq_preview-item\" onclick=\"bd_kfe_utils.handleFaqPreviewItemClicked(\'" + encodeURIComponent(question) + "\',\'" + encodeURIComponent(answer) + "\')\" >" + question + "</span>";
            $("#bytedesk_faq_preview").append(item)
            // 
            // var highlightFields = element.highlightFields
            // if (highlightFields.question != undefined && highlightFields.question.length > 0) {
            //   for (let j = 0; j < highlightFields.question.length; j++) {
            //     const hignelement = highlightFields.question[j];
            //     console.log('hignelement:', hignelement)
            //     // TODO: 界面显示提示列表
            //   }
            // }
          }
        }
      },
      error: function (error) {
        bd_kfe_utils.printLog("query answers error:" + error);
      }
    });
  },
  // queryAnswer和messageAnswer的合体升级版
  robotQueryAnswer: function (aid, question) {
    // 插入本地
    var localId = bd_kfe_utils.guid();
    var message = {
      uid: localId,
      type: bd_kfe_data.MESSAGE_TYPE_TEXT,
      content: question,
      imageUrl: question,
      createdAt: bd_kfe_utils.currentTimestamp(),
      localId: localId,
      status: bd_kfe_data.MESSAGE_STATUS_STORED,
      // answers: [],
      user: {
        uid: bd_kfe_data.my_uid(),
        username: bd_kfe_data.my_username(),
        nickname: bd_kfe_data.my_nickname(),
        avatar: bd_kfe_data.my_avatar()
      }
    };
    bd_kfe_utils.pushToMessageArray(message);
    // 从服务器请求答案
    $.ajax({
      url: bd_kfe_data.BASE_URL +
        "/api/robot/query",
      contentType: "application/json; charset=utf-8",
      type: "get",
      data: {
        type: 'aid',
        uid: localId,
        tid: bd_kfe_data.thread.tid,
        aid: aid,
        question: question,
        uid: bd_kfe_data.adminUid,
        keyword: '',
        client: bd_kfe_data.client
      },
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + bd_kfe_data.passport.token.access_token);
      },
      success: function (response) {
        bd_kfe_utils.printLog("robot query answer success:" + JSON.stringify(response.data));
        if (response.status_code === 200) {
          //
          // var replyMessage = response.data.reply;
          // bd_kfe_utils.pushRightAnswerToMessageArray(replyMessage);
          //
          bd_kfe_utils.scrollToBottom();
        } else {
          alert(response.message);
        }
      },
      error: function (error) {
        bd_kfe_utils.printLog("query answers error:" + error);
      }
    });
  },
  // queryAnswer和messageAnswer的合体升级版
  robotMessageAnswer: function (keyword) {
    // 插入本地
    var localId = bd_kfe_utils.guid();
    var message = {
      uid: localId,
      type: bd_kfe_data.MESSAGE_TYPE_TEXT,
      content: keyword,
      imageUrl: keyword,
      createdAt: bd_kfe_utils.currentTimestamp(),
      localId: localId,
      status: bd_kfe_data.MESSAGE_STATUS_STORED,
      // answers: [],
      user: {
        uid: bd_kfe_data.my_uid(),
        username: bd_kfe_data.my_username(),
        nickname: bd_kfe_data.my_nickname(),
        avatar: bd_kfe_data.my_avatar()
      }
    };
    bd_kfe_utils.pushToMessageArray(message);
    // 从服务器请求答案
    $.ajax({
      url: bd_kfe_data.BASE_URL +
        "/api/robot/query",
      contentType: "application/json; charset=utf-8",
      type: "get",
      data: {
        type: 'keyword',
        uid: localId,
        tid: bd_kfe_data.thread.tid,
        aid: '',
        question: '',
        uid: bd_kfe_data.adminUid,
        keyword: keyword,
        client: bd_kfe_data.client
      },
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + bd_kfe_data.passport.token.access_token);
      },
      success: function (response) {
        bd_kfe_utils.printLog("robot msg answer success:" + JSON.stringify(response.data));
        if (response.status_code === 200) {
          //
          // var replyMessage = response.data.reply;
          // bd_kfe_utils.pushRightAnswerToMessageArray(replyMessage);
          //
          bd_kfe_utils.scrollToBottom();
        } else {
          alert(response.message);
        }
      },
      error: function (error) {
        bd_kfe_utils.printLog("query answers error:" + error);
      }
    });
  },
  /**
   * @api {post} /api/answer/rate 评价智能问答结果(TODO，未上线)
   * @apiName rateAnswer
   * @apiGroup User
   * @apiVersion 1.4.7
   * @apiPermission afterLogin
   * 
   * @apiParam {String} access_token 访问令牌
   * @apiParam {String} aId 指定客服uid, 只有当type === 'appointed'时有效
   * @apiParam {String} rate 是否有用: true or false
   * @apiParam {String} client 固定写死为 'web'
   * 
   * @apiDescription 评价智能问答结果，是否有用
   *
   * @apiUse ResponseResultSuccess
   */
  rateAnswer: function (aid, uid, rate) {
    //
    $.ajax({
      url: bd_kfe_data.BASE_URL +
        "/api/answer/rate",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      type: "post",
      data: JSON.stringify({
        aid: aid + '', // 转换为字符串
        uid: uid + '', // 转换为字符串
        rate: rate,
        client: bd_kfe_data.client
      }),
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + bd_kfe_data.passport.token.access_token);
      },
      success: function (response) {
        bd_kfe_utils.printLog("success:" + JSON.stringify(response.data));
        if (response.status_code === 200) {
          //
          var message = response.data;
          bd_kfe_utils.pushToMessageArray(message);
          // TODO: 评价之后，toggle修改界面，让用户看得出来评价状态
        } else {
          alert(response.message);
        }
      },
      error: function (error) {
        bd_kfe_utils.printLog("query answers error:" + JSON.stringify(error));
      }
    });
  },
  /**
   * 
   */
  sendMobile: function () {
    var mobile = $.trim($("#bytedesk_input-mobile").val());
    if (mobile.length !== 11) {
      alert('请正确天下手机号');
      return;
    }
    //
    $.ajax({
      url: bd_kfe_data.BASE_URL +
        "/api/crm/collect",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      type: "post",
      data: JSON.stringify({
        adminUid: bd_kfe_data.adminUid,
        visitorUid: bd_kfe_data.uid,
        threadTid: bd_kfe_data.thread.tid,
        name: bd_kfe_data.nickname, // TODO: 弹窗收集称呼
        mobile: mobile,
        client: bd_kfe_data.client
      }),
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + bd_kfe_data.passport.token.access_token);
      },
      success: function (response) {
        bd_kfe_utils.printLog("success:" + response.data);
        if (response.status_code === 200) {
          //
          // var message = response.data;
          // bd_kfe_utils.pushToMessageArray(message);
          var localId = bd_kfe_utils.guid();
          var message = {
            uid: localId,
            type: 'notification',
            content: '呼叫成功，我们会尽快联系您',
            createdAt: bd_kfe_utils.currentTimestamp(),
            localId: localId,
            status: 'stored',
            user: {
              uid: '',
              username: bd_kfe_data.username,
              nickname: bd_kfe_data.nickname,
              avatar: bd_kfe_data.avatar
            }
          };
          bd_kfe_utils.pushToMessageArray(message);

        } else {
          alert(response.message);
        }
      },
      error: function (error) {
        bd_kfe_utils.printLog("query answers error:" + error);
      }
    });
  },
  /**
   * @api {post} /api/leavemsg/save 留言
   * @apiName leaveMessage
   * @apiGroup User
   * @apiVersion 1.4.7
   * @apiPermission afterLogin
   * 
   * @apiParam {String} access_token 访问令牌
   * @apiParam {String} wId 工作组唯一wid
   * @apiParam {String} aId 指定客服uid, 只有当type === 'appointed'时有效 
   * @apiParam {String} type 区分工作组会话 'workGroup'、指定坐席会话 'appointed'
   * @apiParam {String} mobile 手机
   * @apiParam {String} email 邮箱
   * @apiParam {String} content 留言内容
   * @apiParam {String} client 固定写死为 'web'
   * 
   * @apiDescription 留言
   *
   * @apiUse ResponseResultSuccess
   */
  leaveMessage: function () {
    var mobile = $("#bytedesk_leavemsg_mobile").val();
    // var email = $("#leavemsgemail").val();
    var content = $("#bytedesk_leavemsg_content").val();
    $.ajax({
      url: bd_kfe_data.BASE_URL +
        "/api/leavemsg/save",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      type: "post",
      data: JSON.stringify({
        // uid: bd_kfe_data.adminUid,
        wid: bd_kfe_data.workGroupWid,
        aid: bd_kfe_data.agentUid,
        type: bd_kfe_data.type,
        mobile: mobile,
        email: '',
        content: content,
        client: bd_kfe_data.client
      }),
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + bd_kfe_data.passport.token.access_token);
      },
      success: function (response) {
        bd_kfe_utils.printLog("leave message: " + response.data);
        if (response.status_code === 200) {
          var langText = "留言成功"
          if (bd_kfe_data.lang === "en") {
            langText = "leaveMessage success"
          }
          alert(langText);
          // $("#bytedesk_chat").show();
          // $("#bytedesk_leave").hide();
          // $("#bytedesk_main").show();
        } else {
          alert(response.message);
        }
      },
      error: function (error) {
        bd_kfe_utils.printLog(error);
        var langText = "留言失败"
        if (bd_kfe_data.lang === "en") {
          langText = "leaveMessage failed"
        }
        alert(langText);
      }
    });
  },
  /**
   * @api {get} /api/status/workGroup 获取工作组当前在线状态
   * @apiName getWorkGroupStatus
   * @apiGroup WorkGroup
   * @apiVersion 1.5.6
   * @apiPermission afterLogin
   * 
   * @apiParam {String} access_token 访问令牌
   * @apiParam {String} wid 工作组唯一wid
   * @apiParam {String} client 固定写死为 'web'
   * 
   * @apiDescription 只要工作组内至少有一个客服在线，则返回为online，否则为offline
   *
   * @apiUse ResponseResultSuccess
   */
  getWorkGroupStatus: function (wid) {
    $.ajax({
      url: bd_kfe_data.BASE_URL +
        "/api/status/workGroup",
      contentType: "application/json; charset=utf-8",
      type: "get",
      data: {
        wid: wid,
        client: bd_kfe_data.client
      },
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + bd_kfe_data.passport.token.access_token);
      },
      success: function (response) {
        // get workGroup status success:{"wid":"201807171659201","status":"online"}
        // bd_kfe_utils.printLog("get workGroup status success:" + JSON.stringify(response.data));
        if (response.status_code === 200) {
          var status = response.data.status;
          // status:online
          window.parent.postMessage({ msg: 'bytedesk-status', type: 'workGroup', uuid: wid, status: status }, '*')
          bd_kfe_utils.printLog('status:' + status)
          // 
        } else {
          alert(response.message);
        }
      },
      error: function (error) {
        bd_kfe_utils.printLog("get workGroup status error:" + error);
      }
    });
  },
  /**
   * @api {get} /api/status/agent 获取用户当前在线状态
   * @apiName getUserStatus
   * @apiGroup User
   * @apiVersion 1.5.6
   * @apiPermission afterLogin
   * 
   * @apiParam {String} access_token 访问令牌
   * @apiParam {String} uid 用户唯一uid
   * @apiParam {String} client 固定写死为 'web'
   * 
   * @apiDescription 在线返回为online，否则为offline
   *
   * @apiUse ResponseResultSuccess
   */
  getUserStatus: function (uid) {
    $.ajax({
      url: bd_kfe_data.BASE_URL +
        "/api/status/agent",
      contentType: "application/json; charset=utf-8",
      type: "get",
      data: {
        uid: uid,
        client: bd_kfe_data.client
      },
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + bd_kfe_data.passport.token.access_token);
      },
      success: function (response) {
        // get user status success:{"uid":"201808221551193","status":"online"}
        // bd_kfe_utils.printLog("get user status success:" + JSON.stringify(response.data));
        //
        if (response.status_code === 200) {
          var status = response.data.status;
          // status:online
          window.parent.postMessage({ msg: 'bytedesk-status', type: 'agent', uuid: uid, status: status }, '*')
          bd_kfe_utils.printLog('status:' + status);

        } else {
          alert(response.message);
        }
      },
      error: function (error) {
        bd_kfe_utils.printLog("get user status error:" + error);
      }
    });
  },
  /**
   * @api {get} /api/messages/unreadCoun 获取未读消息数目
   * @apiName getUnreadCount
   * @apiGroup User
   * @apiVersion 1.5.6
   * @apiPermission afterLogin
   * 
   * @apiParam {String} access_token 访问令牌
   * @apiParam {String} wid 技能组或指定客服唯一id
   * @apiParam {String} client 固定写死为 'web'
   * 
   * @apiDescription 数字
   *
   * @apiUse ResponseResultSuccess
   */
  getUnreadCount: function (wid) {
    $.ajax({
      url: bd_kfe_data.BASE_URL +
        "/api/messages/unreadCount",
      contentType: "application/json; charset=utf-8",
      type: "get",
      data: {
        wid: wid,
        client: bd_kfe_data.client
      },
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + bd_kfe_data.passport.token.access_token);
      },
      success: function (response) {
        bd_kfe_utils.printLog("get unread count success:" + response.data);
      },
      error: function (error) {
        bd_kfe_utils.printLog("get unreadCount error:" + error);
      }
    });
  },
  /**
   * @api {get} /api/messages/unreadCoun/visitor 访客端-查询访客所有未读消息数目
   * @apiName getUnreadCountVisitor
   * @apiGroup User
   * @apiVersion 1.5.6
   * @apiPermission afterLogin
   * 
   * @apiParam {String} access_token 访问令牌
   * @apiParam {String} client 固定写死为 'web'
   * 
   * @apiDescription 数字
   *
   * @apiUse ResponseResultSuccess
   */
  getUnreadCountVisitor: function () {
    $.ajax({
      url: bd_kfe_data.BASE_URL +
        "/api/messages/unreadCount/visitor",
      contentType: "application/json; charset=utf-8",
      type: "get",
      data: {
        client: bd_kfe_data.client
      },
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + bd_kfe_data.passport.token.access_token);
      },
      success: function (response) {
        bd_kfe_utils.printLog("get unread count visitor success:", response.data);
      },
      error: function (error) {
        bd_kfe_utils.printLog("get unreadCount visitor error:", error);
      }
    });
  },
  /**
   * 技能组设置
   */
  getPrechatSettings: function () {
    //
    if (bd_kfe_data.type !== 'workGroup') {
      return
    }
    //
    $.ajax({
      url: bd_kfe_data.BASE_URL + "/visitor/api/prechat/settings",
      contentType: "application/json; charset=utf-8",
      type: "get",
      data: {
        wid: bd_kfe_data.workGroupWid,
        client: bd_kfe_data.client
      },
      success: function (response) {
        // bd_kfe_utils.printLog("fetch pre setting success:" + JSON.stringify(response.data));
        console.log("fetch pre setting success:", response.data)
        if (response.status_code === 200) {
          var workGroup = response.data
          bd_kfe_httpapi.dealWithWorkGroup(workGroup)
        }
      },
      error: function (error) {
        bd_kfe_utils.printLog("fetch pre setting error:", error);
      }
    });
  },
  dealWithWorkGroup: function (workGroup) {
    console.log('dealWithWorkGroup:', workGroup)
    if (workGroup.wid === null) {
      return
    }
    // 如果是预加载，则直接返回，不请求会话
    if (bd_kfe_data.preload === "1") {
      // 是否自动弹窗
      if (workGroup.autoPop) {
        // 触发点击icon动作
        window.parent.postMessage("bytedesk-popup", '*');
      }
      return
    }
    bd_kfe_data.workGroupNickname = workGroup.nickname;
    bd_kfe_data.workGroupAvatar = workGroup.avatar;
    bd_kfe_data.workGroupDescription = workGroup.description;
    // 是否自动弹窗
    if (workGroup.autoPop) {
      // 触发点击icon动作
      window.parent.postMessage("bytedesk-popup", '*');
    }
    // 显示置顶语
    if (workGroup.showTopTip) {
      $('#bytedesk_toptip').html(workGroup.topTip)
    }
    // 显示手机号输入框
    if (workGroup.showCollectMobile) {
      $("#bytedesk_message-input").show()
    }
    // 询前表单
    if (workGroup.showForm) {
      // TODO: 后台自定义显示字段
      $("#bytedesk_form-name-div").show();
      $("#bytedesk_form-mobile-div").show();
      bd_kfe_utils.switchForm()
    }
    // 隐藏logo
    if (workGroup.hideLogo) {
      $("#bytedesk_logo").hide()
    }
    // 显示右侧栏，TODO: 右侧参数带去掉
    if (workGroup.showRightColumn && (bd_kfe_data.column === "2")) {
      // console.log('showRightColumn')
      bd_kfe_utils.showRightColumn(workGroup.workTabs)
    } else if (bd_kfe_data.column === "2") {
      console.log('默认显示faq-2')
      $("#bytedesk_right").show();
      $("#bytedesk_right_tab").append("<button class='bytedesk_right_tablinks'>常见问题</button>")
      $("#bytedesk_right_tabcontent").append("<div id='faq' class='bytedesk_right_tabcontent'>" +
        "<div id=\"bytedesk_question\"></div>" +
        "</div >")
      bd_kfe_httpapi.getTopAnswers();
      //
      bd_kfe_utils.rightTabInit()
    }
  },
  /**
   * 拉取技能组-快捷按钮
   * FIXME: 显示遮挡对话内容
   */
  getQuickButtons: function () {
    // 如果是预加载，则直接返回，不请求会话
    if (bd_kfe_data.preload === "1") {
      return
    }
    // 目前仅支持技能组
    if (bd_kfe_data.type !== 'workGroup') {
      return
    }
    //
    $.ajax({
      url: bd_kfe_data.BASE_URL + "/api/quickbutton/query/workGroup",
      contentType: "application/json; charset=utf-8",
      type: "get",
      data: {
        wid: bd_kfe_data.workGroupWid,
        client: bd_kfe_data.client
      },
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + bd_kfe_data.passport.token.access_token);
      },
      success: function (response) {
        // bd_kfe_utils.printLog("getQuickButtons success:" + JSON.stringify(response.data));
        //
        if (response.data.length > 0) {
          $('#bytedesk_quick_question').show()
          $(".footer").css("height", "135px");
        }
        for (let i = 0; i < response.data.length && i < 4; i++) {
          const element = response.data[i];
          var item = "<span class=\"bytedesk_quick_question-item\" onclick=\"bd_kfe_utils.handleQuickbuttonClick(\'" + element.type + "\',\'" + element.title + "\',\'" + element.content + "\')\" >" + element.title + "</span>";
          $("#bytedesk_quick_question").append(item)
        }
      },
      error: function (error) {
        bd_kfe_utils.printLog("getQuickButtons error:", error);
      }
    });
  },
  /**
   * 拉取技能组-转人工关键词
   */
  getTransferWords: function () {
    // 如果是预加载，则直接返回，不请求会话
    if (bd_kfe_data.preload === "1") {
      return
    }
    // 目前仅支持技能组
    if (bd_kfe_data.type !== 'workGroup') {
      return
    }
    //
    $.ajax({
      url: bd_kfe_data.BASE_URL + "/api/transferword/query/workGroup",
      contentType: "application/json; charset=utf-8",
      type: "get",
      data: {
        wid: bd_kfe_data.workGroupWid,
        client: bd_kfe_data.client
      },
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + bd_kfe_data.passport.token.access_token);
      },
      success: function (response) {
        console.log('getTransferWords:', response)
        bd_kfe_data.transferWords = response.data
        //
      },
      error: function (error) {
        bd_kfe_utils.printLog("getQuickButtons error:", error);
      }
    });
  },
  //  根据topic拉取历史消息
  loadHistoryMessagesByTopic: function (topic) {
    // 如果是预加载，则直接返回，不请求会话
    if (bd_kfe_data.preload === "1") {
      return
    }
    //
    // if (this.isRequestAgent || this.isManulRequestThread || this.loadHistory === '0') {
    //   return;
    // }
    $.ajax({
      url: bd_kfe_data.BASE_URL +
        "/api/messages/topic",
      type: "get",
      data: {
        topic: topic,
        page: bd_kfe_data.page,
        size: 10,
        client: bd_kfe_data.client
      },
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + bd_kfe_data.passport.token.access_token);
      },
      success: function (response) {
        bd_kfe_utils.printLog('loadHistoryMessagesByTopic: ' + JSON.stringify(response));
        //
        if (response.status_code === 200) {
          for (let i = 0; i < response.data.content.length; i++) {
            const message = response.data.content[i]
            // bd_kfe_utils.printLog('message:', message);
            // bd_kfe_utils.pushToMessageArray(message, true)
            if (message.type === 'notification_form_request' ||
              message.type === 'notification_form_result') {
              // 暂时忽略表单消息
            } if (message.type === 'notification_thread_reentry') {
              // 连续的 ‘继续会话’ 消息，只显示最后一条
              if (i + 1 < length) {
                var nextmsg = response.data.content[i + 1];
                if (nextmsg.type === 'notification_thread_reentry') {
                  continue
                } else {
                  bd_kfe_utils.pushToMessageArray(message, true)
                }
              }
            } else {
              bd_kfe_utils.pushToMessageArray(message, true)
            }
          }
        }
        bd_kfe_utils.scrollToBottom()
        // app.$previewRefresh()
      },
      error: function (error) {
        bd_kfe_utils.printLog(error);
      }
    });
  },
  // 加载最新10条消息，用于定时拉取最新消息
  loadLatestMessage: function () {
    // 如果是预加载，则直接返回，不请求会话
    if (bd_kfe_data.preload === "1") {
      return
    }
    //
    $.ajax({
      url: bd_kfe_data.BASE_URL + "/api/messages/topic",
      type: "get",
      data: {
        topic: bd_kfe_data.thread.topic,
        page: 0,
        size: 10,
        client: bd_kfe_data.client
      },
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + bd_kfe_data.passport.token.access_token);
      },
      success: function (response) {
        bd_kfe_utils.printLog('loadLatestMessage: ' + JSON.stringify(response));
        //
        if (response.status_code === 200) {
          for (let i = 0; i < response.data.content.length; i++) {
            const message = response.data.content[i]
            // bd_kfe_utils.printLog('message:', message);
            // bd_kfe_utils.pushToMessageArray(message, true)
            if (message.type === 'notification_form_request' ||
              message.type === 'notification_form_result') {
              // 暂时忽略表单消息
            } if (message.type === 'notification_thread_reentry') {
              // 连续的 ‘继续会话’ 消息，只显示最后一条
              if (i + 1 < length) {
                var nextmsg = response.data.content[i + 1];
                if (nextmsg.type === 'notification_thread_reentry') {
                  continue
                } else {
                  bd_kfe_utils.pushToMessageArray(message, true)
                }
              }
            } else {
              bd_kfe_utils.pushToMessageArray(message, true)
            }
          }
        }
        bd_kfe_utils.scrollToBottom()
        // app.$previewRefresh()
      },
      error: function (error) {
        bd_kfe_utils.printLog(error);
      }
    });
  },
  // 拉取未读消息
  loadMessagesUnread: function () {
    // 如果长链接正常，则直接返回
    if (bd_kfe_data.isConnected) {
      return
    }
    // 如果是机器人，则直接返回
    if (bd_kfe_data.isRobot) {
      return
    }
    //
    bd_kfe_httpapi.getMessagesUnread();
  },
  // 
  getMessagesUnread: function () {
    // 如果是预加载，则直接返回，不请求会话
    if (bd_kfe_data.preload === "1") {
      return
    }
    //
    $.ajax({
      url: bd_kfe_data.BASE_URL + "/api/messages/unread/message/visitor/schedule",
      type: "get",
      data: {
        page: 0,
        size: 10,
        client: bd_kfe_data.client
      },
      beforeSend: function (xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + bd_kfe_data.passport.token.access_token);
      },
      success: function (response) {
        bd_kfe_utils.printLog('loadMessagesUnread: ' + JSON.stringify(response));
        //
        if (response.status_code === 200) {
          for (let i = 0; i < response.data.content.length; i++) {
            const message = response.data.content[i]
            // bd_kfe_utils.printLog('message:', message);
            // bd_kfe_utils.pushToMessageArray(message, true)
            if (message.type === 'notification_form_request' ||
              message.type === 'notification_form_result') {
              // 暂时忽略表单消息
            } if (message.type === 'notification_thread_reentry') {
              // 连续的 ‘继续会话’ 消息，只显示最后一条
              if (i + 1 < length) {
                var nextmsg = response.data.content[i + 1];
                if (nextmsg.type === 'notification_thread_reentry') {
                  continue
                } else {
                  bd_kfe_utils.pushToMessageArray(message, true)
                }
              }
            } else {
              bd_kfe_utils.pushToMessageArray(message, true)
            }
          }
        }
        // bd_kfe_utils.scrollToBottom()
      },
      error: function (error) {
        bd_kfe_utils.printLog(error);
      }
    });
  },
  //
  getShortUrl: function (url, successCallback, failedCallback) {
    // 
    $.ajax({
      url: bd_kfe_data.BASE_URL + "/url/to/short",
      contentType: "application/json; charset=utf-8",
      type: "get",
      data: {
        url: url,
        uid: bd_kfe_data.adminUid,
        client: 'web'
      },
      success: function (response) {
        console.log("get short url success:", response.data);
        // if (!bd_kfe_data.IS_PRODUCTION) {
        //   bd_kfe_data.shortCode = bd_kfe_data.BASE_URL + "/chat/" + response.data
        // } else {
        //   bd_kfe_data.shortCode = "http://url.chainsnow.com/chat/" + response.data
        // }
        successCallback(bd_kfe_data.shortCode)
      },
      error: function (error) {
        console.log("get short url error:", error);
        failedCallback(error);
      }
    });
  },
};

