import { useMemo } from 'react';
import { Alert, Button, Card, Space, Tag, Typography, theme as antdTheme } from 'antd';
// @ts-ignore
import { BytedeskReact } from '@bytedesk/web/adapters/react';
// @ts-ignore
import type { BytedeskConfig, Language, Theme as BytedeskTheme } from '@bytedesk/web/types';
import CurrentUserProfile from '../components/CurrentUserProfile';
import PageContainer from '../components/PageContainer';
import { getLocaleMessages } from '../locales';
import { DEMO_USER_PRESETS, type DemoUserKey, type DemoUserProfile } from '../types/demo-user';
import { formatChatConfigQuery, type DemoChatProfile } from '../types/chat-profile';
import { demoApiUrl, getDemoHtmlBaseUrl } from '../utils/env';

interface VoiceAgentDemoProps {
  locale: Language;
  themeMode: BytedeskTheme['mode'];
  selectedChatProfile: DemoChatProfile;
  selectedUser: DemoUserProfile;
  isAnonymousMode: boolean;
  onSelectUser: (nextUser: DemoUserKey) => void;
  onAnonymousModeChange: (nextMode: boolean) => void;
}

const VoiceAgentDemo = ({
  locale,
  themeMode,
  selectedChatProfile,
  selectedUser,
  isAnonymousMode,
  onSelectUser,
  onAnonymousModeChange,
}: VoiceAgentDemoProps) => {
  const messages = useMemo(() => getLocaleMessages(locale), [locale]);
  const m = messages.pages.voiceAgentDemo;
  const { token } = antdTheme.useToken();
  const htmlBaseUrl = getDemoHtmlBaseUrl(9006);

  const users = useMemo(
    () =>
      (Object.keys(DEMO_USER_PRESETS) as DemoUserKey[]).map((key) => ({
        key,
        visitorUid: DEMO_USER_PRESETS[key].visitorUid,
        avatar: DEMO_USER_PRESETS[key].avatar,
        nickname: messages.pages.userInfoDemo.users[key],
      })),
    [messages]
  );

  const docLinks = useMemo(
    () => [
      { href: 'https://www.weiyuai.cn/docs/zh-CN/docs/channel/react', label: m.docLinks.reactDoc },
      { href: 'https://www.weiyuai.cn/docs/zh-CN/docs/channel/vue', label: m.docLinks.vueDoc },
      { href: 'https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/VoiceAgentDemo.tsx', label: m.docLinks.reactExample },
    ],
    [m]
  );

  const config = useMemo<BytedeskConfig>(() => ({
    isDebug: true,
    htmlUrl: htmlBaseUrl,
    ...(demoApiUrl ? { apiUrl: demoApiUrl } : {}),
    chatPath: '/chat/voice',
    placement: 'bottom-right',
    marginBottom: 20,
    marginSide: 20,
    autoPopup: false,
    draggable: true,
    bubbleConfig: {
      show: true,
      icon: '🎙️',
      title: m.bubbleTitle,
      subtitle: m.bubbleSubtitle,
    },
    buttonConfig: {
      show: true,
      width: 60,
      height: 60,
      action: 'chat',
    },
    chatConfig: {
      ...selectedChatProfile.chatConfig,
      ...(isAnonymousMode
        ? {}
        : {
            visitorUid: selectedUser.visitorUid,
            nickname: selectedUser.nickname,
            avatar: selectedUser.avatar,
          }),
      navbar: '1',
    },
    theme: {
      mode: themeMode,
    },
    window: {
      width: 420,
      height: 720,
    },
    locale,
  }), [htmlBaseUrl, isAnonymousMode, locale, m, selectedChatProfile, selectedUser, themeMode]);

  const sampleUrl = useMemo(() => {
    const params = new URLSearchParams();
    params.append('org', selectedChatProfile.chatConfig.org);
    params.append('t', String(selectedChatProfile.chatConfig.t));
    params.append('sid', String(selectedChatProfile.chatConfig.sid));
    if (!isAnonymousMode) {
      if (selectedUser.visitorUid) params.append('visitorUid', selectedUser.visitorUid);
      if (selectedUser.nickname) params.append('nickname', selectedUser.nickname);
      if (selectedUser.avatar) params.append('avatar', selectedUser.avatar);
    }
    params.append('navbar', '1');
    params.append('lang', locale);
    params.append('mode', String(themeMode || 'light'));
    return `${htmlBaseUrl}/chat/voice?${params.toString()}`;
  }, [htmlBaseUrl, isAnonymousMode, locale, selectedChatProfile, selectedUser, themeMode]);

  const chatConfigHint = formatChatConfigQuery(selectedChatProfile.chatConfig);

  const formatSwitchLabel = (name: string) =>
    messages.pages.userInfoDemo.switchToUserLabel.replace('{{name}}', name);

  return (
    <PageContainer>
      <Card>
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          <Typography.Title level={2} style={{ marginBottom: 0 }}>
            {m.title}
          </Typography.Title>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
            {m.description}
          </Typography.Paragraph>
          <Space orientation="vertical" size={4}>
            {docLinks.map((link) => (
              <Typography.Link key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </Typography.Link>
            ))}
          </Space>
          <Alert type="info" showIcon title={m.pathAlert} />
        </Space>
      </Card>

      <Card>
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          <Space align="center" wrap>
            <Typography.Text strong>{m.currentPathLabel}</Typography.Text>
            <Tag color="processing">/chat/voice</Tag>
            <Typography.Text type="secondary">{m.currentPathHint}</Typography.Text>
          </Space>

          <Alert
            type={selectedChatProfile.key === 'robot' ? 'success' : 'warning'}
            showIcon
            title={m.recommendedProfileNotice}
          />

          <Space orientation="vertical" size={8} style={{ width: '100%' }}>
            <CurrentUserProfile
              title={messages.pages.userInfoDemo.currentUserTitle}
              isAnonymousMode={isAnonymousMode}
              avatar={selectedUser.avatar}
              anonymousIdText={m.anonymousUserHint}
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
                    if (!isAnonymousMode && selectedUser.key === user.key) return;
                    onAnonymousModeChange(false);
                    onSelectUser(user.key);
                  }}
                  style={
                    !isAnonymousMode && selectedUser.key === user.key
                      ? { backgroundColor: token.colorSuccess, borderColor: token.colorSuccess }
                      : undefined
                  }
                >
                  {formatSwitchLabel(user.nickname)}
                  {!isAnonymousMode && selectedUser.key === user.key ? '【当前】' : ''}
                </Button>
              ))}
              <Button
                type={isAnonymousMode ? 'primary' : 'default'}
                onClick={() => {
                  if (!isAnonymousMode) onAnonymousModeChange(true);
                }}
                style={isAnonymousMode ? { backgroundColor: token.colorSuccess, borderColor: token.colorSuccess } : undefined}
              >
                {m.buttons.switchAnonymousUser}
                {isAnonymousMode ? '【当前】' : ''}
              </Button>
            </Space>
          </Space>

          <Space wrap>
            <Button type="primary" onClick={() => (window as any).bytedesk?.showChat()}>
              {m.buttons.openVoiceAgent}
            </Button>
            <Button onClick={() => (window as any).bytedesk?.hideChat()}>
              {messages.common.buttons.closeChat}
            </Button>
            <Button
              onClick={() => window.open(sampleUrl, '_blank', 'width=460,height=760,resizable=yes,scrollbars=yes')}
            >
              {messages.common.buttons.openInNewWindow}
            </Button>
            <Button onClick={() => window.open(sampleUrl, '_blank')}>
              {messages.common.buttons.openInNewTab}
            </Button>
          </Space>

          <Alert
            type="info"
            showIcon
            title={`${messages.common.apiHintPrefix} showChat() / hideChat() / chatPath=/chat/voice`}
            style={{ alignSelf: 'flex-start', width: 'fit-content', maxWidth: '100%' }}
          />
          <Alert
            type="info"
            showIcon
            title={`咨询参数: ${chatConfigHint}`}
            style={{ alignSelf: 'flex-start', width: 'fit-content', maxWidth: '100%' }}
          />

          <div>
            <Typography.Text strong>{m.capabilityTitle}</Typography.Text>
            <ul style={{ margin: '8px 0 0', paddingLeft: 20, lineHeight: 1.8 }}>
              {m.capabilityItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div>
            <Typography.Text strong>{m.usageTitle}</Typography.Text>
            <ul style={{ margin: '8px 0 0', paddingLeft: 20, lineHeight: 1.8 }}>
              {m.usageNotes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </Space>
      </Card>

      <Card title={m.urlGuideTitle}>
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          <Typography.Text strong>{m.sampleUrlLabel}</Typography.Text>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{sampleUrl}</pre>

          <div>
            <Typography.Text strong>{m.urlParamsTitle}</Typography.Text>
            <ul style={{ margin: '8px 0 0', paddingLeft: 20, lineHeight: 1.8 }}>
              {m.urlParams.map((param) => (
                <li key={param}>{param}</li>
              ))}
            </ul>
          </div>
        </Space>
      </Card>

      <BytedeskReact {...config} />
    </PageContainer>
  );
};

export default VoiceAgentDemo;
