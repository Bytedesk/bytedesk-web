import { useMemo } from 'react';
import { Alert, Button, Card, Space, Table, Tag, Typography, theme } from 'antd';
// @ts-ignore
import { BytedeskReact } from '@bytedesk/web/adapters/react';
// @ts-ignore
import type { BytedeskConfig, Language, Theme as BytedeskTheme } from '@bytedesk/web/types';
import PageContainer from '../components/PageContainer';
import { getLocaleMessages, type DemoLanguage } from '../locales';
import type { DemoUserProfile } from '../types/demo-user';
import { demoApiUrl, getDemoHtmlBaseUrl } from '../utils/env';
import { buildUrlParamRowsWithEncodeHint } from '../utils/url-param-guide';

const DEFAULT_WORKFLOW_ORG_UID = 'df_org_uid';
const DEFAULT_LEAD_COLLECTION_WORKFLOW_UID = 'df_org_uid_df_workflow_builder';
const THREAD_TYPE_WORKFLOW_VALUE = '17';

const stringifyForCode = (value: unknown): string => {
  return JSON.stringify(value, null, 2)
    .replace(/"([^"\\]*(?:\\.[^"\\]*)*)":/g, '$1:')
    .replace(/"([^"\\]*(?:\\.[^"\\]*)*)"/g, (_match, group) => `'${String(group).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`);
};

interface ProactiveDemoProps {
  locale: Language;
  themeMode: BytedeskTheme['mode'];
  selectedUser: DemoUserProfile;
  isAnonymousMode: boolean;
}

const ProactiveDemo = ({
  locale,
  themeMode,
  selectedUser,
  isAnonymousMode,
}: ProactiveDemoProps) => {
  const htmlBaseUrl = getDemoHtmlBaseUrl(9006);
  const messages = useMemo(() => getLocaleMessages(locale as DemoLanguage), [locale]);
  const proactiveMessages = messages.pages.proactiveDemo;
  const { token } = theme.useToken();

  const config = useMemo<BytedeskConfig>(() => ({
    isDebug: true,
    htmlUrl: htmlBaseUrl,
    ...(demoApiUrl ? { apiUrl: demoApiUrl } : {}),
    placement: 'bottom-right',
    marginBottom: 20,
    marginSide: 20,
    autoPopup: false,
    draggable: true,
    buttonConfig: {
      show: false,
      width: 60,
      height: 60,
      action: 'chat',
    },
    bubbleConfig: {
      show: false,
      icon: '📞',
      title: proactiveMessages.bubbleTitle,
      subtitle: proactiveMessages.bubbleSubtitle,
    },
    chatConfig: {
      org: DEFAULT_WORKFLOW_ORG_UID,
      t: THREAD_TYPE_WORKFLOW_VALUE,
      sid: DEFAULT_LEAD_COLLECTION_WORKFLOW_UID,
      ...(isAnonymousMode
        ? {}
        : {
            visitorUid: selectedUser.visitorUid,
            nickname: selectedUser.nickname,
            avatar: selectedUser.avatar,
          }),
      navbar: '1',
      forceNewThread: true,
    },
    theme: {
      mode: themeMode,
    },
    window: {
      width: 420,
      height: 760,
    },
    locale,
  }), [htmlBaseUrl, isAnonymousMode, locale, proactiveMessages.bubbleSubtitle, proactiveMessages.bubbleTitle, selectedUser, themeMode]);

  const chatPageUrl = useMemo(() => {
    const params = new URLSearchParams();
    params.append('org', DEFAULT_WORKFLOW_ORG_UID);
    params.append('t', THREAD_TYPE_WORKFLOW_VALUE);
    params.append('sid', DEFAULT_LEAD_COLLECTION_WORKFLOW_UID);
    params.append('lang', String(locale || 'zh-cn'));
    params.append('mode', String(themeMode || 'light'));
    params.append('navbar', '1');

    if (!isAnonymousMode) {
      params.append('visitorUid', selectedUser.visitorUid);
      params.append('nickname', selectedUser.nickname);
      params.append('avatar', selectedUser.avatar);
    }

    return `${htmlBaseUrl}/chat?${params.toString()}`;
  }, [htmlBaseUrl, isAnonymousMode, locale, selectedUser, themeMode]);

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
    wordBreak: 'break-all' as const,
  }), [token.colorBorder, token.colorBorderSecondary, token.colorFillQuaternary]);

  const currentUrlParams = useMemo(
    () => new URL(chatPageUrl).searchParams,
    [chatPageUrl]
  );

  const urlParamRows = useMemo(
    () => buildUrlParamRowsWithEncodeHint(
      proactiveMessages.urlParams,
      currentUrlParams,
      locale,
      ['nickname', 'avatar']
    ),
    [currentUrlParams, locale, proactiveMessages.urlParams]
  );

  const requiredUrlParams = useMemo(() => new Set(['org', 't', 'sid']), []);

  const runtimeEmbedCodeExample = useMemo(() => {
    const runtimeConfig: BytedeskConfig = {
      isDebug: true,
      htmlUrl: htmlBaseUrl,
      ...(demoApiUrl ? { apiUrl: demoApiUrl } : {}),
      placement: 'bottom-right',
      marginBottom: 20,
      marginSide: 20,
      autoPopup: false,
      draggable: true,
      buttonConfig: {
        show: false,
        width: 60,
        height: 60,
        action: 'chat',
      },
      bubbleConfig: {
        show: false,
        icon: '📞',
        title: proactiveMessages.bubbleTitle,
        subtitle: proactiveMessages.bubbleSubtitle,
      },
      chatConfig: {
        org: DEFAULT_WORKFLOW_ORG_UID,
        t: THREAD_TYPE_WORKFLOW_VALUE,
        sid: DEFAULT_LEAD_COLLECTION_WORKFLOW_UID,
        ...(isAnonymousMode
          ? {}
          : {
              visitorUid: selectedUser.visitorUid,
              nickname: selectedUser.nickname,
              avatar: selectedUser.avatar,
            }),
        navbar: '1',
        forceNewThread: true,
      },
      theme: {
        mode: themeMode,
      },
      window: {
        width: 420,
        height: 760,
      },
      locale,
    };

    return `import { BytedeskReact } from '@bytedesk/web/adapters/react';
import type { BytedeskConfig } from '@bytedesk/web/types';

const proactiveWorkflowConfig: BytedeskConfig = ${stringifyForCode(runtimeConfig)};

export default function ProactiveWorkflowWidget() {
  return <BytedeskReact {...proactiveWorkflowConfig} />;
}`;
  }, [htmlBaseUrl, isAnonymousMode, locale, proactiveMessages.bubbleSubtitle, proactiveMessages.bubbleTitle, selectedUser, themeMode]);

  const handleOpenWorkflowChat = () => {
    (window as any).bytedesk?.showChat({
      htmlUrl: htmlBaseUrl,
      chatConfig: {
        ...config.chatConfig,
        org: DEFAULT_WORKFLOW_ORG_UID,
        t: THREAD_TYPE_WORKFLOW_VALUE,
        sid: DEFAULT_LEAD_COLLECTION_WORKFLOW_UID,
        forceNewThread: true,
      },
    });
  };

  return (
    <PageContainer>
      <Card>
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          <Typography.Title level={2} style={{ marginBottom: 0 }}>
            {proactiveMessages.title}
          </Typography.Title>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
            {proactiveMessages.description}
          </Typography.Paragraph>
          <Space wrap>
            <Tag color="gold">{proactiveMessages.tags.mobileValidation}</Tag>
            <Tag color="purple">{proactiveMessages.tags.multiTurnQa}</Tag>
          </Space>
          <Alert
            type="info"
            showIcon
            title={proactiveMessages.alertTitle}
            description={proactiveMessages.alertDescription}
          />
        </Space>
      </Card>

      <Card title={proactiveMessages.workflowCardTitle} extra={<Tag>{proactiveMessages.workflowCardTag}</Tag>}>
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          <Space wrap>
            <Button type="primary" onClick={handleOpenWorkflowChat}>
              {proactiveMessages.buttons.openWorkflowChat}
            </Button>
            <Button onClick={() => (window as any).bytedesk?.hideChat()}>
              {proactiveMessages.buttons.closeChat}
            </Button>
            <Button onClick={() => window.open(chatPageUrl, '_blank', 'width=420,height=760,resizable=yes,scrollbars=yes')}>
              {messages.common.buttons.openInNewWindow}
            </Button>
            <Button onClick={() => window.open(chatPageUrl, '_blank')}>
              {messages.common.buttons.openInNewTab}
            </Button>
          </Space>
        </Space>
      </Card>

      <Card title={proactiveMessages.urlParamsTitle}>
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
            {proactiveMessages.urlDescription}
          </Typography.Paragraph>
          <Typography.Paragraph
            copyable={{ text: chatPageUrl }}
            style={{ ...codeBlockStyle, marginBottom: 0 }}
          >
            {chatPageUrl}
          </Typography.Paragraph>
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
                render: (value: string) => {
                  const hasCopyableValue = value.trim() !== '' && value !== '-';

                  return (
                    <Typography.Paragraph
                      copyable={hasCopyableValue ? { text: value } : false}
                      style={{ marginBottom: 0, wordBreak: 'break-all' }}
                    >
                      {value}
                    </Typography.Paragraph>
                  );
                },
              },
              {
                title: messages.pages.userInfoDemo.purposeLabel,
                dataIndex: 'purpose',
                key: 'purpose',
              },
            ]}
          />
          <Typography.Text type="secondary">{messages.pages.basicDemo.manualEncodeHint}</Typography.Text>
        </Space>
      </Card>

      <Card title={proactiveMessages.embedCodeTitle} style={{ marginTop: 16 }}>
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
            {proactiveMessages.embedCodeDescription}
          </Typography.Paragraph>
          <Typography.Paragraph
            copyable={{ text: runtimeEmbedCodeExample }}
            style={{ ...codeBlockStyle, marginBottom: 0 }}
          >
            {runtimeEmbedCodeExample}
          </Typography.Paragraph>
        </Space>
      </Card>

      <BytedeskReact {...config} />
    </PageContainer>
  );
};

export default ProactiveDemo;
