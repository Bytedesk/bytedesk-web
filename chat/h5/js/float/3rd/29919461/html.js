/**
 * html js
 * @version 1.1.1
 * @author www.bytedesk.com
 * @date 2018/10/18
 */
(function () {
  //
  var contentHtml = 
  '<div id="byteDesk-app-wrapper" style="display: none">' +
    '<div id="byteDesk-app">' +
      '<div id="byteDesk-title">' +
        '<div id="byteDesk-name">' +
          '<div style="height: 100%;">' +
            '<img id="byteDesk-agent-avatar" src="//cdn.bytedesk.com/assets/img/default_avatar.png" width="40px" height="40px"/>' +
            '<div style="margin-left: 60px;">' +
              '<div id="byteDesk-agent-nickname">' + 
                '昵称' +
              '</div>' +
              '<div id="byteDesk-agent-description">' + 
                '描述' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>' + // byteDesk-name
        '<div id="byteDesk-close">' + 
          '<span style="cursor: pointer;"><i class="iconfont icon-close"></i></span>' +
        '</div>' + 
        '<div id="byteDesk-max">' + 
          '<span style="cursor: pointer;"><i class="iconfont icon-max"></i></span>' +
        '</div>' + 
      '</div>' + // byteDesk-title
      '<div id="byteDesk-main">' +
        '<div id="byteDesk-message-pc">' +
          '<ul id="byteDesk-message-ul" class="byteDesk-message-ul">' +
          '</ul>' + 
        '</div>' + // byteDesk-message-pc
        '<div id="byteDesk-input-pc">' + 
          '<div id="byteDesk-input-emoji-box" style="display: none;">' +
          '</div>' +
          '<div class="byteDesk-input-pc-buttons">' +
            // '<li id="byteDesk-input-emoji" class="iconfont icon-emoji"></li>' +
            '<input type="file" id="imagefile" style="display: none;"/>' +
            '<li id="byteDesk-upload-image" class="iconfont icon-image"></li>' +
            '<li id="byteDesk-message-rate" class="iconfont icon-rate"></li>' +
            '<li id="byteDesk-message-tip">对方正在输入</li>' +
          '</div>' + // byteDesk-input-pc-buttons
          '<textarea id="byteDesk-input-textarea" placeholder="请输入" onkeyup="bd_kfe_utils.onKeyUp(arguments[0] || window.event)"></textarea>' +
          '<div id="byteDesk-input-pc-send">' + 
            '<span id="byteDesk-input-pc-send-btn" style="color: black; cursor: pointer;">发送</span>' +
          '</div>' + // byteDesk-input-pc-send
          '<div id="byteDesk-logo">' + 
            '<a href="http://www.bytedesk.com" target="_blank">客服软件由萝卜丝提供</a>' +
          '</div>' + // byteDesk-logo
        '</div>' + // byteDesk-input-pc
      '</div>' + // byteDesk-main
      '<div id="byteDesk-rate">' +
        '<p>感谢您的咨询，请为本次服务进行评价：</p>' +
            '<div id="ratestar">' +
              '<img id="ratestar1" style="cursor: pointer;" src="//cdn.bytedesk.com/assets/img/rate/ratestar_selected.png" onclick="bd_kfe_utils.rateStarChoose(1)">' +
              '<img id="ratestar2" style="cursor: pointer;" src="//cdn.bytedesk.com/assets/img/rate/ratestar_selected.png" onclick="bd_kfe_utils.rateStarChoose(2)">' +
              '<img id="ratestar3" style="cursor: pointer;" src="//cdn.bytedesk.com/assets/img/rate/ratestar_selected.png" onclick="bd_kfe_utils.rateStarChoose(3)">' +
              '<img id="ratestar4" style="cursor: pointer;" src="//cdn.bytedesk.com/assets/img/rate/ratestar_selected.png" onclick="bd_kfe_utils.rateStarChoose(4)">' +
              '<img id="ratestar5" style="cursor: pointer;" src="//cdn.bytedesk.com/assets/img/rate/ratestar_selected.png" onclick="bd_kfe_utils.rateStarChoose(5)">' +
            '</div>' +
            '<div id="ratescore"></div>' +
            '<p>附言:</p>' +
            '<div id="suggest" class="suggestarea">' +
              '<textarea id="suggestcontent" style="width: 48%; height: 66px;"></textarea>' +
            '</div>' +
            '<div class="rate-button" onclick="bd_kfe_httpapi.rate()">提交</div>' +
            '<div class="rate-button" onclick="bd_kfe_utils.hideRate()">取消</div>' +
        // '<span id="byteDesk-rate-close" style="cursor: pointer; color: gray;"><i class="iconfont icon-close"></i>查看httpapi.js文件rate相关接口</span>' +
      '</div>' + // byteDesk-rate 评价
      '<div id="byteDesk-leave">' +
        '<table>' +
          '<tr>' +
            '<td>联系方式</td>' +
            '<td><input id="leavemsgmobile" class="leavemsginput" type="text" name="mobile"/></td>' +
          '</tr>' +
          '<tr>' +
            '<td>留言</td>' +
            '<td><textarea id="leavemsgcontent" class="leavemsgtext"></textarea></td>' +
          '</tr>' +
          '<tr>' +
            '<td></td>' +
            '<td>' +
              '<div class="leave-message-button" onclick="bd_kfe_httpapi.leaveMessage()">提交</div>' +
            '</td>' +
          '</tr>' +
        '</table>' +
      '</div>' + // byteDesk-leave 留言
      '<div id="byteDesk-search">' +
      '</div>' + // byteDesk-search 自助搜索查询
      '<div id="byteDesk-questionnaire">' +
      '</div>' + // bytedesk-questionnaire 询前问卷
      '<div id="byteDesk-agent-detail">' +
      '</div>' + // byteDesk-agent-detail 点击客服头像，显示客服详情，如：联系方式，等级评分等
    '</div>' + // byteDesk-app
   '</div>'; // byteDesk-app-wrapper
  //
  var byteDesk = document.getElementById('byteDesk');
  byteDesk.insertAdjacentHTML('beforeend', contentHtml);
})();
