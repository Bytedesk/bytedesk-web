/**
 * float js 中等大小icon
 * @version 1.0.8
 * @author cdn.bytedesk.com
 * @date 2018/10/15
 */
(function () {
  // https://github.com/ChenShenhai/blog/issues/8
  var _index = 0;
  function loadJs(url, callback) {
      var _script = document.createElement('script');
      _script.src = url;
      callback = callback || function(){};
      if(navigator.userAgent.indexOf("MSIE") > 0) {
          _script.onreadystatechange = function () {
              //
              if('loaded' === this.readyState || 'complete' === this.readyState){
                  callback();
                  this.onload = this.onreadystatechange = null;
                  this.parentNode.removeChild(this);
              }
          };
      } else {
          _script.onload = function() {
              callback();
              this.onload = this.onreadystatechange = null;
              this.parentNode.removeChild(this);
          };
      }
      document.getElementsByTagName('head')[0].appendChild(_script);
  }
  function loadJsList() {
      if( _index < vendorJs.length ) {
          loadJs(vendorJs[_index], function() {
              _index ++;
              loadJsList(vendorJs);
          });
      }
  }
  //
  var alicdnCss = document.createElement('link');
  alicdnCss.setAttribute('href','//at.alicdn.com/t/font_761687_3ir3qjqv9ft.css');
  alicdnCss.setAttribute('rel','stylesheet');
  alicdnCss.setAttribute('type','text/css');
  document.getElementsByTagName("head")[0].appendChild(alicdnCss);

  // 样式表
  var floatCss = document.createElement('link');
  floatCss.setAttribute('href','/kefu/js/float/3rd/29919461/narrow.css');
  floatCss.setAttribute('rel','stylesheet');
  floatCss.setAttribute('type','text/css');
  document.getElementsByTagName("head")[0].appendChild(floatCss);

  // 第三方库
  var vendorJs = [
    '//cdn.bytedesk.com/js/vendor/jquery/1.9.1/jquery.min.js',
    '//cdn.bytedesk.com/js/vendor/uaparser/0.7.18/ua-parser.min.js',
    '//cdn.bytedesk.com/js/vendor/fingerprintjs2/1.8.0/fingerprint2.min.js',
    '//cdn.bytedesk.com/js/vendor/moment/2.22.1/moment.min.js',
    '//cdn.bytedesk.com/js/vendor/sockjs/1.1.4/sockjs.min.js',
    '//cdn.bytedesk.com/js/vendor/stomp/1.2/stomp.min.js',
    // protobuf相关
    // '/kefu/js/protobuf/build.js',
    // 自定义的js
    '/kefu/js/float/3rd/29919461/common/bd_kfe_data.js',
    '/kefu/js/float/3rd/29919461/common/bd_kfe_utils.js',
    '/kefu/js/float/3rd/29919461/common/bd_kfe_httpapi.js',
    '/kefu/js/float/3rd/29919461/common/bd_kfe_stompapi.js',
    '/kefu/js/float/3rd/29919461/icon.js',
    '/kefu/js/float/3rd/29919461/html.js',
    '/kefu/js/float/3rd/29919461/ready.js'
  ];
  loadJsList(vendorJs);


})();
