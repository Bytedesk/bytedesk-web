/**
 * 满意度评价演示：对机器人或人工服务结果进行评分
 */
import { useCallback, useMemo, useState } from 'react';
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

type RatingScenarioKey = 'chat' | 'pending' | 'followup';

const RATING_SCENARIO_ORDER: RatingScenarioKey[] = ['chat', 'pending', 'followup'];

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

const RatingDemo = ({ locale, themeMode, selectedChatProfile, selectedUser, isAnonymousMode }: DemoPageProps) => {
  const messages = useMemo(() => getLocaleMessages(locale), [locale]);
  const ratingMessages = messages.pages.ratingDemo;
  const { token } = antdTheme.useToken();
  const htmlBaseUrl = getDemoHtmlBaseUrl(9006);
  const [selectedScenarioKey, setSelectedScenarioKey] = useState<RatingScenarioKey>('chat');
  const currentThemeColor = useMemo(() => token.colorPrimary || '#1677ff', [token.colorPrimary]);
  const currentThemeTextColor = useMemo(() => getReadableTextColor(currentThemeColor), [currentThemeColor]);

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
    threadDetail: '1',
    visitorProfile: '1',
    ...(isAnonymousMode
      ? {}
      : {
          visitorUid: selectedUser.visitorUid,
          nickname: selectedUser.nickname,
          avatar: selectedUser.avatar
        })
  }), [isAnonymousMode, selectedChatProfile.chatConfig, selectedUser.avatar, selectedUser.nickname, selectedUser.visitorUid]);

  const scenarioRows = ratingMessages.routeRows;

  const buildScenarioParams = useCallback((scenarioKey: RatingScenarioKey) => {
    const params = new URLSearchParams();
    Object.entries(sharedChatConfig).forEach(([key, value]) => {
      if (value === undefined || value === null || String(value).trim() === '') {
        return;
      }
      params.append(key, String(value));
    });
    params.append('lang', locale);
    params.append('mode', String(themeMode || 'light'));
    params.append('backgroundColor', currentThemeColor);
    params.append('textColor', currentThemeTextColor);
    if (scenarioKey === 'pending' || scenarioKey === 'followup') {
      params.append('ratingIntent', scenarioKey);
    }
    return params;
  }, [currentThemeColor, currentThemeTextColor, locale, sharedChatConfig, themeMode]);

  const buildScenarioUrl = useCallback((scenarioKey: RatingScenarioKey) => {
    const pathname = scenarioKey === 'chat' ? '/chat' : '/chat/thread';
    return `${htmlBaseUrl}${pathname}?${buildScenarioParams(scenarioKey).toString()}`;
  }, [buildScenarioParams, htmlBaseUrl]);

  const sampleUrl = useMemo(() => buildScenarioUrl(selectedScenarioKey), [buildScenarioUrl, selectedScenarioKey]);

  const config = useMemo<BytedeskConfig>(() => ({
    isDebug: true,
    htmlUrl: htmlBaseUrl,
    ...(demoApiUrl ? { apiUrl: demoApiUrl } : {}),
    threadPath: '/chat/thread',
    chatPath: '/chat',
    placement: 'bottom-right',
    marginBottom: 20,
    marginSide: 20,
    autoPopup: false,
    draggable: true,
    bubbleConfig: {
      show: true,
      icon: '⭐',
      title: ratingMessages.bubbleTitle,
      subtitle: ratingMessages.bubbleSubtitle
    },
    buttonConfig: {
      show: true,
      width: 60,
      height: 60,
      action: 'thread'
    },
    chatConfig: sharedChatConfig,
    theme: {
      mode: themeMode,
      backgroundColor: currentThemeColor,
      textColor: currentThemeTextColor,
    },
    locale
  }), [currentThemeColor, currentThemeTextColor, htmlBaseUrl, locale, ratingMessages.bubbleSubtitle, ratingMessages.bubbleTitle, sharedChatConfig, themeMode]);

  const currentEmbedCodeExample = useMemo(() => buildCurrentEmbedCodeExample({ config }), [config]);

  const docLinks = useMemo(() => [
    { href: 'https://github.com/Bytedesk/bytedesk/blob/main/frontend/apps/visitorSdk/examples/react-demo/src/pages/RatingDemo.tsx', label: ratingMessages.docLinks.reactExample },
    { href: 'https://www.weiyuai.cn/docs/zh-CN/docs/development/rating', label: ratingMessages.docLinks.rateBubbleRef }
  ], [ratingMessages.docLinks.rateBubbleRef, ratingMessages.docLinks.reactExample]);

  const routeTableRows = useMemo(() => RATING_SCENARIO_ORDER.map((key) => ({
    key,
    route: scenarioRows[key].example,
    label: scenarioRows[key].label,
    purpose: scenarioRows[key].purpose,
  })), [scenarioRows]);
  const openScenarioLabel = useMemo(() => {
    const selectedLabel = scenarioRows[selectedScenarioKey].label;
    if (locale === 'zh-cn') {
      return selectedScenarioKey === 'chat' ? '发起正常对话' : `查看${selectedLabel}`;
    }
    return `View ${selectedLabel}`;
  }, [locale, scenarioRows, selectedScenarioKey]);
  const selectedScenarioPurpose = useMemo(
    () => scenarioRows[selectedScenarioKey].purpose,
    [scenarioRows, selectedScenarioKey]
  );

  const currentUrlParamMap = useMemo(() => new URL(sampleUrl).searchParams, [sampleUrl]);
  const urlParamRows = useMemo(
    () => buildUrlParamRowsWithEncodeHint(ratingMessages.urlParams, currentUrlParamMap, locale, ['visitorUid', 'nickname', 'avatar']),
    [currentUrlParamMap, locale, ratingMessages.urlParams]
  );
  const requiredUrlParams = useMemo(() => new Set(['org', 'sid', 't', 'visitorUid']), []);

  const openScenarioEmbed = useCallback((scenarioKey: RatingScenarioKey) => {
    const widget = (window as any).bytedesk;
    if (!widget?.showThread) {
      window.open(buildScenarioUrl(scenarioKey), '_blank', 'width=420,height=680,resizable=yes,scrollbars=yes');
      return;
    }
    const sharedPayload = {
      htmlUrl: htmlBaseUrl,
      chatConfig: Object.fromEntries(buildScenarioParams(scenarioKey).entries()),
      theme: {
        mode: themeMode,
        backgroundColor: currentThemeColor,
        textColor: currentThemeTextColor,
      },
      forceRefresh: true,
    };

    if (scenarioKey === 'chat') {
      widget.showChat({
        ...sharedPayload,
        chatPath: '/chat',
      });
      return;
    }

    widget.showThread({
      ...sharedPayload,
      threadPath: '/chat/thread',
    });
  }, [buildScenarioParams, buildScenarioUrl, currentThemeColor, currentThemeTextColor, htmlBaseUrl, themeMode]);

  return (
    <PageContainer>
      <Card>
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          <Typography.Title level={2} style={{ marginBottom: 0 }}>
            {ratingMessages.title}
          </Typography.Title>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
            {ratingMessages.description}
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
            <Typography.Text strong>{ratingMessages.currentPathLabel}</Typography.Text>
            <Tag color="processing">{selectedScenarioKey === 'chat' ? '/chat' : '/chat/thread'}</Tag>
            <Typography.Text type="secondary">{ratingMessages.currentPathHint}</Typography.Text>
          </Space>

          <div>
            <Typography.Text strong>{ratingMessages.selectedScenarioTitle}</Typography.Text>
            <Space wrap style={{ marginTop: 8, marginLeft: 8 }}>
              {RATING_SCENARIO_ORDER.map((scenarioKey) => (
                <Button
                  key={scenarioKey}
                  type={selectedScenarioKey === scenarioKey ? 'primary' : 'default'}
                  onClick={() => setSelectedScenarioKey(scenarioKey)}
                >
                  {scenarioRows[scenarioKey].label}
                </Button>
              ))}
            </Space>
            <Typography.Paragraph type="secondary" style={{ marginTop: 8, marginBottom: 0 }}>
              {selectedScenarioPurpose}
            </Typography.Paragraph>
          </div>

          <Divider style={{ margin: '4px 0' }} />

          <Space wrap>
            <Button type="primary" onClick={() => openScenarioEmbed(selectedScenarioKey)}>
              {openScenarioLabel}
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
            title={selectedScenarioKey === 'chat'
              ? `${messages.common.apiHintPrefix} showChat({ chatPath: '/chat' }) / hideChat()`
              : `${messages.common.apiHintPrefix} showThread({ threadPath: '/chat/thread', chatConfig: { ratingIntent: '${selectedScenarioKey}' } }) / hideChat()`}
            style={{ alignSelf: 'flex-start', width: 'fit-content', maxWidth: '100%' }}
          />

          {/* <div>
            <Typography.Text strong>{ratingMessages.usageTitle}</Typography.Text>
            <ul style={{ margin: '8px 0 0', paddingLeft: 20, lineHeight: 1.8 }}>
              {ratingMessages.usageNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div> */}
        </Space>
      </Card>

      <Card title={ratingMessages.routeTableTitle}>
        <Table
          size="small"
          bordered
          pagination={false}
          rowKey="key"
          dataSource={routeTableRows}
          columns={[
            {
              title: ratingMessages.routeTable.routeLabel,
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
              title: ratingMessages.routeTable.purposeLabel,
              dataIndex: 'purpose',
              key: 'purpose',
            },
            {
              title: ratingMessages.routeTable.exampleLabel,
              dataIndex: 'route',
              key: 'route',
              render: (value: string) => <Typography.Text copyable={{ text: value }}>{value}</Typography.Text>,
            },
          ]}
        />
      </Card>

      <Card title={ratingMessages.urlGuideTitle}>
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          <Typography.Text strong>{ratingMessages.sampleUrlLabel}</Typography.Text>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{sampleUrl}</pre>

          <Typography.Text strong>{ratingMessages.urlParamsTitle}</Typography.Text>
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

      <BytedeskReact {...config} />

      <FloatButton.BackTop style={{ marginRight: 200, marginBottom: -30 }} />
    </PageContainer>
  );
};

export default RatingDemo;
