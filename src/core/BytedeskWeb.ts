import type { BytedeskConfig } from '../types';

export default class BytedeskWeb {
  private config: BytedeskConfig;
  private bubble: HTMLElement | null = null;
  private window: HTMLElement | null = null;
  private isVisible: boolean = false;
  private isDragging: boolean = false;
  private windowState: 'minimized' | 'maximized' | 'normal' = 'normal';

  constructor(config: BytedeskConfig) {
    this.config = {
      ...this.getDefaultConfig(),
      ...config
    };
  }

  private getDefaultConfig(): BytedeskConfig {
    return {
      preset: 'default',
      placement: 'bottom-right',
      marginBottom: 20,
      marginSide: 20,
      tabsConfig: {
        home: false,
        messages: true,
        help: false,
        news: false
      },
      bubbleConfig: {
        show: true,
        icon: '👋',
        title: '需要帮助吗？',
        subtitle: '点击开始对话'
      },
      showSupport: true,
      chatParams: {
        org: 'df_org_uid',
        t: "2",
        sid: 'df_rt_uid'
      },
      navbarPreset: 'light',
      customColor: '#000000',
      navbarColor: '#ffffff',
      navbarTextColor: '#333333',
      margins: {
        bottom: 20,
        right: 20,
        left: 20
      },
      animation: {
        enabled: true,
        duration: 300,
        type: 'ease'
      },
      theme: {
        primaryColor: '#2e88ff',
        secondaryColor: '#ffffff',
        textColor: '#333333',
        backgroundColor: '#ffffff',
        position: 'right',
        navbar: {
          backgroundColor: '#ffffff',
          textColor: '#333333'
        }
      },
      window: {
        title: '在线客服',
        width: 380,
        height: 640,
        position: 'right'
      }
    } as BytedeskConfig;
  }

  init() {
    this.createBubble();
    this.setupMessageListener();
    this.setupResizeListener();
  }

  private createBubble() {
    // 创建气泡容器
    const container = document.createElement('div');
    container.style.cssText = `
      position: fixed;
      ${this.config.theme.position === 'left' ? 'left' : 'right'}: ${this.config.marginSide}px;
      bottom: ${this.config.marginBottom}px;
      display: flex;
      flex-direction: column;
      align-items: ${this.config.theme.position === 'left' ? 'flex-start' : 'flex-end'};
      gap: 10px;
      z-index: 9999;
    `;

    // 创建气泡消息
    if (this.config.bubbleConfig.show) {
      const message = document.createElement('div');
      message.style.cssText = `
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

      // 添加图标和文本
      const messageContent = document.createElement('div');
      messageContent.style.cssText = `
        display: flex;
        align-items: center;
        gap: 8px;
      `;

      const iconSpan = document.createElement('span');
      iconSpan.textContent = this.config.bubbleConfig.icon;
      iconSpan.style.fontSize = '20px';
      messageContent.appendChild(iconSpan);

      const textDiv = document.createElement('div');
      const title = document.createElement('div');
      title.textContent = this.config.bubbleConfig.title;
      title.style.fontWeight = 'bold';
      title.style.marginBottom = '4px';
      textDiv.appendChild(title);

      const subtitle = document.createElement('div');
      subtitle.textContent = this.config.bubbleConfig.subtitle;
      subtitle.style.fontSize = '0.9em';
      subtitle.style.opacity = '0.8';
      textDiv.appendChild(subtitle);

      messageContent.appendChild(textDiv);
      message.appendChild(messageContent);
      container.appendChild(message);

      // 显示动画
      setTimeout(() => {
        message.style.opacity = '1';
        message.style.transform = 'translateY(0)';
      }, 500);
    }

    // 创建按钮
    this.bubble = document.createElement('button');
    this.bubble.style.cssText = `
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

    // 添加气泡图标
    const bubbleIcon = document.createElement('div');
    bubbleIcon.innerHTML = `
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.663 3.04094 17.0829 4.73812 18.875L2.72681 21.1705C2.44361 21.4937 2.67314 22 3.10288 22H12Z" 
              fill="white"/>
      </svg>
    `;
    bubbleIcon.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: center;
    `;

    this.bubble.appendChild(bubbleIcon);

    // 添加悬停效果
    this.bubble!.addEventListener('mouseenter', () => {
      this.bubble!.style.transform = 'scale(1.1)';
    });
    this.bubble!.addEventListener('mouseleave', () => {
      this.bubble!.style.transform = 'scale(1)';
    });

    // 先将按钮添加到容器
    container.appendChild(this.bubble);

    // 添加拖动功能
    let startX = 0;
    let startY = 0;
    let initialX = 0;
    let initialY = 0;

    this.bubble.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      this.isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      initialX = container.offsetLeft;
      initialY = container.offsetTop;

      container.style.transition = 'none';
    });

    document.addEventListener('mousemove', (e) => {
      if (!this.isDragging) return;

      e.preventDefault();
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;

      const newX = initialX + dx;
      const newY = initialY + dy;

      // 限制在视窗范围内
    //   const maxX = window.innerWidth - container.offsetWidth;
      const maxY = window.innerHeight - container.offsetHeight;

      // 更新水平位置
      if (newX <= window.innerWidth / 2) {
        // 靠左
        container.style.left = `${Math.max(0, newX)}px`;
        container.style.right = 'auto';
        this.config.theme.position = 'left';
      } else {
        // 靠右
        container.style.right = `${Math.max(0, window.innerWidth - newX - container.offsetWidth)}px`;
        container.style.left = 'auto';
        this.config.theme.position = 'right';
      }

      // 更新垂直位置
      container.style.bottom = `${Math.min(Math.max(0, window.innerHeight - newY - container.offsetHeight), maxY)}px`;
    });

    document.addEventListener('mouseup', () => {
      if (!this.isDragging) return;
      this.isDragging = false;

      // 恢复过渡动画
      container.style.transition = 'all 0.3s ease';

      // 保存新位置
      this.config.marginSide = parseInt(
        this.config.theme.position === 'left' 
          ? container.style.left 
          : container.style.right
      ) || 20;
      this.config.marginBottom = parseInt(container.style.bottom || '20');
    });

    // 修改点击事件，只在非拖动时触发
    let isClick = true;
    this.bubble.addEventListener('mousedown', () => {
      isClick = true;
    });

    this.bubble.addEventListener('mousemove', () => {
      isClick = false;
    });

    this.bubble.addEventListener('click', () => {
      if (isClick) {
        this.showChat();
      }
    });

    // 最后将容器添加到 body
    document.body.appendChild(container);
  }

  private createChatWindow() {
    this.window = document.createElement('div');
    const isMobile = window.innerWidth <= 768;
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;
    
    // 计算合适的窗口尺寸
    const width = Math.min(this.config.window.width, maxWidth * 0.9);
    const height = Math.min(this.config.window.height, maxHeight * 0.9);
    
    // 移动端样式
    if (isMobile) {
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
    } else {
      // 桌面端样式 - 使用与按钮相同的边距
      const position = this.config.theme.position || 'right';
      this.window.style.cssText = `
        position: fixed;
        ${position}: ${this.config.marginSide}px;
        bottom: ${this.config.marginBottom}px;
        width: ${width}px;
        height: ${height}px;
        background: ${this.config.theme.backgroundColor};
        border-radius: 12px;
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
        display: none;
        overflow: hidden;
        z-index: 10000;
        transition: all ${this.config.animation.duration}ms ${this.config.animation.type};
      `;
    }

    // 创建聊天界面
    const iframe = document.createElement('iframe');
    iframe.style.cssText = `
      width: 100%;
      height: 100%;
      border: none;
      background: ${this.config.theme.backgroundColor};
    `;
    iframe.src = this.generateChatUrl();
    this.window.appendChild(iframe);

    document.body.appendChild(this.window);
  }

  private generateChatUrl(tab: string = 'messages'): string {
    const baseUrl = 'http://127.0.0.1:9006';
    const params = new URLSearchParams();
    
    // 添加基本参数
    params.append('tab', tab);
    params.append('theme', JSON.stringify(this.config.theme));
    params.append('window', JSON.stringify(this.config.window));
    
    // 添加聊天参数
    Object.entries(this.config.chatParams).forEach(([key, value]) => {
      params.append(key, String(value));
    });

    return `${baseUrl}?${params.toString()}`;
  }

  private setupMessageListener() {
    window.addEventListener('message', (event) => {
      switch (event.data.type) {
        case 'CLOSE_CHAT_WINDOW':
          this.hideChat();
          break;
        case 'MAXIMIZE_WINDOW':
          this.toggleMaximize();
          break;
        case 'MINIMIZE_WINDOW':
          this.minimizeWindow();
          break;
      }
    });
  }

  showChat() {
    if (!this.window) {
      this.createChatWindow();
    }
    if (this.window) {
      const isMobile = window.innerWidth <= 768;
      this.window.style.display = 'block';
      
      // 确保窗口大小正确
      this.setupResizeListener();
      
      // 移动端添加动画效果
      if (isMobile) {
        if (this.window) {
          this.window.style.transform = 'translateY(100%)';
          requestAnimationFrame(() => {
            if (this.window) {
              this.window.style.transform = 'translateY(0)';
            }
          });
        }
      }

      this.isVisible = true;
      if (this.bubble) {
        this.bubble.style.display = 'none';
      }
    }
  }

  hideChat() {
    if (this.window) {
      const isMobile = window.innerWidth <= 768;
      
      if (isMobile) {
        // 移动端添加关闭动画
        this.window.style.transform = 'translateY(100%)';
        setTimeout(() => {
          if (this.window) {
            this.window.style.display = 'none';
          }
        }, this.config.animation.duration);
      } else {
        this.window.style.display = 'none';
      }

      this.isVisible = false;
      if (this.bubble) {
        this.bubble.style.display = 'inline-flex';
      }
    }
  }

  private minimizeWindow() {
    if (this.window) {
      this.windowState = 'minimized';
      this.window.style.display = 'none';
    }
  }

  private toggleMaximize() {
    if (!this.window) return;

    const isMobile = window.innerWidth <= 768;
    if (isMobile) return;

    this.windowState = this.windowState === 'maximized' ? 'normal' : 'maximized';
    this.setupResizeListener();
  }

  private setupResizeListener() {
    const updateWindowSize = () => {
      if (!this.window || !this.isVisible) return;

      const isMobile = window.innerWidth <= 768;
      const maxWidth = window.innerWidth;
      const maxHeight = window.innerHeight;

      if (isMobile) {
        Object.assign(this.window.style, {
          left: '0',
          bottom: '0',
          width: '100%',
          height: '90vh',
          borderTopLeftRadius: '12px',
          borderTopRightRadius: '12px',
          borderBottomLeftRadius: '0',
          borderBottomRightRadius: '0'
        });
      } else {
        let width = this.windowState === 'maximized' ? maxWidth : Math.min(this.config.window.width, maxWidth * 0.9);
        let height = this.windowState === 'maximized' ? maxHeight : Math.min(this.config.window.height, maxHeight * 0.9);

        // 确保窗口不会超出屏幕
        const right = this.config.window.position === 'right' ? this.config.marginSide : undefined;
        const left = this.config.window.position === 'left' ? this.config.marginSide : undefined;

        Object.assign(this.window.style, {
          width: `${width}px`,
          height: `${height}px`,
          right: right ? `${right}px` : 'auto',
          left: left ? `${left}px` : 'auto',
          bottom: `${this.config.marginBottom}px`,
          borderRadius: this.windowState === 'maximized' ? '0' : '12px'
        });
      }
    };

    // 添加防抖
    let resizeTimeout: number;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(updateWindowSize, 100);
    });

    // 初始更新
    updateWindowSize();
  }

  destroy() {
    // 找到气泡容器的父元素
    const bubbleContainer = this.bubble?.parentElement;
    if (bubbleContainer && document.body.contains(bubbleContainer)) {
      document.body.removeChild(bubbleContainer);
      this.bubble = null;
    }

    // 移除聊天窗口
    if (this.window && document.body.contains(this.window)) {
      document.body.removeChild(this.window);
      this.window = null;
    }

    // 清理事件监听器
    window.removeEventListener('resize', this.setupResizeListener.bind(this));
  }
} 