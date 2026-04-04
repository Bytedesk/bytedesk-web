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
import type { BytedeskConfig, Language, Theme } from '@bytedesk/web/types';
import InstallGuide from '../components/InstallGuide';
import PageContainer from '../components/PageContainer';
import { getLocaleMessages, type DemoLanguage } from '../locales';
import { formatChatConfigQuery, getConsultButtonLabel, type DemoChatProfile } from '../types/chat-profile';
import { Alert, Button, Card, Descriptions, Dropdown, Space, Typography, theme, type MenuProps } from 'antd';

const THEME_COLORS = ['#0066ff', '#f97316', '#10b981', '#8b5cf6'];
export const LANG_ZH_CN = 'zh-cn';
export const LANG_ZH_TW = 'zh-tw';
export const LANG_EN = 'en';
export const LANG_JA_JP = 'ja-jp';
export const LANG_KO_KR = 'ko-kr';
export const LANG_VI_VN = 'vi-vn';
export const LANG_MS_MY = 'ms-my';
export const LANG_ES_ES = 'es-es';
export const LANG_FR_FR = 'fr-fr';

const LANGUAGE_OPTIONS = [
  { value: LANG_ZH_CN, label: '简体中文' },
  { value: LANG_ZH_TW, label: '繁體中文' },
  { value: LANG_EN, label: 'English' },
  { value: LANG_JA_JP, label: '日本語' },
  { value: LANG_KO_KR, label: '한국어' },
  { value: LANG_VI_VN, label: 'Tiếng Việt' },
  { value: LANG_MS_MY, label: 'Bahasa Melayu' },
  { value: LANG_ES_ES, label: 'Español' },
  { value: LANG_FR_FR, label: 'Français' }
];

interface BasicDemoProps {
  locale: DemoLanguage;
  themeMode: Theme['mode'];
  themePreference: 'light' | 'dark' | 'system';
  selectedChatProfile: DemoChatProfile;
  onLocaleChange: (nextLocale: DemoLanguage) => void;
  onThemePreferenceChange: (nextTheme: 'light' | 'dark' | 'system') => void;
}

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
  const [lastActionApiHint, setLastActionApiHint] = useState<string>('');
  const [isMultiBubbleDemo, setIsMultiBubbleDemo] = useState<boolean>(true);
  const [bubbleSwitchMode, setBubbleSwitchMode] = useState<'fade' | 'slide-up' | 'ticker'>('fade');

  const localeValueHint = useMemo(() => {
    if (locale === LANG_VI_VN) {
      return 'Gia tri locale ho tro: zh-cn(Gian the) | zh-tw(Phon the) | en(English) | ja-jp(Tieng Nhat) | ko-kr(Tieng Han) | vi-vn(Tieng Viet) | ms-my(Bahasa Melayu)';
    }
    if (locale === LANG_MS_MY) {
      return 'Nilai locale yang disokong: zh-cn(Cina Ringkas) | zh-tw(Cina Tradisional) | en(English) | ja-jp(Bahasa Jepun) | ko-kr(Bahasa Korea) | vi-vn(Tiếng Việt) | ms-my(Bahasa Melayu)';
    }
    if (locale === LANG_ES_ES) {
      return 'Valores de locale compatibles: zh-cn(Chino simplificado) | zh-tw(Chino tradicional) | en(Inglés) | ja-jp(Japonés) | ko-kr(Coreano) | vi-vn(Tiếng Việt) | ms-my(Bahasa Melayu) | es-es(Español) | fr-fr(Francés)';
    }
    if (locale === LANG_FR_FR) {
      return 'Valeurs de locale prises en charge : zh-cn(Chinois simplifie) | zh-tw(Chinois traditionnel) | en(Anglais) | ja-jp(Japonais) | ko-kr(Coreen) | vi-vn(Tiếng Việt) | ms-my(Bahasa Melayu) | es-es(Espagnol) | fr-fr(Francais)';
    }
    if (locale === LANG_EN) {
      return 'Supported locale values: zh-cn(Simplified Chinese) | zh-tw(Traditional Chinese) | en(English) | ja-jp(Japanese) | ko-kr(Korean) | vi-vn(Tiếng Việt) | ms-my(Bahasa Melayu) | es-es(Spanish) | fr-fr(French)';
    }
    if (locale === LANG_JA_JP) {
      return '対応する locale 値: zh-cn(簡体字中国語) | zh-tw(繁体字中国語) | en(English) | ja-jp(日本語) | ko-kr(韓国語) | vi-vn(Tiếng Việt) | ms-my(Bahasa Melayu) | es-es(スペイン語) | fr-fr(フランス語)';
    }
    if (locale === LANG_KO_KR) {
      return '지원되는 locale 값: zh-cn(중국어 간체) | zh-tw(중국어 번체) | en(영어) | ja-jp(일본어) | ko-kr(한국어) | vi-vn(Tiếng Việt) | ms-my(Bahasa Melayu) | es-es(스페인어) | fr-fr(프랑스어)';
    }
    if (locale === LANG_ZH_TW) {
      return 'locale 可選值: zh-cn(簡體中文) | zh-tw(繁體中文) | en(English) | ja-jp(日本語) | ko-kr(한국어) | vi-vn(Tiếng Việt) | ms-my(Bahasa Melayu) | es-es(Español) | fr-fr(Français)';
    }
    return 'locale 可选值: zh-cn(简体中文) | zh-tw(繁體中文) | en(English) | ja-jp(日本語) | ko-kr(한국어) | vi-vn(Tiếng Việt) | ms-my(Bahasa Melayu) | es-es(Español) | fr-fr(Français)';
  }, [locale]);

  const localizedCopy = useMemo(() => {
    switch (locale) {
      case LANG_VI_VN:
        return {
          bubbleAgentTitle: 'Ho tro AI Agent',
          bubbleAgentSubtitle: 'Meo bong thong bao tu dong chuyen',
          bubbleWebrtcTitle: 'San sang WebRTC',
          bubbleWebrtcSubtitle: 'Dich vu audio va video da san sang',
          multiBubbleLabel: `Demo nhieu bong: ${isMultiBubbleDemo ? 'BAT' : 'TAT'}`,
          switchModeLabel: `Kieu chuyen bong: ${bubbleSwitchMode === 'fade' ? 'Mo dan' : bubbleSwitchMode === 'slide-up' ? 'Truot len' : 'Bang thong bao'}`,
          apiMessageLabel: 'API hien tai:',
          consultParamsLabel: 'Tham so tu van:',
          bubbleDemoLabel: `Demo bong: bubbleConfig.messages + autoRotate + rotateInterval + switchMode=${bubbleSwitchMode}`,
          popupUrlTitle: 'URL cua cua so rieng hien tai:',
          popupUrlParamsTitle: 'Danh sach tham so URL hien tai:'
        };
      case LANG_MS_MY:
        return {
          bubbleAgentTitle: 'Sokongan Ejen AI',
          bubbleAgentSubtitle: 'Petua gelembung bertukar secara automatik',
          bubbleWebrtcTitle: 'WebRTC Tersedia',
          bubbleWebrtcSubtitle: 'Perkhidmatan audio dan video sedia digunakan',
          multiBubbleLabel: `Demo berbilang gelembung: ${isMultiBubbleDemo ? 'HIDUP' : 'MATI'}`,
          switchModeLabel: `Mod pertukaran gelembung: ${bubbleSwitchMode === 'fade' ? 'Pudar' : bubbleSwitchMode === 'slide-up' ? 'Gelongsor naik' : 'Pita ticker'}`,
          apiMessageLabel: 'API semasa:',
          consultParamsLabel: 'Parameter rundingan:',
          bubbleDemoLabel: `Demo gelembung: bubbleConfig.messages + autoRotate + rotateInterval + switchMode=${bubbleSwitchMode}`,
          popupUrlTitle: 'URL tetingkap berasingan semasa:',
          popupUrlParamsTitle: 'Senarai parameter URL semasa:'
        };
      case LANG_ES_ES:
        return {
          bubbleAgentTitle: 'Soporte de agente con IA',
          bubbleAgentSubtitle: 'Consejos del globo con cambio automatico',
          bubbleWebrtcTitle: 'WebRTC disponible',
          bubbleWebrtcSubtitle: 'Servicio de audio y video listo',
          multiBubbleLabel: `Demo de multiples globos: ${isMultiBubbleDemo ? 'ACTIVADO' : 'DESACTIVADO'}`,
          switchModeLabel: `Cambio de globo: ${bubbleSwitchMode === 'fade' ? 'Desvanecer' : bubbleSwitchMode === 'slide-up' ? 'Deslizar hacia arriba' : 'Ticker'}`,
          apiMessageLabel: 'API actual:',
          consultParamsLabel: 'Parametros de consulta:',
          bubbleDemoLabel: `Demo de globo: bubbleConfig.messages + autoRotate + rotateInterval + switchMode=${bubbleSwitchMode}`,
          popupUrlTitle: 'URL completa actual de la ventana independiente:',
          popupUrlParamsTitle: 'Lista actual de parametros URL:'
        };
      case LANG_FR_FR:
        return {
          bubbleAgentTitle: 'Assistance agent IA',
          bubbleAgentSubtitle: 'Bulles d aide avec rotation automatique',
          bubbleWebrtcTitle: 'WebRTC disponible',
          bubbleWebrtcSubtitle: 'Service audio et video pret',
          multiBubbleLabel: `Demo multi-bulles : ${isMultiBubbleDemo ? 'ACTIVEE' : 'DESACTIVEE'}`,
          switchModeLabel: `Changement de bulle : ${bubbleSwitchMode === 'fade' ? 'Fondu' : bubbleSwitchMode === 'slide-up' ? 'Glissement vers le haut' : 'Bandeau'}`,
          apiMessageLabel: 'API actuelle :',
          consultParamsLabel: 'Parametres de consultation :',
          bubbleDemoLabel: `Demo de bulle : bubbleConfig.messages + autoRotate + rotateInterval + switchMode=${bubbleSwitchMode}`,
          popupUrlTitle: 'URL complete actuelle de la fenetre independante :',
          popupUrlParamsTitle: 'Liste actuelle des parametres URL :'
        };
      case LANG_EN:
        return {
          bubbleAgentTitle: 'AI Agent Support',
          bubbleAgentSubtitle: 'Auto switch bubble tips',
          bubbleWebrtcTitle: 'WebRTC Available',
          bubbleWebrtcSubtitle: 'Audio and video service ready',
          multiBubbleLabel: `Multi Bubble Demo: ${isMultiBubbleDemo ? 'ON' : 'OFF'}`,
          switchModeLabel: `Bubble Switch: ${bubbleSwitchMode === 'fade' ? 'Fade' : bubbleSwitchMode === 'slide-up' ? 'Slide Up' : 'Ticker'}`,
          apiMessageLabel: 'Current API:',
          consultParamsLabel: 'Consultation params:',
          bubbleDemoLabel: `Bubble demo: bubbleConfig.messages + autoRotate + rotateInterval + switchMode=${bubbleSwitchMode}`,
          popupUrlTitle: 'Current standalone window full URL:',
          popupUrlParamsTitle: 'Current URL parameter list:'
        };
      case LANG_JA_JP:
        return {
          bubbleAgentTitle: 'AI エージェント対応',
          bubbleAgentSubtitle: 'ヒントバブルを自動で切り替えます',
          bubbleWebrtcTitle: 'WebRTC 利用可能',
          bubbleWebrtcSubtitle: '音声・映像サポートの準備ができています',
          multiBubbleLabel: `マルチバブルデモ: ${isMultiBubbleDemo ? 'オン' : 'オフ'}`,
          switchModeLabel: `バブル切替: ${bubbleSwitchMode === 'fade' ? 'フェード' : bubbleSwitchMode === 'slide-up' ? '上方向スライド' : 'ティッカー'}`,
          apiMessageLabel: '現在の API:',
          consultParamsLabel: '相談パラメータ:',
          bubbleDemoLabel: `バブルデモ: bubbleConfig.messages + autoRotate + rotateInterval + switchMode=${bubbleSwitchMode}`,
          popupUrlTitle: '現在の独立ウィンドウ完全 URL:',
          popupUrlParamsTitle: '現在の URL パラメータ一覧:'
        };
      case LANG_KO_KR:
        return {
          bubbleAgentTitle: 'AI 에이전트 지원',
          bubbleAgentSubtitle: '안내 버블이 자동으로 전환됩니다',
          bubbleWebrtcTitle: 'WebRTC 사용 가능',
          bubbleWebrtcSubtitle: '음성 및 영상 서비스가 준비되었습니다',
          multiBubbleLabel: `멀티 버블 데모: ${isMultiBubbleDemo ? '켜짐' : '꺼짐'}`,
          switchModeLabel: `버블 전환: ${bubbleSwitchMode === 'fade' ? '페이드' : bubbleSwitchMode === 'slide-up' ? '위로 슬라이드' : '티커'}`,
          apiMessageLabel: '현재 API:',
          consultParamsLabel: '상담 파라미터:',
          bubbleDemoLabel: `버블 데모: bubbleConfig.messages + autoRotate + rotateInterval + switchMode=${bubbleSwitchMode}`,
          popupUrlTitle: '현재 독립 창 전체 URL:',
          popupUrlParamsTitle: '현재 URL 파라미터 목록:'
        };
      case LANG_ZH_TW:
        return {
          bubbleAgentTitle: 'AI 智慧客服',
          bubbleAgentSubtitle: '支援多條提示自動切換',
          bubbleWebrtcTitle: '支援音視訊連線',
          bubbleWebrtcSubtitle: '音訊與視訊客服已就緒',
          multiBubbleLabel: `多氣泡輪播示範：${isMultiBubbleDemo ? '開啟' : '關閉'}`,
          switchModeLabel: `氣泡切換方式：${bubbleSwitchMode === 'fade' ? '淡入淡出' : bubbleSwitchMode === 'slide-up' ? '向上滾動' : '連續公告欄'}`,
          apiMessageLabel: '目前呼叫介面:',
          consultParamsLabel: '諮詢參數:',
          bubbleDemoLabel: `氣泡示範：bubbleConfig.messages + autoRotate + rotateInterval + switchMode=${bubbleSwitchMode}`,
          popupUrlTitle: '目前獨立視窗完整 URL：',
          popupUrlParamsTitle: '目前 URL 參數列表：'
        };
      default:
        return {
          bubbleAgentTitle: 'AI 智能客服',
          bubbleAgentSubtitle: '支持多条提示自动切换',
          bubbleWebrtcTitle: '支持音视频连线',
          bubbleWebrtcSubtitle: '音频与视频客服已就绪',
          multiBubbleLabel: `多气泡轮播演示：${isMultiBubbleDemo ? '开启' : '关闭'}`,
          switchModeLabel: `气泡切换方式：${bubbleSwitchMode === 'fade' ? '淡入淡出' : bubbleSwitchMode === 'slide-up' ? '向上滚动' : '连续公告栏'}`,
          apiMessageLabel: '当前调用接口:',
          consultParamsLabel: '咨询参数:',
          bubbleDemoLabel: `气泡示例：bubbleConfig.messages + autoRotate + rotateInterval + switchMode=${bubbleSwitchMode}`,
          popupUrlTitle: '当前独立窗口完整 URL：',
          popupUrlParamsTitle: '当前 URL 参数列表：'
        };
    }
  }, [bubbleSwitchMode, isMultiBubbleDemo, locale]);

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

  const [config, setConfig] = useState<BytedeskConfig>(() => ({
    isDebug: false,
    ...(process.env.NODE_ENV === 'development'
      ? {
        htmlUrl: 'http://127.0.0.1:9006',
        apiUrl: 'http://127.0.0.1:9003'
      }
      : {}),
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
      }
    }));
  }, [bubbleMessageList, bubbleSwitchMode, isMultiBubbleDemo, locale, themeMode, messages, selectedChatProfile]);

  const handleInit = () => {
    console.log('BytedeskReact initialized BasicDemo');
  };

  const handleNavColorSwitch = (nextColor: string) => {
    setConfig((prevConfig: BytedeskConfig) => ({
      ...prevConfig,
      theme: {
        ...prevConfig.theme,
        backgroundColor: nextColor
      }
    }));
    setLastActionApiHint(`setConfig({ theme: { backgroundColor: "${nextColor}" } })`);
  };

  const handlePlacementToggle = () => {
    setConfig((prevConfig: BytedeskConfig) => ({
      ...prevConfig,
      placement: prevConfig.placement === 'bottom-left' ? 'bottom-right' : 'bottom-left'
    }));
    setLastActionApiHint('setConfig({ placement: "bottom-left" | "bottom-right" })');
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
    onThemePreferenceChange(nextTheme);
    setLastActionApiHint(`setThemeMode("${nextTheme}") + setConfig({ theme: { mode: "${nextTheme === 'system' ? themeMode : nextTheme}" } })`);
  };

  const docLinks = [
    { href: 'https://www.weiyuai.cn/docs/zh-CN/docs/channel/react', label: messages.common.docLinks.react },
    { href: 'https://www.weiyuai.cn/docs/zh-CN/docs/channel/vue', label: messages.common.docLinks.vue },
    { href: 'https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/BasicDemo.tsx', label: messages.common.docLinks.reactExample },
    { href: 'https://github.com/Bytedesk/bytedesk-web/blob/master/examples/vue-demo/src/pages/BasicDemo.vue', label: messages.common.docLinks.vueExample }
  ];

  const consultButtonLabel = getConsultButtonLabel(selectedChatProfile, locale);

  const chatPageUrl = (() => {
    const baseUrl = process.env.NODE_ENV === 'development'
      ? 'http://127.0.0.1:9006/chat'
      : 'https://cdn.weiyuai.cn/chat';
    const params = new URLSearchParams();
    params.append('org', selectedChatProfile.chatConfig.org);
    params.append('t', String(selectedChatProfile.chatConfig.t));
    params.append('sid', String(selectedChatProfile.chatConfig.sid));
    params.append('lang', String(config.locale || locale));
    params.append('mode', String(config.theme?.mode || themeMode || 'light'));
    return `${baseUrl}?${params.toString()}`;
  })();

  const quickActions = [
    {
      key: 'openChat',
      label: consultButtonLabel,
      handler: () => {
        (window as any).bytedesk?.showChat();
        setLastActionApiHint('bytedesk.showChat()');
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
          chatConfig: chatConfigWithTheme as any
        });
        setLastActionApiHint(`bytedesk.showChat({ chatConfig: { ${chatConfigHint}, mode: "${config.theme?.mode || themeMode || 'light'}", themeMode: "${themePreference}" } })`);
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
  const themeModeLabel = messages.common.themeOptions[themePreference];
  const navColorMenuItems: MenuProps['items'] = THEME_COLORS.map((color) => ({
    key: color,
    label: (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: color,
            border: `1px solid ${token.colorBorder}`
          }}
        />
        <span>{color}</span>
      </span>
    )
  }));
  const themeModeMenuItems: MenuProps['items'] = [
    { key: 'light', label: messages.common.themeOptions.light },
    { key: 'dark', label: messages.common.themeOptions.dark },
    { key: 'system', label: messages.common.themeOptions.system }
  ];
  const loadHistoryEnabled = Boolean(config.chatConfig?.loadHistory);
  const chatConfigHint = formatChatConfigQuery(selectedChatProfile.chatConfig);
  const popupUrlParams = useMemo(() => Array.from(new URL(chatPageUrl).searchParams.entries()), [chatPageUrl]);
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

  return (
    <PageContainer>
      <Card>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Typography.Title level={2} style={{ marginBottom: 0 }}>{messages.pages.basicDemo.title}</Typography.Title>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
            {messages.pages.basicDemo.intro}
          </Typography.Paragraph>
          <Space direction="vertical" size={4}>
            {docLinks.map((link) => (
              <Typography.Link key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </Typography.Link>
            ))}
          </Space>
          <Space wrap>
            {quickActions.map((action) => (
              <Button key={action.key} type="primary" onClick={action.handler}>
                {action.label}
              </Button>
            ))}
            <Button type="primary" onClick={handlePlacementToggle}>
              {messages.common.buttons.togglePlacement} ({placementLabel})
            </Button>
            <Dropdown
              trigger={['click']}
              menu={{
                items: navColorMenuItems,
                selectable: true,
                selectedKeys: [config.theme?.backgroundColor || THEME_COLORS[0]],
                onClick: ({ key }) => handleNavColorSwitch(String(key))
              }}
            >
              <Button
                type="primary"
                style={{
                  backgroundColor: config.theme?.backgroundColor || token.colorPrimary,
                  borderColor: config.theme?.backgroundColor || token.colorPrimary
                }}
              >
                {messages.pages.basicDemo.themeButtonLabel} ({themeColorLabel})
              </Button>
            </Dropdown>
            <Dropdown
              trigger={['click']}
              menu={{
                items: themeModeMenuItems,
                selectable: true,
                selectedKeys: [themePreference],
                onClick: ({ key }) => handleThemeModeSwitch(String(key) as 'light' | 'dark' | 'system')
              }}
            >
              <Button type="primary">
                {messages.common.themeLabel} ({themeModeLabel})
              </Button>
            </Dropdown>
            <Button type={loadHistoryEnabled ? 'primary' : 'default'} onClick={handleToggleLoadHistory}>
              {messages.pages.basicDemo.loadHistoryLabel}: {loadHistoryEnabled
                ? messages.pages.basicDemo.loadHistoryEnabled
                : messages.pages.basicDemo.loadHistoryDisabled}
            </Button>
            <Button type={isMultiBubbleDemo ? 'primary' : 'default'} onClick={handleToggleMultiBubbleDemo}>
              {localizedCopy.multiBubbleLabel}
            </Button>
            <Button type="primary" onClick={handleToggleBubbleSwitchMode}>
              {localizedCopy.switchModeLabel}
            </Button>
          </Space>
          <Space wrap>
            {LANGUAGE_OPTIONS.map((item) => (
              <Button
                key={item.value}
                type={locale === item.value ? 'primary' : 'default'}
                onClick={() => handleLocaleSwitch(item.value as DemoLanguage)}
              >
                {item.label}
              </Button>
            ))}
          </Space>
          <Typography.Text type="secondary">
            {localeValueHint}
          </Typography.Text>
          {lastActionApiHint && (
            <Alert
              type="info"
              showIcon
              message={`${localizedCopy.apiMessageLabel} ${lastActionApiHint}`}
              style={{ alignSelf: 'flex-start', width: 'fit-content', maxWidth: '100%' }}
            />
          )}
          <Typography.Text type="secondary">
            {messages.common.apiHintPrefix} {messages.pages.basicDemo.loadHistoryApiHintPrefix}
            {loadHistoryEnabled ? 'true' : 'false'}
          </Typography.Text>
          <Typography.Text type="secondary">{localizedCopy.consultParamsLabel} {chatConfigHint}</Typography.Text>
          <Space direction="vertical" size={8} style={{ width: '100%' }}>
            <Typography.Text type="secondary">{localizedCopy.popupUrlTitle}</Typography.Text>
            <Typography.Paragraph
              copyable={{ text: chatPageUrl, tooltips: [messages.common.buttons.copy, messages.common.buttons.copy] }}
              style={codeBlockStyle}
            >
              {chatPageUrl}
            </Typography.Paragraph>
            <Typography.Text type="secondary">{localizedCopy.popupUrlParamsTitle}</Typography.Text>
            <Descriptions
              size="small"
              bordered
              column={1}
              items={popupUrlParams.map(([key, value]) => ({
                key,
                label: key,
                children: value
              }))}
            />
          </Space>
          <Typography.Text type="secondary">
            {localizedCopy.bubbleDemoLabel}
          </Typography.Text>
        </Space>
      </Card>

      <BytedeskReact
        {...config}
        onInit={handleInit}
      />

      <InstallGuide locale={locale} />
    </PageContainer>
  );
};

export default BasicDemo;
