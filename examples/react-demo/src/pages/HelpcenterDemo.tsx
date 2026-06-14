import { useMemo, useState } from 'react';
// @ts-ignore
import { BytedeskReact } from '@bytedesk/web/adapters/react';
// @ts-ignore
import type { BytedeskConfig, Language, Theme as BytedeskTheme } from '@bytedesk/web/types';
import { Alert, Button, Card, Divider, Space, Typography, theme } from 'antd';
import PageContainer from '../components/PageContainer';
import { getLocaleMessages } from '../locales';
import { formatChatConfigQuery, type DemoChatProfile } from '../types/chat-profile';
import type { DemoUserProfile } from '../types/demo-user';
import { demoApiUrl, getDemoHtmlBaseUrl } from '../utils/env';
import { buildCurrentEmbedCodeExample, getCurrentEmbedCodeCopy } from '../utils/embed-code-guide';

interface HelpcenterDemoProps {
  locale: Language;
  themeMode: BytedeskTheme['mode'];
  selectedChatProfile: DemoChatProfile;
  selectedUser: DemoUserProfile;
  isAnonymousMode: boolean;
}

type DemoTabsConfig = NonNullable<BytedeskConfig['tabsConfig']>;

const HelpcenterDemo = ({
  locale,
  themeMode,
  selectedChatProfile,
  selectedUser,
  isAnonymousMode
}: HelpcenterDemoProps) => {
  const messages = useMemo(() => getLocaleMessages(locale), [locale]);
  const { token } = theme.useToken();
  const htmlBaseUrl = getDemoHtmlBaseUrl(9006);
  const [tabsConfig, setTabsConfig] = useState<DemoTabsConfig>({
    help: true,
    thread: true,
    messages: true
  });

  const chatConfig = useMemo<NonNullable<BytedeskConfig['chatConfig']>>(() => ({
    ...selectedChatProfile.chatConfig,
    ...(!isAnonymousMode
      ? {
        visitorUid: selectedUser.visitorUid,
        nickname: selectedUser.nickname,
        avatar: selectedUser.avatar
      }
      : {})
  }), [isAnonymousMode, selectedChatProfile.chatConfig, selectedUser.avatar, selectedUser.nickname, selectedUser.visitorUid]);

  const config = useMemo<BytedeskConfig>(() => ({
    isDebug: false,
    htmlUrl: htmlBaseUrl,
    ...(demoApiUrl ? { apiUrl: demoApiUrl } : {}),
    placement: 'bottom-right',
    marginBottom: 20,
    marginSide: 20,
    autoPopup: false,
    draggable: true,
    tabsConfig,
    inviteConfig: { show: false },
    bubbleConfig: {
      show: true,
      icon: '?',
      title: messages.pages.helpcenterDemo.bubbleTitle,
      subtitle: messages.pages.helpcenterDemo.bubbleSubtitle
    },
    buttonConfig: {
      show: true,
      width: 60,
      height: 60,
      action: 'chat'
    },
    chatConfig,
    theme: {
      mode: themeMode || 'light'
    },
    window: {
      width: 420,
      height: 680
    },
    locale
  }), [chatConfig, htmlBaseUrl, locale, messages.pages.helpcenterDemo.bubbleSubtitle, messages.pages.helpcenterDemo.bubbleTitle, tabsConfig, themeMode]);
  const embedCodeCopy = useMemo(() => getCurrentEmbedCodeCopy(locale), [locale]);
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
  const currentEmbedCodeExample = useMemo(
    () => buildCurrentEmbedCodeExample({ config }),
    [config]
  );

  const helpcenterUrl = useMemo(() => {
    const params = new URLSearchParams();
    Object.entries(chatConfig).forEach(([key, value]) => {
      if (value === undefined || value === null || String(value).trim() === '') {
        return;
      }
      params.append(key, typeof value === 'string' ? value : JSON.stringify(value));
    });
    params.set('lang', locale);
    params.set('mode', String(themeMode || 'light'));
    params.set('tab', 'help');
    return `${htmlBaseUrl}/chat/helpcenter?${params.toString()}`;
  }, [chatConfig, htmlBaseUrl, locale, themeMode]);

  const tabRows = [
    { key: 'help' as const, label: '显示帮助tab' },
    { key: 'thread' as const, label: '显示历史会话tab' },
    { key: 'messages' as const, label: '显示消息tab' }
  ];

  const updateTab = (key: keyof DemoTabsConfig, checked: boolean) => {
    setTabsConfig((prev) => ({
      ...prev,
      [key]: checked
    }));
  };

  const openChatWindow = () => {
    (window as any).bytedesk?.showChat?.({
      htmlUrl: config.htmlUrl,
      tabsConfig,
      chatConfig
    });
  };

  const closeChatWindow = () => {
    (window as any).bytedesk?.hideChat?.();
  };

  return (
    <PageContainer>
      <Card>
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          <div>
            <Typography.Title level={2} style={{ marginBottom: 0 }}>{messages.pages.helpcenterDemo.title}</Typography.Title>
            <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
              {messages.pages.helpcenterDemo.description}
            </Typography.Paragraph>
          </div>
          <Alert
            type="info"
            showIcon
            title={`${messages.pages.helpcenterDemo.currentChatProfile}: ${formatChatConfigQuery(selectedChatProfile.chatConfig)}`}
            description={messages.pages.helpcenterDemo.windowHint}
          />
        </Space>
      </Card>

      <Card title={messages.pages.helpcenterDemo.controlsTitle}>
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          <Space wrap>
            {tabRows.map((item) => (
              <Button
                key={item.key}
                type={tabsConfig[item.key] ? 'primary' : 'default'}
                onClick={() => updateTab(item.key, !tabsConfig[item.key])}
              >
                {item.label}：{tabsConfig[item.key] ? messages.pages.basicDemo.loadHistoryEnabled : messages.pages.basicDemo.loadHistoryDisabled}
              </Button>
            ))}
          </Space>

          <Divider style={{ margin: '4px 0' }} />

          <Space wrap>
            <Button type="primary" onClick={openChatWindow}>
              {messages.pages.helpcenterDemo.openChatButton}
            </Button>
            <Button onClick={closeChatWindow}>{messages.common.buttons.closeChat}</Button>
            <Button onClick={() => window.open(helpcenterUrl, '_blank', 'width=420,height=680,resizable=yes,scrollbars=yes')}>
              {messages.common.buttons.openInNewWindow}
            </Button>
            <Button onClick={() => window.open(helpcenterUrl, '_blank')}>
              {messages.common.buttons.openInNewTab}
            </Button>
          </Space>

          <Alert
            type="info"
            showIcon
            title={`${messages.common.apiHintPrefix} showChat() / hideChat()`}
            style={{ alignSelf: 'flex-start', width: 'fit-content', maxWidth: '100%' }}
          />
        </Space>
      </Card>

      <Card title={embedCodeCopy.title}>
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
            {embedCodeCopy.description}
          </Typography.Paragraph>
          <Typography.Paragraph
            copyable={{ text: currentEmbedCodeExample }}
            style={{ ...codeBlockStyle, marginBottom: 0 }}
          >
            {currentEmbedCodeExample}
          </Typography.Paragraph>
        </Space>
      </Card>

      <BytedeskReact {...config} />
    </PageContainer>
  );
};

export default HelpcenterDemo;
