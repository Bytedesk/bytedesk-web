(function () {
    //
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
    floatCss.setAttribute('href','/kefu/css/qrcode.css');
    floatCss.setAttribute('rel','stylesheet');
    floatCss.setAttribute('type','text/css');
    document.getElementsByTagName("head")[0].appendChild(floatCss);
    // 第三方库
    var vendorJs = [
        '/kefu/js/float/qrcode/icon.js',
        '/kefu/js/float/qrcode/html.js',
        '/kefu/js/float/qrcode/ready.js'
    ];
    loadJsList(vendorJs);
})();