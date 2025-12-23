/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-31 10:22:44
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-07-30 17:07:31
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Button, Card, Col, List, Row, Space, Typography, theme } from 'antd';
import { BytedeskReact } from 'bytedesk-web/react';
// @ts-ignore
import type { BytedeskConfig, FeedbackData } from 'bytedesk-web/react';
// @ts-ignore
import type { Language } from '@bytedesk/web/types';
import InstallGuide from '../components/InstallGuide';
import { getLocaleMessages } from '../locales';

interface DemoPageProps {
  locale: Language;
}

const OnlineDemo = ({ locale }: DemoPageProps) => {
  const messages = useMemo(() => getLocaleMessages(locale), [locale]);
  const { token } = theme.useToken();

  const createFeedbackConfig = () => ({
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
    typesSectionTitle: messages.pages.documentFeedbackDemo.feedbackConfigText.typesSectionTitle,
    typesDescription: messages.pages.documentFeedbackDemo.feedbackConfigText.typesDescription,
    onSubmit: (feedbackData: FeedbackData) => {
      console.log('[OnlineDemo] feedback payload', feedbackData);
    },
    onCancel: () => {
      console.log('[OnlineDemo] feedback cancelled');
    }
  });

  const [config, setConfig] = useState<BytedeskConfig>(() => ({
    isDebug: true,
    placement: 'bottom-right',
    marginBottom: 20,
    marginSide: 20,
    inviteConfig: {
      show: true,
      delay: 1000,
      loop: true,
      loopDelay: 10000,
      loopCount: 3,
      text: messages.pages.userInfoDemo.inviteText
    },
    tabsConfig: {
      home: false,
      messages: true,
      help: false,
      news: false
    },
    bubbleConfig: {
      show: true,
      icon: '👋',
      title: messages.pages.localDemo.bubbleTitle,
      subtitle: messages.pages.localDemo.bubbleSubtitle
    },
    feedbackConfig: createFeedbackConfig(),
    chatConfig: {
      org: 'df_org_uid',
      t: '2',
      sid: 'df_rt_uid'
    },
    locale
  }));

  useEffect(() => {
    const localizedFeedback = createFeedbackConfig();
    setConfig((prevConfig: BytedeskConfig) => ({
      ...prevConfig,
      locale,
      inviteConfig: prevConfig.inviteConfig
        ? {
          ...prevConfig.inviteConfig,
          text: messages.pages.userInfoDemo.inviteText
        }
        : {
          show: true,
          delay: 1000,
          loop: true,
          loopDelay: 10000,
          loopCount: 3,
          text: messages.pages.userInfoDemo.inviteText
        },
      bubbleConfig: prevConfig.bubbleConfig
        ? {
          ...prevConfig.bubbleConfig,
          title: messages.pages.localDemo.bubbleTitle,
          subtitle: messages.pages.localDemo.bubbleSubtitle
        }
        : {
          show: true,
          icon: '👋',
          title: messages.pages.localDemo.bubbleTitle,
          subtitle: messages.pages.localDemo.bubbleSubtitle
        },
      feedbackConfig: prevConfig.feedbackConfig
        ? {
          ...prevConfig.feedbackConfig,
          ...localizedFeedback
        }
        : localizedFeedback
    }));
  }, [locale, messages]);

  const handleInit = () => {
    console.log('[OnlineDemo] BytedeskReact initialized');
  };

  const handleManualTrigger = useCallback(() => {
    const instance = (window as any).bytedesk;
    if (instance?.showDocumentFeedback) {
      instance.showDocumentFeedback(messages.pages.onlineDemo.manualTriggerMessage);
    } else {
      alert(messages.pages.documentFeedbackDemo.alerts.missingInstance);
    }
  }, [messages]);

  const docLinks = useMemo(
    () => [
      { href: 'https://www.weiyuai.cn/docs/zh-CN/docs/channel/react', label: messages.pages.onlineDemo.docLinks.reactDoc },
      { href: 'https://www.weiyuai.cn/docs/zh-CN/docs/channel/vue', label: messages.pages.onlineDemo.docLinks.vueDoc },
      { href: 'https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/OnlineDemo.tsx', label: messages.pages.onlineDemo.docLinks.reactExample },
      { href: 'https://github.com/Bytedesk/bytedesk-web/blob/master/examples/vue-demo/src/pages/OnlineDemo.vue', label: messages.pages.onlineDemo.docLinks.vueExample }
    ],
    [messages]
  );

  const usageSteps = useMemo(
    () => [...messages.pages.onlineDemo.usageSteps],
    [messages]
  );

  const exampleParagraphs = useMemo(
    () => [...messages.pages.onlineDemo.exampleParagraphs],
    [messages]
  );

  const actionButtons = [
    { label: messages.common.buttons.openChat, handler: () => (window as any).bytedesk?.showChat() },
    { label: messages.common.buttons.closeChat, handler: () => (window as any).bytedesk?.hideChat() },
    { label: messages.common.buttons.showButton, handler: () => (window as any).bytedesk?.showButton() },
    { label: messages.common.buttons.hideButton, handler: () => (window as any).bytedesk?.hideButton() },
    { label: messages.common.buttons.showBubble, handler: () => (window as any).bytedesk?.showBubble() },
    { label: messages.common.buttons.hideBubble, handler: () => (window as any).bytedesk?.hideBubble() },
    { label: messages.common.buttons.showInvite, handler: () => (window as any).bytedesk?.showInviteDialog() },
    { label: messages.common.buttons.hideInvite, handler: () => (window as any).bytedesk?.hideInviteDialog() },
    { label: messages.pages.onlineDemo.manualTriggerButton, handler: handleManualTrigger, color: token.colorSuccess }
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: '100%', padding: 24 }}>
      <Space direction="vertical" align="center" style={{ width: '100%', textAlign: 'center' }}>
        <Typography.Title level={2}>{messages.pages.onlineDemo.title}</Typography.Title>
        <Typography.Paragraph type="secondary" style={{ maxWidth: 720 }}>
          {messages.pages.onlineDemo.description}
        </Typography.Paragraph>
      </Space>

      <Card title={`📘 ${messages.pages.onlineDemo.docLinksTitle}`} bordered>
        <List
          dataSource={docLinks}
          renderItem={(link) => (
            <List.Item>
              <Typography.Link href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </Typography.Link>
            </List.Item>
          )}
        />
      </Card>

      <Row gutter={24} wrap>
        <Col xs={24} lg={16}>
          <Card title={`✨ ${messages.pages.onlineDemo.feedbackSectionTitle}`} bordered>
            <Typography.Paragraph type="secondary" style={{ marginBottom: 12 }}>
              {messages.pages.onlineDemo.usageTitle}
            </Typography.Paragraph>
            <List
              dataSource={usageSteps}
              renderItem={(step, index) => (
                <List.Item>
                  <Typography.Text strong style={{ marginRight: 8 }}>{index + 1}.</Typography.Text>
                  <Typography.Text>{step}</Typography.Text>
                </List.Item>
              )}
            />
            <Card type="inner" style={{ marginTop: 16 }}>
              <Space direction="vertical" style={{ width: '100%' }}>
                {exampleParagraphs.map((paragraph, index) => (
                  <Typography.Paragraph key={index}>
                    {paragraph}
                  </Typography.Paragraph>
                ))}
              </Space>
            </Card>
            <Alert
              type="info"
              showIcon
              message={messages.pages.onlineDemo.manualTriggerButton}
              description={messages.pages.onlineDemo.manualTriggerMessage}
              style={{ marginTop: 16 }}
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title={`🎛️ ${messages.pages.onlineDemo.controlPanelTitle}`} bordered>
            <Typography.Paragraph type="secondary" style={{ marginBottom: 16 }}>
              {messages.pages.onlineDemo.controlPanelDescription}
            </Typography.Paragraph>
            <Space wrap>
              {actionButtons.map((button) => (
                <Button
                  key={button.label}
                  type="primary"
                  onClick={button.handler}
                  style={button.color ? { backgroundColor: button.color, borderColor: button.color } : undefined}
                >
                  {button.label}
                </Button>
              ))}
            </Space>
          </Card>
        </Col>
      </Row>

      <Card>
        <Typography.Title level={4} style={{ marginBottom: 16 }}>BytedeskReact</Typography.Title>
        <BytedeskReact
          {...config}
          onInit={handleInit}
        />
      </Card>

      <InstallGuide locale={locale} />
    </Space>
  );
};

export default OnlineDemo;