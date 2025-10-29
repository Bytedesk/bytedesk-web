/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-30 11:36:12
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-09-22 10:44:32
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  联系：270580156@qq.com
 * Copyright (c) 2025 by bytedesk.com, All Rights Reserved. 
 */
import {
  BYTEDESK_UID,
  BYTEDESK_VISITOR_UID,
  BYTEDESK_BROWSE_FAILED_TIMESTAMP,
  POST_MESSAGE_CLOSE_CHAT_WINDOW,
  POST_MESSAGE_INVITE_VISITOR,
  POST_MESSAGE_INVITE_VISITOR_ACCEPT,
  POST_MESSAGE_INVITE_VISITOR_REJECT,
  POST_MESSAGE_LOCALSTORAGE_RESPONSE,
  POST_MESSAGE_MAXIMIZE_WINDOW,
  POST_MESSAGE_MINIMIZE_WINDOW,
  POST_MESSAGE_RECEIVE_MESSAGE,
} from "../utils/constants";
import type { BytedeskConfig } from "../types";
import logger, { setGlobalConfig } from "../utils/logger";

export default class BytedeskWeb {
  private config: BytedeskConfig;
  private bubble: HTMLElement | null = null;
  private window: HTMLElement | null = null;
  private inviteDialog: HTMLElement | null = null;
  private contextMenu: HTMLElement | null = null;
  private hideTimeout: NodeJS.Timeout | null = null;
  private isVisible: boolean = false;
  private isDragging: boolean = false;
  private windowState: "minimized" | "maximized" | "normal" = "normal";
  private loopCount: number = 0;
  private loopTimer: number | null = null;

  // 添加请求状态管理
  private initVisitorPromise: Promise<any> | null = null;
  private getUnreadMessageCountPromise: Promise<any> | null = null;
  private clearUnreadMessagesPromise: Promise<any> | null = null;

  // 文档反馈功能相关属性
  private feedbackTooltip: HTMLElement | null = null;
  private feedbackDialog: HTMLElement | null = null;
  private selectedText: string = "";
  // 添加防抖和状态管理
  private selectionDebounceTimer: NodeJS.Timeout | null = null;
  private isTooltipVisible: boolean = false;
  private lastSelectionText: string = "";
  private lastMouseEvent: MouseEvent | null = null;
  private lastSelectionRect: DOMRect | null = null;

  constructor(config: BytedeskConfig) {
    this.config = {
      ...this.getDefaultConfig(),
      ...config,
    };
    // 设置全局日志配置
    setGlobalConfig(this.config);
    // 直接导入setApiUrl函数
    this.setupApiUrl();
  }

  private async setupApiUrl() {
    try {
      // 动态导入request模块
      const { setApiUrl } = await import("../apis/request");
      // 设置API url
      const apiUrl = this.config.apiUrl || "https://api.weiyuai.cn";
      setApiUrl(apiUrl);

      logger.info("API URL 已设置为:", apiUrl);
    } catch (error) {
      logger.error("设置API URL时出错:", error);
    }
  }

  private getDefaultConfig(): BytedeskConfig {
    return {
      isDebug: false,
      // isPreload: false,
      forceRefresh: false,
      htmlUrl: "https://cdn.weiyuai.cn/chat",
      apiUrl: "https://api.weiyuai.cn",
      placement: "bottom-right",
      marginBottom: 20,
      marginSide: 20,
      autoPopup: false,
      inviteConfig: {
        show: false,
        text: "邀请您加入对话",
        acceptText: "开始对话",
        rejectText: "稍后再说",
      },
      tabsConfig: {
        home: false,
        messages: true,
        help: false,
        news: false,
      },
      bubbleConfig: {
        show: true,
        icon: "👋",
        title: "需要帮助吗？",
        subtitle: "点击开始对话",
      },
      buttonConfig: {
        show: true,
        width: 60,
        height: 60,
        onClick: () => {
          this.showChat();
        },
      },
      feedbackConfig: {
        enabled: false,
        trigger: "selection",
        showOnSelection: true,
        selectionText: "文档反馈",
        buttonText: "文档反馈",
        dialogTitle: "提交意见反馈",
        placeholder: "请描述您的问题或优化建议",
        submitText: "提交反馈",
        cancelText: "取消",
        successMessage: "反馈已提交，感谢您的意见！",
        categoryNames: [
          '错别字、拼写错误',
          '链接跳转有问题',
          '文档和实操过程不一致',
          '文档难以理解',
          '建议或其他'
        ],
        requiredTypes: false,
        typesSectionTitle: '问题类型',
        typesDescription: '（多选）',
        submitScreenshot: true,
      },
      chatConfig: {
        org: "df_org_uid",
        t: "2",
        sid: "df_rt_uid",
      },
      animation: {
        enabled: true,
        duration: 300,
        type: "ease",
      },
      theme: {
        mode: "system",
        textColor: "#ffffff",
        backgroundColor: "#0066FF",
      },
      window: {
        width: 380,
        height: 640,
      },
      draggable: false,
      locale: "zh-cn",
    } as BytedeskConfig;
  }

  async init() {
    // 初始化访客信息
    await this._initVisitor();
    // 发送浏览记录 - 在访客初始化完成后执行
    await this._browseVisitor();
    //
    this.createBubble();
    this.createInviteDialog();
    this.setupMessageListener();
    this.setupResizeListener();
    // 初始化文档反馈功能 - 立即初始化并设置备用触发
    if (this.config.feedbackConfig?.enabled) {
      if (this.config.isDebug) {
        logger.debug('BytedeskWeb: 开始初始化文档反馈功能，document.readyState:', document.readyState);
      }
      
      // 立即尝试初始化
      this.initFeedbackFeature();
      
      // 如果DOM还没完全加载，设置备用初始化
      if (document.readyState !== 'complete') {
        if (this.config.isDebug) {
          logger.debug('BytedeskWeb: DOM未完全加载，设置备用初始化');
        }
        
        const loadHandler = () => {
          if (this.config.isDebug) {
            logger.debug('BytedeskWeb: window load事件触发，重新初始化反馈功能');
          }
          this.initFeedbackFeature();
          window.removeEventListener('load', loadHandler);
        };
        
        window.addEventListener('load', loadHandler);
        
        // 额外的DOMContentLoaded监听作为备用
        const domHandler = () => {
          if (this.config.isDebug) {
            logger.debug('BytedeskWeb: DOMContentLoaded事件触发，重新初始化反馈功能');
          }
          setTimeout(() => this.initFeedbackFeature(), 100);
          document.removeEventListener('DOMContentLoaded', domHandler);
        };
        
        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', domHandler);
        }
      }
    }
    // 预加载
    // this.preload();
    // 获取未读消息数 - 在访客初始化完成后执行
    this._getUnreadMessageCount();
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

  async _initVisitor() {
    // 检查是否已有正在进行的请求
    if (this.initVisitorPromise) {
      logger.debug("访客初始化请求正在进行中，返回现有Promise");
      return this.initVisitorPromise;
    }

    // 首先检查本地 localStorage 是否已有访客信息
    const localUid = localStorage.getItem(BYTEDESK_UID);
    const localVisitorUid = localStorage.getItem(BYTEDESK_VISITOR_UID);
    logger.debug("localUid: ", localUid);
    logger.debug("localVisitorUid: ", localVisitorUid);

    // 首先判断 this.config.chatConfig?.visitorUid 是否为空，如果不为空，跟localVisitorUid对比，
    // 如果相同，则直接返回本地访客信息，不进行API初始化
    // 如果不同，则进行API初始化
    // 如果 this.config.chatConfig?.visitorUid 为空，则无需对比，直接使用本地信息
    const shouldCompareVisitorUid = this.config.chatConfig?.visitorUid && localVisitorUid;
    const visitorUidMatch = shouldCompareVisitorUid 
      ? this.config.chatConfig?.visitorUid === localVisitorUid 
      : true;
    
    if (
      localUid &&
      localVisitorUid &&
      visitorUidMatch
    ) {
      logger.debug("访客信息相同，直接返回本地访客信息");

      // 触发回调，传递本地存储的访客信息
      this.config.onVisitorInfo?.(localUid || "", localVisitorUid || "");
      // 直接返回
      return {
        uid: localUid,
        visitorUid: localVisitorUid,
      };
    }

    // 创建新的请求Promise
    logger.debug("开始创建访客初始化Promise");
    this.initVisitorPromise = import("../apis/visitor").then(
      async ({ initVisitor }) => {
        try {
          // 构建访客初始化参数
          const params: VISITOR.VisitorRequest = {
            uid: String(this.config.chatConfig?.uid || localUid || ""),
            visitorUid: String(
              this.config.chatConfig?.visitorUid || localVisitorUid || ""
            ),
            orgUid: String(this.config.chatConfig?.org || ""),
            nickname: String(this.config.chatConfig?.name || ""),
            avatar: String(this.config.chatConfig?.avatar || ""),
            mobile: String(this.config.chatConfig?.mobile || ""),
            email: String(this.config.chatConfig?.email || ""),
            note: String(this.config.chatConfig?.note || ""),
            extra:
              typeof this.config.chatConfig?.extra === "string"
                ? this.config.chatConfig.extra
                : JSON.stringify(this.config.chatConfig?.extra || {}),
            vipLevel: String(this.config.chatConfig?.vipLevel || ""),
            debug: this.config.chatConfig?.debug || false,
            loadHistory: this.config.chatConfig?.loadHistory || false,
          };
          // 调用API初始化访客信息
          const response = await initVisitor(params);
          logger.debug("访客初始化API响应:", response.data, params);

          if (response.data?.code === 200) {
            // 保存访客ID到localStorage
            if (response.data?.data?.uid) {
              localStorage.setItem(BYTEDESK_UID, response.data.data.uid);
              logger.debug("已保存uid到localStorage:", response.data.data.uid);
            }
            if (response.data?.data?.visitorUid) {
              localStorage.setItem(
                BYTEDESK_VISITOR_UID,
                response.data.data.visitorUid
              );
              logger.debug(
                "已保存visitorUid到localStorage:",
                response.data.data.visitorUid
              );
            }

            // 触发回调
            if (response.data?.data) {
              logger.debug("触发onVisitorInfo回调");
              this.config.onVisitorInfo?.(
                response.data.data.uid || "",
                response.data.data.visitorUid || ""
              );
            }

            return response.data.data;
          } else {
            logger.error("访客初始化失败:", response.data?.message);
            return null;
          }
        } catch (error) {
          logger.error("访客初始化出错:", error);
          return null;
        } finally {
          // 请求完成后清除Promise引用
          logger.debug("访客初始化Promise完成，清除引用");
          this.initVisitorPromise = null;
        }
      }
    );

    return this.initVisitorPromise;
  }

  // 获取当前页面浏览信息并发送到服务器
  private async _browseVisitor() {
    try {
      // 检查是否在1小时限制期内
      const failedTimestamp = localStorage.getItem(BYTEDESK_BROWSE_FAILED_TIMESTAMP);
      if (failedTimestamp) {
        const failedTime = parseInt(failedTimestamp);
        const currentTime = Date.now();
        const oneHour = 60 * 60 * 1000; // 1小时的毫秒数
        
        if (currentTime - failedTime < oneHour) {
          const remainingTime = Math.ceil((oneHour - (currentTime - failedTime)) / 1000 / 60); // 剩余分钟数
          logger.warn(`浏览记录发送失败后1小时内禁止发送，还需等待 ${remainingTime} 分钟`);
          return;
        } else {
          // 超过1小时，清除失败记录
          localStorage.removeItem(BYTEDESK_BROWSE_FAILED_TIMESTAMP);
        }
      }

      // 获取当前页面信息
      const currentUrl = window.location.href;
      const currentTitle = document.title;
      const referrer = document.referrer;

      // 获取浏览器和设备信息
      const userAgent = navigator.userAgent;
      const browser = this.getBrowserInfo(userAgent);
      const operatingSystem = this.getOSInfo(userAgent);
      const deviceType = this.getDeviceInfo(userAgent);

      // 获取屏幕分辨率
      const screenResolution = `${screen.width}x${screen.height}`;

      // 获取UTM参数
      const urlParams = new URLSearchParams(window.location.search);
      const utmSource = urlParams.get('utm_source') || undefined;
      const utmMedium = urlParams.get('utm_medium') || undefined;
      const utmCampaign = urlParams.get('utm_campaign') || undefined;

      // 首先检查本地 localStorage 是否已有访客信息
      const localUid = localStorage.getItem(BYTEDESK_UID);
      // logger.debug("localUid: ", localUid);

      // 构建浏览参数 - 使用新的BrowseRequest类型
      const params: BROWSE.BrowseRequest = {
        url: currentUrl,
        title: currentTitle,
        referrer: referrer,
        userAgent: userAgent,
        operatingSystem: operatingSystem,
        browser: browser,
        deviceType: deviceType,
        screenResolution: screenResolution,
        utmSource: utmSource,
        utmMedium: utmMedium,
        utmCampaign: utmCampaign,
        status: "ONLINE",
        // 注意这里就是uid，不是visitorUid，使用访客系统生成uid
        visitorUid: String(
          this.config.chatConfig?.uid || localUid || ""
        ),
        orgUid: this.config.chatConfig?.org || "",
      };

      // 如果visitorUid为空，则不执行browse
      if (!params.visitorUid) {
        logger.warn("访客uid为空，跳过browse操作");
        return;
      }

      // 动态导入browse方法
      const { browse } = await import("../apis/visitor");
      const response = await browse(params);
      // logger.debug("浏览记录发送结果:", response.data, params);
      if (response.data?.code === 200) {
        // logger.debug("浏览记录发送成功");
        // 发送成功，清除失败记录
        localStorage.removeItem(BYTEDESK_BROWSE_FAILED_TIMESTAMP);
      } else {
        logger.error("浏览记录发送失败:", response.data?.message);
        // 发送失败，记录失败时间戳
        localStorage.setItem(BYTEDESK_BROWSE_FAILED_TIMESTAMP, Date.now().toString());
        logger.warn("已记录浏览记录发送失败时间，1小时内将禁止再次发送");
      }
    } catch (error) {
      logger.error("发送浏览记录时出错:", error);
      // 发送出错，记录失败时间戳
      localStorage.setItem(BYTEDESK_BROWSE_FAILED_TIMESTAMP, Date.now().toString());
      logger.warn("已记录浏览记录发送失败时间，1小时内将禁止再次发送");
    }
  }

  // 获取浏览器信息
  private getBrowserInfo(userAgent: string): string {
    if (userAgent.includes("Chrome")) return "Chrome";
    if (userAgent.includes("Firefox")) return "Firefox";
    if (userAgent.includes("Safari")) return "Safari";
    if (userAgent.includes("Edge")) return "Edge";
    if (userAgent.includes("Opera")) return "Opera";
    return "Unknown";
  }

  // 获取操作系统信息
  private getOSInfo(userAgent: string): string {
    if (userAgent.includes("Windows")) return "Windows";
    if (userAgent.includes("Mac")) return "macOS";
    if (userAgent.includes("Linux")) return "Linux";
    if (userAgent.includes("Android")) return "Android";
    if (userAgent.includes("iOS")) return "iOS";
    return "Unknown";
  }

  // 获取设备信息
  private getDeviceInfo(userAgent: string): string {
    if (userAgent.includes("Mobile")) return "Mobile";
    if (userAgent.includes("Tablet")) return "Tablet";
    return "Desktop";
  }

  async _getUnreadMessageCount() {
    // 检查是否已有正在进行的请求
    if (this.getUnreadMessageCountPromise) {
      logger.debug("获取未读消息数请求正在进行中，返回现有Promise");
      return this.getUnreadMessageCountPromise;
    }

    // 创建新的请求Promise
    this.getUnreadMessageCountPromise = import("../apis/message").then(
      async ({ getUnreadMessageCount }) => {
        try {
          // 使用chatConfig.uid或其他适当的占位符
          // 确保uid是string类型
          const visitorUid = String(this.config.chatConfig?.visitorUid || "");
          const localUid = localStorage.getItem(BYTEDESK_UID);
          const localVisitorUid = localStorage.getItem(BYTEDESK_VISITOR_UID);
          //
          const params: VISITOR.VisitorRequest = {
            uid: localUid || "",
            visitorUid: visitorUid || localVisitorUid || "",
            orgUid: this.config.chatConfig?.org || "",
          };
          // 如果uid为空，则不执行，直接返回
          if (params.uid === "") {
            return 0;
          }
          // 调用API获取未读消息数
          const response = await getUnreadMessageCount(params);
          // logger.debug("获取未读消息数:", response.data, params);
          if (response.data?.code === 200) {
            if (response?.data?.data && response?.data?.data > 0) {
              // logger.debug('未读消息数:', response.data.data);
              // 在bubble按钮显示未读数目
              this.showUnreadBadge(response.data.data);
            } else {
              // 没有未读消息时，清除数字角标
              this.clearUnreadBadge();
            }
            // 将结果返回
            return response.data.data || 0;
          } else {
            // logger.error('获取未读消息数失败:', response.data.message);
            // 处理错误情况
            return 0;
          }
        } catch (error) {
          logger.error("获取未读消息数出错:", error);
          return 0;
        } finally {
          // 请求完成后清除Promise引用
          this.getUnreadMessageCountPromise = null;
        }
      }
    );

    return this.getUnreadMessageCountPromise;
  }

  // 新增公共方法，供外部调用获取未读消息数
  async getUnreadMessageCount() {
    return this._getUnreadMessageCount();
  }

  // 新增公共方法，供外部调用初始化访客信息
  async initVisitor() {
    return this._initVisitor();
  }

  // 新增公共方法，供外部调用发送浏览记录
  async browseVisitor() {
    return this._browseVisitor();
  }

  // 清除浏览记录发送失败的限制
  clearBrowseFailedLimit() {
    localStorage.removeItem(BYTEDESK_BROWSE_FAILED_TIMESTAMP);
    logger.info("已清除浏览记录发送失败的限制");
  }

  // 清除本地访客信息，强制重新初始化
  clearVisitorInfo() {
    localStorage.removeItem(BYTEDESK_UID);
    localStorage.removeItem(BYTEDESK_VISITOR_UID);
    logger.info("已清除本地访客信息");
  }

  // 强制重新初始化访客信息（忽略本地缓存）
  async forceInitVisitor() {
    // 先清除本地信息
    this.clearVisitorInfo();
    // 清除现有的Promise引用，强制重新请求
    this.initVisitorPromise = null;
    // 然后重新初始化
    return this._initVisitor();
  }

  // 显示未读消息数角标
  private showUnreadBadge(count: number) {
    logger.debug("showUnreadBadge() 被调用，count:", count);
    
    // 检查按钮配置，如果 buttonConfig.show 为 false，则不显示角标
    const buttonConfig = this.config.buttonConfig || {};
    if (buttonConfig.show === false) {
      logger.debug("showUnreadBadge: buttonConfig.show 为 false，不显示角标");
      return;
    }
    
    if (!this.bubble) {
      logger.debug("showUnreadBadge: bubble 不存在");
      return;
    }

    // 检查是否已经有角标，有则更新，没有则创建
    let badge = this.bubble.querySelector(
      ".bytedesk-unread-badge"
    ) as HTMLElement;

    if (!badge) {
      logger.debug("showUnreadBadge: 创建新的角标");
      // 创建未读消息角标
      badge = document.createElement("div");
      badge.className = "bytedesk-unread-badge";
      badge.style.cssText = `
        position: absolute;
        top: -8px;
        right: -8px;
        min-width: 18px;
        height: 18px;
        padding: 0 4px;
        background: #ff4d4f;
        color: white;
        font-size: 12px;
        font-weight: bold;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
        border: 2px solid white;
      `;
      this.bubble.appendChild(badge);
    } else {
      logger.debug("showUnreadBadge: 更新现有角标");
    }

    // 更新数字
    badge.textContent = count > 99 ? "99+" : count.toString();
    logger.debug("showUnreadBadge: 角标数字已更新为", badge.textContent);
  }

  // 清除未读消息数角标
  private clearUnreadBadge() {
    // logger.debug("clearUnreadBadge() 被调用");
    if (!this.bubble) {
      logger.debug("clearUnreadBadge: bubble 不存在");
      return;
    }

    const badge = this.bubble.querySelector(".bytedesk-unread-badge");
    if (badge) {
      // logger.debug("clearUnreadBadge: 找到角标，正在移除");
      badge.remove();
    } else {
      logger.debug("clearUnreadBadge: 未找到角标");
    }
  }

  // 清空未读消息
  async clearUnreadMessages() {
    // 检查是否已有正在进行的请求
    if (this.clearUnreadMessagesPromise) {
      logger.debug("清空未读消息请求正在进行中，返回现有Promise");
      return this.clearUnreadMessagesPromise;
    }

    // 创建新的请求Promise
    this.clearUnreadMessagesPromise = import("../apis/message").then(
      async ({ clearUnreadMessages }) => {
        try {
          const visitorUid = String(this.config.chatConfig?.visitorUid || "");
          const localUid = localStorage.getItem(BYTEDESK_UID);
          const localVisitorUid = localStorage.getItem(BYTEDESK_VISITOR_UID);
          //
          const params: VISITOR.VisitorRequest = {
            uid: localUid || "",
            visitorUid: visitorUid || localVisitorUid || "",
            orgUid: this.config.chatConfig?.org || "",
          };
          const response = await clearUnreadMessages(params);
          logger.debug("清空未读消息数:", response.data, params);
          if (response.data.code === 200) {
            logger.info("清空未读消息数成功:", response.data);
            // 清空未读消息数成功，无论返回什么值都清除角标
            this.clearUnreadBadge();
            return response.data.data || 0;
          } else {
            logger.error("清空未读消息数失败:", response.data.message);
            return 0;
          }
        } catch (error) {
          logger.error("清空未读消息数出错:", error);
          return 0;
        } finally {
          // 请求完成后清除Promise引用
          this.clearUnreadMessagesPromise = null;
        }
      }
    );

    return this.clearUnreadMessagesPromise;
  }

  private createBubble() {
    // 检查气泡是否已存在
    if (this.bubble && document.body.contains(this.bubble)) {
      logger.debug("createBubble: 气泡已存在，不重复创建");
      return;
    }
    
    // 如果 bubble 存在但不在 DOM 中，先清理
    if (this.bubble && !document.body.contains(this.bubble)) {
      logger.debug("createBubble: 清理已存在的 bubble 引用");
      this.bubble = null;
    }

    // 创建气泡容器
    const container = document.createElement("div");
    container.style.cssText = `
      position: fixed;
      ${this.config.placement === "bottom-left" ? "left" : "right"}: ${
      this.config.marginSide
    }px;
      bottom: ${this.config.marginBottom}px;
      display: flex;
      flex-direction: column;
      align-items: ${
        this.config.placement === "bottom-left" ? "flex-start" : "flex-end"
      };
      gap: 10px;
      z-index: 9999;
    `;

    // 创建气泡消息
    let messageElement: HTMLElement | null = null;
    if (this.config.bubbleConfig?.show) {
      messageElement = document.createElement("div");
      messageElement.style.cssText = `
        background: ${this.config.theme?.mode === "dark" ? "#1f2937" : "white"};
        color: ${this.config.theme?.mode === "dark" ? "#e5e7eb" : "#1f2937"};
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
      const messageContent = document.createElement("div");
      messageContent.style.cssText = `
        display: flex;
        align-items: center;
        gap: 8px;
        flex-direction: ${
          this.config.placement === "bottom-left" ? "row" : "row-reverse"
        };
      `;
      messageContent.setAttribute(
        "data-placement",
        this.config.placement || "bottom-right"
      ); // 添加属性用于后续识别

      const iconSpan = document.createElement("span");
      iconSpan.textContent = this.config.bubbleConfig?.icon || "";
      iconSpan.style.fontSize = "20px";
      messageContent.appendChild(iconSpan);

      const textDiv = document.createElement("div");
      const title = document.createElement("div");
      title.textContent = this.config.bubbleConfig?.title || "";
      title.style.fontWeight = "bold";
      title.style.color =
        this.config.theme?.mode === "dark" ? "#e5e7eb" : "#1f2937";
      title.style.marginBottom = "4px";
      title.style.textAlign =
        this.config.placement === "bottom-left" ? "left" : "right";
      textDiv.appendChild(title);

      const subtitle = document.createElement("div");
      subtitle.textContent = this.config.bubbleConfig?.subtitle || "";
      subtitle.style.fontSize = "0.9em";
      subtitle.style.color =
        this.config.theme?.mode === "dark" ? "#9ca3af" : "#4b5563";
      subtitle.style.textAlign =
        this.config.placement === "bottom-left" ? "left" : "right";
      textDiv.appendChild(subtitle);

      messageContent.appendChild(textDiv);
      messageElement.appendChild(messageContent);

      // 添加倒三角
      const triangle = document.createElement("div");
      triangle.style.cssText = `
        position: absolute;
        bottom: -6px;
        ${
          this.config.placement === "bottom-left" ? "left: 24px" : "right: 24px"
        };
        width: 12px;
        height: 12px;
        background: ${this.config.theme?.mode === "dark" ? "#1f2937" : "white"};
        transform: rotate(45deg);
        box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
      `;

      // 添加一个白色背景遮罩，遮住三角形上方的阴影
      const mask = document.createElement("div");
      mask.style.cssText = `
        position: absolute;
        bottom: 0;
        ${
          this.config.placement === "bottom-left" ? "left: 18px" : "right: 18px"
        };
        width: 24px;
        height: 12px;
        background: ${this.config.theme?.mode === "dark" ? "#1f2937" : "white"};
      `;

      messageElement.appendChild(triangle);
      messageElement.appendChild(mask);
      container.appendChild(messageElement);

      // 显示动画
      setTimeout(() => {
        if (messageElement) {
          messageElement.style.opacity = "1";
          messageElement.style.transform = "translateY(0)";
        }
      }, 500);
    }

    // 创建按钮
    this.bubble = document.createElement("button");
    const buttonConfig = this.config.buttonConfig || {};
    const buttonWidth = buttonConfig.width || 60;
    const buttonHeight = buttonConfig.height || 60;
    // 使用较小的值来计算圆角，确保在宽高不等时也能保持好看的圆角效果
    const borderRadius = Math.min(buttonWidth, buttonHeight) / 2;

    // 根据主题模式选择合适的背景色
    const isDarkMode = this.config.theme?.mode === "dark";
    const defaultBackgroundColor = isDarkMode ? "#3B82F6" : "#0066FF";
    const buttonBackgroundColor =
      this.config.theme?.backgroundColor || defaultBackgroundColor;

    this.bubble.style.cssText = `
      background-color: ${buttonBackgroundColor};
      width: ${buttonWidth}px;
      height: ${buttonHeight}px;
      border-radius: ${borderRadius}px;
      border: none;
      cursor: ${this.config.draggable ? "move" : "pointer"};
      display: ${buttonConfig.show === false ? "none" : "flex"};
      align-items: center;
      justify-content: center;
      box-shadow: 0 4px 16px rgba(0, 0, 0, ${isDarkMode ? "0.3" : "0.12"});
      transition: all 0.3s ease;
      outline: none;
      position: relative;
      user-select: none;
    `;

    // 添加按钮内容
    const buttonContent = document.createElement("div");
    buttonContent.style.cssText = `
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    `;

    // 添加图标
    if (buttonConfig.icon) {
      const iconElement = document.createElement("span");
      iconElement.textContent = buttonConfig.icon;
      // 使用高度作为基准来设置图标大小
      iconElement.style.fontSize = `${buttonHeight * 0.4}px`;
      buttonContent.appendChild(iconElement);
    } else {
      // 默认图标
      const bubbleIcon = document.createElement("div");
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
      const textElement = document.createElement("span");
      textElement.textContent = buttonConfig.text;
      textElement.style.cssText = `
        color: ${this.config.theme?.textColor || "#ffffff"};
        font-size: ${buttonHeight * 0.25}px;
        white-space: nowrap;
      `;
      buttonContent.appendChild(textElement);
    }

    this.bubble.appendChild(buttonContent);

    // 添加悬停效果
    this.bubble!.addEventListener("mouseenter", () => {
      this.bubble!.style.transform = "scale(1.1)";
    });
    this.bubble!.addEventListener("mouseleave", () => {
      this.bubble!.style.transform = "scale(1)";
    });

    // 先将按钮添加到容器
    container.appendChild(this.bubble);

    // 只有在 draggable 为 true 时才添加拖拽功能
    if (this.config.draggable) {
      let startX = 0;
      let startY = 0;
      let initialX = 0;
      let initialY = 0;

      this.bubble.addEventListener("mousedown", (e) => {
        if (e.button !== 0) return;
        this.isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        initialX = container.offsetLeft;
        initialY = container.offsetTop;

        container.style.transition = "none";
      });

      document.addEventListener("mousemove", (e) => {
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
          container.style.right = "auto";
          container.style.alignItems = "flex-start";
          this.config.placement = "bottom-left";

          // 实时更新气泡三角形和内容布局
          // this.updateBubbleLayout('bottom-left');
        } else {
          // 靠右
          container.style.right = `${Math.max(
            0,
            window.innerWidth - newX - container.offsetWidth
          )}px`;
          container.style.left = "auto";
          container.style.alignItems = "flex-end";
          this.config.placement = "bottom-right";

          // 实时更新气泡三角形和内容布局
          // this.updateBubbleLayout('bottom-right');
        }

        // 更新垂直位置
        container.style.bottom = `${Math.min(
          Math.max(0, window.innerHeight - newY - container.offsetHeight),
          maxY
        )}px`;
      });

      document.addEventListener("mouseup", () => {
        if (!this.isDragging) return;
        this.isDragging = false;

        // 恢复过渡动画
        container.style.transition = "all 0.3s ease";

        // 保存新位置
        this.config.marginSide =
          parseInt(
            this.config.placement === "bottom-left"
              ? container.style.left
              : container.style.right
          ) || 20;
        this.config.marginBottom = parseInt(container.style.bottom || "20");
      });
    }

    // 修改点击事件，只在非拖动时触发
    this.bubble.addEventListener("click", () => {
      if (!this.isDragging) {
        logger.debug("bubble click");
        // 隐藏气泡消息
        const messageElement = (this.bubble as any).messageElement;
        if (messageElement instanceof HTMLElement) {
          messageElement.style.display = "none";
        }
        this.showChat();
      }
    });

    // 保存气泡消息引用
    (this.bubble as any).messageElement = messageElement;

    // 最后将容器添加到 body
    document.body.appendChild(container);

    // 添加右键菜单事件
    this.bubble.addEventListener("contextmenu", (e) => {
      this.showContextMenu(e);
    });

    // 点击其他地方时隐藏右键菜单
    document.addEventListener("click", () => {
      this.hideContextMenu();
    });
  }



  private createChatWindow() {
    // 检查聊天窗口是否已存在
    if (this.window && document.body.contains(this.window)) {
      logger.debug("createChatWindow: 聊天窗口已存在，不重复创建");
      return;
    }
    
    // 如果 window 存在但不在 DOM 中，先清理
    if (this.window && !document.body.contains(this.window)) {
      logger.debug("createChatWindow: 清理已存在的 window 引用");
      this.window = null;
    }
    
    this.window = document.createElement("div");
    const isMobile = window.innerWidth <= 768;
    const maxWidth = window.innerWidth;
    const maxHeight = window.innerHeight;

    // 计算合适的窗口尺寸
    const width = Math.min(
      this.config.window?.width || maxWidth * 0.9,
      maxWidth * 0.9
    );
    const height = Math.min(
      this.config.window?.height || maxHeight * 0.9,
      maxHeight * 0.9
    );

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
        ${this.config.placement === "bottom-right" ? "right" : "left"}: ${
        this.config.marginSide
      }px;
        bottom: ${this.config.marginBottom}px;
        width: ${width}px;
        height: ${height}px;
        border-radius: 12px;
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
        display: none;
        overflow: hidden;
        z-index: 10000;
        transition: all ${this.config.animation?.duration}ms ${
        this.config.animation?.type
      };
      `;
    }

    // 创建聊天界面
    const iframe = document.createElement("iframe");
    iframe.style.cssText = `
      width: 100%;
      height: 100%;
      border: none;
      display: block; // 添加这一行
      vertical-align: bottom; // 添加这一行
    `;
    iframe.src = this.generateChatUrl();
    logger.debug("iframe.src: ", iframe.src);
    this.window.appendChild(iframe);
    document.body.appendChild(this.window);
  }

  private generateChatUrl(
    // preload: boolean = false,
    tab: string = "messages"
  ): string {
    logger.debug("this.config: ", this.config, tab);
    const params = new URLSearchParams();

    // 检查 localStorage 中的 uid 和 visitorUid，如果不为空则添加到URL参数中
    const localUid = localStorage.getItem(BYTEDESK_UID);
    const localVisitorUid = localStorage.getItem(BYTEDESK_VISITOR_UID);

    if (localUid && localUid.trim() !== "") {
      params.append("uid", localUid);
    }

    if (localVisitorUid && localVisitorUid.trim() !== "") {
      params.append("visitorUid", localVisitorUid);
    }

    // 添加聊天参数
    Object.entries(this.config.chatConfig || {}).forEach(([key, value]) => {
      // 特殊处理 goodsInfo 和 orderInfo 参数
      if (key === "goodsInfo" || key === "orderInfo") {
        try {
          // 如果已经是字符串，直接使用
          if (typeof value === "string") {
            params.append(key, value);
          } else {
            // 如果是对象，转换为字符串
            params.append(key, JSON.stringify(value));
          }
        } catch (error) {
          logger.error(`Error processing ${key}:`, error);
        }
      } else if (key === "extra") {
        try {
          // 处理 extra 参数，移除 goodsInfo 和 orderInfo
          let extraData = typeof value === "string" ? JSON.parse(value) : value;
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
          logger.error("Error processing extra parameter:", error);
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

    params.append("lang", this.config.locale || "zh-cn");

    // if (preload) {
    //   params.append("preload", "1");
    // }

    const url = `${this.config.htmlUrl}?${params.toString()}`;
    logger.debug("chat url: ", url);
    return url;
  }

  private setupMessageListener() {
    window.addEventListener("message", (event) => {
      switch (event.data.type) {
        case POST_MESSAGE_CLOSE_CHAT_WINDOW:
          this.hideChat();
          break;
        case POST_MESSAGE_MAXIMIZE_WINDOW:
          this.toggleMaximize();
          break;
        case POST_MESSAGE_MINIMIZE_WINDOW:
          this.minimizeWindow();
          break;
        case POST_MESSAGE_RECEIVE_MESSAGE:
          logger.debug("RECEIVE_MESSAGE");
          break;
        case POST_MESSAGE_INVITE_VISITOR:
          logger.debug("INVITE_VISITOR");
          break;
        case POST_MESSAGE_INVITE_VISITOR_ACCEPT:
          logger.debug("INVITE_VISITOR_ACCEPT");
          break;
        case POST_MESSAGE_INVITE_VISITOR_REJECT:
          logger.debug("INVITE_VISITOR_REJECT");
          break;
        case POST_MESSAGE_LOCALSTORAGE_RESPONSE:
          // 处理获取 localStorage 的请求
          this.handleLocalStorageData(event);
          break;
      }
    });
  }

  // 处理从 iframe 返回的 localStorage 数据
  private handleLocalStorageData(event: MessageEvent) {
    const { uid, visitorUid } = event.data;
    logger.debug("handleLocalStorageData 被调用", uid, visitorUid, event.data);

    // 检查是否与当前存储的值相同，避免重复设置
    const currentUid = localStorage.getItem(BYTEDESK_UID);
    const currentVisitorUid = localStorage.getItem(BYTEDESK_VISITOR_UID);

    if (currentUid === uid && currentVisitorUid === visitorUid) {
      logger.debug("handleLocalStorageData: 值相同，跳过设置");
      return;
    }

    localStorage.setItem(BYTEDESK_UID, uid);
    localStorage.setItem(BYTEDESK_VISITOR_UID, visitorUid);
    logger.debug("handleLocalStorageData: 已更新localStorage", {
      uid,
      visitorUid,
    });

    // 触发回调或处理数据
    this.config.onVisitorInfo?.(uid, visitorUid);
  }

  // 向 iframe 发送消息
  sendMessageToIframe(message: any) {
    const iframe = this.window?.querySelector("iframe");
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(message, "*");
    }
  }

  showChat(config?: Partial<BytedeskConfig>) {
    // 合并新配置（如果提供了）
    if (config) {
      this.config = {
        ...this.config,
        ...config,
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

    // 打开聊天窗口时清空未读消息计数
    // this.clearUnreadMessages();
    if (this.window) {
      const isMobile = window.innerWidth <= 768;
      this.window.style.display = "block";

      // 如果forceRefresh为true，重新加载iframe
      if (this.config.forceRefresh) {
        const iframe = this.window.querySelector("iframe");
        if (iframe) {
          iframe.src = this.generateChatUrl();
        }
      }

      this.setupResizeListener();

      if (isMobile) {
        if (this.window) {
          this.window.style.transform = "translateY(100%)";
          requestAnimationFrame(() => {
            if (this.window) {
              this.window.style.transform = "translateY(0)";
            }
          });
        }
      }

      this.isVisible = true;
      if (this.bubble) {
        this.bubble.style.display = "none";
        const messageElement = (this.bubble as any).messageElement;
        if (messageElement instanceof HTMLElement) {
          messageElement.style.display = "none";
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
        this.window.style.transform = "translateY(100%)";
        setTimeout(() => {
          if (this.window) {
            this.window.style.display = "none";
          }
        }, this.config.animation?.duration || 300);
      } else {
        this.window.style.display = "none";
      }

      this.isVisible = false;
      if (this.bubble) {
        this.bubble.style.display =
          this.config.buttonConfig?.show === false ? "none" : "inline-flex";
        const messageElement = (this.bubble as any).messageElement;
        if (messageElement instanceof HTMLElement) {
          messageElement.style.display =
            this.config.bubbleConfig?.show === false ? "none" : "block";
        }
      }
      this.config.onHideChat?.();
    }
  }

  private minimizeWindow() {
    if (this.window) {
      this.windowState = "minimized";
      this.window.style.display = "none";
      // 显示气泡
      this.hideChat();
    }
  }

  private toggleMaximize() {
    if (!this.window) return;

    // 直接大小新的网页
    window.open(this.generateChatUrl(), "_blank");

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
          left: "0",
          bottom: "0",
          width: "100%",
          height: "90vh",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
          borderBottomLeftRadius: "0",
          borderBottomRightRadius: "0",
        });
      } else {
        let width =
          this.windowState === "maximized"
            ? maxWidth
            : Math.min(
                this.config.window?.width || maxWidth * 0.9,
                maxWidth * 0.9
              );
        let height =
          this.windowState === "maximized"
            ? maxHeight
            : Math.min(
                this.config.window?.height || maxHeight * 0.9,
                maxHeight * 0.9
              );

        // 确保窗口不会超出屏幕
        const right =
          this.config.placement === "bottom-right"
            ? this.config.marginSide
            : undefined;
        const left =
          this.config.placement === "bottom-left"
            ? this.config.marginSide
            : undefined;

        Object.assign(this.window.style, {
          width: `${width}px`,
          height: `${height}px`,
          right: right ? `${right}px` : "auto",
          left: left ? `${left}px` : "auto",
          bottom: `${this.config.marginBottom}px`,
          borderRadius: this.windowState === "maximized" ? "0" : "12px",
        });
      }
    };

    // 添加防抖
    let resizeTimeout: number;
    window.addEventListener("resize", () => {
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
    window.removeEventListener("resize", this.setupResizeListener.bind(this));

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

    // 清理防抖定时器
    if (this.selectionDebounceTimer) {
      clearTimeout(this.selectionDebounceTimer);
      this.selectionDebounceTimer = null;
    }

    // 清理反馈功能
    this.destroyFeedbackFeature();
  }

  private createInviteDialog() {
    // 检查邀请框是否已存在
    if (this.inviteDialog && document.body.contains(this.inviteDialog)) {
      logger.debug("createInviteDialog: 邀请框已存在，不重复创建");
      return;
    }
    
    // 如果 inviteDialog 存在但不在 DOM 中，先清理
    if (this.inviteDialog && !document.body.contains(this.inviteDialog)) {
      logger.debug("createInviteDialog: 清理已存在的 inviteDialog 引用");
      this.inviteDialog = null;
    }

    // 移除对 inviteConfig.show 的检查，始终创建邀请框
    const isDarkMode = this.config.theme?.mode === "dark";
    this.inviteDialog = document.createElement("div");
    this.inviteDialog.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: ${isDarkMode ? "#1f2937" : "white"};
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 4px 24px rgba(0, 0, 0, ${isDarkMode ? "0.3" : "0.15"});
      z-index: 10001;
      display: none;
      max-width: 300px;
      text-align: center;
    `;

    // 添加图标
    if (this.config.inviteConfig?.icon) {
      const icon = document.createElement("div");
      icon.style.cssText = `
        font-size: 32px;
        margin-bottom: 12px;
        color: ${isDarkMode ? "#e5e7eb" : "#333"};
      `;
      icon.textContent = this.config.inviteConfig.icon;
      this.inviteDialog.appendChild(icon);
    }

    // 添加文本
    const text = document.createElement("div");
    text.style.cssText = `
      margin-bottom: 16px;
      color: ${isDarkMode ? "#e5e7eb" : "#333"};
    `;
    text.textContent =
      this.config.inviteConfig?.text || "需要帮助吗？点击开始对话";
    this.inviteDialog.appendChild(text);

    // 添加按钮组
    const buttons = document.createElement("div");
    buttons.style.cssText = `
      display: flex;
      gap: 10px;
      justify-content: center;
    `;

    // 接受按钮
    const acceptBtn = document.createElement("button");
    acceptBtn.textContent = this.config.inviteConfig?.acceptText || "开始对话";

    // 根据主题模式选择合适的背景色
    const inviteBtnBackgroundColor =
      this.config.theme?.backgroundColor ||
      (isDarkMode ? "#3B82F6" : "#0066FF");

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
    const rejectBtn = document.createElement("button");
    rejectBtn.textContent = this.config.inviteConfig?.rejectText || "稍后再说";
    rejectBtn.style.cssText = `
      padding: 8px 16px;
      background: ${isDarkMode ? "#374151" : "#f5f5f5"};
      color: ${isDarkMode ? "#d1d5db" : "#666"};
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
      this.inviteDialog.style.display = "block";
      this.config.inviteConfig?.onOpen?.();
    }
  }

  hideInviteDialog() {
    logger.debug("hideInviteDialog before");
    if (this.inviteDialog) {
      this.inviteDialog.style.display = "none";
      this.config.inviteConfig?.onClose?.();
      logger.debug("hideInviteDialog after");
    }
  }

  handleInviteLoop() {
    const {
      loop,
      loopDelay = 3000,
      loopCount = Infinity,
    } = this.config.inviteConfig || {};

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
    // 检查按钮是否已经显示
    if (this.bubble && this.bubble.style.display !== "none") {
      logger.debug("showButton: 按钮已经显示，无需重复显示");
      return;
    }
    
    if (this.bubble) {
      this.bubble.style.display = "inline-flex";
      logger.debug("showButton: 按钮已显示");
    } else {
      logger.debug("showButton: bubble 不存在，需要先创建");
    }
  }

  hideButton() {
    if (this.bubble) {
      this.bubble.style.display = "none";
    }
  }

  showBubble() {
    if (this.bubble) {
      const messageElement = (this.bubble as any).messageElement;
      if (messageElement instanceof HTMLElement) {
        // 检查气泡是否已经显示
        if (messageElement.style.display !== "none" && messageElement.style.opacity !== "0") {
          logger.debug("showBubble: 气泡已经显示，无需重复显示");
          return;
        }
        
        messageElement.style.display = "block";
        // 显示动画
        setTimeout(() => {
          messageElement.style.opacity = "1";
          messageElement.style.transform = "translateY(0)";
        }, 100);
        logger.debug("showBubble: 气泡已显示");
      } else {
        logger.debug("showBubble: messageElement 不存在");
      }
    } else {
      logger.debug("showBubble: bubble 不存在");
    }
  }

  hideBubble() {
    if (this.bubble) {
      const messageElement = (this.bubble as any).messageElement;
      if (messageElement instanceof HTMLElement) {
        messageElement.style.opacity = "0";
        messageElement.style.transform = "translateY(10px)";
        // 等待动画完成后隐藏
        setTimeout(() => {
          messageElement.style.display = "none";
        }, 300);
      }
    }
  }

  private createContextMenu() {
    // 创建右键菜单
    this.contextMenu = document.createElement("div");
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
        text: "隐藏按钮和气泡",
        onClick: () => {
          this.hideButton();
          this.hideBubble();
        },
      },
      {
        text: "切换位置",
        onClick: () => {
          // 切换button和bubble的位置
          this.togglePlacement();
        },
      },
    ];

    menuItems.forEach((item, index) => {
      const menuItem = document.createElement("div");
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
        const divider = document.createElement("div");
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
      this.contextMenu.style.visibility = "hidden";
      this.contextMenu.style.display = "block";

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
      this.contextMenu.style.visibility = "visible";
    }
  }

  private hideContextMenu() {
    if (this.contextMenu) {
      this.contextMenu.style.display = "none";
    }
  }

  private togglePlacement() {
    if (!this.bubble) return;

    // 切换位置参数
    this.config.placement =
      this.config.placement === "bottom-left" ? "bottom-right" : "bottom-left";

    const container = this.bubble.parentElement;
    if (!container) return;

    // 更新容器样式以反映新的位置
    container.style.left =
      this.config.placement === "bottom-left"
        ? `${this.config.marginSide}px`
        : "auto";
    container.style.right =
      this.config.placement === "bottom-right"
        ? `${this.config.marginSide}px`
        : "auto";
    container.style.alignItems =
      this.config.placement === "bottom-left" ? "flex-start" : "flex-end";

    // 更新气泡布局
    // this.updateBubbleLayout(this.config.placement);

    // 如果聊天窗口可见，也需要更新其位置
    if (this.window && this.isVisible) {
      this.window.style.left =
        this.config.placement === "bottom-left"
          ? `${this.config.marginSide}px`
          : "auto";
      this.window.style.right =
        this.config.placement === "bottom-right"
          ? `${this.config.marginSide}px`
          : "auto";
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

  // ======================== 文档反馈功能 ========================

  /**
   * 初始化文档反馈功能
   */
  private initFeedbackFeature() {
    logger.debug('BytedeskWeb: 初始化文档反馈功能开始');
    logger.debug('BytedeskWeb: feedbackConfig:', this.config.feedbackConfig);
    logger.debug('BytedeskWeb: feedbackConfig.enabled:', this.config.feedbackConfig?.enabled);

    if (!this.config.feedbackConfig?.enabled) {
      logger.debug('BytedeskWeb: 文档反馈功能未启用，退出初始化');
      return;
    }

    // 防止重复初始化
    if (this.feedbackTooltip || this.feedbackDialog) {
      logger.debug('BytedeskWeb: 反馈功能已存在，先销毁再重新创建');
      this.destroyFeedbackFeature();
    }

    // 监听文本选择事件
    if (this.config.feedbackConfig.trigger === 'selection' || this.config.feedbackConfig.trigger === 'both') {
      logger.debug('BytedeskWeb: 触发器匹配，设置文本选择监听器');
      logger.debug('BytedeskWeb: 触发器类型:', this.config.feedbackConfig.trigger);
      this.setupTextSelectionListener();
    } else {
      logger.debug('BytedeskWeb: 触发器不匹配，跳过文本选择监听器');
      logger.debug('BytedeskWeb: 触发器类型:', this.config.feedbackConfig.trigger);
    }

    logger.debug('BytedeskWeb: 开始创建反馈提示框');
    this.createFeedbackTooltip();
    
    logger.debug('BytedeskWeb: 开始创建反馈对话框');
    this.createFeedbackDialog();
    
    logger.debug('BytedeskWeb: 文档反馈功能初始化完成');
    logger.debug('BytedeskWeb: 反馈提示框存在:', !!this.feedbackTooltip);
    logger.debug('BytedeskWeb: 反馈对话框存在:', !!this.feedbackDialog);
  }

  /**
   * 设置文本选择监听器
   */
  private setupTextSelectionListener() {
    logger.debug('BytedeskWeb: 设置文本选择监听器');

    // 监听鼠标抬起事件，检测文本选择（主要处理方式）
    document.addEventListener('mouseup', (event) => {
      this.lastMouseEvent = event as MouseEvent;
      logger.debug('BytedeskWeb: mouseup事件触发', event);
      this.handleTextSelectionWithDebounce(event);
    }, { capture: true, passive: true });

    // 监听选择变化事件（备用方案，但需要防抖）
    document.addEventListener('selectionchange', () => {
      // 避免频繁触发，只在没有最近鼠标事件时使用
      if (!this.lastMouseEvent) {
        logger.debug('BytedeskWeb: selectionchange事件触发（无鼠标事件）');
        const mockEvent = new MouseEvent('mouseup', {
          clientX: window.innerWidth / 2,
          clientY: window.innerHeight / 2
        });
        this.handleTextSelectionWithDebounce(mockEvent);
      }
    });

    // 监听键盘事件，处理键盘选择
    document.addEventListener('keyup', (event) => {
      if (event.shiftKey || event.ctrlKey || event.metaKey) {
        logger.debug('BytedeskWeb: keyup事件触发（带修饰键）', event);
        this.handleTextSelectionWithDebounce(event);
      }
    }, { capture: true, passive: true });

    // 监听点击事件，隐藏提示
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      // 如果点击的不是反馈相关元素，隐藏提示
      if (!target?.closest('[data-bytedesk-feedback]')) {
        this.hideFeedbackTooltip();
      }
    });

    logger.debug('BytedeskWeb: 文本选择监听器设置完成');
  }

  /**
   * 带防抖的文本选择处理
   */
  private handleTextSelectionWithDebounce(event: Event) {
    if (this.config.isDebug) {
      logger.debug('BytedeskWeb: handleTextSelectionWithDebounce被调用 - 防抖机制生效');
    }
    
    // 清除之前的防抖定时器
    if (this.selectionDebounceTimer) {
      clearTimeout(this.selectionDebounceTimer);
      if (this.config.isDebug) {
        logger.debug('BytedeskWeb: 清除之前的防抖定时器');
      }
    }

    // 设置防抖延迟（200ms）
    this.selectionDebounceTimer = setTimeout(() => {
      if (this.config.isDebug) {
        logger.debug('BytedeskWeb: 防抖延迟结束，开始处理文本选择');
      }
      this.handleTextSelection(event);
    }, 200);
  }

  /**
   * 处理文本选择
   */
  private handleTextSelection(_event: Event) {
    if (this.config.isDebug) {
      logger.debug('BytedeskWeb: handleTextSelection被调用');
    }

    const selection = window.getSelection();
    if (this.config.isDebug) {
      logger.debug('BytedeskWeb: window.getSelection()结果:', selection);
      logger.debug('BytedeskWeb: selection.rangeCount:', selection?.rangeCount);
    }

    if (!selection || selection.rangeCount === 0) {
      if (this.config.isDebug) {
        logger.debug('BytedeskWeb: 没有选择或范围为0，隐藏提示');
      }
      this.hideFeedbackTooltip();
      return;
    }

    const selectedText = selection.toString().trim();
    if (this.config.isDebug) {
      logger.debug('BytedeskWeb: 检测到文本选择:', `"${selectedText}"`);
      logger.debug('BytedeskWeb: 选中文本长度:', selectedText.length);
    }

    // 检查是否与上次选择的文本相同
    if (selectedText === this.lastSelectionText && this.isTooltipVisible) {
      if (this.config.isDebug) {
        logger.debug('BytedeskWeb: 文本选择未变化且提示框已显示，跳过处理');
      }
      return;
    }

    if (selectedText.length === 0) {
      if (this.config.isDebug) {
        logger.debug('BytedeskWeb: 选中文本为空，隐藏提示');
      }
      this.hideFeedbackTooltip();
      return;
    }

    // 检查选中文本长度，避免显示过短的选择
    if (selectedText.length < 3) {
      if (this.config.isDebug) {
        logger.debug('BytedeskWeb: 选中文本太短，忽略:', `"${selectedText}"`);
      }
      this.hideFeedbackTooltip();
      return;
    }

    // 更新状态
    this.selectedText = selectedText;
    this.lastSelectionText = selectedText;
    
    // 存储选中文本的位置信息
    try {
      const range = selection.getRangeAt(0);
      this.lastSelectionRect = range.getBoundingClientRect();
      if (this.config.isDebug) {
        logger.debug('BytedeskWeb: 存储选中文本位置:', this.lastSelectionRect);
      }
    } catch (error) {
      if (this.config.isDebug) {
        logger.warn('BytedeskWeb: 获取选中文本位置失败:', error);
      }
      this.lastSelectionRect = null;
    }
    
    if (this.config.isDebug) {
      logger.debug('BytedeskWeb: 设置selectedText为:', `"${selectedText}"`);
    }

    // 显示反馈提示
    if (this.config.feedbackConfig?.showOnSelection) {
      if (this.config.isDebug) {
        logger.debug('BytedeskWeb: 配置允许显示选择提示，调用showFeedbackTooltip');
      }
      this.showFeedbackTooltip(this.lastMouseEvent || undefined);
    } else {
      if (this.config.isDebug) {
        logger.debug('BytedeskWeb: 配置不允许显示选择提示');
        logger.debug('BytedeskWeb: feedbackConfig.showOnSelection:', this.config.feedbackConfig?.showOnSelection);
      }
    }
  }

  /**
   * 创建反馈提示框
   */
  private createFeedbackTooltip() {
    if (this.config.isDebug) {
      logger.debug('BytedeskWeb: createFeedbackTooltip被调用');
    }

    // 检查提示框是否存在且在DOM中
    if (this.feedbackTooltip && document.body.contains(this.feedbackTooltip)) {
      if (this.config.isDebug) {
        logger.debug('BytedeskWeb: 反馈提示框已存在且在DOM中，跳过创建');
      }
      return;
    }

    // 如果变量存在但不在DOM中，重置变量
    if (this.feedbackTooltip && !document.body.contains(this.feedbackTooltip)) {
      if (this.config.isDebug) {
        logger.debug('BytedeskWeb: 提示框变量存在但不在DOM中，重置变量');
      }
      this.feedbackTooltip = null;
    }

    this.feedbackTooltip = document.createElement('div');
    this.feedbackTooltip.setAttribute('data-bytedesk-feedback', 'tooltip');
    this.feedbackTooltip.style.cssText = `
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
    `;

    const selectionText = this.config.feedbackConfig?.selectionText || '文档反馈';
    if (this.config.isDebug) {
      logger.debug('BytedeskWeb: 提示框文本:', selectionText);
    }

    // 添加图标和文本
    this.feedbackTooltip.innerHTML = `
      <span style="margin-right: 4px;">📝</span>
      ${selectionText}
    `;

    // 点击事件
    this.feedbackTooltip.addEventListener('click', async (e) => {
      if (this.config.isDebug) {
        logger.debug('BytedeskWeb: 反馈提示框被点击');
        logger.debug('BytedeskWeb: 点击时选中文字:', this.selectedText);
      }
      e.stopPropagation();
      e.preventDefault();
      
      // 先显示对话框，再隐藏提示框
      try {
        await this.showFeedbackDialog();
        if (this.config.isDebug) {
          logger.debug('BytedeskWeb: 对话框显示完成，现在隐藏提示框');
        }
        this.hideFeedbackTooltip();
      } catch (error) {
        if (this.config.isDebug) {
          logger.error('BytedeskWeb: 显示对话框时出错:', error);
        }
      }
    });

    // 添加到页面
    document.body.appendChild(this.feedbackTooltip);
    
    if (this.config.isDebug) {
      logger.debug('BytedeskWeb: 反馈提示框已创建并添加到页面');
      logger.debug('BytedeskWeb: 提示框元素:', this.feedbackTooltip);
    }
  }

  /**
   * 显示反馈提示框
   */
  private showFeedbackTooltip(_event?: MouseEvent) {
    if (this.config.isDebug) {
      logger.debug('BytedeskWeb: showFeedbackTooltip被调用');
      logger.debug('BytedeskWeb: feedbackTooltip存在:', !!this.feedbackTooltip);
      logger.debug('BytedeskWeb: selectedText存在:', !!this.selectedText);
    }

    // 检查提示框是否真的存在于DOM中
    const tooltipInDOM = this.feedbackTooltip && document.body.contains(this.feedbackTooltip);
    if (this.config.isDebug) {
      logger.debug('BytedeskWeb: feedbackTooltip在DOM中:', tooltipInDOM);
    }

    // 如果提示框不存在或不在DOM中，重新创建
    if (!this.feedbackTooltip || !tooltipInDOM) {
      if (this.config.isDebug) {
        logger.debug('BytedeskWeb: 提示框不存在或已从DOM中移除，重新创建');
      }
      this.createFeedbackTooltip();
    }

    if (!this.feedbackTooltip || !this.selectedText) {
      if (this.config.isDebug) {
        logger.debug('BytedeskWeb: 提示框或选中文本不存在，退出显示');
      }
      return;
    }

    // 获取选中文本的位置信息
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      if (this.config.isDebug) {
        logger.debug('BytedeskWeb: 无有效选择，无法计算位置');
      }
      return;
    }

    const range = selection.getRangeAt(0);
    
    // 获取选中文字的第一行位置，而不是整个选中区域
    let firstLineRect: DOMRect;
    
    try {
      // 创建一个新的范围来获取第一个字符的位置
      const startRange = document.createRange();
      startRange.setStart(range.startContainer, range.startOffset);
      
      // 尝试找到第一行的结束位置
      let endOffset = range.startOffset;
      const textContent = range.startContainer.textContent || '';
      
      // 如果开始容器是文本节点，尝试找到第一行的结束
      if (range.startContainer.nodeType === Node.TEXT_NODE) {
        // 逐个字符检查，找到第一个换行或者到选择结束
        while (endOffset < Math.min(textContent.length, range.endOffset)) {
          const testRange = document.createRange();
          testRange.setStart(range.startContainer, range.startOffset);
          testRange.setEnd(range.startContainer, endOffset + 1);
          
          const testRect = testRange.getBoundingClientRect();
          const startRect = startRange.getBoundingClientRect();
          
          // 如果垂直位置发生变化，说明换行了
          if (Math.abs(testRect.top - startRect.top) > 5) {
            break;
          }
          
          endOffset++;
        }
        
        startRange.setEnd(range.startContainer, Math.max(endOffset, range.startOffset + 1));
        firstLineRect = startRange.getBoundingClientRect();
      } else {
        // 如果不是文本节点，使用整个范围
        firstLineRect = range.getBoundingClientRect();
      }
    } catch (error) {
      // 如果出错，回退到使用整个选择区域
      if (this.config.isDebug) {
        logger.debug('BytedeskWeb: 获取第一行位置失败，使用整个选择区域:', error);
      }
      firstLineRect = range.getBoundingClientRect();
    }
    
    if (this.config.isDebug) {
      logger.debug('BytedeskWeb: 选中文本第一行位置信息:', {
        left: firstLineRect.left,
        top: firstLineRect.top,
        right: firstLineRect.right,
        bottom: firstLineRect.bottom,
        width: firstLineRect.width,
        height: firstLineRect.height
      });
    }

    // 计算提示框位置 - 显示在选中文字第一行左上角上方
    const tooltipWidth = 120; // 预估提示框宽度
    const tooltipHeight = 40; // 预估提示框高度
    const verticalOffset = 15; // 与选中文字的垂直间距，增加间距避免遮挡
    const horizontalOffset = 5; // 水平微调，避免完全贴边

    // 水平位置：选中文字第一行的左上角，稍微右移一点
    let x = firstLineRect.left + horizontalOffset;
    // 显示在选中文字第一行上方，增加垂直间距
    let y = firstLineRect.top - tooltipHeight - verticalOffset;

    // 边界检查和调整
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;

    // 左边界检查
    if (x < 10) {
      x = 10;
    }
    // 右边界检查
    if (x + tooltipWidth > viewportWidth - 10) {
      x = viewportWidth - tooltipWidth - 10;
    }

    // 上边界检查 - 如果上方空间不够，显示在第一行下方
    if (y < scrollY + 10) {
      y = firstLineRect.bottom + verticalOffset;
      if (this.config.isDebug) {
        logger.debug('BytedeskWeb: 上方空间不足，调整为显示在选中文字第一行下方');
      }
    }

    // 加上滚动偏移
    x += scrollX;
    y += scrollY;

    if (this.config.isDebug) {
      logger.debug('BytedeskWeb: 最终提示框位置:', { 
        x: x, 
        y: y, 
        说明: '显示在选中文字第一行左上角上方，增加间距避免遮挡',
        verticalOffset: verticalOffset,
        horizontalOffset: horizontalOffset,
        选中区域: firstLineRect,
        视口信息: { viewportWidth, viewportHeight, scrollX, scrollY }
      });
    }

    // 确保提示框完全重置到可见状态
    this.feedbackTooltip.style.position = 'absolute';
    this.feedbackTooltip.style.left = x + 'px';
    this.feedbackTooltip.style.top = y + 'px';
    this.feedbackTooltip.style.display = 'block';
    this.feedbackTooltip.style.visibility = 'visible';
    this.feedbackTooltip.style.opacity = '0'; // 先设为0，然后动画到1
    this.feedbackTooltip.style.zIndex = '999999';
    
    if (this.config.isDebug) {
      logger.debug('BytedeskWeb: 提示框位置已设置，样式:', {
        position: this.feedbackTooltip.style.position,
        left: this.feedbackTooltip.style.left,
        top: this.feedbackTooltip.style.top,
        display: this.feedbackTooltip.style.display,
        visibility: this.feedbackTooltip.style.visibility,
        opacity: this.feedbackTooltip.style.opacity,
        zIndex: this.feedbackTooltip.style.zIndex
      });
    }
    
    // 立即更新状态
    this.isTooltipVisible = true;
    
    // 延迟显示动画
    setTimeout(() => {
      if (this.feedbackTooltip && this.isTooltipVisible) {
        this.feedbackTooltip.style.opacity = '1';
        if (this.config.isDebug) {
          logger.debug('BytedeskWeb: 提示框透明度设置为1，应该可见了');
        }
      }
    }, 10);
  }

  /**
   * 隐藏反馈提示框
   */
  private hideFeedbackTooltip() {
    // 检查提示框是否真的存在于DOM中
    const tooltipInDOM = this.feedbackTooltip && document.body.contains(this.feedbackTooltip);
    
    if (this.config.isDebug) {
      logger.debug('BytedeskWeb: hideFeedbackTooltip被调用');
      logger.debug('BytedeskWeb: feedbackTooltip存在:', !!this.feedbackTooltip);
      logger.debug('BytedeskWeb: feedbackTooltip在DOM中:', tooltipInDOM);
    }

    if (!this.feedbackTooltip || !tooltipInDOM) {
      this.isTooltipVisible = false;
      this.lastSelectionText = '';
      if (this.config.isDebug) {
        logger.debug('BytedeskWeb: 提示框不存在或不在DOM中，仅重置状态');
      }
      return;
    }

    this.isTooltipVisible = false;
    this.lastSelectionText = '';
    this.feedbackTooltip.style.opacity = '0';
    
    // 使用更短的延迟并检查状态
    setTimeout(() => {
      // 只有在状态仍然是不可见时才真正隐藏
      if (this.feedbackTooltip && document.body.contains(this.feedbackTooltip) && !this.isTooltipVisible) {
        this.feedbackTooltip.style.display = 'none';
        this.feedbackTooltip.style.visibility = 'hidden';
        if (this.config.isDebug) {
          logger.debug('BytedeskWeb: 提示框已隐藏');
        }
      } else if (this.config.isDebug && this.isTooltipVisible) {
        logger.debug('BytedeskWeb: 跳过隐藏操作，提示框状态已改变为可见');
      }
    }, 100); // 减少延迟时间
  }

  /**
   * 创建反馈对话框
   */
  private createFeedbackDialog() {
    if (this.config.isDebug) {
      logger.debug('BytedeskWeb: createFeedbackDialog被调用');
    }

    // 检查对话框是否存在且在DOM中
    if (this.feedbackDialog && document.body.contains(this.feedbackDialog)) {
      if (this.config.isDebug) {
        logger.debug('BytedeskWeb: 反馈对话框已存在且在DOM中，跳过创建');
      }
      return;
    }

    // 如果变量存在但不在DOM中，重置变量
    if (this.feedbackDialog && !document.body.contains(this.feedbackDialog)) {
      if (this.config.isDebug) {
        logger.debug('BytedeskWeb: 对话框变量存在但不在DOM中，重置变量');
      }
      this.feedbackDialog = null;
    }

    this.feedbackDialog = document.createElement('div');
    this.feedbackDialog.setAttribute('data-bytedesk-feedback', 'dialog');
    this.feedbackDialog.style.cssText = `
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
    `;

    const dialogContent = document.createElement('div');
    dialogContent.style.cssText = `
      background: white;
      border-radius: 12px;
      padding: 24px;
      width: 90%;
      max-width: 600px;
      max-height: 80vh;
      overflow-y: auto;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      position: relative;
    `;

    dialogContent.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
        <h3 style="margin: 0; font-size: 18px; font-weight: 600; color: #333;">
          ${this.config.feedbackConfig?.dialogTitle || '提交意见反馈'}
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
        ">×</button>
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

      ${this.config.feedbackConfig?.categoryNames && this.config.feedbackConfig.categoryNames.length > 0 ? `
      <div style="margin-bottom: 16px;">
        <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #333;">
          <span style="color: #ff4d4f;">*</span> ${this.config.feedbackConfig?.typesSectionTitle || '问题类型'} ${this.config.feedbackConfig?.typesDescription || '（多选）'}
        </label>
        <div id="bytedesk-feedback-types" style="
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
          margin-bottom: 8px;
        ">
          ${this.config.feedbackConfig.categoryNames.map((categoryName) => `
            <label style="
              display: flex;
              align-items: flex-start;
              gap: 8px;
              cursor: pointer;
              padding: 8px;
              border-radius: 4px;
              transition: background-color 0.2s;
            " onmouseover="this.style.backgroundColor='#f5f5f5'" onmouseout="this.style.backgroundColor='transparent'">
              <input type="checkbox" name="feedback-type" value="${categoryName}" style="
                margin: 2px 0 0 0;
                cursor: pointer;
              ">
              <span style="
                font-size: 14px;
                line-height: 1.4;
                color: #333;
                flex: 1;
              ">${categoryName}</span>
            </label>
          `).join('')}
        </div>
      </div>
      ` : ''}

      ${this.config.feedbackConfig?.submitScreenshot !== false ? `
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
      ` : ''}

      <div style="margin-bottom: 20px;">
        <label style="display: block; margin-bottom: 8px; font-weight: 500; color: #333;">
          <span style="color: #ff4d4f;">*</span> 问题描述
        </label>
        <textarea id="bytedesk-feedback-text" placeholder="${this.config.feedbackConfig?.placeholder || '请详细描述您的问题或优化建议'}" style="
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
        ">${this.config.feedbackConfig?.cancelText || '取消'}</button>
        <button type="button" data-action="submit" style="
          background: #2e88ff;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          font-family: inherit;
        ">${this.config.feedbackConfig?.submitText || '提交反馈'}</button>
      </div>

      <div style="margin-top: 12px; text-align: center; font-size: 12px; color: #999;">
        <a href="https://www.weiyuai.cn/" target="_blank" rel="noopener noreferrer" style="color: #aaaaaa; text-decoration: none;">
           微语技术支持
        </a>
      </div>
    `;

    // 添加事件监听
    dialogContent.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const action = target.getAttribute('data-action');
      
      switch (action) {
        case 'close':
        case 'cancel':
          this.hideFeedbackDialog();
          this.config.feedbackConfig?.onCancel?.();
          break;
        case 'submit':
          this.submitFeedback();
          break;
      }
    });

    this.feedbackDialog.appendChild(dialogContent);

    // 点击遮罩关闭
    this.feedbackDialog.addEventListener('click', (e) => {
      if (e.target === this.feedbackDialog) {
        this.hideFeedbackDialog();
        this.config.feedbackConfig?.onCancel?.();
      }
    });

    // ESC键关闭
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.feedbackDialog?.style.display === 'flex') {
        this.hideFeedbackDialog();
        this.config.feedbackConfig?.onCancel?.();
      }
    });

    document.body.appendChild(this.feedbackDialog);
  }

  /**
   * 显示反馈对话框
   */
  private async showFeedbackDialog() {
    if (this.config.isDebug) {
      logger.debug('BytedeskWeb: showFeedbackDialog被调用');
      logger.debug('BytedeskWeb: feedbackDialog存在:', !!this.feedbackDialog);
    }

    // 检查对话框是否真的存在于DOM中
    const dialogInDOM = this.feedbackDialog && document.body.contains(this.feedbackDialog);
    if (this.config.isDebug) {
      logger.debug('BytedeskWeb: feedbackDialog在DOM中:', dialogInDOM);
    }

    // 如果对话框不存在或不在DOM中，重新创建
    if (!this.feedbackDialog || !dialogInDOM) {
      if (this.config.isDebug) {
        logger.debug('BytedeskWeb: 对话框不存在或已从DOM中移除，重新创建');
      }
      this.createFeedbackDialog();
    }

    if (!this.feedbackDialog) {
      if (this.config.isDebug) {
        logger.debug('BytedeskWeb: 对话框创建失败，退出显示');
      }
      return;
    }

    if (this.config.isDebug) {
      logger.debug('BytedeskWeb: 开始填充对话框内容');
    }

    // 填充选中的文字
    const selectedTextElement = this.feedbackDialog.querySelector('#bytedesk-selected-text');
    if (selectedTextElement) {
      selectedTextElement.textContent = this.selectedText || '';
      if (this.config.isDebug) {
        logger.debug('BytedeskWeb: 已填充选中文字:', this.selectedText);
      }
    }

    // 清空之前的反馈内容
    const feedbackTextarea = this.feedbackDialog.querySelector('#bytedesk-feedback-text') as HTMLTextAreaElement;
    if (feedbackTextarea) {
      feedbackTextarea.value = '';
    }

    // 显示对话框
    this.feedbackDialog.style.display = 'flex';
    
    if (this.config.isDebug) {
      logger.debug('BytedeskWeb: 对话框已设置为显示状态');
      logger.debug('BytedeskWeb: 对话框样式:', {
        display: this.feedbackDialog.style.display,
        visibility: this.feedbackDialog.style.visibility,
        zIndex: this.feedbackDialog.style.zIndex
      });
    }

    // 生成截图预览（但不上传）
    try {
      await this.generateScreenshotPreview();
      if (this.config.isDebug) {
        logger.debug('BytedeskWeb: 截图预览生成完成');
      }
    } catch (error) {
      if (this.config.isDebug) {
        logger.error('BytedeskWeb: 截图预览生成失败:', error);
      }
    }
  }

  /**
   * 隐藏反馈对话框
   */
  private hideFeedbackDialog() {
    if (!this.feedbackDialog) return;
    this.feedbackDialog.style.display = 'none';
  }

  /**
   * 生成页面截图并上传到服务器
   * @returns 返回上传后的截图URL，如果失败则返回null
   */
  private async generateAndUploadScreenshot(): Promise<string | null> {
    try {
      let canvas: HTMLCanvasElement;

      // 检查是否已有预生成的截图canvas
      const existingCanvas = (this.feedbackDialog as any)?.screenshotCanvas;
      if (existingCanvas) {
        if (this.config.isDebug) {
          logger.debug('BytedeskWeb: 使用已生成的截图canvas');
        }
        canvas = existingCanvas;
      } else {
        // 如果没有预生成的截图，重新生成
        const html2canvas = await this.loadHtml2Canvas();
        if (!html2canvas) {
          if (this.config.isDebug) {
            logger.debug('BytedeskWeb: html2canvas加载失败，跳过截图');
          }
          return null;
        }

        if (this.config.isDebug) {
          logger.debug('BytedeskWeb: 重新生成截图');
        }

        // 计算选中文本附近的截图区域
        const screenshotOptions = this.calculateScreenshotArea();
        
        // 生成截图
        canvas = await html2canvas(document.body, {
          height: screenshotOptions.height,
          width: screenshotOptions.width,
          x: screenshotOptions.x,
          y: screenshotOptions.y,
          useCORS: true,
          allowTaint: true,
          backgroundColor: '#ffffff',
          scale: 1,
          ignoreElements: (element: HTMLElement) => {
            // 忽略反馈相关的元素
            return element.hasAttribute('data-bytedesk-feedback') || 
                   element.closest('[data-bytedesk-feedback]') !== null;
          }
        });
      }

      // 将Canvas转换为Blob
      return new Promise<string | null>((resolve) => {
        canvas.toBlob(async (blob: Blob | null) => {
          if (!blob) {
            logger.error('无法生成截图blob');
            resolve(null);
            return;
          }

          try {
            // 创建文件对象
            const fileName = `screenshot_${Date.now()}.jpg`;
            const file = new File([blob], fileName, { type: 'image/jpeg' });
            
            if (this.config.isDebug) {
              logger.debug('BytedeskWeb: 截图生成成功，文件大小:', Math.round(blob.size / 1024), 'KB');
            }
            
            // 动态导入上传API并上传截图到服务器
            const { uploadScreenshot } = await import('../apis/upload');
            const screenshotUrl = await uploadScreenshot(file, {
              orgUid: this.config.chatConfig?.org || '',
              isDebug: this.config.isDebug
            });
            
            if (this.config.isDebug) {
              logger.debug('BytedeskWeb: 截图上传成功，URL:', screenshotUrl);
            }
            
            resolve(screenshotUrl);
          } catch (error) {
            logger.error('截图上传失败:', error);
            resolve(null);
          }
        }, 'image/jpeg', 0.8);
      });

    } catch (error) {
      logger.error('生成截图失败:', error);
      return null;
    }
  }

  /**
   * 生成截图预览（不上传到服务器）
   */
  private async generateScreenshotPreview() {
    const screenshotContainer = this.feedbackDialog?.querySelector('#bytedesk-screenshot-container');
    if (!screenshotContainer) return;

    try {
      // 动态导入 html2canvas
      const html2canvas = await this.loadHtml2Canvas();
      if (!html2canvas) {
        screenshotContainer.innerHTML = `
          <div style="color: #999; text-align: center; padding: 20px; flex-direction: column; gap: 8px; display: flex; align-items: center;">
            <div style="font-size: 24px;">📷</div>
            <div>截图功能暂时不可用</div>
            <div style="font-size: 12px; color: #666;">网络连接问题或资源加载失败</div>
          </div>
        `;
        return;
      }

      screenshotContainer.innerHTML = '正在生成截图预览...';

      if (this.config.isDebug) {
        logger.debug('BytedeskWeb: 开始生成截图预览');
      }

      // 计算选中文本附近的截图区域
      const screenshotOptions = this.calculateScreenshotArea();
      
      // 生成截图
      const canvas = await html2canvas(document.body, {
        height: screenshotOptions.height,
        width: screenshotOptions.width,
        x: screenshotOptions.x,
        y: screenshotOptions.y,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        scale: 1,
        ignoreElements: (element: HTMLElement) => {
          // 忽略反馈相关的元素
          return element.hasAttribute('data-bytedesk-feedback') || 
                 element.closest('[data-bytedesk-feedback]') !== null;
        }
      });

      // 创建预览图片
      const img = document.createElement('img');
      img.src = canvas.toDataURL('image/jpeg', 0.8);
      img.style.cssText = `
        max-width: 100%;
        max-height: 200px;
        border-radius: 4px;
        border: 1px solid #ddd;
        cursor: pointer;
      `;

      // 添加点击放大功能
      img.onclick = () => {
        const fullImg = document.createElement('img');
        fullImg.src = img.src;
        fullImg.style.cssText = `
          max-width: 90vw;
          max-height: 90vh;
          border-radius: 8px;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        `;
        
        const overlay = document.createElement('div');
        overlay.style.cssText = `
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
        `;
        
        // 添加关闭提示
        const closeHint = document.createElement('div');
        closeHint.style.cssText = `
          position: absolute;
          top: 20px;
          right: 20px;
          color: white;
          font-size: 14px;
          background: rgba(0,0,0,0.6);
          padding: 8px 12px;
          border-radius: 4px;
          user-select: none;
        `;
        closeHint.textContent = '点击任意位置关闭';
        overlay.appendChild(closeHint);
        
        overlay.appendChild(fullImg);
        overlay.onclick = () => document.body.removeChild(overlay);
        document.body.appendChild(overlay);
      };

      // 创建容器包含图片和提示文字
      const previewContainer = document.createElement('div');
      previewContainer.style.cssText = `
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
      `;
      
      previewContainer.appendChild(img);
      
      const tipText = document.createElement('div');
      tipText.style.cssText = `
        font-size: 12px;
        color: #666;
        text-align: center;
      `;
      tipText.innerHTML = '点击图片可放大查看<br/>提交时将自动上传此截图';
      previewContainer.appendChild(tipText);

      screenshotContainer.innerHTML = '';
      screenshotContainer.appendChild(previewContainer);

      // 在对话框对象上存储canvas，以便提交时使用
      (this.feedbackDialog as any).screenshotCanvas = canvas;

      if (this.config.isDebug) {
        logger.debug('BytedeskWeb: 截图预览生成成功');
      }

    } catch (error) {
      logger.error('生成截图预览失败:', error);
      screenshotContainer.innerHTML = `
        <div style="color: #ff6b6b; text-align: center; flex-direction: column; gap: 8px; display: flex; align-items: center;">
          <div style="font-size: 24px;">⚠️</div>
          <div>截图预览生成失败</div>
          <div style="font-size: 12px; margin-top: 4px; color: #999;">请检查页面权限或网络连接</div>
        </div>
      `;
    }
  }

  /**
   * 计算选中文本附近的截图区域
   */
  private calculateScreenshotArea() {
    // 默认截图整个视窗
    let screenshotOptions = {
      height: window.innerHeight,
      width: window.innerWidth,
      x: 0,
      y: 0,
      scrollX: 0,
      scrollY: 0
    };

    try {
      // 优先使用存储的选中文本位置
      let rect = this.lastSelectionRect;
      
      // 如果没有存储的位置，尝试获取当前选中的文本位置
      if (!rect) {
        const selection = window.getSelection();
        if (selection && selection.rangeCount > 0) {
          const range = selection.getRangeAt(0);
          rect = range.getBoundingClientRect();
        }
      }
      
      if (rect && rect.width > 0 && rect.height > 0) {
        // 获取当前页面的滚动位置
        const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        
        // 计算选中文本在页面中的绝对位置
        const absoluteLeft = rect.left + scrollX;
        const absoluteTop = rect.top + scrollY;
        
        // 设置截图区域的大小（围绕选中文本）
        const captureWidth = Math.min(800, window.innerWidth);  // 最大800px宽
        const captureHeight = Math.min(600, window.innerHeight); // 最大600px高
        
        // 计算截图区域的左上角位置（以选中文本为中心）
        let captureX = absoluteLeft - captureWidth / 2;
        let captureY = absoluteTop - captureHeight / 2;
        
        // 确保截图区域不超出页面边界
        const pageWidth = document.documentElement.scrollWidth;
        const pageHeight = document.documentElement.scrollHeight;
        
        captureX = Math.max(0, Math.min(captureX, pageWidth - captureWidth));
        captureY = Math.max(0, Math.min(captureY, pageHeight - captureHeight));
        
        screenshotOptions = {
          height: captureHeight,
          width: captureWidth,
          x: captureX,
          y: captureY,
          scrollX: 0,
          scrollY: 0
        };
        
        if (this.config.isDebug) {
          logger.debug('BytedeskWeb: 选中文本截图区域:', {
            selectedRect: rect,
            absolutePosition: { left: absoluteLeft, top: absoluteTop },
            captureArea: { x: captureX, y: captureY, width: captureWidth, height: captureHeight },
            pageSize: { width: pageWidth, height: pageHeight }
          });
        }
      } else {
        // 如果没有选中文本，尝试使用存储的最后一次鼠标事件位置
        if (this.lastMouseEvent) {
          const scrollX = window.pageXOffset || document.documentElement.scrollLeft;
          const scrollY = window.pageYOffset || document.documentElement.scrollTop;
          
          const absoluteX = this.lastMouseEvent.clientX + scrollX;
          const absoluteY = this.lastMouseEvent.clientY + scrollY;
          
          const captureWidth = Math.min(800, window.innerWidth);
          const captureHeight = Math.min(600, window.innerHeight);
          
          let captureX = absoluteX - captureWidth / 2;
          let captureY = absoluteY - captureHeight / 2;
          
          const pageWidth = document.documentElement.scrollWidth;
          const pageHeight = document.documentElement.scrollHeight;
          
          captureX = Math.max(0, Math.min(captureX, pageWidth - captureWidth));
          captureY = Math.max(0, Math.min(captureY, pageHeight - captureHeight));
          
          screenshotOptions = {
            height: captureHeight,
            width: captureWidth,
            x: captureX,
            y: captureY,
            scrollX: 0,
            scrollY: 0
          };
          
          if (this.config.isDebug) {
            logger.debug('BytedeskWeb: 鼠标位置截图区域:', {
              mousePosition: { x: this.lastMouseEvent.clientX, y: this.lastMouseEvent.clientY },
              absolutePosition: { x: absoluteX, y: absoluteY },
              captureArea: { x: captureX, y: captureY, width: captureWidth, height: captureHeight }
            });
          }
        }
      }
    } catch (error) {
      if (this.config.isDebug) {
        logger.warn('BytedeskWeb: 计算截图区域失败，使用默认区域:', error);
      }
    }
    
    return screenshotOptions;
  }

  /**
   * 动态加载 html2canvas
   */
  private async loadHtml2Canvas() {
    try {
      // 尝试从全局变量获取
      if ((window as any).html2canvas) {
        return (window as any).html2canvas;
      }

      // 尝试通过 CDN 加载
      return await this.loadHtml2CanvasFromCDN();
    } catch (error) {
      if (this.config.isDebug) {
        logger.warn('html2canvas 加载失败:', error);
      }
      return null;
    }
  }

  /**
   * 从CDN加载html2canvas
   */
  private async loadHtml2CanvasFromCDN(): Promise<any> {
    return new Promise((resolve, reject) => {
      // 检查是否已经加载
      if ((window as any).html2canvas) {
        resolve((window as any).html2canvas);
        return;
      }

      // 创建script标签加载资源
      const script = document.createElement('script');
      script.src = this.config.apiUrl + '/assets/js/html2canvas.min.js';
      script.onload = () => {
        if ((window as any).html2canvas) {
          resolve((window as any).html2canvas);
        } else {
          reject(new Error('html2canvas 加载失败'));
        }
      };
      script.onerror = () => {
        reject(new Error('无法从CDN加载html2canvas'));
      };
      document.head.appendChild(script);
    });
  }



  /**
   * 提交反馈
   */
  private async submitFeedback() {
    const feedbackTextarea = this.feedbackDialog?.querySelector('#bytedesk-feedback-text') as HTMLTextAreaElement;
    const feedbackText = feedbackTextarea?.value.trim() || '';

    if (!feedbackText) {
      alert('请填写反馈内容');
      feedbackTextarea?.focus();
      return;
    }

    // 收集选中的反馈类型
    const selectedTypes: string[] = [];
    const typeCheckboxes = this.feedbackDialog?.querySelectorAll('input[name="feedback-type"]:checked') as NodeListOf<HTMLInputElement>;
    if (typeCheckboxes) {
      typeCheckboxes.forEach((checkbox) => {
        selectedTypes.push(checkbox.value);
      });
    }

    // 检查是否必须选择反馈类型
    if (this.config.feedbackConfig?.requiredTypes && selectedTypes.length === 0) {
      alert('请至少选择一个问题类型');
      return;
    }

    // 获取提交按钮并设置加载状态
    const submitButton = this.feedbackDialog?.querySelector('.bytedesk-feedback-submit') as HTMLButtonElement;
    const originalSubmitText = submitButton?.textContent || '提交反馈';
    
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = '提交中...';
      submitButton.style.opacity = '0.6';
    }

    try {
      // 检查是否需要提交截图
      const submitScreenshotCheckbox = this.feedbackDialog?.querySelector('#bytedesk-submit-screenshot') as HTMLInputElement;
      const shouldSubmitScreenshot = submitScreenshotCheckbox?.checked !== false;
      
      let screenshotUrls: string[] = [];
      
      // 如果需要提交截图，先生成和上传截图
      if (shouldSubmitScreenshot) {
        if (this.config.isDebug) {
          logger.debug('BytedeskWeb: 开始生成和上传截图');
        }
        
        if (submitButton) {
          submitButton.textContent = '正在生成截图...';
        }
        
        // 生成截图
        const screenshotUrl = await this.generateAndUploadScreenshot();
        if (screenshotUrl) {
          screenshotUrls.push(screenshotUrl);
          if (this.config.isDebug) {
            logger.debug('BytedeskWeb: 截图上传成功:', screenshotUrl);
          }
        }
        
        if (submitButton) {
          submitButton.textContent = '正在提交反馈...';
        }
      }
      
      // 构建反馈数据（统一数据结构）
      const feedbackData: FEEDBACK.FeedbackRequest = {
        selectedText: this.selectedText,
        ...(screenshotUrls.length > 0 && { images: screenshotUrls }), // 将截图URL放入images数组
        content: feedbackText,
        url: window.location.href,
        title: document.title,
        userAgent: navigator.userAgent,
        visitorUid: localStorage.getItem('bytedesk_uid') || '',
        orgUid: this.config.chatConfig?.org || '',
        ...(selectedTypes.length > 0 && { categoryNames: selectedTypes.join(',') }),
      };

      // 调用提交回调或提交到服务器
      if (this.config.feedbackConfig?.onSubmit) {
        // 如果有自定义回调，调用回调函数（现在类型完全匹配）
        this.config.feedbackConfig.onSubmit(feedbackData);
      } else {
        // 默认提交到服务器
        await this.submitFeedbackToServer(feedbackData);
      }

      // 显示成功消息
      this.showFeedbackSuccess();
      
      // 关闭对话框
      setTimeout(() => {
        this.hideFeedbackDialog();
      }, 2000);

    } catch (error) {
      logger.error('提交反馈失败:', error);
      alert('提交失败，请稍后重试');
    } finally {
      // 恢复提交按钮状态
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = originalSubmitText;
        submitButton.style.opacity = '1';
      }
    }
  }

  /**
   * 提交反馈到服务器
   */
  private async submitFeedbackToServer(feedbackData: FEEDBACK.FeedbackRequest) {
    try {
      const { submitFeedback } = await import('../apis/feedback');
      const response = await submitFeedback(feedbackData);
      
      if (this.config.isDebug) {
        logger.debug('反馈提交响应:', response);
      }
      
      return response;
    } catch (error) {
      logger.error('提交反馈到服务器失败:', error);
      throw error;
    }
  }

  /**
   * 显示反馈成功消息
   */
  private showFeedbackSuccess() {
    if (!this.feedbackDialog) return;

    const dialogContent = this.feedbackDialog.querySelector('div > div');
    if (!dialogContent) return;

    dialogContent.innerHTML = `
      <div style="text-align: center; padding: 40px 20px;">
        <div style="font-size: 48px; margin-bottom: 16px;">✅</div>
        <h3 style="margin: 0 0 12px 0; color: #28a745;">
          ${this.config.feedbackConfig?.successMessage || '反馈已提交，感谢您的意见！'}
        </h3>
        <div style="color: #666; font-size: 14px;">
          我们会认真处理您的反馈，不断改进产品体验
        </div>
      </div>
    `;
  }

  /**
   * 公共方法：显示反馈对话框
   */
  public showDocumentFeedback(selectedText?: string) {
    if (!this.config.feedbackConfig?.enabled) {
      logger.warn('文档反馈功能未启用');
      return;
    }

    if (selectedText) {
      this.selectedText = selectedText;
    }

    this.showFeedbackDialog();
  }

  /**
   * 公共方法：重新初始化反馈功能
   */
  public reinitFeedbackFeature() {
    if (this.config.isDebug) {
      logger.debug('BytedeskWeb: 重新初始化反馈功能');
    }
    // 先销毁现有的反馈功能
    this.destroyFeedbackFeature();
    // 重新初始化
    this.initFeedbackFeature();
  }

  /**
   * 公共方法：强制初始化反馈功能（用于调试）
   */
  public forceInitFeedbackFeature() {
    logger.debug('BytedeskWeb: 强制初始化反馈功能被调用');
    logger.debug('BytedeskWeb: 当前配置:', this.config.feedbackConfig);
    logger.debug('BytedeskWeb: isDebug:', this.config.isDebug);
    
    // 确保配置是启用的
    if (!this.config.feedbackConfig) {
      logger.debug('BytedeskWeb: 创建默认反馈配置');
      this.config.feedbackConfig = {
        enabled: true,
        trigger: 'selection',
        showOnSelection: true,
        selectionText: '📝 文档反馈',
        dialogTitle: '提交意见反馈',
        placeholder: '请详细描述您发现的问题、改进建议或其他意见...',
        submitText: '提交反馈',
        cancelText: '取消',
        successMessage: '感谢您的反馈！我们会认真处理您的意见。',
      };
    }
    
    if (!this.config.feedbackConfig.enabled) {
      logger.debug('BytedeskWeb: 启用反馈配置');
      this.config.feedbackConfig.enabled = true;
    }
    
    logger.debug('BytedeskWeb: 销毁现有反馈功能');
    this.destroyFeedbackFeature();
    
    logger.debug('BytedeskWeb: 重新初始化反馈功能');
    this.initFeedbackFeature();
    
    logger.debug('BytedeskWeb: 强制初始化完成，检查结果:');
    logger.debug('- showDocumentFeedback方法存在:', typeof this.showDocumentFeedback === 'function');
    logger.debug('- testTextSelection方法存在:', typeof this.testTextSelection === 'function');
    logger.debug('- 反馈提示框存在:', !!this.feedbackTooltip);
    logger.debug('- 反馈对话框存在:', !!this.feedbackDialog);
    logger.debug('- 反馈提示框DOM存在:', !!document.querySelector('[data-bytedesk-feedback="tooltip"]'));
    logger.debug('- 反馈对话框DOM存在:', !!document.querySelector('[data-bytedesk-feedback="dialog"]'));
    
    // 返回初始化状态
    return {
      success: !!(this.feedbackTooltip && this.feedbackDialog),
      methods: {
        showDocumentFeedback: typeof this.showDocumentFeedback === 'function',
        testTextSelection: typeof this.testTextSelection === 'function'
      },
      elements: {
        tooltip: !!this.feedbackTooltip,
        dialog: !!this.feedbackDialog,
        tooltipDOM: !!document.querySelector('[data-bytedesk-feedback="tooltip"]'),
        dialogDOM: !!document.querySelector('[data-bytedesk-feedback="dialog"]')
      }
    };
  }

  /**
   * 公共方法：测试文本选择功能
   */
  public testTextSelection(text: string = '测试选中文字') {
    if (this.config.isDebug) {
      logger.debug('BytedeskWeb: 测试文本选择功能，模拟选中文字:', `"${text}"`);
    }
    
    this.selectedText = text;
    
    // 创建一个模拟的文本选择
    try {
      const testElement = document.createElement('div');
      testElement.textContent = text;
      testElement.style.cssText = `
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
      `;
      document.body.appendChild(testElement);
      
      // 创建选择范围
      const range = document.createRange();
      range.selectNodeContents(testElement);
      
      const selection = window.getSelection();
      if (selection) {
        selection.removeAllRanges();
        selection.addRange(range);
        
        if (this.config.isDebug) {
          logger.debug('BytedeskWeb: 已创建模拟文本选择');
        }
        
        // 显示提示框
        if (this.feedbackTooltip) {
          this.showFeedbackTooltip();
        } else {
          logger.error('BytedeskWeb: 反馈提示框不存在，无法测试');
        }
        
        // 5秒后清理
        setTimeout(() => {
          if (selection) {
            selection.removeAllRanges();
          }
          if (document.body.contains(testElement)) {
            document.body.removeChild(testElement);
          }
          this.hideFeedbackTooltip();
        }, 5000);
      }
    } catch (error) {
      logger.error('BytedeskWeb: 创建测试选择失败:', error);
    }
  }

  /**
   * 公共方法：获取调试信息
   */
  public getDebugInfo() {
    return {
      config: this.config,
      feedbackConfig: this.config.feedbackConfig,
      feedbackTooltip: !!this.feedbackTooltip,
      feedbackDialog: !!this.feedbackDialog,
      selectedText: this.selectedText,
      methods: {
        showDocumentFeedback: typeof this.showDocumentFeedback,
        testTextSelection: typeof this.testTextSelection,
        forceInitFeedbackFeature: typeof this.forceInitFeedbackFeature
      }
    };
  }

  /**
   * 公共方法：销毁反馈功能
   */
  private destroyFeedbackFeature() {
    if (this.feedbackTooltip) {
      this.feedbackTooltip.remove();
      this.feedbackTooltip = null;
    }

    if (this.feedbackDialog) {
      this.feedbackDialog.remove();
      this.feedbackDialog = null;
    }

    this.selectedText = '';
  }
}
