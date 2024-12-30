var BytedeskWeb=function(){"use strict";var g=Object.defineProperty;var u=(h,d,t)=>d in h?g(h,d,{enumerable:!0,configurable:!0,writable:!0,value:t}):h[d]=t;var f=(h,d,t)=>u(h,typeof d!="symbol"?d+"":d,t);class h{constructor(t){f(this,"config");f(this,"bubble",null);f(this,"window",null);f(this,"isVisible",!1);f(this,"isDragging",!1);f(this,"windowState","normal");this.config={...this.getDefaultConfig(),...t}}getDefaultConfig(){return{preset:"default",placement:"bottom-right",marginBottom:20,marginSide:20,tabsConfig:{home:!1,messages:!0,help:!1,news:!1},bubbleConfig:{show:!0,icon:"👋",title:"需要帮助吗？",subtitle:"点击开始对话"},showSupport:!0,chatParams:{org:"df_org_uid",t:"2",sid:"df_rt_uid"},navbarPreset:"light",customColor:"#000000",navbarColor:"#ffffff",navbarTextColor:"#333333",margins:{bottom:20,right:20,left:20},animation:{enabled:!0,duration:300,type:"ease"},theme:{primaryColor:"#2e88ff",secondaryColor:"#ffffff",textColor:"#333333",backgroundColor:"#ffffff",position:"right",navbar:{backgroundColor:"#ffffff",textColor:"#333333"}},window:{title:"在线客服",width:380,height:640,position:"right"}}}init(){this.createBubble(),this.setupMessageListener(),this.setupResizeListener()}createBubble(){const t=document.createElement("div");if(t.style.cssText=`
      position: fixed;
      ${this.config.theme.position==="left"?"left":"right"}: ${this.config.marginSide}px;
      bottom: ${this.config.marginBottom}px;
      display: flex;
      flex-direction: column;
      align-items: ${this.config.theme.position==="left"?"flex-start":"flex-end"};
      gap: 10px;
      z-index: 9999;
    `,this.config.bubbleConfig.show){const i=document.createElement("div");i.style.cssText=`
        background: white;
        padding: 12px 16px;
        border-radius: 8px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
        max-width: 220px;
        margin-bottom: 8px;
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.3s ease;
      `;const a=document.createElement("div");a.style.cssText=`
        display: flex;
        align-items: center;
        gap: 8px;
      `;const b=document.createElement("span");b.textContent=this.config.bubbleConfig.icon,b.style.fontSize="20px",a.appendChild(b);const c=document.createElement("div"),m=document.createElement("div");m.textContent=this.config.bubbleConfig.title,m.style.fontWeight="bold",m.style.marginBottom="4px",c.appendChild(m);const w=document.createElement("div");w.textContent=this.config.bubbleConfig.subtitle,w.style.fontSize="0.9em",w.style.opacity="0.8",c.appendChild(w),a.appendChild(c),i.appendChild(a),t.appendChild(i),setTimeout(()=>{i.style.opacity="1",i.style.transform="translateY(0)"},500)}this.bubble=document.createElement("button"),this.bubble.style.cssText=`
      background-color: ${this.config.theme.primaryColor};
      width: 60px;
      height: 60px;
      border-radius: 30px;
      border: none;
      cursor: move;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
      transition: all 0.3s ease;
      outline: none;
      position: relative;
      user-select: none;
    `;const e=document.createElement("div");e.innerHTML=`
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.663 3.04094 17.0829 4.73812 18.875L2.72681 21.1705C2.44361 21.4937 2.67314 22 3.10288 22H12Z" 
              fill="white"/>
      </svg>
    `,e.style.cssText=`
      display: flex;
      align-items: center;
      justify-content: center;
    `,this.bubble.appendChild(e),this.bubble.addEventListener("mouseenter",()=>{this.bubble.style.transform="scale(1.1)"}),this.bubble.addEventListener("mouseleave",()=>{this.bubble.style.transform="scale(1)"}),t.appendChild(this.bubble);let n=0,o=0,s=0,r=0;this.bubble.addEventListener("mousedown",i=>{i.button===0&&(this.isDragging=!0,n=i.clientX,o=i.clientY,s=t.offsetLeft,r=t.offsetTop,t.style.transition="none")}),document.addEventListener("mousemove",i=>{if(!this.isDragging)return;i.preventDefault();const a=i.clientX-n,b=i.clientY-o,c=s+a,m=r+b,w=window.innerHeight-t.offsetHeight;c<=window.innerWidth/2?(t.style.left=`${Math.max(0,c)}px`,t.style.right="auto",this.config.theme.position="left"):(t.style.right=`${Math.max(0,window.innerWidth-c-t.offsetWidth)}px`,t.style.left="auto",this.config.theme.position="right"),t.style.bottom=`${Math.min(Math.max(0,window.innerHeight-m-t.offsetHeight),w)}px`}),document.addEventListener("mouseup",()=>{this.isDragging&&(this.isDragging=!1,t.style.transition="all 0.3s ease",this.config.marginSide=parseInt(this.config.theme.position==="left"?t.style.left:t.style.right)||20,this.config.marginBottom=parseInt(t.style.bottom||"20"))});let l=!0;this.bubble.addEventListener("mousedown",()=>{l=!0}),this.bubble.addEventListener("mousemove",()=>{l=!1}),this.bubble.addEventListener("click",()=>{l&&this.showChat()}),document.body.appendChild(t)}createChatWindow(){this.window=document.createElement("div");const t=window.innerWidth<=768,e=window.innerWidth,n=window.innerHeight,o=Math.min(this.config.window.width,e*.9),s=Math.min(this.config.window.height,n*.9);if(t)this.window.style.cssText=`
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 90vh;
        background: ${this.config.theme.backgroundColor};
        display: none;
        z-index: 10000;
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
        overflow: hidden;
        transition: all ${this.config.animation.duration}ms ${this.config.animation.type};
      `;else{const l=this.config.theme.position||"right";this.window.style.cssText=`
        position: fixed;
        ${l}: ${this.config.marginSide}px;
        bottom: ${this.config.marginBottom}px;
        width: ${o}px;
        height: ${s}px;
        background: ${this.config.theme.backgroundColor};
        border-radius: 12px;
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
        display: none;
        overflow: hidden;
        z-index: 10000;
        transition: all ${this.config.animation.duration}ms ${this.config.animation.type};
      `}const r=document.createElement("iframe");r.style.cssText=`
      width: 100%;
      height: 100%;
      border: none;
      background: ${this.config.theme.backgroundColor};
    `,r.src=this.generateChatUrl(),this.window.appendChild(r),document.body.appendChild(this.window)}generateChatUrl(t="messages"){const e="http://127.0.0.1:9006",n=new URLSearchParams;return n.append("tab",t),n.append("theme",JSON.stringify(this.config.theme)),n.append("window",JSON.stringify(this.config.window)),Object.entries(this.config.chatParams).forEach(([o,s])=>{n.append(o,String(s))}),`${e}?${n.toString()}`}setupMessageListener(){window.addEventListener("message",t=>{switch(t.data.type){case"CLOSE_CHAT_WINDOW":this.hideChat();break;case"MAXIMIZE_WINDOW":this.toggleMaximize();break;case"MINIMIZE_WINDOW":this.minimizeWindow();break}})}showChat(){if(this.window||this.createChatWindow(),this.window){const t=window.innerWidth<=768;this.window.style.display="block",this.setupResizeListener(),t&&this.window&&(this.window.style.transform="translateY(100%)",requestAnimationFrame(()=>{this.window&&(this.window.style.transform="translateY(0)")})),this.isVisible=!0,this.bubble&&(this.bubble.style.display="none")}}hideChat(){this.window&&(window.innerWidth<=768?(this.window.style.transform="translateY(100%)",setTimeout(()=>{this.window&&(this.window.style.display="none")},this.config.animation.duration)):this.window.style.display="none",this.isVisible=!1,this.bubble&&(this.bubble.style.display="inline-flex"))}minimizeWindow(){this.window&&(this.windowState="minimized",this.window.style.display="none")}toggleMaximize(){!this.window||window.innerWidth<=768||(this.windowState=this.windowState==="maximized"?"normal":"maximized",this.setupResizeListener())}setupResizeListener(){const t=()=>{if(!this.window||!this.isVisible)return;const n=window.innerWidth<=768,o=window.innerWidth,s=window.innerHeight;if(n)Object.assign(this.window.style,{left:"0",bottom:"0",width:"100%",height:"90vh",borderTopLeftRadius:"12px",borderTopRightRadius:"12px",borderBottomLeftRadius:"0",borderBottomRightRadius:"0"});else{let r=this.windowState==="maximized"?o:Math.min(this.config.window.width,o*.9),l=this.windowState==="maximized"?s:Math.min(this.config.window.height,s*.9);const i=this.config.window.position==="right"?this.config.marginSide:void 0,a=this.config.window.position==="left"?this.config.marginSide:void 0;Object.assign(this.window.style,{width:`${r}px`,height:`${l}px`,right:i?`${i}px`:"auto",left:a?`${a}px`:"auto",bottom:`${this.config.marginBottom}px`,borderRadius:this.windowState==="maximized"?"0":"12px"})}};let e;window.addEventListener("resize",()=>{clearTimeout(e),e=window.setTimeout(t,100)}),t()}destroy(){var e;const t=(e=this.bubble)==null?void 0:e.parentElement;t&&document.body.contains(t)&&(document.body.removeChild(t),this.bubble=null),this.window&&document.body.contains(this.window)&&(document.body.removeChild(this.window),this.window=null),window.removeEventListener("resize",this.setupResizeListener.bind(this))}}return h}();
