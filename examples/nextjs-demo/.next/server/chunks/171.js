"use strict";exports.id=171,exports.ids=[171],exports.modules={9171:(a,b,c)=>{c.r(b),c.d(b,{default:()=>h});var d=c(3727),e=c(9540);let f=a=>{if("string"==typeof a)return a.trim()||void 0};class g{constructor(a){this.unreadBadgeMode="hidden",this.unreadBadgeCount=0,this.bubble=null,this.bubbleContainer=null,this.buttonElements=[],this.buttonPreviewElement=null,this.buttonPreviewHideTimer=null,this.window=null,this.inviteDialog=null,this.contextMenu=null,this.hideTimeout=null,this.isVisible=!1,this.isDragging=!1,this.windowState="normal",this.loopCount=0,this.loopTimer=null,this.isDestroyed=!1,this.initVisitorPromise=null,this.getUnreadMessageCountPromise=null,this.clearUnreadMessagesPromise=null,this.feedbackTooltip=null,this.feedbackDialog=null,this.selectedText="",this.selectionDebounceTimer=null,this.isTooltipVisible=!1,this.lastSelectionText="",this.lastMouseEvent=null,this.lastSelectionRect=null,this.bubbleMessages=[],this.bubbleMessageIndex=0,this.bubbleMessageTimer=null,this.bubbleMessageTransitionTimer=null,this.bubbleMessageViewportElement=null,this.bubbleMessageContentElement=null,this.bubblePendingMessageElement=null,this.bubbleTickerTrackElement=null,this.bubbleTickerStyleElement=null,this.bubbleIconElement=null,this.bubbleTitleElement=null,this.bubbleSubtitleElement=null,this.config={...this.getDefaultConfig(),...a},(0,e.e)(this.config),this.setupApiUrl()}async setupApiUrl(){try{let{setApiUrl:a}=await Promise.all([c.e(731),c.e(854)]).then(c.bind(c,854)),b=this.config.apiUrl||"https://api.weiyuai.cn";a(b),e.A.info("API URL 已设置为:",b)}catch(a){e.A.error("设置API URL时出错:",a)}}mergeConfig(a){return{...this.config,...a,inviteConfig:{...this.config.inviteConfig||{},...a.inviteConfig||{}},tabsConfig:{...this.config.tabsConfig||{},...a.tabsConfig||{}},bubbleConfig:{...this.config.bubbleConfig||{},...a.bubbleConfig||{}},buttonConfig:{...this.config.buttonConfig||{},...a.buttonConfig||{}},feedbackConfig:{...this.config.feedbackConfig||{},...a.feedbackConfig||{}},chatConfig:a.chatConfig?{...this.config.chatConfig||{},...a.chatConfig}:this.config.chatConfig,browseConfig:{...this.config.browseConfig||{},...a.browseConfig||{}},animation:{...this.config.animation||{},...a.animation||{}},window:{...this.config.window||{},...a.window||{}},theme:{...this.config.theme||{},...a.theme||{}},buttonsConfig:a.buttonsConfig??this.config.buttonsConfig}}refreshFloatingUi(){let a=!!(this.inviteDialog&&document.body.contains(this.inviteDialog)&&"none"!==this.inviteDialog.style.display);this.stopBubbleMessageRotation(),this.stopBubbleMessageTransition(),this.destroyBubbleTicker(),this.hideButtonPreview(),this.bubbleContainer&&document.body.contains(this.bubbleContainer)&&this.bubbleContainer.remove(),this.bubbleContainer=null,this.bubble=null,this.buttonElements=[],this.bubbleMessageViewportElement=null,this.bubbleMessageContentElement=null,this.bubblePendingMessageElement=null,this.bubbleTickerTrackElement=null,this.bubbleTickerStyleElement=null,this.bubbleIconElement=null,this.bubbleTitleElement=null,this.bubbleSubtitleElement=null,this.bubbleMessages=[],this.bubbleMessageIndex=0,this.inviteDialog&&document.body.contains(this.inviteDialog)&&this.inviteDialog.remove(),this.inviteDialog=null,this.createBubble(),this.createInviteDialog(),a&&this.showInviteDialog()}updateChatWindowLayout(){if(!this.window)return;let a=window.innerWidth<=768,b=window.innerWidth,c=window.innerHeight;if(a){Object.assign(this.window.style,{left:"0",right:"auto",bottom:"0",width:"100%",height:"100vh",borderTopLeftRadius:"12px",borderTopRightRadius:"12px",borderBottomLeftRadius:"0",borderBottomRightRadius:"0",boxSizing:"border-box",paddingTop:"env(safe-area-inset-top)",paddingBottom:"env(safe-area-inset-bottom)"}),this.window.style.height="100dvh";return}let d=Math.min(this.config.window?.width||.9*b,.9*b),e=Math.min(this.config.window?.height||.9*c,.9*c);Object.assign(this.window.style,{width:`${d}px`,height:`${e}px`,left:"bottom-left"===this.config.placement?`${this.config.marginSide}px`:"auto",right:"bottom-right"===this.config.placement?`${this.config.marginSide}px`:"auto",bottom:`${this.config.marginBottom}px`,borderRadius:"12px",boxSizing:"border-box",paddingTop:"",paddingBottom:""})}refreshChatIframeUrl(){if(!this.window)return;let a=this.window.querySelector("iframe");a&&(a.src=this.generateChatUrl())}setTheme(a){this.setConfig({theme:{...this.config.theme||{},...a}})}setConfig(a){let b=this.config;this.config=this.mergeConfig(a);let c=this.getPrimaryActionFromConfig(a),d=Object.prototype.hasOwnProperty.call(a,"chatPath"),f=Object.prototype.hasOwnProperty.call(a,"buttonConfig");!d&&(c?this.syncChatPathByAction(c):f&&this.syncChatPathByAction("chat")),(0,e.e)(this.config),a.apiUrl&&a.apiUrl!==b.apiUrl&&this.setupApiUrl(),(this.bubbleContainer&&document.body.contains(this.bubbleContainer)||this.inviteDialog&&document.body.contains(this.inviteDialog))&&this.refreshFloatingUi(),this.window&&document.body.contains(this.window)&&(this.updateChatWindowLayout(),(a.theme||a.locale||a.chatConfig||a.htmlUrl||a.chatPath||a.threadPath||a.webrtcPath||a.callPath)&&this.refreshChatIframeUrl()),this.config.onConfigChange?.(this.config)}getPrimaryActionFromConfig(a){let b=a.buttonConfig?.action;return b&&["chat","thread","webrtc","call"].includes(b)?b:null}syncChatPathByAction(a){switch(a){case"thread":this.config.chatPath=this.normalizePath(this.config.threadPath,"/chat/thread");break;case"webrtc":this.config.chatPath=this.normalizePath(this.config.webrtcPath,"/webrtc");break;case"call":this.config.chatPath=this.normalizePath(this.config.callPath,"/call");break;default:this.config.chatPath="/chat"}}getDefaultConfig(){return{isDebug:!1,forceRefresh:!1,htmlUrl:"https://cdn.weiyuai.cn",apiUrl:"https://api.weiyuai.cn",chatPath:"/chat",threadPath:"/chat/thread",webrtcPath:"/webrtc",callPath:"/call",placement:"bottom-right",marginBottom:20,marginSide:20,autoPopup:!1,inviteConfig:{show:!1,text:"邀请您加入对话",acceptText:"开始对话",rejectText:"稍后再说"},tabsConfig:{home:!1,messages:!0,help:!1,news:!1},bubbleConfig:{show:!0,icon:"\uD83D\uDC4B",title:"需要帮助吗？",subtitle:"点击开始对话"},buttonConfig:{show:!0,width:60,height:60,onClick:()=>{this.showChat()}},feedbackConfig:{enabled:!1,trigger:"selection",showOnSelection:!0,selectionText:"文档反馈",buttonText:"文档反馈",dialogTitle:"提交意见反馈",placeholder:"请描述您的问题或优化建议",submitText:"提交反馈",cancelText:"取消",successMessage:"反馈已提交，感谢您的意见！",categoryNames:["错别字、拼写错误","链接跳转有问题","文档和实操过程不一致","文档难以理解","建议或其他"],requiredTypes:!1,typesSectionTitle:"问题类型",typesDescription:"（多选）",submitScreenshot:!0},chatConfig:{org:"df_org_uid",t:"2",sid:"df_rt_uid"},animation:{enabled:!0,duration:300,type:"ease"},theme:{mode:"system",textColor:"#ffffff",backgroundColor:"#0066FF"},window:{width:380,height:640},draggable:!1,locale:"zh-cn"}}getEffectiveButtonConfigs(){let a=Array.isArray(this.config.buttonsConfig)?this.config.buttonsConfig.filter(a=>!!a):[];return a.length>0?a:[this.config.buttonConfig||{}]}hasVisibleButtons(){return this.getEffectiveButtonConfigs().some(a=>!1!==a.show)}isMultiButtonLayout(a){return(a||this.getEffectiveButtonConfigs()).filter(a=>!1!==a.show).length>1}applyConfiguredButtonVisibility(){let a=this.getEffectiveButtonConfigs();this.buttonElements.forEach((b,c)=>{let d=a[c];b.style.display=d?.show===!1?"none":"flex"})}hideBubbleMessageElement(){let a=this.bubble?.messageElement;a instanceof HTMLElement&&(this.stopBubbleMessageTransition(),a.style.display="none",this.stopBubbleMessageRotation())}triggerButtonAction(a){if(a.onClick)return void a.onClick();switch(a.action){case"thread":this.showThread();break;case"webrtc":this.showWebrtc();break;case"call":this.showCall();break;default:this.showChat()}}hideButtonPreview(){this.buttonPreviewHideTimer&&(window.clearTimeout(this.buttonPreviewHideTimer),this.buttonPreviewHideTimer=null),this.buttonPreviewElement?.parentElement&&this.buttonPreviewElement.parentElement.removeChild(this.buttonPreviewElement),this.buttonPreviewElement=null}cancelButtonPreviewHide(){this.buttonPreviewHideTimer&&(window.clearTimeout(this.buttonPreviewHideTimer),this.buttonPreviewHideTimer=null)}scheduleHideButtonPreview(){this.cancelButtonPreviewHide(),this.buttonPreviewHideTimer=window.setTimeout(()=>{this.hideButtonPreview()},120)}showButtonPreview(a,b){if(!b.previewImageUrl)return void this.hideButtonPreview();this.hideButtonPreview();let c=document.createElement("div"),d=this.config.theme?.mode==="dark",e=document.createElement("img"),f=document.createElement("div"),g=a.getBoundingClientRect(),h=Math.min(Math.max(12,g.top+g.height/2-110),Math.max(12,window.innerHeight-232)),i="bottom-left"===this.config.placement?Math.min(window.innerWidth-180-12,g.right+14):Math.max(12,g.left-180-14);c.style.cssText=`
      position: fixed;
      top: ${h}px;
      left: ${i}px;
      width: 180px;
      padding: 10px;
      border-radius: 16px;
      background: ${d?"rgba(17, 24, 39, 0.96)":"rgba(255, 255, 255, 0.98)"};
      box-shadow: 0 12px 32px rgba(0, 0, 0, ${d?"0.34":"0.18"});
      border: 1px solid ${d?"rgba(255,255,255,0.08)":"rgba(15,23,42,0.08)"};
      z-index: 10001;
      pointer-events: auto;
      display: flex;
      flex-direction: column;
      gap: 8px;
      cursor: pointer;
    `,e.src=b.previewImageUrl,e.alt=b.previewImageAlt||b.text||"preview image",e.style.cssText=`
      width: 100%;
      aspect-ratio: 1 / 1;
      object-fit: contain;
      background: white;
      border-radius: 12px;
      display: block;
    `,f.textContent=b.previewImageAlt||b.text||"",f.style.cssText=`
      color: ${d?"#e5e7eb":"#0f172a"};
      font-size: 12px;
      line-height: 1.4;
      text-align: center;
      word-break: break-word;
    `,c.appendChild(e),f.textContent&&c.appendChild(f),c.addEventListener("mouseenter",()=>{this.cancelButtonPreviewHide()}),c.addEventListener("mouseleave",()=>{this.scheduleHideButtonPreview()}),c.addEventListener("click",()=>{window.open(b.previewImageUrl,"_blank","noopener,noreferrer")}),document.body.appendChild(c),this.buttonPreviewElement=c}createButtonElement(a,b,c){let d=document.createElement("button"),f=c?.isMultiLayout===!0,g=a.width||60,h=a.height||60,i=Math.max(g,h),j=f?i:g,k=f?i:h,l=f?0:Math.min(j,k)/2,m=this.config.theme?.mode==="dark",n=this.config.theme?.backgroundColor||(m?"#3B82F6":"#0066FF"),o=this.config.theme?.textColor||"#ffffff",p=f?"none":`0 4px 16px rgba(0, 0, 0, ${m?"0.3":"0.12"})`,q=f&&!c?.isLastButton?`1px solid rgba(255, 255, 255, ${m?"0.14":"0.28"})`:"none",r=f?"translateY(-1px)":"scale(1.1)";d.style.cssText=`
      background-color: ${f?"transparent":n};
      width: ${j}px;
      height: ${k}px;
      border-radius: ${l}px;
      border: none;
      border-bottom: ${q};
      cursor: ${this.config.draggable?"move":"pointer"};
      display: ${!1===a.show?"none":"flex"};
      align-items: center;
      justify-content: center;
      box-shadow: ${p};
      transition: all 0.3s ease;
      outline: none;
      position: relative;
      user-select: none;
      padding: 0;
    `;let s=document.createElement("div");if(s.style.cssText=`
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: ${f&&a.text?"column":"row"};
      gap: ${f?"4px":"8px"};
      width: 100%;
      height: 100%;
    `,a.icon){let b=document.createElement("span");b.textContent=a.icon,b.style.fontSize=`${k*(f?.34:.4)}px`,b.style.lineHeight="1",s.appendChild(b)}else{let a=document.createElement("div");a.innerHTML=`
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.663 3.04094 17.0829 4.73812 18.875L2.72681 21.1705C2.44361 21.4937 2.67314 22 3.10288 22H12Z" fill="white"/>
        </svg>
      `,s.appendChild(a)}if(a.text){let b=document.createElement("span");b.textContent=a.text,b.style.cssText=`
        color: ${o};
        font-size: ${k*(f?.16:.25)}px;
        white-space: nowrap;
        line-height: 1.1;
        text-align: center;
        max-width: ${f?`${j-8}px`:"none"};
        overflow: hidden;
        text-overflow: ellipsis;
      `,s.appendChild(b)}return d.appendChild(s),d.addEventListener("mouseenter",()=>{this.cancelButtonPreviewHide(),d.style.transform=r,f&&(d.style.backgroundColor="rgba(255, 255, 255, 0.12)"),a.previewImageUrl&&this.showButtonPreview(d,a)}),d.addEventListener("mouseleave",()=>{d.style.transform="scale(1)",f&&(d.style.backgroundColor="transparent"),a.previewImageUrl&&this.scheduleHideButtonPreview()}),d.addEventListener("click",()=>{this.isDragging||(e.A.debug("bubble click",a.action||"chat"),b instanceof HTMLElement&&this.hideBubbleMessageElement(),this.triggerButtonAction(a))}),d.addEventListener("contextmenu",a=>{this.showContextMenu(a)}),d.messageElement=b,d}async init(){if(this.isDestroyed)return void e.A.warn("BytedeskWeb 已销毁，跳过初始化");let a=this.hasVisibleButtons();if(await this._initVisitor(),this.isDestroyed)return;if(a){if(await this._browseVisitor(),this.isDestroyed)return}else e.A.debug("buttonConfig.show=false，跳过自动发送浏览记录");if(this.createBubble(),!this.isDestroyed&&(this.createInviteDialog(),!this.isDestroyed)){if(this.setupMessageListener(),this.setupResizeListener(),!this.isDestroyed){if(this.config.feedbackConfig?.enabled&&(this.config.isDebug&&e.A.debug("BytedeskWeb: 开始初始化文档反馈功能，document.readyState:",document.readyState),this.initFeedbackFeature(),"complete"!==document.readyState)){this.config.isDebug&&e.A.debug("BytedeskWeb: DOM未完全加载，设置备用初始化");let a=()=>{this.config.isDebug&&e.A.debug("BytedeskWeb: window load事件触发，重新初始化反馈功能"),this.initFeedbackFeature(),window.removeEventListener("load",a)};window.addEventListener("load",a);let b=()=>{this.config.isDebug&&e.A.debug("BytedeskWeb: DOMContentLoaded事件触发，重新初始化反馈功能"),setTimeout(()=>this.initFeedbackFeature(),100),document.removeEventListener("DOMContentLoaded",b)};"loading"===document.readyState&&document.addEventListener("DOMContentLoaded",b)}if(a){if(this._getUnreadMessageCount(),this.isDestroyed)return}else e.A.debug("buttonConfig.show=false，跳过自动获取未读消息数");if(this.config.autoPopup){if(this.isDestroyed)return;setTimeout(()=>{this.showChat()},this.config.autoPopupDelay||1e3)}if(!this.isDestroyed&&this.config.inviteConfig?.show){if(this.isDestroyed)return;setTimeout(()=>{this.showInviteDialog()},this.config.inviteConfig.delay||3e3)}}}}async _initVisitor(){if(this.initVisitorPromise)return e.A.debug("访客初始化请求正在进行中，返回现有Promise"),this.initVisitorPromise;let a=localStorage.getItem(d.Lc),b=localStorage.getItem(d.Gf);e.A.debug("localUid: ",a),e.A.debug("localVisitorUid: ",b);let f=!(this.config.chatConfig?.visitorUid&&b)||this.config.chatConfig?.visitorUid===b;return a&&b&&f?(e.A.debug("访客信息相同，直接返回本地访客信息"),this.config.onVisitorInfo?.(a||"",b||""),{uid:a,visitorUid:b}):(e.A.debug("开始创建访客初始化Promise"),this.initVisitorPromise=Promise.all([c.e(731),c.e(466)]).then(c.bind(c,8466)).then(async({initVisitor:c})=>{try{let f={uid:String(this.config.chatConfig?.uid||a||""),visitorUid:String(this.config.chatConfig?.visitorUid||b||""),orgUid:String(this.config.chatConfig?.org||""),nickname:String(this.config.chatConfig?.name||""),avatar:String(this.config.chatConfig?.avatar||""),mobile:String(this.config.chatConfig?.mobile||""),email:String(this.config.chatConfig?.email||""),note:String(this.config.chatConfig?.note||""),channel:String(this.config.chatConfig?.channel||""),extra:"string"==typeof this.config.chatConfig?.extra?this.config.chatConfig.extra:JSON.stringify(this.config.chatConfig?.extra||{}),vipLevel:String(this.config.chatConfig?.vipLevel||""),debug:this.config.chatConfig?.debug||!1,settingsUid:this.config.chatConfig?.settingsUid||"",loadHistory:this.config.chatConfig?.loadHistory||!1},g=await c(f);if(e.A.debug("访客初始化API响应:",g.data,f),g.data?.code===200)return g.data?.data?.uid&&(localStorage.setItem(d.Lc,g.data.data.uid),e.A.debug("已保存uid到localStorage:",g.data.data.uid)),g.data?.data?.visitorUid&&(localStorage.setItem(d.Gf,g.data.data.visitorUid),e.A.debug("已保存visitorUid到localStorage:",g.data.data.visitorUid)),g.data?.data&&(e.A.debug("触发onVisitorInfo回调"),this.config.onVisitorInfo?.(g.data.data.uid||"",g.data.data.visitorUid||"")),g.data.data;return e.A.error("访客初始化失败:",g.data?.message),null}catch(a){return e.A.error("访客初始化出错:",a),null}finally{e.A.debug("访客初始化Promise完成，清除引用"),this.initVisitorPromise=null}}),this.initVisitorPromise)}async _browseVisitor(){try{let a=localStorage.getItem(d.BQ);if(a){let b=parseInt(a),c=Date.now();if(!Number.isNaN(b)&&c-b<36e5){let a=Math.ceil((36e5-(c-b))/1e3/60);e.A.warn(`浏览记录1小时内最多发送一次，还需等待 ${a} 分钟`);return}}let b=localStorage.getItem(d.CA);if(b){let a=parseInt(b),c=Date.now();if(c-a<36e5){let b=Math.ceil((36e5-(c-a))/1e3/60);e.A.warn(`浏览记录发送失败后1小时内禁止发送，还需等待 ${b} 分钟`);return}localStorage.removeItem(d.CA)}let f=window.location.href,g=document.title,h=document.referrer,i=navigator.userAgent,j=this.getBrowserInfo(i),k=this.getOSInfo(i),l=this.getDeviceInfo(i),m=`${screen.width}x${screen.height}`,n=new URLSearchParams(window.location.search),o=n.get("utm_source")||void 0,p=n.get("utm_medium")||void 0,q=n.get("utm_campaign")||void 0,r=localStorage.getItem(d.Lc),s={url:f,title:g,referrer:h,userAgent:i,operatingSystem:k,browser:j,deviceType:l,screenResolution:m,utmSource:o,utmMedium:p,utmCampaign:q,status:"ONLINE",visitorUid:String(this.config.chatConfig?.uid||r||""),orgUid:this.config.chatConfig?.org||"",channel:String(this.config.chatConfig?.channel||"")};if(!s.visitorUid)return void e.A.warn("访客uid为空，跳过browse操作");localStorage.setItem(d.BQ,Date.now().toString());let{browse:t}=await Promise.all([c.e(731),c.e(466)]).then(c.bind(c,8466)),u=await t(s);u.data?.code===200?localStorage.removeItem(d.CA):(e.A.error("浏览记录发送失败:",u.data?.message),localStorage.setItem(d.CA,Date.now().toString()),e.A.warn("已记录浏览记录发送失败时间，1小时内将禁止再次发送"))}catch(a){e.A.error("发送浏览记录时出错:",a),localStorage.setItem(d.CA,Date.now().toString()),e.A.warn("已记录浏览记录发送失败时间，1小时内将禁止再次发送")}}getBrowserInfo(a){return a.includes("Chrome")?"Chrome":a.includes("Firefox")?"Firefox":a.includes("Safari")?"Safari":a.includes("Edge")?"Edge":a.includes("Opera")?"Opera":"Unknown"}getOSInfo(a){return a.includes("Windows")?"Windows":a.includes("Mac")?"macOS":a.includes("Linux")?"Linux":a.includes("Android")?"Android":a.includes("iOS")?"iOS":"Unknown"}getDeviceInfo(a){return a.includes("Mobile")?"Mobile":a.includes("Tablet")?"Tablet":"Desktop"}async _getUnreadMessageCount(){return this.getUnreadMessageCountPromise?e.A.debug("获取未读消息数请求正在进行中，返回现有Promise"):this.getUnreadMessageCountPromise=Promise.all([c.e(731),c.e(315)]).then(c.bind(c,2315)).then(async({getUnreadMessageCount:a})=>{try{let b=String(this.config.chatConfig?.visitorUid||""),c=localStorage.getItem(d.Lc),e=localStorage.getItem(d.Gf),f={uid:c||"",visitorUid:b||e||"",orgUid:this.config.chatConfig?.org||""};if(""===f.uid)return 0;let g=await a(f);if(g.data?.code===200)return this.setUnreadMessageCount(g.data.data||0),g.data.data||0;return 0}catch(a){return e.A.error("获取未读消息数出错:",a),0}finally{this.getUnreadMessageCountPromise=null}}),this.getUnreadMessageCountPromise}async getUnreadMessageCount(){return this._getUnreadMessageCount()}async initVisitor(){return this._initVisitor()}async browseVisitor(){return this._browseVisitor()}clearBrowseFailedLimit(){localStorage.removeItem(d.CA),localStorage.removeItem(d.BQ),e.A.info("已清除浏览记录发送失败的限制")}clearVisitorInfo(){localStorage.removeItem(d.Lc),localStorage.removeItem(d.Gf),e.A.info("已清除本地访客信息")}async forceInitVisitor(){return this.clearVisitorInfo(),this.initVisitorPromise=null,this._initVisitor()}removeUnreadBadgeElement(){if(!this.bubble)return;let a=this.bubble.querySelector(".bytedesk-unread-badge");a&&a.remove()}renderUnreadBadge(){if(e.A.debug("renderUnreadBadge() 被调用",{mode:this.unreadBadgeMode,count:this.unreadBadgeCount}),!this.hasVisibleButtons()){this.removeUnreadBadgeElement(),e.A.debug("renderUnreadBadge: 当前没有可见按钮，不显示角标");return}if(!this.bubble)return void e.A.debug("renderUnreadBadge: bubble 不存在");if("hidden"===this.unreadBadgeMode)return void this.removeUnreadBadgeElement();let a=this.bubble.querySelector(".bytedesk-unread-badge");a||((a=document.createElement("div")).className="bytedesk-unread-badge",this.bubble.appendChild(a));let b="count"===this.unreadBadgeMode;a.style.cssText=`
      position: absolute;
      top: -4px;
      right: 2px;
      min-width: ${b?"18px":"10px"};
      width: ${b?"auto":"10px"};
      height: ${b?"18px":"10px"};
      padding: ${b?"0 4px":"0"};
      background: #ff4d4f;
      color: white;
      font-size: 12px;
      font-weight: bold;
      line-height: 1;
      border-radius: 999px;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      border: 2px solid white;
      box-sizing: border-box;
      pointer-events: none;
      z-index: 1;
    `,a.textContent=b?this.unreadBadgeCount>99?"99+":this.unreadBadgeCount.toString():""}setUnreadMessageCount(a){let b=Number.isFinite(a)?Math.max(0,Math.floor(a)):0;return this.unreadBadgeCount=b,this.unreadBadgeMode=b>0?"count":"hidden",this.renderUnreadBadge(),b}showUnreadDot(){this.unreadBadgeCount=0,this.unreadBadgeMode="dot",this.renderUnreadBadge()}clearUnreadBadge(){this.unreadBadgeCount=0,this.unreadBadgeMode="hidden",this.removeUnreadBadgeElement()}async clearUnreadMessages(){return this.clearUnreadMessagesPromise?e.A.debug("清空未读消息请求正在进行中，返回现有Promise"):this.clearUnreadMessagesPromise=Promise.all([c.e(731),c.e(315)]).then(c.bind(c,2315)).then(async({clearUnreadMessages:a})=>{try{let b=String(this.config.chatConfig?.visitorUid||""),c=localStorage.getItem(d.Lc),f=localStorage.getItem(d.Gf),g={uid:c||"",visitorUid:b||f||"",orgUid:this.config.chatConfig?.org||""},h=await a(g);if(e.A.debug("清空未读消息数:",h.data,g),200===h.data.code)return e.A.info("清空未读消息数成功:",h.data),this.clearUnreadBadge(),h.data.data||0;return e.A.error("清空未读消息数失败:",h.data.message),0}catch(a){return e.A.error("清空未读消息数出错:",a),0}finally{this.clearUnreadMessagesPromise=null}}),this.clearUnreadMessagesPromise}getBubbleMessages(){let a=this.config.bubbleConfig?.messages;if(Array.isArray(a)&&a.length>0){let b=a.filter(a=>!!a&&(!!a.icon||!!a.title||!!a.subtitle));if(b.length>0)return b}return[{icon:this.config.bubbleConfig?.icon,title:this.config.bubbleConfig?.title,subtitle:this.config.bubbleConfig?.subtitle}]}getBubbleSwitchMode(){return this.config.bubbleConfig?.switchMode||"fade"}buildBubbleMessageContentNode(a){let b=document.createElement("div");b.style.cssText=`
      display: flex;
      align-items: center;
      gap: 8px;
      flex-direction: ${"bottom-left"===this.config.placement?"row":"row-reverse"};
      box-sizing: border-box;
    `,b.setAttribute("data-bytedesk-bubble-content","true"),b.setAttribute("data-placement",this.config.placement||"bottom-right");let c=document.createElement("span");c.setAttribute("data-bytedesk-bubble-role","icon"),c.style.fontSize="20px",c.textContent=a.icon||"",b.appendChild(c);let d=document.createElement("div");d.style.cssText="min-width: 0; flex: 1;";let e=document.createElement("div");e.setAttribute("data-bytedesk-bubble-role","title"),e.style.fontWeight="bold",e.style.color=this.config.theme?.mode==="dark"?"#e5e7eb":"#1f2937",e.style.marginBottom="4px",e.style.textAlign="bottom-left"===this.config.placement?"left":"right",e.textContent=a.title||"",d.appendChild(e);let f=document.createElement("div");return f.setAttribute("data-bytedesk-bubble-role","subtitle"),f.style.fontSize="0.9em",f.style.color=this.config.theme?.mode==="dark"?"#9ca3af":"#4b5563",f.style.textAlign="bottom-left"===this.config.placement?"left":"right",f.textContent=a.subtitle||"",d.appendChild(f),b.appendChild(d),{messageContent:b,iconSpan:c,title:e,subtitle:f}}buildBubbleTickerItemNode(a,b,c){let d=document.createElement("div");d.style.cssText=`
      position: relative;
      width: ${b?`${b}px`:"auto"};
      padding-bottom: 10px;
      box-sizing: border-box;
      display: block;
    `;let e=document.createElement("div");e.style.cssText=`
      background: ${this.config.theme?.mode==="dark"?"#1f2937":"white"};
      color: ${this.config.theme?.mode==="dark"?"#e5e7eb":"#1f2937"};
      padding: 12px 16px;
      border-radius: 8px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
      max-width: 220px;
      position: relative;
      box-sizing: border-box;
      width: ${b?`${b}px`:"auto"};
      min-height: ${c?`${c-10}px`:"auto"};
    `;let{messageContent:f}=this.buildBubbleMessageContentNode(a);return b&&(f.style.width=`${Math.max(0,b-32)}px`),e.appendChild(f),d.appendChild(e),d}destroyBubbleTicker(){this.bubbleTickerStyleElement?.parentElement&&this.bubbleTickerStyleElement.parentElement.removeChild(this.bubbleTickerStyleElement),this.bubbleTickerStyleElement=null,this.bubbleTickerTrackElement?.parentElement&&this.bubbleTickerTrackElement.parentElement.removeChild(this.bubbleTickerTrackElement),this.bubbleTickerTrackElement=null}setBubbleTickerRunning(a){this.bubbleTickerTrackElement&&(this.bubbleTickerTrackElement.style.animationPlayState=a?"running":"paused")}initBubbleTicker(a){let b=this.bubbleMessageViewportElement,c=a||this.bubble?.messageElement||b?.parentElement;if(!(b instanceof HTMLElement))return;if(this.destroyBubbleTicker(),this.bubbleMessages.length<=1){this.bubbleMessageContentElement&&!b.contains(this.bubbleMessageContentElement)&&b.appendChild(this.bubbleMessageContentElement),this.renderBubbleMessage(0);return}if(!(c instanceof HTMLElement))return;let d=document.createElement("div");d.style.cssText=`
      position: absolute;
      visibility: hidden;
      pointer-events: none;
      left: 0;
      top: 0;
      z-index: -1;
      width: max-content;
      max-width: 220px;
    `,c.appendChild(d);let e=this.bubbleMessages.map(a=>{let b=this.buildBubbleTickerItemNode(a);return d.appendChild(b),b}),f=e.reduce((a,b)=>Math.max(a,b.offsetHeight),0),g=e.reduce((a,b)=>Math.max(a,b.offsetWidth),0);if(c.removeChild(d),!f||!g)return;b.style.width=`${g}px`,this.syncBubbleViewportHeight(f,!1);let h=document.createElement("div");h.style.cssText=`
      position: relative;
      display: flex;
      flex-direction: column;
      width: ${g}px;
      will-change: transform;
    `,[...this.bubbleMessages,...this.bubbleMessages].forEach(a=>{let b=this.buildBubbleTickerItemNode(a,g,f);b.style.height=`${f}px`,b.style.minHeight=`${f}px`,h.appendChild(b)});let i=f*this.bubbleMessages.length,j=Math.max(1.6,Number(this.config.bubbleConfig?.rotateInterval||3e3)/1e3)*this.bubbleMessages.length,k=`bytedeskBubbleTicker_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,l=document.createElement("style");l.textContent=`
      @keyframes ${k} {
        from { transform: translateY(0); }
        to { transform: translateY(-${i}px); }
      }
    `,document.head.appendChild(l),h.style.animation=`${k} ${j}s linear infinite`,h.style.animationPlayState="paused",b.appendChild(h),this.bubbleTickerTrackElement=h,this.bubbleTickerStyleElement=l,this.bubbleMessageIndex=0}renderBubbleMessage(a){if(!this.bubbleMessages.length)return;if("ticker"===this.getBubbleSwitchMode()){this.bubbleMessageIndex=(a%this.bubbleMessages.length+this.bubbleMessages.length)%this.bubbleMessages.length,this.syncBubbleViewportHeight();return}if(!this.bubbleIconElement||!this.bubbleTitleElement||!this.bubbleSubtitleElement)return;let b=this.bubbleMessages.length;this.bubbleMessageIndex=(a%b+b)%b;let c=this.bubbleMessages[this.bubbleMessageIndex];this.bubbleIconElement.textContent=c.icon||"",this.bubbleTitleElement.textContent=c.title||"",this.bubbleSubtitleElement.textContent=c.subtitle||"",this.syncBubbleViewportHeight()}syncBubbleViewportHeight(a,b=!1){if(!(this.bubbleMessageViewportElement instanceof HTMLElement))return;let c=a??this.bubbleMessageContentElement?.offsetHeight??0;c&&(this.bubbleMessageViewportElement.style.transition=b?"height 0.3s ease":"none",this.bubbleMessageViewportElement.style.height=`${c}px`)}cleanupPendingBubbleMessage(){this.bubblePendingMessageElement?.parentElement&&this.bubblePendingMessageElement.parentElement.removeChild(this.bubblePendingMessageElement),this.bubblePendingMessageElement=null}stopBubbleMessageTransition(){null!==this.bubbleMessageTransitionTimer&&(window.clearTimeout(this.bubbleMessageTransitionTimer),this.bubbleMessageTransitionTimer=null),this.setBubbleTickerRunning(!1),this.cleanupPendingBubbleMessage(),this.bubbleMessageViewportElement&&(this.bubbleMessageViewportElement.style.transition=""),this.bubbleMessageContentElement&&(this.bubbleMessageContentElement.style.transition="",this.bubbleMessageContentElement.style.transform="translateY(0)",this.bubbleMessageContentElement.style.opacity="1")}transitionBubbleMessage(a){let b=this.bubble?.messageElement;if(!(b instanceof HTMLElement)||"none"===b.style.display)return void this.renderBubbleMessage(a);let c=this.getBubbleSwitchMode();if("ticker"===c){this.renderBubbleMessage(a),this.setBubbleTickerRunning(!0);return}if(this.stopBubbleMessageTransition(),"slide-up"===c){let b=this.bubbleMessageViewportElement,c=this.bubbleMessageContentElement;if(!(b instanceof HTMLElement)||!(c instanceof HTMLElement)||!c.parentElement)return void this.renderBubbleMessage(a);let d=this.bubbleMessages[(a%this.bubbleMessages.length+this.bubbleMessages.length)%this.bubbleMessages.length],e=c.cloneNode(!0),f=e.querySelector('[data-bytedesk-bubble-role="icon"]'),g=e.querySelector('[data-bytedesk-bubble-role="title"]'),h=e.querySelector('[data-bytedesk-bubble-role="subtitle"]');f&&(f.textContent=d.icon||""),g&&(g.textContent=d.title||""),h&&(h.textContent=d.subtitle||""),e.style.position="absolute",e.style.left="0",e.style.top="0",e.style.width="100%",e.style.transform="translateY(100%)",e.style.opacity="1",e.style.transition="transform 0.3s ease",c.style.transition="transform 0.3s ease";let i=c.offsetHeight;c.parentElement.appendChild(e);let j=e.offsetHeight;return this.syncBubbleViewportHeight(i,!1),this.bubblePendingMessageElement=e,window.requestAnimationFrame(()=>{this.syncBubbleViewportHeight(j,!0),c.style.transform="translateY(-100%)",e.style.transform="translateY(0)"}),void(this.bubbleMessageTransitionTimer=window.setTimeout(()=>{this.renderBubbleMessage(a),c.style.transition="",c.style.transform="translateY(0)",c.style.opacity="1",this.syncBubbleViewportHeight(j,!1),this.cleanupPendingBubbleMessage(),this.bubbleMessageTransitionTimer=null},320))}let d=this.bubbleMessageContentElement?.offsetHeight??0;this.syncBubbleViewportHeight(d,!1),b.style.opacity="0",b.style.transform="translateY(6px)",this.bubbleMessageTransitionTimer=window.setTimeout(()=>{this.renderBubbleMessage(a);let c=this.bubbleMessageContentElement?.offsetHeight??d;this.syncBubbleViewportHeight(c,!0),b.style.opacity="1",b.style.transform="translateY(0)",this.bubbleMessageTransitionTimer=null},180)}stopBubbleMessageRotation(){null!==this.bubbleMessageTimer&&(window.clearInterval(this.bubbleMessageTimer),this.bubbleMessageTimer=null),this.setBubbleTickerRunning(!1)}startBubbleMessageRotation(){if(this.stopBubbleMessageRotation(),this.config.bubbleConfig?.autoRotate===!1||this.bubbleMessages.length<=1)return;if("ticker"===this.getBubbleSwitchMode()){this.bubbleTickerTrackElement||this.initBubbleTicker(this.bubble?.messageElement||this.bubbleMessageViewportElement?.parentElement),this.setBubbleTickerRunning(!0);return}let a=Number(this.config.bubbleConfig?.rotateInterval||3e3),b=Number.isFinite(a)?Math.max(1e3,a):3e3;this.bubbleMessageTimer=window.setInterval(()=>{let a=this.bubble?.messageElement;a instanceof HTMLElement&&"none"!==a.style.display&&this.transitionBubbleMessage(this.bubbleMessageIndex+1)},b)}createBubble(){if(this.bubble&&document.body.contains(this.bubble))return void e.A.debug("createBubble: 气泡已存在，不重复创建");this.bubble&&!document.body.contains(this.bubble)&&(e.A.debug("createBubble: 清理已存在的 bubble 引用"),this.bubble=null),this.bubbleContainer&&!document.body.contains(this.bubbleContainer)&&(e.A.debug("createBubble: 清理已存在的 bubbleContainer 引用"),this.bubbleContainer=null),this.buttonElements=[];let a=document.createElement("div");a.style.cssText=`
      position: fixed;
      ${"bottom-left"===this.config.placement?"left":"right"}: ${this.config.marginSide}px;
      bottom: ${this.config.marginBottom}px;
      display: flex;
      flex-direction: column;
      align-items: ${"bottom-left"===this.config.placement?"flex-start":"flex-end"};
      gap: 10px;
      z-index: 9999;
    `;let b=null;if(this.config.bubbleConfig?.show){let c="ticker"===this.getBubbleSwitchMode();(b=document.createElement("div")).style.cssText=`
        background: ${c?"transparent":this.config.theme?.mode==="dark"?"#1f2937":"white"};
        color: ${this.config.theme?.mode==="dark"?"#e5e7eb":"#1f2937"};
        padding: ${c?"0":"12px 16px"};
        border-radius: ${c?"0":"8px"};
        box-shadow: ${c?"none":"0 2px 12px rgba(0, 0, 0, 0.1)"};
        max-width: ${c?"none":"220px"};
        margin-bottom: 8px;
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.22s ease, transform 0.22s ease;
        position: relative;
      `;let d=document.createElement("div");d.style.cssText=`
        position: relative;
        overflow: hidden;
      `;let{messageContent:e,iconSpan:f,title:g,subtitle:h}=this.buildBubbleMessageContentNode({icon:this.config.bubbleConfig?.icon,title:this.config.bubbleConfig?.title,subtitle:this.config.bubbleConfig?.subtitle});if(c||d.appendChild(e),b.appendChild(d),!c){let a=document.createElement("div");a.style.cssText=`
          position: absolute;
          bottom: -6px;
          ${"bottom-left"===this.config.placement?"left: 24px":"right: 24px"};
          width: 12px;
          height: 12px;
          background: ${this.config.theme?.mode==="dark"?"#1f2937":"white"};
          transform: rotate(45deg);
          box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        `;let c=document.createElement("div");c.style.cssText=`
          position: absolute;
          bottom: 0;
          ${"bottom-left"===this.config.placement?"left: 18px":"right: 18px"};
          width: 24px;
          height: 12px;
          background: ${this.config.theme?.mode==="dark"?"#1f2937":"white"};
        `,b.appendChild(a),b.appendChild(c)}a.appendChild(b),this.bubbleMessages=this.getBubbleMessages(),this.bubbleMessageViewportElement=d,this.bubbleMessageContentElement=e,this.bubbleIconElement=f,this.bubbleTitleElement=g,this.bubbleSubtitleElement=h,this.bubbleMessageIndex=0,"ticker"===this.getBubbleSwitchMode()?this.initBubbleTicker(b):this.renderBubbleMessage(0),b.addEventListener("mouseenter",()=>{this.stopBubbleMessageRotation()}),b.addEventListener("mouseleave",()=>{this.startBubbleMessageRotation()}),setTimeout(()=>{b&&(b.style.opacity="1",b.style.transform="translateY(0)",this.startBubbleMessageRotation())},500)}let c=this.getEffectiveButtonConfigs(),d=document.createElement("div"),f=this.isMultiButtonLayout(c),g=this.config.theme?.mode==="dark",h=this.config.theme?.backgroundColor||(g?"#3B82F6":"#0066FF");if(d.style.cssText=`
      display: flex;
      flex-direction: column;
      align-items: ${"bottom-left"===this.config.placement?"flex-start":"flex-end"};
      gap: ${f?"0":"10px"};
      background: ${f?h:"transparent"};
      border-radius: ${f?"18px":"0"};
      overflow: ${f?"hidden":"visible"};
      box-shadow: ${f?`0 10px 28px rgba(0, 0, 0, ${g?"0.32":"0.16"})`:"none"};
    `,c.forEach((a,e)=>{let g=this.createButtonElement(a,b,{isMultiLayout:f,isLastButton:e===c.length-1});this.buttonElements.push(g),0===e&&(this.bubble=g),d.appendChild(g)}),this.renderUnreadBadge(),a.appendChild(d),this.config.draggable&&this.buttonElements.length>0){let b=0,c=0,d=0,e=0;this.buttonElements.forEach(f=>{f.addEventListener("mousedown",f=>{0===f.button&&(this.isDragging=!0,b=f.clientX,c=f.clientY,d=a.offsetLeft,e=a.offsetTop,a.style.transition="none")})}),document.addEventListener("mousemove",f=>{if(!this.isDragging)return;f.preventDefault();let g=f.clientX-b,h=f.clientY-c,i=d+g,j=e+h,k=window.innerHeight-a.offsetHeight;i<=window.innerWidth/2?(a.style.left=`${Math.max(0,i)}px`,a.style.right="auto",a.style.alignItems="flex-start",this.config.placement="bottom-left"):(a.style.right=`${Math.max(0,window.innerWidth-i-a.offsetWidth)}px`,a.style.left="auto",a.style.alignItems="flex-end",this.config.placement="bottom-right"),a.style.bottom=`${Math.min(Math.max(0,window.innerHeight-j-a.offsetHeight),k)}px`}),document.addEventListener("mouseup",()=>{this.isDragging&&(this.isDragging=!1,a.style.transition="all 0.3s ease",this.config.marginSide=parseInt("bottom-left"===this.config.placement?a.style.left:a.style.right)||20,this.config.marginBottom=parseInt(a.style.bottom||"20"))})}document.body.appendChild(a),this.bubbleContainer=a,document.addEventListener("click",()=>{this.hideContextMenu()})}createChatWindow(){if(this.window&&document.body.contains(this.window))return void e.A.debug("createChatWindow: 聊天窗口已存在，不重复创建");this.window&&!document.body.contains(this.window)&&(e.A.debug("createChatWindow: 清理已存在的 window 引用"),this.window=null),this.window=document.createElement("div");let a=window.innerWidth<=768,b=window.innerWidth,c=window.innerHeight,d=Math.min(this.config.window?.width||.9*b,.9*b),f=Math.min(this.config.window?.height||.9*c,.9*c);a?this.window.style.cssText=`
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 100vh;
        height: 100dvh;
        display: none;
        z-index: 10000;
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
        overflow: hidden;
        box-sizing: border-box;
        padding-top: env(safe-area-inset-top);
        padding-bottom: env(safe-area-inset-bottom);
        transition: all ${this.config.animation?.duration}ms ${this.config.animation?.type};
      `:this.window.style.cssText=`
        position: fixed;
        ${"bottom-right"===this.config.placement?"right":"left"}: ${this.config.marginSide}px;
        bottom: ${this.config.marginBottom}px;
        width: ${d}px;
        height: ${f}px;
        border-radius: 12px;
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
        display: none;
        overflow: hidden;
        z-index: 10000;
        transition: all ${this.config.animation?.duration}ms ${this.config.animation?.type};
      `;let g=document.createElement("iframe");g.setAttribute("allow","microphone *; camera *; autoplay *; clipboard-write *"),g.style.cssText=`
      width: 100%;
      height: 100%;
      border: none;
      display: block;
      vertical-align: bottom;
    `,g.src=this.generateChatUrl(),e.A.debug("iframe.src: ",g.src),this.window.appendChild(g),document.body.appendChild(this.window)}generateChatUrl(a="messages"){let b;e.A.debug("this.config: ",this.config,a);let c=new URLSearchParams;Object.entries(this.config.chatConfig||{}).forEach(([a,b])=>{if(null!=b&&""!==String(b).trim())if("debug"===a&&!0===b)c.append("debug","1");else if("draft"===a&&!0===b)c.append("draft","1");else if("loadHistory"===a&&!0===b)c.append("loadHistory","1");else if("goodsInfo"===a||"orderInfo"===a)try{"string"==typeof b?c.append(a,b):c.append(a,JSON.stringify(b))}catch(b){e.A.error(`Error processing ${a}:`,b)}else if("extra"===a)try{let d="string"==typeof b?JSON.parse(b):b;d.goodsInfo&&delete d.goodsInfo,d.orderInfo&&delete d.orderInfo,Object.keys(d).length>0&&c.append(a,JSON.stringify(d))}catch(a){e.A.error("Error processing extra parameter:",a)}else"debug"!==a&&"draft"!==a&&"loadHistory"!==a&&c.append(a,String(b))});let d=Object.keys(b=(a=>{if(!a)return{};let b={},c=f(a.referer)||f(a.referrer),d=f(a.title),e=f(a.url);return c&&(b.referer=c),d&&(b.title=d),e&&(b.url=e),b})(this.config.browseConfig)).length>0?JSON.stringify(b):void 0;d&&c.append("browse",d),Object.entries(this.config.theme||{}).forEach(([a,b])=>{c.append(a,String(b))}),c.append("lang",this.config.locale||"zh-cn");let g=this.getChatPageBaseUrl(),h=`${g}?${c.toString()}`;return e.A.debug("chat url: ",h),h}normalizePath(a,b="/chat"){let c=(a||"").trim();return c?c.startsWith("/")?c:`/${c}`:b}getChatPageBaseUrl(){let a=this.normalizePath(this.config.chatPath,"/chat"),b=(this.config.htmlUrl||"").trim(),c=b.replace(/\/$/,"");if(!b)return a;if(c.match(/\/(chat(?:\/thread)?|webrtc|call)\/?$/))return c.replace(/\/(chat(?:\/thread)?|webrtc|call)\/?$/,a);try{let a=new URL(b,window.location.origin);if(a.pathname&&"/"!==a.pathname)return c}catch{if(c.startsWith("/"))return c}return`${c}${a}`}setupMessageListener(){window.addEventListener("message",a=>{switch(a.data.type){case d.gT:this.hideChat();break;case d.HA:this.toggleMaximize();break;case d.Ne:this.minimizeWindow();break;case d.fF:e.A.debug("RECEIVE_MESSAGE");break;case d.Yn:e.A.debug("INVITE_VISITOR");break;case d.$n:e.A.debug("INVITE_VISITOR_ACCEPT");break;case d.ej:e.A.debug("INVITE_VISITOR_REJECT");break;case d.ky:this.handleLocalStorageData(a)}})}handleLocalStorageData(a){let{uid:b,visitorUid:c}=a.data;e.A.debug("handleLocalStorageData 被调用",b,c,a.data);let f=localStorage.getItem(d.Lc),g=localStorage.getItem(d.Gf);f===b&&g===c?e.A.debug("handleLocalStorageData: 值相同，跳过设置"):(localStorage.setItem(d.Lc,b),localStorage.setItem(d.Gf,c),e.A.debug("handleLocalStorageData: 已更新localStorage",{uid:b,visitorUid:c}),this.config.onVisitorInfo?.(b,c))}sendMessageToIframe(a){let b=this.window?.querySelector("iframe");b&&b.contentWindow&&b.contentWindow.postMessage(a,"*")}resetAnonymousVisitor(){localStorage.removeItem(d.Lc),localStorage.removeItem(d.Gf),this.sendMessageToIframe({type:d.At})}showChat(a){if(a&&(this.config={...this.config,...a},this.window&&(document.body.removeChild(this.window),this.window=null)),this.window||this.createChatWindow(),this.window){let a=window.innerWidth<=768;if(this.window.style.display="block",this.config.forceRefresh){let a=this.window.querySelector("iframe");a&&(a.src=this.generateChatUrl())}if(this.setupResizeListener(),a&&this.window&&(this.window.style.transform="translateY(100%)",requestAnimationFrame(()=>{this.window&&(this.window.style.transform="translateY(0)")})),this.isVisible=!0,this.bubble){this.bubble.style.display="none";let a=this.bubble.messageElement;a instanceof HTMLElement&&(a.style.display="none")}}this.hideInviteDialog(),this.config.onShowChat?.()}hideChat(){if(this.window){if(window.innerWidth<=768?(this.window.style.transform="translateY(100%)",setTimeout(()=>{this.window&&(this.window.style.display="none")},this.config.animation?.duration||300)):this.window.style.display="none",this.isVisible=!1,this.buttonElements.length>0){this.applyConfiguredButtonVisibility();let a=this.bubble.messageElement;a instanceof HTMLElement&&(a.style.display=this.config.bubbleConfig?.show===!1?"none":"block")}this.config.onHideChat?.()}}showThread(a){return this.showChat({...a,chatPath:this.normalizePath(a?.threadPath||this.config.threadPath,"/chat/thread")})}showWebrtc(a){return this.showChat({...a,chatPath:this.normalizePath(a?.webrtcPath||this.config.webrtcPath,"/webrtc")})}showCall(a){return this.showChat({...a,chatPath:this.normalizePath(a?.callPath||this.config.callPath,"/call")})}minimizeWindow(){this.window&&(this.windowState="minimized",this.window.style.display="none",this.hideChat())}toggleMaximize(){this.window&&window.open(this.generateChatUrl(),"_blank")}setupResizeListener(){let a,b=()=>{if(!this.window||!this.isVisible)return;let a=window.innerWidth<=768,b=window.innerWidth,c=window.innerHeight;if(a)Object.assign(this.window.style,{left:"0",bottom:"0",width:"100%",height:"100vh",borderTopLeftRadius:"12px",borderTopRightRadius:"12px",borderBottomLeftRadius:"0",borderBottomRightRadius:"0",boxSizing:"border-box",paddingTop:"env(safe-area-inset-top)",paddingBottom:"env(safe-area-inset-bottom)"}),this.window.style.height="100dvh";else{let a="maximized"===this.windowState?b:Math.min(this.config.window?.width||.9*b,.9*b),d="maximized"===this.windowState?c:Math.min(this.config.window?.height||.9*c,.9*c),e="bottom-right"===this.config.placement?this.config.marginSide:void 0,f="bottom-left"===this.config.placement?this.config.marginSide:void 0;Object.assign(this.window.style,{width:`${a}px`,height:`${d}px`,right:e?`${e}px`:"auto",left:f?`${f}px`:"auto",bottom:`${this.config.marginBottom}px`,borderRadius:"maximized"===this.windowState?"0":"12px"})}};window.addEventListener("resize",()=>{clearTimeout(a),a=window.setTimeout(b,100)}),b()}destroy(){this.isDestroyed=!0,this.stopBubbleMessageRotation(),this.stopBubbleMessageTransition(),this.destroyBubbleTicker(),this.bubbleMessageViewportElement=null,this.bubbleMessageContentElement=null,this.bubblePendingMessageElement=null,this.bubbleTickerTrackElement=null,this.bubbleTickerStyleElement=null,this.bubbleIconElement=null,this.bubbleTitleElement=null,this.bubbleSubtitleElement=null,this.bubbleMessages=[],this.bubbleMessageIndex=0,this.bubbleContainer&&document.body.contains(this.bubbleContainer)&&document.body.removeChild(this.bubbleContainer),this.hideButtonPreview(),this.bubbleContainer=null,this.bubble=null,this.buttonElements=[],this.window&&document.body.contains(this.window)&&(document.body.removeChild(this.window),this.window=null),window.removeEventListener("resize",this.setupResizeListener.bind(this)),this.loopTimer&&(window.clearTimeout(this.loopTimer),this.loopTimer=null),this.inviteDialog&&document.body.contains(this.inviteDialog)&&(document.body.removeChild(this.inviteDialog),this.inviteDialog=null),this.contextMenu&&document.body.contains(this.contextMenu)&&(document.body.removeChild(this.contextMenu),this.contextMenu=null),this.hideTimeout&&(clearTimeout(this.hideTimeout),this.hideTimeout=null),this.selectionDebounceTimer&&(clearTimeout(this.selectionDebounceTimer),this.selectionDebounceTimer=null),this.destroyFeedbackFeature()}createInviteDialog(){if(this.inviteDialog&&document.body.contains(this.inviteDialog))return void e.A.debug("createInviteDialog: 邀请框已存在，不重复创建");this.inviteDialog&&!document.body.contains(this.inviteDialog)&&(e.A.debug("createInviteDialog: 清理已存在的 inviteDialog 引用"),this.inviteDialog=null);let a=this.config.theme?.mode==="dark";if(this.inviteDialog=document.createElement("div"),this.inviteDialog.style.cssText=`
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: ${a?"#1f2937":"white"};
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 24px rgba(0, 0, 0, ${a?"0.3":"0.15"});
      z-index: 10001;
      display: none;
      max-width: 300px;
      text-align: center;
    `,this.config.inviteConfig?.icon){let b=document.createElement("div");b.style.cssText=`
        font-size: 32px;
        margin-bottom: 12px;
        color: ${a?"#e5e7eb":"#333"};
      `,b.textContent=this.config.inviteConfig.icon,this.inviteDialog.appendChild(b)}let b=document.createElement("div");b.style.cssText=`
      margin-bottom: 16px;
      color: ${a?"#e5e7eb":"#333"};
    `,b.textContent=this.config.inviteConfig?.text||"需要帮助吗？点击开始对话",this.inviteDialog.appendChild(b);let c=document.createElement("div");c.style.cssText=`
      display: flex;
      gap: 10px;
      justify-content: center;
    `;let d=document.createElement("button");d.textContent=this.config.inviteConfig?.acceptText||"开始对话";let f=this.config.theme?.backgroundColor||(a?"#3B82F6":"#0066FF");d.style.cssText=`
      padding: 8px 16px;
      background: ${f};
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    `,d.onclick=()=>{this.hideInviteDialog(),this.showChat(),this.config.inviteConfig?.onAccept?.()};let g=document.createElement("button");g.textContent=this.config.inviteConfig?.rejectText||"稍后再说",g.style.cssText=`
      padding: 8px 16px;
      background: ${a?"#374151":"#f5f5f5"};
      color: ${a?"#d1d5db":"#666"};
      border: none;
      border-radius: 4px;
      cursor: pointer;
    `,g.onclick=()=>{this.hideInviteDialog(),this.config.inviteConfig?.onReject?.(),this.handleInviteLoop()},c.appendChild(d),c.appendChild(g),this.inviteDialog.appendChild(c),document.body.appendChild(this.inviteDialog)}showInviteDialog(){this.inviteDialog&&(this.inviteDialog.style.display="block",this.config.inviteConfig?.onOpen?.())}hideInviteDialog(){e.A.debug("hideInviteDialog before"),this.inviteDialog&&(this.inviteDialog.style.display="none",this.config.inviteConfig?.onClose?.(),e.A.debug("hideInviteDialog after"))}handleInviteLoop(){let{loop:a,loopDelay:b=3e3,loopCount:c=1/0}=this.config.inviteConfig||{};a&&!(this.loopCount>=c-1)&&(this.loopTimer&&window.clearTimeout(this.loopTimer),this.loopTimer=window.setTimeout(()=>{this.loopCount++,this.showInviteDialog()},b))}showButton(){this.buttonElements.length>0&&this.buttonElements.every(a=>"none"!==a.style.display)?e.A.debug("showButton: 按钮已经显示，无需重复显示"):this.buttonElements.length>0?(this.buttonElements.forEach(a=>{a.style.display="flex"}),e.A.debug("showButton: 按钮已显示")):e.A.debug("showButton: bubble 不存在，需要先创建")}hideButton(){this.buttonElements.length>0&&this.buttonElements.forEach(a=>{a.style.display="none"})}showBubble(){if(this.bubble){let a=this.bubble.messageElement;if(a instanceof HTMLElement){if("none"!==a.style.display&&"0"!==a.style.opacity)return void e.A.debug("showBubble: 气泡已经显示，无需重复显示");a.style.display="block",setTimeout(()=>{a.style.opacity="1",a.style.transform="translateY(0)",this.startBubbleMessageRotation()},100),e.A.debug("showBubble: 气泡已显示")}else e.A.debug("showBubble: messageElement 不存在")}else e.A.debug("showBubble: bubble 不存在")}hideBubble(){if(this.bubble){let a=this.bubble.messageElement;a instanceof HTMLElement&&(this.stopBubbleMessageRotation(),this.stopBubbleMessageTransition(),a.style.opacity="0",a.style.transform="translateY(10px)",setTimeout(()=>{a.style.display="none"},300))}}createContextMenu(){this.contextMenu=document.createElement("div"),this.contextMenu.style.cssText=`
      position: fixed;
      background: white;
      border-radius: 4px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      padding: 4px 0;
      display: none;
      z-index: 10000;
      min-width: 150px;
    `;let a=[{text:"隐藏按钮和气泡",onClick:()=>{this.hideButton(),this.hideBubble()}},{text:"切换位置",onClick:()=>{this.togglePlacement()}}];a.forEach((b,c)=>{let d=document.createElement("div");if(d.style.cssText=`
        padding: 8px 16px;
        cursor: pointer;
        color: #333;
        font-size: 14px;
        
        &:hover {
          background: #f5f5f5;
        }
      `,d.textContent=b.text,d.onclick=()=>{b.onClick(),this.hideContextMenu()},this.contextMenu&&this.contextMenu.appendChild(d),c<a.length-1){let a=document.createElement("div");a.style.cssText=`
          height: 1px;
          background: #eee;
          margin: 4px 0;
        `,this.contextMenu&&this.contextMenu.appendChild(a)}}),document.body.appendChild(this.contextMenu)}showContextMenu(a){if(a.preventDefault(),this.contextMenu||this.createContextMenu(),this.contextMenu){this.contextMenu.style.visibility="hidden",this.contextMenu.style.display="block";let b=this.contextMenu.offsetWidth,c=this.contextMenu.offsetHeight,d=a.clientX,e=a.clientY;d+b>window.innerWidth&&(d-=b),e+c>window.innerHeight&&(e-=c),d=Math.max(0,d),e=Math.max(0,e),this.contextMenu.style.left=`${d}px`,this.contextMenu.style.top=`${e}px`,this.contextMenu.style.visibility="visible"}}hideContextMenu(){this.contextMenu&&(this.contextMenu.style.display="none")}togglePlacement(){if(!this.bubble)return;this.config.placement="bottom-left"===this.config.placement?"bottom-right":"bottom-left";let a=this.bubble.parentElement;a&&(a.style.left="bottom-left"===this.config.placement?`${this.config.marginSide}px`:"auto",a.style.right="bottom-right"===this.config.placement?`${this.config.marginSide}px`:"auto",a.style.alignItems="bottom-left"===this.config.placement?"flex-start":"flex-end",this.window&&this.isVisible&&(this.window.style.left="bottom-left"===this.config.placement?`${this.config.marginSide}px`:"auto",this.window.style.right="bottom-right"===this.config.placement?`${this.config.marginSide}px`:"auto"),this.config.onConfigChange?.({placement:this.config.placement}))}initFeedbackFeature(){(e.A.debug("BytedeskWeb: 初始化文档反馈功能开始"),e.A.debug("BytedeskWeb: feedbackConfig:",this.config.feedbackConfig),e.A.debug("BytedeskWeb: feedbackConfig.enabled:",this.config.feedbackConfig?.enabled),this.config.feedbackConfig?.enabled)?((this.feedbackTooltip||this.feedbackDialog)&&(e.A.debug("BytedeskWeb: 反馈功能已存在，先销毁再重新创建"),this.destroyFeedbackFeature()),"selection"===this.config.feedbackConfig.trigger||"both"===this.config.feedbackConfig.trigger?(e.A.debug("BytedeskWeb: 触发器匹配，设置文本选择监听器"),e.A.debug("BytedeskWeb: 触发器类型:",this.config.feedbackConfig.trigger),this.setupTextSelectionListener()):(e.A.debug("BytedeskWeb: 触发器不匹配，跳过文本选择监听器"),e.A.debug("BytedeskWeb: 触发器类型:",this.config.feedbackConfig.trigger)),e.A.debug("BytedeskWeb: 开始创建反馈提示框"),this.createFeedbackTooltip(),e.A.debug("BytedeskWeb: 开始创建反馈对话框"),this.createFeedbackDialog(),e.A.debug("BytedeskWeb: 文档反馈功能初始化完成"),e.A.debug("BytedeskWeb: 反馈提示框存在:",!!this.feedbackTooltip),e.A.debug("BytedeskWeb: 反馈对话框存在:",!!this.feedbackDialog)):e.A.debug("BytedeskWeb: 文档反馈功能未启用，退出初始化")}setupTextSelectionListener(){e.A.debug("BytedeskWeb: 设置文本选择监听器"),document.addEventListener("mouseup",a=>{this.lastMouseEvent=a,e.A.debug("BytedeskWeb: mouseup事件触发",a),this.handleTextSelectionWithDebounce(a)},{capture:!0,passive:!0}),document.addEventListener("selectionchange",()=>{if(!this.lastMouseEvent){e.A.debug("BytedeskWeb: selectionchange事件触发（无鼠标事件）");let a=new MouseEvent("mouseup",{clientX:window.innerWidth/2,clientY:window.innerHeight/2});this.handleTextSelectionWithDebounce(a)}}),document.addEventListener("keyup",a=>{(a.shiftKey||a.ctrlKey||a.metaKey)&&(e.A.debug("BytedeskWeb: keyup事件触发（带修饰键）",a),this.handleTextSelectionWithDebounce(a))},{capture:!0,passive:!0}),document.addEventListener("click",a=>{let b=a.target;b?.closest("[data-bytedesk-feedback]")||this.hideFeedbackTooltip()}),e.A.debug("BytedeskWeb: 文本选择监听器设置完成")}handleTextSelectionWithDebounce(a){this.config.isDebug&&e.A.debug("BytedeskWeb: handleTextSelectionWithDebounce被调用 - 防抖机制生效"),this.selectionDebounceTimer&&(clearTimeout(this.selectionDebounceTimer),this.config.isDebug&&e.A.debug("BytedeskWeb: 清除之前的防抖定时器")),this.selectionDebounceTimer=setTimeout(()=>{this.config.isDebug&&e.A.debug("BytedeskWeb: 防抖延迟结束，开始处理文本选择"),this.handleTextSelection(a)},200)}handleTextSelection(a){this.config.isDebug&&e.A.debug("BytedeskWeb: handleTextSelection被调用");let b=window.getSelection();if(this.config.isDebug&&(e.A.debug("BytedeskWeb: window.getSelection()结果:",b),e.A.debug("BytedeskWeb: selection.rangeCount:",b?.rangeCount)),!b||0===b.rangeCount){this.config.isDebug&&e.A.debug("BytedeskWeb: 没有选择或范围为0，隐藏提示"),this.hideFeedbackTooltip();return}let c=b.toString().trim();if(this.config.isDebug&&(e.A.debug("BytedeskWeb: 检测到文本选择:",`"${c}"`),e.A.debug("BytedeskWeb: 选中文本长度:",c.length)),c===this.lastSelectionText&&this.isTooltipVisible){this.config.isDebug&&e.A.debug("BytedeskWeb: 文本选择未变化且提示框已显示，跳过处理");return}if(0===c.length){this.config.isDebug&&e.A.debug("BytedeskWeb: 选中文本为空，隐藏提示"),this.hideFeedbackTooltip();return}if(c.length<3){this.config.isDebug&&e.A.debug("BytedeskWeb: 选中文本太短，忽略:",`"${c}"`),this.hideFeedbackTooltip();return}this.selectedText=c,this.lastSelectionText=c;try{let a=b.getRangeAt(0);this.lastSelectionRect=a.getBoundingClientRect(),this.config.isDebug&&e.A.debug("BytedeskWeb: 存储选中文本位置:",this.lastSelectionRect)}catch(a){this.config.isDebug&&e.A.warn("BytedeskWeb: 获取选中文本位置失败:",a),this.lastSelectionRect=null}this.config.isDebug&&e.A.debug("BytedeskWeb: 设置selectedText为:",`"${c}"`),this.config.feedbackConfig?.showOnSelection?(this.config.isDebug&&e.A.debug("BytedeskWeb: 配置允许显示选择提示，调用showFeedbackTooltip"),this.showFeedbackTooltip(this.lastMouseEvent||void 0)):this.config.isDebug&&(e.A.debug("BytedeskWeb: 配置不允许显示选择提示"),e.A.debug("BytedeskWeb: feedbackConfig.showOnSelection:",this.config.feedbackConfig?.showOnSelection))}createFeedbackTooltip(){if(this.config.isDebug&&e.A.debug("BytedeskWeb: createFeedbackTooltip被调用"),this.feedbackTooltip&&document.body.contains(this.feedbackTooltip)){this.config.isDebug&&e.A.debug("BytedeskWeb: 反馈提示框已存在且在DOM中，跳过创建");return}this.feedbackTooltip&&!document.body.contains(this.feedbackTooltip)&&(this.config.isDebug&&e.A.debug("BytedeskWeb: 提示框变量存在但不在DOM中，重置变量"),this.feedbackTooltip=null),this.feedbackTooltip=document.createElement("div"),this.feedbackTooltip.setAttribute("data-bytedesk-feedback","tooltip"),this.feedbackTooltip.style.cssText=`
      position: fixed;
      background: #2e88ff;
      color: white;
      padding: 8px 16px;
      border-radius: 6px;
      font-size: 14px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
      cursor: pointer;
      z-index: 999999;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      transform: translateY(-100%);
      margin-top: -8px;
      user-select: none;
      opacity: 0;
      transition: opacity 0.2s ease;
      display: none;
    `;let a=this.config.feedbackConfig?.selectionText||"文档反馈";this.config.isDebug&&e.A.debug("BytedeskWeb: 提示框文本:",a),this.feedbackTooltip.innerHTML=`
      <span style="margin-right: 4px;">📝</span>
      ${a}
    `,this.feedbackTooltip.addEventListener("click",async a=>{this.config.isDebug&&(e.A.debug("BytedeskWeb: 反馈提示框被点击"),e.A.debug("BytedeskWeb: 点击时选中文字:",this.selectedText)),a.stopPropagation(),a.preventDefault();try{await this.showFeedbackDialog(),this.config.isDebug&&e.A.debug("BytedeskWeb: 对话框显示完成，现在隐藏提示框"),this.hideFeedbackTooltip()}catch(a){this.config.isDebug&&e.A.error("BytedeskWeb: 显示对话框时出错:",a)}}),document.body.appendChild(this.feedbackTooltip),this.config.isDebug&&(e.A.debug("BytedeskWeb: 反馈提示框已创建并添加到页面"),e.A.debug("BytedeskWeb: 提示框元素:",this.feedbackTooltip))}showFeedbackTooltip(a){let b;this.config.isDebug&&(e.A.debug("BytedeskWeb: showFeedbackTooltip被调用"),e.A.debug("BytedeskWeb: feedbackTooltip存在:",!!this.feedbackTooltip),e.A.debug("BytedeskWeb: selectedText存在:",!!this.selectedText));let c=this.feedbackTooltip&&document.body.contains(this.feedbackTooltip);if(this.config.isDebug&&e.A.debug("BytedeskWeb: feedbackTooltip在DOM中:",c),this.feedbackTooltip&&c||(this.config.isDebug&&e.A.debug("BytedeskWeb: 提示框不存在或已从DOM中移除，重新创建"),this.createFeedbackTooltip()),!this.feedbackTooltip||!this.selectedText){this.config.isDebug&&e.A.debug("BytedeskWeb: 提示框或选中文本不存在，退出显示");return}let d=window.getSelection();if(!d||0===d.rangeCount){this.config.isDebug&&e.A.debug("BytedeskWeb: 无有效选择，无法计算位置");return}let f=d.getRangeAt(0);try{let a=document.createRange();a.setStart(f.startContainer,f.startOffset);let c=f.startOffset,d=f.startContainer.textContent||"";if(f.startContainer.nodeType===Node.TEXT_NODE){for(;c<Math.min(d.length,f.endOffset);){let b=document.createRange();b.setStart(f.startContainer,f.startOffset),b.setEnd(f.startContainer,c+1);let d=b.getBoundingClientRect(),e=a.getBoundingClientRect();if(Math.abs(d.top-e.top)>5)break;c++}a.setEnd(f.startContainer,Math.max(c,f.startOffset+1)),b=a.getBoundingClientRect()}else b=f.getBoundingClientRect()}catch(a){this.config.isDebug&&e.A.debug("BytedeskWeb: 获取第一行位置失败，使用整个选择区域:",a),b=f.getBoundingClientRect()}this.config.isDebug&&e.A.debug("BytedeskWeb: 选中文本第一行位置信息:",{left:b.left,top:b.top,right:b.right,bottom:b.bottom,width:b.width,height:b.height});let g=b.left+5,h=b.top-40-15,i=window.innerWidth,j=window.innerHeight,k=window.scrollX,l=window.scrollY;g<10&&(g=10),g+120>i-10&&(g=i-120-10),h<l+10&&(h=b.bottom+15,this.config.isDebug&&e.A.debug("BytedeskWeb: 上方空间不足，调整为显示在选中文字第一行下方")),g+=k,h+=l,this.config.isDebug&&e.A.debug("BytedeskWeb: 最终提示框位置:",{x:g,y:h,说明:"显示在选中文字第一行左上角上方，增加间距避免遮挡",verticalOffset:15,horizontalOffset:5,选中区域:b,视口信息:{viewportWidth:i,viewportHeight:j,scrollX:k,scrollY:l}}),this.feedbackTooltip.style.position="absolute",this.feedbackTooltip.style.left=g+"px",this.feedbackTooltip.style.top=h+"px",this.feedbackTooltip.style.display="block",this.feedbackTooltip.style.visibility="visible",this.feedbackTooltip.style.opacity="0",this.feedbackTooltip.style.zIndex="999999",this.config.isDebug&&e.A.debug("BytedeskWeb: 提示框位置已设置，样式:",{position:this.feedbackTooltip.style.position,left:this.feedbackTooltip.style.left,top:this.feedbackTooltip.style.top,display:this.feedbackTooltip.style.display,visibility:this.feedbackTooltip.style.visibility,opacity:this.feedbackTooltip.style.opacity,zIndex:this.feedbackTooltip.style.zIndex}),this.isTooltipVisible=!0,setTimeout(()=>{this.feedbackTooltip&&this.isTooltipVisible&&(this.feedbackTooltip.style.opacity="1",this.config.isDebug&&e.A.debug("BytedeskWeb: 提示框透明度设置为1，应该可见了"))},10)}hideFeedbackTooltip(){let a=this.feedbackTooltip&&document.body.contains(this.feedbackTooltip);if(this.config.isDebug&&(e.A.debug("BytedeskWeb: hideFeedbackTooltip被调用"),e.A.debug("BytedeskWeb: feedbackTooltip存在:",!!this.feedbackTooltip),e.A.debug("BytedeskWeb: feedbackTooltip在DOM中:",a)),!this.feedbackTooltip||!a){this.isTooltipVisible=!1,this.lastSelectionText="",this.config.isDebug&&e.A.debug("BytedeskWeb: 提示框不存在或不在DOM中，仅重置状态");return}this.isTooltipVisible=!1,this.lastSelectionText="",this.feedbackTooltip.style.opacity="0",setTimeout(()=>{this.feedbackTooltip&&document.body.contains(this.feedbackTooltip)&&!this.isTooltipVisible?(this.feedbackTooltip.style.display="none",this.feedbackTooltip.style.visibility="hidden",this.config.isDebug&&e.A.debug("BytedeskWeb: 提示框已隐藏")):this.config.isDebug&&this.isTooltipVisible&&e.A.debug("BytedeskWeb: 跳过隐藏操作，提示框状态已改变为可见")},100)}createFeedbackDialog(){if(this.config.isDebug&&e.A.debug("BytedeskWeb: createFeedbackDialog被调用"),this.feedbackDialog&&document.body.contains(this.feedbackDialog)){this.config.isDebug&&e.A.debug("BytedeskWeb: 反馈对话框已存在且在DOM中，跳过创建");return}this.feedbackDialog&&!document.body.contains(this.feedbackDialog)&&(this.config.isDebug&&e.A.debug("BytedeskWeb: 对话框变量存在但不在DOM中，重置变量"),this.feedbackDialog=null),this.feedbackDialog=document.createElement("div"),this.feedbackDialog.setAttribute("data-bytedesk-feedback","dialog"),this.feedbackDialog.style.cssText=`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1000000;
      display: none;
      justify-content: center;
      align-items: center;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
    `;let a=document.createElement("div");a.style.cssText=`
      background: white;
      border-radius: 12px;
      padding: 24px;
      width: 90%;
      max-width: 600px;
      max-height: 80vh;
      overflow-y: auto;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      position: relative;
    `,a.innerHTML=`
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h3 style="margin: 0; font-size: 18px; font-weight: 600; color: #333;">
          ${this.config.feedbackConfig?.dialogTitle||"提交意见反馈"}
        </h3>
        <button type="button" data-action="close" style="
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #999;
          line-height: 1;
          padding: 0;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
        ">\xd7</button>
      </div>
      
      <div style="margin-bottom: 16px;">
        <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #555;">选中的文字：</label>
        <div id="bytedesk-selected-text" style="
          background: #f5f5f5;
          padding: 12px;
          border-radius: 6px;
          border-left: 4px solid #2e88ff;
          font-size: 14px;
          line-height: 1.5;
          color: #333;
          max-height: 100px;
          overflow-y: auto;
        "></div>
      </div>

      ${this.config.feedbackConfig?.categoryNames&&this.config.feedbackConfig.categoryNames.length>0?`
      <div style="margin-bottom: 16px;">
        <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #333;">
          <span style="color: #ff4d4f;">*</span> ${this.config.feedbackConfig?.typesSectionTitle||"问题类型"} ${this.config.feedbackConfig?.typesDescription||"（多选）"}
        </label>
        <div id="bytedesk-feedback-types" style="
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
          margin-bottom: 8px;
        ">
          ${this.config.feedbackConfig.categoryNames.map(a=>`
            <label style="
              display: flex;
              align-items: flex-start;
              gap: 8px;
              cursor: pointer;
              padding: 8px;
              border-radius: 4px;
              transition: background-color 0.2s;
            " onmouseover="this.style.backgroundColor='#f5f5f5'" onmouseout="this.style.backgroundColor='transparent'">
              <input type="checkbox" name="feedback-type" value="${a}" style="
                margin: 2px 0 0 0;
                cursor: pointer;
              ">
              <span style="
                font-size: 14px;
                line-height: 1.4;
                color: #333;
                flex: 1;
              ">${a}</span>
            </label>
          `).join("")}
        </div>
      </div>
      `:""}

      ${this.config.feedbackConfig?.submitScreenshot!==!1?`
      <div style="margin-bottom: 16px;">
        <label style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px; font-weight: 500; color: #555;">
          <input type="checkbox" id="bytedesk-submit-screenshot" checked style="cursor: pointer;">
          提交截图内容
        </label>
        <div id="bytedesk-screenshot-container" style="
          border: 2px dashed #ddd;
          border-radius: 6px;
          padding: 20px;
          text-align: center;
          color: #999;
          min-height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 8px;
        ">
          <div style="font-size: 24px;">📷</div>
          <div>正在生成截图预览...</div>
          <div style="font-size: 12px; color: #666;">截图将在提交时上传到服务器</div>
        </div>
      </div>
      `:""}

      <div style="margin-bottom: 20px;">
        <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #333;">
          <span style="color: #ff4d4f;">*</span> 问题描述
        </label>
        <textarea id="bytedesk-feedback-text" placeholder="${this.config.feedbackConfig?.placeholder||"请详细描述您的问题或优化建议"}" style="
          width: 100%;
          min-height: 120px;
          padding: 12px;
          border: 1px solid #ddd;
          border-radius: 6px;
          font-size: 14px;
          font-family: inherit;
          resize: vertical;
          box-sizing: border-box;
        "></textarea>
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 12px;">
        <button type="button" data-action="cancel" style="
          background: #f5f5f5;
          color: #666;
          border: 1px solid #ddd;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          font-family: inherit;
        ">${this.config.feedbackConfig?.cancelText||"取消"}</button>
        <button type="button" data-action="submit" style="
          background: #2e88ff;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          font-family: inherit;
        ">${this.config.feedbackConfig?.submitText||"提交反馈"}</button>
      </div>

      <div style="margin-top: 12px; text-align: center; font-size: 12px; color: #999;">
        <a href="https://www.weiyuai.cn/" target="_blank" rel="noopener noreferrer" style="color: #aaaaaa; text-decoration: none;">
           微语技术支持
        </a>
      </div>
    `,a.addEventListener("click",a=>{switch(a.target.getAttribute("data-action")){case"close":case"cancel":this.hideFeedbackDialog(),this.config.feedbackConfig?.onCancel?.();break;case"submit":this.submitFeedback()}}),this.feedbackDialog.appendChild(a),this.feedbackDialog.addEventListener("click",a=>{a.target===this.feedbackDialog&&(this.hideFeedbackDialog(),this.config.feedbackConfig?.onCancel?.())}),document.addEventListener("keydown",a=>{"Escape"===a.key&&this.feedbackDialog?.style.display==="flex"&&(this.hideFeedbackDialog(),this.config.feedbackConfig?.onCancel?.())}),document.body.appendChild(this.feedbackDialog)}async showFeedbackDialog(){this.config.isDebug&&(e.A.debug("BytedeskWeb: showFeedbackDialog被调用"),e.A.debug("BytedeskWeb: feedbackDialog存在:",!!this.feedbackDialog));let a=this.feedbackDialog&&document.body.contains(this.feedbackDialog);if(this.config.isDebug&&e.A.debug("BytedeskWeb: feedbackDialog在DOM中:",a),this.feedbackDialog&&a||(this.config.isDebug&&e.A.debug("BytedeskWeb: 对话框不存在或已从DOM中移除，重新创建"),this.createFeedbackDialog()),!this.feedbackDialog){this.config.isDebug&&e.A.debug("BytedeskWeb: 对话框创建失败，退出显示");return}this.config.isDebug&&e.A.debug("BytedeskWeb: 开始填充对话框内容");let b=this.feedbackDialog.querySelector("#bytedesk-selected-text");b&&(b.textContent=this.selectedText||"",this.config.isDebug&&e.A.debug("BytedeskWeb: 已填充选中文字:",this.selectedText));let c=this.feedbackDialog.querySelector("#bytedesk-feedback-text");c&&(c.value=""),this.feedbackDialog.style.display="flex",this.config.isDebug&&(e.A.debug("BytedeskWeb: 对话框已设置为显示状态"),e.A.debug("BytedeskWeb: 对话框样式:",{display:this.feedbackDialog.style.display,visibility:this.feedbackDialog.style.visibility,zIndex:this.feedbackDialog.style.zIndex}));try{await this.generateScreenshotPreview(),this.config.isDebug&&e.A.debug("BytedeskWeb: 截图预览生成完成")}catch(a){this.config.isDebug&&e.A.error("BytedeskWeb: 截图预览生成失败:",a)}}hideFeedbackDialog(){this.feedbackDialog&&(this.feedbackDialog.style.display="none")}async generateAndUploadScreenshot(){try{let a,b=this.feedbackDialog?.screenshotCanvas;if(b)this.config.isDebug&&e.A.debug("BytedeskWeb: 使用已生成的截图canvas"),a=b;else{let b=await this.loadHtml2Canvas();if(!b)return this.config.isDebug&&e.A.debug("BytedeskWeb: html2canvas加载失败，跳过截图"),null;this.config.isDebug&&e.A.debug("BytedeskWeb: 重新生成截图");let c=this.calculateScreenshotArea();a=await b(document.body,{height:c.height,width:c.width,x:c.x,y:c.y,useCORS:!0,allowTaint:!0,backgroundColor:"#ffffff",scale:1,ignoreElements:a=>a.hasAttribute("data-bytedesk-feedback")||null!==a.closest("[data-bytedesk-feedback]")})}return new Promise(b=>{a.toBlob(async a=>{if(!a){e.A.error("无法生成截图blob"),b(null);return}try{let d=`screenshot_${Date.now()}.jpg`,f=new File([a],d,{type:"image/jpeg"});this.config.isDebug&&e.A.debug("BytedeskWeb: 截图生成成功，文件大小:",Math.round(a.size/1024),"KB");let{uploadScreenshot:g}=await Promise.all([c.e(731),c.e(719)]).then(c.bind(c,9719)),h=await g(f,{orgUid:this.config.chatConfig?.org||"",isDebug:this.config.isDebug});this.config.isDebug&&e.A.debug("BytedeskWeb: 截图上传成功，URL:",h),b(h)}catch(a){e.A.error("截图上传失败:",a),b(null)}},"image/jpeg",.8)})}catch(a){return e.A.error("生成截图失败:",a),null}}async generateScreenshotPreview(){let a=this.feedbackDialog?.querySelector("#bytedesk-screenshot-container");if(a)try{let b=await this.loadHtml2Canvas();if(!b){a.innerHTML=`
          <div style="color: #999; text-align: center; padding: 20px; flex-direction: column; gap: 8px; display: flex; align-items: center;">
            <div style="font-size: 24px;">📷</div>
            <div>截图功能暂时不可用</div>
            <div style="font-size: 12px; color: #666;">网络连接问题或资源加载失败</div>
          </div>
        `;return}a.innerHTML="正在生成截图预览...",this.config.isDebug&&e.A.debug("BytedeskWeb: 开始生成截图预览");let c=this.calculateScreenshotArea(),d=await b(document.body,{height:c.height,width:c.width,x:c.x,y:c.y,useCORS:!0,allowTaint:!0,backgroundColor:"#ffffff",scale:1,ignoreElements:a=>a.hasAttribute("data-bytedesk-feedback")||null!==a.closest("[data-bytedesk-feedback]")}),f=document.createElement("img");f.src=d.toDataURL("image/jpeg",.8),f.style.cssText=`
        max-width: 100%;
        max-height: 200px;
        border-radius: 4px;
        border: 1px solid #ddd;
        cursor: pointer;
      `,f.onclick=()=>{let a=document.createElement("img");a.src=f.src,a.style.cssText=`
          max-width: 90vw;
          max-height: 90vh;
          border-radius: 8px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        `;let b=document.createElement("div");b.style.cssText=`
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0,0,0,0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000001;
          cursor: pointer;
        `;let c=document.createElement("div");c.style.cssText=`
          position: absolute;
          top: 20px;
          right: 20px;
          color: white;
          font-size: 14px;
          background: rgba(0,0,0,0.6);
          padding: 8px 12px;
          border-radius: 4px;
          user-select: none;
        `,c.textContent="点击任意位置关闭",b.appendChild(c),b.appendChild(a),b.onclick=()=>document.body.removeChild(b),document.body.appendChild(b)};let g=document.createElement("div");g.style.cssText=`
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
      `,g.appendChild(f);let h=document.createElement("div");h.style.cssText=`
        font-size: 12px;
        color: #666;
        text-align: center;
      `,h.innerHTML="点击图片可放大查看<br/>提交时将自动上传此截图",g.appendChild(h),a.innerHTML="",a.appendChild(g),this.feedbackDialog.screenshotCanvas=d,this.config.isDebug&&e.A.debug("BytedeskWeb: 截图预览生成成功")}catch(b){e.A.error("生成截图预览失败:",b),a.innerHTML=`
        <div style="color: #ff6b6b; text-align: center; flex-direction: column; gap: 8px; display: flex; align-items: center;">
          <div style="font-size: 24px;">⚠️</div>
          <div>截图预览生成失败</div>
          <div style="font-size: 12px; margin-top: 4px; color: #999;">请检查页面权限或网络连接</div>
        </div>
      `}}calculateScreenshotArea(){let a={height:window.innerHeight,width:window.innerWidth,x:0,y:0,scrollX:0,scrollY:0};try{let b=this.lastSelectionRect;if(!b){let a=window.getSelection();a&&a.rangeCount>0&&(b=a.getRangeAt(0).getBoundingClientRect())}if(b&&b.width>0&&b.height>0){let c=window.pageXOffset||document.documentElement.scrollLeft,d=window.pageYOffset||document.documentElement.scrollTop,f=b.left+c,g=b.top+d,h=Math.min(800,window.innerWidth),i=Math.min(600,window.innerHeight),j=f-h/2,k=g-i/2,l=document.documentElement.scrollWidth,m=document.documentElement.scrollHeight;j=Math.max(0,Math.min(j,l-h)),k=Math.max(0,Math.min(k,m-i)),a={height:i,width:h,x:j,y:k,scrollX:0,scrollY:0},this.config.isDebug&&e.A.debug("BytedeskWeb: 选中文本截图区域:",{selectedRect:b,absolutePosition:{left:f,top:g},captureArea:{x:j,y:k,width:h,height:i},pageSize:{width:l,height:m}})}else if(this.lastMouseEvent){let b=window.pageXOffset||document.documentElement.scrollLeft,c=window.pageYOffset||document.documentElement.scrollTop,d=this.lastMouseEvent.clientX+b,f=this.lastMouseEvent.clientY+c,g=Math.min(800,window.innerWidth),h=Math.min(600,window.innerHeight),i=d-g/2,j=f-h/2,k=document.documentElement.scrollWidth,l=document.documentElement.scrollHeight;i=Math.max(0,Math.min(i,k-g)),j=Math.max(0,Math.min(j,l-h)),a={height:h,width:g,x:i,y:j,scrollX:0,scrollY:0},this.config.isDebug&&e.A.debug("BytedeskWeb: 鼠标位置截图区域:",{mousePosition:{x:this.lastMouseEvent.clientX,y:this.lastMouseEvent.clientY},absolutePosition:{x:d,y:f},captureArea:{x:i,y:j,width:g,height:h}})}}catch(a){this.config.isDebug&&e.A.warn("BytedeskWeb: 计算截图区域失败，使用默认区域:",a)}return a}async loadHtml2Canvas(){try{if(window.html2canvas)return window.html2canvas;return await this.loadHtml2CanvasFromCDN()}catch(a){return this.config.isDebug&&e.A.warn("html2canvas 加载失败:",a),null}}async loadHtml2CanvasFromCDN(){return new Promise((a,b)=>{if(window.html2canvas)return void a(window.html2canvas);let c=document.createElement("script");c.src=this.config.apiUrl+"/assets/js/html2canvas.min.js",c.onload=()=>{window.html2canvas?a(window.html2canvas):b(Error("html2canvas 加载失败"))},c.onerror=()=>{b(Error("无法从CDN加载html2canvas"))},document.head.appendChild(c)})}async submitFeedback(){let a=this.feedbackDialog?.querySelector("#bytedesk-feedback-text"),b=a?.value.trim()||"";if(!b){alert("请填写反馈内容"),a?.focus();return}let c=[],d=this.feedbackDialog?.querySelectorAll('input[name="feedback-type"]:checked');if(d&&d.forEach(a=>{c.push(a.value)}),this.config.feedbackConfig?.requiredTypes&&0===c.length)return void alert("请至少选择一个问题类型");let f=this.feedbackDialog?.querySelector(".bytedesk-feedback-submit"),g=f?.textContent||"提交反馈";f&&(f.disabled=!0,f.textContent="提交中...",f.style.opacity="0.6");try{let a=this.feedbackDialog?.querySelector("#bytedesk-submit-screenshot"),d=a?.checked!==!1,g=[];if(d){this.config.isDebug&&e.A.debug("BytedeskWeb: 开始生成和上传截图"),f&&(f.textContent="正在生成截图...");let a=await this.generateAndUploadScreenshot();a&&(g.push(a),this.config.isDebug&&e.A.debug("BytedeskWeb: 截图上传成功:",a)),f&&(f.textContent="正在提交反馈...")}let h={selectedText:this.selectedText,...g.length>0&&{images:g},content:b,url:window.location.href,title:document.title,userAgent:navigator.userAgent,visitorUid:localStorage.getItem("bytedesk_uid")||"",orgUid:this.config.chatConfig?.org||"",...c.length>0&&{categoryNames:c.join(",")}};this.config.feedbackConfig?.onSubmit?this.config.feedbackConfig.onSubmit(h):await this.submitFeedbackToServer(h),this.showFeedbackSuccess(),setTimeout(()=>{this.hideFeedbackDialog()},2e3)}catch(a){e.A.error("提交反馈失败:",a),alert("提交失败，请稍后重试")}finally{f&&(f.disabled=!1,f.textContent=g,f.style.opacity="1")}}async submitFeedbackToServer(a){try{let{submitFeedback:b}=await Promise.all([c.e(731),c.e(165)]).then(c.bind(c,9165)),d=await b(a);return this.config.isDebug&&e.A.debug("反馈提交响应:",d),d}catch(a){throw e.A.error("提交反馈到服务器失败:",a),a}}showFeedbackSuccess(){if(!this.feedbackDialog)return;let a=this.feedbackDialog.querySelector("div > div");a&&(a.innerHTML=`
      <div style="text-align: center; padding: 40px 20px;">
        <div style="font-size: 48px; margin-bottom: 16px;">✅</div>
        <h3 style="margin: 0 0 12px 0; color: #28a745;">
          ${this.config.feedbackConfig?.successMessage||"反馈已提交，感谢您的意见！"}
        </h3>
        <div style="color: #666; font-size: 14px;">
          我们会认真处理您的反馈，不断改进产品体验
        </div>
      </div>
    `)}showDocumentFeedback(a){this.config.feedbackConfig?.enabled?(a&&(this.selectedText=a),this.showFeedbackDialog()):e.A.warn("文档反馈功能未启用")}reinitFeedbackFeature(){this.config.isDebug&&e.A.debug("BytedeskWeb: 重新初始化反馈功能"),this.destroyFeedbackFeature(),this.initFeedbackFeature()}forceInitFeedbackFeature(){return e.A.debug("BytedeskWeb: 强制初始化反馈功能被调用"),e.A.debug("BytedeskWeb: 当前配置:",this.config.feedbackConfig),e.A.debug("BytedeskWeb: isDebug:",this.config.isDebug),this.config.feedbackConfig||(e.A.debug("BytedeskWeb: 创建默认反馈配置"),this.config.feedbackConfig={enabled:!0,trigger:"selection",showOnSelection:!0,selectionText:"\uD83D\uDCDD 文档反馈",dialogTitle:"提交意见反馈",placeholder:"请详细描述您发现的问题、改进建议或其他意见...",submitText:"提交反馈",cancelText:"取消",successMessage:"感谢您的反馈！我们会认真处理您的意见。"}),this.config.feedbackConfig.enabled||(e.A.debug("BytedeskWeb: 启用反馈配置"),this.config.feedbackConfig.enabled=!0),e.A.debug("BytedeskWeb: 销毁现有反馈功能"),this.destroyFeedbackFeature(),e.A.debug("BytedeskWeb: 重新初始化反馈功能"),this.initFeedbackFeature(),e.A.debug("BytedeskWeb: 强制初始化完成，检查结果:"),e.A.debug("- showDocumentFeedback方法存在:","function"==typeof this.showDocumentFeedback),e.A.debug("- testTextSelection方法存在:","function"==typeof this.testTextSelection),e.A.debug("- 反馈提示框存在:",!!this.feedbackTooltip),e.A.debug("- 反馈对话框存在:",!!this.feedbackDialog),e.A.debug("- 反馈提示框DOM存在:",!!document.querySelector('[data-bytedesk-feedback="tooltip"]')),e.A.debug("- 反馈对话框DOM存在:",!!document.querySelector('[data-bytedesk-feedback="dialog"]')),{success:!!(this.feedbackTooltip&&this.feedbackDialog),methods:{showDocumentFeedback:"function"==typeof this.showDocumentFeedback,testTextSelection:"function"==typeof this.testTextSelection},elements:{tooltip:!!this.feedbackTooltip,dialog:!!this.feedbackDialog,tooltipDOM:!!document.querySelector('[data-bytedesk-feedback="tooltip"]'),dialogDOM:!!document.querySelector('[data-bytedesk-feedback="dialog"]')}}}testTextSelection(a="测试选中文字"){this.config.isDebug&&e.A.debug("BytedeskWeb: 测试文本选择功能，模拟选中文字:",`"${a}"`),this.selectedText=a;try{let b=document.createElement("div");b.textContent=a,b.style.cssText=`
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        padding: 20px;
        background: #f0f0f0;
        border: 2px dashed #ccc;
        border-radius: 8px;
        font-size: 16px;
        z-index: 1000;
        pointer-events: none;
      `,document.body.appendChild(b);let c=document.createRange();c.selectNodeContents(b);let d=window.getSelection();d&&(d.removeAllRanges(),d.addRange(c),this.config.isDebug&&e.A.debug("BytedeskWeb: 已创建模拟文本选择"),this.feedbackTooltip?this.showFeedbackTooltip():e.A.error("BytedeskWeb: 反馈提示框不存在，无法测试"),setTimeout(()=>{d&&d.removeAllRanges(),document.body.contains(b)&&document.body.removeChild(b),this.hideFeedbackTooltip()},5e3))}catch(a){e.A.error("BytedeskWeb: 创建测试选择失败:",a)}}getDebugInfo(){return{config:this.config,feedbackConfig:this.config.feedbackConfig,feedbackTooltip:!!this.feedbackTooltip,feedbackDialog:!!this.feedbackDialog,selectedText:this.selectedText,methods:{showDocumentFeedback:typeof this.showDocumentFeedback,testTextSelection:typeof this.testTextSelection,forceInitFeedbackFeature:typeof this.forceInitFeedbackFeature}}}destroyFeedbackFeature(){this.feedbackTooltip&&(this.feedbackTooltip.remove(),this.feedbackTooltip=null),this.feedbackDialog&&(this.feedbackDialog.remove(),this.feedbackDialog=null),this.selectedText=""}}let h=g}};