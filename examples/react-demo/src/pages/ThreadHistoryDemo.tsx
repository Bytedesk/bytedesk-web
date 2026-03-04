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

interface DemoPageProps {
  locale: Language;
  themeMode: BytedeskTheme['mode'];
  selectedUser: DemoUserProfile;
  isAnonymousMode: boolean;
  onSelectUser: (nextUser: DemoUserKey) => void;
  onAnonymousModeChange: (nextMode: boolean) => void;
}

const ThreadHistoryDemo = ({ locale, themeMode, selectedUser, isAnonymousMode, onSelectUser, onAnonymousModeChange }: DemoPageProps) => {
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
    chatPath: '/chat/thread',
    placement: 'bottom-right',
    marginBottom: 20,
    marginSide: 20,
    autoPopup: false,
    draggable: true,
    bubbleConfig: {
      show: true,
      icon: '🧵',
      title: messages.pages.threadHistoryDemo.bubbleTitle,
      subtitle: messages.pages.threadHistoryDemo.bubbleSubtitle
    },
    buttonConfig: {
      show: true,
      width: 60,
      height: 60
    },
    chatConfig: {
      org: 'df_org_uid',
      t: '1',
      sid: 'df_wg_uid',
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
  }), [isAnonymousMode, locale, messages, selectedUser, themeMode]);

  const docLinks = useMemo(
    () => [
      { href: 'https://www.weiyuai.cn/docs/zh-CN/docs/channel/react', label: messages.pages.threadHistoryDemo.docLinks.reactDoc },
    //   { href: 'https://github.com/Bytedesk/bytedesk-1x/frontend/apps/visitor/src/pages/Thread/index.tsx', label: messages.pages.threadHistoryDemo.docLinks.visitorRef },
      { href: 'https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/ThreadHistoryDemo.tsx', label: messages.pages.threadHistoryDemo.docLinks.reactExample }
    ],
    [messages]
  );

  const urlTemplate = useMemo(() => {
    return '{{BASE_URL}}/chat/thread?org=df_org_uid&t=1&sid=df_wg_uid&visitorUid=visitor_001&nickname=访客小明&avatar=https%3A%2F%2Fweiyuai.cn%2Fassets%2Fimages%2Favatar%2F02.jpg&lang=zh-cn&mode=light';
  }, []);

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
    return `${baseHtmlUrl}/chat/thread?${params.toString()}`;
  }, [config.chatConfig, config.htmlUrl, locale, themeMode]);

  const usageNotes = messages.pages.threadHistoryDemo.usageNotes;
  const urlParams = messages.pages.threadHistoryDemo.urlParams;
  const threadApiGuide = useMemo(() => {
    const endpoint = '/visitor/api/v1/threads';
    const apiHost = (config.apiUrl || 'https://{YOUR_API_HOST}').replace(/\/+$/, '');
    const demoOrgUid = config.chatConfig?.org || 'df_org_uid';
    const demoUid = isAnonymousMode ? 'visitor_001' : (selectedUser.visitorUid || 'visitor_001');
    const queryParams = [
      'orgUid: string（必填，组织 uid）',
      'uid: string（可选，访客实体 uid）',
      'visitorUid: string（可选，访客业务 uid，推荐传）',
      '说明：orgUid 必传；uid 和 visitorUid 至少传一个；后端会分别匹配并取并集',
      'pageNumber: number（必填，后端从 0 开始；前端第 1 页传 0）',
      'pageSize: number（必填，示例默认 10）',
      'searchText: string（可选，按关键词筛选会话）'
    ];
    const pagingMapping = [
      'UI current=1 -> pageNumber=0',
      'UI current=2 -> pageNumber=1',
      'requestKey 由 orgUid|uid|pageNumber|pageSize|searchText 组成，用于防重复请求',
      'ThreadList 侧建议同时传 uid + visitorUid，兼容历史数据中 user 字段差异',
      '命中 403 时前端会对相同请求做 30s 冷却（FORBIDDEN_COOLDOWN_MS）'
    ];
    const fullUrlPage1 = `${apiHost}${endpoint}?orgUid=${encodeURIComponent(demoOrgUid)}&uid=${encodeURIComponent(demoUid)}&visitorUid=${encodeURIComponent(demoUid)}&pageNumber=0&pageSize=10&searchText=`;
    const fullUrlPage2 = `${apiHost}${endpoint}?orgUid=${encodeURIComponent(demoOrgUid)}&uid=${encodeURIComponent(demoUid)}&visitorUid=${encodeURIComponent(demoUid)}&pageNumber=1&pageSize=10&searchText=`;
    const curlExample = `curl --request GET \\
  --url '${fullUrlPage1}'`;
    const fetchExample = `const params = new URLSearchParams({\n  orgUid: '${demoOrgUid}',\n  uid: '${demoUid}',\n  visitorUid: '${demoUid}',\n  pageNumber: '0',\n  pageSize: '10',\n  searchText: ''\n});\n\nconst resp = await fetch(\`${apiHost}${endpoint}?\${params.toString()}\`, {\n  method: 'GET',\n  credentials: 'include'\n});\nconst data = await resp.json();`;
    const anonymousHint = '匿名模式下若没有可复用 visitorUid，需要先完成 initVisitor 拿到 uid/visitorUid，再调用该接口；orgUid 必传，且推荐 uid 与 visitorUid 两者都传。';

    return { endpoint, queryParams, pagingMapping, fullUrlPage1, fullUrlPage2, curlExample, fetchExample, anonymousHint };
  }, [config.apiUrl, isAnonymousMode, selectedUser.visitorUid]);
  const formatSwitchUserLabel = (name: string) =>
    messages.pages.userInfoDemo.switchToUserLabel.replace('{{name}}', name);

  return (
    <PageContainer>
      <Card>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Typography.Title level={2} style={{ marginBottom: 0 }}>
            {messages.pages.threadHistoryDemo.title}
          </Typography.Title>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
            {messages.pages.threadHistoryDemo.description}
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
            message={messages.pages.threadHistoryDemo.pathAlert}
          />
        </Space>
      </Card>

      <Card>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Space align="center" wrap>
            <Typography.Text strong>{messages.pages.threadHistoryDemo.currentPathLabel}</Typography.Text>
            <Tag color="processing">/chat/thread</Tag>
            <Typography.Text type="secondary">{messages.pages.threadHistoryDemo.currentPathHint}</Typography.Text>
          </Space>

          <Space direction="vertical" size={8} style={{ width: '100%' }}>
            <CurrentUserProfile
              title={messages.pages.userInfoDemo.currentUserTitle}
              isAnonymousMode={isAnonymousMode}
              avatar={selectedUser.avatar}
              anonymousIdText={messages.pages.threadHistoryDemo.anonymousUserHint}
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
                {messages.pages.threadHistoryDemo.buttons.switchAnonymousUser}
                {isAnonymousMode ? '【当前】' : ''}
              </Button>
            </Space>
          </Space>

          <Space wrap>
            <Button type="primary" onClick={() => (window as any).bytedesk?.showChat()}>
              {messages.pages.threadHistoryDemo.buttons.openHistoryPage}
            </Button>
            <Button onClick={() => (window as any).bytedesk?.hideChat()}>{messages.common.buttons.closeChat}</Button>
          </Space>

          <Typography.Text type="secondary">
            {messages.common.apiHintPrefix} showChat() / hideChat()
          </Typography.Text>

          <List
            header={messages.pages.threadHistoryDemo.usageTitle}
            dataSource={usageNotes}
            renderItem={(note) => <List.Item>{note}</List.Item>}
          />
        </Space>
      </Card>

      <Card title={messages.pages.threadHistoryDemo.urlGuideTitle}>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Typography.Text strong>{messages.pages.threadHistoryDemo.urlTemplateLabel}</Typography.Text>
          <Typography.Paragraph copyable={{ text: urlTemplate }} style={{ marginBottom: 0 }}>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{urlTemplate}</pre>
          </Typography.Paragraph>

          <Typography.Text strong>{messages.pages.threadHistoryDemo.urlParamsTitle}</Typography.Text>
          <List
            size="small"
            dataSource={urlParams}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />

          <Typography.Text strong>{messages.pages.threadHistoryDemo.sampleUrlLabel}</Typography.Text>
          <Typography.Paragraph copyable={{ text: sampleUrl }} style={{ marginBottom: 0 }}>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{sampleUrl}</pre>
          </Typography.Paragraph>
        </Space>
      </Card>

      <Card title="ThreadList 接口直调说明（不依赖组件）">
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          {isAnonymousMode && (
            <Alert
              type="warning"
              showIcon
              message={threadApiGuide.anonymousHint}
            />
          )}

          <Typography.Text strong>接口 URL</Typography.Text>
          <Typography.Paragraph copyable={{ text: threadApiGuide.endpoint }} style={{ marginBottom: 0 }}>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{threadApiGuide.endpoint}</pre>
          </Typography.Paragraph>

          <Typography.Text strong>完整请求 URL（第 1 页）</Typography.Text>
          <Typography.Paragraph copyable={{ text: threadApiGuide.fullUrlPage1 }} style={{ marginBottom: 0 }}>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{threadApiGuide.fullUrlPage1}</pre>
          </Typography.Paragraph>

          <Typography.Text strong>完整请求 URL（第 2 页）</Typography.Text>
          <Typography.Paragraph copyable={{ text: threadApiGuide.fullUrlPage2 }} style={{ marginBottom: 0 }}>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{threadApiGuide.fullUrlPage2}</pre>
          </Typography.Paragraph>

          <Typography.Text strong>请求参数（Query）</Typography.Text>
          <List
            size="small"
            dataSource={threadApiGuide.queryParams}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />

          <Typography.Text strong>分页与调用行为</Typography.Text>
          <List
            size="small"
            dataSource={threadApiGuide.pagingMapping}
            renderItem={(item) => <List.Item>{item}</List.Item>}
          />

          <Typography.Text strong>curl 示例</Typography.Text>
          <Typography.Paragraph copyable={{ text: threadApiGuide.curlExample }} style={{ marginBottom: 0 }}>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{threadApiGuide.curlExample}</pre>
          </Typography.Paragraph>

          <Typography.Text strong>fetch 示例</Typography.Text>
          <Typography.Paragraph copyable={{ text: threadApiGuide.fetchExample }} style={{ marginBottom: 0 }}>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{threadApiGuide.fetchExample}</pre>
          </Typography.Paragraph>
        </Space>
      </Card>

      <BytedeskReact {...config} />
    </PageContainer>
  );
};

export default ThreadHistoryDemo;
