"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[399],{7399:(e,t,i)=>{i.r(t),i.d(t,{default:()=>l});var n=i(8357),s=i(9348);let o=e=>{if("string"==typeof e)return e.trim()||void 0};class a{constructor(e){this.unreadBadgeMode="hidden",this.unreadBadgeCount=0,this.bubble=null,this.bubbleContainer=null,this.buttonElements=[],this.buttonPreviewElement=null,this.buttonPreviewHideTimer=null,this.window=null,this.inviteDialog=null,this.contextMenu=null,this.hideTimeout=null,this.isVisible=!1,this.isDragging=!1,this.windowState="normal",this.loopCount=0,this.loopTimer=null,this.isDestroyed=!1,this.initVisitorPromise=null,this.getUnreadMessageCountPromise=null,this.clearUnreadMessagesPromise=null,this.feedbackTooltip=null,this.feedbackDialog=null,this.selectedText="",this.selectionDebounceTimer=null,this.isTooltipVisible=!1,this.lastSelectionText="",this.lastMouseEvent=null,this.lastSelectionRect=null,this.bubbleMessages=[],this.bubbleMessageIndex=0,this.bubbleMessageTimer=null,this.bubbleMessageTransitionTimer=null,this.bubbleMessageViewportElement=null,this.bubbleMessageContentElement=null,this.bubblePendingMessageElement=null,this.bubbleTickerTrackElement=null,this.bubbleTickerStyleElement=null,this.bubbleIconElement=null,this.bubbleTitleElement=null,this.bubbleSubtitleElement=null,this.config={...this.getDefaultConfig(),...e},(0,s.e)(this.config),this.setupApiUrl()}async setupApiUrl(){try{let{setApiUrl:e}=await Promise.all([i.e(384),i.e(318)]).then(i.bind(i,6318)),t=this.config.apiUrl||"https://api.weiyuai.cn";e(t),s.A.info("API URL 已设置为:",t)}catch(e){s.A.error("设置API URL时出错:",e)}}mergeConfig(e){return{...this.config,...e,inviteConfig:{...this.config.inviteConfig||{},...e.inviteConfig||{}},tabsConfig:{...this.config.tabsConfig||{},...e.tabsConfig||{}},bubbleConfig:{...this.config.bubbleConfig||{},...e.bubbleConfig||{}},buttonConfig:{...this.config.buttonConfig||{},...e.buttonConfig||{}},feedbackConfig:{...this.config.feedbackConfig||{},...e.feedbackConfig||{}},chatConfig:e.chatConfig?{...this.config.chatConfig||{},...e.chatConfig}:this.config.chatConfig,browseConfig:{...this.config.browseConfig||{},...e.browseConfig||{}},animation:{...this.config.animation||{},...e.animation||{}},window:{...this.config.window||{},...e.window||{}},theme:{...this.config.theme||{},...e.theme||{}},buttonsConfig:e.buttonsConfig??this.config.buttonsConfig}}refreshFloatingUi(){let e=!!(this.inviteDialog&&document.body.contains(this.inviteDialog)&&"none"!==this.inviteDialog.style.display);this.stopBubbleMessageRotation(),this.stopBubbleMessageTransition(),this.destroyBubbleTicker(),this.hideButtonPreview(),this.bubbleContainer&&document.body.contains(this.bubbleContainer)&&this.bubbleContainer.remove(),this.bubbleContainer=null,this.bubble=null,this.buttonElements=[],this.bubbleMessageViewportElement=null,this.bubbleMessageContentElement=null,this.bubblePendingMessageElement=null,this.bubbleTickerTrackElement=null,this.bubbleTickerStyleElement=null,this.bubbleIconElement=null,this.bubbleTitleElement=null,this.bubbleSubtitleElement=null,this.bubbleMessages=[],this.bubbleMessageIndex=0,this.inviteDialog&&document.body.contains(this.inviteDialog)&&this.inviteDialog.remove(),this.inviteDialog=null,this.createBubble(),this.createInviteDialog(),e&&this.showInviteDialog()}updateChatWindowLayout(){if(!this.window)return;let e=window.innerWidth<=768,t=window.innerWidth,i=window.innerHeight;if(e){Object.assign(this.window.style,{left:"0",right:"auto",bottom:"0",width:"100%",height:"100vh",borderTopLeftRadius:"12px",borderTopRightRadius:"12px",borderBottomLeftRadius:"0",borderBottomRightRadius:"0",boxSizing:"border-box",paddingTop:"env(safe-area-inset-top)",paddingBottom:"env(safe-area-inset-bottom)"}),this.window.style.height="100dvh";return}let n=Math.min(this.config.window?.width||.9*t,.9*t),s=Math.min(this.config.window?.height||.9*i,.9*i);Object.assign(this.window.style,{width:`${n}px`,height:`${s}px`,left:"bottom-left"===this.config.placement?`${this.config.marginSide}px`:"auto",right:"bottom-right"===this.config.placement?`${this.config.marginSide}px`:"auto",bottom:`${this.config.marginBottom}px`,borderRadius:"12px",boxSizing:"border-box",paddingTop:"",paddingBottom:""})}refreshChatIframeUrl(){if(!this.window)return;let e=this.window.querySelector("iframe");e&&(e.src=this.generateChatUrl())}setTheme(e){this.setConfig({theme:{...this.config.theme||{},...e}})}setConfig(e){let t=this.config;this.config=this.mergeConfig(e);let i=this.getPrimaryActionFromConfig(e),n=Object.prototype.hasOwnProperty.call(e,"chatPath"),o=Object.prototype.hasOwnProperty.call(e,"buttonConfig");!n&&(i?this.syncChatPathByAction(i):o&&this.syncChatPathByAction("chat")),(0,s.e)(this.config),e.apiUrl&&e.apiUrl!==t.apiUrl&&this.setupApiUrl(),(this.bubbleContainer&&document.body.contains(this.bubbleContainer)||this.inviteDialog&&document.body.contains(this.inviteDialog))&&this.refreshFloatingUi(),this.window&&document.body.contains(this.window)&&(this.updateChatWindowLayout(),(e.theme||e.locale||e.chatConfig||e.htmlUrl||e.chatPath||e.threadPath||e.webrtcPath||e.callPath)&&this.refreshChatIframeUrl()),this.config.onConfigChange?.(this.config)}getPrimaryActionFromConfig(e){let t=e.buttonConfig?.action;return t&&["chat","thread","webrtc","call"].includes(t)?t:null}syncChatPathByAction(e){switch(e){case"thread":this.config.chatPath=this.normalizePath(this.config.threadPath,"/chat/thread");break;case"webrtc":this.config.chatPath=this.normalizePath(this.config.webrtcPath,"/webrtc");break;case"call":this.config.chatPath=this.normalizePath(this.config.callPath,"/call");break;default:this.config.chatPath="/chat"}}getDefaultConfig(){return{isDebug:!1,forceRefresh:!1,htmlUrl:"https://cdn.weiyuai.cn",apiUrl:"https://api.weiyuai.cn",chatPath:"/chat",threadPath:"/chat/thread",webrtcPath:"/webrtc",callPath:"/call",placement:"bottom-right",marginBottom:20,marginSide:20,autoPopup:!1,inviteConfig:{show:!1,text:"邀请您加入对话",acceptText:"开始对话",rejectText:"稍后再说"},tabsConfig:{home:!1,messages:!0,help:!1,news:!1},bubbleConfig:{show:!0,icon:"\uD83D\uDC4B",title:"需要帮助吗？",subtitle:"点击开始对话"},buttonConfig:{show:!0,width:60,height:60,onClick:()=>{this.showChat()}},feedbackConfig:{enabled:!1,trigger:"selection",showOnSelection:!0,selectionText:"文档反馈",buttonText:"文档反馈",dialogTitle:"提交意见反馈",placeholder:"请描述您的问题或优化建议",submitText:"提交反馈",cancelText:"取消",successMessage:"反馈已提交，感谢您的意见！",categoryNames:["错别字、拼写错误","链接跳转有问题","文档和实操过程不一致","文档难以理解","建议或其他"],requiredTypes:!1,typesSectionTitle:"问题类型",typesDescription:"（多选）",submitScreenshot:!0},chatConfig:{org:"df_org_uid",t:"2",sid:"df_rt_uid"},animation:{enabled:!0,duration:300,type:"ease"},theme:{mode:"system",textColor:"#ffffff",backgroundColor:"#0066FF"},window:{width:380,height:640},draggable:!1,locale:"zh-cn"}}getEffectiveButtonConfigs(){let e=Array.isArray(this.config.buttonsConfig)?this.config.buttonsConfig.filter(e=>!!e):[];return e.length>0?e:[this.config.buttonConfig||{}]}hasVisibleButtons(){return this.getEffectiveButtonConfigs().some(e=>!1!==e.show)}isMultiButtonLayout(e){return(e||this.getEffectiveButtonConfigs()).filter(e=>!1!==e.show).length>1}applyConfiguredButtonVisibility(){let e=this.getEffectiveButtonConfigs();this.buttonElements.forEach((t,i)=>{let n=e[i];t.style.display=n?.show===!1?"none":"flex"})}hideBubbleMessageElement(){let e=this.bubble?.messageElement;e instanceof HTMLElement&&(this.stopBubbleMessageTransition(),e.style.display="none",this.stopBubbleMessageRotation())}triggerButtonAction(e){if(e.onClick)return void e.onClick();switch(e.action){case"thread":this.showThread();break;case"webrtc":this.showWebrtc();break;case"call":this.showCall();break;default:this.showChat()}}hideButtonPreview(){this.buttonPreviewHideTimer&&(window.clearTimeout(this.buttonPreviewHideTimer),this.buttonPreviewHideTimer=null),this.buttonPreviewElement?.parentElement&&this.buttonPreviewElement.parentElement.removeChild(this.buttonPreviewElement),this.buttonPreviewElement=null}cancelButtonPreviewHide(){this.buttonPreviewHideTimer&&(window.clearTimeout(this.buttonPreviewHideTimer),this.buttonPreviewHideTimer=null)}scheduleHideButtonPreview(){this.cancelButtonPreviewHide(),this.buttonPreviewHideTimer=window.setTimeout(()=>{this.hideButtonPreview()},120)}showButtonPreview(e,t){if(!t.previewImageUrl)return void this.hideButtonPreview();this.hideButtonPreview();let i=document.createElement("div"),n=this.config.theme?.mode==="dark",s=document.createElement("img"),o=document.createElement("div"),a=e.getBoundingClientRect(),l=Math.min(Math.max(12,a.top+a.height/2-110),Math.max(12,window.innerHeight-232)),d="bottom-left"===this.config.placement?Math.min(window.innerWidth-180-12,a.right+14):Math.max(12,a.left-180-14);i.style.cssText=`
      position: fixed;
      top: ${l}px;
      left: ${d}px;
      width: 180px;
      padding: 10px;
      border-radius: 16px;
      background: ${n?"rgba(17, 24, 39, 0.96)":"rgba(255, 255, 255, 0.98)"};
      box-shadow: 0 12px 32px rgba(0, 0, 0, ${n?"0.34":"0.18"});
      border: 1px solid ${n?"rgba(255,255,255,0.08)":"rgba(15,23,42,0.08)"};
      z-index: 10001;
      pointer-events: auto;
      display: flex;
      flex-direction: column;
      gap: 8px;
      cursor: pointer;
    `,s.src=t.previewImageUrl,s.alt=t.previewImageAlt||t.text||"preview image",s.style.cssText=`
      width: 100%;
      aspect-ratio: 1 / 1;
      object-fit: contain;
      background: white;
      border-radius: 12px;
      display: block;
    `,o.textContent=t.previewImageAlt||t.text||"",o.style.cssText=`
      color: ${n?"#e5e7eb":"#0f172a"};
      font-size: 12px;
      line-height: 1.4;
      text-align: center;
      word-break: break-word;
    `,i.appendChild(s),o.textContent&&i.appendChild(o),i.addEventListener("mouseenter",()=>{this.cancelButtonPreviewHide()}),i.addEventListener("mouseleave",()=>{this.scheduleHideButtonPreview()}),i.addEventListener("click",()=>{window.open(t.previewImageUrl,"_blank","noopener,noreferrer")}),document.body.appendChild(i),this.buttonPreviewElement=i}createButtonElement(e,t,i){let n=document.createElement("button"),o=i?.isMultiLayout===!0,a=e.width||60,l=e.height||60,d=Math.max(a,l),r=o?d:a,h=o?d:l,b=o?0:Math.min(r,h)/2,c=this.config.theme?.mode==="dark",g=this.config.theme?.backgroundColor||(c?"#3B82F6":"#0066FF"),u=this.config.theme?.textColor||"#ffffff",f=o?"none":`0 4px 16px rgba(0, 0, 0, ${c?"0.3":"0.12"})`,m=o&&!i?.isLastButton?`1px solid rgba(255, 255, 255, ${c?"0.14":"0.28"})`:"none",p=o?"translateY(-1px)":"scale(1.1)";n.style.cssText=`
      background-color: ${o?"transparent":g};
      width: ${r}px;
      height: ${h}px;
      border-radius: ${b}px;
      border: none;
      border-bottom: ${m};
      cursor: ${this.config.draggable?"move":"pointer"};
      display: ${!1===e.show?"none":"flex"};
      align-items: center;
      justify-content: center;
      box-shadow: ${f};
      transition: all 0.3s ease;
      outline: none;
      position: relative;
      user-select: none;
      padding: 0;
    `;let y=document.createElement("div");if(y.style.cssText=`
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: ${o&&e.text?"column":"row"};
      gap: ${o?"4px":"8px"};
      width: 100%;
      height: 100%;
    `,e.icon){let t=document.createElement("span");t.textContent=e.icon,t.style.fontSize=`${h*(o?.34:.4)}px`,t.style.lineHeight="1",y.appendChild(t)}else{let e=document.createElement("div");e.innerHTML=`
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.663 3.04094 17.0829 4.73812 18.875L2.72681 21.1705C2.44361 21.4937 2.67314 22 3.10288 22H12Z" fill="white"/>
        </svg>
      `,y.appendChild(e)}if(e.text){let t=document.createElement("span");t.textContent=e.text,t.style.cssText=`
        color: ${u};
        font-size: ${h*(o?.16:.25)}px;
        white-space: nowrap;
        line-height: 1.1;
        text-align: center;
        max-width: ${o?`${r-8}px`:"none"};
        overflow: hidden;
        text-overflow: ellipsis;
      `,y.appendChild(t)}return n.appendChild(y),n.addEventListener("mouseenter",()=>{this.cancelButtonPreviewHide(),n.style.transform=p,o&&(n.style.backgroundColor="rgba(255, 255, 255, 0.12)"),e.previewImageUrl&&this.showButtonPreview(n,e)}),n.addEventListener("mouseleave",()=>{n.style.transform="scale(1)",o&&(n.style.backgroundColor="transparent"),e.previewImageUrl&&this.scheduleHideButtonPreview()}),n.addEventListener("click",()=>{this.isDragging||(s.A.debug("bubble click",e.action||"chat"),t instanceof HTMLElement&&this.hideBubbleMessageElement(),this.triggerButtonAction(e))}),n.addEventListener("contextmenu",e=>{this.showContextMenu(e)}),n.messageElement=t,n}async init(){if(this.isDestroyed)return void s.A.warn("BytedeskWeb 已销毁，跳过初始化");let e=this.hasVisibleButtons();if(await this._initVisitor(),this.isDestroyed)return;if(e){if(await this._browseVisitor(),this.isDestroyed)return}else s.A.debug("buttonConfig.show=false，跳过自动发送浏览记录");if(this.createBubble(),!this.isDestroyed&&(this.createInviteDialog(),!this.isDestroyed)){if(this.setupMessageListener(),this.setupResizeListener(),!this.isDestroyed){if(this.config.feedbackConfig?.enabled&&(this.config.isDebug&&s.A.debug("BytedeskWeb: 开始初始化文档反馈功能，document.readyState:",document.readyState),this.initFeedbackFeature(),"complete"!==document.readyState)){this.config.isDebug&&s.A.debug("BytedeskWeb: DOM未完全加载，设置备用初始化");let e=()=>{this.config.isDebug&&s.A.debug("BytedeskWeb: window load事件触发，重新初始化反馈功能"),this.initFeedbackFeature(),window.removeEventListener("load",e)};window.addEventListener("load",e);let t=()=>{this.config.isDebug&&s.A.debug("BytedeskWeb: DOMContentLoaded事件触发，重新初始化反馈功能"),setTimeout(()=>this.initFeedbackFeature(),100),document.removeEventListener("DOMContentLoaded",t)};"loading"===document.readyState&&document.addEventListener("DOMContentLoaded",t)}if(e){if(this._getUnreadMessageCount(),this.isDestroyed)return}else s.A.debug("buttonConfig.show=false，跳过自动获取未读消息数");if(this.config.autoPopup){if(this.isDestroyed)return;setTimeout(()=>{this.showChat()},this.config.autoPopupDelay||1e3)}if(!this.isDestroyed&&this.config.inviteConfig?.show){if(this.isDestroyed)return;setTimeout(()=>{this.showInviteDialog()},this.config.inviteConfig.delay||3e3)}}}}async _initVisitor(){if(this.initVisitorPromise)return s.A.debug("访客初始化请求正在进行中，返回现有Promise"),this.initVisitorPromise;let e=localStorage.getItem(n.Lc),t=localStorage.getItem(n.Gf);s.A.debug("localUid: ",e),s.A.debug("localVisitorUid: ",t);let o=!(this.config.chatConfig?.visitorUid&&t)||this.config.chatConfig?.visitorUid===t;return e&&t&&o?(s.A.debug("访客信息相同，直接返回本地访客信息"),this.config.onVisitorInfo?.(e||"",t||""),{uid:e,visitorUid:t}):(s.A.debug("开始创建访客初始化Promise"),this.initVisitorPromise=Promise.all([i.e(384),i.e(106)]).then(i.bind(i,6106)).then(async({initVisitor:i})=>{try{let o={uid:String(this.config.chatConfig?.uid||e||""),visitorUid:String(this.config.chatConfig?.visitorUid||t||""),orgUid:String(this.config.chatConfig?.org||""),nickname:String(this.config.chatConfig?.name||""),avatar:String(this.config.chatConfig?.avatar||""),mobile:String(this.config.chatConfig?.mobile||""),email:String(this.config.chatConfig?.email||""),note:String(this.config.chatConfig?.note||""),channel:String(this.config.chatConfig?.channel||""),extra:"string"==typeof this.config.chatConfig?.extra?this.config.chatConfig.extra:JSON.stringify(this.config.chatConfig?.extra||{}),vipLevel:String(this.config.chatConfig?.vipLevel||""),debug:this.config.chatConfig?.debug||!1,settingsUid:this.config.chatConfig?.settingsUid||"",loadHistory:this.config.chatConfig?.loadHistory||!1},a=await i(o);if(s.A.debug("访客初始化API响应:",a.data,o),a.data?.code===200)return a.data?.data?.uid&&(localStorage.setItem(n.Lc,a.data.data.uid),s.A.debug("已保存uid到localStorage:",a.data.data.uid)),a.data?.data?.visitorUid&&(localStorage.setItem(n.Gf,a.data.data.visitorUid),s.A.debug("已保存visitorUid到localStorage:",a.data.data.visitorUid)),a.data?.data&&(s.A.debug("触发onVisitorInfo回调"),this.config.onVisitorInfo?.(a.data.data.uid||"",a.data.data.visitorUid||"")),a.data.data;return s.A.error("访客初始化失败:",a.data?.message),null}catch(e){return s.A.error("访客初始化出错:",e),null}finally{s.A.debug("访客初始化Promise完成，清除引用"),this.initVisitorPromise=null}}),this.initVisitorPromise)}async _browseVisitor(){try{let e=localStorage.getItem(n.BQ);if(e){let t=parseInt(e),i=Date.now();if(!Number.isNaN(t)&&i-t<36e5){let e=Math.ceil((36e5-(i-t))/1e3/60);s.A.warn(`浏览记录1小时内最多发送一次，还需等待 ${e} 分钟`);return}}let t=localStorage.getItem(n.CA);if(t){let e=parseInt(t),i=Date.now();if(i-e<36e5){let t=Math.ceil((36e5-(i-e))/1e3/60);s.A.warn(`浏览记录发送失败后1小时内禁止发送，还需等待 ${t} 分钟`);return}localStorage.removeItem(n.CA)}let o=window.location.href,a=document.title,l=document.referrer,d=navigator.userAgent,r=this.getBrowserInfo(d),h=this.getOSInfo(d),b=this.getDeviceInfo(d),c=`${screen.width}x${screen.height}`,g=new URLSearchParams(window.location.search),u=g.get("utm_source")||void 0,f=g.get("utm_medium")||void 0,m=g.get("utm_campaign")||void 0,p=localStorage.getItem(n.Lc),y={url:o,title:a,referrer:l,userAgent:d,operatingSystem:h,browser:r,deviceType:b,screenResolution:c,utmSource:u,utmMedium:f,utmCampaign:m,status:"ONLINE",visitorUid:String(this.config.chatConfig?.uid||p||""),orgUid:this.config.chatConfig?.org||"",channel:String(this.config.chatConfig?.channel||"")};if(!y.visitorUid)return void s.A.warn("访客uid为空，跳过browse操作");localStorage.setItem(n.BQ,Date.now().toString());let{browse:w}=await Promise.all([i.e(384),i.e(106)]).then(i.bind(i,6106)),x=await w(y);x.data?.code===200?localStorage.removeItem(n.CA):(s.A.error("浏览记录发送失败:",x.data?.message),localStorage.setItem(n.CA,Date.now().toString()),s.A.warn("已记录浏览记录发送失败时间，1小时内将禁止再次发送"))}catch(e){s.A.error("发送浏览记录时出错:",e),localStorage.setItem(n.CA,Date.now().toString()),s.A.warn("已记录浏览记录发送失败时间，1小时内将禁止再次发送")}}getBrowserInfo(e){return e.includes("Chrome")?"Chrome":e.includes("Firefox")?"Firefox":e.includes("Safari")?"Safari":e.includes("Edge")?"Edge":e.includes("Opera")?"Opera":"Unknown"}getOSInfo(e){return e.includes("Windows")?"Windows":e.includes("Mac")?"macOS":e.includes("Linux")?"Linux":e.includes("Android")?"Android":e.includes("iOS")?"iOS":"Unknown"}getDeviceInfo(e){return e.includes("Mobile")?"Mobile":e.includes("Tablet")?"Tablet":"Desktop"}async _getUnreadMessageCount(){return this.getUnreadMessageCountPromise?s.A.debug("获取未读消息数请求正在进行中，返回现有Promise"):this.getUnreadMessageCountPromise=Promise.all([i.e(384),i.e(31)]).then(i.bind(i,31)).then(async({getUnreadMessageCount:e})=>{try{let t=String(this.config.chatConfig?.visitorUid||""),i=localStorage.getItem(n.Lc),s=localStorage.getItem(n.Gf),o={uid:i||"",visitorUid:t||s||"",orgUid:this.config.chatConfig?.org||""};if(""===o.uid)return 0;let a=await e(o);if(a.data?.code===200)return this.setUnreadMessageCount(a.data.data||0),a.data.data||0;return 0}catch(e){return s.A.error("获取未读消息数出错:",e),0}finally{this.getUnreadMessageCountPromise=null}}),this.getUnreadMessageCountPromise}async getUnreadMessageCount(){return this._getUnreadMessageCount()}async initVisitor(){return this._initVisitor()}async browseVisitor(){return this._browseVisitor()}clearBrowseFailedLimit(){localStorage.removeItem(n.CA),localStorage.removeItem(n.BQ),s.A.info("已清除浏览记录发送失败的限制")}clearVisitorInfo(){localStorage.removeItem(n.Lc),localStorage.removeItem(n.Gf),s.A.info("已清除本地访客信息")}async forceInitVisitor(){return this.clearVisitorInfo(),this.initVisitorPromise=null,this._initVisitor()}removeUnreadBadgeElement(){if(!this.bubble)return;let e=this.bubble.querySelector(".bytedesk-unread-badge");e&&e.remove()}renderUnreadBadge(){if(s.A.debug("renderUnreadBadge() 被调用",{mode:this.unreadBadgeMode,count:this.unreadBadgeCount}),!this.hasVisibleButtons()){this.removeUnreadBadgeElement(),s.A.debug("renderUnreadBadge: 当前没有可见按钮，不显示角标");return}if(!this.bubble)return void s.A.debug("renderUnreadBadge: bubble 不存在");if("hidden"===this.unreadBadgeMode)return void this.removeUnreadBadgeElement();let e=this.bubble.querySelector(".bytedesk-unread-badge");e||((e=document.createElement("div")).className="bytedesk-unread-badge",this.bubble.appendChild(e));let t="count"===this.unreadBadgeMode;e.style.cssText=`
      position: absolute;
      top: -4px;
      right: 2px;
      min-width: ${t?"18px":"10px"};
      width: ${t?"auto":"10px"};
      height: ${t?"18px":"10px"};
      padding: ${t?"0 4px":"0"};
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
    `,e.textContent=t?this.unreadBadgeCount>99?"99+":this.unreadBadgeCount.toString():""}setUnreadMessageCount(e){let t=Number.isFinite(e)?Math.max(0,Math.floor(e)):0;return this.unreadBadgeCount=t,this.unreadBadgeMode=t>0?"count":"hidden",this.renderUnreadBadge(),t}showUnreadDot(){this.unreadBadgeCount=0,this.unreadBadgeMode="dot",this.renderUnreadBadge()}clearUnreadBadge(){this.unreadBadgeCount=0,this.unreadBadgeMode="hidden",this.removeUnreadBadgeElement()}async clearUnreadMessages(){return this.clearUnreadMessagesPromise?s.A.debug("清空未读消息请求正在进行中，返回现有Promise"):this.clearUnreadMessagesPromise=Promise.all([i.e(384),i.e(31)]).then(i.bind(i,31)).then(async({clearUnreadMessages:e})=>{try{let t=String(this.config.chatConfig?.visitorUid||""),i=localStorage.getItem(n.Lc),o=localStorage.getItem(n.Gf),a={uid:i||"",visitorUid:t||o||"",orgUid:this.config.chatConfig?.org||""},l=await e(a);if(s.A.debug("清空未读消息数:",l.data,a),200===l.data.code)return s.A.info("清空未读消息数成功:",l.data),this.clearUnreadBadge(),l.data.data||0;return s.A.error("清空未读消息数失败:",l.data.message),0}catch(e){return s.A.error("清空未读消息数出错:",e),0}finally{this.clearUnreadMessagesPromise=null}}),this.clearUnreadMessagesPromise}getBubbleMessages(){let e=this.config.bubbleConfig?.messages;if(Array.isArray(e)&&e.length>0){let t=e.filter(e=>!!e&&(!!e.icon||!!e.title||!!e.subtitle));if(t.length>0)return t}return[{icon:this.config.bubbleConfig?.icon,title:this.config.bubbleConfig?.title,subtitle:this.config.bubbleConfig?.subtitle}]}getBubbleSwitchMode(){return this.config.bubbleConfig?.switchMode||"fade"}buildBubbleMessageContentNode(e){let t=document.createElement("div");t.style.cssText=`
      display: flex;
      align-items: center;
      gap: 8px;
      flex-direction: ${"bottom-left"===this.config.placement?"row":"row-reverse"};
      box-sizing: border-box;
    `,t.setAttribute("data-bytedesk-bubble-content","true"),t.setAttribute("data-placement",this.config.placement||"bottom-right");let i=document.createElement("span");i.setAttribute("data-bytedesk-bubble-role","icon"),i.style.fontSize="20px",i.textContent=e.icon||"",t.appendChild(i);let n=document.createElement("div");n.style.cssText="min-width: 0; flex: 1;";let s=document.createElement("div");s.setAttribute("data-bytedesk-bubble-role","title"),s.style.fontWeight="bold",s.style.color=this.config.theme?.mode==="dark"?"#e5e7eb":"#1f2937",s.style.marginBottom="4px",s.style.textAlign="bottom-left"===this.config.placement?"left":"right",s.textContent=e.title||"",n.appendChild(s);let o=document.createElement("div");return o.setAttribute("data-bytedesk-bubble-role","subtitle"),o.style.fontSize="0.9em",o.style.color=this.config.theme?.mode==="dark"?"#9ca3af":"#4b5563",o.style.textAlign="bottom-left"===this.config.placement?"left":"right",o.textContent=e.subtitle||"",n.appendChild(o),t.appendChild(n),{messageContent:t,iconSpan:i,title:s,subtitle:o}}buildBubbleTickerItemNode(e,t,i){let n=document.createElement("div");n.style.cssText=`
      position: relative;
      width: ${t?`${t}px`:"auto"};
      padding-bottom: 10px;
      box-sizing: border-box;
      display: block;
    `;let s=document.createElement("div");s.style.cssText=`
      background: ${this.config.theme?.mode==="dark"?"#1f2937":"white"};
      color: ${this.config.theme?.mode==="dark"?"#e5e7eb":"#1f2937"};
      padding: 12px 16px;
      border-radius: 8px;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
      max-width: 220px;
      position: relative;
      box-sizing: border-box;
      width: ${t?`${t}px`:"auto"};
      min-height: ${i?`${i-10}px`:"auto"};
    `;let{messageContent:o}=this.buildBubbleMessageContentNode(e);return t&&(o.style.width=`${Math.max(0,t-32)}px`),s.appendChild(o),n.appendChild(s),n}destroyBubbleTicker(){this.bubbleTickerStyleElement?.parentElement&&this.bubbleTickerStyleElement.parentElement.removeChild(this.bubbleTickerStyleElement),this.bubbleTickerStyleElement=null,this.bubbleTickerTrackElement?.parentElement&&this.bubbleTickerTrackElement.parentElement.removeChild(this.bubbleTickerTrackElement),this.bubbleTickerTrackElement=null}setBubbleTickerRunning(e){this.bubbleTickerTrackElement&&(this.bubbleTickerTrackElement.style.animationPlayState=e?"running":"paused")}initBubbleTicker(e){let t=this.bubbleMessageViewportElement,i=e||this.bubble?.messageElement||t?.parentElement;if(!(t instanceof HTMLElement))return;if(this.destroyBubbleTicker(),this.bubbleMessages.length<=1){this.bubbleMessageContentElement&&!t.contains(this.bubbleMessageContentElement)&&t.appendChild(this.bubbleMessageContentElement),this.renderBubbleMessage(0);return}if(!(i instanceof HTMLElement))return;let n=document.createElement("div");n.style.cssText=`
      position: absolute;
      visibility: hidden;
      pointer-events: none;
      left: 0;
      top: 0;
      z-index: -1;
      width: max-content;
      max-width: 220px;
    `,i.appendChild(n);let s=this.bubbleMessages.map(e=>{let t=this.buildBubbleTickerItemNode(e);return n.appendChild(t),t}),o=s.reduce((e,t)=>Math.max(e,t.offsetHeight),0),a=s.reduce((e,t)=>Math.max(e,t.offsetWidth),0);if(i.removeChild(n),!o||!a)return;t.style.width=`${a}px`,this.syncBubbleViewportHeight(o,!1);let l=document.createElement("div");l.style.cssText=`
      position: relative;
      display: flex;
      flex-direction: column;
      width: ${a}px;
      will-change: transform;
    `,[...this.bubbleMessages,...this.bubbleMessages].forEach(e=>{let t=this.buildBubbleTickerItemNode(e,a,o);t.style.height=`${o}px`,t.style.minHeight=`${o}px`,l.appendChild(t)});let d=o*this.bubbleMessages.length,r=Math.max(1.6,Number(this.config.bubbleConfig?.rotateInterval||3e3)/1e3)*this.bubbleMessages.length,h=`bytedeskBubbleTicker_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,b=document.createElement("style");b.textContent=`
      @keyframes ${h} {
        from { transform: translateY(0); }
        to { transform: translateY(-${d}px); }
      }
    `,document.head.appendChild(b),l.style.animation=`${h} ${r}s linear infinite`,l.style.animationPlayState="paused",t.appendChild(l),this.bubbleTickerTrackElement=l,this.bubbleTickerStyleElement=b,this.bubbleMessageIndex=0}renderBubbleMessage(e){if(!this.bubbleMessages.length)return;if("ticker"===this.getBubbleSwitchMode()){this.bubbleMessageIndex=(e%this.bubbleMessages.length+this.bubbleMessages.length)%this.bubbleMessages.length,this.syncBubbleViewportHeight();return}if(!this.bubbleIconElement||!this.bubbleTitleElement||!this.bubbleSubtitleElement)return;let t=this.bubbleMessages.length;this.bubbleMessageIndex=(e%t+t)%t;let i=this.bubbleMessages[this.bubbleMessageIndex];this.bubbleIconElement.textContent=i.icon||"",this.bubbleTitleElement.textContent=i.title||"",this.bubbleSubtitleElement.textContent=i.subtitle||"",this.syncBubbleViewportHeight()}syncBubbleViewportHeight(e,t=!1){if(!(this.bubbleMessageViewportElement instanceof HTMLElement))return;let i=e??this.bubbleMessageContentElement?.offsetHeight??0;i&&(this.bubbleMessageViewportElement.style.transition=t?"height 0.3s ease":"none",this.bubbleMessageViewportElement.style.height=`${i}px`)}cleanupPendingBubbleMessage(){this.bubblePendingMessageElement?.parentElement&&this.bubblePendingMessageElement.parentElement.removeChild(this.bubblePendingMessageElement),this.bubblePendingMessageElement=null}stopBubbleMessageTransition(){null!==this.bubbleMessageTransitionTimer&&(window.clearTimeout(this.bubbleMessageTransitionTimer),this.bubbleMessageTransitionTimer=null),this.setBubbleTickerRunning(!1),this.cleanupPendingBubbleMessage(),this.bubbleMessageViewportElement&&(this.bubbleMessageViewportElement.style.transition=""),this.bubbleMessageContentElement&&(this.bubbleMessageContentElement.style.transition="",this.bubbleMessageContentElement.style.transform="translateY(0)",this.bubbleMessageContentElement.style.opacity="1")}transitionBubbleMessage(e){let t=this.bubble?.messageElement;if(!(t instanceof HTMLElement)||"none"===t.style.display)return void this.renderBubbleMessage(e);let i=this.getBubbleSwitchMode();if("ticker"===i){this.renderBubbleMessage(e),this.setBubbleTickerRunning(!0);return}if(this.stopBubbleMessageTransition(),"slide-up"===i){let t=this.bubbleMessageViewportElement,i=this.bubbleMessageContentElement;if(!(t instanceof HTMLElement)||!(i instanceof HTMLElement)||!i.parentElement)return void this.renderBubbleMessage(e);let n=this.bubbleMessages[(e%this.bubbleMessages.length+this.bubbleMessages.length)%this.bubbleMessages.length],s=i.cloneNode(!0),o=s.querySelector('[data-bytedesk-bubble-role="icon"]'),a=s.querySelector('[data-bytedesk-bubble-role="title"]'),l=s.querySelector('[data-bytedesk-bubble-role="subtitle"]');o&&(o.textContent=n.icon||""),a&&(a.textContent=n.title||""),l&&(l.textContent=n.subtitle||""),s.style.position="absolute",s.style.left="0",s.style.top="0",s.style.width="100%",s.style.transform="translateY(100%)",s.style.opacity="1",s.style.transition="transform 0.3s ease",i.style.transition="transform 0.3s ease";let d=i.offsetHeight;i.parentElement.appendChild(s);let r=s.offsetHeight;return this.syncBubbleViewportHeight(d,!1),this.bubblePendingMessageElement=s,window.requestAnimationFrame(()=>{this.syncBubbleViewportHeight(r,!0),i.style.transform="translateY(-100%)",s.style.transform="translateY(0)"}),void(this.bubbleMessageTransitionTimer=window.setTimeout(()=>{this.renderBubbleMessage(e),i.style.transition="",i.style.transform="translateY(0)",i.style.opacity="1",this.syncBubbleViewportHeight(r,!1),this.cleanupPendingBubbleMessage(),this.bubbleMessageTransitionTimer=null},320))}let n=this.bubbleMessageContentElement?.offsetHeight??0;this.syncBubbleViewportHeight(n,!1),t.style.opacity="0",t.style.transform="translateY(6px)",this.bubbleMessageTransitionTimer=window.setTimeout(()=>{this.renderBubbleMessage(e);let i=this.bubbleMessageContentElement?.offsetHeight??n;this.syncBubbleViewportHeight(i,!0),t.style.opacity="1",t.style.transform="translateY(0)",this.bubbleMessageTransitionTimer=null},180)}stopBubbleMessageRotation(){null!==this.bubbleMessageTimer&&(window.clearInterval(this.bubbleMessageTimer),this.bubbleMessageTimer=null),this.setBubbleTickerRunning(!1)}startBubbleMessageRotation(){if(this.stopBubbleMessageRotation(),this.config.bubbleConfig?.autoRotate===!1||this.bubbleMessages.length<=1)return;if("ticker"===this.getBubbleSwitchMode()){this.bubbleTickerTrackElement||this.initBubbleTicker(this.bubble?.messageElement||this.bubbleMessageViewportElement?.parentElement),this.setBubbleTickerRunning(!0);return}let e=Number(this.config.bubbleConfig?.rotateInterval||3e3),t=Number.isFinite(e)?Math.max(1e3,e):3e3;this.bubbleMessageTimer=window.setInterval(()=>{let e=this.bubble?.messageElement;e instanceof HTMLElement&&"none"!==e.style.display&&this.transitionBubbleMessage(this.bubbleMessageIndex+1)},t)}createBubble(){if(this.bubble&&document.body.contains(this.bubble))return void s.A.debug("createBubble: 气泡已存在，不重复创建");this.bubble&&!document.body.contains(this.bubble)&&(s.A.debug("createBubble: 清理已存在的 bubble 引用"),this.bubble=null),this.bubbleContainer&&!document.body.contains(this.bubbleContainer)&&(s.A.debug("createBubble: 清理已存在的 bubbleContainer 引用"),this.bubbleContainer=null),this.buttonElements=[];let e=document.createElement("div");e.style.cssText=`
      position: fixed;
      ${"bottom-left"===this.config.placement?"left":"right"}: ${this.config.marginSide}px;
      bottom: ${this.config.marginBottom}px;
      display: flex;
      flex-direction: column;
      align-items: ${"bottom-left"===this.config.placement?"flex-start":"flex-end"};
      gap: 10px;
      z-index: 9999;
    `;let t=null;if(this.config.bubbleConfig?.show){let i="ticker"===this.getBubbleSwitchMode();(t=document.createElement("div")).style.cssText=`
        background: ${i?"transparent":this.config.theme?.mode==="dark"?"#1f2937":"white"};
        color: ${this.config.theme?.mode==="dark"?"#e5e7eb":"#1f2937"};
        padding: ${i?"0":"12px 16px"};
        border-radius: ${i?"0":"8px"};
        box-shadow: ${i?"none":"0 2px 12px rgba(0, 0, 0, 0.1)"};
        max-width: ${i?"none":"220px"};
        margin-bottom: 8px;
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.22s ease, transform 0.22s ease;
        position: relative;
      `;let n=document.createElement("div");n.style.cssText=`
        position: relative;
        overflow: hidden;
      `;let{messageContent:s,iconSpan:o,title:a,subtitle:l}=this.buildBubbleMessageContentNode({icon:this.config.bubbleConfig?.icon,title:this.config.bubbleConfig?.title,subtitle:this.config.bubbleConfig?.subtitle});if(i||n.appendChild(s),t.appendChild(n),!i){let e=document.createElement("div");e.style.cssText=`
          position: absolute;
          bottom: -6px;
          ${"bottom-left"===this.config.placement?"left: 24px":"right: 24px"};
          width: 12px;
          height: 12px;
          background: ${this.config.theme?.mode==="dark"?"#1f2937":"white"};
          transform: rotate(45deg);
          box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
        `;let i=document.createElement("div");i.style.cssText=`
          position: absolute;
          bottom: 0;
          ${"bottom-left"===this.config.placement?"left: 18px":"right: 18px"};
          width: 24px;
          height: 12px;
          background: ${this.config.theme?.mode==="dark"?"#1f2937":"white"};
        `,t.appendChild(e),t.appendChild(i)}e.appendChild(t),this.bubbleMessages=this.getBubbleMessages(),this.bubbleMessageViewportElement=n,this.bubbleMessageContentElement=s,this.bubbleIconElement=o,this.bubbleTitleElement=a,this.bubbleSubtitleElement=l,this.bubbleMessageIndex=0,"ticker"===this.getBubbleSwitchMode()?this.initBubbleTicker(t):this.renderBubbleMessage(0),t.addEventListener("mouseenter",()=>{this.stopBubbleMessageRotation()}),t.addEventListener("mouseleave",()=>{this.startBubbleMessageRotation()}),setTimeout(()=>{t&&(t.style.opacity="1",t.style.transform="translateY(0)",this.startBubbleMessageRotation())},500)}let i=this.getEffectiveButtonConfigs(),n=document.createElement("div"),o=this.isMultiButtonLayout(i),a=this.config.theme?.mode==="dark",l=this.config.theme?.backgroundColor||(a?"#3B82F6":"#0066FF");if(n.style.cssText=`
      display: flex;
      flex-direction: column;
      align-items: ${"bottom-left"===this.config.placement?"flex-start":"flex-end"};
      gap: ${o?"0":"10px"};
      background: ${o?l:"transparent"};
      border-radius: ${o?"18px":"0"};
      overflow: ${o?"hidden":"visible"};
      box-shadow: ${o?`0 10px 28px rgba(0, 0, 0, ${a?"0.32":"0.16"})`:"none"};
    `,i.forEach((e,s)=>{let a=this.createButtonElement(e,t,{isMultiLayout:o,isLastButton:s===i.length-1});this.buttonElements.push(a),0===s&&(this.bubble=a),n.appendChild(a)}),this.renderUnreadBadge(),e.appendChild(n),this.config.draggable&&this.buttonElements.length>0){let t=0,i=0,n=0,s=0;this.buttonElements.forEach(o=>{o.addEventListener("mousedown",o=>{0===o.button&&(this.isDragging=!0,t=o.clientX,i=o.clientY,n=e.offsetLeft,s=e.offsetTop,e.style.transition="none")})}),document.addEventListener("mousemove",o=>{if(!this.isDragging)return;o.preventDefault();let a=o.clientX-t,l=o.clientY-i,d=n+a,r=s+l,h=window.innerHeight-e.offsetHeight;d<=window.innerWidth/2?(e.style.left=`${Math.max(0,d)}px`,e.style.right="auto",e.style.alignItems="flex-start",this.config.placement="bottom-left"):(e.style.right=`${Math.max(0,window.innerWidth-d-e.offsetWidth)}px`,e.style.left="auto",e.style.alignItems="flex-end",this.config.placement="bottom-right"),e.style.bottom=`${Math.min(Math.max(0,window.innerHeight-r-e.offsetHeight),h)}px`}),document.addEventListener("mouseup",()=>{this.isDragging&&(this.isDragging=!1,e.style.transition="all 0.3s ease",this.config.marginSide=parseInt("bottom-left"===this.config.placement?e.style.left:e.style.right)||20,this.config.marginBottom=parseInt(e.style.bottom||"20"))})}document.body.appendChild(e),this.bubbleContainer=e,document.addEventListener("click",()=>{this.hideContextMenu()})}createChatWindow(){if(this.window&&document.body.contains(this.window))return void s.A.debug("createChatWindow: 聊天窗口已存在，不重复创建");this.window&&!document.body.contains(this.window)&&(s.A.debug("createChatWindow: 清理已存在的 window 引用"),this.window=null),this.window=document.createElement("div");let e=window.innerWidth<=768,t=window.innerWidth,i=window.innerHeight,n=Math.min(this.config.window?.width||.9*t,.9*t),o=Math.min(this.config.window?.height||.9*i,.9*i);e?this.window.style.cssText=`
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
        width: ${n}px;
        height: ${o}px;
        border-radius: 12px;
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
        display: none;
        overflow: hidden;
        z-index: 10000;
        transition: all ${this.config.animation?.duration}ms ${this.config.animation?.type};
      `;let a=document.createElement("iframe");a.setAttribute("allow","microphone *; camera *; autoplay *; clipboard-write *"),a.style.cssText=`
      width: 100%;
      height: 100%;
      border: none;
      display: block;
      vertical-align: bottom;
    `,a.src=this.generateChatUrl(),s.A.debug("iframe.src: ",a.src),this.window.appendChild(a),document.body.appendChild(this.window)}generateChatUrl(e="messages"){let t;s.A.debug("this.config: ",this.config,e);let i=new URLSearchParams;Object.entries(this.config.chatConfig||{}).forEach(([e,t])=>{if(null!=t&&""!==String(t).trim())if("debug"===e&&!0===t)i.append("debug","1");else if("draft"===e&&!0===t)i.append("draft","1");else if("loadHistory"===e&&!0===t)i.append("loadHistory","1");else if("goodsInfo"===e||"orderInfo"===e)try{"string"==typeof t?i.append(e,t):i.append(e,JSON.stringify(t))}catch(t){s.A.error(`Error processing ${e}:`,t)}else if("extra"===e)try{let n="string"==typeof t?JSON.parse(t):t;n.goodsInfo&&delete n.goodsInfo,n.orderInfo&&delete n.orderInfo,Object.keys(n).length>0&&i.append(e,JSON.stringify(n))}catch(e){s.A.error("Error processing extra parameter:",e)}else"debug"!==e&&"draft"!==e&&"loadHistory"!==e&&i.append(e,String(t))});let n=Object.keys(t=(e=>{if(!e)return{};let t={},i=o(e.referer)||o(e.referrer),n=o(e.title),s=o(e.url);return i&&(t.referer=i),n&&(t.title=n),s&&(t.url=s),t})(this.config.browseConfig)).length>0?JSON.stringify(t):void 0;n&&i.append("browse",n),Object.entries(this.config.theme||{}).forEach(([e,t])=>{i.append(e,String(t))}),i.append("lang",this.config.locale||"zh-cn");let a=this.getChatPageBaseUrl(),l=`${a}?${i.toString()}`;return s.A.debug("chat url: ",l),l}normalizePath(e,t="/chat"){let i=(e||"").trim();return i?i.startsWith("/")?i:`/${i}`:t}getChatPageBaseUrl(){let e=this.normalizePath(this.config.chatPath,"/chat"),t=(this.config.htmlUrl||"").trim(),i=t.replace(/\/$/,"");if(!t)return e;if(i.match(/\/(chat(?:\/thread)?|webrtc|call)\/?$/))return i.replace(/\/(chat(?:\/thread)?|webrtc|call)\/?$/,e);try{let e=new URL(t,window.location.origin);if(e.pathname&&"/"!==e.pathname)return i}catch{if(i.startsWith("/"))return i}return`${i}${e}`}setupMessageListener(){window.addEventListener("message",e=>{switch(e.data.type){case n.gT:this.hideChat();break;case n.HA:this.toggleMaximize();break;case n.Ne:this.minimizeWindow();break;case n.fF:s.A.debug("RECEIVE_MESSAGE");break;case n.Yn:s.A.debug("INVITE_VISITOR");break;case n.$n:s.A.debug("INVITE_VISITOR_ACCEPT");break;case n.ej:s.A.debug("INVITE_VISITOR_REJECT");break;case n.ky:this.handleLocalStorageData(e)}})}handleLocalStorageData(e){let{uid:t,visitorUid:i}=e.data;s.A.debug("handleLocalStorageData 被调用",t,i,e.data);let o=localStorage.getItem(n.Lc),a=localStorage.getItem(n.Gf);o===t&&a===i?s.A.debug("handleLocalStorageData: 值相同，跳过设置"):(localStorage.setItem(n.Lc,t),localStorage.setItem(n.Gf,i),s.A.debug("handleLocalStorageData: 已更新localStorage",{uid:t,visitorUid:i}),this.config.onVisitorInfo?.(t,i))}sendMessageToIframe(e){let t=this.window?.querySelector("iframe");t&&t.contentWindow&&t.contentWindow.postMessage(e,"*")}resetAnonymousVisitor(){localStorage.removeItem(n.Lc),localStorage.removeItem(n.Gf),this.sendMessageToIframe({type:n.At})}showChat(e){if(e&&(this.config={...this.config,...e},this.window&&(document.body.removeChild(this.window),this.window=null)),this.window||this.createChatWindow(),this.window){let e=window.innerWidth<=768;if(this.window.style.display="block",this.config.forceRefresh){let e=this.window.querySelector("iframe");e&&(e.src=this.generateChatUrl())}if(this.setupResizeListener(),e&&this.window&&(this.window.style.transform="translateY(100%)",requestAnimationFrame(()=>{this.window&&(this.window.style.transform="translateY(0)")})),this.isVisible=!0,this.bubble){this.bubble.style.display="none";let e=this.bubble.messageElement;e instanceof HTMLElement&&(e.style.display="none")}}this.hideInviteDialog(),this.config.onShowChat?.()}hideChat(){if(this.window){if(window.innerWidth<=768?(this.window.style.transform="translateY(100%)",setTimeout(()=>{this.window&&(this.window.style.display="none")},this.config.animation?.duration||300)):this.window.style.display="none",this.isVisible=!1,this.buttonElements.length>0){this.applyConfiguredButtonVisibility();let e=this.bubble.messageElement;e instanceof HTMLElement&&(e.style.display=this.config.bubbleConfig?.show===!1?"none":"block")}this.config.onHideChat?.()}}showThread(e){return this.showChat({...e,chatPath:this.normalizePath(e?.threadPath||this.config.threadPath,"/chat/thread")})}showWebrtc(e){return this.showChat({...e,chatPath:this.normalizePath(e?.webrtcPath||this.config.webrtcPath,"/webrtc")})}showCall(e){return this.showChat({...e,chatPath:this.normalizePath(e?.callPath||this.config.callPath,"/call")})}minimizeWindow(){this.window&&(this.windowState="minimized",this.window.style.display="none",this.hideChat())}toggleMaximize(){this.window&&window.open(this.generateChatUrl(),"_blank")}setupResizeListener(){let e,t=()=>{if(!this.window||!this.isVisible)return;let e=window.innerWidth<=768,t=window.innerWidth,i=window.innerHeight;if(e)Object.assign(this.window.style,{left:"0",bottom:"0",width:"100%",height:"100vh",borderTopLeftRadius:"12px",borderTopRightRadius:"12px",borderBottomLeftRadius:"0",borderBottomRightRadius:"0",boxSizing:"border-box",paddingTop:"env(safe-area-inset-top)",paddingBottom:"env(safe-area-inset-bottom)"}),this.window.style.height="100dvh";else{let e="maximized"===this.windowState?t:Math.min(this.config.window?.width||.9*t,.9*t),n="maximized"===this.windowState?i:Math.min(this.config.window?.height||.9*i,.9*i),s="bottom-right"===this.config.placement?this.config.marginSide:void 0,o="bottom-left"===this.config.placement?this.config.marginSide:void 0;Object.assign(this.window.style,{width:`${e}px`,height:`${n}px`,right:s?`${s}px`:"auto",left:o?`${o}px`:"auto",bottom:`${this.config.marginBottom}px`,borderRadius:"maximized"===this.windowState?"0":"12px"})}};window.addEventListener("resize",()=>{clearTimeout(e),e=window.setTimeout(t,100)}),t()}destroy(){this.isDestroyed=!0,this.stopBubbleMessageRotation(),this.stopBubbleMessageTransition(),this.destroyBubbleTicker(),this.bubbleMessageViewportElement=null,this.bubbleMessageContentElement=null,this.bubblePendingMessageElement=null,this.bubbleTickerTrackElement=null,this.bubbleTickerStyleElement=null,this.bubbleIconElement=null,this.bubbleTitleElement=null,this.bubbleSubtitleElement=null,this.bubbleMessages=[],this.bubbleMessageIndex=0,this.bubbleContainer&&document.body.contains(this.bubbleContainer)&&document.body.removeChild(this.bubbleContainer),this.hideButtonPreview(),this.bubbleContainer=null,this.bubble=null,this.buttonElements=[],this.window&&document.body.contains(this.window)&&(document.body.removeChild(this.window),this.window=null),window.removeEventListener("resize",this.setupResizeListener.bind(this)),this.loopTimer&&(window.clearTimeout(this.loopTimer),this.loopTimer=null),this.inviteDialog&&document.body.contains(this.inviteDialog)&&(document.body.removeChild(this.inviteDialog),this.inviteDialog=null),this.contextMenu&&document.body.contains(this.contextMenu)&&(document.body.removeChild(this.contextMenu),this.contextMenu=null),this.hideTimeout&&(clearTimeout(this.hideTimeout),this.hideTimeout=null),this.selectionDebounceTimer&&(clearTimeout(this.selectionDebounceTimer),this.selectionDebounceTimer=null),this.destroyFeedbackFeature()}createInviteDialog(){if(this.inviteDialog&&document.body.contains(this.inviteDialog))return void s.A.debug("createInviteDialog: 邀请框已存在，不重复创建");this.inviteDialog&&!document.body.contains(this.inviteDialog)&&(s.A.debug("createInviteDialog: 清理已存在的 inviteDialog 引用"),this.inviteDialog=null);let e=this.config.theme?.mode==="dark";if(this.inviteDialog=document.createElement("div"),this.inviteDialog.style.cssText=`
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: ${e?"#1f2937":"white"};
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 24px rgba(0, 0, 0, ${e?"0.3":"0.15"});
      z-index: 10001;
      display: none;
      max-width: 300px;
      text-align: center;
    `,this.config.inviteConfig?.icon){let t=document.createElement("div");t.style.cssText=`
        font-size: 32px;
        margin-bottom: 12px;
        color: ${e?"#e5e7eb":"#333"};
      `,t.textContent=this.config.inviteConfig.icon,this.inviteDialog.appendChild(t)}let t=document.createElement("div");t.style.cssText=`
      margin-bottom: 16px;
      color: ${e?"#e5e7eb":"#333"};
    `,t.textContent=this.config.inviteConfig?.text||"需要帮助吗？点击开始对话",this.inviteDialog.appendChild(t);let i=document.createElement("div");i.style.cssText=`
      display: flex;
      gap: 10px;
      justify-content: center;
    `;let n=document.createElement("button");n.textContent=this.config.inviteConfig?.acceptText||"开始对话";let o=this.config.theme?.backgroundColor||(e?"#3B82F6":"#0066FF");n.style.cssText=`
      padding: 8px 16px;
      background: ${o};
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    `,n.onclick=()=>{this.hideInviteDialog(),this.showChat(),this.config.inviteConfig?.onAccept?.()};let a=document.createElement("button");a.textContent=this.config.inviteConfig?.rejectText||"稍后再说",a.style.cssText=`
      padding: 8px 16px;
      background: ${e?"#374151":"#f5f5f5"};
      color: ${e?"#d1d5db":"#666"};
      border: none;
      border-radius: 4px;
      cursor: pointer;
    `,a.onclick=()=>{this.hideInviteDialog(),this.config.inviteConfig?.onReject?.(),this.handleInviteLoop()},i.appendChild(n),i.appendChild(a),this.inviteDialog.appendChild(i),document.body.appendChild(this.inviteDialog)}showInviteDialog(){this.inviteDialog&&(this.inviteDialog.style.display="block",this.config.inviteConfig?.onOpen?.())}hideInviteDialog(){s.A.debug("hideInviteDialog before"),this.inviteDialog&&(this.inviteDialog.style.display="none",this.config.inviteConfig?.onClose?.(),s.A.debug("hideInviteDialog after"))}handleInviteLoop(){let{loop:e,loopDelay:t=3e3,loopCount:i=1/0}=this.config.inviteConfig||{};e&&!(this.loopCount>=i-1)&&(this.loopTimer&&window.clearTimeout(this.loopTimer),this.loopTimer=window.setTimeout(()=>{this.loopCount++,this.showInviteDialog()},t))}showButton(){this.buttonElements.length>0&&this.buttonElements.every(e=>"none"!==e.style.display)?s.A.debug("showButton: 按钮已经显示，无需重复显示"):this.buttonElements.length>0?(this.buttonElements.forEach(e=>{e.style.display="flex"}),s.A.debug("showButton: 按钮已显示")):s.A.debug("showButton: bubble 不存在，需要先创建")}hideButton(){this.buttonElements.length>0&&this.buttonElements.forEach(e=>{e.style.display="none"})}showBubble(){if(this.bubble){let e=this.bubble.messageElement;if(e instanceof HTMLElement){if("none"!==e.style.display&&"0"!==e.style.opacity)return void s.A.debug("showBubble: 气泡已经显示，无需重复显示");e.style.display="block",setTimeout(()=>{e.style.opacity="1",e.style.transform="translateY(0)",this.startBubbleMessageRotation()},100),s.A.debug("showBubble: 气泡已显示")}else s.A.debug("showBubble: messageElement 不存在")}else s.A.debug("showBubble: bubble 不存在")}hideBubble(){if(this.bubble){let e=this.bubble.messageElement;e instanceof HTMLElement&&(this.stopBubbleMessageRotation(),this.stopBubbleMessageTransition(),e.style.opacity="0",e.style.transform="translateY(10px)",setTimeout(()=>{e.style.display="none"},300))}}createContextMenu(){this.contextMenu=document.createElement("div"),this.contextMenu.style.cssText=`
      position: fixed;
      background: white;
      border-radius: 4px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      padding: 4px 0;
      display: none;
      z-index: 10000;
      min-width: 150px;
    `;let e=[{text:"隐藏按钮和气泡",onClick:()=>{this.hideButton(),this.hideBubble()}},{text:"切换位置",onClick:()=>{this.togglePlacement()}}];e.forEach((t,i)=>{let n=document.createElement("div");if(n.style.cssText=`
        padding: 8px 16px;
        cursor: pointer;
        color: #333;
        font-size: 14px;
        
        &:hover {
          background: #f5f5f5;
        }
      `,n.textContent=t.text,n.onclick=()=>{t.onClick(),this.hideContextMenu()},this.contextMenu&&this.contextMenu.appendChild(n),i<e.length-1){let e=document.createElement("div");e.style.cssText=`
          height: 1px;
          background: #eee;
          margin: 4px 0;
        `,this.contextMenu&&this.contextMenu.appendChild(e)}}),document.body.appendChild(this.contextMenu)}showContextMenu(e){if(e.preventDefault(),this.contextMenu||this.createContextMenu(),this.contextMenu){this.contextMenu.style.visibility="hidden",this.contextMenu.style.display="block";let t=this.contextMenu.offsetWidth,i=this.contextMenu.offsetHeight,n=e.clientX,s=e.clientY;n+t>window.innerWidth&&(n-=t),s+i>window.innerHeight&&(s-=i),n=Math.max(0,n),s=Math.max(0,s),this.contextMenu.style.left=`${n}px`,this.contextMenu.style.top=`${s}px`,this.contextMenu.style.visibility="visible"}}hideContextMenu(){this.contextMenu&&(this.contextMenu.style.display="none")}togglePlacement(){if(!this.bubble)return;this.config.placement="bottom-left"===this.config.placement?"bottom-right":"bottom-left";let e=this.bubble.parentElement;e&&(e.style.left="bottom-left"===this.config.placement?`${this.config.marginSide}px`:"auto",e.style.right="bottom-right"===this.config.placement?`${this.config.marginSide}px`:"auto",e.style.alignItems="bottom-left"===this.config.placement?"flex-start":"flex-end",this.window&&this.isVisible&&(this.window.style.left="bottom-left"===this.config.placement?`${this.config.marginSide}px`:"auto",this.window.style.right="bottom-right"===this.config.placement?`${this.config.marginSide}px`:"auto"),this.config.onConfigChange?.({placement:this.config.placement}))}initFeedbackFeature(){(s.A.debug("BytedeskWeb: 初始化文档反馈功能开始"),s.A.debug("BytedeskWeb: feedbackConfig:",this.config.feedbackConfig),s.A.debug("BytedeskWeb: feedbackConfig.enabled:",this.config.feedbackConfig?.enabled),this.config.feedbackConfig?.enabled)?((this.feedbackTooltip||this.feedbackDialog)&&(s.A.debug("BytedeskWeb: 反馈功能已存在，先销毁再重新创建"),this.destroyFeedbackFeature()),"selection"===this.config.feedbackConfig.trigger||"both"===this.config.feedbackConfig.trigger?(s.A.debug("BytedeskWeb: 触发器匹配，设置文本选择监听器"),s.A.debug("BytedeskWeb: 触发器类型:",this.config.feedbackConfig.trigger),this.setupTextSelectionListener()):(s.A.debug("BytedeskWeb: 触发器不匹配，跳过文本选择监听器"),s.A.debug("BytedeskWeb: 触发器类型:",this.config.feedbackConfig.trigger)),s.A.debug("BytedeskWeb: 开始创建反馈提示框"),this.createFeedbackTooltip(),s.A.debug("BytedeskWeb: 开始创建反馈对话框"),this.createFeedbackDialog(),s.A.debug("BytedeskWeb: 文档反馈功能初始化完成"),s.A.debug("BytedeskWeb: 反馈提示框存在:",!!this.feedbackTooltip),s.A.debug("BytedeskWeb: 反馈对话框存在:",!!this.feedbackDialog)):s.A.debug("BytedeskWeb: 文档反馈功能未启用，退出初始化")}setupTextSelectionListener(){s.A.debug("BytedeskWeb: 设置文本选择监听器"),document.addEventListener("mouseup",e=>{this.lastMouseEvent=e,s.A.debug("BytedeskWeb: mouseup事件触发",e),this.handleTextSelectionWithDebounce(e)},{capture:!0,passive:!0}),document.addEventListener("selectionchange",()=>{if(!this.lastMouseEvent){s.A.debug("BytedeskWeb: selectionchange事件触发（无鼠标事件）");let e=new MouseEvent("mouseup",{clientX:window.innerWidth/2,clientY:window.innerHeight/2});this.handleTextSelectionWithDebounce(e)}}),document.addEventListener("keyup",e=>{(e.shiftKey||e.ctrlKey||e.metaKey)&&(s.A.debug("BytedeskWeb: keyup事件触发（带修饰键）",e),this.handleTextSelectionWithDebounce(e))},{capture:!0,passive:!0}),document.addEventListener("click",e=>{let t=e.target;t?.closest("[data-bytedesk-feedback]")||this.hideFeedbackTooltip()}),s.A.debug("BytedeskWeb: 文本选择监听器设置完成")}handleTextSelectionWithDebounce(e){this.config.isDebug&&s.A.debug("BytedeskWeb: handleTextSelectionWithDebounce被调用 - 防抖机制生效"),this.selectionDebounceTimer&&(clearTimeout(this.selectionDebounceTimer),this.config.isDebug&&s.A.debug("BytedeskWeb: 清除之前的防抖定时器")),this.selectionDebounceTimer=setTimeout(()=>{this.config.isDebug&&s.A.debug("BytedeskWeb: 防抖延迟结束，开始处理文本选择"),this.handleTextSelection(e)},200)}handleTextSelection(e){this.config.isDebug&&s.A.debug("BytedeskWeb: handleTextSelection被调用");let t=window.getSelection();if(this.config.isDebug&&(s.A.debug("BytedeskWeb: window.getSelection()结果:",t),s.A.debug("BytedeskWeb: selection.rangeCount:",t?.rangeCount)),!t||0===t.rangeCount){this.config.isDebug&&s.A.debug("BytedeskWeb: 没有选择或范围为0，隐藏提示"),this.hideFeedbackTooltip();return}let i=t.toString().trim();if(this.config.isDebug&&(s.A.debug("BytedeskWeb: 检测到文本选择:",`"${i}"`),s.A.debug("BytedeskWeb: 选中文本长度:",i.length)),i===this.lastSelectionText&&this.isTooltipVisible){this.config.isDebug&&s.A.debug("BytedeskWeb: 文本选择未变化且提示框已显示，跳过处理");return}if(0===i.length){this.config.isDebug&&s.A.debug("BytedeskWeb: 选中文本为空，隐藏提示"),this.hideFeedbackTooltip();return}if(i.length<3){this.config.isDebug&&s.A.debug("BytedeskWeb: 选中文本太短，忽略:",`"${i}"`),this.hideFeedbackTooltip();return}this.selectedText=i,this.lastSelectionText=i;try{let e=t.getRangeAt(0);this.lastSelectionRect=e.getBoundingClientRect(),this.config.isDebug&&s.A.debug("BytedeskWeb: 存储选中文本位置:",this.lastSelectionRect)}catch(e){this.config.isDebug&&s.A.warn("BytedeskWeb: 获取选中文本位置失败:",e),this.lastSelectionRect=null}this.config.isDebug&&s.A.debug("BytedeskWeb: 设置selectedText为:",`"${i}"`),this.config.feedbackConfig?.showOnSelection?(this.config.isDebug&&s.A.debug("BytedeskWeb: 配置允许显示选择提示，调用showFeedbackTooltip"),this.showFeedbackTooltip(this.lastMouseEvent||void 0)):this.config.isDebug&&(s.A.debug("BytedeskWeb: 配置不允许显示选择提示"),s.A.debug("BytedeskWeb: feedbackConfig.showOnSelection:",this.config.feedbackConfig?.showOnSelection))}createFeedbackTooltip(){if(this.config.isDebug&&s.A.debug("BytedeskWeb: createFeedbackTooltip被调用"),this.feedbackTooltip&&document.body.contains(this.feedbackTooltip)){this.config.isDebug&&s.A.debug("BytedeskWeb: 反馈提示框已存在且在DOM中，跳过创建");return}this.feedbackTooltip&&!document.body.contains(this.feedbackTooltip)&&(this.config.isDebug&&s.A.debug("BytedeskWeb: 提示框变量存在但不在DOM中，重置变量"),this.feedbackTooltip=null),this.feedbackTooltip=document.createElement("div"),this.feedbackTooltip.setAttribute("data-bytedesk-feedback","tooltip"),this.feedbackTooltip.style.cssText=`
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
    `;let e=this.config.feedbackConfig?.selectionText||"文档反馈";this.config.isDebug&&s.A.debug("BytedeskWeb: 提示框文本:",e),this.feedbackTooltip.innerHTML=`
      <span style="margin-right: 4px;">📝</span>
      ${e}
    `,this.feedbackTooltip.addEventListener("click",async e=>{this.config.isDebug&&(s.A.debug("BytedeskWeb: 反馈提示框被点击"),s.A.debug("BytedeskWeb: 点击时选中文字:",this.selectedText)),e.stopPropagation(),e.preventDefault();try{await this.showFeedbackDialog(),this.config.isDebug&&s.A.debug("BytedeskWeb: 对话框显示完成，现在隐藏提示框"),this.hideFeedbackTooltip()}catch(e){this.config.isDebug&&s.A.error("BytedeskWeb: 显示对话框时出错:",e)}}),document.body.appendChild(this.feedbackTooltip),this.config.isDebug&&(s.A.debug("BytedeskWeb: 反馈提示框已创建并添加到页面"),s.A.debug("BytedeskWeb: 提示框元素:",this.feedbackTooltip))}showFeedbackTooltip(e){let t;this.config.isDebug&&(s.A.debug("BytedeskWeb: showFeedbackTooltip被调用"),s.A.debug("BytedeskWeb: feedbackTooltip存在:",!!this.feedbackTooltip),s.A.debug("BytedeskWeb: selectedText存在:",!!this.selectedText));let i=this.feedbackTooltip&&document.body.contains(this.feedbackTooltip);if(this.config.isDebug&&s.A.debug("BytedeskWeb: feedbackTooltip在DOM中:",i),this.feedbackTooltip&&i||(this.config.isDebug&&s.A.debug("BytedeskWeb: 提示框不存在或已从DOM中移除，重新创建"),this.createFeedbackTooltip()),!this.feedbackTooltip||!this.selectedText){this.config.isDebug&&s.A.debug("BytedeskWeb: 提示框或选中文本不存在，退出显示");return}let n=window.getSelection();if(!n||0===n.rangeCount){this.config.isDebug&&s.A.debug("BytedeskWeb: 无有效选择，无法计算位置");return}let o=n.getRangeAt(0);try{let e=document.createRange();e.setStart(o.startContainer,o.startOffset);let i=o.startOffset,n=o.startContainer.textContent||"";if(o.startContainer.nodeType===Node.TEXT_NODE){for(;i<Math.min(n.length,o.endOffset);){let t=document.createRange();t.setStart(o.startContainer,o.startOffset),t.setEnd(o.startContainer,i+1);let n=t.getBoundingClientRect(),s=e.getBoundingClientRect();if(Math.abs(n.top-s.top)>5)break;i++}e.setEnd(o.startContainer,Math.max(i,o.startOffset+1)),t=e.getBoundingClientRect()}else t=o.getBoundingClientRect()}catch(e){this.config.isDebug&&s.A.debug("BytedeskWeb: 获取第一行位置失败，使用整个选择区域:",e),t=o.getBoundingClientRect()}this.config.isDebug&&s.A.debug("BytedeskWeb: 选中文本第一行位置信息:",{left:t.left,top:t.top,right:t.right,bottom:t.bottom,width:t.width,height:t.height});let a=t.left+5,l=t.top-40-15,d=window.innerWidth,r=window.innerHeight,h=window.scrollX,b=window.scrollY;a<10&&(a=10),a+120>d-10&&(a=d-120-10),l<b+10&&(l=t.bottom+15,this.config.isDebug&&s.A.debug("BytedeskWeb: 上方空间不足，调整为显示在选中文字第一行下方")),a+=h,l+=b,this.config.isDebug&&s.A.debug("BytedeskWeb: 最终提示框位置:",{x:a,y:l,说明:"显示在选中文字第一行左上角上方，增加间距避免遮挡",verticalOffset:15,horizontalOffset:5,选中区域:t,视口信息:{viewportWidth:d,viewportHeight:r,scrollX:h,scrollY:b}}),this.feedbackTooltip.style.position="absolute",this.feedbackTooltip.style.left=a+"px",this.feedbackTooltip.style.top=l+"px",this.feedbackTooltip.style.display="block",this.feedbackTooltip.style.visibility="visible",this.feedbackTooltip.style.opacity="0",this.feedbackTooltip.style.zIndex="999999",this.config.isDebug&&s.A.debug("BytedeskWeb: 提示框位置已设置，样式:",{position:this.feedbackTooltip.style.position,left:this.feedbackTooltip.style.left,top:this.feedbackTooltip.style.top,display:this.feedbackTooltip.style.display,visibility:this.feedbackTooltip.style.visibility,opacity:this.feedbackTooltip.style.opacity,zIndex:this.feedbackTooltip.style.zIndex}),this.isTooltipVisible=!0,setTimeout(()=>{this.feedbackTooltip&&this.isTooltipVisible&&(this.feedbackTooltip.style.opacity="1",this.config.isDebug&&s.A.debug("BytedeskWeb: 提示框透明度设置为1，应该可见了"))},10)}hideFeedbackTooltip(){let e=this.feedbackTooltip&&document.body.contains(this.feedbackTooltip);if(this.config.isDebug&&(s.A.debug("BytedeskWeb: hideFeedbackTooltip被调用"),s.A.debug("BytedeskWeb: feedbackTooltip存在:",!!this.feedbackTooltip),s.A.debug("BytedeskWeb: feedbackTooltip在DOM中:",e)),!this.feedbackTooltip||!e){this.isTooltipVisible=!1,this.lastSelectionText="",this.config.isDebug&&s.A.debug("BytedeskWeb: 提示框不存在或不在DOM中，仅重置状态");return}this.isTooltipVisible=!1,this.lastSelectionText="",this.feedbackTooltip.style.opacity="0",setTimeout(()=>{this.feedbackTooltip&&document.body.contains(this.feedbackTooltip)&&!this.isTooltipVisible?(this.feedbackTooltip.style.display="none",this.feedbackTooltip.style.visibility="hidden",this.config.isDebug&&s.A.debug("BytedeskWeb: 提示框已隐藏")):this.config.isDebug&&this.isTooltipVisible&&s.A.debug("BytedeskWeb: 跳过隐藏操作，提示框状态已改变为可见")},100)}createFeedbackDialog(){if(this.config.isDebug&&s.A.debug("BytedeskWeb: createFeedbackDialog被调用"),this.feedbackDialog&&document.body.contains(this.feedbackDialog)){this.config.isDebug&&s.A.debug("BytedeskWeb: 反馈对话框已存在且在DOM中，跳过创建");return}this.feedbackDialog&&!document.body.contains(this.feedbackDialog)&&(this.config.isDebug&&s.A.debug("BytedeskWeb: 对话框变量存在但不在DOM中，重置变量"),this.feedbackDialog=null),this.feedbackDialog=document.createElement("div"),this.feedbackDialog.setAttribute("data-bytedesk-feedback","dialog"),this.feedbackDialog.style.cssText=`
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
    `;let e=document.createElement("div");e.style.cssText=`
      background: white;
      border-radius: 12px;
      padding: 24px;
      width: 90%;
      max-width: 600px;
      max-height: 80vh;
      overflow-y: auto;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      position: relative;
    `,e.innerHTML=`
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
          ${this.config.feedbackConfig.categoryNames.map(e=>`
            <label style="
              display: flex;
              align-items: flex-start;
              gap: 8px;
              cursor: pointer;
              padding: 8px;
              border-radius: 4px;
              transition: background-color 0.2s;
            " onmouseover="this.style.backgroundColor='#f5f5f5'" onmouseout="this.style.backgroundColor='transparent'">
              <input type="checkbox" name="feedback-type" value="${e}" style="
                margin: 2px 0 0 0;
                cursor: pointer;
              ">
              <span style="
                font-size: 14px;
                line-height: 1.4;
                color: #333;
                flex: 1;
              ">${e}</span>
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
    `,e.addEventListener("click",e=>{switch(e.target.getAttribute("data-action")){case"close":case"cancel":this.hideFeedbackDialog(),this.config.feedbackConfig?.onCancel?.();break;case"submit":this.submitFeedback()}}),this.feedbackDialog.appendChild(e),this.feedbackDialog.addEventListener("click",e=>{e.target===this.feedbackDialog&&(this.hideFeedbackDialog(),this.config.feedbackConfig?.onCancel?.())}),document.addEventListener("keydown",e=>{"Escape"===e.key&&this.feedbackDialog?.style.display==="flex"&&(this.hideFeedbackDialog(),this.config.feedbackConfig?.onCancel?.())}),document.body.appendChild(this.feedbackDialog)}async showFeedbackDialog(){this.config.isDebug&&(s.A.debug("BytedeskWeb: showFeedbackDialog被调用"),s.A.debug("BytedeskWeb: feedbackDialog存在:",!!this.feedbackDialog));let e=this.feedbackDialog&&document.body.contains(this.feedbackDialog);if(this.config.isDebug&&s.A.debug("BytedeskWeb: feedbackDialog在DOM中:",e),this.feedbackDialog&&e||(this.config.isDebug&&s.A.debug("BytedeskWeb: 对话框不存在或已从DOM中移除，重新创建"),this.createFeedbackDialog()),!this.feedbackDialog){this.config.isDebug&&s.A.debug("BytedeskWeb: 对话框创建失败，退出显示");return}this.config.isDebug&&s.A.debug("BytedeskWeb: 开始填充对话框内容");let t=this.feedbackDialog.querySelector("#bytedesk-selected-text");t&&(t.textContent=this.selectedText||"",this.config.isDebug&&s.A.debug("BytedeskWeb: 已填充选中文字:",this.selectedText));let i=this.feedbackDialog.querySelector("#bytedesk-feedback-text");i&&(i.value=""),this.feedbackDialog.style.display="flex",this.config.isDebug&&(s.A.debug("BytedeskWeb: 对话框已设置为显示状态"),s.A.debug("BytedeskWeb: 对话框样式:",{display:this.feedbackDialog.style.display,visibility:this.feedbackDialog.style.visibility,zIndex:this.feedbackDialog.style.zIndex}));try{await this.generateScreenshotPreview(),this.config.isDebug&&s.A.debug("BytedeskWeb: 截图预览生成完成")}catch(e){this.config.isDebug&&s.A.error("BytedeskWeb: 截图预览生成失败:",e)}}hideFeedbackDialog(){this.feedbackDialog&&(this.feedbackDialog.style.display="none")}async generateAndUploadScreenshot(){try{let e,t=this.feedbackDialog?.screenshotCanvas;if(t)this.config.isDebug&&s.A.debug("BytedeskWeb: 使用已生成的截图canvas"),e=t;else{let t=await this.loadHtml2Canvas();if(!t)return this.config.isDebug&&s.A.debug("BytedeskWeb: html2canvas加载失败，跳过截图"),null;this.config.isDebug&&s.A.debug("BytedeskWeb: 重新生成截图");let i=this.calculateScreenshotArea();e=await t(document.body,{height:i.height,width:i.width,x:i.x,y:i.y,useCORS:!0,allowTaint:!0,backgroundColor:"#ffffff",scale:1,ignoreElements:e=>e.hasAttribute("data-bytedesk-feedback")||null!==e.closest("[data-bytedesk-feedback]")})}return new Promise(t=>{e.toBlob(async e=>{if(!e){s.A.error("无法生成截图blob"),t(null);return}try{let n=`screenshot_${Date.now()}.jpg`,o=new File([e],n,{type:"image/jpeg"});this.config.isDebug&&s.A.debug("BytedeskWeb: 截图生成成功，文件大小:",Math.round(e.size/1024),"KB");let{uploadScreenshot:a}=await Promise.all([i.e(384),i.e(897)]).then(i.bind(i,6897)),l=await a(o,{orgUid:this.config.chatConfig?.org||"",isDebug:this.config.isDebug});this.config.isDebug&&s.A.debug("BytedeskWeb: 截图上传成功，URL:",l),t(l)}catch(e){s.A.error("截图上传失败:",e),t(null)}},"image/jpeg",.8)})}catch(e){return s.A.error("生成截图失败:",e),null}}async generateScreenshotPreview(){let e=this.feedbackDialog?.querySelector("#bytedesk-screenshot-container");if(e)try{let t=await this.loadHtml2Canvas();if(!t){e.innerHTML=`
          <div style="color: #999; text-align: center; padding: 20px; flex-direction: column; gap: 8px; display: flex; align-items: center;">
            <div style="font-size: 24px;">📷</div>
            <div>截图功能暂时不可用</div>
            <div style="font-size: 12px; color: #666;">网络连接问题或资源加载失败</div>
          </div>
        `;return}e.innerHTML="正在生成截图预览...",this.config.isDebug&&s.A.debug("BytedeskWeb: 开始生成截图预览");let i=this.calculateScreenshotArea(),n=await t(document.body,{height:i.height,width:i.width,x:i.x,y:i.y,useCORS:!0,allowTaint:!0,backgroundColor:"#ffffff",scale:1,ignoreElements:e=>e.hasAttribute("data-bytedesk-feedback")||null!==e.closest("[data-bytedesk-feedback]")}),o=document.createElement("img");o.src=n.toDataURL("image/jpeg",.8),o.style.cssText=`
        max-width: 100%;
        max-height: 200px;
        border-radius: 4px;
        border: 1px solid #ddd;
        cursor: pointer;
      `,o.onclick=()=>{let e=document.createElement("img");e.src=o.src,e.style.cssText=`
          max-width: 90vw;
          max-height: 90vh;
          border-radius: 8px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        `;let t=document.createElement("div");t.style.cssText=`
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
        `;let i=document.createElement("div");i.style.cssText=`
          position: absolute;
          top: 20px;
          right: 20px;
          color: white;
          font-size: 14px;
          background: rgba(0,0,0,0.6);
          padding: 8px 12px;
          border-radius: 4px;
          user-select: none;
        `,i.textContent="点击任意位置关闭",t.appendChild(i),t.appendChild(e),t.onclick=()=>document.body.removeChild(t),document.body.appendChild(t)};let a=document.createElement("div");a.style.cssText=`
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
      `,a.appendChild(o);let l=document.createElement("div");l.style.cssText=`
        font-size: 12px;
        color: #666;
        text-align: center;
      `,l.innerHTML="点击图片可放大查看<br/>提交时将自动上传此截图",a.appendChild(l),e.innerHTML="",e.appendChild(a),this.feedbackDialog.screenshotCanvas=n,this.config.isDebug&&s.A.debug("BytedeskWeb: 截图预览生成成功")}catch(t){s.A.error("生成截图预览失败:",t),e.innerHTML=`
        <div style="color: #ff6b6b; text-align: center; flex-direction: column; gap: 8px; display: flex; align-items: center;">
          <div style="font-size: 24px;">⚠️</div>
          <div>截图预览生成失败</div>
          <div style="font-size: 12px; margin-top: 4px; color: #999;">请检查页面权限或网络连接</div>
        </div>
      `}}calculateScreenshotArea(){let e={height:window.innerHeight,width:window.innerWidth,x:0,y:0,scrollX:0,scrollY:0};try{let t=this.lastSelectionRect;if(!t){let e=window.getSelection();e&&e.rangeCount>0&&(t=e.getRangeAt(0).getBoundingClientRect())}if(t&&t.width>0&&t.height>0){let i=window.pageXOffset||document.documentElement.scrollLeft,n=window.pageYOffset||document.documentElement.scrollTop,o=t.left+i,a=t.top+n,l=Math.min(800,window.innerWidth),d=Math.min(600,window.innerHeight),r=o-l/2,h=a-d/2,b=document.documentElement.scrollWidth,c=document.documentElement.scrollHeight;r=Math.max(0,Math.min(r,b-l)),h=Math.max(0,Math.min(h,c-d)),e={height:d,width:l,x:r,y:h,scrollX:0,scrollY:0},this.config.isDebug&&s.A.debug("BytedeskWeb: 选中文本截图区域:",{selectedRect:t,absolutePosition:{left:o,top:a},captureArea:{x:r,y:h,width:l,height:d},pageSize:{width:b,height:c}})}else if(this.lastMouseEvent){let t=window.pageXOffset||document.documentElement.scrollLeft,i=window.pageYOffset||document.documentElement.scrollTop,n=this.lastMouseEvent.clientX+t,o=this.lastMouseEvent.clientY+i,a=Math.min(800,window.innerWidth),l=Math.min(600,window.innerHeight),d=n-a/2,r=o-l/2,h=document.documentElement.scrollWidth,b=document.documentElement.scrollHeight;d=Math.max(0,Math.min(d,h-a)),r=Math.max(0,Math.min(r,b-l)),e={height:l,width:a,x:d,y:r,scrollX:0,scrollY:0},this.config.isDebug&&s.A.debug("BytedeskWeb: 鼠标位置截图区域:",{mousePosition:{x:this.lastMouseEvent.clientX,y:this.lastMouseEvent.clientY},absolutePosition:{x:n,y:o},captureArea:{x:d,y:r,width:a,height:l}})}}catch(e){this.config.isDebug&&s.A.warn("BytedeskWeb: 计算截图区域失败，使用默认区域:",e)}return e}async loadHtml2Canvas(){try{if(window.html2canvas)return window.html2canvas;return await this.loadHtml2CanvasFromCDN()}catch(e){return this.config.isDebug&&s.A.warn("html2canvas 加载失败:",e),null}}async loadHtml2CanvasFromCDN(){return new Promise((e,t)=>{if(window.html2canvas)return void e(window.html2canvas);let i=document.createElement("script");i.src=this.config.apiUrl+"/assets/js/html2canvas.min.js",i.onload=()=>{window.html2canvas?e(window.html2canvas):t(Error("html2canvas 加载失败"))},i.onerror=()=>{t(Error("无法从CDN加载html2canvas"))},document.head.appendChild(i)})}async submitFeedback(){let e=this.feedbackDialog?.querySelector("#bytedesk-feedback-text"),t=e?.value.trim()||"";if(!t){alert("请填写反馈内容"),e?.focus();return}let i=[],n=this.feedbackDialog?.querySelectorAll('input[name="feedback-type"]:checked');if(n&&n.forEach(e=>{i.push(e.value)}),this.config.feedbackConfig?.requiredTypes&&0===i.length)return void alert("请至少选择一个问题类型");let o=this.feedbackDialog?.querySelector(".bytedesk-feedback-submit"),a=o?.textContent||"提交反馈";o&&(o.disabled=!0,o.textContent="提交中...",o.style.opacity="0.6");try{let e=this.feedbackDialog?.querySelector("#bytedesk-submit-screenshot"),n=e?.checked!==!1,a=[];if(n){this.config.isDebug&&s.A.debug("BytedeskWeb: 开始生成和上传截图"),o&&(o.textContent="正在生成截图...");let e=await this.generateAndUploadScreenshot();e&&(a.push(e),this.config.isDebug&&s.A.debug("BytedeskWeb: 截图上传成功:",e)),o&&(o.textContent="正在提交反馈...")}let l={selectedText:this.selectedText,...a.length>0&&{images:a},content:t,url:window.location.href,title:document.title,userAgent:navigator.userAgent,visitorUid:localStorage.getItem("bytedesk_uid")||"",orgUid:this.config.chatConfig?.org||"",...i.length>0&&{categoryNames:i.join(",")}};this.config.feedbackConfig?.onSubmit?this.config.feedbackConfig.onSubmit(l):await this.submitFeedbackToServer(l),this.showFeedbackSuccess(),setTimeout(()=>{this.hideFeedbackDialog()},2e3)}catch(e){s.A.error("提交反馈失败:",e),alert("提交失败，请稍后重试")}finally{o&&(o.disabled=!1,o.textContent=a,o.style.opacity="1")}}async submitFeedbackToServer(e){try{let{submitFeedback:t}=await Promise.all([i.e(384),i.e(543)]).then(i.bind(i,5543)),n=await t(e);return this.config.isDebug&&s.A.debug("反馈提交响应:",n),n}catch(e){throw s.A.error("提交反馈到服务器失败:",e),e}}showFeedbackSuccess(){if(!this.feedbackDialog)return;let e=this.feedbackDialog.querySelector("div > div");e&&(e.innerHTML=`
      <div style="text-align: center; padding: 40px 20px;">
        <div style="font-size: 48px; margin-bottom: 16px;">✅</div>
        <h3 style="margin: 0 0 12px 0; color: #28a745;">
          ${this.config.feedbackConfig?.successMessage||"反馈已提交，感谢您的意见！"}
        </h3>
        <div style="color: #666; font-size: 14px;">
          我们会认真处理您的反馈，不断改进产品体验
        </div>
      </div>
    `)}showDocumentFeedback(e){this.config.feedbackConfig?.enabled?(e&&(this.selectedText=e),this.showFeedbackDialog()):s.A.warn("文档反馈功能未启用")}reinitFeedbackFeature(){this.config.isDebug&&s.A.debug("BytedeskWeb: 重新初始化反馈功能"),this.destroyFeedbackFeature(),this.initFeedbackFeature()}forceInitFeedbackFeature(){return s.A.debug("BytedeskWeb: 强制初始化反馈功能被调用"),s.A.debug("BytedeskWeb: 当前配置:",this.config.feedbackConfig),s.A.debug("BytedeskWeb: isDebug:",this.config.isDebug),this.config.feedbackConfig||(s.A.debug("BytedeskWeb: 创建默认反馈配置"),this.config.feedbackConfig={enabled:!0,trigger:"selection",showOnSelection:!0,selectionText:"\uD83D\uDCDD 文档反馈",dialogTitle:"提交意见反馈",placeholder:"请详细描述您发现的问题、改进建议或其他意见...",submitText:"提交反馈",cancelText:"取消",successMessage:"感谢您的反馈！我们会认真处理您的意见。"}),this.config.feedbackConfig.enabled||(s.A.debug("BytedeskWeb: 启用反馈配置"),this.config.feedbackConfig.enabled=!0),s.A.debug("BytedeskWeb: 销毁现有反馈功能"),this.destroyFeedbackFeature(),s.A.debug("BytedeskWeb: 重新初始化反馈功能"),this.initFeedbackFeature(),s.A.debug("BytedeskWeb: 强制初始化完成，检查结果:"),s.A.debug("- showDocumentFeedback方法存在:","function"==typeof this.showDocumentFeedback),s.A.debug("- testTextSelection方法存在:","function"==typeof this.testTextSelection),s.A.debug("- 反馈提示框存在:",!!this.feedbackTooltip),s.A.debug("- 反馈对话框存在:",!!this.feedbackDialog),s.A.debug("- 反馈提示框DOM存在:",!!document.querySelector('[data-bytedesk-feedback="tooltip"]')),s.A.debug("- 反馈对话框DOM存在:",!!document.querySelector('[data-bytedesk-feedback="dialog"]')),{success:!!(this.feedbackTooltip&&this.feedbackDialog),methods:{showDocumentFeedback:"function"==typeof this.showDocumentFeedback,testTextSelection:"function"==typeof this.testTextSelection},elements:{tooltip:!!this.feedbackTooltip,dialog:!!this.feedbackDialog,tooltipDOM:!!document.querySelector('[data-bytedesk-feedback="tooltip"]'),dialogDOM:!!document.querySelector('[data-bytedesk-feedback="dialog"]')}}}testTextSelection(e="测试选中文字"){this.config.isDebug&&s.A.debug("BytedeskWeb: 测试文本选择功能，模拟选中文字:",`"${e}"`),this.selectedText=e;try{let t=document.createElement("div");t.textContent=e,t.style.cssText=`
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
      `,document.body.appendChild(t);let i=document.createRange();i.selectNodeContents(t);let n=window.getSelection();n&&(n.removeAllRanges(),n.addRange(i),this.config.isDebug&&s.A.debug("BytedeskWeb: 已创建模拟文本选择"),this.feedbackTooltip?this.showFeedbackTooltip():s.A.error("BytedeskWeb: 反馈提示框不存在，无法测试"),setTimeout(()=>{n&&n.removeAllRanges(),document.body.contains(t)&&document.body.removeChild(t),this.hideFeedbackTooltip()},5e3))}catch(e){s.A.error("BytedeskWeb: 创建测试选择失败:",e)}}getDebugInfo(){return{config:this.config,feedbackConfig:this.config.feedbackConfig,feedbackTooltip:!!this.feedbackTooltip,feedbackDialog:!!this.feedbackDialog,selectedText:this.selectedText,methods:{showDocumentFeedback:typeof this.showDocumentFeedback,testTextSelection:typeof this.testTextSelection,forceInitFeedbackFeature:typeof this.forceInitFeedbackFeature}}}destroyFeedbackFeature(){this.feedbackTooltip&&(this.feedbackTooltip.remove(),this.feedbackTooltip=null),this.feedbackDialog&&(this.feedbackDialog.remove(),this.feedbackDialog=null),this.selectedText=""}}let l=a}}]);