import type { BytedeskConfig, Theme } from '@bytedesk/web/types';
import type { DemoChatProfile } from '../../types/chat-profile';
import type { DemoUserProfile } from '../../types/demo-user';
import { THEME_COLORS } from './constants';
import type { ExampleCopy } from './copy';

type SelectedChatConfigRecord = Record<string, string | number | boolean | undefined>;

interface FullConfigExampleParams {
  config: BytedeskConfig;
  exampleCopy: ExampleCopy;
  locale: string;
  qrCodeImageUrl: string;
  selectedChatConfigRecord: SelectedChatConfigRecord;
  selectedChatProfile: DemoChatProfile;
  selectedEntryActions: string[];
  themeMode: Theme['mode'];
}

interface MinimalConfigExampleParams {
  htmlUrl: string | undefined;
  chatHtmlBaseUrl: string;
  selectedChatProfile: DemoChatProfile;
}

interface RecommendedConfigExampleParams {
  config: BytedeskConfig;
  exampleCopy: ExampleCopy;
  bubbleSwitchMode: 'fade' | 'slide-up' | 'ticker';
  locale: string;
  themeMode: Theme['mode'];
  selectedChatProfile: DemoChatProfile;
  bubbleTitle: string;
  bubbleSubtitle: string;
}

interface RuntimeEmbedCodeExampleParams {
  config: BytedeskConfig;
  isAnonymousMode: boolean;
  selectedUser: DemoUserProfile;
  themeMode: Theme['mode'];
}

const escapeSingleQuotedString = (value: string): string => value
  .replace(/\\/g, '\\\\')
  .replace(/'/g, "\\'");

const stringifyForCode = (value: unknown): string => {
  return JSON.stringify(value, null, 2)
    .replace(/"([^"]+)":/g, '$1:')
    .replace(/"([^"\\]*(?:\\.[^"\\]*)*)"/g, (_match, group) => `'${escapeSingleQuotedString(group)}'`);
};

export const buildRuntimeEmbedCodeExample = ({
  config,
  isAnonymousMode,
  selectedUser,
  themeMode,
}: RuntimeEmbedCodeExampleParams) => {
  const currentChatConfig = {
    ...(config.chatConfig || {}),
    ...(isAnonymousMode
      ? {}
      : {
          visitorUid: selectedUser.visitorUid,
          nickname: selectedUser.nickname,
          avatar: selectedUser.avatar,
        }),
  };

  const runtimeConfig = {
    ...(config.apiUrl ? { apiUrl: config.apiUrl } : {}),
    htmlUrl: config.htmlUrl,
    placement: config.placement,
    marginBottom: config.marginBottom,
    marginSide: config.marginSide,
    autoPopup: config.autoPopup,
    draggable: config.draggable,
    locale: config.locale,
    buttonConfig: config.buttonConfig,
    buttonsConfig: config.buttonsConfig,
    inviteConfig: config.inviteConfig,
    bubbleConfig: config.bubbleConfig,
    minimizedBarConfig: config.minimizedBarConfig,
    chatConfig: currentChatConfig,
    browseConfig: config.browseConfig,
    theme: {
      ...(config.theme || {}),
      mode: config.theme?.mode || themeMode || 'light',
    },
    onVisitorInfo: '(uid, visitorUid) => console.log(uid, visitorUid)',
  };

  const serializedConfig = stringifyForCode(runtimeConfig)
    .replace(/'\(uid, visitorUid\) => console\.log\(uid, visitorUid\)'/g, '(uid, visitorUid) => console.log(uid, visitorUid)');

  return `import { BytedeskReact } from '@bytedesk/web/adapters/react';
import type { BytedeskConfig } from '@bytedesk/web/types';

const bytedeskConfig: BytedeskConfig = ${serializedConfig};

export default function VisitorWidget() {
  return <BytedeskReact {...bytedeskConfig} />;
}`;
};

export const buildFullConfigExample = ({
  config,
  exampleCopy,
  locale,
  qrCodeImageUrl,
  selectedChatConfigRecord,
  selectedChatProfile,
  selectedEntryActions,
  themeMode,
}: FullConfigExampleParams) => {
  const selectedButtons = selectedEntryActions.join(', ');
  const currentLocale = config.locale || locale;
  const currentThemeMode = config.theme?.mode || themeMode || 'light';
  const currentBackgroundColor = config.theme?.backgroundColor || THEME_COLORS[0];
  const currentTextColor = config.theme?.textColor || '#ffffff';
  const currentPlacement = config.placement || 'bottom-right';
  const readChatConfigText = (key: string) => String(selectedChatConfigRecord[key] || '');

  return `const bytedeskConfig: BytedeskConfig = {
  isDebug: ${String(Boolean(config.isDebug))},
  forceRefresh: ${String(Boolean(config.forceRefresh))},
  apiUrl: '${config.apiUrl || ''}',
  htmlUrl: '${config.htmlUrl || ''}',

  // ${exampleCopy.routeComment}
  chatPath: '${config.chatPath || '/chat'}',
  threadPath: '${config.threadPath || '/chat/thread'}',
  webrtcPath: '${config.webrtcPath || '/webrtc'}',
  callPath: '${config.callPath || '/call'}',

  // ${exampleCopy.entryComment}
  placement: '${currentPlacement}',
  marginBottom: ${config.marginBottom ?? 20},
  marginSide: ${config.marginSide ?? 20},
  autoPopup: ${String(Boolean(config.autoPopup))},
  autoPopupDelay: ${config.autoPopupDelay ?? 0},
  draggable: ${String(Boolean(config.draggable))},
  locale: '${currentLocale}',

  tabsConfig: {
    help: ${String(Boolean(config.tabsConfig?.help))},
    thread: ${String(Boolean(config.tabsConfig?.thread))},
    messages: ${String(Boolean(config.tabsConfig?.messages))},
  },

  bubbleConfig: {
    show: ${String(config.bubbleConfig?.show !== false)},
    icon: '${config.bubbleConfig?.icon || ''}',
    title: '${config.bubbleConfig?.title || ''}',
    subtitle: '${config.bubbleConfig?.subtitle || ''}',
    messages: [
      { icon: '👋', title: '${exampleCopy.welcomeTitle}', subtitle: '${exampleCopy.welcomeSubtitle}' },
      { icon: '🧠', title: '${exampleCopy.aiTitle}', subtitle: '${exampleCopy.aiSubtitle}' }
    ],
    autoRotate: ${String(config.bubbleConfig?.autoRotate !== false)},
    rotateInterval: ${config.bubbleConfig?.rotateInterval ?? 3000},
    switchMode: '${config.bubbleConfig?.switchMode || 'fade'}',
  },

  buttonConfig: {
    show: ${String(config.buttonConfig?.show !== false)},
    icon: '💬',
    text: '${exampleCopy.chatText}',
    width: ${config.buttonConfig?.width ?? 60},
    height: ${config.buttonConfig?.height ?? 60},
    action: 'chat',
  },

  // ${exampleCopy.multiEntryComment}：${selectedButtons}
  buttonsConfig: [
    { icon: '💬', text: '${exampleCopy.chatText}', action: 'chat', width: 54, height: 54 },
    { icon: '🧵', text: '${exampleCopy.threadText}', action: 'thread', width: 54, height: 54 },
    { icon: '📹', text: '${exampleCopy.webrtcText}', action: 'webrtc', width: 54, height: 54 },
    { icon: '📞', text: '${exampleCopy.callText}', action: 'call', width: 54, height: 54 },
    { icon: '🧾', text: '${exampleCopy.qrText}', width: 54, height: 54, previewImageUrl: '${qrCodeImageUrl}' },
  ],

  inviteConfig: {
    show: ${String(Boolean(config.inviteConfig?.show))},
    text: '${config.inviteConfig?.text || exampleCopy.inviteText}',
    icon: '${config.inviteConfig?.icon || ''}',
    delay: ${config.inviteConfig?.delay ?? 1000},
    loop: ${String(Boolean(config.inviteConfig?.loop))},
    loopDelay: ${config.inviteConfig?.loopDelay ?? 10000},
    loopCount: ${config.inviteConfig?.loopCount ?? 3},
    acceptText: '${config.inviteConfig?.acceptText || exampleCopy.inviteAcceptText}',
    rejectText: '${config.inviteConfig?.rejectText || exampleCopy.inviteRejectText}',
  },

  chatConfig: {
    org: '${selectedChatProfile.chatConfig.org}',
    t: '${selectedChatProfile.chatConfig.t}',
    sid: '${selectedChatProfile.chatConfig.sid}',
    title: '${readChatConfigText('title') || '客服咨询'}',
    uid: '',
    visitorUid: '${readChatConfigText('visitorUid')}',
    nickname: '${readChatConfigText('nickname')}',
    avatar: '${readChatConfigText('avatar')}',
    mobile: '${readChatConfigText('mobile')}',
    email: '${readChatConfigText('email')}',
    note: '${readChatConfigText('note')}',
    channel: '${readChatConfigText('channel')}',
    goodsInfo: '${readChatConfigText('goodsInfo')}',
    orderInfo: '${readChatConfigText('orderInfo')}',
    extra: '${readChatConfigText('extra')}',
    vipLevel: '${readChatConfigText('vipLevel')}',
    debug: ${String(Boolean(selectedChatConfigRecord.debug))},
    draft: ${String(Boolean(selectedChatConfigRecord.draft))},
    settingsUid: '${readChatConfigText('settingsUid')}',
    qrcode: '${config.chatConfig?.qrcode === '0' ? '0' : '1'}',
    threadDetail: '${config.chatConfig?.threadDetail === '1' ? '1' : '0'}',
    visitorProfile: '${config.chatConfig?.visitorProfile === '1' ? '1' : '0'}',
    loadHistory: ${String(Boolean(config.chatConfig?.loadHistory))},
  },

  browseConfig: {
    referer: document.referrer,
    url: window.location.href,
    title: document.title,
  },

  feedbackConfig: {
    enabled: ${String(Boolean(config.feedbackConfig?.enabled))},
    trigger: '${config.feedbackConfig?.trigger || 'selection'}',
    showOnSelection: ${String(Boolean(config.feedbackConfig?.showOnSelection))},
    selectionText: '${config.feedbackConfig?.selectionText || exampleCopy.feedbackText}',
    buttonText: '${config.feedbackConfig?.buttonText || exampleCopy.feedbackText}',
    dialogTitle: '${config.feedbackConfig?.dialogTitle || exampleCopy.feedbackDialogTitle}',
    placeholder: '${config.feedbackConfig?.placeholder || exampleCopy.feedbackPlaceholder}',
    submitText: '${config.feedbackConfig?.submitText || exampleCopy.feedbackSubmitText}',
    cancelText: '${config.feedbackConfig?.cancelText || exampleCopy.feedbackCancelText}',
    successMessage: '${config.feedbackConfig?.successMessage || exampleCopy.feedbackSuccessText}',
    categoryNames: ['错别字、拼写错误', '链接跳转有问题', '文档与实操不一致'],
    requiredTypes: ${String(Boolean(config.feedbackConfig?.requiredTypes))},
    typesSectionTitle: '${config.feedbackConfig?.typesSectionTitle || exampleCopy.feedbackTypeTitle}',
    typesDescription: '${config.feedbackConfig?.typesDescription || exampleCopy.feedbackTypeDescription}',
    submitScreenshot: ${String(Boolean(config.feedbackConfig?.submitScreenshot))},
  },

  animation: {
    enabled: ${String(config.animation?.enabled !== false)},
    duration: ${config.animation?.duration ?? 300},
    type: '${config.animation?.type || 'ease'}',
  },

  window: {
    width: ${config.window?.width ?? 380},
    height: ${config.window?.height ?? 640},
  },

  theme: {
    mode: '${currentThemeMode}',
    textColor: '${currentTextColor}',
    backgroundColor: '${currentBackgroundColor}',
  },

  onInit: () => console.log('${exampleCopy.completeInit}'),
  onShowChat: () => console.log('${exampleCopy.chatOpened}'),
  onHideChat: () => console.log('${exampleCopy.chatHidden}'),
  onMessage: (message, type) => console.log('message', type, message),
  onConfigChange: (nextConfig) => console.log('${exampleCopy.configChanged}', nextConfig),
  onVisitorInfo: (uid, visitorUid) => console.log('${exampleCopy.visitorInfo}', uid, visitorUid),
};`;
};

export const buildMinimalConfigExample = ({ htmlUrl, chatHtmlBaseUrl, selectedChatProfile }: MinimalConfigExampleParams) => {
  return `const bytedeskConfig: BytedeskConfig = {
  htmlUrl: '${htmlUrl || chatHtmlBaseUrl}',
  chatConfig: {
    org: '${selectedChatProfile.chatConfig.org}',
    t: '${selectedChatProfile.chatConfig.t}',
    sid: '${selectedChatProfile.chatConfig.sid}',
  },
};`;
};

export const buildRecommendedConfigExample = ({
  config,
  exampleCopy,
  bubbleSwitchMode,
  locale,
  themeMode,
  selectedChatProfile,
  bubbleTitle,
  bubbleSubtitle,
}: RecommendedConfigExampleParams) => {
  return `const bytedeskConfig: BytedeskConfig = {
  apiUrl: '${config.apiUrl || 'https://api.weiyuai.cn'}',
  htmlUrl: '${config.htmlUrl || 'https://cdn.weiyuai.cn'}',
  placement: '${config.placement || 'bottom-right'}',
  marginBottom: ${config.marginBottom ?? 20},
  marginSide: ${config.marginSide ?? 20},
  draggable: ${String(Boolean(config.draggable))},
  locale: '${config.locale || locale}',

  chatPath: '${config.chatPath || '/chat'}',
  threadPath: '${config.threadPath || '/chat/thread'}',
  webrtcPath: '${config.webrtcPath || '/webrtc'}',
  callPath: '${config.callPath || '/call'}',

  chatConfig: {
    org: '${selectedChatProfile.chatConfig.org}',
    t: '${selectedChatProfile.chatConfig.t}',
    sid: '${selectedChatProfile.chatConfig.sid}',
    threadDetail: '${config.chatConfig?.threadDetail === '1' ? '1' : '0'}',
    visitorProfile: '${config.chatConfig?.visitorProfile === '1' ? '1' : '0'}',
    loadHistory: ${String(Boolean(config.chatConfig?.loadHistory))},
  },

  bubbleConfig: {
    show: true,
    title: '${config.bubbleConfig?.title || bubbleTitle}',
    subtitle: '${config.bubbleConfig?.subtitle || bubbleSubtitle}',
    autoRotate: ${String(config.bubbleConfig?.autoRotate !== false)},
    rotateInterval: ${config.bubbleConfig?.rotateInterval ?? 3000},
    switchMode: '${config.bubbleConfig?.switchMode || bubbleSwitchMode}',
  },

  buttonConfig: {
    show: true,
    icon: '💬',
    width: ${config.buttonConfig?.width ?? 60},
    height: ${config.buttonConfig?.height ?? 60},
    action: 'chat',
  },

  theme: {
    mode: '${config.theme?.mode || themeMode || 'light'}',
    textColor: '${config.theme?.textColor || '#ffffff'}',
    backgroundColor: '${config.theme?.backgroundColor || THEME_COLORS[0]}',
  },

  inviteConfig: {
    show: ${String(Boolean(config.inviteConfig?.show))},
    delay: ${config.inviteConfig?.delay ?? 1000},
    loop: ${String(Boolean(config.inviteConfig?.loop))},
    loopDelay: ${config.inviteConfig?.loopDelay ?? 10000},
    loopCount: ${config.inviteConfig?.loopCount ?? 3},
  },

  onVisitorInfo: (uid, visitorUid) => {
    console.log('${exampleCopy.visitorInfo}', uid, visitorUid);
  },
};`;
};