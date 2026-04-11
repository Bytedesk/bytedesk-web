/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-31 10:20:19
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-09-22 10:31:18
 */
import { useEffect, useMemo, useState } from 'react';
// @ts-ignore
import { BytedeskReact } from '@bytedesk/web/adapters/react';
// @ts-ignore
import type { ButtonConfig, BytedeskConfig, Theme } from '@bytedesk/web/types';
import type { MenuProps } from 'antd';
import InstallGuide from '../components/InstallGuide';
import PageContainer from '../components/PageContainer';
import { getLocaleMessages, type DemoLanguage } from '../locales';
import { formatChatConfigQuery, getConsultButtonLabel, type DemoChatProfile } from '../types/chat-profile';
import { FloatButton, theme } from 'antd';
import BasicDemoConfigDocsCard from './basic-demo/BasicDemoConfigDocsCard';
import BasicDemoControlsCard from './basic-demo/BasicDemoControlsCard';
import { buildConfigDocSections } from './basic-demo/config-docs';
import {
  getConfigGuideCopy,
  getExampleCopy,
  getLocaleValueHint,
  getLocalizedCopy,
} from './basic-demo/copy';
import {
  buildFullConfigExample,
  buildMinimalConfigExample,
  buildRecommendedConfigExample,
} from './basic-demo/examples';
import {
  LANG_EN,
  LANG_ES_ES,
  LANG_FR_FR,
  LANG_JA_JP,
  LANG_KO_KR,
  LANG_MS_MY,
  TEXT_COLORS,
  LANG_VI_VN,
  LANG_ZH_CN,
  LANG_ZH_TW,
  THEME_COLORS,
  type EntryAction,
} from './basic-demo/constants';

interface BasicDemoProps {
  locale: DemoLanguage;
  themeMode: Theme['mode'];
  themePreference: 'light' | 'dark' | 'system';
  selectedChatProfile: DemoChatProfile;
  onLocaleChange: (nextLocale: DemoLanguage) => void;
  onThemePreferenceChange: (nextTheme: 'light' | 'dark' | 'system') => void;
}

type BytedeskRuntimeApi = {
  setTheme?: (theme: Partial<Theme>) => void;
  setConfig?: (config: Partial<BytedeskConfig>) => void;
  showChat?: (config?: Partial<BytedeskConfig>) => void;
  showThread?: (config?: Partial<BytedeskConfig>) => void;
  showWebrtc?: (config?: Partial<BytedeskConfig>) => void;
  showCall?: (config?: Partial<BytedeskConfig>) => void;
  hideChat?: () => void;
  showButton?: () => void;
  hideButton?: () => void;
  showBubble?: () => void;
  hideBubble?: () => void;
  showInviteDialog?: () => void;
  hideInviteDialog?: () => void;
};

const getBytedeskRuntime = (): BytedeskRuntimeApi | null => {
  return ((window as any).bytedesk || null) as BytedeskRuntimeApi | null;
};

const getReadableTextColor = (backgroundColor: string): string => {
  const normalized = backgroundColor.trim().replace('#', '');
  const fullHex = normalized.length === 3
    ? normalized.split('').map((char) => char + char).join('')
    : normalized;

  if (!/^[0-9a-fA-F]{6}$/.test(fullHex)) {
    return '#ffffff';
  }

  const red = Number.parseInt(fullHex.slice(0, 2), 16);
  const green = Number.parseInt(fullHex.slice(2, 4), 16);
  const blue = Number.parseInt(fullHex.slice(4, 6), 16);
  const brightness = (red * 299 + green * 587 + blue * 114) / 1000;

  return brightness >= 186 ? '#111111' : '#ffffff';
};

const BasicDemo = ({
  locale,
  themeMode,
  themePreference,
  selectedChatProfile,
  onLocaleChange,
  onThemePreferenceChange
}: BasicDemoProps) => {
  const messages = useMemo(() => getLocaleMessages(locale), [locale]);
  const { token } = theme.useToken();
  const chatHtmlBaseUrl = process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:9006'
    : 'https://cdn.weiyuai.cn';
  const webrtcHtmlBaseUrl = process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:9018'
    : 'https://cdn.weiyuai.cn';
  const callHtmlBaseUrl = process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:9022'
    : 'https://cdn.weiyuai.cn';
  const [lastActionApiHint, setLastActionApiHint] = useState<string>('');
  const [isMultiBubbleDemo, setIsMultiBubbleDemo] = useState<boolean>(true);
  const [bubbleSwitchMode, setBubbleSwitchMode] = useState<'fade' | 'slide-up' | 'ticker'>('fade');
  const [selectedEntryActions, setSelectedEntryActions] = useState<EntryAction[]>(['chat']);
  const [qrCodeImageUrl, setQrCodeImageUrl] = useState<string>('https://www.weiyuai.cn/assets/images/qrcode/wechat.png');

  const localeValueHint = getLocaleValueHint(locale);
  const localizedCopy = getLocalizedCopy(locale, isMultiBubbleDemo, bubbleSwitchMode);

  const bubbleMessageList = useMemo(
    () => [
      {
        icon: '👋',
        title: messages.pages.basicDemo.bubbleTitle,
        subtitle: messages.pages.basicDemo.bubbleSubtitle
      },
      {
        icon: '🧠',
        title: localizedCopy.bubbleAgentTitle,
        subtitle: localizedCopy.bubbleAgentSubtitle
      },
      {
        icon: '📹',
        title: localizedCopy.bubbleWebrtcTitle,
        subtitle: localizedCopy.bubbleWebrtcSubtitle
      }
    ],
    [localizedCopy, messages]
  );

  const entryActionOptions = useMemo(
    () => ([
      { key: 'chat' as EntryAction, label: `💬 ${localizedCopy.entryChatLabel}` },
      { key: 'thread' as EntryAction, label: `🧵 ${localizedCopy.entryThreadLabel}` },
      { key: 'webrtc' as EntryAction, label: `📹 ${localizedCopy.entryWebrtcLabel}` },
      { key: 'call' as EntryAction, label: `📞 ${localizedCopy.entryCallLabel}` },
      { key: 'qrcode' as EntryAction, label: `🧾 ${localizedCopy.entryQrLabel}` }
    ]),
    [localizedCopy]
  );

  const multiSessionButtons = useMemo<NonNullable<BytedeskConfig['buttonsConfig']>>(() => {
    const shouldShowEntryText = selectedEntryActions.length > 1;
    const allButtons: Record<EntryAction, NonNullable<BytedeskConfig['buttonsConfig']>[number]> = {
      chat: {
        show: true,
        icon: '💬',
        text: shouldShowEntryText ? localizedCopy.entryChatLabel : undefined,
        action: 'chat',
        width: 54,
        height: 54,
        onClick: () => (window as any).bytedesk?.showChat({ htmlUrl: chatHtmlBaseUrl })
      },
      thread: {
        show: true,
        icon: '🧵',
        text: shouldShowEntryText ? localizedCopy.entryThreadLabel : undefined,
        action: 'thread',
        width: 54,
        height: 54,
        onClick: () => (window as any).bytedesk?.showThread({ htmlUrl: chatHtmlBaseUrl })
      },
      webrtc: {
        show: true,
        icon: '📹',
        text: shouldShowEntryText ? localizedCopy.entryWebrtcLabel : undefined,
        action: 'webrtc',
        width: 54,
        height: 54,
        onClick: () => (window as any).bytedesk?.showWebrtc({ htmlUrl: webrtcHtmlBaseUrl })
      },
      call: {
        show: true,
        icon: '📞',
        text: shouldShowEntryText ? localizedCopy.entryCallLabel : undefined,
        action: 'call',
        width: 54,
        height: 54,
        onClick: () => (window as any).bytedesk?.showCall({ htmlUrl: callHtmlBaseUrl })
      },
      qrcode: {
        show: true,
        icon: '🧾',
        text: shouldShowEntryText ? localizedCopy.entryQrLabel : undefined,
        width: 54,
        height: 54,
        previewImageUrl: qrCodeImageUrl,
        previewImageAlt: localizedCopy.entryQrLabel,
        onClick: () => undefined,
      }
    };

    return selectedEntryActions.map((action) => allButtons[action]);
  }, [callHtmlBaseUrl, chatHtmlBaseUrl, localizedCopy, qrCodeImageUrl, selectedEntryActions, webrtcHtmlBaseUrl]);

  const [config, setConfig] = useState<BytedeskConfig>(() => ({
    isDebug: false,
    ...(process.env.NODE_ENV === 'development'
      ? {
        htmlUrl: chatHtmlBaseUrl,
        apiUrl: 'http://127.0.0.1:9003'
      }
      : { htmlUrl: chatHtmlBaseUrl }),
    placement: 'bottom-right',
    marginBottom: 20,
    marginSide: 20,
    autoPopup: false,
    draggable: true,
    inviteConfig: {
      show: false,
      delay: 1000,
      loop: true,
      loopDelay: 10000,
      loopCount: 3
    },
    bubbleConfig: {
      show: true,
      icon: '👋',
      title: messages.pages.basicDemo.bubbleTitle,
      subtitle: messages.pages.basicDemo.bubbleSubtitle,
      messages: bubbleMessageList,
      autoRotate: true,
      rotateInterval: 3000,
      switchMode: bubbleSwitchMode
    },
    buttonConfig: {
      show: true,
      width: 60,
      height: 60
    },
    buttonsConfig: multiSessionButtons,
    chatConfig: {
      ...selectedChatProfile.chatConfig
    },
    theme: {
      mode: themeMode || 'light',
      textColor: '#ffffff',
      backgroundColor: THEME_COLORS[0]
    },
    locale,
    onVisitorInfo: (uid: string, visitorUid: string) => {
      console.log('BasicDemo 收到访客信息:', { uid, visitorUid });
    }
  }));

  useEffect(() => {
    setConfig((prevConfig: BytedeskConfig) => ({
      ...prevConfig,
      locale,
      theme: {
        ...prevConfig.theme,
        mode: themeMode || prevConfig.theme?.mode
      },
      bubbleConfig: {
        ...prevConfig.bubbleConfig,
        title: messages.pages.basicDemo.bubbleTitle,
        subtitle: messages.pages.basicDemo.bubbleSubtitle,
        messages: isMultiBubbleDemo ? bubbleMessageList : undefined,
        autoRotate: isMultiBubbleDemo,
        rotateInterval: 3000,
        switchMode: bubbleSwitchMode
      },
      chatConfig: {
        ...(prevConfig.chatConfig || {}),
        ...selectedChatProfile.chatConfig
      },
      buttonsConfig: multiSessionButtons
    }));
  }, [bubbleMessageList, bubbleSwitchMode, isMultiBubbleDemo, locale, multiSessionButtons, themeMode, messages, selectedChatProfile]);

  const handleInit = () => {
    console.log('BytedeskReact initialized BasicDemo');
  };

  const handleNavColorSwitch = (nextColor: string) => {
    const nextTextColor = getReadableTextColor(nextColor);
    getBytedeskRuntime()?.setTheme?.({ backgroundColor: nextColor, textColor: nextTextColor });
    setConfig((prevConfig: BytedeskConfig) => ({
      ...prevConfig,
      theme: {
        ...prevConfig.theme,
        backgroundColor: nextColor,
        textColor: nextTextColor
      }
    }));
    setLastActionApiHint(`bytedesk.setTheme({ backgroundColor: "${nextColor}", textColor: "${nextTextColor}" })`);
  };

  const handleNavTextColorSwitch = (nextTextColor: string) => {
    getBytedeskRuntime()?.setTheme?.({ textColor: nextTextColor });
    setConfig((prevConfig: BytedeskConfig) => ({
      ...prevConfig,
      theme: {
        ...prevConfig.theme,
        textColor: nextTextColor
      }
    }));
    setLastActionApiHint(`bytedesk.setTheme({ textColor: "${nextTextColor}" })`);
  };

  const handlePlacementToggle = () => {
    const nextPlacement = config.placement === 'bottom-left' ? 'bottom-right' : 'bottom-left';
    getBytedeskRuntime()?.setConfig?.({ placement: nextPlacement });
    setConfig((prevConfig: BytedeskConfig) => ({
      ...prevConfig,
      placement: nextPlacement
    }));
    setLastActionApiHint(`bytedesk.setConfig({ placement: "${nextPlacement}" })`);
  };

  const handleToggleLoadHistory = () => {
    setConfig((prevConfig: BytedeskConfig) => {
      const currentLoadHistory = Boolean(prevConfig.chatConfig?.loadHistory);
      return {
        ...prevConfig,
        chatConfig: {
          ...(prevConfig.chatConfig || selectedChatProfile.chatConfig),
          loadHistory: !currentLoadHistory
        }
      };
    });
    setLastActionApiHint('setConfig({ chatConfig: { loadHistory: boolean } })');
  };

  const handleToggleNavbar = () => {
    setConfig((prevConfig: BytedeskConfig) => {
      const currentNavbar = prevConfig.chatConfig?.navbar;
      const nextNavbar = currentNavbar === '0' ? undefined : '0';
      return {
        ...prevConfig,
        chatConfig: {
          ...(prevConfig.chatConfig || selectedChatProfile.chatConfig),
          navbar: nextNavbar,
        },
      };
    });
    setLastActionApiHint('setConfig({ chatConfig: { navbar: "0" | undefined } })');  
  };

  const handleToggleMultiBubbleDemo = () => {
    setIsMultiBubbleDemo((prev) => {
      const next = !prev;
      setConfig((prevConfig: BytedeskConfig) => ({
        ...prevConfig,
        bubbleConfig: {
          ...(prevConfig.bubbleConfig || {}),
          show: true,
          icon: '👋',
          title: messages.pages.basicDemo.bubbleTitle,
          subtitle: messages.pages.basicDemo.bubbleSubtitle,
          messages: next ? bubbleMessageList : undefined,
          autoRotate: next,
          rotateInterval: 3000,
          switchMode: bubbleSwitchMode
        }
      }));
      setLastActionApiHint(
        next
          ? `setConfig({ bubbleConfig: { messages, autoRotate: true, rotateInterval: 3000, switchMode: "${bubbleSwitchMode}" } })`
          : `setConfig({ bubbleConfig: { messages: undefined, autoRotate: false, switchMode: "${bubbleSwitchMode}" } })`
      );
      return next;
    });
  };

  const configGuideCopy = getConfigGuideCopy(locale);

  const handleToggleBubbleSwitchMode = () => {
    const nextMode = bubbleSwitchMode === 'fade'
      ? 'slide-up'
      : bubbleSwitchMode === 'slide-up'
        ? 'ticker'
        : 'fade';
    setBubbleSwitchMode(nextMode);
    setConfig((prevConfig: BytedeskConfig) => ({
      ...prevConfig,
      bubbleConfig: {
        ...(prevConfig.bubbleConfig || {}),
        switchMode: nextMode
      }
    }));
    setLastActionApiHint(`setConfig({ bubbleConfig: { switchMode: "${nextMode}" } })`);
  };

  const handleLocaleSwitch = (nextLocale: DemoLanguage) => {
    onLocaleChange(nextLocale);
    setLastActionApiHint(`setConfig({ locale: "${nextLocale}" })`);
  };

  const handleThemeModeSwitch = (nextTheme: 'light' | 'dark' | 'system') => {
    const runtimeMode: Theme['mode'] =
      nextTheme === 'system'
        ? (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : nextTheme;

    getBytedeskRuntime()?.setTheme?.({ mode: runtimeMode });
    onThemePreferenceChange(nextTheme);
    setLastActionApiHint(`bytedesk.setTheme({ mode: "${runtimeMode}" })`);
  };

  const handleEntryActionsChange = (nextSelectedKeys: string[]) => {
    const nextActions = nextSelectedKeys as EntryAction[];
    const safeActions: EntryAction[] = nextActions.length > 0 ? nextActions : ['chat'];
    setSelectedEntryActions(safeActions);
    setLastActionApiHint(`setConfig({ buttonsConfig: [${safeActions.map((action) => `"${action}"`).join(', ')}] })`);
  };

  const handleQrCodeImageUrlChange = (nextUrl: string) => {
    setQrCodeImageUrl(nextUrl);
    setLastActionApiHint(`setConfig({ buttonsConfig: [{ previewImageUrl: "${nextUrl}" }] })`);
  };

  const docLinks = [
    { href: 'https://www.weiyuai.cn/docs/zh-CN/docs/channel/react', label: messages.common.docLinks.react },
    { href: 'https://www.weiyuai.cn/docs/zh-CN/docs/channel/vue', label: messages.common.docLinks.vue },
    { href: 'https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/BasicDemo.tsx', label: messages.common.docLinks.reactExample },
    { href: 'https://github.com/Bytedesk/bytedesk-web/blob/master/examples/vue-demo/src/pages/BasicDemo.vue', label: messages.common.docLinks.vueExample }
  ];

  const consultButtonLabel = getConsultButtonLabel(selectedChatProfile, locale);

  const chatPageUrl = (() => {
    const params = new URLSearchParams();
    const currentChatConfig = config.chatConfig || selectedChatProfile.chatConfig;
    const currentNavbar = (currentChatConfig as { navbar?: string }).navbar;
    const currentLoadHistory = (currentChatConfig as { loadHistory?: boolean }).loadHistory;
    params.append('org', currentChatConfig.org);
    params.append('t', String(currentChatConfig.t));
    params.append('sid', String(currentChatConfig.sid));
    params.append('lang', String(config.locale || locale));
    params.append('mode', String(config.theme?.mode || themeMode || 'light'));
    params.append('backgroundColor', String(config.theme?.backgroundColor || THEME_COLORS[0]));
    params.append('textColor', String(config.theme?.textColor || getReadableTextColor(config.theme?.backgroundColor || THEME_COLORS[0])));
    if (currentNavbar === '0') {
      params.append('navbar', '0');
    }
    if (currentLoadHistory) {
      params.append('loadHistory', '1');
    }
    return `${chatHtmlBaseUrl}/chat?${params.toString()}`;
  })();

  const quickActions = [
    {
      key: 'openChat',
      label: consultButtonLabel,
      handler: () => {
        (window as any).bytedesk?.showChat({ htmlUrl: chatHtmlBaseUrl });
        setLastActionApiHint(`bytedesk.showChat({ htmlUrl: "${chatHtmlBaseUrl}" })`);
      }
    },
    {
      key: 'openChatParams',
      label: messages.common.buttons.openChatWithParams,
      handler: () => {
        const chatConfigWithTheme = {
          ...selectedChatProfile.chatConfig,
          mode: config.theme?.mode || themeMode || 'light',
          themeMode: themePreference
        };
        (window as any).bytedesk?.showChat({
          htmlUrl: chatHtmlBaseUrl,
          chatConfig: chatConfigWithTheme as any
        });
        setLastActionApiHint(`bytedesk.showChat({ htmlUrl: "${chatHtmlBaseUrl}", chatConfig: { ${chatConfigHint}, mode: "${config.theme?.mode || themeMode || 'light'}", themeMode: "${themePreference}" } })`);
      }
    },
    {
      key: 'closeChat',
      label: messages.common.buttons.closeChat,
      handler: () => {
        (window as any).bytedesk?.hideChat();
        setLastActionApiHint('bytedesk.hideChat()');
      }
    },
    {
      key: 'openInNewWindow',
      label: messages.common.buttons.openInNewWindow,
      handler: () => {
        window.open(chatPageUrl, '_blank', 'width=420,height=680,resizable=yes,scrollbars=yes');
        setLastActionApiHint(`window.open(chatUrl, "_blank", "width=420,height=680,resizable=yes")`);
      }
    },
    {
      key: 'openInNewTab',
      label: messages.common.buttons.openInNewTab,
      handler: () => {
        window.open(chatPageUrl, '_blank');
        setLastActionApiHint('window.open(chatUrl, "_blank")');
      }
    },
    {
      key: 'showButton',
      label: messages.common.buttons.showButton,
      handler: () => {
        (window as any).bytedesk?.showButton();
        setLastActionApiHint('bytedesk.showButton()');
      }
    },
    {
      key: 'hideButton',
      label: messages.common.buttons.hideButton,
      handler: () => {
        (window as any).bytedesk?.hideButton();
        setLastActionApiHint('bytedesk.hideButton()');
      }
    },
    {
      key: 'showBubble',
      label: messages.common.buttons.showBubble,
      handler: () => {
        (window as any).bytedesk?.showBubble();
        setLastActionApiHint('bytedesk.showBubble()');
      }
    },
    {
      key: 'hideBubble',
      label: messages.common.buttons.hideBubble,
      handler: () => {
        (window as any).bytedesk?.hideBubble();
        setLastActionApiHint('bytedesk.hideBubble()');
      }
    },
    {
      key: 'showInvite',
      label: messages.common.buttons.showInvite,
      handler: () => {
        (window as any).bytedesk?.showInviteDialog();
        setLastActionApiHint('bytedesk.showInviteDialog()');
      }
    },
    {
      key: 'hideInvite',
      label: messages.common.buttons.hideInvite,
      handler: () => {
        (window as any).bytedesk?.hideInviteDialog();
        setLastActionApiHint('bytedesk.hideInviteDialog()');
      }
    },
  ];

  const placementLabel =
    config.placement === 'bottom-left'
      ? messages.pages.basicDemo.placement.bottomLeft
      : messages.pages.basicDemo.placement.bottomRight;

  const themeColorLabel = config.theme?.backgroundColor || messages.pages.basicDemo.defaultColorLabel;
  const themeTextColorLabel = config.theme?.textColor || messages.pages.basicDemo.defaultTextColorLabel;
  const themeModeLabel = messages.common.themeOptions[themePreference];
  const navColorPresets = useMemo(
    () => [{ label: messages.pages.basicDemo.themeButtonLabel, colors: THEME_COLORS }],
    [messages.pages.basicDemo.themeButtonLabel]
  );
  const navTextColorPresets = useMemo(
    () => [{ label: messages.pages.basicDemo.themeTextButtonLabel, colors: TEXT_COLORS }],
    [messages.pages.basicDemo.themeTextButtonLabel]
  );
  const themeModeMenuItems: MenuProps['items'] = [
    { key: 'light', label: messages.common.themeOptions.light },
    { key: 'dark', label: messages.common.themeOptions.dark },
    { key: 'system', label: messages.common.themeOptions.system }
  ];
  const entryMenuItems: MenuProps['items'] = entryActionOptions.map((item) => ({
    key: item.key,
    label: item.label,
  }));
  const navbarHidden = config.chatConfig?.navbar === '0';
  const loadHistoryEnabled = Boolean(config.chatConfig?.loadHistory);
  const chatConfigHint = formatChatConfigQuery(selectedChatProfile.chatConfig);
  const rawPopupUrlParams = useMemo(() => Array.from(new URL(chatPageUrl).searchParams.entries()), [chatPageUrl]);
  const requiredPopupParams = useMemo(() => new Set(['org', 't', 'sid']), []);
  const requiredLabel = locale === LANG_EN ? 'Required' : '必填';
  const optionalLabel = locale === LANG_EN ? 'Optional' : '可选';
  const codeBlockStyle = useMemo(() => ({
    margin: 0,
    padding: '12px 14px',
    borderRadius: 8,
    border: `1px solid ${token.colorBorderSecondary || token.colorBorder}`,
    background: token.colorFillQuaternary,
    fontSize: 12,
    lineHeight: 1.7,
    fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace',
    whiteSpace: 'pre-wrap' as const,
    wordBreak: 'break-all' as const
  }), [token.colorBorder, token.colorBorderSecondary, token.colorFillQuaternary]);

  const selectedChatConfigRecord = useMemo(
    () => selectedChatProfile.chatConfig as unknown as Record<string, string | number | boolean | undefined>,
    [selectedChatProfile.chatConfig]
  );

  const exampleCopy = getExampleCopy(locale);

  const fullConfigExample = useMemo(() => buildFullConfigExample({
    config,
    exampleCopy,
    locale,
    qrCodeImageUrl,
    selectedChatConfigRecord,
    selectedChatProfile,
    selectedEntryActions,
    themeMode,
  }), [config, exampleCopy, locale, qrCodeImageUrl, selectedChatConfigRecord, selectedChatProfile, selectedEntryActions, themeMode]);

  const minimalConfigExample = useMemo(() => buildMinimalConfigExample({
    htmlUrl: config.htmlUrl,
    chatHtmlBaseUrl,
    selectedChatProfile,
  }), [config.htmlUrl, chatHtmlBaseUrl, selectedChatProfile]);

  const recommendedConfigExample = useMemo(() => buildRecommendedConfigExample({
    config,
    exampleCopy,
    bubbleSwitchMode,
    locale,
    themeMode,
    selectedChatProfile,
    bubbleTitle: messages.pages.basicDemo.bubbleTitle,
    bubbleSubtitle: messages.pages.basicDemo.bubbleSubtitle,
  }), [config, exampleCopy, bubbleSwitchMode, locale, themeMode, selectedChatProfile, messages.pages.basicDemo.bubbleTitle, messages.pages.basicDemo.bubbleSubtitle]);

  const fieldDocCopy = useMemo(() => {
    const docs = {
      [LANG_ZH_CN]: {
        fields: {
          isDebug: '是否开启调试日志。开发联调时建议开启，生产环境通常关闭。',
          forceRefresh: '是否强制刷新聊天页或 iframe 资源，适合调试缓存问题。',
          apiUrl: '接口服务根地址，用于访客初始化、未读数、反馈上传等 API 请求。',
          htmlUrl: '聊天页面站点根地址。推荐只传站点根路径，由 chatPath/threadPath/webrtcPath/callPath 控制页面类型。',
          chatPath: '文本聊天页面路径，showChat() 默认使用该路径。',
          threadPath: '历史会话页面路径，showThread() 会切换到该路径。',
          webrtcPath: '音视频页面路径，showWebrtc() 会切换到该路径。',
          callPath: '呼叫中心页面路径，showCall() 会切换到该路径。',
          locale: '界面语言，例如 zh-cn、en、ja-jp。会写入聊天 URL 的 lang 参数。',
          placement: '入口按钮与聊天窗停靠位置，支持 bottom-left 和 bottom-right。',
          marginBottom: '入口距离底部的间距，单位 px。',
          marginSide: '入口距离左右边缘的间距，单位 px。',
          autoPopup: '初始化完成后是否自动弹出聊天窗口。',
          autoPopupDelay: '自动弹出的延迟时间，单位毫秒。',
          draggable: '是否允许拖动入口模块。开启后用户可拖动按钮位置。',
          tabsConfig: '控制聊天页内置 tab 的显隐，包括 home、messages、help、news。',
          bubbleConfig: '控制入口上方提示气泡，包括标题、副标题、多条轮播、切换方式等。',
          buttonConfig: '单入口按钮配置。只有一个入口时通常使用这个对象。',
          buttonsConfig: '多入口按钮数组。配置后优先级高于 buttonConfig，用于同时展示 chat、thread、webrtc、call、二维码等入口。',
          inviteConfig: '邀请弹窗配置，可控制显示时机、循环、按钮文案与回调。',
          theme: '主题与配色配置，包括 light/dark/system 模式、文字色和背景色。',
          animation: '聊天窗口显示/隐藏时的动画时长和缓动函数。',
          window: '聊天窗口宽高配置，桌面端以该尺寸渲染。',
          onInit: 'SDK 初始化完成回调。适合记录埋点或通知宿主页面。',
          onShowChat: '聊天窗口显示后触发。',
          onHideChat: '聊天窗口隐藏后触发。',
          onMessage: '接收 iframe 或 SDK 内部消息时触发，可用于联动页面状态。',
          onConfigChange: '配置被更新后触发，方便观测配置变更。',
          onVisitorInfo: '访客初始化完成后返回 uid 与 visitorUid，适合保存到业务系统。',
          'theme.mode': '主题模式，可选 light、dark、system。',
          'theme.textColor': '入口按钮或模块内文字颜色。',
          'theme.backgroundColor': '入口按钮、导航或模块背景主色。',
          'bubble.show': '是否显示入口上方提示气泡。',
          'bubble.icon': '单条气泡默认图标。',
          'bubble.title': '单条气泡标题。',
          'bubble.subtitle': '单条气泡副标题。',
          'bubble.messages': '多条气泡文案数组。配置后优先于 icon/title/subtitle 单条配置。',
          'bubble.autoRotate': '是否自动轮播多条气泡消息。',
          'bubble.rotateInterval': '气泡轮播间隔，单位毫秒。',
          'bubble.switchMode': '轮播方式，可选 fade、slide-up、ticker。',
          'button.show': '是否显示该入口按钮。',
          'button.icon': '按钮图标，通常使用 emoji 或简短符号。',
          'button.text': '按钮文字。单入口圆形按钮建议不传，多入口矩形模块建议传入。',
          'button.width': '按钮宽度，单位 px。',
          'button.height': '按钮高度，单位 px。',
          'button.action': '内置入口类型，可选 chat、thread、webrtc、call。未传 onClick 时按 action 自动调用对应入口。',
          'button.previewImageUrl': '鼠标悬浮时展示的图片地址，适合放企微/个微二维码。',
          'button.previewImageAlt': '预览图片说明文案，会显示在二维码大图下方。',
          'button.onClick': '自定义点击逻辑。传入后会覆盖默认 action 行为。',
          'invite.show': '是否启用邀请弹窗。',
          'invite.text': '邀请内容文案。',
          'invite.icon': '邀请弹窗图标。',
          'invite.delay': '首次显示邀请弹窗的延迟时间。',
          'invite.loop': '是否循环显示邀请弹窗。',
          'invite.loopDelay': '循环显示的间隔时间。',
          'invite.loopCount': '循环显示次数。',
          'invite.acceptText': '接受邀请按钮文案。',
          'invite.rejectText': '拒绝邀请按钮文案。',
          'invite.onAccept': '用户接受邀请时触发。',
          'invite.onReject': '用户拒绝邀请时触发。',
          'invite.onClose': '邀请弹窗关闭时触发。',
          'invite.onOpen': '邀请弹窗打开时触发。',
          'chat.org': '组织 ID，必填。',
          'chat.t': '会话类型，必填。t=0 代表客服一对一，t=1 代表工作组，t=2 代表机器人。',
          'chat.sid': '会话目标 ID，必填。',
          'chat.uid': '系统内部用户 ID，通常由 SDK 自动维护，不建议手动传。',
          'chat.visitorUid': '业务侧自定义访客唯一标识，用于跨端识别同一访客。',
          'chat.nickname': '访客昵称。',
          'chat.avatar': '访客头像地址。',
          'chat.mobile': '访客手机号。',
          'chat.email': '访客邮箱。',
          'chat.note': '客服侧可见的备注信息。',
          'chat.channel': '渠道来源标识，例如官网、App、小程序。',
          'chat.goodsInfo': '商品信息，适合电商场景透传。',
          'chat.orderInfo': '订单信息，适合售后或订单咨询场景。',
          'chat.extra': '额外扩展字段，通常传 JSON 字符串。',
          'chat.vipLevel': '会员等级。',
          'chat.debug': '区分本地测试和线上环境的业务标记。',
          'chat.draft': '灰度标识，会透传为 URL draft=1。',
          'chat.settingsUid': '设置唯一 ID，主要用于调试配置。',
          'chat.loadHistory': '是否加载历史消息。loadHistory=1 时打开对话页面默认加载历史聊天记录。',
          'chat.custom': '支持继续追加其他自定义业务字段，都会被拼入聊天 URL 参数。',
          'browse.referrer': '来源页面地址。',
          'browse.url': '当前页面 URL。',
          'browse.title': '当前页面标题。',
          'browse.custom': '支持继续追加业务浏览信息，例如页面 ID、活动来源等。',
          'feedback.enabled': '是否启用文档反馈能力。',
          'feedback.trigger': '触发方式，可选 selection、button、both。',
          'feedback.showOnSelection': '选中文本时是否展示反馈入口。',
          'feedback.selectionText': '选中文字时的提示文案。',
          'feedback.buttonText': '固定反馈按钮文案。',
          'feedback.dialogTitle': '反馈对话框标题。',
          'feedback.placeholder': '反馈输入框占位文本。',
          'feedback.submitText': '提交按钮文案。',
          'feedback.cancelText': '取消按钮文案。',
          'feedback.successMessage': '提交成功后的提示文案。',
          'feedback.categoryNames': '反馈问题分类列表。',
          'feedback.requiredTypes': '是否强制至少选择一个问题分类。',
          'feedback.typesSectionTitle': '分类区域标题。',
          'feedback.typesDescription': '分类说明文案，例如“可多选”。',
          'feedback.submitScreenshot': '是否连同截图一起提交。',
          'feedback.onSubmit': '自定义反馈提交流程。',
          'feedback.onCancel': '取消反馈时触发。',
          'animation.enabled': '是否启用聊天窗口动画。',
          'animation.duration': '动画持续时间，单位毫秒。',
          'animation.type': '缓动类型，可选 ease、linear、ease-in、ease-out、ease-in-out。',
          'window.width': '桌面端聊天窗口宽度。',
          'window.height': '桌面端聊天窗口高度。',
          'tabs.home': '是否显示首页 tab。',
          'tabs.messages': '是否显示消息 tab。',
          'tabs.help': '是否显示帮助 tab。',
          'tabs.news': '是否显示新闻 tab。',
        },
      },
      [LANG_ZH_TW]: {
        fields: {
          isDebug: '是否啟用偵錯日誌。開發聯調時建議啟用，生產環境通常關閉。',
          forceRefresh: '是否強制重新整理聊天頁或 iframe 資源，適合偵測快取問題。',
          apiUrl: '介面服務根位址。用於訪客初始化、未讀數、反饋上傳等 API 請求。',
          htmlUrl: '聊天頁面站點根位址。建議只傳站點根路徑，由 chatPath/threadPath/webrtcPath/callPath 控制頁面類型。',
          chatPath: '文字聊天頁面路徑，showChat() 預設使用該路徑。',
          threadPath: '歷史會話頁面路徑，showThread() 會切換到該路徑。',
          webrtcPath: '音視訊頁面路徑，showWebrtc() 會切換到該路徑。',
          callPath: '呼叫中心頁面路徑，showCall() 會切換到該路徑。',
          locale: '介面語言，例如 zh-cn、en、ja-jp。會寫入聊天 URL 的 lang 參數。',
          placement: '入口按鈕與聊天視窗停靠位置，支援 bottom-left 和 bottom-right。',
          marginBottom: '入口距離底部的間距，單位 px。',
          marginSide: '入口距離左右邊緣的間距，單位 px。',
          autoPopup: '初始化完成後是否自動彈出聊天視窗。',
          autoPopupDelay: '自動彈出的延遲時間，單位毫秒。',
          draggable: '是否允許拖動入口模組。啟用後用戶可拖動按鈕位置。',
          tabsConfig: '控制聊天頁內置 tab 的顯隱，包括 home、messages、help、news。',
          bubbleConfig: '控制入口上方提示氣泡，包括標題、副標題、多條輪播、切換方式等。',
          buttonConfig: '單入口按鈕設定。只有一個入口時通常使用這個物件。',
          buttonsConfig: '多入口按鈕陣列。設定後優先級高於 buttonConfig，用於同時展示 chat、thread、webrtc、call、二維碼等入口。',
          inviteConfig: '邀請彈窗設定，可控制顯示時機、迴圈、按鈕文案與回調。',
          theme: '主題與配色設定，包括 light/dark/system 模式、文字色和背景色。',
          animation: '聊天視窗顯示/隱藏時的動畫時長和緩動函式。',
          window: '聊天視窗寬高設定，桌面端以該尺寸渲染。',
          onInit: 'SDK 初始化完成回調。適合記錄埋點或通知宿主頁面。',
          onShowChat: '聊天視窗顯示後觸發。',
          onHideChat: '聊天視窗隱藏後觸發。',
          onMessage: '接收 iframe 或 SDK 內部訊息時觸發，可用於聯動頁面狀態。',
          onConfigChange: '設定被更新後觸發，方便監測設定變更。',
          onVisitorInfo: '訪客初始化完成後傳回 uid 與 visitorUid，適合保存到業務系統。',
          'theme.mode': '主題模式，可選 light、dark、system。',
          'theme.textColor': '入口按鈕或模組內文字顏色。',
          'theme.backgroundColor': '入口按鈕、導覽或模組背景主色。',
          'bubble.show': '是否顯示入口上方提示氣泡。',
          'bubble.icon': '單條氣泡預設圖示。',
          'bubble.title': '單條氣泡標題。',
          'bubble.subtitle': '單條氣泡副標題。',
          'bubble.messages': '多條氣泡文案陣列。設定後優先於 icon/title/subtitle 單條設定。',
          'bubble.autoRotate': '是否自動輪播多條氣泡訊息。',
          'bubble.rotateInterval': '氣泡輪播間隔，單位毫秒。',
          'bubble.switchMode': '輪播方式，可選 fade、slide-up、ticker。',
          'button.show': '是否顯示該入口按鈕。',
          'button.icon': '按鈕圖示，通常使用 emoji 或簡短符號。',
          'button.text': '按鈕文字。單入口圓形按鈕建議不傳，多入口矩形模組建議傳入。',
          'button.width': '按鈕寬度，單位 px。',
          'button.height': '按鈕高度，單位 px。',
          'button.action': '內置入口類型，可選 chat、thread、webrtc、call。未傳 onClick 時按 action 自動呼叫對應入口。',
          'button.previewImageUrl': '滑鼠懸浮時展示的圖片位址，適合放企微/個微二維碼。',
          'button.previewImageAlt': '預覽圖片說明文案，會顯示在二維碼大圖下方。',
          'button.onClick': '自訂點擊邏輯。傳入後會覆寫預設 action 行為。',
          'invite.show': '是否啟用邀請彈窗。',
          'invite.text': '邀請內容文案。',
          'invite.icon': '邀請彈窗圖示。',
          'invite.delay': '首次顯示邀請彈窗的延遲時間。',
          'invite.loop': '是否迴圈顯示邀請彈窗。',
          'invite.loopDelay': '迴圈顯示的間隔時間。',
          'invite.loopCount': '迴圈顯示次數。',
          'invite.acceptText': '接受邀請按鈕文案。',
          'invite.rejectText': '拒絕邀請按鈕文案。',
          'invite.onAccept': '使用者接受邀請時觸發。',
          'invite.onReject': '使用者拒絕邀請時觸發。',
          'invite.onClose': '邀請彈窗關閉時觸發。',
          'invite.onOpen': '邀請彈窗開啟時觸發。',
          'chat.org': '組織 ID，必填。',
          'chat.t': '會話類型，必填。t=0 代表客服一對一，t=1 代表工作組，t=2 代表機器人。',
          'chat.sid': '會話目標 ID，必填。',
          'chat.uid': '系統內部使用者 ID，通常由 SDK 自動維護，不建議手動傳。',
          'chat.visitorUid': '業務側自訂訪客唯一標識，用於跨端辨識同一訪客。',
          'chat.nickname': '訪客暱稱。',
          'chat.avatar': '訪客頭像位址。',
          'chat.mobile': '訪客手機號。',
          'chat.email': '訪客電子郵件。',
          'chat.note': '客服側可見的備註資訊。',
          'chat.channel': '渠道來源標識，例如官網、App、小程式。',
          'chat.goodsInfo': '商品資訊，適合電商場景透傳。',
          'chat.orderInfo': '訂單資訊，適合售後或訂單諮詢場景。',
          'chat.extra': '額外擴充欄位，通常傳 JSON 字串。',
          'chat.vipLevel': '會員等級。',
          'chat.debug': '區分本地測試和線上環境的業務標記。',
          'chat.draft': '灰度標識，會透傳為 URL draft=1。',
          'chat.settingsUid': '設定唯一 ID，主要用於偵錯設定。',
          'chat.loadHistory': '是否載入歷史訊息。loadHistory=1 時開啟對話頁面預設載入歷史聊天記錄。',
          'chat.custom': '支援繼續追加其他自訂業務欄位，都會被拼入聊天 URL 參數。',
          'browse.referrer': '來源頁面位址。',
          'browse.url': '目前頁面 URL。',
          'browse.title': '目前頁面標題。',
          'browse.custom': '支援繼續追加業務瀏覽資訊，例如頁面 ID、活動來源等。',
          'feedback.enabled': '是否啟用文件反饋能力。',
          'feedback.trigger': '觸發方式，可選 selection、button、both。',
          'feedback.showOnSelection': '選中文字時是否展示反饋入口。',
          'feedback.selectionText': '選中文字時的提示文案。',
          'feedback.buttonText': '固定反饋按鈕文案。',
          'feedback.dialogTitle': '反饋對話框標題。',
          'feedback.placeholder': '反饋輸入框占位文字。',
          'feedback.submitText': '提交按鈕文案。',
          'feedback.cancelText': '取消按鈕文案。',
          'feedback.successMessage': '提交成功後的提示文案。',
          'feedback.categoryNames': '反饋問題分類清單。',
          'feedback.requiredTypes': '是否強制至少選擇一個問題分類。',
          'feedback.typesSectionTitle': '分類區域標題。',
          'feedback.typesDescription': '分類說明文案，例如「可多選」。',
          'feedback.submitScreenshot': '是否連同螢幕擷取畫面一起提交。',
          'feedback.onSubmit': '自訂反饋提交流程。',
          'feedback.onCancel': '取消反饋時觸發。',
          'animation.enabled': '是否啟用聊天視窗動畫。',
          'animation.duration': '動畫持續時間，單位毫秒。',
          'animation.type': '緩動類型，可選 ease、linear、ease-in、ease-out、ease-in-out。',
          'window.width': '桌面端聊天視窗寬度。',
          'window.height': '桌面端聊天視窗高度。',
          'tabs.home': '是否顯示首頁 tab。',
          'tabs.messages': '是否顯示訊息 tab。',
          'tabs.help': '是否顯示說明 tab。',
          'tabs.news': '是否顯示新聞 tab。',
        },
      },
      [LANG_EN]: {
        fields: {
          isDebug: 'Enable debug logging for development troubleshooting; typically disabled in production.',
          forceRefresh: 'Force refresh chat page or iframe resources to debug caching issues.',
          apiUrl: 'API server root URL for visitor initialization, unread counts, and feedback requests.',
          htmlUrl: 'Chat page site root URL; pass only the root path and use chatPath/threadPath/webrtcPath/callPath to control page types.',
          chatPath: 'Text chat page path; used by showChat() by default.',
          threadPath: 'History conversation page path; showThread() switches to this path.',
          webrtcPath: 'Audio/video page path; showWebrtc() switches to this path.',
          callPath: 'Call center page path; showCall() switches to this path.',
          locale: 'UI language such as zh-cn, en, or ja-jp; written to chat URL as lang parameter.',
          placement: 'Button and chat window dock position: bottom-left or bottom-right.',
          marginBottom: 'Distance from entry button to bottom edge in pixels.',
          marginSide: 'Distance from entry button to left or right edge in pixels.',
          autoPopup: 'Auto-open chat window after SDK initialization.',
          autoPopupDelay: 'Delay before auto-popup in milliseconds.',
          draggable: 'Allow dragging the entry button; when enabled, users can reposition it.',
          tabsConfig: 'Control visibility of built-in tabs: home, messages, help, news.',
          bubbleConfig: 'Configure entry bubble with title, subtitle, carousel messages, and switch modes.',
          buttonConfig: 'Single entry button configuration; use this for one entry point.',
          buttonsConfig: 'Multiple entry button array; higher priority than buttonConfig for showing chat, thread, webrtc, call, and QR entries.',
          inviteConfig: 'Invite dialog configuration for timing, loops, button text, and callbacks.',
          theme: 'Theme and color configuration including light, dark, or system modes, text color, and background color.',
          animation: 'Animation duration and easing for chat window show or hide transitions.',
          window: 'Desktop chat window dimensions.',
          onInit: 'Runs after SDK initialization completes.',
          onShowChat: 'Runs when the chat window becomes visible.',
          onHideChat: 'Runs when the chat window is hidden.',
          onMessage: 'Runs when iframe or SDK internal messages are received.',
          onConfigChange: 'Runs after configuration updates.',
          onVisitorInfo: 'Returns uid and visitorUid after visitor initialization.',
          'theme.mode': 'Theme mode: light, dark, or system.',
          'theme.textColor': 'Text color for entry button or module content.',
          'theme.backgroundColor': 'Primary background color for entry button, navigation, or modules.',
          'bubble.show': 'Show or hide the prompt bubble above the entry point.',
          'bubble.icon': 'Default icon for a single bubble message.',
          'bubble.title': 'Title for a single bubble message.',
          'bubble.subtitle': 'Subtitle for a single bubble message.',
          'bubble.messages': 'Multiple bubble messages; takes priority over icon, title, and subtitle.',
          'bubble.autoRotate': 'Auto-rotate multiple bubble messages.',
          'bubble.rotateInterval': 'Bubble rotation interval in milliseconds.',
          'bubble.switchMode': 'Bubble switch mode: fade, slide-up, or ticker.',
          'button.show': 'Show or hide this entry button.',
          'button.icon': 'Button icon, usually an emoji or short symbol.',
          'button.text': 'Button text; omit for single circular entry, include for multi-entry stack.',
          'button.width': 'Button width in pixels.',
          'button.height': 'Button height in pixels.',
          'button.action': 'Built-in entry type: chat, thread, webrtc, or call.',
          'button.previewImageUrl': 'Image shown on hover, useful for QR code entries.',
          'button.previewImageAlt': 'Caption displayed under the preview image.',
          'button.onClick': 'Custom click behavior that overrides the default action.',
          'invite.show': 'Enable or disable the invite dialog.',
          'invite.text': 'Invite content text.',
          'invite.icon': 'Invite dialog icon.',
          'invite.delay': 'Delay before the first invite appears.',
          'invite.loop': 'Repeat the invite dialog after it closes.',
          'invite.loopDelay': 'Delay between repeated invites.',
          'invite.loopCount': 'Maximum number of repeated invites.',
          'invite.acceptText': 'Accept button text.',
          'invite.rejectText': 'Reject button text.',
          'invite.onAccept': 'Runs when the user accepts the invite.',
          'invite.onReject': 'Runs when the user rejects the invite.',
          'invite.onClose': 'Runs when the invite dialog closes.',
          'invite.onOpen': 'Runs when the invite dialog opens.',
          'chat.org': 'Organization ID, required.',
          'chat.t': 'Conversation type, required. t=0 means one-on-one agent chat, t=1 means workgroup, and t=2 means robot.',
          'chat.sid': 'Conversation target ID, required.',
          'chat.uid': 'Internal user ID usually maintained by the SDK.',
          'chat.visitorUid': 'Custom visitor identifier used across devices.',
          'chat.nickname': 'Visitor nickname.',
          'chat.avatar': 'Visitor avatar URL.',
          'chat.mobile': 'Visitor mobile number.',
          'chat.email': 'Visitor email address.',
          'chat.note': 'Internal note visible to customer service.',
          'chat.channel': 'Channel source such as website, app, or mini program.',
          'chat.goodsInfo': 'Product information for commerce scenarios.',
          'chat.orderInfo': 'Order information for after-sales or order inquiry flows.',
          'chat.extra': 'Extra extension fields, usually JSON text.',
          'chat.vipLevel': 'Membership tier.',
          'chat.debug': 'Business flag to distinguish test and production environments.',
          'chat.draft': 'Gray-release flag passed as draft=1 in the URL.',
          'chat.settingsUid': 'Unique settings identifier mainly for config debugging.',
          'chat.loadHistory': 'Whether to load historical messages. loadHistory=1 loads chat history by default when opening the chat page.',
          'chat.custom': 'Additional custom business fields appended into chat URL parameters.',
          'browse.referrer': 'Referring page URL.',
          'browse.url': 'Current page URL.',
          'browse.title': 'Current page title.',
          'browse.custom': 'Additional browse metadata such as page ID or campaign source.',
          'feedback.enabled': 'Enable or disable document feedback.',
          'feedback.trigger': 'Trigger mode: selection, button, or both.',
          'feedback.showOnSelection': 'Show feedback entry when text is selected.',
          'feedback.selectionText': 'Prompt shown for selected text.',
          'feedback.buttonText': 'Fixed feedback button label.',
          'feedback.dialogTitle': 'Feedback dialog title.',
          'feedback.placeholder': 'Feedback input placeholder.',
          'feedback.submitText': 'Submit button label.',
          'feedback.cancelText': 'Cancel button label.',
          'feedback.successMessage': 'Message shown after successful submission.',
          'feedback.categoryNames': 'List of feedback categories.',
          'feedback.requiredTypes': 'Require at least one selected category.',
          'feedback.typesSectionTitle': 'Category section title.',
          'feedback.typesDescription': 'Category helper text, for example multiple selection hint.',
          'feedback.submitScreenshot': 'Submit a screenshot together with feedback.',
          'feedback.onSubmit': 'Custom feedback submission flow.',
          'feedback.onCancel': 'Runs when feedback is cancelled.',
          'animation.enabled': 'Enable or disable chat window animation.',
          'animation.duration': 'Animation duration in milliseconds.',
          'animation.type': 'Easing type: ease, linear, ease-in, ease-out, or ease-in-out.',
          'window.width': 'Desktop chat window width.',
          'window.height': 'Desktop chat window height.',
          'tabs.home': 'Show or hide the home tab.',
          'tabs.messages': 'Show or hide the messages tab.',
          'tabs.help': 'Show or hide the help tab.',
          'tabs.news': 'Show or hide the news tab.',
        },
      },
      [LANG_JA_JP]: {
        fields: {
          isDebug: '開発時のデバッグログを有効にします。通常、本番環境では無効にします。',
          forceRefresh: 'チャットページまたは iframe リソースを強制更新し、キャッシュ問題を確認します。',
          apiUrl: '訪問者初期化、未読数、フィードバック送信などに使う API サーバーのルート URL です。',
          htmlUrl: 'チャットページのサイトルート URL です。ページ種別は chatPath などの各 path で切り替えます。',
          chatPath: 'テキストチャットページのパスです。showChat() で使われます。',
          threadPath: '履歴会話ページのパスです。showThread() で使われます。',
          webrtcPath: '音声・ビデオページのパスです。showWebrtc() で使われます。',
          callPath: 'コールセンターページのパスです。showCall() で使われます。',
          locale: '表示言語です。chat URL の lang パラメータにも反映されます。',
          placement: 'ボタンとチャットウィンドウの配置位置です。bottom-left と bottom-right をサポートします。',
          marginBottom: 'ボタンの下端からの余白です。単位は px です。',
          marginSide: '左右端からの余白です。単位は px です。',
          autoPopup: '初期化後にチャットウィンドウを自動表示するかどうかです。',
          autoPopupDelay: '自動表示までの遅延時間です。単位はミリ秒です。',
          draggable: '入口ボタンをドラッグ可能にするかどうかです。',
          tabsConfig: 'home、messages、help、news の表示制御です。',
          bubbleConfig: '入口上の案内バブルのタイトル、サブタイトル、ローテーション表示などを設定します。',
          buttonConfig: '単一入口ボタンの設定です。入口が 1 つの場合に使います。',
          buttonsConfig: '複数入口ボタンの配列です。buttonConfig より優先されます。',
          inviteConfig: '招待ダイアログの表示タイミング、ループ、文言、コールバック設定です。',
          theme: 'light、dark、system と色設定を含むテーマ構成です。',
          animation: 'チャットウィンドウ表示・非表示時のアニメーション設定です。',
          window: 'デスクトップ時のチャットウィンドウサイズです。',
          onInit: 'SDK 初期化完了後に呼ばれるコールバックです。',
          onShowChat: 'チャットウィンドウ表示時に呼ばれます。',
          onHideChat: 'チャットウィンドウ非表示時に呼ばれます。',
          onMessage: 'iframe または SDK からメッセージを受け取ったときに呼ばれます。',
          onConfigChange: '設定更新後に呼ばれます。',
          onVisitorInfo: '訪問者初期化後に uid と visitorUid を返します。',
          'theme.mode': 'テーマモードです。light、dark、system を選べます。',
          'theme.textColor': 'ボタンやモジュール内テキストの色です。',
          'theme.backgroundColor': 'ボタンやナビゲーションの主背景色です。',
          'bubble.show': '入口上のバブルを表示するかどうかです。',
          'bubble.icon': '単一バブルのデフォルトアイコンです。',
          'bubble.title': '単一バブルのタイトルです。',
          'bubble.subtitle': '単一バブルのサブタイトルです。',
          'bubble.messages': '複数バブルの配列です。単一設定より優先されます。',
          'bubble.autoRotate': '複数バブルを自動ローテーションするかどうかです。',
          'bubble.rotateInterval': 'バブル切り替え間隔です。単位はミリ秒です。',
          'bubble.switchMode': 'バブル切り替え方式です。fade、slide-up、ticker を選べます。',
          'button.show': 'この入口ボタンを表示するかどうかです。',
          'button.icon': 'ボタンアイコンです。通常は emoji や短い記号を使います。',
          'button.text': 'ボタンテキストです。単一円形ボタンでは省略推奨です。',
          'button.width': 'ボタン幅です。単位は px です。',
          'button.height': 'ボタン高さです。単位は px です。',
          'button.action': '組み込み入口タイプです。chat、thread、webrtc、call を使えます。',
          'button.previewImageUrl': 'ホバー時に表示する画像 URL です。QR コード入口に向いています。',
          'button.previewImageAlt': 'プレビュー画像下に表示する説明文です。',
          'button.onClick': '既定動作を上書きするカスタムクリック処理です。',
          'invite.show': '招待ダイアログを有効にするかどうかです。',
          'invite.text': '招待文言です。',
          'invite.icon': '招待ダイアログのアイコンです。',
          'invite.delay': '最初の招待表示までの遅延時間です。',
          'invite.loop': '招待ダイアログを繰り返し表示するかどうかです。',
          'invite.loopDelay': '繰り返し表示間隔です。',
          'invite.loopCount': '繰り返し回数です。',
          'invite.acceptText': '承諾ボタンの文言です。',
          'invite.rejectText': '拒否ボタンの文言です。',
          'invite.onAccept': 'ユーザーが承諾したときに呼ばれます。',
          'invite.onReject': 'ユーザーが拒否したときに呼ばれます。',
          'invite.onClose': '招待ダイアログが閉じたときに呼ばれます。',
          'invite.onOpen': '招待ダイアログが開いたときに呼ばれます。',
          'chat.org': '組織 ID です。必須です。',
          'chat.t': '会話タイプです。必須です。t=0 は 1 対 1 の客服、t=1 はワークグループ、t=2 はロボットを表します。',
          'chat.sid': '会話対象 ID です。必須です。',
          'chat.uid': '内部ユーザー ID で、通常は SDK が管理します。',
          'chat.visitorUid': '業務側で使う訪問者一意 ID です。',
          'chat.nickname': '訪問者ニックネームです。',
          'chat.avatar': '訪問者アバター URL です。',
          'chat.mobile': '訪問者の携帯番号です。',
          'chat.email': '訪問者メールアドレスです。',
          'chat.note': '客服側で見えるメモです。',
          'chat.channel': '流入チャネルです。',
          'chat.goodsInfo': '商品情報です。',
          'chat.orderInfo': '注文情報です。',
          'chat.extra': '追加拡張フィールドです。通常は JSON 文字列を渡します。',
          'chat.vipLevel': '会員レベルです。',
          'chat.debug': 'テスト環境と本番環境を区別する業務フラグです。',
          'chat.draft': '段階リリース用フラグで、URL に draft=1 として渡されます。',
          'chat.settingsUid': '設定デバッグに使う一意 ID です。',
          'chat.loadHistory': '履歴メッセージを読み込むかどうかです。loadHistory=1 でチャットページを開く際に履歴を自動読み込みします。',
          'chat.custom': '追加の業務フィールドを URL パラメータとして付与できます。',
          'browse.referrer': '遷移元ページ URL です。',
          'browse.url': '現在ページ URL です。',
          'browse.title': '現在ページタイトルです。',
          'browse.custom': 'ページ ID などの追加閲覧情報を渡せます。',
          'feedback.enabled': 'ドキュメントフィードバック機能を有効にするかどうかです。',
          'feedback.trigger': '起動方法です。selection、button、both を選べます。',
          'feedback.showOnSelection': 'テキスト選択時に入口を表示するかどうかです。',
          'feedback.selectionText': 'テキスト選択時の案内文です。',
          'feedback.buttonText': '固定フィードバックボタン文言です。',
          'feedback.dialogTitle': 'フィードバックダイアログのタイトルです。',
          'feedback.placeholder': '入力欄のプレースホルダーです。',
          'feedback.submitText': '送信ボタン文言です。',
          'feedback.cancelText': 'キャンセルボタン文言です。',
          'feedback.successMessage': '送信成功後の文言です。',
          'feedback.categoryNames': '問題カテゴリ一覧です。',
          'feedback.requiredTypes': 'カテゴリ選択を必須にするかどうかです。',
          'feedback.typesSectionTitle': 'カテゴリ領域のタイトルです。',
          'feedback.typesDescription': 'カテゴリ領域の補足説明です。',
          'feedback.submitScreenshot': 'スクリーンショットも一緒に送るかどうかです。',
          'feedback.onSubmit': 'カスタム送信処理です。',
          'feedback.onCancel': 'キャンセル時に呼ばれます。',
          'animation.enabled': 'チャットウィンドウアニメーションを有効にするかどうかです。',
          'animation.duration': 'アニメーション時間です。単位はミリ秒です。',
          'animation.type': 'イージング種別です。',
          'window.width': 'デスクトップチャットウィンドウ幅です。',
          'window.height': 'デスクトップチャットウィンドウ高さです。',
          'tabs.home': 'home タブを表示するかどうかです。',
          'tabs.messages': 'messages タブを表示するかどうかです。',
          'tabs.help': 'help タブを表示するかどうかです。',
          'tabs.news': 'news タブを表示するかどうかです。',
        },
      },
      [LANG_KO_KR]: {
        fields: {
          isDebug: '개발용 디버그 로그를 켤지 여부입니다.',
          forceRefresh: '채팅 페이지나 iframe 리소스를 강제로 새로고침해 캐시 문제를 확인합니다.',
          apiUrl: '방문자 초기화, 미읽음 수, 피드백 업로드 등에 사용하는 API 루트 주소입니다.',
          htmlUrl: '채팅 페이지의 사이트 루트 주소입니다. 실제 페이지 유형은 각 path 설정으로 분리합니다.',
          chatPath: '텍스트 채팅 페이지 경로입니다.',
          threadPath: '기록 대화 페이지 경로입니다.',
          webrtcPath: '음성 또는 영상 페이지 경로입니다.',
          callPath: '콜센터 페이지 경로입니다.',
          locale: 'UI 언어 설정이며 chat URL 의 lang 파라미터에도 반영됩니다.',
          placement: '버튼과 채팅창의 고정 위치입니다. bottom-left 와 bottom-right 를 지원합니다.',
          marginBottom: '하단 여백입니다. 단위는 px 입니다.',
          marginSide: '좌우 여백입니다. 단위는 px 입니다.',
          autoPopup: '초기화 후 채팅창을 자동으로 열지 여부입니다.',
          autoPopupDelay: '자동 팝업까지의 지연 시간입니다.',
          draggable: '진입 버튼을 드래그 가능하게 할지 여부입니다.',
          tabsConfig: 'home, messages, help, news 탭 표시 여부를 제어합니다.',
          bubbleConfig: '입구 위 안내 버블의 제목, 부제, 로테이션 문구 등을 설정합니다.',
          buttonConfig: '단일 진입 버튼 설정입니다.',
          buttonsConfig: '복수 진입 버튼 배열 설정입니다. buttonConfig 보다 우선합니다.',
          inviteConfig: '초대 팝업의 타이밍, 반복, 버튼 문구, 콜백을 설정합니다.',
          theme: 'light, dark, system 모드와 색상 테마 설정입니다.',
          animation: '채팅창 표시와 숨김 애니메이션 설정입니다.',
          window: '데스크톱 채팅창 크기 설정입니다.',
          onInit: 'SDK 초기화 완료 후 실행되는 콜백입니다.',
          onShowChat: '채팅창이 열릴 때 실행됩니다.',
          onHideChat: '채팅창이 닫힐 때 실행됩니다.',
          onMessage: 'iframe 또는 SDK 내부 메시지를 받을 때 실행됩니다.',
          onConfigChange: '설정 변경 후 실행됩니다.',
          onVisitorInfo: '방문자 초기화 후 uid 와 visitorUid 를 돌려줍니다.',
          'theme.mode': '테마 모드입니다. light, dark, system 을 사용할 수 있습니다.',
          'theme.textColor': '버튼과 모듈 내부 텍스트 색상입니다.',
          'theme.backgroundColor': '버튼과 내비게이션의 주요 배경색입니다.',
          'bubble.show': '입구 위 버블을 표시할지 여부입니다.',
          'bubble.icon': '단일 버블 기본 아이콘입니다.',
          'bubble.title': '단일 버블 제목입니다.',
          'bubble.subtitle': '단일 버블 부제입니다.',
          'bubble.messages': '여러 버블 메시지 배열입니다. 단일 설정보다 우선합니다.',
          'bubble.autoRotate': '여러 버블 메시지를 자동 순환할지 여부입니다.',
          'bubble.rotateInterval': '버블 순환 간격입니다.',
          'bubble.switchMode': '버블 전환 방식입니다. fade, slide-up, ticker 를 지원합니다.',
          'button.show': '이 버튼을 표시할지 여부입니다.',
          'button.icon': '버튼 아이콘입니다.',
          'button.text': '버튼 텍스트입니다. 단일 원형 버튼일 때는 생략을 권장합니다.',
          'button.width': '버튼 너비입니다.',
          'button.height': '버튼 높이입니다.',
          'button.action': '기본 내장 액션 타입입니다. chat, thread, webrtc, call 을 지원합니다.',
          'button.previewImageUrl': '호버 시 보여줄 이미지 주소입니다. QR 코드에 적합합니다.',
          'button.previewImageAlt': '미리보기 이미지 아래 표시할 설명 문구입니다.',
          'button.onClick': '기본 동작을 덮어쓰는 사용자 정의 클릭 핸들러입니다.',
          'invite.show': '초대 팝업을 사용할지 여부입니다.',
          'invite.text': '초대 문구입니다.',
          'invite.icon': '초대 팝업 아이콘입니다.',
          'invite.delay': '첫 초대 노출까지의 지연 시간입니다.',
          'invite.loop': '초대 팝업을 반복 노출할지 여부입니다.',
          'invite.loopDelay': '반복 노출 간격입니다.',
          'invite.loopCount': '반복 횟수입니다.',
          'invite.acceptText': '수락 버튼 문구입니다.',
          'invite.rejectText': '거절 버튼 문구입니다.',
          'invite.onAccept': '수락 시 실행됩니다.',
          'invite.onReject': '거절 시 실행됩니다.',
          'invite.onClose': '초대 팝업이 닫힐 때 실행됩니다.',
          'invite.onOpen': '초대 팝업이 열릴 때 실행됩니다.',
          'chat.org': '조직 ID 입니다. 필수입니다.',
          'chat.t': '대화 타입입니다. 필수입니다. t=0 은 1:1 상담원, t=1 은 작업 그룹, t=2 는 로봇을 의미합니다.',
          'chat.sid': '대상 세션 ID 입니다. 필수입니다.',
          'chat.uid': 'SDK 가 주로 관리하는 내부 사용자 ID 입니다.',
          'chat.visitorUid': '비즈니스 측 방문자 고유 식별자입니다.',
          'chat.nickname': '방문자 닉네임입니다.',
          'chat.avatar': '방문자 아바타 URL 입니다.',
          'chat.mobile': '방문자 휴대폰 번호입니다.',
          'chat.email': '방문자 이메일입니다.',
          'chat.note': '상담사에게 보이는 메모입니다.',
          'chat.channel': '유입 채널입니다.',
          'chat.goodsInfo': '상품 정보입니다.',
          'chat.orderInfo': '주문 정보입니다.',
          'chat.extra': '추가 확장 필드입니다. 보통 JSON 문자열을 사용합니다.',
          'chat.vipLevel': '회원 등급입니다.',
          'chat.debug': '테스트와 운영을 구분하는 비즈니스 플래그입니다.',
          'chat.draft': '점진 배포용 draft 플래그입니다.',
          'chat.settingsUid': '설정 디버깅에 쓰는 고유 ID 입니다.',
          'chat.loadHistory': '이전 메시지를 불러올지 여부입니다. loadHistory=1 이면 대화 페이지 열 때 기본으로 이전 채팅 기록을 불러옵니다.',
          'chat.custom': '추가 비즈니스 필드를 URL 파라미터로 계속 확장할 수 있습니다.',
          'browse.referrer': '유입 페이지 주소입니다.',
          'browse.url': '현재 페이지 주소입니다.',
          'browse.title': '현재 페이지 제목입니다.',
          'browse.custom': '페이지 ID 등 추가 브라우즈 정보를 전달할 수 있습니다.',
          'feedback.enabled': '문서 피드백 기능을 사용할지 여부입니다.',
          'feedback.trigger': '트리거 방식입니다. selection, button, both 를 지원합니다.',
          'feedback.showOnSelection': '텍스트 선택 시 피드백 입구를 보여줄지 여부입니다.',
          'feedback.selectionText': '선택 시 안내 문구입니다.',
          'feedback.buttonText': '고정 피드백 버튼 문구입니다.',
          'feedback.dialogTitle': '피드백 대화상자 제목입니다.',
          'feedback.placeholder': '입력창 플레이스홀더입니다.',
          'feedback.submitText': '제출 버튼 문구입니다.',
          'feedback.cancelText': '취소 버튼 문구입니다.',
          'feedback.successMessage': '제출 성공 후 보여줄 문구입니다.',
          'feedback.categoryNames': '문제 유형 목록입니다.',
          'feedback.requiredTypes': '유형 선택을 필수로 할지 여부입니다.',
          'feedback.typesSectionTitle': '유형 영역 제목입니다.',
          'feedback.typesDescription': '유형 영역 보조 설명입니다.',
          'feedback.submitScreenshot': '스크린샷도 함께 제출할지 여부입니다.',
          'feedback.onSubmit': '사용자 정의 제출 흐름입니다.',
          'feedback.onCancel': '취소 시 실행됩니다.',
          'animation.enabled': '채팅창 애니메이션을 사용할지 여부입니다.',
          'animation.duration': '애니메이션 시간입니다.',
          'animation.type': '이징 타입입니다.',
          'window.width': '데스크톱 채팅창 너비입니다.',
          'window.height': '데스크톱 채팅창 높이입니다.',
          'tabs.home': 'home 탭 표시 여부입니다.',
          'tabs.messages': 'messages 탭 표시 여부입니다.',
          'tabs.help': 'help 탭 표시 여부입니다.',
          'tabs.news': 'news 탭 표시 여부입니다.',
        },
      },
      [LANG_VI_VN]: {
        fields: {
          isDebug: 'Bật nhật ký gỡ lỗi khi phát triển.',
          forceRefresh: 'Làm mới cưỡng bức trang chat hoặc tài nguyên iframe để kiểm tra cache.',
          apiUrl: 'Địa chỉ gốc API dùng cho khởi tạo khách truy cập, số chưa đọc và phản hồi.',
          htmlUrl: 'Địa chỉ gốc của trang chat. Loại trang được tách qua các path riêng.',
          chatPath: 'Đường dẫn trang chat văn bản.',
          threadPath: 'Đường dẫn trang lịch sử hội thoại.',
          webrtcPath: 'Đường dẫn trang âm thanh hoặc video.',
          callPath: 'Đường dẫn trang trung tâm cuộc gọi.',
          locale: 'Ngôn ngữ giao diện và cũng được đưa vào tham số lang của URL chat.',
          placement: 'Vị trí neo của nút và cửa sổ chat.',
          marginBottom: 'Khoảng cách tới mép dưới, đơn vị px.',
          marginSide: 'Khoảng cách tới mép trái hoặc phải, đơn vị px.',
          autoPopup: 'Tự động mở cửa sổ chat sau khi khởi tạo.',
          autoPopupDelay: 'Độ trễ trước khi tự động mở.',
          draggable: 'Cho phép kéo nút vào vị trí khác.',
          tabsConfig: 'Điều khiển hiển thị các tab home, messages, help, news.',
          bubbleConfig: 'Cấu hình bong bóng nhắc phía trên nút vào.',
          buttonConfig: 'Cấu hình cho một nút vào duy nhất.',
          buttonsConfig: 'Mảng cấu hình cho nhiều nút vào, ưu tiên hơn buttonConfig.',
          inviteConfig: 'Cấu hình popup mời với thời điểm hiển thị, lặp lại và callback.',
          theme: 'Cấu hình giao diện và màu sắc.',
          animation: 'Cấu hình hoạt ảnh khi hiện hoặc ẩn cửa sổ chat.',
          window: 'Kích thước cửa sổ chat trên desktop.',
          onInit: 'Callback chạy sau khi SDK khởi tạo xong.',
          onShowChat: 'Callback chạy khi cửa sổ chat hiển thị.',
          onHideChat: 'Callback chạy khi cửa sổ chat ẩn.',
          onMessage: 'Callback chạy khi nhận message từ iframe hoặc SDK.',
          onConfigChange: 'Callback chạy sau khi cấu hình thay đổi.',
          onVisitorInfo: 'Trả về uid và visitorUid sau khi khởi tạo khách truy cập.',
          'theme.mode': 'Chế độ giao diện: light, dark hoặc system.',
          'theme.textColor': 'Màu chữ của nút hoặc mô-đun.',
          'theme.backgroundColor': 'Màu nền chính của nút hoặc thanh điều hướng.',
          'bubble.show': 'Có hiển thị bong bóng nhắc phía trên hay không.',
          'bubble.icon': 'Biểu tượng mặc định của bong bóng đơn.',
          'bubble.title': 'Tiêu đề của bong bóng đơn.',
          'bubble.subtitle': 'Phụ đề của bong bóng đơn.',
          'bubble.messages': 'Danh sách nhiều bong bóng, ưu tiên hơn cấu hình đơn.',
          'bubble.autoRotate': 'Có tự động luân phiên nhiều bong bóng hay không.',
          'bubble.rotateInterval': 'Khoảng thời gian đổi bong bóng.',
          'bubble.switchMode': 'Kiểu chuyển đổi: fade, slide-up hoặc ticker.',
          'button.show': 'Có hiển thị nút này hay không.',
          'button.icon': 'Biểu tượng của nút.',
          'button.text': 'Văn bản của nút. Với nút tròn đơn có thể bỏ trống.',
          'button.width': 'Chiều rộng nút.',
          'button.height': 'Chiều cao nút.',
          'button.action': 'Loại hành động tích hợp: chat, thread, webrtc hoặc call.',
          'button.previewImageUrl': 'Ảnh hiển thị khi hover, phù hợp cho mã QR.',
          'button.previewImageAlt': 'Chú thích phía dưới ảnh xem trước.',
          'button.onClick': 'Xử lý click tùy chỉnh để ghi đè hành vi mặc định.',
          'invite.show': 'Có bật popup mời hay không.',
          'invite.text': 'Nội dung lời mời.',
          'invite.icon': 'Biểu tượng popup mời.',
          'invite.delay': 'Độ trễ trước lần hiển thị đầu tiên.',
          'invite.loop': 'Có lặp lại popup mời hay không.',
          'invite.loopDelay': 'Khoảng cách giữa các lần lặp.',
          'invite.loopCount': 'Số lần lặp tối đa.',
          'invite.acceptText': 'Văn bản nút chấp nhận.',
          'invite.rejectText': 'Văn bản nút từ chối.',
          'invite.onAccept': 'Chạy khi người dùng chấp nhận lời mời.',
          'invite.onReject': 'Chạy khi người dùng từ chối lời mời.',
          'invite.onClose': 'Chạy khi popup mời đóng.',
          'invite.onOpen': 'Chạy khi popup mời mở.',
          'chat.org': 'ID tổ chức, bắt buộc.',
          'chat.t': 'Loại hội thoại, bắt buộc. t=0 la tu van 1-1, t=1 la nhom lam viec, t=2 la robot.',
          'chat.sid': 'ID mục tiêu hội thoại, bắt buộc.',
          'chat.uid': 'ID người dùng nội bộ, thường do SDK quản lý.',
          'chat.visitorUid': 'Mã định danh khách truy cập phía nghiệp vụ.',
          'chat.nickname': 'Biệt danh khách truy cập.',
          'chat.avatar': 'Địa chỉ avatar của khách truy cập.',
          'chat.mobile': 'Số điện thoại khách truy cập.',
          'chat.email': 'Email khách truy cập.',
          'chat.note': 'Ghi chú hiển thị cho bộ phận hỗ trợ.',
          'chat.channel': 'Nguồn kênh truy cập.',
          'chat.goodsInfo': 'Thông tin sản phẩm.',
          'chat.orderInfo': 'Thông tin đơn hàng.',
          'chat.extra': 'Trường mở rộng bổ sung, thường là JSON.',
          'chat.vipLevel': 'Cấp độ thành viên.',
          'chat.debug': 'Cờ nghiệp vụ để phân biệt môi trường thử nghiệm và sản xuất.',
          'chat.draft': 'Cờ phát hành xám, truyền dưới dạng draft=1 trong URL.',
          'chat.settingsUid': 'ID duy nhất dùng cho gỡ lỗi cấu hình.',
          'chat.loadHistory': 'Có tải lịch sử tin nhắn hay không. loadHistory=1 se mac dinh tai lich su khi mo trang chat.',
          'chat.custom': 'Có thể tiếp tục thêm trường nghiệp vụ tùy chỉnh vào URL chat.',
          'browse.referrer': 'Địa chỉ trang nguồn.',
          'browse.url': 'Địa chỉ trang hiện tại.',
          'browse.title': 'Tiêu đề trang hiện tại.',
          'browse.custom': 'Có thể bổ sung thêm thông tin duyệt như page ID.',
          'feedback.enabled': 'Có bật chức năng phản hồi tài liệu hay không.',
          'feedback.trigger': 'Cách kích hoạt: selection, button hoặc both.',
          'feedback.showOnSelection': 'Có hiện lối vào phản hồi khi chọn văn bản hay không.',
          'feedback.selectionText': 'Văn bản gợi ý khi chọn nội dung.',
          'feedback.buttonText': 'Nhãn nút phản hồi cố định.',
          'feedback.dialogTitle': 'Tiêu đề hộp thoại phản hồi.',
          'feedback.placeholder': 'Placeholder của ô nhập phản hồi.',
          'feedback.submitText': 'Nhãn nút gửi.',
          'feedback.cancelText': 'Nhãn nút hủy.',
          'feedback.successMessage': 'Thông báo sau khi gửi thành công.',
          'feedback.categoryNames': 'Danh sách loại vấn đề.',
          'feedback.requiredTypes': 'Có bắt buộc chọn ít nhất một loại hay không.',
          'feedback.typesSectionTitle': 'Tiêu đề khu vực loại vấn đề.',
          'feedback.typesDescription': 'Mô tả bổ sung cho khu vực loại vấn đề.',
          'feedback.submitScreenshot': 'Có gửi kèm ảnh chụp màn hình hay không.',
          'feedback.onSubmit': 'Luồng gửi phản hồi tùy chỉnh.',
          'feedback.onCancel': 'Chạy khi hủy phản hồi.',
          'animation.enabled': 'Có bật hoạt ảnh cửa sổ chat hay không.',
          'animation.duration': 'Thời lượng hoạt ảnh.',
          'animation.type': 'Kiểu easing.',
          'window.width': 'Chiều rộng cửa sổ chat desktop.',
          'window.height': 'Chiều cao cửa sổ chat desktop.',
          'tabs.home': 'Có hiển thị tab home hay không.',
          'tabs.messages': 'Có hiển thị tab messages hay không.',
          'tabs.help': 'Có hiển thị tab help hay không.',
          'tabs.news': 'Có hiển thị tab news hay không.',
        },
      },
      [LANG_MS_MY]: {
        fields: {
          isDebug: 'Sama ada untuk menghidupkan log nyahpepijat semasa pembangunan.',
          forceRefresh: 'Paksa segar semula halaman chat atau iframe untuk menyemak isu cache.',
          apiUrl: 'Alamat akar API untuk pemulaan pelawat, kiraan belum dibaca dan maklum balas.',
          htmlUrl: 'Alamat akar laman chat. Jenis halaman dikawal oleh path berasingan.',
          chatPath: 'Laluan halaman chat teks.',
          threadPath: 'Laluan halaman sejarah perbualan.',
          webrtcPath: 'Laluan halaman audio atau video.',
          callPath: 'Laluan halaman pusat panggilan.',
          locale: 'Bahasa UI dan juga dihantar ke parameter lang pada URL chat.',
          placement: 'Kedudukan lekapan butang dan tetingkap chat.',
          marginBottom: 'Jarak dari bahagian bawah dalam px.',
          marginSide: 'Jarak dari sisi kiri atau kanan dalam px.',
          autoPopup: 'Sama ada membuka tetingkap chat secara automatik selepas inisialisasi.',
          autoPopupDelay: 'Masa tunda sebelum auto popup.',
          draggable: 'Benarkan butang masuk diseret.',
          tabsConfig: 'Kawal paparan tab home, messages, help dan news.',
          bubbleConfig: 'Konfigurasi gelembung petunjuk di atas pintu masuk.',
          buttonConfig: 'Konfigurasi untuk satu butang masuk.',
          buttonsConfig: 'Senarai beberapa butang masuk, dengan keutamaan lebih tinggi daripada buttonConfig.',
          inviteConfig: 'Konfigurasi popup jemputan termasuk masa, gelung, teks butang dan callback.',
          theme: 'Konfigurasi tema dan warna.',
          animation: 'Konfigurasi animasi semasa memaparkan atau menyembunyikan tetingkap chat.',
          window: 'Saiz tetingkap chat di desktop.',
          onInit: 'Callback selepas SDK selesai diinisialisasi.',
          onShowChat: 'Dipanggil apabila tetingkap chat dipaparkan.',
          onHideChat: 'Dipanggil apabila tetingkap chat disembunyikan.',
          onMessage: 'Dipanggil apabila menerima mesej daripada iframe atau SDK.',
          onConfigChange: 'Dipanggil selepas konfigurasi berubah.',
          onVisitorInfo: 'Mengembalikan uid dan visitorUid selepas pemulaan pelawat.',
          'theme.mode': 'Mod tema: light, dark atau system.',
          'theme.textColor': 'Warna teks bagi butang atau modul.',
          'theme.backgroundColor': 'Warna latar utama bagi butang atau navigasi.',
          'bubble.show': 'Sama ada memaparkan gelembung petunjuk di atas pintu masuk.',
          'bubble.icon': 'Ikon lalai untuk satu gelembung.',
          'bubble.title': 'Tajuk untuk satu gelembung.',
          'bubble.subtitle': 'Subtajuk untuk satu gelembung.',
          'bubble.messages': 'Senarai beberapa mesej gelembung, mengatasi konfigurasi tunggal.',
          'bubble.autoRotate': 'Sama ada memutar mesej gelembung secara automatik.',
          'bubble.rotateInterval': 'Selang pertukaran gelembung.',
          'bubble.switchMode': 'Cara pertukaran: fade, slide-up atau ticker.',
          'button.show': 'Sama ada memaparkan butang ini.',
          'button.icon': 'Ikon butang.',
          'button.text': 'Teks butang. Boleh dikosongkan untuk satu butang bulat.',
          'button.width': 'Lebar butang.',
          'button.height': 'Tinggi butang.',
          'button.action': 'Jenis tindakan terbina: chat, thread, webrtc atau call.',
          'button.previewImageUrl': 'Imej dipaparkan semasa hover, sesuai untuk kod QR.',
          'button.previewImageAlt': 'Teks penerangan di bawah imej pratonton.',
          'button.onClick': 'Pengendali klik tersuai yang mengatasi tindakan lalai.',
          'invite.show': 'Sama ada untuk mengaktifkan popup jemputan.',
          'invite.text': 'Teks kandungan jemputan.',
          'invite.icon': 'Ikon popup jemputan.',
          'invite.delay': 'Masa tunda sebelum kali pertama dipaparkan.',
          'invite.loop': 'Sama ada popup jemputan diulang.',
          'invite.loopDelay': 'Jarak masa antara pengulangan.',
          'invite.loopCount': 'Bilangan maksimum pengulangan.',
          'invite.acceptText': 'Teks butang terima.',
          'invite.rejectText': 'Teks butang tolak.',
          'invite.onAccept': 'Dipanggil apabila pengguna menerima jemputan.',
          'invite.onReject': 'Dipanggil apabila pengguna menolak jemputan.',
          'invite.onClose': 'Dipanggil apabila popup jemputan ditutup.',
          'invite.onOpen': 'Dipanggil apabila popup jemputan dibuka.',
          'chat.org': 'ID organisasi, wajib.',
          'chat.t': 'Jenis perbualan, wajib. t=0 bermaksud khidmat pelanggan satu-ke-satu, t=1 bermaksud kumpulan kerja, t=2 bermaksud robot.',
          'chat.sid': 'ID sasaran perbualan, wajib.',
          'chat.uid': 'ID pengguna dalaman yang biasanya diurus oleh SDK.',
          'chat.visitorUid': 'Pengecam unik pelawat dari sisi perniagaan.',
          'chat.nickname': 'Nama panggilan pelawat.',
          'chat.avatar': 'URL avatar pelawat.',
          'chat.mobile': 'Nombor telefon pelawat.',
          'chat.email': 'E-mel pelawat.',
          'chat.note': 'Nota yang boleh dilihat oleh khidmat pelanggan.',
          'chat.channel': 'Sumber saluran masuk.',
          'chat.goodsInfo': 'Maklumat produk.',
          'chat.orderInfo': 'Maklumat pesanan.',
          'chat.extra': 'Medan lanjutan tambahan, biasanya JSON.',
          'chat.vipLevel': 'Tahap ahli.',
          'chat.debug': 'Penanda perniagaan untuk membezakan ujian dan produksi.',
          'chat.draft': 'Penanda draft untuk pelepasan berperingkat.',
          'chat.settingsUid': 'ID unik untuk nyahpepijat konfigurasi.',
          'chat.loadHistory': 'Sama ada memuatkan sejarah mesej. loadHistory=1 akan memuatkan sejarah sembang secara lalai apabila membuka halaman sembang.',
          'chat.custom': 'Medan perniagaan tambahan boleh terus ditambah ke parameter URL chat.',
          'browse.referrer': 'Alamat halaman rujukan.',
          'browse.url': 'Alamat halaman semasa.',
          'browse.title': 'Tajuk halaman semasa.',
          'browse.custom': 'Boleh menambah maklumat pelayaran tambahan seperti ID halaman.',
          'feedback.enabled': 'Sama ada mengaktifkan fungsi maklum balas dokumen.',
          'feedback.trigger': 'Cara pencetus: selection, button atau both.',
          'feedback.showOnSelection': 'Sama ada memaparkan pintu masuk maklum balas semasa memilih teks.',
          'feedback.selectionText': 'Teks petunjuk apabila teks dipilih.',
          'feedback.buttonText': 'Label tetap bagi butang maklum balas.',
          'feedback.dialogTitle': 'Tajuk dialog maklum balas.',
          'feedback.placeholder': 'Placeholder medan input maklum balas.',
          'feedback.submitText': 'Label butang hantar.',
          'feedback.cancelText': 'Label butang batal.',
          'feedback.successMessage': 'Mesej selepas berjaya dihantar.',
          'feedback.categoryNames': 'Senarai kategori masalah.',
          'feedback.requiredTypes': 'Sama ada perlu memilih sekurang-kurangnya satu kategori.',
          'feedback.typesSectionTitle': 'Tajuk kawasan kategori.',
          'feedback.typesDescription': 'Penerangan tambahan bagi kawasan kategori.',
          'feedback.submitScreenshot': 'Sama ada menghantar tangkapan skrin bersama maklum balas.',
          'feedback.onSubmit': 'Aliran penghantaran tersuai.',
          'feedback.onCancel': 'Dipanggil apabila maklum balas dibatalkan.',
          'animation.enabled': 'Sama ada mengaktifkan animasi tetingkap chat.',
          'animation.duration': 'Tempoh animasi.',
          'animation.type': 'Jenis easing.',
          'window.width': 'Lebar tetingkap chat desktop.',
          'window.height': 'Tinggi tetingkap chat desktop.',
          'tabs.home': 'Sama ada memaparkan tab home.',
          'tabs.messages': 'Sama ada memaparkan tab messages.',
          'tabs.help': 'Sama ada memaparkan tab help.',
          'tabs.news': 'Sama ada memaparkan tab news.',
        },
      },
      [LANG_ES_ES]: {
        fields: {
          isDebug: 'Activa los registros de depuración durante el desarrollo.',
          forceRefresh: 'Fuerza la recarga de la página de chat o del iframe para comprobar problemas de caché.',
          apiUrl: 'Dirección raíz de la API usada para inicializar visitantes, no leídos y comentarios.',
          htmlUrl: 'Dirección raíz del sitio de chat. El tipo de página se separa con rutas específicas.',
          chatPath: 'Ruta de la página de chat de texto.',
          threadPath: 'Ruta de la página de historial de conversación.',
          webrtcPath: 'Ruta de la página de audio o video.',
          callPath: 'Ruta de la página del centro de llamadas.',
          locale: 'Idioma de la interfaz y también se envía al parámetro lang de la URL de chat.',
          placement: 'Posición fija del botón y de la ventana de chat.',
          marginBottom: 'Separación respecto al borde inferior en px.',
          marginSide: 'Separación respecto al borde izquierdo o derecho en px.',
          autoPopup: 'Abre automáticamente la ventana de chat después de inicializar.',
          autoPopupDelay: 'Retraso antes de la apertura automática.',
          draggable: 'Permite arrastrar el botón de entrada.',
          tabsConfig: 'Controla la visibilidad de las pestañas home, messages, help y news.',
          bubbleConfig: 'Configura la burbuja de aviso sobre la entrada.',
          buttonConfig: 'Configuración para un único botón de entrada.',
          buttonsConfig: 'Lista de múltiples botones de entrada con prioridad sobre buttonConfig.',
          inviteConfig: 'Configura la invitación emergente, sus tiempos y callbacks.',
          theme: 'Configuración de tema y colores.',
          animation: 'Configuración de animación al mostrar u ocultar la ventana de chat.',
          window: 'Tamaño de la ventana de chat en escritorio.',
          onInit: 'Callback que se ejecuta tras completar la inicialización del SDK.',
          onShowChat: 'Se ejecuta cuando se muestra la ventana de chat.',
          onHideChat: 'Se ejecuta cuando se oculta la ventana de chat.',
          onMessage: 'Se ejecuta al recibir mensajes del iframe o del SDK.',
          onConfigChange: 'Se ejecuta después de un cambio de configuración.',
          onVisitorInfo: 'Devuelve uid y visitorUid tras inicializar al visitante.',
          'theme.mode': 'Modo de tema: light, dark o system.',
          'theme.textColor': 'Color del texto del botón o del módulo.',
          'theme.backgroundColor': 'Color principal de fondo del botón o la navegación.',
          'bubble.show': 'Indica si se muestra la burbuja sobre la entrada.',
          'bubble.icon': 'Icono predeterminado de una burbuja simple.',
          'bubble.title': 'Título de una burbuja simple.',
          'bubble.subtitle': 'Subtítulo de una burbuja simple.',
          'bubble.messages': 'Lista de varias burbujas; tiene prioridad sobre la configuración simple.',
          'bubble.autoRotate': 'Indica si rota automáticamente varias burbujas.',
          'bubble.rotateInterval': 'Intervalo de rotación de las burbujas.',
          'bubble.switchMode': 'Modo de cambio: fade, slide-up o ticker.',
          'button.show': 'Indica si se muestra este botón.',
          'button.icon': 'Icono del botón.',
          'button.text': 'Texto del botón. En una entrada circular única puede omitirse.',
          'button.width': 'Ancho del botón.',
          'button.height': 'Alto del botón.',
          'button.action': 'Tipo de acción integrada: chat, thread, webrtc o call.',
          'button.previewImageUrl': 'Imagen mostrada al pasar el cursor, útil para códigos QR.',
          'button.previewImageAlt': 'Texto mostrado debajo de la imagen de vista previa.',
          'button.onClick': 'Manejo personalizado del clic que sustituye la acción predeterminada.',
          'invite.show': 'Indica si se activa la invitación emergente.',
          'invite.text': 'Texto de la invitación.',
          'invite.icon': 'Icono de la invitación.',
          'invite.delay': 'Retraso antes de la primera aparición.',
          'invite.loop': 'Indica si la invitación se repite.',
          'invite.loopDelay': 'Tiempo entre repeticiones.',
          'invite.loopCount': 'Número máximo de repeticiones.',
          'invite.acceptText': 'Texto del botón de aceptar.',
          'invite.rejectText': 'Texto del botón de rechazar.',
          'invite.onAccept': 'Se ejecuta cuando el usuario acepta.',
          'invite.onReject': 'Se ejecuta cuando el usuario rechaza.',
          'invite.onClose': 'Se ejecuta cuando la invitación se cierra.',
          'invite.onOpen': 'Se ejecuta cuando la invitación se abre.',
          'chat.org': 'ID de la organización, obligatorio.',
          'chat.t': 'Tipo de conversación, obligatorio. t=0 significa atención uno a uno, t=1 significa grupo de trabajo y t=2 significa robot.',
          'chat.sid': 'ID de destino de la conversación, obligatorio.',
          'chat.uid': 'ID interno de usuario normalmente gestionado por el SDK.',
          'chat.visitorUid': 'Identificador único del visitante del lado del negocio.',
          'chat.nickname': 'Apodo del visitante.',
          'chat.avatar': 'URL del avatar del visitante.',
          'chat.mobile': 'Teléfono móvil del visitante.',
          'chat.email': 'Correo electrónico del visitante.',
          'chat.note': 'Nota visible para el equipo de soporte.',
          'chat.channel': 'Canal de procedencia.',
          'chat.goodsInfo': 'Información del producto.',
          'chat.orderInfo': 'Información del pedido.',
          'chat.extra': 'Campos extra, normalmente en JSON.',
          'chat.vipLevel': 'Nivel de miembro.',
          'chat.debug': 'Bandera de negocio para diferenciar pruebas y producción.',
          'chat.draft': 'Bandera de despliegue gradual transmitida como draft=1 en la URL.',
          'chat.settingsUid': 'ID único usado para depurar configuración.',
          'chat.loadHistory': 'Indica si se carga el historial de mensajes. loadHistory=1 carga el historial de chat de forma predeterminada al abrir la pagina.',
          'chat.custom': 'Se pueden seguir añadiendo campos de negocio al URL de chat.',
          'browse.referrer': 'Dirección de la página de origen.',
          'browse.url': 'Dirección de la página actual.',
          'browse.title': 'Título de la página actual.',
          'browse.custom': 'Puede incluir información adicional como el ID de página.',
          'feedback.enabled': 'Indica si se habilita la función de comentarios del documento.',
          'feedback.trigger': 'Modo de activación: selection, button o both.',
          'feedback.showOnSelection': 'Indica si se muestra el acceso al seleccionar texto.',
          'feedback.selectionText': 'Texto de ayuda al seleccionar contenido.',
          'feedback.buttonText': 'Etiqueta fija del botón de comentarios.',
          'feedback.dialogTitle': 'Título del cuadro de comentarios.',
          'feedback.placeholder': 'Placeholder del campo de comentarios.',
          'feedback.submitText': 'Etiqueta del botón de envío.',
          'feedback.cancelText': 'Etiqueta del botón de cancelar.',
          'feedback.successMessage': 'Mensaje mostrado tras un envío correcto.',
          'feedback.categoryNames': 'Lista de categorías de problema.',
          'feedback.requiredTypes': 'Indica si se exige seleccionar al menos una categoría.',
          'feedback.typesSectionTitle': 'Título del área de categorías.',
          'feedback.typesDescription': 'Descripción adicional del área de categorías.',
          'feedback.submitScreenshot': 'Indica si se envía también una captura de pantalla.',
          'feedback.onSubmit': 'Flujo personalizado de envío.',
          'feedback.onCancel': 'Se ejecuta al cancelar el comentario.',
          'animation.enabled': 'Indica si se activa la animación de la ventana de chat.',
          'animation.duration': 'Duración de la animación.',
          'animation.type': 'Tipo de easing.',
          'window.width': 'Ancho de la ventana de chat en escritorio.',
          'window.height': 'Alto de la ventana de chat en escritorio.',
          'tabs.home': 'Indica si se muestra la pestaña home.',
          'tabs.messages': 'Indica si se muestra la pestaña messages.',
          'tabs.help': 'Indica si se muestra la pestaña help.',
          'tabs.news': 'Indica si se muestra la pestaña news.',
        },
      },
      [LANG_FR_FR]: {
        fields: {
          isDebug: 'Active les journaux de débogage pendant le développement.',
          forceRefresh: 'Force le rechargement de la page de chat ou de l iframe pour vérifier les problèmes de cache.',
          apiUrl: 'Adresse racine de l API utilisée pour l initialisation du visiteur, les non lus et les retours.',
          htmlUrl: 'Adresse racine du site de chat. Le type de page est séparé par des routes dédiées.',
          chatPath: 'Chemin de la page de chat texte.',
          threadPath: 'Chemin de la page d historique des conversations.',
          webrtcPath: 'Chemin de la page audio ou vidéo.',
          callPath: 'Chemin de la page du centre d appels.',
          locale: 'Langue de l interface, également envoyée au paramètre lang de l URL de chat.',
          placement: 'Position d ancrage du bouton et de la fenêtre de chat.',
          marginBottom: 'Marge par rapport au bas en px.',
          marginSide: 'Marge par rapport à la gauche ou à la droite en px.',
          autoPopup: 'Ouvre automatiquement la fenêtre de chat après l initialisation.',
          autoPopupDelay: 'Délai avant l ouverture automatique.',
          draggable: 'Permet de faire glisser le bouton d entrée.',
          tabsConfig: 'Contrôle l affichage des onglets home, messages, help et news.',
          bubbleConfig: 'Configure la bulle d information au-dessus de l entrée.',
          buttonConfig: 'Configuration pour un seul bouton d entrée.',
          buttonsConfig: 'Liste de plusieurs boutons d entrée, prioritaire sur buttonConfig.',
          inviteConfig: 'Configure la popup d invitation, son timing, ses répétitions et ses callbacks.',
          theme: 'Configuration du thème et des couleurs.',
          animation: 'Configuration de l animation lors de l affichage ou du masquage de la fenêtre de chat.',
          window: 'Taille de la fenêtre de chat sur desktop.',
          onInit: 'Callback exécuté après l initialisation du SDK.',
          onShowChat: 'Exécuté lorsque la fenêtre de chat s affiche.',
          onHideChat: 'Exécuté lorsque la fenêtre de chat se masque.',
          onMessage: 'Exécuté lors de la réception de messages depuis l iframe ou le SDK.',
          onConfigChange: 'Exécuté après une modification de configuration.',
          onVisitorInfo: 'Retourne uid et visitorUid après l initialisation du visiteur.',
          'theme.mode': 'Mode de thème : light, dark ou system.',
          'theme.textColor': 'Couleur du texte du bouton ou du module.',
          'theme.backgroundColor': 'Couleur de fond principale du bouton ou de la navigation.',
          'bubble.show': 'Indique si la bulle au-dessus de l entrée est affichée.',
          'bubble.icon': 'Icône par défaut d une bulle simple.',
          'bubble.title': 'Titre d une bulle simple.',
          'bubble.subtitle': 'Sous-titre d une bulle simple.',
          'bubble.messages': 'Liste de plusieurs bulles, prioritaire sur la configuration simple.',
          'bubble.autoRotate': 'Indique si plusieurs bulles tournent automatiquement.',
          'bubble.rotateInterval': 'Intervalle de rotation des bulles.',
          'bubble.switchMode': 'Mode de transition : fade, slide-up ou ticker.',
          'button.show': 'Indique si ce bouton est affiché.',
          'button.icon': 'Icône du bouton.',
          'button.text': 'Texte du bouton. Pour une entrée circulaire unique, il peut être omis.',
          'button.width': 'Largeur du bouton.',
          'button.height': 'Hauteur du bouton.',
          'button.action': 'Type d action intégré : chat, thread, webrtc ou call.',
          'button.previewImageUrl': 'Image affichée au survol, utile pour un QR code.',
          'button.previewImageAlt': 'Texte affiché sous l image d aperçu.',
          'button.onClick': 'Gestionnaire de clic personnalisé qui remplace l action par défaut.',
          'invite.show': 'Indique si la popup d invitation est activée.',
          'invite.text': 'Texte de l invitation.',
          'invite.icon': 'Icône de l invitation.',
          'invite.delay': 'Délai avant la première apparition.',
          'invite.loop': 'Indique si l invitation se répète.',
          'invite.loopDelay': 'Temps entre deux répétitions.',
          'invite.loopCount': 'Nombre maximal de répétitions.',
          'invite.acceptText': 'Texte du bouton accepter.',
          'invite.rejectText': 'Texte du bouton refuser.',
          'invite.onAccept': 'Exécuté lorsque l utilisateur accepte.',
          'invite.onReject': 'Exécuté lorsque l utilisateur refuse.',
          'invite.onClose': 'Exécuté lorsque la popup se ferme.',
          'invite.onOpen': 'Exécuté lorsque la popup s ouvre.',
          'chat.org': 'ID d organisation, obligatoire.',
          'chat.t': 'Type de conversation, obligatoire. t=0 signifie service client en tete-a-tete, t=1 signifie groupe de travail et t=2 signifie robot.',
          'chat.sid': 'ID cible de conversation, obligatoire.',
          'chat.uid': 'ID utilisateur interne généralement géré par le SDK.',
          'chat.visitorUid': 'Identifiant visiteur unique côté métier.',
          'chat.nickname': 'Surnom du visiteur.',
          'chat.avatar': 'URL de l avatar du visiteur.',
          'chat.mobile': 'Numéro de téléphone du visiteur.',
          'chat.email': 'Adresse e-mail du visiteur.',
          'chat.note': 'Note visible pour le support client.',
          'chat.channel': 'Canal de provenance.',
          'chat.goodsInfo': 'Informations produit.',
          'chat.orderInfo': 'Informations de commande.',
          'chat.extra': 'Champs supplémentaires, généralement au format JSON.',
          'chat.vipLevel': 'Niveau de membre.',
          'chat.debug': 'Indicateur métier pour distinguer test et production.',
          'chat.draft': 'Indicateur de diffusion progressive transmis comme draft=1 dans l URL.',
          'chat.settingsUid': 'Identifiant unique utilisé pour déboguer la configuration.',
          'chat.loadHistory': 'Indique si l historique des messages est charge. loadHistory=1 charge l historique par defaut a l ouverture de la page de chat.',
          'chat.custom': 'Des champs métier supplémentaires peuvent encore être ajoutés aux paramètres de l URL de chat.',
          'browse.referrer': 'Adresse de la page source.',
          'browse.url': 'Adresse de la page courante.',
          'browse.title': 'Titre de la page courante.',
          'browse.custom': 'Peut inclure des informations supplémentaires comme l ID de page.',
          'feedback.enabled': 'Indique si la fonction de retour documentaire est activée.',
          'feedback.trigger': 'Mode de déclenchement : selection, button ou both.',
          'feedback.showOnSelection': 'Indique si l entrée de retour apparaît lors d une sélection de texte.',
          'feedback.selectionText': 'Texte d aide lors de la sélection.',
          'feedback.buttonText': 'Libellé fixe du bouton de retour.',
          'feedback.dialogTitle': 'Titre de la boîte de dialogue de retour.',
          'feedback.placeholder': 'Placeholder du champ de saisie.',
          'feedback.submitText': 'Libellé du bouton d envoi.',
          'feedback.cancelText': 'Libellé du bouton d annulation.',
          'feedback.successMessage': 'Message affiché après un envoi réussi.',
          'feedback.categoryNames': 'Liste des catégories de problème.',
          'feedback.requiredTypes': 'Indique s il faut sélectionner au moins une catégorie.',
          'feedback.typesSectionTitle': 'Titre de la zone des catégories.',
          'feedback.typesDescription': 'Description complémentaire de la zone des catégories.',
          'feedback.submitScreenshot': 'Indique si une capture d écran est envoyée avec le retour.',
          'feedback.onSubmit': 'Flux d envoi personnalisé.',
          'feedback.onCancel': 'Exécuté lors de l annulation du retour.',
          'animation.enabled': 'Indique si l animation de la fenêtre de chat est activée.',
          'animation.duration': 'Durée de l animation.',
          'animation.type': 'Type d easing.',
          'window.width': 'Largeur de la fenêtre de chat desktop.',
          'window.height': 'Hauteur de la fenêtre de chat desktop.',
          'tabs.home': 'Indique si l onglet home est affiché.',
          'tabs.messages': 'Indique si l onglet messages est affiché.',
          'tabs.help': 'Indique si l onglet help est affiché.',
          'tabs.news': 'Indique si l onglet news est affiché.',
        },
      },
    } as const;

    return docs[locale as keyof typeof docs] || docs[LANG_ZH_CN];
  }, [locale]);

  const popupParamPurposeMap = useMemo(() => ({
    org: fieldDocCopy.fields['chat.org'],
    t: fieldDocCopy.fields['chat.t'],
    sid: fieldDocCopy.fields['chat.sid'],
    lang: fieldDocCopy.fields.locale,
    mode: fieldDocCopy.fields['theme.mode'],
    backgroundColor: fieldDocCopy.fields['theme.backgroundColor'],
    textColor: fieldDocCopy.fields['theme.textColor'],
    navbar: messages.pages.basicDemo.navbarParamPurpose,
    loadHistory: fieldDocCopy.fields['chat.loadHistory'],
  }), [fieldDocCopy, messages.pages.basicDemo.navbarParamPurpose]);

  const popupParamEncodingHint = locale === LANG_EN
    ? 'If you manually build URL strings, encode parameter values with encodeURIComponent.'
    : '若手动拼接 URL，请对参数值使用 encodeURIComponent 编码。';

  const popupParamNeedsEncoding = (key: string) => key === 'backgroundColor' || key === 'textColor';

  const withEncodingHint = (key: string, purpose: string) => (
    popupParamNeedsEncoding(key) ? `${purpose} ${popupParamEncodingHint}` : purpose
  );

  const popupUrlParams = useMemo(() => {
    const urlParamMap = new Map(rawPopupUrlParams);
    const rows = rawPopupUrlParams.map(([key, value]) => ({
      key,
      value,
      purpose: withEncodingHint(
        key,
        popupParamPurposeMap[key as keyof typeof popupParamPurposeMap] || localizedCopy.popupParamUnknownPurpose
      ),
    }));
    // navbar 和 loadHistory 始终显示在参数说明表格中
    for (const k of ['navbar', 'loadHistory'] as const) {
      if (!urlParamMap.has(k)) {
        rows.push({ key: k, value: '-', purpose: withEncodingHint(k, popupParamPurposeMap[k]) });
      }
    }
    return rows;
  }, [localizedCopy.popupParamUnknownPurpose, popupParamEncodingHint, popupParamPurposeMap, rawPopupUrlParams]);

  const configDocSections = useMemo(
    () => buildConfigDocSections(configGuideCopy, fieldDocCopy),
    [configGuideCopy, fieldDocCopy]
  );

  return (
    <PageContainer>
      <BasicDemoControlsCard
        title={messages.pages.basicDemo.title}
        intro={messages.pages.basicDemo.intro}
        docLinks={docLinks}
        quickActions={quickActions}
        togglePlacementLabel={messages.common.buttons.togglePlacement}
        placementLabel={placementLabel}
        themeButtonLabel={messages.pages.basicDemo.themeButtonLabel}
        themeColorLabel={themeColorLabel}
        themeTextButtonLabel={messages.pages.basicDemo.themeTextButtonLabel}
        themeTextColorLabel={themeTextColorLabel}
        themeLabel={messages.common.themeLabel}
        themeModeLabel={themeModeLabel}
        navColorPresets={navColorPresets}
        navTextColorPresets={navTextColorPresets}
        themeModeMenuItems={themeModeMenuItems}
        entryMenuItems={entryMenuItems}
        selectedThemeModeKeys={[themePreference]}
        selectedEntryActions={selectedEntryActions}
        isMultiBubbleDemo={isMultiBubbleDemo}
        locale={locale}
        localeValueHint={localeValueHint}
        lastActionApiHint={lastActionApiHint}
        apiHintPrefix={messages.common.apiHintPrefix}
        loadHistoryApiHintPrefix={messages.pages.basicDemo.loadHistoryApiHintPrefix}
        navbarHidden={navbarHidden}
        navbarLabel={messages.pages.basicDemo.navbarLabel}
        navbarHiddenLabel={messages.pages.basicDemo.navbarHidden}
        navbarShownLabel={messages.pages.basicDemo.navbarShown}
        loadHistoryEnabled={loadHistoryEnabled}
        loadHistoryLabel={messages.pages.basicDemo.loadHistoryLabel}
        loadHistoryEnabledLabel={messages.pages.basicDemo.loadHistoryEnabled}
        loadHistoryDisabledLabel={messages.pages.basicDemo.loadHistoryDisabled}
        localizedCopy={localizedCopy}
        chatConfigHint={chatConfigHint}
        qrCodeImageUrl={qrCodeImageUrl}
        chatPageUrl={chatPageUrl}
        popupUrlParams={popupUrlParams}
        requiredPopupParams={requiredPopupParams}
        requiredLabel={requiredLabel}
        optionalLabel={optionalLabel}
        codeBlockStyle={codeBlockStyle}
        navButtonColor={config.theme?.backgroundColor || ''}
        navButtonTextColor={config.theme?.textColor || '#ffffff'}
        fallbackPrimaryColor={token.colorPrimary}
        copyLabel={messages.common.buttons.copy}
        onPlacementToggle={handlePlacementToggle}
        onNavColorChange={handleNavColorSwitch}
        onNavTextColorChange={handleNavTextColorSwitch}
        onThemeModeClick={({ key }) => handleThemeModeSwitch(String(key) as 'light' | 'dark' | 'system')}
        onEntrySelect={({ selectedKeys }) => handleEntryActionsChange(selectedKeys as string[])}
        onEntryDeselect={({ selectedKeys }) => handleEntryActionsChange(selectedKeys as string[])}
        onNavbarToggle={handleToggleNavbar}
        onLoadHistoryToggle={handleToggleLoadHistory}
        onMultiBubbleToggle={handleToggleMultiBubbleDemo}
        onBubbleSwitchModeToggle={handleToggleBubbleSwitchMode}
        onLocaleSwitch={handleLocaleSwitch}
        onQrCodeImageUrlChange={handleQrCodeImageUrlChange}
      />

      <BasicDemoConfigDocsCard
        minimalConfigTitle={configGuideCopy.minimalConfigTitle}
        minimalConfigDescription={configGuideCopy.minimalConfigDescription}
        recommendedConfigTitle={configGuideCopy.recommendedConfigTitle}
        recommendedConfigDescription={configGuideCopy.recommendedConfigDescription}
        configExampleTitle={configGuideCopy.configExampleTitle}
        configExampleDescription={configGuideCopy.configExampleDescription}
        configGuideTitle={configGuideCopy.configGuideTitle}
        configGuideDescription={configGuideCopy.configGuideDescription}
        minimalConfigExample={minimalConfigExample}
        recommendedConfigExample={recommendedConfigExample}
        fullConfigExample={fullConfigExample}
        configDocSections={configDocSections}
        copyLabel={messages.pages.basicDemo.copyConfig}
        codeBlockStyle={codeBlockStyle}
      />

      <BytedeskReact
        {...config}
        onInit={handleInit}
      />

      <InstallGuide locale={locale} showFeedback={false} />
      <FloatButton.BackTop style={{ marginRight: 200, marginBottom: -30 }}/>
    </PageContainer>
  );
};

export default BasicDemo;
