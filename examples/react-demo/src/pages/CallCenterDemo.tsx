import { useCallback, useMemo, useState } from 'react';
import { Alert, Button, Card, Input, Space, Tag, Typography, theme as antdTheme } from 'antd';
// @ts-ignore
import { BytedeskReact } from '@bytedesk/web/adapters/react';
// @ts-ignore
import type { BytedeskConfig, Language, Theme as BytedeskTheme } from '@bytedesk/web/types';
import { getLocaleMessages } from '../locales';
import CurrentUserProfile from '../components/CurrentUserProfile';
import PageContainer from '../components/PageContainer';
import { DEMO_USER_PRESETS, type DemoUserKey, type DemoUserProfile } from '../types/demo-user';
import { formatChatConfigQuery, getConsultButtonLabel, type DemoChatProfile } from '../types/chat-profile';
import { demoApiUrl, getDemoHtmlBaseUrl } from '../utils/env';

interface DemoPageProps {
  locale: Language;
  themeMode: BytedeskTheme['mode'];
  selectedChatProfile: DemoChatProfile;
  selectedUser: DemoUserProfile;
  isAnonymousMode: boolean;
  onSelectUser: (nextUser: DemoUserKey) => void;
  onAnonymousModeChange: (nextMode: boolean) => void;
}

type AudioPreset = {
  key: string;
  label: string;
  target: string;
};

type CallLaunchMode = 'embed' | 'window' | 'tab';

const CallCenterDemo = ({ locale, themeMode, selectedChatProfile, selectedUser, isAnonymousMode, onSelectUser, onAnonymousModeChange }: DemoPageProps) => {
  const messages = useMemo(() => getLocaleMessages(locale), [locale]);
  const { token } = antdTheme.useToken();
  const [customTarget, setCustomTarget] = useState('');
  const [lastPopupUrl, setLastPopupUrl] = useState('');
  const [lastLaunchMode, setLastLaunchMode] = useState<CallLaunchMode | null>(null);
  const htmlBaseUrl = getDemoHtmlBaseUrl(9022);

  const audioPresets = useMemo<AudioPreset[]>(() => [
    { key: 'echo', label: '回声 echo', target: 'echo' },
    { key: '1000', label: '音频 1000', target: '1000' },
    // { key: '1001', label: '音频 1001', target: '1001' },
    // { key: '1002', label: '音频 1002', target: '1002' },
    // { key: '1003', label: '音频 1003', target: '1003' },
    // { key: '1004', label: '音频 1004', target: '1004' },
    // { key: '1005', label: '音频 1005', target: '1005' }
  ], []);

  const audioAiPresets = useMemo<AudioPreset[]>(() => [
    // { key: '9200', label: '音频AI 9200', target: '9200' },
    { key: '9201', label: '音频AI 9201', target: '9201' },
    // { key: '9203', label: '音频AI 9203', target: '9203' },
    // { key: '92030', label: '音频AI 92030', target: '92030' },
    // { key: '9295', label: '音频AI 9295', target: '9295' },
    // { key: '9296', label: '音频AI 9296', target: '9296' },
    // { key: '9297', label: '音频AI 9297', target: '9297' },
    // { key: '9298', label: '音频AI 9298', target: '9298' },
    // { key: '9299', label: '音频AI 9299', target: '9299' }
  ], []);

  const ivrPresets = useMemo<AudioPreset[]>(() => [
    { key: '5000', label: 'IVR 5000', target: '5000' }
  ], []);

  const audioAiTargetSet = useMemo(() => new Set(audioAiPresets.map((preset) => preset.target)), [audioAiPresets]);
  const ivrTargetSet = useMemo(() => new Set(ivrPresets.map((preset) => preset.target)), [ivrPresets]);

  const getAudioCallDisplayName = useCallback((target?: string) => {
    if (!target) {
      return undefined;
    }
    if (ivrTargetSet.has(target)) {
      return `IVR ${target}`;
    }
    return audioAiTargetSet.has(target) ? `音频AI ${target}` : `音频 ${target}`;
  }, [audioAiTargetSet, ivrTargetSet]);

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
    htmlUrl: htmlBaseUrl,
    ...(demoApiUrl ? { apiUrl: demoApiUrl } : {}),
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
      height: 60,
      action: 'call'
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
  }), [htmlBaseUrl, isAnonymousMode, locale, messages, selectedChatProfile, selectedUser, themeMode]);

  const docLinks = useMemo(
    () => [
      { href: 'https://www.weiyuai.cn/docs/zh-CN/docs/channel/react', label: messages.pages.callCenterDemo.docLinks.reactDoc },
      { href: 'https://www.weiyuai.cn/docs/zh-CN/docs/channel/vue', label: messages.pages.callCenterDemo.docLinks.vueDoc },
      { href: 'https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/CallCenterDemo.tsx', label: messages.pages.callCenterDemo.docLinks.reactExample }
    ],
    [messages]
  );

  const sampleUrl = useMemo(() => {
    const params = new URLSearchParams();
    const appendIfPresent = (key: string, value: string | undefined) => {
      if (value) {
        params.append(key, value);
      }
    };
    params.append('org', selectedChatProfile.chatConfig.org);
    params.append('t', String(selectedChatProfile.chatConfig.t));
    params.append('sid', String(selectedChatProfile.chatConfig.sid));
    if (!isAnonymousMode) {
      appendIfPresent('visitorUid', selectedUser.visitorUid);
      appendIfPresent('nickname', selectedUser.nickname);
      appendIfPresent('avatar', selectedUser.avatar);
    }
    params.append('audio', '1');
    params.append('video', '0');
    params.append('lang', locale);
    params.append('mode', String(themeMode || 'light'));
    return `${htmlBaseUrl}/call?${params.toString()}`;
  }, [htmlBaseUrl, isAnonymousMode, locale, selectedChatProfile, selectedUser, themeMode]);

  const buildAudioCallUrl = useCallback((target?: string) => {
    const url = new URL(sampleUrl);
    url.searchParams.set('audio', '1');
    url.searchParams.set('video', '0');
    if (target) {
      url.searchParams.set('target', target);
      url.searchParams.set('callNumber', target);
      url.searchParams.set('callDisplayName', getAudioCallDisplayName(target) || `Audio ${target}`);
    }
    return url.toString();
  }, [getAudioCallDisplayName, sampleUrl]);

  const openAudioCallWindow = useCallback((target?: string) => {
    const nextUrl = buildAudioCallUrl(target);
    setLastPopupUrl(nextUrl);
    setLastLaunchMode('window');
    window.open(nextUrl, '_blank', 'width=420,height=760,resizable=yes,scrollbars=yes');
  }, [buildAudioCallUrl]);

  const openAudioCallTab = useCallback((target?: string) => {
    const nextUrl = buildAudioCallUrl(target);
    setLastPopupUrl(nextUrl);
    setLastLaunchMode('tab');
    window.open(nextUrl, '_blank');
  }, [buildAudioCallUrl]);

  const showAudioCallPopup = useCallback((target?: string) => {
    const popupUrl = buildAudioCallUrl(target);
    setLastPopupUrl(popupUrl);
    setLastLaunchMode('embed');
    const widget = (window as any).bytedesk;
    if (!widget?.showCall) {
      openAudioCallWindow(target);
      return;
    }

    widget.showCall({
      forceRefresh: true,
      chatConfig: {
        ...config.chatConfig,
        audio: 1,
        video: 0,
        ...(target
          ? {
              target,
              callNumber: target,
              callDisplayName: getAudioCallDisplayName(target) || `Audio ${target}`
            }
          : {})
      }
    });
  }, [buildAudioCallUrl, config.chatConfig, getAudioCallDisplayName, openAudioCallWindow]);

  const chatConfigHint = formatChatConfigQuery(selectedChatProfile.chatConfig);
  const consultButtonLabel = useMemo(() => {
    const defaultLabel = getConsultButtonLabel(selectedChatProfile, locale);
    return locale === 'zh-cn' ? defaultLabel.replace(/^咨询/, '呼叫') : defaultLabel;
  }, [locale, selectedChatProfile]);

  const formatSwitchUserLabel = (name: string) =>
    messages.pages.userInfoDemo.switchToUserLabel.replace('{{name}}', name);

  return (
    <PageContainer>
      <Card>
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          <Typography.Title level={2} style={{ marginBottom: 0 }}>
            {messages.pages.callCenterDemo.title}
          </Typography.Title>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
            {messages.pages.callCenterDemo.description}
          </Typography.Paragraph>
          <Space orientation="vertical" size={4}>
            {docLinks.map((link) => (
              <Typography.Link key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </Typography.Link>
            ))}
          </Space>
        </Space>
      </Card>

      <Card>
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          <Space align="center" wrap>
            <Typography.Text strong>{messages.pages.callCenterDemo.currentPathLabel}</Typography.Text>
            <Tag color="processing">/call</Tag>
            <Typography.Text type="secondary">{messages.pages.callCenterDemo.currentPathHint}</Typography.Text>
          </Space>

          <Space orientation="vertical" size={8} style={{ width: '100%' }}>
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
            <Button type="primary" onClick={() => showAudioCallPopup()}>
              {consultButtonLabel}
            </Button>
            <Button onClick={() => (window as any).bytedesk?.hideChat()}>{messages.common.buttons.closeChat}</Button>
            <Button onClick={() => openAudioCallWindow()}>
              {messages.common.buttons.openInNewWindow}
            </Button>
            <Button onClick={() => openAudioCallTab()}>
              {messages.common.buttons.openInNewTab}
            </Button>
          </Space>

          <Card size="small" title="SIP/Freeswitch 呼叫演示按钮">
            <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
              <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
                下面的按钮统一通过 /call 页面发起 SIP/Freeswitch 音频会话。已保留音频呼叫、音频 AI 机器人与 IVR 预置目标；如果 SDK 尚未初始化，则自动退回到新窗口打开 /call。
              </Typography.Paragraph>
              <Alert
                type="info"
                showIcon
                title="参数说明：当前示例统一使用 audio=1&video=0 发起音频呼叫；showCall() 也使用同名参数。"
                style={{ alignSelf: 'flex-start', width: 'fit-content', maxWidth: '100%' }}
              />
              <Space orientation="vertical" size={8} style={{ width: '100%' }}>
                <Typography.Text strong>音频呼叫</Typography.Text>
                <Space wrap>
                  {audioPresets.map((preset) => (
                    <Button key={preset.key} type="primary" onClick={() => showAudioCallPopup(preset.target)}>
                      {preset.label}
                    </Button>
                  ))}
                </Space>
              </Space>
              <Space orientation="vertical" size={8} style={{ width: '100%' }}>
                <Typography.Text strong>音频AI 机器人</Typography.Text>
                <Space wrap>
                  {audioAiPresets.map((preset) => (
                    <Button key={preset.key} onClick={() => showAudioCallPopup(preset.target)}>
                      {preset.label}
                    </Button>
                  ))}
                </Space>
              </Space>
              <Space orientation="vertical" size={8} style={{ width: '100%' }}>
                <Typography.Text strong>IVR 测试</Typography.Text>
                <Space wrap>
                  {ivrPresets.map((preset) => (
                    <Button key={preset.key} onClick={() => showAudioCallPopup(preset.target)}>
                      {preset.label}
                    </Button>
                  ))}
                </Space>
              </Space>
              <Space.Compact>
                <Input
                  value={customTarget}
                  onChange={(event) => setCustomTarget(event.target.value)}
                  placeholder="输入自定义分机，例如 1006"
                  style={{ width: 220 }}
                />
                <Button type="primary" onClick={() => showAudioCallPopup(customTarget || undefined)}>
                  嵌入式呼叫
                </Button>
                <Button onClick={() => showAudioCallPopup(customTarget || undefined)}>
                  弹窗音频呼叫
                </Button>
                <Button onClick={() => openAudioCallTab(customTarget || undefined)}>
                  音频新标签页
                </Button>
              </Space.Compact>
            </Space>
          </Card>

          <Alert
            type="info"
            showIcon
            title={`${messages.common.apiHintPrefix} showCall() / hideChat()`}
            style={{ alignSelf: 'flex-start', width: 'fit-content', maxWidth: '100%' }}
          />
          <Alert
            type="info"
            showIcon
            title={`咨询参数: ${chatConfigHint}；当前呼叫示例统一传入 audio=1&video=0`}
            style={{ alignSelf: 'flex-start', width: 'fit-content', maxWidth: '100%' }}
          />
          <Space align="center" size={8}>
            <Typography.Text strong>最近呼叫 URL</Typography.Text>
            {lastLaunchMode ? (
              <Tag color="blue">
                {lastLaunchMode === 'embed' ? '嵌入式弹窗' : lastLaunchMode === 'window' ? '新窗口' : '新标签页'}
              </Tag>
            ) : null}
          </Space>
          {lastPopupUrl ? (
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{lastPopupUrl}</pre>
          ) : (
            <Typography.Text type="secondary">点击嵌入式呼叫、新窗口或新标签页按钮后，将在这里显示对应 URL</Typography.Text>
          )}

          <div>
            <Typography.Text strong>{messages.pages.callCenterDemo.usageTitle}</Typography.Text>
            <ul style={{ margin: '8px 0 0', paddingLeft: 20, lineHeight: 1.8 }}>
              {messages.pages.callCenterDemo.usageNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </Space>
      </Card>

      <Card title={messages.pages.callCenterDemo.urlGuideTitle}>
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          <Typography.Text strong>{messages.pages.callCenterDemo.sampleUrlLabel}</Typography.Text>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{sampleUrl}</pre>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
            当前示例 URL 默认附带 audio=1、video=0，可直接按音频会话打开。
          </Typography.Paragraph>
          <Typography.Text strong>音频示例 URL</Typography.Text>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{buildAudioCallUrl('1000')}</pre>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
            音频示例参数：audio=1、video=0，可选附加 target、callNumber、callDisplayName。
          </Typography.Paragraph>
        </Space>
      </Card>

      <BytedeskReact {...config} />
    </PageContainer>
  );
};

export default CallCenterDemo;
