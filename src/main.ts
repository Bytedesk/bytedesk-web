// 删除未使用的 TabIcon 类型，只保留需要的类型
type TabKey = 'home' | 'messages' | 'help' | 'news';

export interface BytedeskConfig {
  theme?: {
    preset?: string;
    primaryColor: string;
    secondaryColor: string;
    textColor: string;
    backgroundColor: string;
    position?: 'left' | 'right';
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
    navbar?: {
      backgroundColor: string;
      textColor: string;
    };
  };
  window?: {
    title: string;
    width: number;
    height: number;
    position?: 'left' | 'right';
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
  };
  text?: {
    bubbleMessage?: {
      show: boolean;
      icon?: string;
      title: string;
      subtitle: string;
    };
    tabLabels?: Record<TabKey, string>;
  };
  tabs?: {
    home: boolean;
    messages: boolean;
    help: boolean;
    news: boolean;
  };
  showSupport?: boolean;
  chatParams?: {
    org?: string;
    t?: number;
    sid?: string;
    [key: string]: string | number | undefined;
  };
}

export default class BytedeskWeb {
  private config: BytedeskConfig;
  private bubble: HTMLElement | null = null;
  private window: HTMLElement | null = null;
  private isVisible: boolean = false;
  private isDragging: boolean = false;
  private dragStartX: number = 0;
  private dragStartY: number = 0;
  private initialX: number = 0;
  private initialY: number = 0;
  private windowState: 'minimized' | 'maximized' | 'normal' = 'normal';

  constructor(config: BytedeskConfig) {
    this.config = {
      ...this.getDefaultConfig(),
      ...config
    };
  }

  private getDefaultConfig(): BytedeskConfig {
    return {
      theme: {
        preset: 'blue',
        primaryColor: '#2e88ff',
        secondaryColor: '#ffffff',
        textColor: '#333333',
        backgroundColor: '#ffffff',
        position: 'right',
        marginBottom: 20,
        marginRight: 20,
        navbar: {
          backgroundColor: '#ffffff',
          textColor: '#333333'
        }
      },
      window: {
        title: '在线客服',
        width: 380,
        height: 640,
        position: 'right',
        marginBottom: 20,
        marginRight: 20
      },
      text: {
        bubbleMessage: {
          show: true,
          icon: '👋',
          title: '需要帮助吗？',
          subtitle: '点击开始对话'
        },
        tabLabels: {
          home: '首页',
          messages: '消息',
          help: '帮助',
          news: '新闻'
        }
      },
      tabs: {
        home: false,
        messages: true,
        help: false,
        news: false
      },
      showSupport: true
    };
  }

  init() {
    this.createBubble();
    this.setupMessageListener();
  }

  private createBubble() {
    // if (this.bubble) {
    //   document.body.removeChild(this.bubble);
    //   this.bubble = null;
    // }
    console.log('createBubble');

    // 创建气泡容器
    this.bubble = document.createElement('div');
    const style = this.bubble.style;
    style.position = 'fixed';
    style.zIndex = '9999';
    style.display = 'inline-flex';
    style.flexDirection = 'column';
    style.alignItems = 'flex-end';
    style.bottom = `${this.config.theme?.marginBottom || 30}px`;
    
    if (this.config.theme?.position === 'left') {
      style.left = `${this.config.theme?.marginLeft || 30}px`;
    } else {
      style.right = `${this.config.theme?.marginRight || 30}px`;
    }

    // 创建按钮
    const button = document.createElement('button');
    button.style.width = '48px';
    button.style.height = '48px';
    button.style.borderRadius = '50%';
    button.style.backgroundColor = this.config.theme?.primaryColor || '#2e88ff';
    button.style.color = this.config.theme?.secondaryColor || '#ffffff';
    button.style.border = 'none';
    button.style.cursor = 'pointer';
    button.style.display = 'flex';
    button.style.alignItems = 'center';
    button.style.justifyContent = 'center';
    button.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
    button.style.transition = 'transform 0.2s';
    button.style.outline = 'none';
    button.setAttribute('aria-label', '打开聊天');

    // 修改按钮点击事件处理
    const handleClick = (e: MouseEvent) => {
      console.log('Button clicked - handleClick');
      e.preventDefault();
      e.stopPropagation();
      
      // 如果窗口不存在，创建窗口
      if (!this.window) {
        this.createChatWindow();
      }

      // 显示窗口
      if (this.window) {
        this.window.style.display = 'flex';
        this.window.style.opacity = '1';
        this.window.style.transform = 'translateY(0)';
        
        // 更新状态
        this.isVisible = true;
        this.windowState = 'normal';
        
        // 隐藏气泡
        if (this.bubble) {
          this.bubble.style.display = 'none';
        }
      }
    };

    // 只绑定一次点击事件
    button.onclick = handleClick;

    // 添加图标
    button.innerHTML = `
      <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
      </svg>
    `;

    // 添加悬停效果
    button.addEventListener('mouseover', () => {
      button.style.transform = 'scale(1.1)';
    });
    button.addEventListener('mouseout', () => {
      button.style.transform = 'scale(1)';
    });

    // 添加到容器
    this.bubble.appendChild(button);
    this.bubble.onclick = handleClick;
    console.log('Bubble created');

    // 添加气泡消息
    if (this.config.text?.bubbleMessage?.show) {
      const bubbleMessage = document.createElement('div');
      bubbleMessage.style.backgroundColor = '#ffffff';
      bubbleMessage.style.boxShadow = '0 2px 12px rgba(0,0,0,0.15)';
      bubbleMessage.style.borderRadius = '8px';
      bubbleMessage.style.padding = '12px';
      bubbleMessage.style.marginBottom = '8px';
      bubbleMessage.style.maxWidth = '280px';
      bubbleMessage.style.position = 'relative';
      bubbleMessage.style.animation = 'fadeInUp 0.3s ease';
      bubbleMessage.style.cursor = 'pointer';

      // 添加动画关键帧
      const styleSheet = document.createElement('style');
      styleSheet.textContent = `
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `;
      document.head.appendChild(styleSheet);

      // 添加���三角形
      const arrow = document.createElement('div');
      arrow.style.position = 'absolute';
      arrow.style.bottom = '-6px';
      arrow.style.right = '20px';
      arrow.style.width = '12px';
      arrow.style.height = '12px';
      arrow.style.backgroundColor = '#ffffff';
      arrow.style.transform = 'rotate(45deg)';
      arrow.style.boxShadow = '4px 4px 8px rgba(0,0,0,0.1)';
      bubbleMessage.appendChild(arrow);

      // 添加图标（如果有）
      if (this.config.text.bubbleMessage.icon) {
        const icon = document.createElement('div');
        icon.style.marginBottom = '8px';
        icon.style.fontSize = '24px';
        icon.textContent = this.config.text.bubbleMessage.icon;
        bubbleMessage.appendChild(icon);
      }

      // 添加标题
      if (this.config.text.bubbleMessage.title) {
        const title = document.createElement('div');
        title.style.fontWeight = '600';
        title.style.fontSize = '14px';
        title.style.color = '#333333';
        title.style.marginBottom = '4px';
        title.textContent = this.config.text.bubbleMessage.title;
        bubbleMessage.appendChild(title);
      }

      // 添加副标题
      if (this.config.text.bubbleMessage.subtitle) {
        const subtitle = document.createElement('div');
        subtitle.style.fontSize = '12px';
        subtitle.style.color = '#666666';
        subtitle.textContent = this.config.text.bubbleMessage.subtitle;
        bubbleMessage.appendChild(subtitle);
      }

      // 添加关闭按钮
      const closeButton = document.createElement('button');
      closeButton.style.position = 'absolute';
      closeButton.style.top = '8px';
      closeButton.style.right = '8px';
      closeButton.style.background = 'transparent';
      closeButton.style.border = 'none';
      closeButton.style.color = '#999999';
      closeButton.style.cursor = 'pointer';
      closeButton.style.fontSize = '16px';
      closeButton.style.padding = '4px';
      closeButton.style.lineHeight = '1';
      closeButton.innerHTML = '×';
      closeButton.onclick = (e) => {
        e.stopPropagation();
        bubbleMessage.style.display = 'none';
        console.log('Bubble message closed');
      };
      bubbleMessage.appendChild(closeButton);

      // 修改气泡消息点击事件
      bubbleMessage.addEventListener('click', (e: MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        this.showChat();
      });

      // 添加到容器
      this.bubble.insertBefore(bubbleMessage, button);
    }

    // 添加到页面
    document.body.appendChild(this.bubble);

    // 根据窗口状态设置显示
    if (this.isVisible && this.window) {
      this.bubble.style.display = 'none';
    }

    // 添加拖拽功能
    if (!window.matchMedia('(max-width: 768px)').matches) {
      this.bubble.style.cursor = 'move';
      this.addDragListeners(this.bubble);
    }
  }

  private addDragListeners(element: HTMLElement) {
    const handleMouseDown = (e: MouseEvent) => {
      this.isDragging = true;
      this.dragStartX = e.clientX;
      this.dragStartY = e.clientY;

      const rect = element.getBoundingClientRect();
      this.initialX = rect.left;
      this.initialY = rect.top;

      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!this.isDragging) return;

      e.preventDefault();

      const deltaX = e.clientX - this.dragStartX;
      const deltaY = e.clientY - this.dragStartY;

      const newX = this.initialX + deltaX;
      const newY = this.initialY + deltaY;

      // 计算边界
      const maxX = window.innerWidth - element.offsetWidth;
      const maxY = window.innerHeight - element.offsetHeight;

      // 限制在视窗内
      const boundedX = Math.max(0, Math.min(maxX, newX));
      const boundedY = Math.max(0, Math.min(maxY, newY));

      element.style.left = `${boundedX}px`;
      element.style.top = `${boundedY}px`;
      element.style.right = 'auto';
      element.style.bottom = 'auto';
    };

    const handleMouseUp = () => {
      this.isDragging = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      // 确定最终位置
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const isRight = centerX > window.innerWidth / 2;

      // 更新配置
      if (this.config.theme) {
        this.config.theme.position = isRight ? 'right' : 'left';
        this.config.theme.marginRight = isRight ? window.innerWidth - rect.right : undefined;
        this.config.theme.marginLeft = !isRight ? rect.left : undefined;
        this.config.theme.marginBottom = window.innerHeight - rect.bottom;
      }

      // 重新创建气泡以应用新位置
      this.createBubble();
    };

    element.addEventListener('mousedown', handleMouseDown);
  }

  private createChatWindow() {
    if (this.window) {
      document.body.removeChild(this.window);
      this.window = null;
    }

    const isMobile = window.innerWidth <= 768;

    // 创建聊天窗口容器
    this.window = document.createElement('div');
    this.window.id = 'bytedesk-chat-window';
    
    // 设置基础样式
    const style = this.window.style;
    style.position = 'fixed';
    style.zIndex = '10000';
    style.backgroundColor = this.config.theme?.backgroundColor || '#ffffff';
    style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    style.borderRadius = isMobile ? '16px 16px 0 0' : '16px';
    style.overflow = 'hidden';
    style.transition = 'all 0.3s ease';
    style.display = 'flex';
    style.flexDirection = 'column';

    // 设置尺寸和位置
    if (isMobile) {
      style.width = '100vw';
      style.height = '100vh';
      style.left = '0';
      style.bottom = '0';
    } else {
      const { width = 380, height = 640 } = this.config.window || {};
      style.width = `${width}px`;
      style.height = `${height}px`;
      style.maxWidth = 'calc(100vw - 40px)';
      style.maxHeight = '80vh';
      
      const marginBottom = this.config.theme?.marginBottom || 20;
      const marginRight = this.config.theme?.marginRight || 20;
      const marginLeft = this.config.theme?.marginLeft || 20;
      
      style.bottom = `${marginBottom}px`;
      if (this.config.theme?.position === 'left') {
        style.left = `${marginLeft}px`;
        style.right = 'auto';
      } else {
        style.right = `${marginRight}px`;
        style.left = 'auto';
      }
    }

    // 添加内容���域
    const content = document.createElement('iframe');
    content.style.width = '100%';
    content.style.height = '100%';
    content.style.border = 'none';
    content.src = this.generateChatUrl('messages');
    content.title = 'chat window';
    content.allow = 'microphone; camera';
    this.window.appendChild(content);

    // 添加到页面
    document.body.appendChild(this.window);
    
    console.log('Chat window created and added to DOM');
  }

  private generateChatUrl(tab: string = 'messages'): string {
    const baseUrl = 'http://127.0.0.1:9006/chat/';
    const defaultParams = {
      org: 'df_org_uid',
      t: 2,
      sid: 'df_rt_uid',
      tab,
      navbarBg: this.config.theme?.navbar?.backgroundColor || this.config.theme?.primaryColor,
      navbarText: this.config.theme?.navbar?.textColor || this.config.theme?.secondaryColor
    };

    const params = {
      ...defaultParams,
      ...this.config.chatParams
    };

    const queryString = new URLSearchParams(
      Object.entries(params).map(([key, value]) => [key, String(value)])
    ).toString();

    return `${baseUrl}?${queryString}`;
  }

  showChat() {
    try {
      // 如果窗口不存在，创建窗口
      if (!this.window) {
        this.createChatWindow();
      }

      // 显示窗口
      if (this.window) {
        this.window.style.display = 'flex';
        this.window.style.opacity = '1';
        this.window.style.transform = 'translateY(0)';
        
        // 更新状态
        this.isVisible = true;
        this.windowState = 'normal';
        
        // 隐藏气泡
        if (this.bubble) {
          this.bubble.style.display = 'none';
        }
      }
    } catch (error) {
      console.error('Error in showChat:', error);
    }
  }

  hideChat() {
    if (this.window) {
      // 添加动画
      this.window.style.transform = 'translateY(20px)';
      this.window.style.opacity = '0';
      
      // 等待动画完成后隐藏
      setTimeout(() => {
        if (this.window) {
          this.window.style.display = 'none';
        }
      }, 300);
      
      // 更新状态
      this.isVisible = false;

      // 显示浮动按钮
      if (this.bubble) {
        this.bubble.style.display = 'inline-flex';
      }
    }
  }

  destroy() {
    if (this.bubble) {
      document.body.removeChild(this.bubble);
      this.bubble = null;
    }
    if (this.window) {
      document.body.removeChild(this.window);
      this.window = null;
    }
  }

  private handleTabChange(tab: string) {
    if (!this.window) return;

    // 更新 iframe URL
    const iframe = this.window.querySelector('iframe');
    if (iframe) {
      iframe.src = this.generateChatUrl(tab);
    }
  }

  // 更新消息监听处理
  private setupMessageListener() {
    window.addEventListener('message', (event) => {
      // 检查消息来源
      // if (event.origin !== 'http://127.0.0.1:9006') return;

      // 处理消息
      switch (event.data.type) {
        case 'CLOSE_CHAT_WINDOW':
          this.hideChat();  // 使用 hideChat 来确保按钮也正确显示
          break;
        case 'CHANGE_TAB':
          this.handleTabChange(event.data.tab);
          break;
        case 'MAXIMIZE_WINDOW':
          this.toggleMaximize();
          break;
        case 'MINIMIZE_WINDOW':
          this.minimizeWindow();
          break;
        // 可以添加更多消息处理
      }
    });
  }

  private minimizeWindow() {
    if (!this.window) return;
    
    this.windowState = 'minimized';
    this.window.style.transform = 'translateY(100%)';
    this.window.style.opacity = '0';
    
    setTimeout(() => {
      if (this.window) {
        this.window.style.display = 'none';
      }
    }, 300);
  }

  private toggleMaximize() {
    if (!this.window) return;

    const isMobile = window.innerWidth <= 768;
    if (isMobile) return; // 移动端不支持最大化

    if (this.windowState === 'maximized') {
      // 正常大小
      this.windowState = 'normal';
      const { width = 380, height = 640 } = this.config.window || {};
      this.window.style.width = `min(${width}px, 100vw - 40px)`;
      this.window.style.height = `min(${height}px, 80vh)`;
      this.window.style.top = '';
      this.window.style.left = '';
      this.window.style.right = this.config.window?.position === 'left' ? '' : '20px';
      this.window.style.bottom = `${this.config.window?.marginBottom || 80}px`;
    } else {
      // 最大化
      this.windowState = 'maximized';
      this.window.style.width = '100vw';
      this.window.style.height = '100vh';
      this.window.style.top = '0';
      this.window.style.left = '0';
      this.window.style.right = '0';
      this.window.style.bottom = '0';
    }
  }
} 