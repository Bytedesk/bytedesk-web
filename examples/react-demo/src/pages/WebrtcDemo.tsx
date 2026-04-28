import { useMemo, useState } from 'react';
import { Alert, Button, Card, Space, Tag, Typography, theme as antdTheme } from 'antd';
// @ts-ignore
import { BytedeskReact } from '@bytedesk/web/adapters/react';
// @ts-ignore
import type { BytedeskConfig, Language, Theme as BytedeskTheme } from '@bytedesk/web/types';
import { getLocaleMessages } from '../locales';
import CurrentUserProfile from '../components/CurrentUserProfile';
import PageContainer from '../components/PageContainer';
import { DEMO_USER_PRESETS, type DemoUserKey, type DemoUserProfile } from '../types/demo-user';
import { formatChatConfigQuery, type DemoChatProfile } from '../types/chat-profile';
import { demoApiUrl, getDemoHtmlBaseUrl } from '../utils/env';

type CallMode = 'audio' | 'video';

interface WebrtcDemoProps {
  locale: Language;
  themeMode: BytedeskTheme['mode'];
  selectedChatProfile: DemoChatProfile;
  selectedUser: DemoUserProfile;
  isAnonymousMode: boolean;
  onSelectUser: (nextUser: DemoUserKey) => void;
  onAnonymousModeChange: (nextMode: boolean) => void;
}

const WebrtcDemo = ({
  locale,
  themeMode,
  selectedChatProfile,
  selectedUser,
  isAnonymousMode,
  onSelectUser,
  onAnonymousModeChange,
}: WebrtcDemoProps) => {
  const messages = useMemo(() => getLocaleMessages(locale), [locale]);
  const { token } = antdTheme.useToken();
  const m = messages.pages.webrtcDemo;
  const htmlBaseUrl = getDemoHtmlBaseUrl(9018);

  // 当前呼叫模式：默认音频客服
  const [callMode, setCallMode] = useState<CallMode>('audio');

  const isRobotMode = selectedChatProfile.key === 'robot';

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
      { href: 'https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/WebrtcDemo.tsx', label: m.docLinks.reactExample }
    ],
    [m]
  );

  /**
   * BytedeskReact config：
   * - htmlUrl: CDN/本地基础域（不含路径）
   * - webrtcPath 默认是 /webrtc，因此最终 iframe URL 为
   *   dev:  http://127.0.0.1:9018/webrtc?params
   *   prod: https://cdn.weiyuai.cn/webrtc?params
   * - chatConfig 里传 audio / video 扩展字段，generateChatUrl 会自动拼到 URL 参数
   */
  const config = useMemo<BytedeskConfig>(() => ({
    isDebug: true,
    htmlUrl: htmlBaseUrl,
    ...(demoApiUrl ? { apiUrl: demoApiUrl } : {}),
    placement: 'bottom-right',
    marginBottom: 20,
    marginSide: 20,
    autoPopup: false,
    draggable: true,
    bubbleConfig: {
      show: true,
      icon: callMode === 'audio' ? '🎙️' : '📹',
      title: callMode === 'audio' ? m.bubbleTitleAudio : m.bubbleTitleVideo,
      subtitle: callMode === 'audio' ? m.bubbleSubtitleAudio : m.bubbleSubtitleVideo,
    },
    buttonConfig: {
      show: true,
      width: 60,
      height: 60,
      action: 'webrtc',
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
      // WebRTC 专用参数
      audio: 1,
      video: callMode === 'video' ? 1 : 0,
    },
    theme: {
      mode: themeMode,
    },
    locale,
  }), [callMode, htmlBaseUrl, isAnonymousMode, locale, m, selectedChatProfile, selectedUser, themeMode]);

  /** 构建示例 URL（与 BytedeskReact 实际生成的 iframe URL 一致） */
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
    params.append('audio', '1');
    params.append('video', callMode === 'video' ? '1' : '0');
    params.append('navbar', '1');
    params.append('lang', locale);
    params.append('mode', String(themeMode || 'light'));
    return `${htmlBaseUrl}/webrtc?${params.toString()}`;
  }, [callMode, htmlBaseUrl, isAnonymousMode, locale, selectedChatProfile, selectedUser, themeMode]);

  const chatConfigHint = formatChatConfigQuery(selectedChatProfile.chatConfig);

  const formatSwitchLabel = (name: string) =>
    messages.pages.userInfoDemo.switchToUserLabel.replace('{{name}}', name);

  return (
    <PageContainer>
      {/* 标题 & 说明 */}
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

      {/* 用户 & 模式切换面板 */}
      <Card>
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          {/* 入口路径 + 当前模式 */}
          <Space align="center" wrap>
            <Typography.Text strong>{m.currentPathLabel}</Typography.Text>
            <Tag color="processing">/webrtc</Tag>
            <Typography.Text type="secondary">{m.currentPathHint}</Typography.Text>
          </Space>

          <Space align="center" wrap>
            <Typography.Text strong>{m.callMode}</Typography.Text>
            <Tag color={callMode === 'audio' ? 'blue' : 'green'}>
              {callMode === 'audio' ? m.callModeAudio : m.callModeVideo}
            </Tag>
          </Space>

          {/* 当前用户 & 切换按钮 */}
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
                onClick={() => { if (!isAnonymousMode) onAnonymousModeChange(true); }}
                style={isAnonymousMode ? { backgroundColor: token.colorSuccess, borderColor: token.colorSuccess } : undefined}
              >
                {m.buttons.switchAnonymousUser}
                {isAnonymousMode ? '【当前】' : ''}
              </Button>
            </Space>
          </Space>

          {/* 模式切换按钮 */}
          <Space wrap>
            <Button
              type={callMode === 'audio' ? 'primary' : 'default'}
              disabled={isRobotMode}
              style={!isRobotMode && callMode === 'audio' ? { backgroundColor: token.colorPrimary, borderColor: token.colorPrimary } : undefined}
              onClick={() => setCallMode('audio')}
            >
              {m.buttons.audioMode}
              {!isRobotMode && callMode === 'audio' ? '【当前】' : ''}
            </Button>
            <Button
              type={callMode === 'video' ? 'primary' : 'default'}
              disabled={isRobotMode}
              style={!isRobotMode && callMode === 'video' ? { backgroundColor: token.colorSuccess, borderColor: token.colorSuccess } : undefined}
              onClick={() => setCallMode('video')}
            >
              {m.buttons.videoMode}
              {!isRobotMode && callMode === 'video' ? '【当前】' : ''}
            </Button>
          </Space>

          {/* 控制 BytedeskReact 显示/隐藏 */}
          <Space wrap>
            <Button
              type="primary"
              disabled={isRobotMode}
              onClick={() => (window as any).bytedesk?.showWebrtc()}
            >
              {callMode === 'audio' ? m.callModeAudio : m.callModeVideo}
            </Button>
            <Button onClick={() => (window as any).bytedesk?.hideChat()}>
              {messages.common.buttons.closeChat}
            </Button>
            <Button
              disabled={isRobotMode}
              onClick={() => window.open(sampleUrl, '_blank', 'width=420,height=680,resizable=yes,scrollbars=yes')}
            >
              {messages.common.buttons.openInNewWindow}
            </Button>
            <Button
              disabled={isRobotMode}
              onClick={() => window.open(sampleUrl, '_blank')}
            >
              {messages.common.buttons.openInNewTab}
            </Button>
          </Space>
          {isRobotMode && (
            <Alert type="warning" showIcon title={m.modeLimitNotice} />
          )}

          <Alert
            type="info"
            showIcon
            title={`${messages.common.apiHintPrefix} showWebrtc() / hideChat()`}
            style={{ alignSelf: 'flex-start', width: 'fit-content', maxWidth: '100%' }}
          />
          <Alert
            type="info"
            showIcon
            title={`咨询参数: ${chatConfigHint}`}
            style={{ alignSelf: 'flex-start', width: 'fit-content', maxWidth: '100%' }}
          />

          {/* 使用说明 */}
          <div>
            <Typography.Text strong>{m.usageTitle}</Typography.Text>
            <ul style={{ margin: '8px 0 0', paddingLeft: 20, lineHeight: 1.8 }}>
              {m.usageNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </Space>
      </Card>

      {/* URL 示例 & 参数说明 */}
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

      {/* BytedeskReact 嵌入：右下角 bubble + iframe 小窗口 */}
      <BytedeskReact {...config} />
    </PageContainer>
  );
};

export default WebrtcDemo;