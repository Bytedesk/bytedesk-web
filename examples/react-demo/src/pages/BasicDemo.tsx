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
import type { BytedeskConfig, Theme } from '@bytedesk/web/types';
import type { MenuProps } from 'antd';
import PageContainer from '../components/PageContainer';
import { getLocaleMessages, type DemoLanguage } from '../locales';
import { formatChatConfigQuery, getConsultButtonLabel, type DemoChatProfile } from '../types/chat-profile';
import type { DemoUserProfile } from '../types/demo-user';
import { Card, FloatButton, Input, Modal, Space, Table, Tag, Typography, theme } from 'antd';
import BasicDemoControlsCard from './basic-demo/BasicDemoControlsCard';
import {
  type BubbleSwitchMode,
  // getExampleCopy,
  getLocaleValueHint,
  getLocalizedCopy,
} from './basic-demo/copy';
import {
  buildRuntimeEmbedCodeExample,
  buildVanillaJsEmbedCodeExample,
} from './basic-demo/examples';
import { demoApiUrl, getDemoHtmlBaseUrl } from '../utils/env';
import { buildUrlParamRowsWithEncodeHint } from '../utils/url-param-guide';
import {
  TEXT_COLORS,
  THEME_COLORS,
  type EntryAction,
} from './basic-demo/constants';
import {
  buildBasicDemoPreviewStorageKey,
  isValidPreviewTargetUrl,
  type BasicDemoPreviewPayload,
} from '../utils/basic-demo-preview';

interface BasicDemoProps {
  locale: DemoLanguage;
  themeMode: Theme['mode'];
  themePreference: 'light' | 'dark' | 'system';
  selectedChatProfile: DemoChatProfile;
  selectedUser: DemoUserProfile;
  isAnonymousMode: boolean;
  isInlineDemoVisible: boolean;
  onInlineDemoVisibilityChange: (visible: boolean) => void;
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
  destroy?: () => void;
};

type EntryButtonIconKey = 'default' | 'message' | 'robot' | 'headset' | 'sparkles' | 'bell';
type RenderMode = 'floating' | 'inline';

const ENTRY_BUTTON_ICON_MAP: Record<EntryButtonIconKey, string> = {
  default: '',
  message: '💬',
  robot: '🤖',
  headset: '🎧',
  sparkles: '✨',
  bell: '🛎️'
};

const ENTRY_BUTTON_ICON_OPTIONS: Array<{ key: EntryButtonIconKey; icon: string }> = [
  { key: 'default', icon: '' },
  { key: 'message', icon: ENTRY_BUTTON_ICON_MAP.message },
  { key: 'robot', icon: ENTRY_BUTTON_ICON_MAP.robot },
  { key: 'headset', icon: ENTRY_BUTTON_ICON_MAP.headset },
  { key: 'sparkles', icon: ENTRY_BUTTON_ICON_MAP.sparkles },
  { key: 'bell', icon: ENTRY_BUTTON_ICON_MAP.bell }
];

const getBytedeskRuntime = (): BytedeskRuntimeApi | null => {
  return ((window as any).bytedesk || null) as BytedeskRuntimeApi | null;
};

const buildEntryButtonIconConfig = (icon: string | null) => {
  return icon ? { icon } : {};
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

type BubbleSwitchModeSelection = BubbleSwitchMode | 'default';

const DEFAULT_BUBBLE_SWITCH_MODE: BubbleSwitchModeSelection = 'default';
const DEFAULT_BUBBLE_ROTATE_INTERVAL = 3000;
const DEFAULT_ENTRY_BUTTON_TEXT = '在线客服';
const DEFAULT_MINIMIZED_BAR_TEXT = '';
const DEFAULT_PREVIEW_TARGET_URL = 'https://';

const getPreviewRouteUrl = () => {
  const normalizedBaseUrl = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');
  return new URL(`${normalizedBaseUrl}/preview/basic`, window.location.origin);
};

const sanitizePreviewSdkConfig = (config: BytedeskConfig): Partial<BytedeskConfig> => {
  return {
    ...config,
    buttonConfig: config.buttonConfig ? { ...config.buttonConfig } : undefined,
    buttonsConfig: config.buttonsConfig?.map((buttonConfig) => ({
      ...buttonConfig,
      onClick: undefined,
    })),
    bubbleConfig: config.bubbleConfig ? { ...config.bubbleConfig } : undefined,
    chatConfig: config.chatConfig ? { ...config.chatConfig } : undefined,
    browseConfig: config.browseConfig ? { ...config.browseConfig } : undefined,
    inviteConfig: config.inviteConfig ? { ...config.inviteConfig } : undefined,
    minimizedBarConfig: config.minimizedBarConfig ? { ...config.minimizedBarConfig } : undefined,
    onVisitorInfo: undefined,
  };
};

const BasicDemo = ({
  locale,
  themeMode,
  themePreference,
  selectedChatProfile,
  selectedUser,
  isAnonymousMode,
  isInlineDemoVisible,
  onInlineDemoVisibilityChange,
  onLocaleChange,
  onThemePreferenceChange
}: BasicDemoProps) => {
  const messages = useMemo(() => getLocaleMessages(locale), [locale]);
  const { token } = theme.useToken();
  const chatHtmlBaseUrl = getDemoHtmlBaseUrl(9006);
  const webrtcHtmlBaseUrl = getDemoHtmlBaseUrl(9018);
  const callHtmlBaseUrl = getDemoHtmlBaseUrl(9022);
  const [lastActionApiHint, setLastActionApiHint] = useState<string>('');
  const [selectedEntryActions, setSelectedEntryActions] = useState<EntryAction[]>(['chat']);
  const [selectedEntryButtonIconKey, setSelectedEntryButtonIconKey] = useState<EntryButtonIconKey>('default');
  const [isEntryButtonTextEnabled, setIsEntryButtonTextEnabled] = useState<boolean>(true);
  const [entryButtonTextOverride, setEntryButtonTextOverride] = useState<string>(DEFAULT_ENTRY_BUTTON_TEXT);
  const [areEntryButtonsVisible, setAreEntryButtonsVisible] = useState<boolean>(true);
  const [qrCodeImageUrl, setQrCodeImageUrl] = useState<string>('https://www.weiyuai.cn/assets/images/qrcode/wechat.png');
  const [isInviteDialogVisible, setIsInviteDialogVisible] = useState<boolean>(false);
  const [isCustomTitleEnabled, setIsCustomTitleEnabled] = useState<boolean>(false);
  const [isBrowseInfoEnabled, setIsBrowseInfoEnabled] = useState<boolean>(false);
  const [isQrCodeParamEnabled, setIsQrCodeParamEnabled] = useState<boolean>(true);
  const [isThreadDetailParamEnabled, setIsThreadDetailParamEnabled] = useState<boolean>(false);
  const [isVisitorProfileParamEnabled, setIsVisitorProfileParamEnabled] = useState<boolean>(false);
  const [selectedBubbleSwitchMode, setSelectedBubbleSwitchMode] = useState<BubbleSwitchModeSelection>(DEFAULT_BUBBLE_SWITCH_MODE);
  const [minimizedBarTextOverride, setMinimizedBarTextOverride] = useState<string>(DEFAULT_MINIMIZED_BAR_TEXT);
  const [draggableEnabled, setDraggableEnabled] = useState<boolean>(true);
  const [isSitePreviewModalOpen, setIsSitePreviewModalOpen] = useState<boolean>(false);
  const [sitePreviewTargetUrl, setSitePreviewTargetUrl] = useState<string>(DEFAULT_PREVIEW_TARGET_URL);
  const [sitePreviewValidationMessage, setSitePreviewValidationMessage] = useState<string>('');
  const renderMode: RenderMode = isInlineDemoVisible ? 'inline' : 'floating';

  const localeValueHint = getLocaleValueHint(locale);
  const localizedCopy = useMemo(
    () => getLocalizedCopy(locale, true, selectedBubbleSwitchMode === 'default' ? 'fade' : selectedBubbleSwitchMode),
    [locale, selectedBubbleSwitchMode]
  );
  const bubbleMessages = useMemo(() => ([
    {
      icon: '🤖',
      title: localizedCopy.bubbleAgentTitle,
      subtitle: localizedCopy.bubbleAgentSubtitle,
    },
    {
      icon: '📹',
      title: localizedCopy.bubbleWebrtcTitle,
      subtitle: localizedCopy.bubbleWebrtcSubtitle,
    },
  ]), [localizedCopy]);
  const selectedEntryButtonIcon = selectedEntryButtonIconKey === 'default'
    ? null
    : ENTRY_BUTTON_ICON_MAP[selectedEntryButtonIconKey];
  const selectedEntryButtonIconLabel = selectedEntryButtonIconKey === 'default'
    ? localizedCopy.entryDefaultIconLabel
    : ENTRY_BUTTON_ICON_MAP[selectedEntryButtonIconKey];

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

  const entryIconMenuItems: MenuProps['items'] = useMemo(
    () => ENTRY_BUTTON_ICON_OPTIONS.map((item) => ({
      key: item.key,
      label: item.key === 'default' ? localizedCopy.entryDefaultIconLabel : item.icon,
    })),
    [localizedCopy.entryDefaultIconLabel]
  );

  const effectiveEntryButtonText = entryButtonTextOverride.trim() || DEFAULT_ENTRY_BUTTON_TEXT;

  const getEntryButtonLabel = (_action: EntryAction): string | undefined => {
    // console.log('getEntryButtonLabel', { action, isEntryButtonTextEnabled, effectiveEntryButtonText });
    if (!isEntryButtonTextEnabled) {
      return undefined;
    }

    return effectiveEntryButtonText;
  };

  const multiSessionButtons = useMemo<NonNullable<BytedeskConfig['buttonsConfig']>>(() => {
    const allButtons: Record<EntryAction, NonNullable<BytedeskConfig['buttonsConfig']>[number]> = {
      chat: {
        show: areEntryButtonsVisible,
        ...buildEntryButtonIconConfig(selectedEntryButtonIcon),
        text: getEntryButtonLabel('chat'),
        action: 'chat',
        width: 54,
        height: 54,
        onClick: () => (window as any).bytedesk?.showChat({ htmlUrl: chatHtmlBaseUrl })
      },
      thread: {
        show: areEntryButtonsVisible,
        ...buildEntryButtonIconConfig(selectedEntryButtonIcon),
        text: getEntryButtonLabel('thread'),
        action: 'thread',
        width: 54,
        height: 54,
        onClick: () => (window as any).bytedesk?.showThread({ htmlUrl: chatHtmlBaseUrl })
      },
      webrtc: {
        show: areEntryButtonsVisible,
        ...buildEntryButtonIconConfig(selectedEntryButtonIcon),
        text: getEntryButtonLabel('webrtc'),
        action: 'webrtc',
        width: 54,
        height: 54,
        onClick: () => (window as any).bytedesk?.showWebrtc({ htmlUrl: webrtcHtmlBaseUrl })
      },
      call: {
        show: areEntryButtonsVisible,
        ...buildEntryButtonIconConfig(selectedEntryButtonIcon),
        text: getEntryButtonLabel('call'),
        action: 'call',
        width: 54,
        height: 54,
        onClick: () => (window as any).bytedesk?.showCall({ htmlUrl: callHtmlBaseUrl })
      },
      qrcode: {
        show: areEntryButtonsVisible,
        ...buildEntryButtonIconConfig(selectedEntryButtonIcon),
        text: getEntryButtonLabel('qrcode'),
        width: 54,
        height: 54,
        previewImageUrl: qrCodeImageUrl,
        previewImageAlt: localizedCopy.entryQrLabel,
        onClick: () => undefined,
      }
    };

    return selectedEntryActions.map((action) => allButtons[action]);
  }, [areEntryButtonsVisible, callHtmlBaseUrl, chatHtmlBaseUrl, effectiveEntryButtonText, isEntryButtonTextEnabled, localizedCopy.entryQrLabel, qrCodeImageUrl, selectedEntryActions, selectedEntryButtonIcon, webrtcHtmlBaseUrl]);

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
    draggable: draggableEnabled,
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
      messages: bubbleMessages,
      autoRotate: false,
    },
    buttonConfig: {
      show: true,
      width: 60,
      height: 60
    },
    buttonsConfig: multiSessionButtons,
    chatConfig: {
      qrcode: '1',
      ...selectedChatProfile.chatConfig,
      // 传入用户信息
      ...(isAnonymousMode
        ? {}
        : {
            visitorUid: selectedUser.visitorUid,
            nickname: selectedUser.nickname,
            avatar: selectedUser.avatar,
            mobile: '13800138000',
            email: 'test@test.com',
            note: 'test'
          }),
      // 自定义字段
      extra: JSON.stringify({ type: 'type', test: 'test' }),
    },
    browseConfig: {
      referer: '',
      url: '',
      title: '',
    },
    theme: {
      mode: themeMode || 'light',
      textColor: '#ffffff',
      backgroundColor: THEME_COLORS[0]
    },
    minimizedBarConfig: {
      text: undefined,
    },
    locale,
    onHideChat: undefined,
    onVisitorInfo: (uid: string, visitorUid: string) => {
      console.log('BasicDemo 收到访客信息:', { uid, visitorUid });
    }
  }));

  useEffect(() => {
    setConfig((prevConfig: BytedeskConfig) => ({
      ...prevConfig,
      mode: renderMode,
      inlineConfig: renderMode === 'inline'
        ? { autoShow: true, mode: 'fixed-right', width: 420 }
        : undefined,
      locale,
      theme: {
        ...prevConfig.theme,
        mode: themeMode || prevConfig.theme?.mode
      },
      bubbleConfig: {
        ...prevConfig.bubbleConfig,
        messages: bubbleMessages,
        autoRotate: selectedBubbleSwitchMode === 'default' ? false : true,
        rotateInterval: selectedBubbleSwitchMode === 'default'
          ? prevConfig.bubbleConfig?.rotateInterval
          : (prevConfig.bubbleConfig?.rotateInterval ?? DEFAULT_BUBBLE_ROTATE_INTERVAL),
        switchMode: selectedBubbleSwitchMode === 'default'
          ? undefined
          : (prevConfig.bubbleConfig?.switchMode || selectedBubbleSwitchMode),
        title: messages.pages.basicDemo.bubbleTitle,
        subtitle: messages.pages.basicDemo.bubbleSubtitle
      },
      chatConfig: {
        ...(prevConfig.chatConfig || {}),
        ...selectedChatProfile.chatConfig,
        // 传入用户信息
        ...(isAnonymousMode
          ? { visitorUid: undefined, nickname: undefined, avatar: undefined }
          : {
              visitorUid: selectedUser.visitorUid,
              nickname: selectedUser.nickname,
              avatar: selectedUser.avatar,
              mobile: '13800138000',
              email: 'test@test.com',
              note: 'test'
            }),
        ...(isCustomTitleEnabled ? { title: messages.pages.basicDemo.title } : { title: undefined }),
        qrcode: isQrCodeParamEnabled ? '1' : '0',
        threadDetail: isThreadDetailParamEnabled ? '1' : '0',
        visitorProfile: isVisitorProfileParamEnabled ? '1' : '0'
      },
      browseConfig: isBrowseInfoEnabled
        ? {
          referer: document.referrer,
          url: window.location.href,
          title: document.title,
        }
        : {
          referer: '',
          url: '',
          title: '',
        },
      minimizedBarConfig: {
        text: minimizedBarTextOverride.trim() || undefined,
      },
      draggable: draggableEnabled,
      onHideChat: renderMode === 'inline'
        ? () => {
            onInlineDemoVisibilityChange(false);
          }
        : undefined,
      buttonsConfig: multiSessionButtons
    }));
  }, [locale, multiSessionButtons, themeMode, messages, selectedChatProfile, selectedUser, isAnonymousMode, isQrCodeParamEnabled, isThreadDetailParamEnabled, isVisitorProfileParamEnabled, isCustomTitleEnabled, isBrowseInfoEnabled, bubbleMessages, selectedBubbleSwitchMode, minimizedBarTextOverride, draggableEnabled, renderMode, onInlineDemoVisibilityChange]);

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

  const handleToggleQrCodeParam = () => {
    setIsQrCodeParamEnabled((prevEnabled) => {
      const nextEnabled = !prevEnabled;
      setConfig((prevConfig: BytedeskConfig) => ({
        ...prevConfig,
        chatConfig: {
          ...(prevConfig.chatConfig || selectedChatProfile.chatConfig),
          qrcode: nextEnabled ? '1' : '0'
        }
      }));
      setLastActionApiHint(`setConfig({ chatConfig: { qrcode: "${nextEnabled ? '1' : '0'}" } })`);
      return nextEnabled;
    });
  };

  const handleToggleThreadDetailParam = () => {
    setIsThreadDetailParamEnabled((prevEnabled) => {
      const nextEnabled = !prevEnabled;
      setConfig((prevConfig: BytedeskConfig) => ({
        ...prevConfig,
        chatConfig: {
          ...(prevConfig.chatConfig || selectedChatProfile.chatConfig),
          threadDetail: nextEnabled ? '1' : '0'
        }
      }));
      setLastActionApiHint(`setConfig({ chatConfig: { threadDetail: "${nextEnabled ? '1' : '0'}" } })`);
      return nextEnabled;
    });
  };

  const handleToggleVisitorProfileParam = () => {
    setIsVisitorProfileParamEnabled((prevEnabled) => {
      const nextEnabled = !prevEnabled;
      setConfig((prevConfig: BytedeskConfig) => ({
        ...prevConfig,
        chatConfig: {
          ...(prevConfig.chatConfig || selectedChatProfile.chatConfig),
          visitorProfile: nextEnabled ? '1' : '0'
        }
      }));
      setLastActionApiHint(`setConfig({ chatConfig: { visitorProfile: "${nextEnabled ? '1' : '0'}" } })`);
      return nextEnabled;
    });
  };

  const handleToggleCustomTitle = () => {
    setIsCustomTitleEnabled((prev) => {
      const next = !prev;
      setConfig((prevConfig: BytedeskConfig) => ({
        ...prevConfig,
        chatConfig: {
          ...(prevConfig.chatConfig || selectedChatProfile.chatConfig),
          title: next ? messages.pages.basicDemo.title : undefined,
        },
      }));
      setLastActionApiHint(`chatUrl${next ? ' + title' : ' - title'}`);
      return next;
    });
  };

  const handleToggleBrowseInfo = () => {
    setIsBrowseInfoEnabled((prev) => {
      const next = !prev;
      setConfig((prevConfig: BytedeskConfig) => ({
        ...prevConfig,
        browseConfig: next
          ? {
            referer: document.referrer,
            url: window.location.href,
            title: document.title,
          }
          : {
            referer: '',
            url: '',
            title: '',
          },
      }));
      setLastActionApiHint(`chatUrl${next ? ' + browse' : ' - browse'}`);
      return next;
    });
  };

  const handleToggleDraggable = () => {
    const nextDraggable = !draggableEnabled;
    setDraggableEnabled(nextDraggable);
    getBytedeskRuntime()?.setConfig?.({ draggable: nextDraggable });
    setLastActionApiHint(`setConfig({ draggable: ${nextDraggable} })`);
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

  const handleRenderModeChange = (nextMode: RenderMode) => {
    if (nextMode === renderMode) {
      return;
    }

    getBytedeskRuntime()?.destroy?.();
    setIsInviteDialogVisible(false);
    onInlineDemoVisibilityChange(nextMode === 'inline');
    setLastActionApiHint(`bytedesk.destroy() + <BytedeskReact mode="${nextMode}" />`);
  };

  const handleShowInlineDemo = () => {
    handleRenderModeChange('inline');
  };

  const handleBubbleSwitchModeChange = (nextMode: BubbleSwitchModeSelection) => {
    setSelectedBubbleSwitchMode(nextMode);
    getBytedeskRuntime()?.setConfig?.({
      bubbleConfig: {
        messages: bubbleMessages,
        autoRotate: nextMode === 'default' ? false : true,
        rotateInterval: nextMode === 'default' ? undefined : DEFAULT_BUBBLE_ROTATE_INTERVAL,
        switchMode: nextMode === 'default' ? undefined : nextMode,
      },
    });
    setConfig((prevConfig: BytedeskConfig) => ({
      ...prevConfig,
      bubbleConfig: {
        ...(prevConfig.bubbleConfig || {}),
        messages: bubbleMessages,
        autoRotate: nextMode === 'default' ? false : true,
        rotateInterval: nextMode === 'default' ? undefined : DEFAULT_BUBBLE_ROTATE_INTERVAL,
        switchMode: nextMode === 'default' ? undefined : nextMode,
      },
    }));
    setLastActionApiHint(
      nextMode === 'default'
        ? 'setConfig({ bubbleConfig: { autoRotate: false } })'
        : `setConfig({ bubbleConfig: { switchMode: "${nextMode}" } })`
    );
  };

  const handleEntryActionsChange = (nextSelectedKeys: string[]) => {
    const nextActions = nextSelectedKeys as EntryAction[];
    const safeActions: EntryAction[] = nextActions.length > 0 ? nextActions : ['chat'];
    setSelectedEntryActions(safeActions);
    setLastActionApiHint(`setConfig({ buttonsConfig: [${safeActions.map((action) => `"${action}"`).join(', ')}] })`);
  };

  const handleEntryButtonIconSwitch = ({ key }: { key: string }) => {
    const nextIconKey = String(key) as EntryButtonIconKey;
    const nextIcon = ENTRY_BUTTON_ICON_MAP[nextIconKey];
    setSelectedEntryButtonIconKey(nextIconKey);
    setLastActionApiHint(
      nextIconKey === 'default'
        ? 'setConfig({ buttonsConfig: [{ /* omit icon to use BytedeskWeb default icon */ }] })'
        : `setConfig({ buttonsConfig: [{ icon: "${nextIcon}" }] })`
    );
  };

  const handleToggleEntryButtonText = () => {
    setIsEntryButtonTextEnabled((prevEnabled) => {
      const nextEnabled = !prevEnabled;
      setLastActionApiHint(
        nextEnabled
          ? `setConfig({ buttonsConfig: [{ text: "${effectiveEntryButtonText}" }] })`
          : 'setConfig({ buttonsConfig: [{ text: undefined }] })'
      );
      return nextEnabled;
    });
  };

  const handleEntryButtonTextChange = (nextText: string) => {
    setEntryButtonTextOverride(nextText);
    const nextDisplayText = nextText.trim() || DEFAULT_ENTRY_BUTTON_TEXT;
    setLastActionApiHint(`setConfig({ buttonsConfig: [{ text: "${nextDisplayText}" }] })`);
  };

  const handleQrCodeImageUrlChange = (nextUrl: string) => {
    setQrCodeImageUrl(nextUrl);
    setLastActionApiHint(`setConfig({ buttonsConfig: [{ previewImageUrl: "${nextUrl}" }] })`);
  };

  const handleMinimizedBarTextChange = (nextText: string) => {
    setMinimizedBarTextOverride(nextText);
    const normalizedText = nextText.trim();
    setConfig((prevConfig: BytedeskConfig) => ({
      ...prevConfig,
      minimizedBarConfig: {
        ...(prevConfig.minimizedBarConfig || {}),
        text: normalizedText || undefined,
      },
    }));
    setLastActionApiHint(
      normalizedText
        ? `setConfig({ minimizedBarConfig: { text: "${normalizedText}" } })`
        : 'setConfig({ minimizedBarConfig: { text: undefined } })'
    );
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
    if (!isAnonymousMode) {
      params.append('visitorUid', selectedUser.visitorUid);
      params.append('nickname', selectedUser.nickname);
      params.append('avatar', selectedUser.avatar);
    }
    if (currentNavbar === '0') {
      params.append('navbar', '0');
    }
    params.append('qrcode', isQrCodeParamEnabled ? '1' : '0');
    if (currentLoadHistory) {
      params.append('history', '1');
    }
    if (isThreadDetailParamEnabled) {
      params.append('threadDetail', '1');
    }
    if (isVisitorProfileParamEnabled) {
      params.append('visitorProfile', '1');
    }
    if (isCustomTitleEnabled && currentChatConfig.title) {
      params.append('title', String(currentChatConfig.title));
    }
    if (isBrowseInfoEnabled && (browsePayload.referer || browsePayload.title || browsePayload.url)) {
      params.append('browse', JSON.stringify(browsePayload));
    }
    return `${chatHtmlBaseUrl}/chat?${params.toString()}`;
  })();

  const sitePreviewCopy = useMemo(() => {
    if (locale === 'en') {
      return {
        buttonLabel: 'Preview on your site',
        modalTitle: 'Preview current embed on your website',
        modalDescription: 'Enter a full website URL. A new tab will open with your site embedded in an iframe and the current embed code shown alongside it.',
        inputPlaceholder: 'https://www.example.com',
        invalidUrlMessage: 'Enter a valid URL starting with http:// or https://',
        popupBlockedMessage: 'The preview tab was blocked by the browser. Allow pop-ups and try again.',
        openFailedMessage: 'Unable to open the preview page. Try again.',
      };
    }

    return {
      buttonLabel: '站点预览演示',
      modalTitle: '在你的网站中预览当前嵌入效果',
      modalDescription: '输入完整网站地址后，会新开一个 Tab，用 iframe 嵌入显示你的网站，并同时展示当前嵌入代码，方便直接预览集成效果。',
      inputPlaceholder: 'https://www.example.com',
      invalidUrlMessage: '请输入以 http:// 或 https:// 开头的有效网址',
      popupBlockedMessage: '浏览器拦截了新标签页，请允许弹窗后重试。',
      openFailedMessage: '打开预览页失败，请稍后重试。',
    };
  }, [locale]);

  const handleOpenSitePreviewModal = () => {
    setSitePreviewValidationMessage('');
    setIsSitePreviewModalOpen(true);
  };

  const handleConfirmSitePreview = () => {
    const normalizedTargetUrl = sitePreviewTargetUrl.trim();

    if (!isValidPreviewTargetUrl(normalizedTargetUrl)) {
      setSitePreviewValidationMessage(sitePreviewCopy.invalidUrlMessage);
      return;
    }

    const previewId = `${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
    const previewPayload: BasicDemoPreviewPayload = {
      targetUrl: normalizedTargetUrl,
      runtimeEmbedCode: runtimeEmbedCodeExample,
      vanillaJsEmbedCode: vanillaJsEmbedCodeExample,
      sdkConfig: sanitizePreviewSdkConfig(config),
      locale,
      createdAt: Date.now(),
    };

    window.sessionStorage.setItem(
      buildBasicDemoPreviewStorageKey(previewId),
      JSON.stringify(previewPayload)
    );

    const previewUrl = getPreviewRouteUrl();
    previewUrl.searchParams.set('previewId', previewId);
    previewUrl.searchParams.set('lang', String(locale));

    const openedWindow = window.open(previewUrl.toString(), '_blank');

    if (!openedWindow) {
      setSitePreviewValidationMessage(sitePreviewCopy.popupBlockedMessage);
      return;
    }

    setIsSitePreviewModalOpen(false);
    setSitePreviewValidationMessage('');
    setLastActionApiHint(`window.open("${previewUrl.toString()}", "_blank")`);
  };

  const quickActions = [
    {
      key: 'openChat',
      label: consultButtonLabel,
      type: 'primary' as const,
      handler: () => {
        if (renderMode === 'inline') {
          getBytedeskRuntime()?.destroy?.();
          setIsInviteDialogVisible(false);
          onInlineDemoVisibilityChange(false);
          setLastActionApiHint('bytedesk.destroy() + bytedesk.showChat()');
          window.setTimeout(() => {
            (window as any).bytedesk?.showChat({
              htmlUrl: config.htmlUrl || chatHtmlBaseUrl,
              chatConfig: {
                ...(config.chatConfig || {}),
                mode: config.theme?.mode || themeMode || 'light',
                themeMode: themePreference,
              } as any,
            });
          }, 0);
          return;
        }

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
      key: 'showInlineDemo',
      label: locale === 'en' ? 'Inline embed demo' : '演示内联嵌入',
      type: renderMode === 'inline' ? 'primary' as const : 'default' as const,
      handler: handleShowInlineDemo,
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
      key: 'openSitePreview',
      label: sitePreviewCopy.buttonLabel,
      handler: handleOpenSitePreviewModal,
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
  const basicDemoMessages = messages.pages.basicDemo;
  const requiredUrlParams = useMemo(() => new Set(['org', 't', 'sid']), []);
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
  const currentUrlParams = useMemo(
    () => new URL(chatPageUrl).searchParams,
    [chatPageUrl]
  );
  const urlParamRows = useMemo(
    () => buildUrlParamRowsWithEncodeHint(
      basicDemoMessages.urlParams,
      currentUrlParams,
      locale,
      ['nickname', 'avatar', 'title', 'browse']
    ),
    [basicDemoMessages.urlParams, currentUrlParams, locale]
  );

  // const exampleCopy = getExampleCopy(locale);

  const runtimeEmbedCodeExample = useMemo(() => buildRuntimeEmbedCodeExample({
    config,
    isAnonymousMode,
    renderMode,
    selectedUser,
    themeMode,
  }), [config, isAnonymousMode, renderMode, selectedUser, themeMode]);

  const vanillaJsEmbedCodeExample = useMemo(() => buildVanillaJsEmbedCodeExample({
    config,
    isAnonymousMode,
    renderMode,
    selectedUser,
    themeMode,
  }), [config, isAnonymousMode, renderMode, selectedUser, themeMode]);

  const visibleQuickActions = renderMode === 'inline'
    ? quickActions.filter((action) => !['toggleButtonVisibility', 'toggleBubbleVisibility', 'toggleInviteVisibility'].includes(action.key))
    : quickActions;

  return (
    <PageContainer>
      <Card>
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          <div>
            <Typography.Title level={2} style={{ marginBottom: 0 }}>{messages.pages.basicDemo.title}</Typography.Title>
            <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
              {messages.pages.basicDemo.intro}
            </Typography.Paragraph>
          </div>
          <Space orientation="vertical" size={4}>
            {docLinks.map((link) => (
              <Typography.Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </Typography.Link>
            ))}
          </Space>
        </Space>
      </Card>

      <BasicDemoControlsCard
        quickActions={visibleQuickActions}
        togglePlacementLabel={messages.common.buttons.togglePlacement}
        placementLabel={placementLabel}
        bubbleSwitchModeLabel={localizedCopy.switchModeLabel}
        selectedBubbleSwitchMode={selectedBubbleSwitchMode}
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
        entryIconMenuItems={entryIconMenuItems}
        selectedThemeModeKeys={[themePreference]}
        selectedEntryActions={selectedEntryActions}
        selectedEntryButtonIconKeys={[selectedEntryButtonIconKey]}
        selectedEntryButtonIconLabel={selectedEntryButtonIconLabel}
        isEntryButtonTextEnabled={isEntryButtonTextEnabled}
        entryButtonTextValue={entryButtonTextOverride}
        minimizedBarTextValue={minimizedBarTextOverride}
        locale={locale}
        localeValueHint={localeValueHint}
        lastActionApiHint={lastActionApiHint}
        apiHintPrefix={messages.common.apiHintPrefix}
        loadHistoryApiHintPrefix={messages.pages.basicDemo.loadHistoryApiHintPrefix}
        navbarHidden={navbarHidden}
        navbarLabel={messages.pages.basicDemo.navbarLabel}
        navbarHiddenLabel={messages.pages.basicDemo.navbarHidden}
        navbarShownLabel={messages.pages.basicDemo.navbarShown}
        qrCodeParamEnabled={isQrCodeParamEnabled}
        qrCodeParamLabel={messages.pages.basicDemo.qrCodeParamLabel}
        threadDetailParamEnabled={isThreadDetailParamEnabled}
        threadDetailParamLabel={messages.pages.basicDemo.threadDetailParamLabel}
        visitorProfileParamEnabled={isVisitorProfileParamEnabled}
        visitorProfileParamLabel={messages.pages.basicDemo.visitorProfileParamLabel}
        loadHistoryEnabled={loadHistoryEnabled}
        loadHistoryLabel={messages.pages.basicDemo.loadHistoryLabel}
        loadHistoryEnabledLabel={messages.pages.basicDemo.loadHistoryEnabled}
        loadHistoryDisabledLabel={messages.pages.basicDemo.loadHistoryDisabled}
        customTitleEnabled={isCustomTitleEnabled}
        carryBrowseInfoEnabled={isBrowseInfoEnabled}
        localizedCopy={localizedCopy}
        chatConfigHint={chatConfigHint}
        qrCodeImageUrl={qrCodeImageUrl}
        navButtonColor={config.theme?.backgroundColor || ''}
        navButtonTextColor={config.theme?.textColor || '#ffffff'}
        fallbackPrimaryColor={token.colorPrimary}
        onPlacementToggle={handlePlacementToggle}
        onBubbleSwitchModeChange={handleBubbleSwitchModeChange}
        onNavColorChange={handleNavColorSwitch}
        onNavTextColorChange={handleNavTextColorSwitch}
        onThemeModeClick={({ key }) => handleThemeModeSwitch(String(key) as 'light' | 'dark' | 'system')}
        onEntrySelect={({ selectedKeys }) => handleEntryActionsChange(selectedKeys as string[])}
        onEntryDeselect={({ selectedKeys }) => handleEntryActionsChange(selectedKeys as string[])}
        onEntryButtonIconClick={handleEntryButtonIconSwitch}
        onEntryButtonTextToggle={handleToggleEntryButtonText}
        onEntryButtonTextChange={handleEntryButtonTextChange}
        onMinimizedBarTextChange={handleMinimizedBarTextChange}
        onNavbarToggle={handleToggleNavbar}
        onQrCodeParamToggle={handleToggleQrCodeParam}
        onThreadDetailParamToggle={handleToggleThreadDetailParam}
        onVisitorProfileParamToggle={handleToggleVisitorProfileParam}
        onLoadHistoryToggle={handleToggleLoadHistory}
        onCustomTitleToggle={handleToggleCustomTitle}
        onCarryBrowseInfoToggle={handleToggleBrowseInfo}
        draggableEnabled={draggableEnabled}
        onDraggableToggle={handleToggleDraggable}
        onLocaleSwitch={handleLocaleSwitch}
        onQrCodeImageUrlChange={handleQrCodeImageUrlChange}
      />

      <Card title={localizedCopy.popupUrlTitle}>
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
            {localizedCopy.popupUrlDescription}
          </Typography.Paragraph>
          <Typography.Paragraph
            copyable={{ text: chatPageUrl }}
            style={{ ...codeBlockStyle, marginBottom: 0 }}
          >
            {chatPageUrl}
          </Typography.Paragraph>
          <Typography.Text strong>{basicDemoMessages.urlParamsTitle}</Typography.Text>
          <Table
            size="small"
            bordered
            pagination={false}
            rowKey="key"
            dataSource={urlParamRows}
            columns={[
              {
                title: messages.pages.userInfoDemo.parameterLabel,
                dataIndex: 'key',
                key: 'key',
                render: (value: string) => (
                  <Space size={6}>
                    <Typography.Text copyable={{ text: value }}>{value}</Typography.Text>
                    <Tag color={requiredUrlParams.has(value) ? 'error' : 'default'}>
                      {requiredUrlParams.has(value)
                        ? messages.pages.userInfoDemo.requiredLabel
                        : messages.pages.userInfoDemo.optionalLabel}
                    </Tag>
                  </Space>
                ),
              },
              {
                title: messages.pages.userInfoDemo.currentValueLabel,
                dataIndex: 'value',
                key: 'value',
                render: (value: string) => {
                  const hasCopyableValue = value.trim() !== '' && value !== '-';

                  return (
                    <Typography.Paragraph
                      copyable={hasCopyableValue ? { text: value } : false}
                      style={{ marginBottom: 0, wordBreak: 'break-all' }}
                    >
                      {value}
                    </Typography.Paragraph>
                  );
                },
              },
              {
                title: messages.pages.userInfoDemo.purposeLabel,
                dataIndex: 'purpose',
                key: 'purpose',
              },
            ]}
          />
          <Typography.Text type="secondary">{basicDemoMessages.manualEncodeHint}</Typography.Text>
        </Space>
      </Card>

      <Card title={localizedCopy.embedCodeTitle} style={{ marginTop: 16 }}>
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
            {localizedCopy.embedCodeDescription}
          </Typography.Paragraph>
          <Typography.Paragraph
            copyable={{ text: runtimeEmbedCodeExample }}
            style={{ ...codeBlockStyle, marginBottom: 0 }}
          >
            {runtimeEmbedCodeExample}
          </Typography.Paragraph>
        </Space>
      </Card>

      <Card title={localizedCopy.vanillaJsEmbedCodeTitle} style={{ marginTop: 16 }}>
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
            {localizedCopy.vanillaJsEmbedCodeDescription}
          </Typography.Paragraph>
          <Typography.Paragraph
            copyable={{ text: vanillaJsEmbedCodeExample }}
            style={{ ...codeBlockStyle, marginBottom: 0 }}
          >
            {vanillaJsEmbedCodeExample}
          </Typography.Paragraph>
        </Space>
      </Card>

      <BytedeskReact
        key={renderMode}
        {...config}
        mode={renderMode}
        inlineConfig={renderMode === 'inline' ? { autoShow: true, mode: 'fixed-right', width: 420 } : undefined}
        onInit={handleInit}
      />

      <Modal
        title={sitePreviewCopy.modalTitle}
        open={isSitePreviewModalOpen}
        onOk={handleConfirmSitePreview}
        onCancel={() => {
          setIsSitePreviewModalOpen(false);
          setSitePreviewValidationMessage('');
        }}
        okText={messages.common.buttons.submit}
        cancelText={messages.common.buttons.cancel}
      >
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
            {sitePreviewCopy.modalDescription}
          </Typography.Paragraph>
          <Input
            value={sitePreviewTargetUrl}
            placeholder={sitePreviewCopy.inputPlaceholder}
            onChange={(event) => {
              setSitePreviewTargetUrl(event.target.value);
              if (sitePreviewValidationMessage) {
                setSitePreviewValidationMessage('');
              }
            }}
            onPressEnter={handleConfirmSitePreview}
          />
          {sitePreviewValidationMessage && (
            <Typography.Text type="danger">
              {sitePreviewValidationMessage || sitePreviewCopy.openFailedMessage}
            </Typography.Text>
          )}
        </Space>
      </Modal>

      <FloatButton.BackTop style={{ marginRight: 200, marginBottom: -30 }}/>
    </PageContainer>
  );
};

export default BasicDemo;
