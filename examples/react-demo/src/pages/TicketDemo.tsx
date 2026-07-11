/**
 * 工单演示：
 * 工单提交	当AI回复未解决问题，且无人工在线时，系统自动根据聊天内容生成工单
 * 工单状态查看	查看工单的当前处理状态
 * 工单详情查看	查看处理人、处理记录等信息
 * 历史工单查看	用户可查看自己提交过的历史工单
 * 消息提醒	接收新回复、状态变更等推送通知
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Badge, Button, Card, Divider, FloatButton, Space, Table, Tag, Typography, theme as antdTheme } from 'antd';
// @ts-ignore
import { BytedeskReact } from '@bytedesk/web/adapters/react';
// @ts-ignore
import type { BytedeskConfig, Language, Theme as BytedeskTheme } from '@bytedesk/web/types';
import { getLocaleMessages } from '../locales';
import PageContainer from '../components/PageContainer';
import type { DemoUserKey, DemoUserProfile } from '../types/demo-user';
import type { DemoChatProfile } from '../types/chat-profile';
import { demoApiUrl, getDemoHtmlBaseUrl } from '../utils/env';
import { buildUrlParamRowsWithEncodeHint } from '../utils/url-param-guide';
import { buildCurrentEmbedCodeExample, getCurrentEmbedCodeCopy } from '../utils/embed-code-guide';

interface DemoPageProps {
  locale: Language;
  themeMode: BytedeskTheme['mode'];
  selectedChatProfile: DemoChatProfile;
  selectedUser: DemoUserProfile;
  isAnonymousMode: boolean;
  onSelectUser: (nextUser: DemoUserKey) => void;
  onAnonymousModeChange: (nextMode: boolean) => void;
}

type TicketScenarioKey = 'history' | 'create' | 'notifications';

const TICKET_SCENARIO_ORDER: TicketScenarioKey[] = ['history', 'create', 'notifications'];

const OPEN_SCENARIO_BUTTON_LABELS: Record<string, Record<TicketScenarioKey, string>> = {
  'zh-cn': {
    history: '打开历史工单窗口',
    create: '打开工单提交窗口',
    notifications: '打开通知消息提醒窗口'
  },
  en: {
    history: 'Open history tickets window',
    create: 'Open create ticket window',
    notifications: 'Open message notifications window'
  }
};

const TICKET_HEADER_TOGGLE_LABELS: Record<string, { show: string; hide: string; statusVisible: string; statusHidden: string }> = {
  'zh-cn': {
    show: '显示 TicketHeader',
    hide: '隐藏 TicketHeader',
    statusVisible: '当前显示 TicketHeader',
    statusHidden: '当前隐藏 TicketHeader'
  },
  en: {
    show: 'Show TicketHeader',
    hide: 'Hide TicketHeader',
    statusVisible: 'TicketHeader visible',
    statusHidden: 'TicketHeader hidden'
  }
};

const TICKET_SUPPORT_NOTICE: Record<string, string> = {
  'zh-cn': '仅工作组时支持工单',
  en: 'Tickets are supported only in workgroup mode'
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

const TicketDemo = ({ locale, themeMode, selectedChatProfile, selectedUser, isAnonymousMode }: DemoPageProps) => {
  const messages = useMemo(() => getLocaleMessages(locale), [locale]);
  const ticketMessages = messages.pages.ticketDemo;
  const { token } = antdTheme.useToken();
  const ticketHtmlBaseUrl = getDemoHtmlBaseUrl(9017);
  const [selectedScenarioKey, setSelectedScenarioKey] = useState<TicketScenarioKey>('history');
  const [isTicketHeaderVisible, setIsTicketHeaderVisible] = useState(true);
  const [ticketNotificationUnreadCount, setTicketNotificationUnreadCount] = useState(0);
  const isTicketSupported = selectedChatProfile.key === 'workgroup';

  // 获取未读通知数：直接使用 visitorUid + orgUid 查询，后端 native query 自动 join visitor 表解析
  const fetchUnreadCount = useCallback(async () => {
    if (!isTicketSupported || isAnonymousMode || !selectedUser.visitorUid) {
      setTicketNotificationUnreadCount(0);
      return;
    }

    try {
      const baseUrl = demoApiUrl || 'https://api.weiyuai.cn';
      const orgUid = selectedChatProfile.chatConfig.org;

      const url = `${baseUrl}/visitor/api/v1/notification/query/unread/count?visitorUid=${encodeURIComponent(selectedUser.visitorUid)}&orgUid=${encodeURIComponent(orgUid)}&channel=HTTP`;
      const response = await fetch(url, { credentials: 'include' });
      if (!response.ok) return;
      const json = await response.json();
      console.log('Fetch unread notification count:', { visitorUid: selectedUser.visitorUid, orgUid, response: json });
      if (json?.code === 200) {
        setTicketNotificationUnreadCount(Number(json?.data) || 0);
      }
    } catch (err) {
      console.warn('Fetch unread notification count failed:', err);
    }
  }, [demoApiUrl, isAnonymousMode, isTicketSupported, selectedChatProfile.chatConfig.org, selectedUser.visitorUid]);

  useEffect(() => {
    fetchUnreadCount();
  }, [fetchUnreadCount]);

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

  const sharedChatConfig = useMemo(() => ({
    ...selectedChatProfile.chatConfig,
    showNavBar: '0',
    showHeader: isTicketHeaderVisible ? '1' : '0',
    ...(isAnonymousMode
      ? {}
      : {
          visitorUid: selectedUser.visitorUid,
          nickname: selectedUser.nickname,
          avatar: selectedUser.avatar
        })
  }), [isAnonymousMode, isTicketHeaderVisible, selectedChatProfile.chatConfig, selectedUser.avatar, selectedUser.nickname, selectedUser.visitorUid]);

  const currentThemeColor = useMemo(() => token.colorPrimary || '#1677ff', [token.colorPrimary]);
  const currentThemeTextColor = useMemo(
    () => getReadableTextColor(currentThemeColor),
    [currentThemeColor]
  );
  const themedChatConfig = useMemo(() => ({
    ...sharedChatConfig,
    mode: String(themeMode || 'light'),
    themeMode: String(themeMode || 'light'),
    primaryColor: currentThemeColor,
    backgroundColor: currentThemeColor,
    textColor: currentThemeTextColor,
  }), [currentThemeColor, currentThemeTextColor, sharedChatConfig, themeMode]);

  const scenarioRows = ticketMessages.routeRows;

  const buildScenarioPath = useCallback((scenarioKey: TicketScenarioKey) => {
    switch (scenarioKey) {
      case 'create':
        return '/ticket/create';
      case 'notifications':
        return '/ticket/notifications';
      case 'history':
      default:
        return '/ticket/history';
    }
  }, []);

  const buildScenarioUrl = useCallback((scenarioKey: TicketScenarioKey) => {
    const params = new URLSearchParams();
    Object.entries(sharedChatConfig).forEach(([key, value]) => {
      if (value === undefined || value === null || String(value).trim() === '') {
        return;
      }
      params.append(key, String(value));
    });
    params.append('lang', locale);
    params.append('mode', String(themeMode || 'light'));
    params.append('primaryColor', currentThemeColor);
    params.append('backgroundColor', currentThemeColor);
    params.append('textColor', currentThemeTextColor);
    return `${ticketHtmlBaseUrl}${buildScenarioPath(scenarioKey)}?${params.toString()}`;
  }, [buildScenarioPath, currentThemeColor, currentThemeTextColor, locale, sharedChatConfig, themeMode, ticketHtmlBaseUrl]);

  const selectedScenarioPath = useMemo(() => buildScenarioPath(selectedScenarioKey), [buildScenarioPath, selectedScenarioKey]);
  const sampleUrl = useMemo(() => buildScenarioUrl(selectedScenarioKey), [buildScenarioUrl, selectedScenarioKey]);

  const config = useMemo<BytedeskConfig>(() => ({
    isDebug: true,
    htmlUrl: ticketHtmlBaseUrl,
    ...(demoApiUrl ? { apiUrl: demoApiUrl } : {}),
    ticketPath: selectedScenarioPath,
    chatPath: selectedScenarioPath,
    placement: 'bottom-right',
    marginBottom: 20,
    marginSide: 20,
    autoPopup: false,
    draggable: true,
    bubbleConfig: {
      show: true,
      icon: '🎫',
      title: ticketMessages.bubbleTitle,
      subtitle: ticketMessages.bubbleSubtitle
    },
    buttonConfig: {
      show: true,
      width: 60,
      height: 60,
      action: 'ticket'
    },
    chatConfig: sharedChatConfig,
    theme: {
      mode: themeMode,
      backgroundColor: currentThemeColor,
      textColor: currentThemeTextColor,
    },
    locale
  }), [currentThemeColor, currentThemeTextColor, locale, selectedScenarioPath, sharedChatConfig, themeMode, ticketHtmlBaseUrl, ticketMessages.bubbleSubtitle, ticketMessages.bubbleTitle]);

  const currentEmbedCodeExample = useMemo(() => buildCurrentEmbedCodeExample({ config }), [config]);

  const docLinks = useMemo(() => [
    { href: 'https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/TicketDemo.tsx', label: ticketMessages.docLinks.reactExample },
    { href: 'https://www.weiyuai.cn/docs/zh-CN/docs/development/ticket', label: ticketMessages.docLinks.agentTicketDocs },
    { href: 'https://www.weiyuai.cn/docs/zh-CN/docs/development/ticket_visitor', label: ticketMessages.docLinks.visitorTicketDocs },
    { href: 'https://www.weiyuai.cn/ticket?org=df_org_uid&t=1&sid=df_wg_uid&visitorUid=visitor_001&nickname=%E7%94%A8%E6%88%B7%E5%B0%8F%E6%98%8E&avatar=https%3A%2F%2Fweiyuai.cn%2Fassets%2Fimages%2Favatar%2F02.jpg&lang=zh-cn&', label: ticketMessages.docLinks.ticketDemoPreview }
  ], [ticketMessages.docLinks.reactExample, ticketMessages.docLinks.agentTicketDocs, ticketMessages.docLinks.visitorTicketDocs]);

  const routeTableRows = useMemo(() => TICKET_SCENARIO_ORDER.map((key) => ({
    key,
    route: scenarioRows[key].example,
    label: scenarioRows[key].label,
    purpose: scenarioRows[key].purpose,
  })), [scenarioRows]);
  const selectedScenarioOpenLabel = (OPEN_SCENARIO_BUTTON_LABELS[locale] || OPEN_SCENARIO_BUTTON_LABELS.en)[selectedScenarioKey];
  const ticketHeaderToggleLabels = TICKET_HEADER_TOGGLE_LABELS[locale] || TICKET_HEADER_TOGGLE_LABELS.en;
  const ticketSupportNotice = TICKET_SUPPORT_NOTICE[locale] || TICKET_SUPPORT_NOTICE.en;

  const currentUrlParamMap = useMemo(() => new URL(sampleUrl).searchParams, [sampleUrl]);
  const urlParamRows = useMemo(
    () => buildUrlParamRowsWithEncodeHint(ticketMessages.urlParams, currentUrlParamMap, locale, ['visitorUid', 'nickname', 'avatar']),
    [currentUrlParamMap, locale, ticketMessages.urlParams]
  );
  const requiredUrlParams = useMemo(() => new Set(['org', 'sid', 't', 'showNavBar']), []);

  const openScenarioEmbed = useCallback((scenarioKey: TicketScenarioKey) => {
    if (!isTicketSupported) {
      return;
    }
    const widget = (window as any).bytedesk;
    const nextPath = buildScenarioPath(scenarioKey);
    if (!widget?.showChat && !widget?.showTicket) {
      window.open(buildScenarioUrl(scenarioKey), '_blank', 'width=440,height=760,resizable=yes,scrollbars=yes');
      return;
    }
    if (widget?.showTicket) {
      widget.showTicket({
        htmlUrl: ticketHtmlBaseUrl,
        ticketPath: nextPath,
        chatConfig: themedChatConfig,
        theme: {
          mode: themeMode,
          backgroundColor: currentThemeColor,
          textColor: currentThemeTextColor,
        },
        forceRefresh: true,
      });
      return;
    }
    widget.showChat({
      htmlUrl: ticketHtmlBaseUrl,
      chatPath: nextPath,
      chatConfig: themedChatConfig,
      theme: {
        mode: themeMode,
        backgroundColor: currentThemeColor,
        textColor: currentThemeTextColor,
      },
      forceRefresh: true,
    });
  }, [buildScenarioPath, buildScenarioUrl, currentThemeColor, currentThemeTextColor, isTicketSupported, themeMode, themedChatConfig, ticketHtmlBaseUrl]);

  return (
    <PageContainer>
      <Card>
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          <Typography.Title level={2} style={{ marginBottom: 0 }}>
            {ticketMessages.title}
          </Typography.Title>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
            {ticketMessages.description}
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
          {!isTicketSupported && (
            <Alert
              type="warning"
              showIcon
              title={ticketSupportNotice}
              style={{ width: '100%' }}
            />
          )}

          <Space align="center" wrap>
            <Typography.Text strong>{ticketMessages.currentPathLabel}</Typography.Text>
            <Tag color="processing">{selectedScenarioPath}</Tag>
            <Typography.Text type="secondary">{ticketMessages.currentPathHint}</Typography.Text>
          </Space>

          <div>
            <Typography.Text strong>{ticketMessages.selectedScenarioTitle}</Typography.Text>
            <Space wrap style={{ marginTop: 8, marginLeft: 8 }}>
              {TICKET_SCENARIO_ORDER.map((scenarioKey) => (
                <Button
                  key={scenarioKey}
                  type={selectedScenarioKey === scenarioKey ? 'primary' : 'default'}
                  disabled={!isTicketSupported}
                  onClick={() => {
                    setSelectedScenarioKey(scenarioKey);
                    if (scenarioKey === 'notifications') {
                      fetchUnreadCount();
                    }
                  }}
                >
                  {scenarioKey === 'notifications' && ticketNotificationUnreadCount > 0 ? (
                    <Badge count={ticketNotificationUnreadCount} size="small" offset={[4, -4]}>
                      {scenarioRows[scenarioKey].label}
                    </Badge>
                  ) : (
                    scenarioRows[scenarioKey].label
                  )}
                </Button>
              ))}
            </Space>
          </div>

          <Space align="center" wrap>
            <Typography.Text strong>TicketHeader</Typography.Text>
            <Tag color={isTicketHeaderVisible ? 'success' : 'default'}>
              {isTicketHeaderVisible ? ticketHeaderToggleLabels.statusVisible : ticketHeaderToggleLabels.statusHidden}
            </Tag>
            <Button disabled={!isTicketSupported} onClick={() => setIsTicketHeaderVisible((current) => !current)}>
              {isTicketHeaderVisible ? ticketHeaderToggleLabels.hide : ticketHeaderToggleLabels.show}
            </Button>
          </Space>

          <Divider style={{ margin: '4px 0' }} />

          <Space wrap>
            <Button type="primary" disabled={!isTicketSupported} onClick={() => openScenarioEmbed(selectedScenarioKey)}>
              {selectedScenarioOpenLabel}
            </Button>
            <Button disabled={!isTicketSupported} onClick={() => (window as any).bytedesk?.hideChat()}>{ticketMessages.buttons.closeTicket}</Button>
            <Button disabled={!isTicketSupported} onClick={() => window.open(sampleUrl, '_blank', 'width=440,height=760,resizable=yes,scrollbars=yes')}>
              {messages.common.buttons.openInNewWindow}
            </Button>
            <Button disabled={!isTicketSupported} onClick={() => window.open(sampleUrl, '_blank')}>
              {messages.common.buttons.openInNewTab}
            </Button>
          </Space>

          <Alert
            type="info"
            showIcon
            title={`${messages.common.apiHintPrefix} showTicket({ ticketPath: '${selectedScenarioPath}', theme: { mode, backgroundColor, textColor } }) / hideChat()`}
            style={{ alignSelf: 'flex-start', width: 'fit-content', maxWidth: '100%' }}
          />

          {/* <div>
            <Typography.Text strong>{ticketMessages.usageTitle}</Typography.Text>
            <ul style={{ margin: '8px 0 0', paddingLeft: 20, lineHeight: 1.8 }}>
              {ticketMessages.usageNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div> */}
        </Space>
      </Card>

      <Card title={ticketMessages.routeTableTitle}>
        <Table
          size="small"
          bordered
          pagination={false}
          rowKey="key"
          dataSource={routeTableRows}
          columns={[
            {
              title: ticketMessages.routeTable.routeLabel,
              dataIndex: 'label',
              key: 'label',
              render: (value: string, record: { route: string }) => (
                <Space orientation="vertical" size={0}>
                  <Typography.Text strong>{value}</Typography.Text>
                  <Typography.Text type="secondary">{record.route}</Typography.Text>
                </Space>
              ),
            },
            {
              title: ticketMessages.routeTable.purposeLabel,
              dataIndex: 'purpose',
              key: 'purpose',
            },
            {
              title: ticketMessages.routeTable.exampleLabel,
              dataIndex: 'route',
              key: 'route',
              render: (value: string) => <Typography.Text copyable={{ text: value }}>{value}</Typography.Text>,
            },
          ]}
        />
      </Card>

      <Card title={ticketMessages.urlGuideTitle}>
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          <Typography.Text strong>{ticketMessages.sampleUrlLabel}</Typography.Text>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{sampleUrl}</pre>

          <Typography.Text strong>{ticketMessages.urlParamsTitle}</Typography.Text>
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
                render: (value: string) => (
                  <Typography.Paragraph
                    copyable={value.trim() !== '' && value !== '-' ? { text: value } : false}
                    style={{ marginBottom: 0, wordBreak: 'break-all' }}
                  >
                    {value}
                  </Typography.Paragraph>
                ),
              },
              {
                title: messages.pages.userInfoDemo.purposeLabel,
                dataIndex: 'purpose',
                key: 'purpose',
              },
            ]}
          />
        </Space>
      </Card>

      <Card title={ticketMessages.notificationApiTitle}>
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
            {ticketMessages.notificationApiDescription}
          </Typography.Paragraph>

          <Space align="center" wrap>
            <Tag color="blue">{ticketMessages.notificationApiMethodLabel}: GET</Tag>
            <Typography.Text copyable strong style={{ fontFamily: 'monospace', fontSize: 13 }}>
              /visitor/api/v1/notification/query/unread/count
            </Typography.Text>
          </Space>

          <Typography.Text strong>{ticketMessages.notificationApiRequestExample}</Typography.Text>
          <pre style={{ ...codeBlockStyle }}>
{`GET ${demoApiUrl || 'https://api.weiyuai.cn'}/visitor/api/v1/notification/query/unread/count?visitorUid=visitor_001&orgUid=df_org_uid&channel=HTTP`}
</pre>

          <Typography.Text strong>{ticketMessages.notificationApiParamsTitle}</Typography.Text>
          <Table
            size="small"
            bordered
            pagination={false}
            rowKey="key"
            dataSource={[
              { key: 'visitorUid', required: true, description: ticketMessages.notificationApiParams[0] },
              { key: 'orgUid', required: true, description: ticketMessages.notificationApiParams[1] },
              { key: 'channel', required: true, description: ticketMessages.notificationApiParams[2] },
              { key: 'userUid', required: false, description: ticketMessages.notificationApiParams[3] },
            ]}
            columns={[
              {
                title: messages.pages.userInfoDemo.parameterLabel,
                dataIndex: 'key',
                key: 'key',
                render: (value: string, record) => (
                  <Space size={6}>
                    <Typography.Text copyable={{ text: value }}>{value}</Typography.Text>
                    <Tag color={record.required ? 'error' : 'default'}>
                      {record.required ? messages.pages.userInfoDemo.requiredLabel : messages.pages.userInfoDemo.optionalLabel}
                    </Tag>
                  </Space>
                ),
              },
              {
                title: messages.pages.userInfoDemo.purposeLabel,
                dataIndex: 'description',
                key: 'description',
              },
            ]}
          />

          <Typography.Text strong>{ticketMessages.notificationApiResponseExample}</Typography.Text>
          <pre style={{ ...codeBlockStyle }}>
{`{
  "message": "success",
  "code": 200,
  "data": 2
}`}
</pre>

          <Alert
            type="warning"
            showIcon
            title={ticketMessages.notificationApiNoteTitle}
            description={ticketMessages.notificationApiNoteContent}
            style={{ width: '100%' }}
          />
        </Space>
      </Card>

      <Card title={embedCodeCopy.title}>
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
            {embedCodeCopy.description}
          </Typography.Paragraph>
          <Typography.Paragraph copyable={{ text: currentEmbedCodeExample }} style={{ ...codeBlockStyle, marginBottom: 0 }}>
            {currentEmbedCodeExample}
          </Typography.Paragraph>
        </Space>
      </Card>

      <BytedeskReact {...config} />

      <FloatButton.BackTop style={{ marginRight: 200, marginBottom: -30 }} />
    </PageContainer>
  );
};

export default TicketDemo;
