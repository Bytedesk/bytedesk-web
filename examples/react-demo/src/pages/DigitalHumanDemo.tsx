import { useMemo, useState, useCallback } from 'react';
import { Alert, Button, Card, FloatButton, Input, Space, Table, Tag, Typography } from 'antd';
// @ts-ignore
import { BytedeskReact } from '@bytedesk/web/adapters/react';
// @ts-ignore
import type { BytedeskConfig, Language, Theme as BytedeskTheme } from '@bytedesk/web/types';
import { getLocaleMessages } from '../locales';
import PageContainer from '../components/PageContainer';
import type { DemoUserProfile } from '../types/demo-user';
import { formatChatConfigQuery, getConsultButtonLabel, type DemoChatProfile } from '../types/chat-profile';
import { demoApiUrl, getDemoHtmlBaseUrl } from '../utils/env';
import {
  buildCurrentEmbedCodeExample,
  buildVanillaJsCurrentEmbedCodeExample,
  getCurrentEmbedCodeCopy,
  getVanillaJsCurrentEmbedCodeCopy
} from '../utils/embed-code-guide';
import { buildUrlParamRowsWithEncodeHint } from '../utils/url-param-guide';
import logger from '../utils/logger';

interface DemoPageProps {
  locale: Language;
  themeMode: BytedeskTheme['mode'];
  selectedChatProfile: DemoChatProfile;
  selectedUser: DemoUserProfile;
  isAnonymousMode: boolean;
}

type DigitalHumanPreset = {
  key: string;
  label: string;
  target: string;
};

type DigitalHumanLaunchMode = 'embed' | 'window' | 'tab';

// 数字人客服演示
const DigitalHumanDemo = ({ locale, themeMode, selectedChatProfile, selectedUser, isAnonymousMode }: DemoPageProps) => {
  const messages = useMemo(() => getLocaleMessages(locale), [locale]);
  const [lastPopupUrl, setLastPopupUrl] = useState('');
  const [lastLaunchMode, setLastLaunchMode] = useState<DigitalHumanLaunchMode | null>(null);
  const htmlBaseUrl = getDemoHtmlBaseUrl(9022);
  const embedCodeCopy = useMemo(() => getCurrentEmbedCodeCopy(locale), [locale]);
  const codeBlockStyle = useMemo(() => ({
    margin: 0,
    padding: '12px 14px',
    borderRadius: 8,
    background: 'rgba(0,0,0,0.04)',
    fontSize: 12,
    lineHeight: 1.7,
    fontFamily: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace',
    whiteSpace: 'pre-wrap' as const,
    wordBreak: 'break-all' as const
  }), []);

  // TODO: 数字人预设列表 - 后期根据实际数字人资源配置
  const digitalHumanPresets = useMemo<DigitalHumanPreset[]>(() => [
    // { key: 'dh-1', label: '数字人 1', target: 'xxx' },
  ], []);

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
      icon: '🤖',
      title: '数字人客服（开发中）',
      subtitle: 'AI 数字人实时互动'
    },
    buttonConfig: {
      show: true,
      width: 60,
      height: 60,
      action: 'chat'
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
  }), [htmlBaseUrl, isAnonymousMode, locale, selectedChatProfile, selectedUser, themeMode]);

  // TODO: 文档链接 - 后期替换为实际数字人文档地址
  const docLinks = useMemo(
    () => [
      { href: 'https://www.weiyuai.cn/docs/zh-CN/docs/channel/react', label: messages.common.docLinks.react },
      { href: 'https://www.weiyuai.cn/docs/zh-CN/docs/channel/vue', label: messages.common.docLinks.vue },
      { href: 'https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/DigitalHumanDemo.tsx', label: messages.common.docLinks.reactExample }
    ],
    [messages]
  );

  // TODO: 数字人演示示例 URL - 后期根据实际参数调整
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
    }
    params.append('lang', locale);
    params.append('mode', String(themeMode || 'light'));
    return `${htmlBaseUrl}/chat?${params.toString()}`;
  }, [htmlBaseUrl, isAnonymousMode, locale, selectedChatProfile, selectedUser, themeMode]);

  // TODO: 构建数字人聊天 URL - 后期根据实际参数调整
  const buildDigitalHumanUrl = useCallback((target?: string) => {
    const url = new URL(sampleUrl);
    if (target) {
      url.searchParams.set('target', target);
    }
    logger.debug('buildDigitalHumanUrl', { target, url: url.toString() });
    return url.toString();
  }, [sampleUrl]);

  const openDigitalHumanWindow = useCallback((target?: string) => {
    const nextUrl = buildDigitalHumanUrl(target);
    logger.debug('openDigitalHumanWindow', { target, nextUrl });
    setLastPopupUrl(nextUrl);
    setLastLaunchMode('window');
    window.open(nextUrl, '_blank', 'width=420,height=760,resizable=yes,scrollbars=yes');
  }, [buildDigitalHumanUrl]);

  const openDigitalHumanTab = useCallback((target?: string) => {
    const nextUrl = buildDigitalHumanUrl(target);
    logger.debug('openDigitalHumanTab', { target, nextUrl });
    setLastPopupUrl(nextUrl);
    setLastLaunchMode('tab');
    window.open(nextUrl, '_blank');
  }, [buildDigitalHumanUrl]);

  // TODO: 嵌入式数字人弹窗 - 后期实现 showDigitalHuman 或复用 showChat
  const showDigitalHumanPopup = useCallback((target?: string) => {
    const popupUrl = buildDigitalHumanUrl(target);
    setLastPopupUrl(popupUrl);
    setLastLaunchMode('embed');
    const widget = (window as any).bytedesk;
    if (!widget?.showChat) {
      openDigitalHumanWindow(target);
      return;
    }
    widget.showChat({
      forceRefresh: true,
      chatConfig: {
        ...config.chatConfig,
        ...(target ? { target } : {})
      }
    });
  }, [buildDigitalHumanUrl, config.chatConfig, openDigitalHumanWindow]);

  const chatConfigHint = formatChatConfigQuery(selectedChatProfile.chatConfig);
  const consultButtonLabel = useMemo(() => getConsultButtonLabel(selectedChatProfile, locale), [locale, selectedChatProfile]);

  // TODO: URL 参数说明 - 后期根据实际数字人参数补充
  const urlParamDocs = useMemo(
    () => [
      'org: 组织 ID（必填）',
      't: 会话类型（0：一对一，1：工作组，2：机器人）',
      'sid: 数字人 / 工作组 ID（必填）',
      'visitorUid: 自定义访客 ID（可选）',
      'nickname / avatar: 访客展示信息（可选）',
      'target: 数字人标识（可选）',
      'lang / mode: 语言与主题参数（可选）'
    ],
    []
  );
  const requiredUrlParams = useMemo(() => new Set(['org', 't', 'sid']), []);
  const currentUrlParamMap = useMemo(() => new URL(sampleUrl).searchParams, [sampleUrl]);
  const urlParamRows = useMemo(
    () => buildUrlParamRowsWithEncodeHint(urlParamDocs, currentUrlParamMap, locale, ['visitorUid', 'nickname', 'avatar']),
    [sampleUrl, urlParamDocs, currentUrlParamMap, locale]
  );
  const currentEmbedCodeExample = useMemo(
    () => buildCurrentEmbedCodeExample({ config }),
    [config]
  );
  const vanillaJsEmbedCodeExample = useMemo(
    () => buildVanillaJsCurrentEmbedCodeExample({ config }),
    [config]
  );
  const vanillaJsEmbedCodeCopy = useMemo(() => getVanillaJsCurrentEmbedCodeCopy(locale), [locale]);

  return (
    <PageContainer>
      {/* 标题卡片 */}
      <Card>
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          <Typography.Title level={2} style={{ marginBottom: 0 }}>
            {messages.nav.digitalHumanDemo || '🤖 数字人客服演示（开发中）'}
          </Typography.Title>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
            {/* TODO: 数字人演示描述 - 后期补充 */}
            通过数字人技术，实现 AI 驱动的拟人化客服交互体验。支持文本、语音、视频等多种交互方式。
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

      {/* 演示操作卡片 */}
      <Card>
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          <Space align="center" wrap>
            <Typography.Text strong>当前入口路径</Typography.Text>
            <Tag color="processing">/chat</Tag>
            <Typography.Text type="secondary">数字人客服通过 /chat 页面加载</Typography.Text>
          </Space>

          <Space align="center" wrap>
            <Typography.Text strong>当前演示账号</Typography.Text>
            {isAnonymousMode ? (
              <Tag>匿名访客</Tag>
            ) : (
              <>
                <Tag color="blue">{selectedUser.nickname}</Tag>
                <Tag>{selectedUser.visitorUid}</Tag>
              </>
            )}
          </Space>

          {/* 主要操作按钮 */}
          <Space wrap>
            <Button type="primary" onClick={() => showDigitalHumanPopup()}>
              {consultButtonLabel}
            </Button>
            <Button onClick={() => (window as any).bytedesk?.hideChat()}>{messages.common.buttons.closeChat}</Button>
            <Button onClick={() => openDigitalHumanWindow()}>
              {messages.common.buttons.openInNewWindow}
            </Button>
            <Button onClick={() => openDigitalHumanTab()}>
              {messages.common.buttons.openInNewTab}
            </Button>
          </Space>

          {/* 数字人预设按钮区域 */}
          {digitalHumanPresets.length > 0 && (
            <Card size="small" title="数字人预设">
              <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
                <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
                  {/* TODO: 预设说明 - 后期补充 */}
                  以下按钮可快速切换不同数字人，统一通过 /chat 页面发起会话。
                </Typography.Paragraph>
                <Space wrap>
                  {digitalHumanPresets.map((preset) => (
                    <Button key={preset.key} type="primary" onClick={() => showDigitalHumanPopup(preset.target)}>
                      {preset.label}
                    </Button>
                  ))}
                </Space>
              </Space>
            </Card>
          )}

          {/* 自定义数字人输入 */}
          <Space.Compact>
            <Input
              disabled
              placeholder="输入自定义数字人 ID（后期开放）"
              style={{ width: 220 }}
            />
            <Button disabled type="primary">
              嵌入式数字人
            </Button>
            <Button disabled>
              弹窗数字人
            </Button>
            <Button disabled>
              新标签页
            </Button>
          </Space.Compact>

          {/* API 提示 */}
          <Alert
            type="info"
            showIcon
            title={`${messages.common.apiHintPrefix} showChat() / hideChat()`}
            style={{ alignSelf: 'flex-start', width: 'fit-content', maxWidth: '100%' }}
          />
          <Alert
            type="info"
            showIcon
            title={`咨询参数: ${chatConfigHint}`}
            style={{ alignSelf: 'flex-start', width: 'fit-content', maxWidth: '100%' }}
          />

          {/* 最近操作 URL */}
          <Space align="center" size={8}>
            <Typography.Text strong>最近数字人会话 URL</Typography.Text>
            {lastLaunchMode ? (
              <Tag color="blue">
                {lastLaunchMode === 'embed' ? '嵌入式弹窗' : lastLaunchMode === 'window' ? '新窗口' : '新标签页'}
              </Tag>
            ) : null}
          </Space>
          {lastPopupUrl ? (
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{lastPopupUrl}</pre>
          ) : (
            <Typography.Text type="secondary">点击嵌入式数字人、新窗口或新标签页按钮后，将在这里显示对应 URL</Typography.Text>
          )}

          {/* 使用说明 */}
          <div>
            <Typography.Text strong>演示说明</Typography.Text>
            <ul style={{ margin: '8px 0 0', paddingLeft: 20, lineHeight: 1.8 }}>
              {/* TODO: 使用说明 - 后期补充具体步骤 */}
              <li>1. 确保后台已配置数字人资源与对话流程。</li>
              <li>2. 将 sid 配置为数字人工作组或机器人 ID。</li>
              <li>3. 通过 showChat() 或独立页面打开数字人会话。</li>
            </ul>
          </div>
        </Space>
      </Card>

      {/* URL + 参数说明卡片 */}
      <Card title="URL + 参数调用说明">
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          <Typography.Text strong>当前配置生成的示例 URL</Typography.Text>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{sampleUrl}</pre>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
            当前示例 URL 默认通过 /chat 页面加载数字人客服会话。
          </Typography.Paragraph>
          <Typography.Text strong>参数说明</Typography.Text>
          <Table
            size="small"
            bordered
            pagination={false}
            rowKey="key"
            dataSource={urlParamRows}
            columns={[
              {
                title: '参数',
                dataIndex: 'key',
                key: 'key',
                render: (value: string) => (
                  <Space size={6}>
                    <Typography.Text copyable={{ text: value }}>{value}</Typography.Text>
                    <Tag color={requiredUrlParams.has(value) ? 'error' : 'default'}>
                      {requiredUrlParams.has(value) ? '必填' : '可选'}
                    </Tag>
                  </Space>
                ),
              },
              {
                title: '当前值',
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
                title: '用途',
                dataIndex: 'purpose',
                key: 'purpose',
              },
            ]}
          />
        </Space>
      </Card>

      {/* React 嵌入代码卡片 */}
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

      {/* Vanilla JS 嵌入代码卡片 */}
      <Card title={vanillaJsEmbedCodeCopy.title} style={{ marginTop: 16 }}>
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
            {vanillaJsEmbedCodeCopy.description}
          </Typography.Paragraph>
          <Typography.Paragraph
            copyable={{ text: vanillaJsEmbedCodeExample }}
            style={{ ...codeBlockStyle, marginBottom: 0 }}
          >
            {vanillaJsEmbedCodeExample}
          </Typography.Paragraph>
        </Space>
      </Card>

      <BytedeskReact {...config} />

      <FloatButton.BackTop style={{ marginRight: 200, marginBottom: -30 }}/>
    </PageContainer>
  );
};

export default DigitalHumanDemo;
