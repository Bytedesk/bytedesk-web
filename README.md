# bytedesk web chat float demo

## chatfloat demo

```js
<script src="./index.js"></script>
<script>
    // init chatfloat, and init params
    window.ChatFloat({
        chatUrl: 'http://localhost:9006/chat?t=1&sid=default_wg_uid&', // custom chat url
        //buttonPosition: 'right', // botton position：left or right
        //buttonBackgroundColor: 'blue', // button background color
        //iframeMargins: { right: 20, bottom: 20, left: 20 }, // iframe margins
        //buttonMargins: { right: 20, bottom: 20, left: 20 }, // button margins
        //showButton: true, // show button or not
        //showIframe: true // show iframe or not
    });
</script>
```

## chatfloat jquery demo

```js
<script type="text/javascript" src="https://cdn.kefux.com/assets/js/vendor/jquery/1.9.1/jquery.min.js"></script>
<div id="bytedesk-float-chat"></div>
<script src="index.js"></script>
<script>
    $(document).ready(function () {
        $('#bytedesk-float-chat').ChatFloat({
            chatUrl: 'http://localhost:9006/chat?t=1&sid=default_wg_uid&',
            //buttonPosition: 'right', // botton position：left or right
            //buttonBackgroundColor: 'blue', // button background color
            //iframeMargins: { right: 20, bottom: 20, left: 20 }, // iframe margins
            //buttonMargins: { right: 20, bottom: 20, left: 20 }, // button margins
            //showButton: true, // show button or not
            //showIframe: true // show iframe or not
        });
    });
</script>
```
