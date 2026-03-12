import { useMemo } from 'react';
import { Alert, Button, Card, List, Space, Tag, Typography, theme as antdTheme } from 'antd';
// @ts-ignore
import { BytedeskReact } from '@bytedesk/web/adapters/react';
// @ts-ignore
import type { BytedeskConfig, Language, Theme as BytedeskTheme } from '@bytedesk/web/types';
import { getLocaleMessages } from '../locales';
import CurrentUserProfile from '../components/CurrentUserProfile';
import PageContainer from '../components/PageContainer';
import { DEMO_USER_PRESETS, type DemoUserKey, type DemoUserProfile } from '../types/demo-user';
import { formatChatConfigQuery, getConsultButtonLabel, type DemoChatProfile } from '../types/chat-profile';

interface DemoPageProps {
  locale: Language;
  themeMode: BytedeskTheme['mode'];
  selectedChatProfile: DemoChatProfile;
  selectedUser: DemoUserProfile;
  isAnonymousMode: boolean;
  onSelectUser: (nextUser: DemoUserKey) => void;
  onAnonymousModeChange: (nextMode: boolean) => void;
}

const CallCenterDemo = ({ locale, themeMode, selectedChatProfile, selectedUser, isAnonymousMode, onSelectUser, onAnonymousModeChange }: DemoPageProps) => {
  const messages = useMemo(() => getLocaleMessages(locale), [locale]);
  const { token } = antdTheme.useToken();

  const users = useMemo(
    () => (Object.keys(DEMO_USER_PRESETS) as DemoUserKey[]).map((key) => ({
      key,
      visitorUid: DEMO_USER_PRESETS[key].visitorUid,
      avatar: DEMO_USER_PRESETS[key].avatar,
      nickname: messages.pages.userInfoDemo.users[key]
    })),
    [messages]
  );

  const config = useMemo<BytedeskConfig>(() => ({
    isDebug: true,
    ...(process.env.NODE_ENV === 'development'
      ? {
        htmlUrl: 'http://127.0.0.1:9006',
        apiUrl: 'http://127.0.0.1:9003'
      }
      : {}),
    chatPath: '/chat',
    placement: 'bottom-right',
    marginBottom: 20,
    marginSide: 20,
    autoPopup: false,
    draggable: true,
    bubbleConfig: {
      show: true,
      icon: '📞',
      title: messages.pages.callCenterDemo.bubbleTitle,
      subtitle: messages.pages.callCenterDemo.bubbleSubtitle
    },
    buttonConfig: {
      show: true,
      width: 60,
      height: 60
    },
    chatConfig: {
      ...selectedChatProfile.chatConfig,
      ...(isAnonymousMode
        ? {}
        : {
          visitorUid: selectedUser.visitorUid,
          nickname: selectedUser.nickname,
          avatar: selectedUser.avatar
        })
    },
    theme: {
      mode: themeMode
    },
    locale
  }), [isAnonymousMode, locale, messages, selectedChatProfile, selectedUser, themeMode]);

  const docLinks = useMemo(
    () => [
      { href: 'https://www.weiyuai.cn/docs/zh-CN/docs/channel/react', label: messages.pages.callCenterDemo.docLinks.reactDoc },
      { href: 'https://www.weiyuai.cn/docs/zh-CN/docs/channel/vue', label: messages.pages.callCenterDemo.docLinks.vueDoc },
      { href: 'https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/CallCenterDemo.tsx', label: messages.pages.callCenterDemo.docLinks.reactExample }
    ],
    [messages]
  );

  const sampleUrl = useMemo(() => {
    const baseHtmlUrl = (config.htmlUrl || 'https://cdn.weiyuai.cn/chat').replace(/\/chat(?:\/thread)?\/?$/, '');
    const params = new URLSearchParams();
    const appendIfPresent = (key: string, value: string | undefined) => {
      if (value) {
        params.append(key, value);
      }
    };
    params.append('org', config.chatConfig?.org || '');
    params.append('t', String(config.chatConfig?.t || '1'));
    params.append('sid', String(config.chatConfig?.sid || ''));
    appendIfPresent('visitorUid', config.chatConfig?.visitorUid);
    appendIfPresent('nickname', config.chatConfig?.nickname);
    appendIfPresent('avatar', config.chatConfig?.avatar);
    params.append('lang', locale);
    params.append('mode', String(themeMode || 'light'));
    return `${baseHtmlUrl}/chat?${params.toString()}`;
  }, [config.chatConfig, config.htmlUrl, locale, themeMode]);
  const chatConfigHint = formatChatConfigQuery(selectedChatProfile.chatConfig);
  const consultButtonLabel = getConsultButtonLabel(selectedChatProfile);

  const formatSwitchUserLabel = (name: string) =>
    messages.pages.userInfoDemo.switchToUserLabel.replace('{{name}}', name);

  return (
    <PageContainer>
      <Card>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Typography.Title level={2} style={{ marginBottom: 0 }}>
            {messages.pages.callCenterDemo.title}
          </Typography.Title>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
            {messages.pages.callCenterDemo.description}
          </Typography.Paragraph>
          <Space direction="vertical" size={4}>
            {docLinks.map((link) => (
              <Typography.Link key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </Typography.Link>
            ))}
          </Space>
          <Alert
            type="info"
            showIcon
            message={messages.pages.callCenterDemo.pathAlert}
          />
        </Space>
      </Card>

      <Card>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Space align="center" wrap>
            <Typography.Text strong>{messages.pages.callCenterDemo.currentPathLabel}</Typography.Text>
            <Tag color="processing">/chat</Tag>
            <Typography.Text type="secondary">{messages.pages.callCenterDemo.currentPathHint}</Typography.Text>
          </Space>

          <Space direction="vertical" size={8} style={{ width: '100%' }}>
            <CurrentUserProfile
              title={messages.pages.userInfoDemo.currentUserTitle}
              isAnonymousMode={isAnonymousMode}
              avatar={selectedUser.avatar}
              anonymousIdText={messages.pages.callCenterDemo.anonymousUserHint}
              anonymousNicknameText={messages.pages.userInfoDemo.anonymousUserLabel}
              userIdLabel={messages.pages.userInfoDemo.currentUserIdLabel}
              userId={selectedUser.visitorUid}
              userNicknameLabel={messages.pages.userInfoDemo.currentUserNicknameLabel}
              userNickname={selectedUser.nickname}
              compact
            />
            <Space wrap>
              {users.map((user) => (
                <Button
                  key={user.visitorUid}
                  type="primary"
                  onClick={() => {
                    if (!isAnonymousMode && selectedUser.key === user.key) {
                      return;
                    }
                    onAnonymousModeChange(false);
                    onSelectUser(user.key);
                  }}
                  style={!isAnonymousMode && selectedUser.key === user.key ? { backgroundColor: token.colorSuccess, borderColor: token.colorSuccess } : undefined}
                >
                  {formatSwitchUserLabel(user.nickname)}
                  {!isAnonymousMode && selectedUser.key === user.key ? '【当前】' : ''}
                </Button>
              ))}
              <Button
                type={isAnonymousMode ? 'primary' : 'default'}
                onClick={() => {
                  if (isAnonymousMode) {
                    return;
                  }
                  onAnonymousModeChange(true);
                }}
                style={isAnonymousMode ? { backgroundColor: token.colorSuccess, borderColor: token.colorSuccess } : undefined}
              >
                {messages.pages.callCenterDemo.buttons.switchAnonymousUser}
                {isAnonymousMode ? '【当前】' : ''}
              </Button>
            </Space>
          </Space>

          <Space wrap>
            <Button type="primary" onClick={() => (window as any).bytedesk?.showChat()}>
              {consultButtonLabel}
            </Button>
            <Button onClick={() => (window as any).bytedesk?.hideChat()}>{messages.common.buttons.closeChat}</Button>
          </Space>

          <Alert
            type="info"
            showIcon
            message={`${messages.common.apiHintPrefix} showChat() / hideChat()`}
            style={{ alignSelf: 'flex-start', width: 'fit-content', maxWidth: '100%' }}
          />
          <Alert
            type="info"
            showIcon
            message={`咨询参数: ${chatConfigHint}`}
            style={{ alignSelf: 'flex-start', width: 'fit-content', maxWidth: '100%' }}
          />

          <List
            header={messages.pages.callCenterDemo.usageTitle}
            dataSource={messages.pages.callCenterDemo.usageNotes}
            renderItem={(note) => <List.Item>{note}</List.Item>}
          />
        </Space>
      </Card>

      <Card title={messages.pages.callCenterDemo.urlGuideTitle}>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Typography.Text strong>{messages.pages.callCenterDemo.sampleUrlLabel}</Typography.Text>
          <Typography.Paragraph copyable={{ text: sampleUrl }} style={{ marginBottom: 0 }}>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{sampleUrl}</pre>
          </Typography.Paragraph>
        </Space>
      </Card>

      <BytedeskReact {...config} />
    </PageContainer>
  );
};

export default CallCenterDemo;
