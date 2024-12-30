var g = Object.defineProperty;
var b = (c, t, i) => t in c ? g(c, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : c[t] = i;
var l = (c, t, i) => b(c, typeof t != "symbol" ? t + "" : t, i);
class u {
  constructor(t) {
    l(this, "config");
    l(this, "bubble", null);
    l(this, "window", null);
    l(this, "isVisible", !1);
    l(this, "isDragging", !1);
    l(this, "windowState", "normal");
    this.config = {
      ...this.getDefaultConfig(),
      ...t
    };
  }
  getDefaultConfig() {
    return {
      preset: "default",
      placement: "bottom-right",
      marginBottom: 20,
      marginSide: 20,
      tabsConfig: {
        home: !1,
        messages: !0,
        help: !1,
        news: !1
      },
      bubbleConfig: {
        show: !0,
        icon: "👋",
        title: "需要帮助吗？",
        subtitle: "点击开始对话"
      },
      showSupport: !0,
      chatParams: {
        org: "df_org_uid",
        t: "2",
        sid: "df_rt_uid"
      },
      navbarPreset: "light",
      customColor: "#000000",
      navbarColor: "#ffffff",
      navbarTextColor: "#333333",
      margins: {
        bottom: 20,
        right: 20,
        left: 20
      },
      animation: {
        enabled: !0,
        duration: 300,
        type: "ease"
      },
      theme: {
        primaryColor: "#2e88ff",
        secondaryColor: "#ffffff",
        textColor: "#333333",
        backgroundColor: "#ffffff",
        position: "right",
        navbar: {
          backgroundColor: "#ffffff",
          textColor: "#333333"
        }
      },
      window: {
        title: "在线客服",
        width: 380,
        height: 640,
        position: "right"
      }
    };
  }
  init() {
    this.createBubble(), this.setupMessageListener(), this.setupResizeListener();
  }
  createBubble() {
    const t = document.createElement("div");
    if (t.style.cssText = `
      position: fixed;
      ${this.config.theme.position === "left" ? "left" : "right"}: ${this.config.marginSide}px;
      bottom: ${this.config.marginBottom}px;
      display: flex;
      flex-direction: column;
      align-items: ${this.config.theme.position === "left" ? "flex-start" : "flex-end"};
      gap: 10px;
      z-index: 9999;
    `, this.config.bubbleConfig.show) {
      const e = document.createElement("div");
      e.style.cssText = `
        background: white;
        padding: 12px 16px;
        border-radius: 8px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
        max-width: 220px;
        margin-bottom: 8px;
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.3s ease;
      `;
      const a = document.createElement("div");
      a.style.cssText = `
        display: flex;
        align-items: center;
        gap: 8px;
      `;
      const w = document.createElement("span");
      w.textContent = this.config.bubbleConfig.icon, w.style.fontSize = "20px", a.appendChild(w);
      const h = document.createElement("div"), f = document.createElement("div");
      f.textContent = this.config.bubbleConfig.title, f.style.fontWeight = "bold", f.style.marginBottom = "4px", h.appendChild(f);
      const m = document.createElement("div");
      m.textContent = this.config.bubbleConfig.subtitle, m.style.fontSize = "0.9em", m.style.opacity = "0.8", h.appendChild(m), a.appendChild(h), e.appendChild(a), t.appendChild(e), setTimeout(() => {
        e.style.opacity = "1", e.style.transform = "translateY(0)";
      }, 500);
    }
    this.bubble = document.createElement("button"), this.bubble.style.cssText = `
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
    `;
    const i = document.createElement("div");
    i.innerHTML = `
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.663 3.04094 17.0829 4.73812 18.875L2.72681 21.1705C2.44361 21.4937 2.67314 22 3.10288 22H12Z" 
              fill="white"/>
      </svg>
    `, i.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: center;
    `, this.bubble.appendChild(i), this.bubble.addEventListener("mouseenter", () => {
      this.bubble.style.transform = "scale(1.1)";
    }), this.bubble.addEventListener("mouseleave", () => {
      this.bubble.style.transform = "scale(1)";
    }), t.appendChild(this.bubble);
    let n = 0, o = 0, s = 0, d = 0;
    this.bubble.addEventListener("mousedown", (e) => {
      e.button === 0 && (this.isDragging = !0, n = e.clientX, o = e.clientY, s = t.offsetLeft, d = t.offsetTop, t.style.transition = "none");
    }), document.addEventListener("mousemove", (e) => {
      if (!this.isDragging) return;
      e.preventDefault();
      const a = e.clientX - n, w = e.clientY - o, h = s + a, f = d + w, m = window.innerHeight - t.offsetHeight;
      h <= window.innerWidth / 2 ? (t.style.left = `${Math.max(0, h)}px`, t.style.right = "auto", this.config.theme.position = "left") : (t.style.right = `${Math.max(0, window.innerWidth - h - t.offsetWidth)}px`, t.style.left = "auto", this.config.theme.position = "right"), t.style.bottom = `${Math.min(Math.max(0, window.innerHeight - f - t.offsetHeight), m)}px`;
    }), document.addEventListener("mouseup", () => {
      this.isDragging && (this.isDragging = !1, t.style.transition = "all 0.3s ease", this.config.marginSide = parseInt(
        this.config.theme.position === "left" ? t.style.left : t.style.right
      ) || 20, this.config.marginBottom = parseInt(t.style.bottom || "20"));
    });
    let r = !0;
    this.bubble.addEventListener("mousedown", () => {
      r = !0;
    }), this.bubble.addEventListener("mousemove", () => {
      r = !1;
    }), this.bubble.addEventListener("click", () => {
      r && this.showChat();
    }), document.body.appendChild(t);
  }
  createChatWindow() {
    this.window = document.createElement("div");
    const t = window.innerWidth <= 768, i = window.innerWidth, n = window.innerHeight, o = Math.min(this.config.window.width, i * 0.9), s = Math.min(this.config.window.height, n * 0.9);
    if (t)
      this.window.style.cssText = `
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
      `;
    else {
      const r = this.config.theme.position || "right";
      this.window.style.cssText = `
        position: fixed;
        ${r}: ${this.config.marginSide}px;
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
      `;
    }
    const d = document.createElement("iframe");
    d.style.cssText = `
      width: 100%;
      height: 100%;
      border: none;
      background: ${this.config.theme.backgroundColor};
    `, d.src = this.generateChatUrl(), this.window.appendChild(d), document.body.appendChild(this.window);
  }
  generateChatUrl(t = "messages") {
    const i = "http://127.0.0.1:9006", n = new URLSearchParams();
    return n.append("tab", t), n.append("theme", JSON.stringify(this.config.theme)), n.append("window", JSON.stringify(this.config.window)), Object.entries(this.config.chatParams).forEach(([o, s]) => {
      n.append(o, String(s));
    }), `${i}?${n.toString()}`;
  }
  setupMessageListener() {
    window.addEventListener("message", (t) => {
      switch (t.data.type) {
        case "CLOSE_CHAT_WINDOW":
          this.hideChat();
          break;
        case "MAXIMIZE_WINDOW":
          this.toggleMaximize();
          break;
        case "MINIMIZE_WINDOW":
          this.minimizeWindow();
          break;
      }
    });
  }
  showChat() {
    if (this.window || this.createChatWindow(), this.window) {
      const t = window.innerWidth <= 768;
      this.window.style.display = "block", this.setupResizeListener(), t && this.window && (this.window.style.transform = "translateY(100%)", requestAnimationFrame(() => {
        this.window && (this.window.style.transform = "translateY(0)");
      })), this.isVisible = !0, this.bubble && (this.bubble.style.display = "none");
    }
  }
  hideChat() {
    this.window && (window.innerWidth <= 768 ? (this.window.style.transform = "translateY(100%)", setTimeout(() => {
      this.window && (this.window.style.display = "none");
    }, this.config.animation.duration)) : this.window.style.display = "none", this.isVisible = !1, this.bubble && (this.bubble.style.display = "inline-flex"));
  }
  minimizeWindow() {
    this.window && (this.windowState = "minimized", this.window.style.display = "none");
  }
  toggleMaximize() {
    !this.window || window.innerWidth <= 768 || (this.windowState = this.windowState === "maximized" ? "normal" : "maximized", this.setupResizeListener());
  }
  setupResizeListener() {
    const t = () => {
      if (!this.window || !this.isVisible) return;
      const n = window.innerWidth <= 768, o = window.innerWidth, s = window.innerHeight;
      if (n)
        Object.assign(this.window.style, {
          left: "0",
          bottom: "0",
          width: "100%",
          height: "90vh",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
          borderBottomLeftRadius: "0",
          borderBottomRightRadius: "0"
        });
      else {
        let d = this.windowState === "maximized" ? o : Math.min(this.config.window.width, o * 0.9), r = this.windowState === "maximized" ? s : Math.min(this.config.window.height, s * 0.9);
        const e = this.config.window.position === "right" ? this.config.marginSide : void 0, a = this.config.window.position === "left" ? this.config.marginSide : void 0;
        Object.assign(this.window.style, {
          width: `${d}px`,
          height: `${r}px`,
          right: e ? `${e}px` : "auto",
          left: a ? `${a}px` : "auto",
          bottom: `${this.config.marginBottom}px`,
          borderRadius: this.windowState === "maximized" ? "0" : "12px"
        });
      }
    };
    let i;
    window.addEventListener("resize", () => {
      clearTimeout(i), i = window.setTimeout(t, 100);
    }), t();
  }
  destroy() {
    var i;
    const t = (i = this.bubble) == null ? void 0 : i.parentElement;
    t && document.body.contains(t) && (document.body.removeChild(t), this.bubble = null), this.window && document.body.contains(this.window) && (document.body.removeChild(this.window), this.window = null), window.removeEventListener("resize", this.setupResizeListener.bind(this));
  }
}
export {
  u as default
};
