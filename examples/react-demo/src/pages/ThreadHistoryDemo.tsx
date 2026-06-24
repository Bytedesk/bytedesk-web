import { useMemo, useState } from 'react';
import { Alert, Button, Card, Divider, FloatButton, Space, Table, Tag, Typography, theme as antdTheme } from 'antd';
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

const ThreadHistoryDemo = ({ locale, themeMode, selectedChatProfile, selectedUser, isAnonymousMode }: DemoPageProps) => {
  const messages = useMemo(() => getLocaleMessages(locale), [locale]);
  const { token } = antdTheme.useToken();
  const htmlBaseUrl = getDemoHtmlBaseUrl(9006);
  const [isThreadDetailParamEnabled, setIsThreadDetailParamEnabled] = useState<boolean>(false);
  const currentThemeColor = useMemo(() => token.colorPrimary || '#1677ff', [token.colorPrimary]);
  const currentThemeTextColor = useMemo(() => getReadableTextColor(currentThemeColor), [currentThemeColor]);
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
      threadDetail: isThreadDetailParamEnabled ? '1' : '0',
      backgroundColor: currentThemeColor,
      textColor: currentThemeTextColor,
      ...(isAnonymousMode
        ? {}
        : {
          visitorUid: selectedUser.visitorUid,
          nickname: selectedUser.nickname,
          avatar: selectedUser.avatar
        })
    },
    theme: {
      mode: themeMode,
      backgroundColor: currentThemeColor,
      textColor: currentThemeTextColor,
    },
    locale
  }), [currentThemeColor, currentThemeTextColor, htmlBaseUrl, isAnonymousMode, isThreadDetailParamEnabled, locale, messages, selectedChatProfile, selectedUser, themeMode]);

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

  // const urlTemplate = useMemo(() => {
  //   return '{{BASE_URL}}/chat/thread?visitorUid=visitor_001&lang=zh-cn&mode=light';
  // }, []);

  const sampleUrl = useMemo(() => {
    const params = new URLSearchParams();
    params.append('visitorUid', demoVisitorUid);
    params.append('lang', locale);
    params.append('mode', String(themeMode || 'light'));
    params.append('backgroundColor', currentThemeColor);
    params.append('textColor', currentThemeTextColor);
    if (isThreadDetailParamEnabled) {
      params.append('threadDetail', '1');
    }
    return `${htmlBaseUrl}/chat/thread?${params.toString()}`;
  }, [currentThemeColor, currentThemeTextColor, demoVisitorUid, htmlBaseUrl, isThreadDetailParamEnabled, locale, themeMode]);

  const usageNotes = messages.pages.threadHistoryDemo.usageNotes;
  const urlParams = messages.pages.threadHistoryDemo.urlParams;
  const requiredUrlParams = useMemo(() => new Set(['visitorUid']), []);
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
  const threadHistoryMessages = messages.pages.threadHistoryDemo;
  const threadApiGuide = useMemo(() => {
    const endpoint = '/visitor/api/v1/threads';
    const apiHost = (config.apiUrl || 'https://{YOUR_API_HOST}').replace(/\/+$/, '');
    const queryParams = threadHistoryMessages.apiGuide.queryParams;
    const pagingMapping = threadHistoryMessages.apiGuide.pagingMapping;
    const fullUrlPage1 = `${apiHost}${endpoint}?visitorUid=${encodeURIComponent(demoVisitorUid)}&pageNumber=0&pageSize=10&searchText=`;
    const fullUrlPage2 = `${apiHost}${endpoint}?visitorUid=${encodeURIComponent(demoVisitorUid)}&pageNumber=1&pageSize=10&searchText=`;
    const curlExample = `curl --request GET \\
  --url '${fullUrlPage1}'`;
    const fetchExample = `const params = new URLSearchParams({\n  visitorUid: '${demoVisitorUid}',\n  pageNumber: '0',\n  pageSize: '10',\n  searchText: ''\n});\n\nconst resp = await fetch(\`${apiHost}${endpoint}?\${params.toString()}\`, {\n  method: 'GET',\n  credentials: 'include'\n});\nconst data = await resp.json();`;
    const anonymousHint = threadHistoryMessages.apiGuide.anonymousHint;

    return { endpoint, queryParams, pagingMapping, fullUrlPage1, fullUrlPage2, curlExample, fetchExample, anonymousHint };
  }, [config.apiUrl, demoVisitorUid, threadHistoryMessages.apiGuide.anonymousHint, threadHistoryMessages.apiGuide.pagingMapping, threadHistoryMessages.apiGuide.queryParams]);
  const currentUrlParamMap = useMemo(() => new URL(sampleUrl).searchParams, [sampleUrl]);
  const urlParamRows = useMemo(
    () => buildUrlParamRowsWithEncodeHint(urlParams, currentUrlParamMap, locale, ['visitorUid']),
    [currentUrlParamMap, locale, urlParams]
  );
  const currentEmbedCodeExample = useMemo(
    () => buildCurrentEmbedCodeExample({ config }),
    [config]
  );

  const responseTopLevelFields = threadHistoryMessages.responseGuide.topLevelFields;
  const responseDataFields = threadHistoryMessages.responseGuide.dataFields;
  const threadItemFields = threadHistoryMessages.responseGuide.threadItemFields;

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
            <Space wrap>
              <Button type={isThreadDetailParamEnabled ? 'primary' : 'default'} onClick={() => setIsThreadDetailParamEnabled((prev) => !prev)}>
              {messages.pages.basicDemo.threadDetailParamLabel}: {isThreadDetailParamEnabled ? messages.pages.basicDemo.loadHistoryEnabled : messages.pages.basicDemo.loadHistoryDisabled}
            </Button>
            </Space>

            <Divider style={{ margin: '4px 0' }} />

            <Space wrap>
              <Button
                type="primary"
                onClick={() => (window as any).bytedesk?.showThread({
                  htmlUrl: htmlBaseUrl,
                  threadPath: '/chat/thread',
                  chatConfig: {
                    ...config.chatConfig,
                    backgroundColor: currentThemeColor,
                    textColor: currentThemeTextColor,
                  },
                  theme: {
                    mode: themeMode,
                    backgroundColor: currentThemeColor,
                    textColor: currentThemeTextColor,
                  },
                  forceRefresh: true,
                })}
              >
                {threadHistoryMessages.buttons.openHistoryPage}
              </Button>
            <Button onClick={() => (window as any).bytedesk?.hideChat()}>{messages.common.buttons.closeChat}</Button>
            <Button onClick={() => window.open(sampleUrl, '_blank', 'width=420,height=680,resizable=yes,scrollbars=yes')}>
              {messages.common.buttons.openInNewWindow}
            </Button>
            <Button onClick={() => window.open(sampleUrl, '_blank')}>
              {messages.common.buttons.openInNewTab}
            </Button>
            </Space>
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
          {/* <Typography.Text strong>{messages.pages.threadHistoryDemo.urlTemplateLabel}</Typography.Text> */}
          {/* <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{urlTemplate}</pre> */}

          <Typography.Text strong>{messages.pages.threadHistoryDemo.sampleUrlLabel}</Typography.Text>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{sampleUrl}</pre>

          <Typography.Text strong>{messages.pages.threadHistoryDemo.urlParamsTitle}</Typography.Text>
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

      <Card title={threadHistoryMessages.apiGuide.title}>
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          {isAnonymousMode && (
            <Alert
              type="warning"
              showIcon
              title={threadApiGuide.anonymousHint}
            />
          )}

          <Typography.Text strong>{threadHistoryMessages.apiGuide.endpointLabel}</Typography.Text>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{threadApiGuide.endpoint}</pre>

          <Typography.Text strong>{threadHistoryMessages.apiGuide.fullUrlPage1Label}</Typography.Text>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{threadApiGuide.fullUrlPage1}</pre>

          <Typography.Text strong>{threadHistoryMessages.apiGuide.fullUrlPage2Label}</Typography.Text>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{threadApiGuide.fullUrlPage2}</pre>

          <Typography.Text strong>{threadHistoryMessages.apiGuide.queryParamsTitle}</Typography.Text>
          <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8 }}>
            {threadApiGuide.queryParams.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <Typography.Text strong>{threadHistoryMessages.apiGuide.pagingMappingTitle}</Typography.Text>
          <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8 }}>
            {threadApiGuide.pagingMapping.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <Typography.Text strong>{threadHistoryMessages.apiGuide.curlExampleTitle}</Typography.Text>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{threadApiGuide.curlExample}</pre>

          <Typography.Text strong>{threadHistoryMessages.apiGuide.fetchExampleTitle}</Typography.Text>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{threadApiGuide.fetchExample}</pre>
        </Space>
      </Card>

      <Card title={threadHistoryMessages.responseGuide.title}>
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          <Typography.Text strong>{threadHistoryMessages.responseGuide.topLevelTitle}</Typography.Text>
          <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8 }}>
            {responseTopLevelFields.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <Typography.Text strong>{threadHistoryMessages.responseGuide.dataFieldsTitle}</Typography.Text>
          <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8 }}>
            {responseDataFields.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <Typography.Text strong>{threadHistoryMessages.responseGuide.threadItemFieldsTitle}</Typography.Text>
          <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8 }}>
            {threadItemFields.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Space>
      </Card>

      <BytedeskReact {...config} />

      <FloatButton.BackTop style={{ marginRight: 200, marginBottom: -30 }}/>
    </PageContainer>
  );
};

export default ThreadHistoryDemo;
