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
import { demoApiUrl, getDemoHtmlBaseUrl } from '../utils/env';
import {
  LANG_EN,
  TEXT_COLORS,
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
  const chatHtmlBaseUrl = getDemoHtmlBaseUrl(9006);
  const webrtcHtmlBaseUrl = getDemoHtmlBaseUrl(9018);
  const callHtmlBaseUrl = getDemoHtmlBaseUrl(9022);
  const [lastActionApiHint, setLastActionApiHint] = useState<string>('');
  const [isMultiBubbleDemo, setIsMultiBubbleDemo] = useState<boolean>(true);
  const [bubbleSwitchMode, setBubbleSwitchMode] = useState<'fade' | 'slide-up' | 'ticker'>('fade');
  const [selectedEntryActions, setSelectedEntryActions] = useState<EntryAction[]>(['chat']);
  const [areEntryButtonsVisible, setAreEntryButtonsVisible] = useState<boolean>(true);
  const [qrCodeImageUrl, setQrCodeImageUrl] = useState<string>('https://www.weiyuai.cn/assets/images/qrcode/wechat.png');
  const [isInviteDialogVisible, setIsInviteDialogVisible] = useState<boolean>(false);
  const [isCustomTitleEnabled, setIsCustomTitleEnabled] = useState<boolean>(false);
  const [isBrowseInfoEnabled, setIsBrowseInfoEnabled] = useState<boolean>(false);

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
        show: areEntryButtonsVisible,
        icon: '💬',
        text: shouldShowEntryText ? localizedCopy.entryChatLabel : undefined,
        action: 'chat',
        width: 54,
        height: 54,
        onClick: () => (window as any).bytedesk?.showChat({ htmlUrl: chatHtmlBaseUrl })
      },
      thread: {
        show: areEntryButtonsVisible,
        icon: '🧵',
        text: shouldShowEntryText ? localizedCopy.entryThreadLabel : undefined,
        action: 'thread',
        width: 54,
        height: 54,
        onClick: () => (window as any).bytedesk?.showThread({ htmlUrl: chatHtmlBaseUrl })
      },
      webrtc: {
        show: areEntryButtonsVisible,
        icon: '📹',
        text: shouldShowEntryText ? localizedCopy.entryWebrtcLabel : undefined,
        action: 'webrtc',
        width: 54,
        height: 54,
        onClick: () => (window as any).bytedesk?.showWebrtc({ htmlUrl: webrtcHtmlBaseUrl })
      },
      call: {
        show: areEntryButtonsVisible,
        icon: '📞',
        text: shouldShowEntryText ? localizedCopy.entryCallLabel : undefined,
        action: 'call',
        width: 54,
        height: 54,
        onClick: () => (window as any).bytedesk?.showCall({ htmlUrl: callHtmlBaseUrl })
      },
      qrcode: {
        show: areEntryButtonsVisible,
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
  }, [areEntryButtonsVisible, callHtmlBaseUrl, chatHtmlBaseUrl, localizedCopy, qrCodeImageUrl, selectedEntryActions, webrtcHtmlBaseUrl]);

  const [config, setConfig] = useState<BytedeskConfig>(() => ({
    isDebug: false,
    ...(demoApiUrl
      ? {
        htmlUrl: chatHtmlBaseUrl,
        apiUrl: demoApiUrl
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
      title: messages.pages.basicDemo.title,
      ...selectedChatProfile.chatConfig
    },
    browseConfig: {
      referer: document.referrer,
      url: window.location.href,
      title: document.title,
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
        title: messages.pages.basicDemo.title,
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

  const handleToggleCustomTitle = () => {
    setIsCustomTitleEnabled((prev) => {
      const next = !prev;
      setLastActionApiHint(`chatUrl${next ? ' + title' : ' - title'}`);
      return next;
    });
  };

  const handleToggleBrowseInfo = () => {
    setIsBrowseInfoEnabled((prev) => {
      const next = !prev;
      setLastActionApiHint(`chatUrl${next ? ' + browse' : ' - browse'}`);
      return next;
    });
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

  const handleToggleButtonVisibility = () => {
    const nextVisible = !areEntryButtonsVisible;
    setAreEntryButtonsVisible(nextVisible);
    setConfig((prevConfig: BytedeskConfig) => ({
      ...prevConfig,
      buttonConfig: {
        ...(prevConfig.buttonConfig || {}),
        show: nextVisible
      },
      buttonsConfig: (prevConfig.buttonsConfig || []).map((buttonConfig) => ({
        ...buttonConfig,
        show: nextVisible
      }))
    }));
    setLastActionApiHint(`setConfig({ buttonConfig: { show: ${nextVisible} }, buttonsConfig: [{ show: ${nextVisible} }] })`);
  };

  const handleToggleBubbleVisibility = () => {
    const nextVisible = config.bubbleConfig?.show === false;
    if (nextVisible) {
      getBytedeskRuntime()?.showBubble?.();
      setLastActionApiHint('bytedesk.showBubble()');
    } else {
      getBytedeskRuntime()?.hideBubble?.();
      setLastActionApiHint('bytedesk.hideBubble()');
    }
    setConfig((prevConfig: BytedeskConfig) => ({
      ...prevConfig,
      bubbleConfig: {
        ...(prevConfig.bubbleConfig || {}),
        show: nextVisible
      }
    }));
  };

  const handleToggleInviteVisibility = () => {
    const nextVisible = !isInviteDialogVisible;
    if (nextVisible) {
      getBytedeskRuntime()?.showInviteDialog?.();
      setLastActionApiHint('bytedesk.showInviteDialog()');
    } else {
      getBytedeskRuntime()?.hideInviteDialog?.();
      setLastActionApiHint('bytedesk.hideInviteDialog()');
    }
    setIsInviteDialogVisible(nextVisible);
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
    const browsePayload = {
      referer: String(config.browseConfig?.referer || config.browseConfig?.referrer || document.referrer || ''),
      title: String(config.browseConfig?.title || document.title || ''),
      url: String(config.browseConfig?.url || window.location.href || ''),
    };
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
    if (isCustomTitleEnabled && currentChatConfig.title) {
      params.append('title', String(currentChatConfig.title));
    }
    if (isBrowseInfoEnabled && (browsePayload.referer || browsePayload.title || browsePayload.url)) {
      params.append('browse', JSON.stringify(browsePayload));
    }
    return `${chatHtmlBaseUrl}/chat?${params.toString()}`;
  })();

  const quickActions = [
    {
      key: 'openChat',
      label: consultButtonLabel,
      handler: () => {
        const chatConfigWithTheme = {
          ...(config.chatConfig || {}),
          mode: config.theme?.mode || themeMode || 'light',
          themeMode: themePreference
        };
        (window as any).bytedesk?.showChat({
          htmlUrl: config.htmlUrl || chatHtmlBaseUrl,
          chatConfig: chatConfigWithTheme as any
        });
        setLastActionApiHint(`bytedesk.showChat({ htmlUrl: "${config.htmlUrl || chatHtmlBaseUrl}", chatConfig: { ${chatConfigHint}, mode: "${config.theme?.mode || themeMode || 'light'}", themeMode: "${themePreference}" } })`);
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
      key: 'toggleButtonVisibility',
      label: `${messages.common.buttons.showButton}: ${areEntryButtonsVisible ? messages.pages.basicDemo.navbarHidden : messages.pages.basicDemo.navbarShown}`,
      type: areEntryButtonsVisible ? 'primary' as const : 'default' as const,
      handler: handleToggleButtonVisibility
    },
    {
      key: 'toggleBubbleVisibility',
      label: `${messages.common.buttons.showBubble}: ${config.bubbleConfig?.show === false ? messages.pages.basicDemo.navbarShown : messages.pages.basicDemo.navbarHidden}`,
      type: config.bubbleConfig?.show === false ? 'default' as const : 'primary' as const,
      handler: handleToggleBubbleVisibility
    },
    {
      key: 'toggleInviteVisibility',
      label: `${messages.common.buttons.showInvite}: ${isInviteDialogVisible ? messages.pages.basicDemo.navbarHidden : messages.pages.basicDemo.navbarShown}`,
      type: isInviteDialogVisible ? 'primary' as const : 'default' as const,
      handler: handleToggleInviteVisibility
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

  const fieldDocCopy = useMemo(() => ({ fields: messages.pages.basicDemo.fieldDocs }), [messages.pages.basicDemo.fieldDocs]);

  const popupParamPurposeMap = useMemo(() => ({
    org: fieldDocCopy.fields['chat.org'],
    t: fieldDocCopy.fields['chat.t'],
    sid: fieldDocCopy.fields['chat.sid'],
    title: '自定义当前聊天页面浏览器 tab 标题',
    browse: `${fieldDocCopy.fields['browse.url'] || '来源页面 URL'} / ${fieldDocCopy.fields['browse.title'] || '来源页面标题'}`,
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

  const popupParamNeedsEncoding = (key: string) => key === 'backgroundColor' || key === 'textColor' || key === 'browse' || key === 'title';

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
    for (const k of ['title', 'browse', 'navbar', 'loadHistory'] as const) {
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
        customTitleEnabled={isCustomTitleEnabled}
        carryBrowseInfoEnabled={isBrowseInfoEnabled}
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
        onCustomTitleToggle={handleToggleCustomTitle}
        onCarryBrowseInfoToggle={handleToggleBrowseInfo}
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
