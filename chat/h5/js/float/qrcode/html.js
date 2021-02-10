/**
 * html js
 * @version 1.1.1
 * @author www.bytedesk.com
 * @date 2018/10/18
 */
(function () {
    //
    var contentHtml = 
    '<div id="byteDesk-qrcode-app-wrapper">' +
      '<div id="byteDesk-qrcode-app">' +
      '</div>' + // byteDesk-app
     '</div>'; // byteDesk-app-wrapper
    //
    var byteDesk = document.getElementById('byteDesk-qrcode');
    byteDesk.insertAdjacentHTML('beforeend', contentHtml);
  })();
  