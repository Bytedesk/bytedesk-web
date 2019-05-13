/**
 * float js 中等大小icon
 * @version 1.0.8
 * @author www.bytedesk.com
 * @date 2018/10/15
 */
(function () {

    /**
     * https://github.com/ChenShenhai/blog/issues/8
     *
     * js列表加载索引
     * @type {number}
     * @private
     */
    var _index = 0;

    /**
     * 加载js文件
     * @name loadJs
     * @param {String} url
     * @param {Function} callback   文件加载后回调时间
     */
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
            }
        } else {
            _script.onload = function() {
                callback();
                this.onload = this.onreadystatechange = null;
                this.parentNode.removeChild(this);
            }
        }

        document.getElementsByTagName('head')[0].appendChild(_script);
    }

    /**
     * 加载js文件列表
     * @name loadJsList
     * @param {Array} arr
     */
    function loadJsList() {

        if( _index < vendorJs.length ) {

            loadJs(vendorJs[_index], function() {
                _index ++;
                loadJsList(vendorJs);
            })
        }
    }

    // 样式表
    var floatCss = document.createElement('link');
    floatCss.setAttribute('href','//cdn.bytedesk.com/css/float.css');
    floatCss.setAttribute('rel','stylesheet');
    floatCss.setAttribute('type','text/css');
    document.getElementsByTagName("head")[0].appendChild(floatCss);

    //
    var elementCss = document.createElement('link');
    elementCss.setAttribute('href','//unpkg.com/element-ui@2.4.0/lib/theme-chalk/index.css');
    elementCss.setAttribute('rel','stylesheet');
    elementCss.setAttribute('type','text/css');
    document.getElementsByTagName("head")[0].appendChild(elementCss);

    //
    var alicdnCss = document.createElement('link');
    alicdnCss.setAttribute('href','//at.alicdn.com/t/font_761687_dmeuhcj8d3i.css');
    alicdnCss.setAttribute('rel','stylesheet');
    alicdnCss.setAttribute('type','text/css');
    document.getElementsByTagName("head")[0].appendChild(alicdnCss);

    // 第三方库
    var vendorJs = [
        '//cdn.bootcss.com/jquery/1.9.1/jquery.min.js',
        '//cdn.bytedesk.com/js/vendor/uaparser/0.7.18/ua-parser.min.js',
        '//cdn.bytedesk.com/js/vendor/fingerprintjs2/1.8.0/fingerprint2.min.js',
        '//cdn.bytedesk.com/js/vendor/moment/2.22.1/moment.min.js',
        '//cdn.bytedesk.com/js/vendor/sockjs/1.1.4/sockjs.min.js',
        '//cdn.bytedesk.com/js/vendor/stomp/1.2/stomp.min.js',
        '//cdn.bytedesk.com/js/vendor/vue/2.5.16/vue.min.js',
        '//cdn.bytedesk.com/js/vendor/elementui/2.4.0/index.js',
        // '//cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js',
        // 自定义的js
        './js/float/medium.js',
        './js/float/html.js',
        './js/float/client.js'
    ];
    loadJsList(vendorJs);


})();


