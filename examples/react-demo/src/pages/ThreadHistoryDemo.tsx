import { useMemo } from 'react';
import { Alert, Button, Card, Space, Tag, Typography, theme as antdTheme } from 'antd';
// @ts-ignore
import { BytedeskReact } from '@bytedesk/web/adapters/react';
// @ts-ignore
import type { BytedeskConfig, Language, Theme as BytedeskTheme } from '@bytedesk/web/types';
import { getLocaleMessages } from '../locales';
import CurrentUserProfile from '../components/CurrentUserProfile';
import PageContainer from '../components/PageContainer';
import { DEMO_USER_PRESETS, type DemoUserKey, type DemoUserProfile } from '../types/demo-user';
import type { DemoChatProfile } from '../types/chat-profile';
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

const ThreadHistoryDemo = ({ locale, themeMode, selectedChatProfile, selectedUser, isAnonymousMode, onSelectUser, onAnonymousModeChange }: DemoPageProps) => {
  const messages = useMemo(() => getLocaleMessages(locale), [locale]);
  const { token } = antdTheme.useToken();
  const htmlBaseUrl = getDemoHtmlBaseUrl(9006);
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
      icon: '🧵',
      title: messages.pages.threadHistoryDemo.bubbleTitle,
      subtitle: messages.pages.threadHistoryDemo.bubbleSubtitle
    },
    buttonConfig: {
      show: true,
      width: 60,
      height: 60,
      action: 'thread'
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
      { href: 'https://www.weiyuai.cn/docs/zh-CN/docs/development/thread_history', label: messages.pages.threadHistoryDemo.docLinks.threadDoc },
      { href: 'https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/ThreadHistoryDemo.tsx', label: messages.pages.threadHistoryDemo.docLinks.reactExample }
    ],
    [messages]
  );

  const demoVisitorUid = useMemo(
    () => (isAnonymousMode ? 'visitor_001' : (selectedUser.visitorUid || 'visitor_001')),
    [isAnonymousMode, selectedUser.visitorUid]
  );

  const urlTemplate = useMemo(() => {
    return '{{BASE_URL}}/chat/thread?visitorUid=visitor_001&lang=zh-cn&mode=light';
  }, []);

  const sampleUrl = useMemo(() => {
    const params = new URLSearchParams();
    params.append('visitorUid', demoVisitorUid);
    params.append('lang', locale);
    params.append('mode', String(themeMode || 'light'));
    return `${htmlBaseUrl}/chat/thread?${params.toString()}`;
  }, [demoVisitorUid, htmlBaseUrl, locale, themeMode]);

  const usageNotes = messages.pages.threadHistoryDemo.usageNotes;
  const urlParams = useMemo(
    () => [
      'visitorUid: 当前访客业务 uid，用于查询该访客全部历史会话',
      'lang: 语言，可选，默认使用当前页面语言',
      'mode: 主题模式，可选，支持 light / dark / system'
    ],
    []
  );
  const consultButtonLabel = '查看历史会话';
  const threadApiGuide = useMemo(() => {
    const endpoint = '/visitor/api/v1/threads';
    const apiHost = (config.apiUrl || 'https://{YOUR_API_HOST}').replace(/\/+$/, '');
    const queryParams = [
      'visitorUid: string（推荐传，访客业务 uid；单独传即可拉取该访客全部历史会话）',
      'uid: string（可选，访客实体 uid；如果前端已持有实体 uid，可以一并传入做兼容匹配）',
      'orgUid: string（可选，仅当你想限制在某个组织内查询时再传）',
      '说明：uid 和 visitorUid 至少传一个；默认不传 orgUid，表示查询当前访客跨组织的全部历史会话',
      'pageNumber: number（必填，后端从 0 开始；前端第 1 页传 0）',
      'pageSize: number（必填，示例默认 10）',
      'searchText: string（可选，按关键词筛选会话）'
    ];
    const pagingMapping = [
      'UI current=1 -> pageNumber=0',
      'UI current=2 -> pageNumber=1',
      '默认 requestKey 可理解为 visitorUid|uid|pageNumber|pageSize|searchText；如果显式传了 orgUid，也会一起参与区分',
      '只要 visitorUid 稳定可复用，ThreadList 可只传 visitorUid；如果同时持有 uid，也可以一并传入兼容历史数据',
      '命中 403 时前端会对相同请求做 30s 冷却（FORBIDDEN_COOLDOWN_MS）'
    ];
    const fullUrlPage1 = `${apiHost}${endpoint}?visitorUid=${encodeURIComponent(demoVisitorUid)}&pageNumber=0&pageSize=10&searchText=`;
    const fullUrlPage2 = `${apiHost}${endpoint}?visitorUid=${encodeURIComponent(demoVisitorUid)}&pageNumber=1&pageSize=10&searchText=`;
    const curlExample = `curl --request GET \\
  --url '${fullUrlPage1}'`;
    const fetchExample = `const params = new URLSearchParams({\n  visitorUid: '${demoVisitorUid}',\n  pageNumber: '0',\n  pageSize: '10',\n  searchText: ''\n});\n\nconst resp = await fetch(\`${apiHost}${endpoint}?\${params.toString()}\`, {\n  method: 'GET',\n  credentials: 'include'\n});\nconst data = await resp.json();`;
    const anonymousHint = '匿名模式下如果已经持有稳定 visitorUid，直接只传 visitorUid 就可以查询全部历史会话；如果连 visitorUid 都没有，仍需先完成 initVisitor 拿到 uid/visitorUid。';

    return { endpoint, queryParams, pagingMapping, fullUrlPage1, fullUrlPage2, curlExample, fetchExample, anonymousHint };
  }, [config.apiUrl, demoVisitorUid]);
  const formatSwitchUserLabel = (name: string) =>
    messages.pages.userInfoDemo.switchToUserLabel.replace('{{name}}', name);

  const responseTopLevelFields = [
    'message: string — 响应描述，如 "查询成功"',
    'code: number — HTTP 状态码，200 表示成功',
    'data: object — 分页数据对象（见下方字段说明）',
  ];

  const responseDataFields = [
    'content: Thread[] — 会话列表，见下方单条会话字段说明',
    'total / totalElements: number — 总记录数',
    'totalPages: number — 总页数',
    'first: boolean — 是否第一页',
    'last: boolean — 是否最后一页',
    'numberOfElements: number — 当前页实际条数',
    'size: number — 每页大小（对应请求参数 pageSize）',
    'number: number — 当前页号（从 0 开始，对应请求参数 pageNumber）',
    'empty: boolean — 当前页是否为空',
  ];

  const threadItemFields = [
    'uid: string — 会话唯一 ID',
    'userUid: string — 接待客服（坐席）的 uid',
    'orgUid: string — 组织 uid',
    'level: string — 层级，ORGANIZATION 表示组织级',
    'platform: string — 平台标识，固定为 BYTEDESK',
    'createdAt: string — 会话创建时间，格式 yyyy-MM-dd HH:mm:ss',
    'updatedAt: string — 会话最后更新时间',
    'topic: string — 会话 topic，格式：org/agent/{agentUid}/{visitorEntityUid}',
    'content: string — 最后一条消息的原始内容（i18n key 或文本）',
    'contentObject.msgType: string — 消息类型枚举，如 TEXT / AGENT_CLOSED / AUTO_CLOSED / INVITE_AUDIO_CANCEL 等',
    'contentObject.preview: string — 用于列表展示的预览文本',
    'contentObject.payload: string — 消息实际内容（文本或 JSON 字符串）',
    'contentObject.displayText: string — 最终展示文本',
    'type: string — 会话类型：AGENT=人工客服，ROBOT=机器人，WORKGROUP=工作组',
    'status: string — 会话状态：OPEN=进行中，CLOSED=已关闭',
    'transferStatus: string — 转接状态：NONE=未转接',
    'closeType: string — 关闭方式：AGENT=客服手动关闭，AUTO=超时自动关闭，VISITOR=访客关闭',
    'channel: string — 渠道来源，WEB_VISITOR=Web 访客',
    'top: boolean — 是否置顶',
    'unread: boolean — 客服侧是否有未读消息',
    'unreadCount: number — 客服侧未读消息数',
    'visitorUnreadCount: number — 访客侧未读消息数',
    'mute: boolean — 是否静音',
    'hide: boolean — 是否隐藏',
    'star: number — 星标等级（0=未标记）',
    'fold: boolean — 是否折叠',
    'offline: boolean — 是否离线消息',
    'tagList: string[] — 标签列表',
    'note: string | null — 会话备注',
    'extra: string — JSON 字符串，包含会话扩展配置（autoCloseMin / toolbar / requireLogin 等）',
    'valid: boolean — 是否有效会话：访客有实际回复时为 true，仅系统消息时为 false',
    'allMessageCount: number — 会话总消息数（访客 + 客服 + 系统 + 机器人）',
    'visitorMessageCount: number — 访客发送消息数',
    'agentMessageCount: number — 客服发送消息数',
    'systemMessageCount: number — 系统消息数',
    'robotMessageCount: number — 机器人消息数',
    'robotToAgent: boolean — 是否从机器人转人工',
    'queueMeta: object | null — 排队元信息，未排队时为 null',
    'user: object — 访客信息（uid / nickname / avatar / type / extra）',
    'owner: object — 会话拥有者信息（通常为管理员）',
    'agent: string — 客服信息 JSON 字符串（uid / nickname / avatar / type）',
    'robot: string — 机器人信息 JSON 字符串，无机器人时为 "{}"',
    'workgroup: string — 工作组信息 JSON 字符串，无工作组时为 "{}"',
    'agentProtobuf: object — 客服结构化信息对象',
    'workgroupProtobuf: object — 工作组结构化信息对象',
    'robotProtobuf: object — 机器人结构化信息对象',
    'transfer: object | null — 转接信息，未发生转接时为 null',
    'invites: object[] — 邀请相关用户列表',
    'monitors: object[] — 监控相关用户列表',
    'assistants: object[] — 协助相关用户列表',
    'ticketors: object[] — 工单相关用户列表',
    'processInstanceId / processEntityUid: string | null — 工单流程相关 ID，不涉及工单时为 null',
  ];

  return (
    <PageContainer>
      <Card>
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          <Typography.Title level={2} style={{ marginBottom: 0 }}>
            {messages.pages.threadHistoryDemo.title}
          </Typography.Title>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
            {messages.pages.threadHistoryDemo.description}
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
            <Typography.Text strong>{messages.pages.threadHistoryDemo.currentPathLabel}</Typography.Text>
            <Tag color="processing">/chat/thread</Tag>
            <Typography.Text type="secondary">{messages.pages.threadHistoryDemo.currentPathHint}</Typography.Text>
          </Space>

          <Space orientation="vertical" size={8} style={{ width: '100%' }}>
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
            <Button type="primary" onClick={() => (window as any).bytedesk?.showThread()}>
              {consultButtonLabel}
            </Button>
            <Button onClick={() => (window as any).bytedesk?.hideChat()}>{messages.common.buttons.closeChat}</Button>
            <Button onClick={() => window.open(sampleUrl, '_blank', 'width=420,height=680,resizable=yes,scrollbars=yes')}>
              {messages.common.buttons.openInNewWindow}
            </Button>
            <Button onClick={() => window.open(sampleUrl, '_blank')}>
              {messages.common.buttons.openInNewTab}
            </Button>
          </Space>

          <Alert
            type="info"
            showIcon
            title={`${messages.common.apiHintPrefix} showThread() / hideChat()`}
            style={{ alignSelf: 'flex-start', width: 'fit-content', maxWidth: '100%' }}
          />

          <div>
            <Typography.Text strong>{messages.pages.threadHistoryDemo.usageTitle}</Typography.Text>
            <ul style={{ margin: '8px 0 0', paddingLeft: 20, lineHeight: 1.8 }}>
              {usageNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </Space>
      </Card>

      <Card title={messages.pages.threadHistoryDemo.urlGuideTitle}>
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          <Typography.Text strong>{messages.pages.threadHistoryDemo.urlTemplateLabel}</Typography.Text>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{urlTemplate}</pre>

          <Typography.Text strong>{messages.pages.threadHistoryDemo.urlParamsTitle}</Typography.Text>
          <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8 }}>
            {urlParams.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <Typography.Text strong>{messages.pages.threadHistoryDemo.sampleUrlLabel}</Typography.Text>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{sampleUrl}</pre>
        </Space>
      </Card>

      <Card title="ThreadList 接口直调说明（不依赖组件）">
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          {isAnonymousMode && (
            <Alert
              type="warning"
              showIcon
              title={threadApiGuide.anonymousHint}
            />
          )}

          <Typography.Text strong>接口 URL</Typography.Text>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{threadApiGuide.endpoint}</pre>

          <Typography.Text strong>完整请求 URL（第 1 页）</Typography.Text>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{threadApiGuide.fullUrlPage1}</pre>

          <Typography.Text strong>完整请求 URL（第 2 页）</Typography.Text>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{threadApiGuide.fullUrlPage2}</pre>

          <Typography.Text strong>请求参数（Query）</Typography.Text>
          <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8 }}>
            {threadApiGuide.queryParams.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <Typography.Text strong>分页与调用行为</Typography.Text>
          <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8 }}>
            {threadApiGuide.pagingMapping.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <Typography.Text strong>curl 示例</Typography.Text>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{threadApiGuide.curlExample}</pre>

          <Typography.Text strong>fetch 示例</Typography.Text>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{threadApiGuide.fetchExample}</pre>
        </Space>
      </Card>

      <Card title="返回结果结构说明">
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          <Typography.Text strong>顶层结构</Typography.Text>
          <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8 }}>
            {responseTopLevelFields.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <Typography.Text strong>data 分页字段</Typography.Text>
          <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8 }}>
            {responseDataFields.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <Typography.Text strong>data.content[] 单条会话（Thread）字段</Typography.Text>
          <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8 }}>
            {threadItemFields.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Space>
      </Card>

      <BytedeskReact {...config} />
    </PageContainer>
  );
};

export default ThreadHistoryDemo;
