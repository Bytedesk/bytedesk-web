/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2025-09-15 18:00:00
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-09-15 16:35:34
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM –
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license.
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE
 *  contact: 270580156@qq.com
 *  联系：270580156@qq.com
 * Copyright (c) 2025 by bytedesk.com, All Rights Reserved.
 */
import { useEffect, useMemo, useState } from 'react';
// @ts-ignore
import { BytedeskReact } from '@bytedesk/web/adapters/react';
// @ts-ignore
import type { BytedeskConfig, FeedbackConfig, FeedbackData, Language, Theme as BytedeskTheme } from '@bytedesk/web/types';
import { Alert, Button, Card, Col, List, Row, Space, Tag, Typography, theme } from 'antd';
import InstallGuide from '../components/InstallGuide';
import { getLocaleMessages } from '../locales';
import PageContainer from '../components/PageContainer';

interface DemoPageProps {
  locale: Language;
  themeMode: BytedeskTheme['mode'];
}

type FeedbackLog = FeedbackData & {
  timestamp: number;
  categoryList: string[];
};

const normalizeCategories = (input?: string | string[]) => {
  if (!input) {
    return [];
  }

  if (Array.isArray(input)) {
    return input.map((item) => item.trim()).filter(Boolean);
  }

  return input
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
};

const DocumentFeedbackDemo = ({ locale, themeMode }: DemoPageProps) => {
  const messages = useMemo(() => getLocaleMessages(locale), [locale]);
  const { token } = theme.useToken();
  const [feedbackLogs, setFeedbackLogs] = useState<FeedbackLog[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const createFeedbackConfig = (): FeedbackConfig => ({
    enabled: true,
    trigger: 'selection',
    showOnSelection: true,
    selectionText: messages.pages.documentFeedbackDemo.feedbackConfigText.selectionText,
    dialogTitle: messages.pages.documentFeedbackDemo.feedbackConfigText.dialogTitle,
    placeholder: messages.pages.documentFeedbackDemo.feedbackConfigText.placeholder,
    submitText: messages.pages.documentFeedbackDemo.feedbackConfigText.submitText,
    cancelText: messages.pages.documentFeedbackDemo.feedbackConfigText.cancelText,
    successMessage: messages.pages.documentFeedbackDemo.feedbackConfigText.successMessage,
    categoryNames: messages.pages.documentFeedbackDemo.feedbackConfigText.categoryNames,
    requiredTypes: false,
    typesSectionTitle: messages.pages.documentFeedbackDemo.feedbackConfigText.typesSectionTitle,
    typesDescription: messages.pages.documentFeedbackDemo.feedbackConfigText.typesDescription,
    submitScreenshot: true,
    onSubmit: (feedbackData: FeedbackData) => {
      const list = normalizeCategories(feedbackData.categoryNames);
      setFeedbackLogs((prev) => [
        {
          ...feedbackData,
          timestamp: Date.now(),
          categoryList: list
        },
        ...prev
      ]);
    },
    onCancel: () => {
      console.log('[DocumentFeedbackDemo] feedback dialog cancelled');
    }
  });

  const [config, setConfig] = useState<BytedeskConfig>(() => ({
    isDebug: true,
    ...(process.env.NODE_ENV === 'development'
      ? {
          htmlUrl: 'http://127.0.0.1:9006',
          apiUrl: 'http://127.0.0.1:9003'
        }
      : {}),
    placement: 'bottom-right',
    marginBottom: 20,
    marginSide: 20,
    inviteConfig: { show: false },
    tabsConfig: {
      home: false,
      messages: true,
      help: false,
      news: false
    },
    bubbleConfig: { show: false },
    buttonConfig: {
      show: true,
      width: 60,
      height: 60
    },
    feedbackConfig: createFeedbackConfig(),
    chatConfig: {
      org: 'df_org_uid',
      t: '2',
      sid: 'df_rt_uid'
    },
    locale,
    theme: {
      mode: themeMode
    }
  }));

  useEffect(() => {
    const localizedConfig = createFeedbackConfig();
    setConfig((prevConfig: BytedeskConfig) => ({
      ...prevConfig,
      locale,
      theme: {
        ...(prevConfig.theme || {}),
        mode: themeMode
      },
      feedbackConfig: prevConfig.feedbackConfig
        ? {
            ...prevConfig.feedbackConfig,
            ...localizedConfig
          }
        : localizedConfig
    }));
  }, [locale, messages, themeMode]);

  const handleInit = () => {
    console.log('[DocumentFeedbackDemo] BytedeskReact initialized');

    setTimeout(() => {
      const bytedesk = (window as any).bytedesk;
      if (bytedesk) {
        console.log('[DocumentFeedbackDemo] BytedeskWeb instance ready');
        setIsInitialized(true);
      } else {
        console.error('[DocumentFeedbackDemo] BytedeskWeb instance missing');
        setIsInitialized(false);
        setTimeout(() => {
          const retryBytedesk = (window as any).bytedesk;
          if (retryBytedesk) {
            console.log('[DocumentFeedbackDemo] BytedeskWeb instance found on retry');
            setIsInitialized(true);
          } else {
            console.error('[DocumentFeedbackDemo] Instance still missing');
          }
        }, 1000);
      }
    }, 100);
  };

  const checkFunctionStatus = () => {
    const bytedesk = (window as any).bytedesk;

    const tooltip = document.querySelector('[data-bytedesk-feedback="tooltip"]');
    const dialog = document.querySelector('[data-bytedesk-feedback="dialog"]');
    const status = {
      bytedeskInstance: !!bytedesk,
      html2canvas: !!(window as any).html2canvas,
      feedbackFunction: !!(bytedesk && bytedesk.showDocumentFeedback),
      tooltipElement: !!tooltip,
      dialogElement: !!dialog,
      feedbackEnabled: bytedesk?.config?.feedbackConfig?.enabled
    };

    console.table(status);

    const yesLabel = messages.pages.documentFeedbackDemo.alerts.available;
    const noLabel = messages.pages.documentFeedbackDemo.alerts.missing;
    const statusLabels = messages.pages.documentFeedbackDemo.alerts.statusLabels;
    const reportLines = [
      `${statusLabels.bytedeskInstance}: ${status.bytedeskInstance ? yesLabel : noLabel}`,
      `${statusLabels.html2canvas}: ${status.html2canvas ? yesLabel : noLabel}`,
      `${statusLabels.feedbackFunction}: ${status.feedbackFunction ? yesLabel : noLabel}`,
      `${statusLabels.feedbackEnabled}: ${status.feedbackEnabled ? yesLabel : noLabel}`,
      `${statusLabels.tooltipElement}: ${status.tooltipElement ? yesLabel : noLabel}`,
      `${statusLabels.dialogElement}: ${status.dialogElement ? yesLabel : noLabel}`
    ];

    alert(`${messages.pages.documentFeedbackDemo.alerts.statusReportTitle}\n\n${reportLines.join('\n')}\n\n${messages.pages.documentFeedbackDemo.alerts.statusReportFooter}`);
  };

  const triggerManualFeedback = () => {
    const bytedesk = (window as any).bytedesk;
    console.log('[DocumentFeedbackDemo] triggerManualFeedback', bytedesk);

    if (bytedesk) {
      if (bytedesk.showDocumentFeedback) {
        bytedesk.showDocumentFeedback(messages.pages.documentFeedbackDemo.manualTriggerMessage);
      } else {
        alert(messages.pages.documentFeedbackDemo.alerts.showFeedbackMissing);
      }
    } else {
      let retryCount = 0;
      const maxRetries = 5;

      const retryCheck = () => {
        retryCount++;
        const retryBytedesk = (window as any).bytedesk;

        if (retryBytedesk && retryBytedesk.showDocumentFeedback) {
          console.log(`[DocumentFeedbackDemo] instance ready after retry ${retryCount}`);
          retryBytedesk.showDocumentFeedback(messages.pages.documentFeedbackDemo.manualTriggerMessage);
        } else if (retryCount < maxRetries) {
          console.log(`[DocumentFeedbackDemo] waiting for instance (retry ${retryCount})`);
          setTimeout(retryCheck, 500);
        } else {
          alert(messages.pages.documentFeedbackDemo.alerts.retryTimeout);
        }
      };

      retryCheck();
    }
  };

  const forceInitFeedback = () => {
    const bytedesk = (window as any).bytedesk;
    if (bytedesk) {
      if (typeof bytedesk.getDebugInfo === 'function') {
        const debugInfo = bytedesk.getDebugInfo();
        console.log('[DocumentFeedbackDemo] debug info', debugInfo);
      }

      if (typeof bytedesk.forceInitFeedbackFeature === 'function') {
        const result = bytedesk.forceInitFeedbackFeature();
        console.log('[DocumentFeedbackDemo] force init result', result);
      } else {
        console.error('[DocumentFeedbackDemo] forceInitFeedbackFeature not found, applying fallback config');
        if (!bytedesk.config.feedbackConfig) {
          bytedesk.config.feedbackConfig = {};
        }
        bytedesk.config.feedbackConfig.enabled = true;
        bytedesk.config.feedbackConfig.trigger = 'selection';
        bytedesk.config.feedbackConfig.showOnSelection = true;

        if (bytedesk.reinitFeedbackFeature) {
          bytedesk.reinitFeedbackFeature();
        }
      }

      setTimeout(() => {
        if (typeof bytedesk.showDocumentFeedback === 'function') {
          alert(messages.pages.documentFeedbackDemo.alerts.forceInitSuccess);
        } else {
          alert(messages.pages.documentFeedbackDemo.alerts.forceInitFailed);
        }
      }, 200);
    } else {
      console.error('[DocumentFeedbackDemo] BytedeskWeb instance not found');
      alert(messages.pages.documentFeedbackDemo.alerts.missingInstance);
    }
  };

  const testTooltipDisplay = () => {
    const bytedesk = (window as any).bytedesk;
    if (bytedesk) {
      console.log('[DocumentFeedbackDemo] testTooltipDisplay');
      if (bytedesk.testTextSelection) {
        bytedesk.testTextSelection(messages.pages.documentFeedbackDemo.testSelectionText);
      } else {
        bytedesk.selectedText = messages.pages.documentFeedbackDemo.testSelectionText;
        const tooltip = document.querySelector('[data-bytedesk-feedback="tooltip"]');
        if (tooltip) {
          const tooltipEl = tooltip as HTMLElement;
          tooltipEl.style.display = 'block';
          tooltipEl.style.opacity = '1';
          tooltipEl.style.left = '100px';
          tooltipEl.style.top = '100px';
          tooltipEl.style.position = 'fixed';
          tooltipEl.style.zIndex = '999999';
        } else {
          const testTooltip = document.createElement('div');
          testTooltip.style.cssText = `
            position: fixed;
            left: 100px;
            top: 100px;
            background: ${token.colorPrimary};
            color: white;
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 14px;
            cursor: pointer;
            z-index: 999999;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          `;
          testTooltip.textContent = messages.pages.documentFeedbackDemo.tooltipFallbackText;
          document.body.appendChild(testTooltip);

          setTimeout(() => {
            if (document.body.contains(testTooltip)) {
              document.body.removeChild(testTooltip);
            }
          }, 3000);
        }
      }
    } else {
      console.error('[DocumentFeedbackDemo] BytedeskWeb instance missing');
    }
  };

  const clearFeedbackLogs = () => {
    setFeedbackLogs([]);
  };

  const inspectRuntimeState = () => {
    const bytedesk = (window as any).bytedesk;
    if (!bytedesk) {
      alert(messages.pages.documentFeedbackDemo.alerts.missingInstance);
      return;
    }

    const tooltip = document.querySelector('[data-bytedesk-feedback="tooltip"]');
    const statusLabels = messages.pages.documentFeedbackDemo.alerts.statusLabels;
    const statusLines = [
      `${statusLabels.selectedText}: ${bytedesk.selectedText || ''}`,
      `${statusLabels.lastSelection}: ${bytedesk.lastSelectionText || ''}`,
      `${statusLabels.tooltipVisible}: ${bytedesk.isTooltipVisible}`,
      `${statusLabels.tooltipElement}: ${!!tooltip}`,
      `${statusLabels.currentSelection}: ${(window.getSelection()?.toString() || '')}`
    ];

    alert(`${messages.pages.documentFeedbackDemo.alerts.statusReportTitle}\n\n${statusLines.join('\n')}\n\n${messages.pages.documentFeedbackDemo.alerts.statusReportFooter}`);
  };

  const docLinks = useMemo(
    () => [
      { href: 'https://www.weiyuai.cn/docs/zh-CN/docs/channel/react', label: messages.pages.documentFeedbackDemo.docLinks.reactDoc },
      { href: 'https://www.weiyuai.cn/docs/zh-CN/docs/channel/vue', label: messages.pages.documentFeedbackDemo.docLinks.vueDoc },
      { href: 'https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/DocumentFeedbackDemo.tsx', label: messages.pages.documentFeedbackDemo.docLinks.reactExample }
    ],
    [messages]
  );

  const setupSteps = useMemo(
    () => [...messages.pages.documentFeedbackDemo.setupSteps],
    [messages]
  );

  const highlights = useMemo(
    () => [...messages.pages.documentFeedbackDemo.highlights],
    [messages]
  );

  const controlButtons = [
    { label: messages.pages.documentFeedbackDemo.controlPanel.buttons.forceInit, onClick: forceInitFeedback, color: '#ff6b35' },
    { label: messages.pages.documentFeedbackDemo.controlPanel.buttons.manualTrigger, onClick: triggerManualFeedback, color: '#28a745' },
    { label: messages.pages.documentFeedbackDemo.controlPanel.buttons.testSelection, onClick: testTooltipDisplay, color: '#dc3545' },
    { label: messages.pages.documentFeedbackDemo.controlPanel.buttons.statusCheck, onClick: checkFunctionStatus, color: '#17a2b8' },
    { label: messages.pages.documentFeedbackDemo.controlPanel.buttons.clearLogs, onClick: clearFeedbackLogs, color: '#6c757d' },
    { label: messages.pages.documentFeedbackDemo.controlPanel.buttons.inspectState, onClick: inspectRuntimeState, color: '#e83e8c' }
  ];

  return (
    <PageContainer>
      <Card>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div>
            <Typography.Title level={2} style={{ marginBottom: 0 }}>
              {messages.pages.documentFeedbackDemo.title}
            </Typography.Title>
            <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
              {messages.pages.documentFeedbackDemo.subtitle}
            </Typography.Paragraph>
          </div>
          <Space direction="vertical" size={4}>
            {docLinks.map((link) => (
              <Typography.Link key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </Typography.Link>
            ))}
          </Space>
        </Space>
      </Card>

      <Card title={`📚 ${messages.pages.documentFeedbackDemo.setupStepsTitle}`}>
        <List
          bordered
          dataSource={setupSteps}
          
          renderItem={(step, index) => (
            <List.Item style={{ textAlign: 'center' }}>
              <Typography.Text strong style={{ marginRight: 8 }}>{index + 1}.</Typography.Text>
              <Typography.Text>{step}</Typography.Text>
            </List.Item>
          )}
        />
      </Card>

      <Card title={`✨ ${messages.pages.documentFeedbackDemo.highlightsTitle}`} bordered>
        <List
          dataSource={highlights}
          renderItem={(item) => (
            <List.Item>
              <Typography.Text>{item}</Typography.Text>
            </List.Item>
          )}
        />
      </Card>

      <Card title={`🔧 ${messages.pages.documentFeedbackDemo.controlPanel.title}`} bordered>
        <Space wrap>
          {controlButtons.map((button) => (
            <Button
              key={button.label}
              type="primary"
              onClick={button.onClick}
              style={{ backgroundColor: button.color, borderColor: button.color }}
            >
              {button.label}
            </Button>
          ))}
        </Space>
        <Typography.Text type="secondary" style={{ display: 'block', marginTop: 12 }}>
          {messages.pages.documentFeedbackDemo.controlPanel.statusLabel}: {isInitialized ? messages.pages.documentFeedbackDemo.controlPanel.initialized : messages.pages.documentFeedbackDemo.controlPanel.initializing}
        </Typography.Text>
      </Card>

      <Row gutter={24} wrap>
        <Col xs={24} lg={16}>
          <Card title={`📖 ${messages.pages.documentFeedbackDemo.exampleSection.title}`} bordered>
            {messages.pages.documentFeedbackDemo.exampleSection.paragraphs.map((paragraph, index) => (
              <Typography.Paragraph key={index}>
                {paragraph}
              </Typography.Paragraph>
            ))}
            <Alert
              type="warning"
              showIcon
              message={messages.pages.documentFeedbackDemo.exampleSection.tip}
              style={{ marginTop: 16 }}
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title={`📋 ${messages.pages.documentFeedbackDemo.logs.title} (${feedbackLogs.length})`} bordered>
            {feedbackLogs.length === 0 ? (
              <Typography.Text type="secondary">
                {messages.pages.documentFeedbackDemo.logs.empty}
              </Typography.Text>
            ) : (
              <List
                dataSource={feedbackLogs}
                style={{ maxHeight: 500, overflowY: 'auto' }}
                renderItem={(log) => (
                  <List.Item style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                      {new Date(log.timestamp).toLocaleString(locale)}
                    </Typography.Text>
                    <Typography.Text style={{ marginTop: 8 }}>
                      <strong>{messages.pages.documentFeedbackDemo.logs.selectedText}:</strong>
                      <Tag style={{ marginLeft: 8 }}>
                        {log.selectedText.length > 80 ? `${log.selectedText.slice(0, 80)}...` : log.selectedText}
                      </Tag>
                    </Typography.Text>
                    {log.categoryList.length > 0 && (
                      <div style={{ marginTop: 8 }}>
                        <strong>{messages.pages.documentFeedbackDemo.logs.categories}:</strong>
                        <Space wrap style={{ marginTop: 4 }}>
                          {log.categoryList.map((name: string) => (
                            <Tag key={name}>{name}</Tag>
                          ))}
                        </Space>
                      </div>
                    )}
                    <Typography.Paragraph style={{ marginTop: 8 }}>
                      <strong>{messages.pages.documentFeedbackDemo.logs.feedback}:</strong>
                      <Typography.Text type="secondary" style={{ marginLeft: 8 }}>
                        {log.content.length > 120 ? `${log.content.slice(0, 120)}...` : log.content}
                      </Typography.Text>
                    </Typography.Paragraph>
                  </List.Item>
                )}
              />
            )}
          </Card>
        </Col>
      </Row>

      <BytedeskReact
          {...config}
          onInit={handleInit}
        />

      <Card>
        <InstallGuide locale={locale} />
      </Card>
    </PageContainer>
  );
};

export default DocumentFeedbackDemo;
