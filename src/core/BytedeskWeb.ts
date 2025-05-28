import type { BytedeskConfig } from '../types';

export default class BytedeskWeb {
  private config: BytedeskConfig;
  private bubble: HTMLElement | null = null;
  private window: HTMLElement | null = null;
  private inviteDialog: HTMLElement | null = null;
  private contextMenu: HTMLElement | null = null;
  private hideTimeout: NodeJS.Timeout | null = null;
  private isVisible: boolean = false;
  private isDragging: boolean = false;
  private windowState: 'minimized' | 'maximized' | 'normal' = 'normal';
  private loopCount: number = 0;
  private loopTimer: number | null = null;

  constructor(config: BytedeskConfig) {
    this.config = {
      ...this.getDefaultConfig(),
      ...config
    };
  }

  private getDefaultConfig(): BytedeskConfig {
    return {
      isDebug: false,
      isPreload: false,
      forceRefresh: false,
      baseUrl: 'https://cdn.weiyuai.cn/chat',
      placement: 'bottom-right',
      marginBottom: 20,
      marginSide: 20,
      autoPopup: false,
      inviteConfig: {
        show: false,
        text: '邀请您加入对话',
        acceptText: '开始对话',
        rejectText: '稍后再说',
      },
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
      buttonConfig: {
        show: true,
        width: 60,
        height: 60,
        onClick: () => {
          this.showChat();
        }
      },
      showSupport: true,
      chatConfig: {
        org: 'df_org_uid',
        t: "2",
        sid: 'df_rt_uid',
      },
      animation: {
        enabled: true,
        duration: 300,
        type: 'ease'
      },
      theme: {
        mode: 'system',
        textColor: '#ffffff',
        backgroundColor: '#0066FF',
      },
      window: {
        width: 380,
        height: 640,
      },
      draggable: false,
      locale: 'zh-cn',
    } as BytedeskConfig;
  }

  init() {
    this.createBubble();
    this.createInviteDialog();
    this.setupMessageListener();
    this.setupResizeListener();
    // 预加载
    this.preload();
    // 自动弹出
    if (this.config.autoPopup) {
      setTimeout(() => {
        this.showChat();
      }, this.config.autoPopupDelay || 1000);
    }
    // 显示邀请框
    if (this.config.inviteConfig?.show) {
      setTimeout(() => {
        this.showInviteDialog();
      }, this.config.inviteConfig.delay || 3000);
    }
  }

  private createBubble() {
    // 创建气泡容器
    const container = document.createElement('div');
    container.style.cssText = `
      position: fixed;
      ${this.config.placement === 'bottom-left' ? 'left' : 'right'}: ${this.config.marginSide}px;
      bottom: ${this.config.marginBottom}px;
      display: flex;
      flex-direction: column;
      align-items: ${this.config.placement === 'bottom-left' ? 'flex-start' : 'flex-end'};
      gap: 10px;
      z-index: 9999;
    `;

    // 创建气泡消息
    let messageElement: HTMLElement | null = null;
    if (this.config.bubbleConfig?.show) {
      messageElement = document.createElement('div');
      messageElement.style.cssText = `
        background: ${this.config.theme?.mode === 'dark' ? '#1f2937' : 'white'};
        color: ${this.config.theme?.mode === 'dark' ? '#e5e7eb' : '#1f2937'};
        padding: 12px 16px;
        border-radius: 8px;
        box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
        max-width: 220px;
        margin-bottom: 8px;
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.3s ease;
        position: relative;
      `;

      // 添加图标和文本
      const messageContent = document.createElement('div');
      messageContent.style.cssText = `
        display: flex;
        align-items: center;
        gap: 8px;
        flex-direction: ${this.config.placement === 'bottom-left' ? 'row' : 'row-reverse'};
      `;
      messageContent.setAttribute('data-placement', this.config.placement || 'bottom-right'); // 添加属性用于后续识别

      const iconSpan = document.createElement('span');
      iconSpan.textContent = this.config.bubbleConfig?.icon || '';
      iconSpan.style.fontSize = '20px';
      messageContent.appendChild(iconSpan);

      const textDiv = document.createElement('div');
      const title = document.createElement('div');
      title.textContent = this.config.bubbleConfig?.title || '';
      title.style.fontWeight = 'bold';
      title.style.color = this.config.theme?.mode === 'dark' ? '#e5e7eb' : '#1f2937';
      title.style.marginBottom = '4px';
      title.style.textAlign = this.config.placement === 'bottom-left' ? 'left' : 'right';
      textDiv.appendChild(title);

      const subtitle = document.createElement('div');
      subtitle.textContent = this.config.bubbleConfig?.subtitle || '';
      subtitle.style.fontSize = '0.9em';
      subtitle.style.color = this.config.theme?.mode === 'dark' ? '#9ca3af' : '#4b5563';
      subtitle.style.textAlign = this.config.placement === 'bottom-left' ? 'left' : 'right';
      textDiv.appendChild(subtitle);

      messageContent.appendChild(textDiv);
      messageElement.appendChild(messageContent);

      // 添加倒三角
      const triangle = document.createElement('div');
      triangle.style.cssText = `
        position: absolute;
        bottom: -6px;
        ${this.config.placement === 'bottom-left' ? 'left: 24px' : 'right: 24px'};
        width: 12px;
        height: 12px;
        background: ${this.config.theme?.mode === 'dark' ? '#1f2937' : 'white'};
        transform: rotate(45deg);
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
      `;

      // 添加一个白色背景遮罩，遮住三角形上方的阴影
      const mask = document.createElement('div');
      mask.style.cssText = `
        position: absolute;
        bottom: 0;
        ${this.config.placement === 'bottom-left' ? 'left: 18px' : 'right: 18px'};
        width: 24px;
        height: 12px;
        background: ${this.config.theme?.mode === 'dark' ? '#1f2937' : 'white'};
      `;

      messageElement.appendChild(triangle);
      messageElement.appendChild(mask);
      container.appendChild(messageElement);

      // 显示动画
      setTimeout(() => {
        if (messageElement) {
          messageElement.style.opacity = '1';
          messageElement.style.transform = 'translateY(0)';
        }
      }, 500);
    }

    // 创建按钮
    this.bubble = document.createElement('button');
    const buttonConfig = this.config.buttonConfig || {};
    const buttonWidth = buttonConfig.width || 60;
    const buttonHeight = buttonConfig.height || 60;
    // 使用较小的值来计算圆角，确保在宽高不等时也能保持好看的圆角效果
    const borderRadius = Math.min(buttonWidth, buttonHeight) / 2;
    
    // 根据主题模式选择合适的背景色
    const isDarkMode = this.config.theme?.mode === 'dark';
    const defaultBackgroundColor = isDarkMode ? '#3B82F6' : '#0066FF';
    const buttonBackgroundColor = this.config.theme?.backgroundColor || defaultBackgroundColor;

    this.bubble.style.cssText = `
      background-color: ${buttonBackgroundColor};
      width: ${buttonWidth}px;
      height: ${buttonHeight}px;
      border-radius: ${borderRadius}px;
      border: none;
      cursor: ${this.config.draggable ? 'move' : 'pointer'};
      display: ${buttonConfig.show === false ? 'none' : 'flex'};
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 16px rgba(0, 0, 0, ${isDarkMode ? '0.3' : '0.12'});
      transition: all 0.3s ease;
      outline: none;
      position: relative;
      user-select: none;
    `;

    // 添加按钮内容
    const buttonContent = document.createElement('div');
    buttonContent.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    `;

    // 添加图标
    if (buttonConfig.icon) {
      const iconElement = document.createElement('span');
      iconElement.textContent = buttonConfig.icon;
      // 使用高度作为基准来设置图标大小
      iconElement.style.fontSize = `${buttonHeight * 0.4}px`;
      buttonContent.appendChild(iconElement);
    } else {
      // 默认图标
      const bubbleIcon = document.createElement('div');
      bubbleIcon.innerHTML = `
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 14.663 3.04094 17.0829 4.73812 18.875L2.72681 21.1705C2.44361 21.4937 2.67314 22 3.10288 22H12Z" 
                fill="white"/>
        </svg>
      `;
      buttonContent.appendChild(bubbleIcon);
    }

    // 添加文本
    if (buttonConfig.text) {
      const textElement = document.createElement('span');
      textElement.textContent = buttonConfig.text;
      textElement.style.cssText = `
        color: ${this.config.theme?.textColor || '#ffffff'};
        font-size: ${buttonHeight * 0.25}px;
        white-space: nowrap;
      `;
      buttonContent.appendChild(textElement);
    }

    this.bubble.appendChild(buttonContent);

    // 添加悬停效果
    this.bubble!.addEventListener('mouseenter', () => {
      this.bubble!.style.transform = 'scale(1.1)';
    });
    this.bubble!.addEventListener('mouseleave', () => {
      this.bubble!.style.transform = 'scale(1)';
    });

    // 先将按钮添加到容器
    container.appendChild(this.bubble);

    // 只有在 draggable 为 true 时才添加拖拽功能
    if (this.config.draggable) {
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
        const maxY = window.innerHeight - container.offsetHeight;

        // 更新水平位置
        if (newX <= window.innerWidth / 2) {
          // 靠左
          container.style.left = `${Math.max(0, newX)}px`;
          container.style.right = 'auto';
          container.style.alignItems = 'flex-start';
          this.config.placement = 'bottom-left';
          
          // 实时更新气泡三角形和内容布局
          // this.updateBubbleLayout('bottom-left');
        } else {
          // 靠右
          container.style.right = `${Math.max(0, window.innerWidth - newX - container.offsetWidth)}px`;
          container.style.left = 'auto';
          container.style.alignItems = 'flex-end';
          this.config.placement = 'bottom-right';
          
          // 实时更新气泡三角形和内容布局
          // this.updateBubbleLayout('bottom-right');
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
          this.config.placement === 'bottom-left' 
            ? container.style.left 
            : container.style.right
        ) || 20;
        this.config.marginBottom = parseInt(container.style.bottom || '20');
      });
    }

    // 修改点击事件，只在非拖动时触发
    this.bubble.addEventListener('click', () => {
      if (!this.isDragging) {
        console.log('bubble click')
        // 隐藏气泡消息
        const messageElement = (this.bubble as any).messageElement;
        if (messageElement instanceof HTMLElement) {
          messageElement.style.display = 'none';
        }
        this.showChat();
      }
    });

    // 保存气泡消息引用
    (this.bubble as any).messageElement = messageElement;

    // 最后将容器添加到 body
    document.body.appendChild(container);

    // 添加右键菜单事件
    this.bubble.addEventListener('contextmenu', (e) => {
      this.showContextMenu(e);
    });

    // 点击其他地方时隐藏右键菜单
    document.addEventListener('click', () => {
      this.hideContextMenu();
    });
  }

  private getSupportText(): string {
    const locale = this.config?.locale || 'zh-cn';
    const supportTexts = {
      'zh-cn': '微语技术支持',
      'zh-tw': '微語技術支援',
      'en': 'Powered by Bytedesk',
      'ja': 'Bytedeskによる技術支援',
      'ko': 'Bytedesk 기술 지원'
    };
    return supportTexts[locale as keyof typeof supportTexts] || supportTexts['zh-cn'];
  }

  private createChatWindow() {
    this.window = document.createElement('div');
    const isMobile = window.innerWidth <= 768;
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;
    
    // 计算合适的窗口尺寸
    const width = Math.min(this.config.window?.width || maxWidth * 0.9, maxWidth * 0.9);
    const height = Math.min(this.config.window?.height || maxHeight * 0.9, maxHeight * 0.9);
    
    if (isMobile) {
      this.window.style.cssText = `
        position: fixed;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 90vh;
        display: none;
        z-index: 10000;
        border-top-left-radius: 12px;
        border-top-right-radius: 12px;
        overflow: hidden;
        transition: all ${this.config.animation?.duration}ms ${this.config.animation?.type};
      `;
    } else {
      // 修复桌面端样式 - 使用正确的位置属性
      this.window.style.cssText = `
        position: fixed;
        ${this.config.placement === 'bottom-right' ? 'right' : 'left'}: ${this.config.marginSide}px;
        bottom: ${this.config.marginBottom}px;
        width: ${width}px;
        height: ${height}px;
        border-radius: 12px;
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
        display: none;
        overflow: hidden;
        z-index: 10000;
        transition: all ${this.config.animation?.duration}ms ${this.config.animation?.type};
      `;
    }

    // 创建聊天界面
    const iframe = document.createElement('iframe');
    iframe.style.cssText = `
      width: 100%;
      height: ${this.config.showSupport ? 'calc(100% - 24px)' : '100%'};
      border: none;
      display: block; // 添加这一行
      vertical-align: bottom; // 添加这一行
    `;
    iframe.src = this.generateChatUrl();
    console.log('iframe.src: ', iframe.src)
    this.window.appendChild(iframe);
    // 添加技术支持信息
    if (this.config.showSupport) {
      const supportDiv = document.createElement('div');
      const isDarkMode = this.config.theme?.mode === 'dark';
      supportDiv.style.cssText = `
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: ${isDarkMode ? '#aaa' : '#666'};
        font-size: 12px;
        line-height: 24px;
        background: ${isDarkMode ? '#1f2937' : '#ffffff'};
        padding: 0;
        margin: 0;
        border-top: none; // 确保没有边框
      `;
      
      supportDiv.innerHTML = `
        <a href="https://www.bytedesk.com" 
           target="_blank" 
           style="
             color: ${isDarkMode ? '#aaa' : '#666'};
             text-decoration: none;
             display: flex;
             align-items: center;
             height: 100%;
             width: 100%;
             justify-content: center;
           ">
          ${this.getSupportText()}
        </a>
      `;
      this.window.appendChild(supportDiv);
    }
    document.body.appendChild(this.window);
  }

  private generateChatUrl(preload: boolean = false, tab: string = 'messages'): string {
    console.log('this.config: ', this.config, tab)
    const params = new URLSearchParams();

    // 添加聊天参数
    Object.entries(this.config.chatConfig || {}).forEach(([key, value]) => {
      // 特殊处理 goodsInfo 和 orderInfo 参数
      if (key === 'goodsInfo' || key === 'orderInfo') {
        try {
          // 如果已经是字符串，直接使用
          if (typeof value === 'string') {
            params.append(key, value);
          } else {
            // 如果是对象，转换为字符串
            params.append(key, JSON.stringify(value));
          }
        } catch (error) {
          console.error(`Error processing ${key}:`, error);
        }
      } else if (key === 'extra') {
        try {
          // 处理 extra 参数，移除 goodsInfo 和 orderInfo
          let extraData = typeof value === 'string' ? JSON.parse(value) : value;
          // 如果 extra 中存在 goodsInfo 或 orderInfo，则移除
          if (extraData.goodsInfo) {
            delete extraData.goodsInfo;
          }
          if (extraData.orderInfo) {
            delete extraData.orderInfo;
          }
          // 只有当 extra 中还有其他数据时才添加
          if (Object.keys(extraData).length > 0) {
            params.append(key, JSON.stringify(extraData));
          }
        } catch (error) {
          console.error('Error processing extra parameter:', error);
        }
      } else {
        params.append(key, String(value));
      }
    });

    // 添加浏览参数
    Object.entries(this.config.browseConfig || {}).forEach(([key, value]) => {
      params.append(key, String(value));
    });
    
    // 添加基本参数
    // params.append('tab', tab);

    // theme添加聊天参数
    Object.entries(this.config.theme || {}).forEach(([key, value]) => {
      params.append(key, String(value));
    });

    params.append('lang', this.config.locale || 'zh-cn');

    if (preload) {
      params.append('preload', '1');
    }

    return `${this.config.baseUrl}?${params.toString()}`;
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
        case 'RECEIVE_MESSAGE':
          console.log('RECEIVE_MESSAGE')
          break;
        case 'INVITE_VISITOR':
          console.log('INVITE_VISITOR')
          break;
        case 'INVITE_VISITOR_ACCEPT':
          console.log('INVITE_VISITOR_ACCEPT')
          break;
        case 'INVITE_VISITOR_REJECT':
          console.log('INVITE_VISITOR_REJECT')
          break;
      }
    });
  }

  preload() {
    console.log('preload');
    if (this.config.isPreload) {
      const preLoadUrl = this.generateChatUrl(true);
      console.log('preLoadUrl: ', preLoadUrl)
      // 预加载URL
      const preLoadIframe = document.createElement('iframe');
      preLoadIframe.src = preLoadUrl;
      preLoadIframe.style.display = 'none';
      document.body.appendChild(preLoadIframe);
    }
  }

  showChat(config?: Partial<BytedeskConfig>) {
    // 合并新配置（如果提供了）
    if (config) {
      this.config = {
        ...this.config,
        ...config
      };
      
      // 如果修改了配置并且窗口已经创建，需要销毁重建
      if (this.window) {
        document.body.removeChild(this.window);
        this.window = null;
      }
    }
    // 
    if (!this.window) {
      this.createChatWindow();
    }
    if (this.window) {
      const isMobile = window.innerWidth <= 768;
      this.window.style.display = 'block';
      
      // 如果forceRefresh为true，重新加载iframe
      if (this.config.forceRefresh) {
        const iframe = this.window.querySelector('iframe');
        if (iframe) {
          iframe.src = this.generateChatUrl();
        }
      }
      
      this.setupResizeListener();
      
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
        const messageElement = (this.bubble as any).messageElement;
        if (messageElement instanceof HTMLElement) {
          messageElement.style.display = 'none';
        }
      }
    }
    this.hideInviteDialog();
    this.config.onShowChat?.();
  }

  hideChat() {
    if (this.window) {
      const isMobile = window.innerWidth <= 768;
      
      if (isMobile) {
        this.window.style.transform = 'translateY(100%)';
        setTimeout(() => {
          if (this.window) {
            this.window.style.display = 'none';
          }
        }, this.config.animation?.duration || 300);
      } else {
        this.window.style.display = 'none';
      }

      this.isVisible = false;
      if (this.bubble) {
        this.bubble.style.display = this.config.buttonConfig?.show === false ? 'none' : 'inline-flex';
        const messageElement = (this.bubble as any).messageElement;
        if (messageElement instanceof HTMLElement) {
          messageElement.style.display = this.config.bubbleConfig?.show === false ? 'none' : 'block';
        }
      }
      this.config.onHideChat?.();
    }
  }

  private minimizeWindow() {
    if (this.window) {
      this.windowState = 'minimized';
      this.window.style.display = 'none';
      // 显示气泡
      this.hideChat()
    }
  }

  private toggleMaximize() {
    if (!this.window) return;

    // 直接大小新的网页
    window.open(this.generateChatUrl(), '_blank');
    
    // const isMobile = window.innerWidth <= 768;
    // if (isMobile) return;

    // this.windowState = this.windowState === 'maximized' ? 'normal' : 'maximized';
    // this.setupResizeListener();
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
        let width = this.windowState === 'maximized' ? maxWidth : Math.min(this.config.window?.width || maxWidth * 0.9, maxWidth * 0.9);
        let height = this.windowState === 'maximized' ? maxHeight : Math.min(this.config.window?.height || maxHeight * 0.9, maxHeight * 0.9);

        // 确保窗口不会超出屏幕
        const right = this.config.placement === 'bottom-right' ? this.config.marginSide : undefined;
        const left = this.config.placement === 'bottom-left' ? this.config.marginSide : undefined;

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

    // 清理循环定时器
    if (this.loopTimer) {
      window.clearTimeout(this.loopTimer);
      this.loopTimer = null;
    }

    if (this.inviteDialog && document.body.contains(this.inviteDialog)) {
      document.body.removeChild(this.inviteDialog);
      this.inviteDialog = null;
    }

    // 清理右键菜单
    if (this.contextMenu && document.body.contains(this.contextMenu)) {
      document.body.removeChild(this.contextMenu);
      this.contextMenu = null;
    }

    // 清理隐藏定时器
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
  }

  private createInviteDialog() {
    // 移除对 inviteConfig.show 的检查，始终创建邀请框
    const isDarkMode = this.config.theme?.mode === 'dark';
    this.inviteDialog = document.createElement('div');
    this.inviteDialog.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: ${isDarkMode ? '#1f2937' : 'white'};
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 24px rgba(0, 0, 0, ${isDarkMode ? '0.3' : '0.15'});
      z-index: 10001;
      display: none;
      max-width: 300px;
      text-align: center;
    `;
    
    // 添加图标
    if (this.config.inviteConfig?.icon) {
      const icon = document.createElement('div');
      icon.style.cssText = `
        font-size: 32px;
        margin-bottom: 12px;
        color: ${isDarkMode ? '#e5e7eb' : '#333'};
      `;
      icon.textContent = this.config.inviteConfig.icon;
      this.inviteDialog.appendChild(icon);
    }
    
    // 添加文本
    const text = document.createElement('div');
    text.style.cssText = `
      margin-bottom: 16px;
      color: ${isDarkMode ? '#e5e7eb' : '#333'};
    `;
    text.textContent = this.config.inviteConfig?.text || '需要帮助吗？点击开始对话';
    this.inviteDialog.appendChild(text);
    
    // 添加按钮组
    const buttons = document.createElement('div');
    buttons.style.cssText = `
      display: flex;
      gap: 10px;
      justify-content: center;
    `;
    
    // 接受按钮
    const acceptBtn = document.createElement('button');
    acceptBtn.textContent = this.config.inviteConfig?.acceptText || '开始对话';
    
    // 根据主题模式选择合适的背景色
    const inviteBtnBackgroundColor = this.config.theme?.backgroundColor || (isDarkMode ? '#3B82F6' : '#0066FF');
    
    acceptBtn.style.cssText = `
      padding: 8px 16px;
      background: ${inviteBtnBackgroundColor};
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    `;
    acceptBtn.onclick = () => {
      this.hideInviteDialog();
      this.showChat();
      this.config.inviteConfig?.onAccept?.();
    };
    
    // 拒绝按钮
    const rejectBtn = document.createElement('button');
    rejectBtn.textContent = this.config.inviteConfig?.rejectText || '稍后再说';
    rejectBtn.style.cssText = `
      padding: 8px 16px;
      background: ${isDarkMode ? '#374151' : '#f5f5f5'};
      color: ${isDarkMode ? '#d1d5db' : '#666'};
      border: none;
      border-radius: 4px;
      cursor: pointer;
    `;
    rejectBtn.onclick = () => {
      this.hideInviteDialog();
      this.config.inviteConfig?.onReject?.();
      this.handleInviteLoop();
    };
    
    buttons.appendChild(acceptBtn);
    buttons.appendChild(rejectBtn);
    this.inviteDialog.appendChild(buttons);
    
    document.body.appendChild(this.inviteDialog);
  }

  showInviteDialog() {
    // 移除对 inviteConfig.show 的检查，直接显示邀请框
    if (this.inviteDialog) {
      this.inviteDialog.style.display = 'block';
      this.config.inviteConfig?.onOpen?.();
    }
  }

  hideInviteDialog() {
    console.log('hideInviteDialog before');
    if (this.inviteDialog) {
      this.inviteDialog.style.display = 'none';
      this.config.inviteConfig?.onClose?.();
      console.log('hideInviteDialog after');
    }
  }

  handleInviteLoop() {
    const { loop, loopDelay = 3000, loopCount = Infinity } = this.config.inviteConfig || {};
    
    // 如果不需要循环或已达到最大循环次数，则不再显示
    if (!loop || this.loopCount >= loopCount - 1) {
      return;
    }
    
    // 清除之前的定时器
    if (this.loopTimer) {
      window.clearTimeout(this.loopTimer);
    }
    
    // 设置新的定时器
    this.loopTimer = window.setTimeout(() => {
      this.loopCount++;
      this.showInviteDialog();
    }, loopDelay);
  }

  showButton() {
    if (this.bubble) {
      this.bubble.style.display = 'inline-flex';
    }
  }

  hideButton() {
    if (this.bubble) {
      this.bubble.style.display = 'none';
    }
  }

  showBubble() {
    if (this.bubble) {
      const messageElement = (this.bubble as any).messageElement;
      if (messageElement instanceof HTMLElement) {
        messageElement.style.display = 'block';
        // 显示动画
        setTimeout(() => {
          messageElement.style.opacity = '1';
          messageElement.style.transform = 'translateY(0)';
        }, 100);
      }
    }
  }

  hideBubble() {
    if (this.bubble) {
      const messageElement = (this.bubble as any).messageElement;
      if (messageElement instanceof HTMLElement) {
        messageElement.style.opacity = '0';
        messageElement.style.transform = 'translateY(10px)';
        // 等待动画完成后隐藏
        setTimeout(() => {
          messageElement.style.display = 'none';
        }, 300);
      }
    }
  }

  private createContextMenu() {
    // 创建右键菜单
    this.contextMenu = document.createElement('div');
    this.contextMenu.style.cssText = `
      position: fixed;
      background: white;
      border-radius: 4px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      padding: 4px 0;
      display: none;
      z-index: 10000;
      min-width: 150px;
    `;

    // 创建菜单项
    const menuItems = [
      {
        text: '隐藏按钮和气泡',
        onClick: () => {
          this.hideButton();
          this.hideBubble();
        }
      },
      {
        text: '切换位置',
        onClick: () => {
          // 切换button和bubble的位置
          this.togglePlacement();
        }
      }
      
    ];

    menuItems.forEach((item, index) => {
      const menuItem = document.createElement('div');
      menuItem.style.cssText = `
        padding: 8px 16px;
        cursor: pointer;
        color: #333;
        font-size: 14px;
        
        &:hover {
          background: #f5f5f5;
        }
      `;
      menuItem.textContent = item.text;
      menuItem.onclick = () => {
        item.onClick();
        this.hideContextMenu();
      };
      if (this.contextMenu) {
        this.contextMenu.appendChild(menuItem);
      }

      // 添加分隔线（除了最后一项）
      if (index < menuItems.length - 1) {
        const divider = document.createElement('div');
        divider.style.cssText = `
          height: 1px;
          background: #eee;
          margin: 4px 0;
        `;
        if (this.contextMenu) {
          this.contextMenu.appendChild(divider);
        }
      }
    });

    document.body.appendChild(this.contextMenu);
  }

  private showContextMenu(e: MouseEvent) {
    e.preventDefault();
    if (!this.contextMenu) {
      this.createContextMenu();
    }
    
    if (this.contextMenu) {
      // 先显示菜单但设为不可见，以获取其尺寸
      this.contextMenu.style.visibility = 'hidden';
      this.contextMenu.style.display = 'block';
      
      const menuWidth = this.contextMenu.offsetWidth;
      const menuHeight = this.contextMenu.offsetHeight;
      
      // 计算最佳显示位置
      let x = e.clientX;
      let y = e.clientY;
      
      // 检查右边界
      if (x + menuWidth > window.innerWidth) {
        x = x - menuWidth;
      }
      
      // 检查下边界
      if (y + menuHeight > window.innerHeight) {
        y = y - menuHeight;
      }
      
      // 确保不会超出左边和上边界
      x = Math.max(0, x);
      y = Math.max(0, y);
      
      this.contextMenu.style.left = `${x}px`;
      this.contextMenu.style.top = `${y}px`;
      // 恢复可见性
      this.contextMenu.style.visibility = 'visible';
    }
  }

  private hideContextMenu() {
    if (this.contextMenu) {
      this.contextMenu.style.display = 'none';
    }
  }

  private togglePlacement() {
    if (!this.bubble) return;
    
    // 切换位置参数
    this.config.placement = this.config.placement === 'bottom-left' ? 'bottom-right' : 'bottom-left';
    
    const container = this.bubble.parentElement;
    if (!container) return;
    
    // 更新容器样式以反映新的位置
    container.style.left = this.config.placement === 'bottom-left' ? `${this.config.marginSide}px` : 'auto';
    container.style.right = this.config.placement === 'bottom-right' ? `${this.config.marginSide}px` : 'auto';
    container.style.alignItems = this.config.placement === 'bottom-left' ? 'flex-start' : 'flex-end';
    
    // 更新气泡布局
    // this.updateBubbleLayout(this.config.placement);
    
    // 如果聊天窗口可见，也需要更新其位置
    if (this.window && this.isVisible) {
      this.window.style.left = this.config.placement === 'bottom-left' ? `${this.config.marginSide}px` : 'auto';
      this.window.style.right = this.config.placement === 'bottom-right' ? `${this.config.marginSide}px` : 'auto';
    }
    
    // 触发配置变更回调（如果存在）
    this.config.onConfigChange?.({ placement: this.config.placement });
  }

  // 添加新方法用于更新气泡布局
  // private updateBubbleLayout(placement: 'bottom-left' | 'bottom-right') {
  //   if (!this.bubble) return;
    
  //   const messageElement = (this.bubble as any).messageElement;
  //   if (messageElement instanceof HTMLElement) {
  //     // 更新消息内容容器的对齐方式
  //     messageElement.style.textAlign = placement === 'bottom-left' ? 'left' : 'right';
      
  //     const triangle = messageElement.querySelector('div:nth-child(2)') as HTMLElement;
  //     const mask = messageElement.querySelector('div:nth-child(3)') as HTMLElement;
      
  //     if (triangle && mask) {
  //       if (placement === 'bottom-left') {
  //         // 左下角位置 - 三角形靠左
  //         triangle.style.left = '24px';
  //         triangle.style.right = 'unset'; // 使用 unset 清除右侧定位
          
  //         mask.style.left = '18px';
  //         mask.style.right = 'unset';
  //       } else {
  //         // 右下角位置 - 三角形靠右
  //         triangle.style.right = '24px';
  //         triangle.style.left = 'unset';
          
  //         mask.style.right = '18px';
  //         mask.style.left = 'unset';
  //       }
  //     }
      
  //     // 更新内容布局
  //     const messageContent = messageElement.querySelector('div:first-child') as HTMLElement;
  //     if (messageContent) {
  //       messageContent.style.flexDirection = placement === 'bottom-left' ? 'row' : 'row-reverse';
  //       messageContent.setAttribute('data-placement', placement);
        
  //       // 更新文本容器内的对齐方式
  //       const textDiv = messageContent.querySelector('div') as HTMLElement;
  //       if (textDiv) {
  //         const title = textDiv.querySelector('div:first-child') as HTMLElement;
  //         const subtitle = textDiv.querySelector('div:last-child') as HTMLElement;
          
  //         if (title) {
  //           title.style.textAlign = placement === 'bottom-left' ? 'left' : 'right';
  //         }
          
  //         if (subtitle) {
  //           subtitle.style.textAlign = placement === 'bottom-left' ? 'left' : 'right';
  //         }
  //       }
  //     }
  //   }
  // }
}