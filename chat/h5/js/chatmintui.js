document.getElementById("app-wrapper").style.display = '';
var options = {
    fullscreenEl: false, //关闭全屏按钮
}
Vue.use(vuePhotoPreview, options)
// 准备翻译的语言环境信息
const messages = {
    en: {
        contactAgent: 'contact agent',
        typing: 'typing...',
        sendLink: 'send link',
        agentChat: 'agent chat',
        viewFile: 'view file',
        arrived: 'arrived',
        readed: 'readed',
        leaveWord: 'leave message',
        name: 'name',
        inputName: 'input name',
        mobile: 'mobile',
        inputMobile: 'input mobile',
        leaveContent: 'leave content',
        email: 'email',
        inputEmail: 'input email',
        age: 'age',
        inputAge: 'input age',
        job: 'job',
        inputJob: 'input job',
        pleaseRate: 'please rate',
        veryGood: 'very good',
        good: 'good',
        average: 'average',
        notGood: 'not good',
        bad: 'very bad',
        submit: 'submit',
        inviteRate: "invite rate",
        rateResult: "rated",
        rate: 'rate',
        rateContent: 'rate content',
        pleaseInput: 'please input',
        rateAgain: 'cant rate again',
        continueChat: 'continue',
        agentCloseThread: "agent close thread",
        visitorCloseThread: "visitor close thread",
        autoCloseThread: "system close thread",
        agentOffline: "agent offline, please leave message",
        // systemUser: 'system user',
        postScriptPrefix: '<postScript>:',
        send: 'send'
    },
    cn: {
        contactAgent: '联系客服',
        typing: '对方正在输入...',
        sendLink: '发送链接',
        agentChat: '人工客服',
        viewFile: '查看文件',
        arrived: '送达',
        readed: '已读',
        leaveWord: '留言',
        name: '姓名',
        inputName: '请输入姓名',
        mobile: '手机号',
        inputMobile: '请输入手机号',
        leaveContent: '留言内容',
        email: '邮箱',
        inputEmail: '请输入邮箱',
        age: '年龄',
        inputAge: '请输入年龄',
        job: '职业',
        inputJob: '请输入职业',
        pleaseRate: '请对我们服务做出评价',
        veryGood: '非常满意',
        good: '满意',
        average: '一般',
        notGood: '不满意',
        bad: '非常不满意',
        submit: '提交',
        inviteRate: "邀请评价",
        rateResult: "已评价",
        rate: '评价',
        rateContent: '评价内容',
        pleaseInput: '请输入',
        rateAgain: '不能重复评价',
        continueChat: '继续会话',
        agentCloseThread: "客服关闭会话",
        visitorCloseThread: "访客关闭会话",
        autoCloseThread: "长时间没有对话，系统自动关闭会话",
        agentOffline: "当前无客服在线，请留言",
        // systemUser: '系统通知',
        postScriptPrefix: '<附言>:',
        send: '发送'
    }
}
// 通过选项创建 VueI18n 实例
const i18n = new VueI18n({
    locale: 'cn', // 设置地区
    messages, // 设置地区信息
})
var app = new Vue({
    el: '#app',
    i18n,
    name: 'chatmintui',
    data() {
        return {
            //
            // IS_PRODUCTION: false,
            // HTTP_HOST: "http://127.0.0.1:8000",
            // STOMP_HOST: "http://127.0.0.1:8000",
            IS_PRODUCTION: true,
            HTTP_HOST: "https://www.bytedesk.com",
            STOMP_HOST: "https://www.bytedesk.com",
            //
            title: '萝卜丝',
            isInputingVisible: false,
            localPreviewContent: '',
            //
            imageDialogVisible: false,
            currentImageUrl: '',
            currentVoiceUrl: '',
            // show_emoji: false,
            // emojiBaseUrl: 'https://chainsnow.oss-cn-shenzhen.aliyuncs.com/emojis/gif/',
            inputContent: '',
            messages: [],
            loadMoreVisible: true,
            //
            // 留言 + 表单
            realname: '',
            mobile: '',
            email: '',
            age: 0,
            job: '',
            content: '',
            //
            showRealname: false,
            showMobile: false,
            showEmail: false,
            showAge: false,
            showJob: false,
            showContent: false,
            // 仅允许评价一次
            isRated: false,
            // 是否客服邀请评价
            isInviteRate: false,
            // 满意度评分
            rateScore: 5,
            rateValue: '非常满意',
            // 满意度附言
            rateContent: '',
            //
            isLoading: false,
            stompClient: '',
            sessionId: '',
            preSessionId: '',
            browseInviteBIid: '',
            //
            access_token: '',
            passport: {
                token: {
                    access_token: '',
                }
            },
            adminUid: '',
            workGroupWid: '',
            subDomain: '',
            client: 'web_h5',
            thread: {
                id: 0,
                tid: ''
            },
            // 已经订阅的topic
            subscribedTopics: [],
            // 加载聊天记录offset
            page: 0,
            // 是否是最后一批聊天记录
            last: false,
            // workGroup/visitor/contact/group
            type: 'workGroup',
            // 指定客服
            agentUid: '',
            // 当前访客用户名
            uid: '',
            username: '',
            password: '',
            nickname: '',
            // 本地存储access_token的key
            token: 'bd_kfe_token',
            isConnected: false,
            answers: [],
            isRobot: false,
            isThreadStarted: false,
            isThreadClosed: false,
            isManulRequestThread: false,
            // focusStatus: true,
            leaveMessageTip: '',
            loadHistory: '1',
            postscript: '',
            showScript: false,
            hideNav: false,
            backUrl: '',
            topTip: '',
            showTopTip: false,
            //
            showMessage: true,
            showInputBar: true,
            showLeaveMessage: false,
            showRate: false,
            showForm: false,
            //
            lang: 'cn',
            //
            emotionBaseUrl: 'https://chainsnow.oss-cn-shenzhen.aliyuncs.com/emojis/gif/',
            // 表情
            emotionMap: {
                '[微笑]': '100.gif',
                '[撇嘴]': '101.gif',
                '[色]': '102.gif',
                '[发呆]': '103.gif',
                '[得意]': '104.gif',
                '[流泪]': '105.gif',
                '[害羞]': '106.gif',
                '[闭嘴]': '107.gif',
                '[睡]': '108.gif',
                '[大哭]': '109.gif',

                '[尴尬]': '110.gif',
                '[发怒]': '111.gif',
                '[调皮]': '112.gif',
                '[呲牙]': '113.gif',
                '[惊讶]': '114.gif',
                '[难过]': '115.gif',
                '[酷]': '116.gif',
                '[冷汗]': '117.gif',
                '[抓狂]': '118.gif',
                '[吐]': '119.gif',

                '[偷笑]': '120.gif',
                '[愉快]': '121.gif',
                '[白眼]': '122.gif',
                '[傲慢]': '123.gif',
                '[饥饿]': '124.gif',
                '[困]': '125.gif',
                '[惊恐]': '126.gif',
                '[流汗]': '127.gif',
                '[憨笑]': '128.gif',
                '[悠闲]': '129.gif',

                '[奋斗]': '130.gif',
                '[咒骂]': '131.gif',
                '[疑问]': '132.gif',
                '[嘘]': '133.gif',
                '[晕]': '134.gif',
                '[疯了]': '135.gif',
                '[衰]': '136.gif',
                '[骷髅]': '137.gif',
                '[敲打]': '138.gif',
                '[再见]': '139.gif',

                '[擦汗]': '140.gif',
                '[抠鼻]': '141.gif',
                '[鼓掌]': '142.gif',
                '[糗大了]': '143.gif',
                '[坏笑]': '144.gif',
                '[左哼哼]': '145.gif',
                '[右哼哼]': '146.gif',
                '[哈欠]': '147.gif',
                '[鄙视]': '148.gif',
                '[委屈]': '149.gif',

                '[快哭]': '150.gif',
                '[阴险]': '151.gif',
                '[亲亲]': '152.gif',
                '[吓]': '153.gif',
                '[可怜]': '154.gif',
                '[菜刀]': '155.gif',
                '[西瓜]': '156.gif',
                '[啤酒]': '157.gif',
                '[篮球]': '158.gif',
                '[乒乓]': '159.gif',

                '[咖啡]': '160.gif',
                '[饭]': '161.gif',
                '[猪头]': '162.gif',
                '[玫瑰]': '163.gif',
                '[凋谢]': '164.gif',
                '[嘴唇]': '165.gif',
                '[爱心]': '166.gif',
                '[心碎]': '167.gif',
                '[蛋糕]': '168.gif',
                '[闪电]': '169.gif',

                '[炸弹]': '170.gif',
                '[刀]': '171.gif',
                '[足球]': '172.gif',
                '[瓢虫]': '173.gif',
                '[便便]': '174.gif',
                '[月亮]': '175.gif',
                '[太阳]': '176.gif',
                '[礼物]': '177.gif',
                '[拥抱]': '178.gif',
                '[强]': '179.gif',

                '[弱]': '180.gif',
                '[握手]': '181.gif',
                '[胜利]': '182.gif',
                '[抱拳]': '183.gif',
                '[勾引]': '184.gif',
                '[拳头]': '185.gif',
                '[差劲]': '186.gif',
                '[爱你]': '187.gif',
                '[No]': '188.gif',
                '[OK]': '189.gif',

                '[爱情]': '190.gif',
                '[飞吻]': '191.gif',
                '[跳跳]': '192.gif',
                '[发抖]': '193.gif',
                '[怄火]': '194.gif',
                '[转圈]': '195.gif',
                '[磕头]': '196.gif',
                '[回头]': '197.gif',
                '[跳绳]': '198.gif',
                '[投降]': '199.gif',

                '[激动]': '201.gif',
                '[乱舞]': '202.gif',
                '[献吻]': '203.gif',
                '[左太极]': '204.gif',
                '[右太极]': '205.gif'
            }
        };
    },
    computed: {
        disabled() {
            return this.thread.tid === ''
        },
        sendButtonDisabled() {
            return this.inputContent.trim().length === 0
        },
        threadTopic() {
            return this.thread.topic.replace(/\//g, ".");//replaceAll(/\//ig, ".");//replace(/\//, ".");
        },
        show_header() {
            return true
        },
        connectedImage() {
            return this.isConnected ? 'https://bytedesk.oss-cn-shenzhen.aliyuncs.com/util/connected.png'
                : 'https://bytedesk.oss-cn-shenzhen.aliyuncs.com/util/disconnected.png'
        },
        leaveWordTip() {
            return this.$t('leaveWord')
        },
        nameTip() {
            return this.$t("name")
        },
        inputNameTip() {
            return this.$t("inputName")
        },
        mobileTip() {
            return this.$t("mobile")
        },
        inputMobileTip() {
            return this.$t("inputMobile")
        },
        leaveContentTip() {
            return this.$t("leaveContent")
        },
        emailTip() {
            return this.$t("email")
        },
        inputEmailTip() {
            return this.$t("inputEmail")
        },
        ageTip() {
            return this.$t("age")
        },
        inputAgeTip() {
            return this.$t("inputAge")
        },
        jobTip() {
            return this.$t("job")
        },
        inputJobTip() {
            return this.$t("inputJob")
        },
        pleaseRateTip() {
            return this.$t("pleaseRate")
        },
        veryGoodTip() {
            return this.$t("veryGood")
        },
        goodTip() {
            return this.$t("good")
        },
        averageTip() {
            return this.$t("average")
        },
        notGoodTip() {
            return this.$t("notGood")
        },
        badTip() {
            return this.$t("bad")
        },
        pleaseInputTip() {
            return this.$t("pleaseInput")
        },
        rateTip() {
            return this.$t('rate')
        },
        rateContentTip() {
            return this.$t('rateContent')
        },
        postScriptPrefixTip() {
            return this.$t('postScriptPrefix')
        }
    },
    methods: {
        // TODO: 实现imageClicked函数
        switchAgent() {
            this.showLeaveMessage = false;
            this.isRobot = false;
            this.requestThread();
        },
        switchLeaveMessage() {
            this.showMessage = false
            this.showInputBar = false
            this.showLeaveMessage = true;
        },
        switchForm() {
            this.showMessage = false
            this.showInputBar = false
            this.showForm = true
        },
        switchRate() {
            this.showMessage = false
            this.showInputBar = false
            this.showRate = true
        },
        switchMessage() {
            this.showMessage = true
            this.showInputBar = true
            this.showRate = false
            this.showForm = false
            this.showLeaveMessage = false
        },
        switchRobot() {
            console.log('robot')
            this.showLeaveMessage = false;
            this.isRobot = true;
            this.requestRobot();
        },
        imageClicked(imageUrl) {
            console.log('image clicked:', imageUrl)
            // window.open(imageUrl);
        },
        fileClicked(fileUrl) {
            // window.open(fileUrl);
        },
        voiceClicked(voiceUrl) {
            // window.open(voiceUrl);
        },
        is_self(message) {
            return message.user.uid === this.uid;
        },
        // 发送状态
        is_sending(message) {
            return message.status === 'sending'
        },
        is_stored(message) {
            return message.status === 'stored'
        },
        is_received(message) {
            return message.status === 'received'
        },
        is_error(message) {
            return message.status === 'error'
        },
        is_read(message) {
            return message.status === 'read'
        },
        // 消息类型
        is_type_text(message) {
            return message.type === 'text'
                || message.type === 'notification_thread'
                || message.type === 'notification_auto_close'
        },
        is_type_robot(message) {
            return message.type === 'robot'
        },
        is_type_image(message) {
            return message.type === 'image'
        },
        is_type_file(message) {
            return message.type === 'file'
        },
        is_type_voice(message) {
            return message.type === 'voice'
        },
        is_type_commodity(message) {
            return message.type === 'commodity'
        },
        is_type_questionnaire(message) {
            return message.type === 'questionnaire'
        },
        is_type_company(message) {
            return message.type === 'company'
        },
        is_type_workGroup(message) {
            return message.type === 'workGroup'
        },
        is_type_form_request(message) {
            return message.type === 'notification_form_request'
        },
        is_type_form_result(message) {
            return message.type === 'notification_form_result'
        },
        is_type_thread(message) {
            return message.type === 'notification_thread'
        },
        is_type_notification(message) {
            return message.type !== 'notification_preview'
                && message.type !== 'notification_thread'
                && message.type.startsWith('notification')
                || message.type === 'commodity'
        },
        is_type_close(message) {
            return message.type === 'notification_auto_close'
                || message.type === 'notification_agent_close'
        },
        is_type_notification_agent_close(message) {
            return message.type === 'notification_agent_close'
        },
        is_type_notification_visitor_close(message) {
            return message.type === 'notification_visitor_close'
        },
        is_type_notification_auto_close(message) {
            return message.type === 'notification_auto_close'
        },
        is_type_notification_thread_reentry(message) {
            return message.type === 'notification_thread_reentry'
        },
        is_type_notification_connect(message) {
            return message.type === 'notification_connect'
        },
        is_type_notification_disconnect(message) {
            return message.type === 'notification_disconnect'
        },
        is_type_notification_offline(message) {
            return message.type === 'notification_offline'
        },
        is_type_notification_invite_rate(message) {
            return message.type === 'notification_invite_rate'
        },
        is_type_notification_rate_result(message) {
            return message.type === 'notification_rate_result'
        },
        my_nickname() {
            return this.nickname.trim().length > 0 ? this.nickname : this.thread.visitor.nickname
        },
        jsonObject(content) {
            // console.log('parse json:', content);
            return content === null ? '{"categoryCode":"","content":"","id":"0","imageUrl":"","price":"","title":"","type":"commodity","url":""}' : JSON.parse(content)
        },
        //  在发送信息之后，将输入的内容中属于表情的部分替换成emoji图片标签
        //  再经过v-html 渲染成真正的图片
        replaceFace(content) {
            if (content === null || content === undefined) {
                return ''
            }
            var emotionMap = this.emotionMap;
            var reg = /\[[\u4E00-\u9FA5NoOK]+\]/g
            var matchresult = content.match(reg)
            var result = content
            if (matchresult) {
                for (var i = 0; i < matchresult.length; i++) {
                    result = result.replace(matchresult[i], '<img height=\'25px\' width=\'25px\' style=\'margin-bottom:4px;\' src=\'' + this.emotionBaseUrl + emotionMap[matchresult[i]] + '\'>')
                }
            }
            return result
        },
        handleImageDialogClose(done) {
            done()
        },
        scrollToBottom() {
            // 聊天记录滚动到最底部
            let vm = this;
            this.$nextTick(() => {
                const ulm = vm.$refs.listm;
                if (ulm != null) {
                    ulm.scrollTop = ulm.scrollHeight
                }
            })
        },
        pushToMessageArray(message) {
            // 本地发送的消息
            this.messages.push(message);
            // 查看大图刷新
            if (message.type === 'image') {
                app.$previewRefresh()
            }
        },
        //
        getUrlParam(name) {
            // console.log('window.location:', window.location)
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            var r = window.location.search.substr(1).match(reg);  //匹配目标参数
            if (r != null)
                return decodeURIComponent(r[2]);
            return null; //返回参数值
        },
        /**
         * 1. 首先判断是否已经注册过
         * 2. 如果已经注册过，则直接调用登录接口
         * 3. 如果没有注册过，则从服务器请求用户名
         */
        requestUsername() {
            this.username = localStorage.bd_kfe_username;
            this.password = this.username;
            if (this.username) {
                this.login();
            } else {
                //
                $.ajax({
                    url: this.HTTP_HOST + '/visitor/api/username',
                    contentType: "application/json; charset=utf-8",
                    type: "get",
                    data: {
                        nickname: this.nickname,
                        subDomain: this.subDomain,
                        client: this.client
                    },
                    success: function (response) {
                        console.log('user:', response.data);
                        // 登录
                        app.uid = response.data.uid;
                        app.username = response.data.username;
                        app.password = app.username;
                        app.nickname = response.data.nickname;
                        // 本地存储
                        localStorage.bd_kfe_uid = app.uid;
                        localStorage.bd_kfe_username = app.username;
                        // 登录
                        app.login();
                    },
                    error: function (error) {
                        //Do Something to handle error
                        console.log(error);
                    }
                });
            }
        },
        /**
         * 2. oauth2登录
         */
        login() {
            $.ajax({
                url: this.HTTP_HOST + "/oauth/token",
                type: "post",
                data: {
                    "username": this.username,
                    "password": this.password,
                    "grant_type": "password",
                    "scope": "all"
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Basic Y2xpZW50OnNlY3JldA==');
                },
                success: function (response) {
                    console.log("login success: ", response);
                    // 本地存储，
                    app.access_token = response.access_token;
                    // 请求会话
                    app.requestThread();
                },
                error: function (error) {
                    console.log(error);
                }
            });
        },
        /**
         * 获取设备指纹
         */
        fingerPrint2() {
            // #获取全部
            var deviceInfo = DeviceInfo.getDeviceInfo({ domain: '' })
            // console.log(deviceInfo);
            $.ajax({
                url: this.HTTP_HOST + "/api/fingerprint2/browser",
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
                    client: this.client
                }),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + app.access_token);
                },
                success: function (response) {
                    console.log("fingerprint2: ", response);
                },
                error: function (error) {
                    console.log(error);
                }
            });
        },
        browse() {
            var url = window.location.href;
            url = url.endsWith("#") ? url.substring(0, url.length - 1) : url;
            //
            $.ajax({
                url: this.HTTP_HOST +
                    "/api/browse/notify",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                type: "post",
                data: JSON.stringify({
                    client: this.client,
                    sessionId: this.sessionId,
                    referrer: encodeURI(document.referrer),
                    url: encodeURI(url),
                    title: encodeURI(document.title)
                }),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + app.access_token);
                },
                success: function (response) {
                    // console.log("browse invite:", response.data);
                },
                error: function (error) {
                    console.log(error);
                }
            });
        },
        /**
         * 请求会话
         */
        manulRequestThread() {
            this.isManulRequestThread = true
            this.requestThread()
        },
        requestThread() {
            $.ajax({
                url: this.HTTP_HOST +
                    "/api/thread/request",
                contentType: "application/json; charset=utf-8",
                type: "get",
                data: {
                    wId: this.workGroupWid,
                    type: this.type,
                    aId: this.agentUid,
                    client: this.client
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + app.access_token);
                },
                success: function (response) {
                    console.log('message:', response);
                    //
                    app.dealWithThread(response)
                    // 建立长连接
                    app.byteDeskConnect();
                },
                error: function (error) {
                    console.log(error);
                }
            });
            // 发送指纹
            // this.fingerPrint2();
        },
        // 请求人工客服
        requestAgent() {
            console.log('start request agent thread');
            $.ajax({
                url: this.HTTP_HOST +
                    "/api/thread/request/agent",
                contentType: "application/json; charset=utf-8",
                type: "get",
                data: {
                    wId: this.workGroupWid,
                    type: this.type,
                    aId: this.agentUid,
                    client: this.client
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + app.access_token);
                },
                success: function (response) {
                    console.log('message:', response);
                    //
                    app.dealWithThread(response)
                },
                error: function (error) {
                    console.log(error);
                }
            });
        },
        requestRobot() {
            // console.log("自助答疑")
            this.initAnswer()
        },
        dealWithThread(response) {
            //
            let message = response.data;
            //
            if (response.status_code === 200) {
                //
                if (app.isManulRequestThread || app.loadHistory === '0') {
                    app.pushToMessageArray(message);
                }
                // 1. 保存thread
                app.thread = message.thread;
                // 3. 加载聊天记录
                app.loadHistoryMessages();
                // 4. 设置窗口左上角标题
                if (app.thread.appointed) {
                    app.title = app.thread.agent.nickname
                } else {
                    app.title = app.thread.workGroup.nickname;
                }
                // 设置当前为人工客服
                app.isRobot = false;
                // 防止会话超时自动关闭，重新标记本地打开会话
                app.isThreadClosed = false;
                // 显示商品信息
                app.appendCommodityInfo()
            } else if (response.status_code === 201) {
                // message.content = '继续之前会话';
                if (app.isManulRequestThread || app.loadHistory === '0') {
                    app.pushToMessageArray(message);
                }
                // 1. 保存thread
                app.thread = message.thread;
                // 3. 加载聊天记录
                app.loadHistoryMessages();
                // 4. 头像、标题、描述
                if (app.thread.appointed) {
                    app.title = app.thread.agent.nickname
                } else {
                    app.title = app.thread.workGroup.nickname;
                }
                // 设置当前为人工客服
                app.isRobot = false;
                // 防止会话超时自动关闭，重新标记本地打开会话
                app.isThreadClosed = false;
                // 显示商品信息
                app.appendCommodityInfo()
            } else if (response.status_code === 202) {
                // 排队
                app.pushToMessageArray(message);
                // 1. 保存thread
                app.thread = message.thread;
                //
            } else if (response.status_code === 203) {
                // 当前非工作时间，请自助查询或留言
                app.pushToMessageArray(message);
                app.leaveMessageTip = message.content;
                // 1. 保存thread
                app.thread = message.thread;

                // 4. 设置窗口左上角标题
                if (app.thread.appointed) {
                    app.title = app.thread.agent.nickname
                } else {
                    app.title = app.thread.workGroup.nickname;
                }
                // 显示留言界面
                app.switchLeaveMessage();
            } else if (response.status_code === 204) {
                // 当前无客服在线，请自助查询或留言
                app.pushToMessageArray(message);
                app.leaveMessageTip = message.content;
                // 1. 保存thread
                app.thread = message.thread;
                // 4. 设置窗口左上角标题
                if (app.thread.appointed) {
                    app.title = app.thread.agent.nickname
                } else {
                    app.title = app.thread.workGroup.nickname;
                }
                // 显示留言界面
                app.switchLeaveMessage();
            } else if (response.status_code === 205) {
                // 插入业务路由，相当于咨询前提问问卷（选择 或 填写表单）
                app.pushToMessageArray(message);
                // 1. 保存thread
                app.thread = message.thread;
            } else if (response.status_code === 206) {
                // 返回机器人初始欢迎语 + 欢迎问题列表
                if (app.isManulRequestThread || app.loadHistory === '0') {
                    app.pushToMessageArray(message);
                }
                // 1. 保存thread
                app.thread = message.thread;
                // 3. 加载聊天记录
                app.loadHistoryMessages();
                // 4. 设置窗口左上角标题
                if (app.thread.appointed) {
                    app.title = app.thread.agent.nickname
                } else {
                    app.title = app.thread.workGroup.nickname;
                }
                // 返回机器人初始欢迎语 + 欢迎问题列表
                // app.pushToMessageArray(message);
                // 1. 保存thread
                // app.thread = message.thread;
                // 2. 设置当前状态为机器人问答
                app.isRobot = true;
            } else if (response.status_code === -1) {
                app.login();
            } else if (response.status_code === -2) {
                // sid 或 wid 错误
                app.$toast('siteId或者工作组id错误');
            } else if (response.status_code === -3) {
                // alert('您已经被禁言')
                app.$toast('您已经被禁言');
            }
            // 设置窗口标题
            document.title = app.title;
            app.scrollToBottom();
        },
        /**
         * 满意度评价
         */
        rate() {
            // 隐藏满意度评价
            this.switchMessage()
            // 判断是否已经评价过，避免重复评价
            if (app.isRated) {
                // this.$message({ message: this.$t('rateAgain'), type: 'warning' });
                app.$toast(this.$t('rateAgain'))
                return;
            }
            if (this.rateValue === this.veryGoodTip) {
                this.rateScore = 5
            } else if (this.rateValue === this.goodTip) {
                this.rateScore = 4
            } else if (this.rateValue === this.averageTip) {
                this.rateScore = 3
            } else if (this.rateValue === this.notGoodTip) {
                this.rateScore = 2
            } else if (this.rateValue === this.badTip) {
                this.rateScore = 1
            }
            $.ajax({
                url: this.HTTP_HOST +
                    "/api/rate/do",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                type: "post",
                data: JSON.stringify({
                    tid: this.thread.tid,
                    score: this.rateScore,
                    note: this.rateContent,
                    invite: this.isInviteRate,
                    client: this.client
                }),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + app.access_token);
                },
                success: function (response) {
                    console.log("rate: ", response);
                    app.isRated = true;
                },
                error: function (error) {
                    console.log(error);
                }
            });
            // axios.post(this.HTTP_HOST + '/api/rate/do', {
            //     tid: this.thread.tid,
            //     score: this.rateScore, // 考虑到兼容ios客户端，需要转换为字符串
            //     note: this.rateContent,
            //     invite: this.isInviteRate, // 考虑到兼容ios客户端，需要转换为字符串
            //     client: this.client
            // }).then(response => {
            //     console.log("rate: ", response.data);
            //     this.isRated = true
            //     // TODO: 关闭窗口
            // }).catch(error => {
            //     console.log(error);
            // });
        },
        upload() {
            console.log('upload')
            // TODO: 待优化，去掉jquery依赖
            $('input[id=imagefile]').click();
        },
        uploadChange() {
            console.log('uploadChange')
            var formdata = new FormData();
            formdata.append("file_name", this.guid());
            formdata.append("username", this.username);
            formdata.append("file", $('input[id=imagefile]')[0].files[0]);
            formdata.append("client", this.client);
            //
            $.ajax({
                url: this.HTTP_HOST + "/visitor/api/upload/image",
                contentType: false,
                cache: false,
                processData: false,
                mimeTypes: "multipart/form-data",
                type: "post",
                data: formdata,
                success: function (response) {
                    console.log('upload response:', response.data)
                    var imageUrl = response.data;
                    app.sendImageMessage(imageUrl);
                },
                error: function (error) {
                    console.log(error);
                }
            });
        },
        /**
         * 加载更多聊天记录
         */
        loadHistoryMessages() {
            //
            if (this.isManulRequestThread || this.loadHistory === '0') {
                return;
            }
            $.ajax({
                url: this.HTTP_HOST +
                    "/api/messages/user",
                type: "get",
                data: {
                    uid: this.uid,
                    page: this.page,
                    size: 10,
                    client: this.client
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + app.access_token);
                },
                success: function (response) {
                    // console.log('loadHistoryMessages: ', response);
                    for (let i = 0; i < response.data.content.length; i++) {
                        const element = response.data.content[i]
                        // console.log('element:', element);
                        app.messages.unshift(element)
                    }
                    app.scrollToBottom()
                    app.$previewRefresh()
                },
                error: function (error) {
                    console.log(error);
                }
            });
        },
        /**
         * 初始化机器人
         */
        initAnswer() {
            $.ajax({
                url: this.HTTP_HOST +
                    "/api/answer/init",
                type: "get",
                data: {
                    uid: this.adminUid,
                    tid: this.thread.tid,
                    client: this.client
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + app.access_token);
                },
                success: function (response) {
                    console.log("init answer success:", response);
                    if (response.data.status_code === 200) {
                        let queryMessage = response.data;
                        app.pushToMessageArray(queryMessage);
                        app.scrollToBottom()
                    } else {
                        app.$toast(response.message)
                    }
                },
                error: function (error) {
                    console.log("query answers error:", error);
                }
            });
        },
        // 通过aid，请求智能答案
        queryAnswer(aid) {
            $.ajax({
                url: this.HTTP_HOST +
                    "/api/answer/query",
                contentType: "application/json; charset=utf-8",
                type: "get",
                data: {
                    tid: this.thread.tid,
                    aid: aid,
                    client: this.client
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + app.access_token);
                },
                success: function (response) {
                    console.log("query answer success:", response);
                    if (response.status_code === 200) {
                        //
                        let queryMessage = response.data.query;
                        let replyMessage = response.data.reply;
                        //
                        app.pushToMessageArray(queryMessage);
                        app.pushToMessageArray(replyMessage);
                        //
                        app.scrollToBottom()
                    } else {
                        app.$toast(response.message)
                    }
                },
                error: function (error) {
                    console.log("query answers error:", error);
                }
            });
        },
        // 输入内容，请求智能答案
        messageAnswer(content) {
            $.ajax({
                url: this.HTTP_HOST +
                    "/api/answer/message",
                contentType: "application/json; charset=utf-8",
                type: "get",
                data: {
                    uid: this.adminUid,
                    tid: this.thread.tid,
                    content: content,
                    client: this.client
                },
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + app.access_token);
                },
                success: function (response) {
                    console.log("query answer success:", response);
                    if (response.status_code === 200 ||
                        response.status_code === 201) {
                        //
                        let queryMessage = response.data.query;
                        let replyMessage = response.data.reply;
                        //
                        app.pushToMessageArray(queryMessage);
                        // 包含’人工‘二字
                        if (content.indexOf('人工') !== -1) {
                            // 请求人工客服
                            app.requestAgent()
                        } else {
                            app.pushToMessageArray(replyMessage);
                        }
                        app.scrollToBottom()
                    } else {
                        app.$toast(response.data.message);
                    }
                },
                error: function (error) {
                    console.log("query answers error:", error);
                }
            });
        },
        /**
         * 技能组设置
         */
        getPrechatSettings() {
            //
            if (this.type !== 'workGroup') {
                return
            }
            $.ajax({
                url: this.HTTP_HOST + "/visitor/api/prechat/settings",
                contentType: "application/json; charset=utf-8",
                type: "get",
                data: {
                    wid: this.workGroupWid,
                    client: this.client
                },
                success: function (response) {
                    console.log("fetch pre setting success:", response);
                    app.showTopTip = response.data.showTopTip
                    app.topTip = response.data.topTip
                    //
                    if (response.data.showForm) {
                        app.showRealname = true
                        app.showMobile = true
                        app.switchForm()
                    }
                },
                error: function (error) {
                    console.log("fetch pre setting error:", error);
                }
            });
        },
        /**
         * 留言
         */
        leaveMessage() {
            //
            if (this.mobile.trim().length !== 11) {
                this.$toast('手机号错误');
                return
            }
            if (this.content.trim().length === 0) {
                this.$toast('留言内容不能为空');
                return
            }
            ///
            // 隐藏留言页面
            this.switchMessage()
            $.ajax({
                url: this.HTTP_HOST +
                    "/api/leavemsg/save",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                type: "post",
                data: JSON.stringify({
                    wid: this.workGroupWid,
                    aid: this.agentUid,
                    type: this.type,
                    mobile: this.mobile,
                    email: '',
                    content: this.content,
                    client: this.client
                }),
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Authorization', 'Bearer ' + app.access_token);
                },
                success: function (response) {
                    console.log("leave message: ", response);
                    if (response.status_code === 200) {
                        // 留言写到聊天记录
                        app.sendTextMessageSync(app.content)
                        app.$toast('留言成功');
                    } else {
                        app.$toast(response.message);
                    }
                },
                error: function (error) {
                    console.log(error);
                    app.$toast('留言失败');
                }
            });
        },
        currentTimestamp() {
            // return moment().format('YYYY-MM-DD HH:mm:ss')
            return ''
        },
        guid() {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1)
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
        },
        //
        cancelForm() {
            console.log('cancel form')
            this.switchMessage()
        },
        submitForm() {
            console.log('submit form')
            let formContent = JSON.stringify({
                'form': {
                    'realname': this.realname,
                    'mobile': this.mobile,
                    'email': this.email,
                    'age': this.age,
                    'job': this.job,
                }
            })
            if (this.mobile.length > 0 && this.mobile.length !== 11) {
                alert('手机号错误');
                return;
            }
            if (this.age.length > 0 && isNaN(this.age)) {
                alert('年龄必须为数字');
                return;
            }
            let localId = this.guid();
            var json = {
                "mid": localId,
                "timestamp": this.currentTimestamp(),
                "client": this.client,
                "version": "1",
                "type": 'notification_form_result',
                "user": {
                    "uid": this.uid,
                    "nickname": this.my_nickname(),
                    "avatar": this.thread.visitor.avatar
                },
                "form": {
                    "content": formContent
                },
                "thread": {
                    "tid": this.thread.tid,
                    "type": this.thread.type,
                    "content": "[表单]",
                    "nickname": this.my_nickname(),
                    "avatar": this.thread.visitor.avatar,
                    "topic": this.threadTopic,
                    "timestamp": this.currentTimestamp(),
                    "unreadCount": 0
                }
            };
            app.stompClient.send("/app/" + this.threadTopic, {},
                JSON.stringify(json)
            );
            //
            this.switchMessage()
            this.showRealname = false
            this.showMobile = false
            this.showEmail = false
            this.showAge = false
            this.showJob = false
        },
        /**
         * 发送同步消息
         */
        sendTextMessageSync(content) {
            // this.sendMessageSync('text', content)
            if (content.length === 0) {
                alert('消息不能为空');
                return;
            }
            if (content.length >= 500) {
                alert('消息长度太长，请分多次发送');
                return;
            }
            //
            let localId = this.guid();
            var json = {
                "mid": localId,
                "timestamp": this.currentTimestamp(),
                "client": this.client,
                "version": "1",
                "type": 'text',
                "user": {
                    "uid": this.uid,
                    "nickname": this.my_nickname(),
                    "avatar": this.thread.visitor.avatar
                },
                "text": {
                    "content": content
                },
                "thread": {
                    "tid": this.thread.tid,
                    "type": this.thread.type,
                    "content": content,
                    "nickname": this.my_nickname(),
                    "avatar": this.thread.visitor.avatar,
                    "topic": this.threadTopic,
                    "timestamp": this.currentTimestamp(),
                    "unreadCount": 0
                }
            };
            app.stompClient.send("/app/" + this.threadTopic, {},
                JSON.stringify(json)
            );
        },
        sendImageMessageSync(content) {
            // this.sendMessageSync('image', content)
            //
            let localId = this.guid();
            var json = {
                "mid": localId,
                "timestamp": this.currentTimestamp(),
                "client": this.client,
                "version": "1",
                "type": 'image',
                "user": {
                    "uid": this.uid,
                    "nickname": this.my_nickname(),
                    "avatar": this.thread.visitor.avatar
                },
                "image": {
                    "imageUrl": content
                },
                "thread": {
                    "tid": this.thread.tid,
                    "type": this.thread.type,
                    "content": "[图片]",
                    "nickname": this.my_nickname(),
                    "avatar": this.thread.visitor.avatar,
                    "topic": this.threadTopic,
                    "timestamp": this.currentTimestamp(),
                    "unreadCount": 0
                }
            };
            app.stompClient.send("/app/" + this.threadTopic, {},
                JSON.stringify(json)
            );
        },
        sendCommodityMessageSync() {
            let goods = this.getUrlParam("goods")
            if (goods !== "1") {
                return
            }
            let jsonContent = this.commodityInfo();
            // 发送商品信息
            var json = {
                "mid": this.guid(),
                "timestamp": this.currentTimestamp(),
                "client": this.client,
                "version": "1",
                "type": 'commodity',
                "user": {
                    "uid": this.uid,
                    "nickname": this.my_nickname(),
                    "avatar": this.thread.visitor.avatar
                },
                "text": {
                    "content": jsonContent
                },
                "thread": {
                    "tid": this.thread.tid,
                    "type": this.thread.type,
                    "content": "[商品]",
                    "nickname": this.my_nickname(),
                    "avatar": this.thread.visitor.avatar,
                    "topic": this.threadTopic,
                    "timestamp": this.currentTimestamp(),
                    "unreadCount": 0
                }
            };
            app.stompClient.send("/app/" + this.threadTopic, {},
                JSON.stringify(json)
            );
        },
        appendCommodityInfo() {
            let goods = this.getUrlParam("goods")
            if (goods !== "1") {
                return
            }
            let jsonContent = this.commodityInfo();
            // 发送商品信息
            var json = {
                "mid": this.guid(),
                "timestamp": this.currentTimestamp(),
                "client": this.client,
                "version": "1",
                "type": 'commodity',
                "user": {
                    "uid": this.uid,
                    "nickname": this.my_nickname(),
                    "avatar": this.thread.visitor.avatar
                },
                "content": jsonContent,
                "thread": {
                    "tid": this.thread.tid,
                    "type": this.thread.type,
                    "content": "[商品]",
                    "nickname": this.my_nickname(),
                    "avatar": this.thread.visitor.avatar,
                    "topic": this.threadTopic,
                    "timestamp": this.currentTimestamp(),
                    "unreadCount": 0
                }
            };
            app.pushToMessageArray(json)
        },
        commodityInfo() {
            //
            let commodidy = {
                "id": this.getUrlParam("goods_id"),
                "title": this.getUrlParam("goods_title"),
                "content": this.getUrlParam("goods_content"),
                "price": this.getUrlParam("goods_price"),
                "url": this.getUrlParam("goods_url"),
                "imageUrl": this.getUrlParam("goods_imageUrl"),
                "categoryCode": this.getUrlParam("goods_categoryCode"),
                "type": "commodity"
            }
            return JSON.stringify(commodidy)
        },
        /**
         * 必须添加前缀 '/topic/'
         * @param topic
         */
        subscribeTopic(topic) {
            // 防止重复订阅
            if (this.subscribedTopics.includes(topic)) {
                return;
            }
            this.subscribedTopics.push(topic);
            //
            this.stompClient.subscribe('/topic/' + topic, function (message) {
                // console.log('message :', message, 'body:', message.body);
                var messageObject = JSON.parse(message.body);
                // if (messageObject.user.uid === app.uid) {
                //     return
                // }
                if ((messageObject.type === 'text'
                    || messageObject.type === 'image'
                    || messageObject.type === 'file'
                    || messageObject.type === 'commodity')
                    // && messageObject.user.uid !== app.uid
                ) {
                    //
                    // 新protobuf转换json
                    messageObject.createdAt = messageObject.timestamp;
                    if (messageObject.type === "text") {
                        messageObject.content = messageObject.text.content;
                    } else if (messageObject.type === "image") {
                        messageObject.imageUrl = messageObject.image.imageUrl;
                    } else if (messageObject.type === "commodity") {
                        messageObject.content = messageObject.text.content;
                    }
                    //
                    let mid = messageObject.mid;
                    // 非自己发送的消息，发送消息回执
                    if (messageObject.user.uid !== app.uid) {
                        // app.sendReceiptMessage(mid, 'received');
                        app.sendReceiptMessage(mid, "read");
                    }
                }
                else if (messageObject.type === 'notification_browse_invite') {
                    //
                } else if (messageObject.type === 'notification_queue') {
                    // 排队
                } else if (messageObject.type === 'notification_queue_accept') {
                    // 1. 保存thread
                    app.thread = messageObject.thread;
                    // 2. 订阅会话消息
                    app.subscribeTopic(app.threadTopic);
                } else if (messageObject.type === 'notification_invite_rate') {
                    // 邀请评价
                    app.isInviteRate = true;
                    app.switchRate()
                } else if (messageObject.type === 'notification_agent_close'
                    || messageObject.type === 'notification_auto_close') {
                    // 新protobuf转换json
                    messageObject.createdAt = messageObject.timestamp;
                    messageObject.content = messageObject.text.content;
                    // TODO: 会话关闭，添加按钮方便用户点击重新请求会话
                    app.isThreadClosed = true
                } else if (messageObject.type === 'notification_preview') {
                    //
                    if (messageObject.user.uid !== app.uid) {
                        app.isInputingVisible = true;
                        setTimeout(function () {
                            app.isInputingVisible = false;
                        }, 5000)
                    }
                } else if (messageObject.type === 'notification_receipt') {
                    // 消息状态：送达 received、已读 read
                    if (messageObject.user.uid !== app.uid) {
                        for (let i = app.messages.length - 1; i >= 0; i--) {
                            const msg = app.messages[i]
                            if (msg.mid === messageObject.receipt.mid) {
                                // 可更新顺序 read > received > stored > sending, 前面的状态可更新后面的
                                if (app.messages[i].status === 'read') {
                                    return
                                }
                                // console.log('do update:', app.messages[i].mid, app.messages[i].content, messageObject.receipt.status)
                                // app.messages[i].status = messageObject.receipt.status
                                Vue.set(app.messages[i], 'status', messageObject.receipt.status)
                            }
                        }
                    }
                } else if (messageObject.type === 'notification_recall') {
                    for (let i = 0; i < app.messages.length; i++) {
                        const element = app.messages[i];
                        if (element.mid === messageObject.recall.mid) {
                            app.messages.splice(i, 1)
                        }
                    }
                } else if (messageObject.type === 'notification_form_request') {
                    // 收到客服端表单请求
                    messageObject.content = '表单请求'
                    let formContent = messageObject.extra.content
                    console.log('form:' + formContent)
                    // let formContentObject = JSON.parse(formContent)
                    if (formContent.indexOf('姓名') !== -1) {
                        console.log('showRealname')
                        app.showRealname = true
                    }
                    if (formContent.indexOf('手机') !== -1) {
                        app.showMobile = true
                    }
                    if (formContent.indexOf('邮箱') !== -1) {
                        app.showEmail = true
                    }
                    if (formContent.indexOf('年龄') !== -1) {
                        app.showAge = true
                    }
                    if (formContent.indexOf('职业') !== -1) {
                        app.showJob = true
                    }
                    app.switchForm()
                } else if (messageObject.type === 'notification_form_result') {
                    // 自己发送的表单结果
                    messageObject.content = '发送表单'
                }

                if (messageObject.type !== 'notification_preview'
                    && messageObject.type !== 'notification_receipt'
                    && messageObject.type !== 'notification_recall'
                    && messageObject.type !== 'notification_form_request'
                    && messageObject.type !== 'notification_form_result'
                    && messageObject.type !== 'notification_connect'
                    && messageObject.type !== 'notification_disconnect') {
                    app.isRobot = false;
                    // 默认不显示附言
                    if (messageObject.type === "text") {
                        if ((messageObject.content != null && !messageObject.content.startsWith(app.postScriptPrefixTip)) || app.showScript) {
                            app.pushToMessageArray(messageObject);
                        }
                    } else {
                        app.pushToMessageArray(messageObject);
                    }
                    app.scrollToBottom()
                } else {
                    console.log(messageObject.type)
                }
            });
        },
        /**
         * 输入框变化
         */
        onInputChange(content) {
            // console.log(content);
            if (this.isRobot || this.isThreadClosed) {
                return;
            }
            this.localPreviewContent = content
            this.delaySendPreviewMessage()
        },
        sendPreviewMessage() {
            //
            var localId = this.guid();
            var json = {
                "mid": localId,
                "timestamp": this.currentTimestamp(),
                "client": this.client,
                "version": "1",
                "type": "notification_preview",
                "user": {
                    "uid": this.uid,
                    "nickname": this.my_nickname(),
                    "avatar": this.thread.visitor.avatar
                },
                "preview": {
                    "content": this.localPreviewContent === undefined ? " " : this.localPreviewContent
                },
                "thread": {
                    "tid": this.thread.tid,
                    "type": this.thread.type,
                    // TODO: 根据内容类型设置不同, 如: [图片]
                    "content": this.localPreviewContent,
                    "nickname": this.my_nickname(),
                    "avatar": this.thread.visitor.avatar,
                    "topic": this.threadTopic,
                    "timestamp": this.currentTimestamp(),
                    "unreadCount": 0
                }
            };
            this.stompClient.send("/app/" + this.threadTopic, {},
                JSON.stringify(json)
            );
        },
        /**
         * 发送消息
         */
        onKeyUp(e) {
            if (e.keyCode === 13 && this.inputContent.trim().length > 0) {
                this.inputContent = this.inputContent.trim();
                this.sendTextMessage()
            }
        },
        sendTextMessage() {
            //
            if (this.inputContent.trim().length === 0) {
                return;
            }
            //
            if (this.isRobot) {
                this.messageAnswer(this.inputContent);
            } else {
                // 发送/广播会话消息
                this.sendTextMessageSync(this.inputContent)
            }
            // 清空输入框
            this.inputContent = "";
            // 设置焦点
            setTimeout(function () {
                $("input")[1].focus()
            }, 100);
        },
        sendImageMessage(imageUrl) {
            // 发送/广播会话消息
            this.sendImageMessageSync(imageUrl);
        },
        /**
         * 消息回执：收到消息之后回复给消息发送方
         * 消息content字段存放status: 1. received, 2. read
         */
        sendReceiptMessage(mid, status) {
            var localId = this.guid();
            var json = {
                "mid": localId,
                "timestamp": this.currentTimestamp(),
                "client": this.client,
                "version": "1",
                "type": "notification_receipt",
                "user": {
                    "uid": this.uid,
                    "nickname": this.my_nickname(),
                    "avatar": this.thread.visitor.avatar
                },
                "receipt": {
                    "mid": mid,
                    "status": status
                },
                "thread": {
                    "tid": this.thread.tid,
                    "type": this.thread.type,
                    // "content": content,
                    "nickname": this.my_nickname(),
                    "avatar": this.thread.visitor.avatar,
                    "topic": this.threadTopic,
                    "timestamp": this.currentTimestamp(),
                    "unreadCount": 0
                }
            };
            this.stompClient.send("/app/" + this.threadTopic, {},
                JSON.stringify(json)
            );
            // 收到消息后，向服务器发送回执
        },
        /**
         * 消息撤回
         */
        sendRecallMessage(mid) {
            var localId = this.guid();
            var json = {
                "mid": localId,
                "timestamp": this.currentTimestamp(),
                "client": this.client,
                "version": "1",
                "type": "notification_recall",
                "user": {
                    "uid": this.uid,
                    "nickname": this.my_nickname(),
                    "avatar": this.thread.visitor.avatar
                },
                "recall": {
                    "mid": mid
                },
                "thread": {
                    "tid": this.thread.tid,
                    "type": this.thread.type,
                    // "content": content,
                    "nickname": this.my_nickname(),
                    "avatar": this.thread.visitor.avatar,
                    "topic": this.threadTopic,
                    "timestamp": this.currentTimestamp(),
                    "unreadCount": 0
                }
            };
            this.stompClient.send("/app/" + this.threadTopic, {},
                JSON.stringify(json)
            );
            // 收到消息后，向服务器发送回执
        },
        byteDeskConnect() {
            var socket = new SockJS(this.STOMP_HOST + '/stomp/?access_token=' + this.access_token);
            this.stompClient = Stomp.over(socket);
            this.stompClient.reconnect_delay = 1000;
            // client will send heartbeats every 10000ms, default 10000
            this.stompClient.heartbeat.outgoing = 20000;
            // client does not want to receive heartbeats from the server, default 10000
            this.stompClient.heartbeat.incoming = 20000;
            // 上线时打开下面注释，to disable logging, set it to an empty function:
            if (this.IS_PRODUCTION) {
                this.stompClient.debug = function (value) { }
            }
            // 连接bytedesk，如果后台开启了登录，需要登录之后才行
            this.stompClient.connect({}, function (frame) {
                // console.log('stompConnected: ' + frame + " username：" + frame.headers['user-name']);
                app.isConnected = true;
                // 获取 websocket 连接的 sessionId
                // FIXME: Uncaught TypeError: Cannot read property '1' of null
                // app.sessionId = /\/([^\/]+)\/websocket/.exec(socket._transport.url)[1];
                // console.log("connected, session id: " + app.sessionId);
                // 订阅会话消息，处理断开重连的情况
                if (app.thread.tid !== null && app.thread.tid !== undefined && app.thread.tid !== '') {
                    app.subscribeTopic(app.threadTopic);
                }
                // 发送附言
                if (app.postscript !== null && app.postscript !== undefined && app.postscript !== '') {
                    let postcontent = app.postScriptPrefixTip + app.postscript
                    app.sendTextMessageSync(postcontent)
                }
                // 技能组设置
                app.getPrechatSettings();
                // 更新浏览记录
                // app.browse()
                // 接受通知
                // app.subscribeQueue('notification');
                // 订阅错误消息
                // app.subscribeQueue('errors');
            }, function (error) {
                console.log('连接断开【' + error + '】');
                app.isConnected = false;
                // 为断开重连做准备
                app.subscribedTopics = [];
                // 10秒后重新连接，实际效果：每10秒重连一次，直到连接成功
                setTimeout(function () {
                    console.log("reconnecting...");
                    app.byteDeskConnect();
                }, 5000);
            })
        }
    },
    directives: {
        focus: {
            // When the bound element is inserted into the DOM...
            inserted: function (el) {
                el.focus()
            }
        }
    },
    created() {
        // console.log("created:", localStorage.iframe);
        this.adminUid = this.getUrlParam("uid");
        this.workGroupWid = this.getUrlParam("wid");
        this.subDomain = this.getUrlParam("sub");
        this.type = this.getUrlParam("type");
        this.agentUid = this.getUrlParam("aid");
        this.nickname = this.getUrlParam("nickname") === null ? '' : this.getUrlParam("nickname");
        this.loadHistory = this.getUrlParam("history");
        this.postscript = this.getUrlParam("postscript");
        this.showScript = this.getUrlParam("showScript") === '1' ? true : false;
        this.hideNav = this.getUrlParam("hidenav") === '1' ? true : false;
        this.backUrl = (this.getUrlParam("backurl") === null || this.getUrlParam("backurl") === '') ? document.referrer : this.getUrlParam("backurl");
        this.lang = this.getUrlParam("lang") === null ? 'cn' : this.getUrlParam("lang");
        this.$i18n.locale = this.lang
        console.log('lang:', this.lang)
        //
        this.uid = localStorage.bd_kfe_uid;
        this.username = localStorage.bd_kfe_username;
        this.password = this.username;
        //
        this.delaySendPreviewMessage = _.debounce(this.sendPreviewMessage, 1500)
    },
    mounted() {
        // console.log("mount");
        if (this.access_token !== null
            && this.access_token !== undefined
            && this.access_token !== '') {
            //
            this.login()
        } else if (this.username !== null
            && this.username !== undefined
            && this.username !== '') {
            // 保存自定义用户名到服务器
            this.requestUsername();
        }
        else {
            this.requestUsername();
        }
        // 使ie支持startsWith
        if (!String.prototype.startsWith) {
            String.prototype.startsWith = function (searchString, position) {
                position = position || 0;
                return this.indexOf(searchString, position) === position;
            };
        }
        // 使ie支持includes
        if (!String.prototype.includes) {
            String.prototype.includes = function (str) {
                var returnValue = false;
                if (this.indexOf(str) !== -1) {
                    returnValue = true;
                }
                return returnValue;
            };
        }
        // 使ie支持endsWith
        if (!String.prototype.endsWith) {
            String.prototype.endsWith = function (suffix) {
                return this.indexOf(suffix, this.length - suffix.length) !== -1;
            };
        }
    }
});