/**
 * 漂浮框
 * @version 1.0.3
 * @author www.bytedesk.com
 * @date 2018/10/03
 */
(function () {
  //
  var contentHtml = '<div id="byteDesk-start" class="byteDesk-start-medium" style="display: none;">\n' +
      '               <img src="/assets/img/icon/chat.png" style="height:25px; width:25px; margin-top: 13px;"/>' +
      '        </div>';
  //
  var byteDesk = document.getElementById('byteDesk');
  byteDesk.insertAdjacentHTML('beforeend', contentHtml);
})();

