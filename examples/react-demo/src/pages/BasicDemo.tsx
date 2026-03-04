/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-31 10:20:19
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-09-22 10:31:18
 */
import { useEffect, useMemo, useState } from 'react';
// @ts-ignore
import { BytedeskReact } from '@bytedesk/web/adapters/react';
// @ts-ignore
import type { BytedeskConfig, Language, Theme } from '@bytedesk/web/types';
import InstallGuide from '../components/InstallGuide';
import PageContainer from '../components/PageContainer';
import { getLocaleMessages } from '../locales';
import { Button, Card, Space, Typography, theme } from 'antd';

const THEME_COLORS = ['#0066ff', '#f97316', '#10b981', '#8b5cf6'];

interface BasicDemoProps {
  locale: Language;
  themeMode: Theme['mode'];
}

const BasicDemo = ({ locale, themeMode }: BasicDemoProps) => {
  const messages = useMemo(() => getLocaleMessages(locale), [locale]);
  const { token } = theme.useToken();
  const [config, setConfig] = useState<BytedeskConfig>(() => ({
    isDebug: false,
    ...(process.env.NODE_ENV === 'development'
      ? {
        htmlUrl: 'http://127.0.0.1:9006',
        apiUrl: 'http://127.0.0.1:9003'
      }
      : {}),
    placement: 'bottom-right',
    marginBottom: 20,
    marginSide: 20,
    autoPopup: false,
    draggable: true,
    inviteConfig: {
      show: false,
      delay: 1000,
      loop: true,
      loopDelay: 10000,
      loopCount: 3
    },
    bubbleConfig: {
      show: true,
      icon: '👋',
      title: messages.pages.basicDemo.bubbleTitle,
      subtitle: messages.pages.basicDemo.bubbleSubtitle
    },
    buttonConfig: {
      show: true,
      width: 60,
      height: 60
    },
    chatConfig: {
      org: 'df_org_uid',
      t: '2',
      sid: 'df_rt_uid'
    },
    theme: {
      mode: themeMode || 'light',
      textColor: '#ffffff',
      backgroundColor: THEME_COLORS[0]
    },
    locale,
    onVisitorInfo: (uid: string, visitorUid: string) => {
      console.log('BasicDemo 收到访客信息:', { uid, visitorUid });
    }
  }));

  useEffect(() => {
    setConfig((prevConfig: BytedeskConfig) => ({
      ...prevConfig,
      locale,
      theme: {
        ...prevConfig.theme,
        mode: themeMode || prevConfig.theme?.mode
      },
      bubbleConfig: {
        ...prevConfig.bubbleConfig,
        title: messages.pages.basicDemo.bubbleTitle,
        subtitle: messages.pages.basicDemo.bubbleSubtitle
      }
    }));
  }, [locale, themeMode, messages]);

  const handleInit = () => {
    console.log('BytedeskReact initialized BasicDemo');
  };

  const handleThemeColorSwitch = () => {
    setConfig((prevConfig: BytedeskConfig) => {
      const currentColor = prevConfig.theme?.backgroundColor || THEME_COLORS[0];
      const currentIndex = THEME_COLORS.indexOf(currentColor);
      const safeIndex = currentIndex === -1 ? 0 : currentIndex;
      const nextIndex = (safeIndex + 1) % THEME_COLORS.length;

      return {
        ...prevConfig,
        theme: {
          ...prevConfig.theme,
          backgroundColor: THEME_COLORS[nextIndex]
        }
      };
    });
  };

  const handlePlacementToggle = () => {
    setConfig((prevConfig: BytedeskConfig) => ({
      ...prevConfig,
      placement: prevConfig.placement === 'bottom-left' ? 'bottom-right' : 'bottom-left'
    }));
  };

  const handleToggleLoadHistory = () => {
    setConfig((prevConfig: BytedeskConfig) => {
      const currentLoadHistory = Boolean(prevConfig.chatConfig?.loadHistory);
      return {
        ...prevConfig,
        chatConfig: {
          ...(prevConfig.chatConfig || {
            org: 'df_org_uid',
            t: '2',
            sid: 'df_rt_uid'
          }),
          loadHistory: !currentLoadHistory
        }
      };
    });
  };

  const docLinks = [
    { href: 'https://www.weiyuai.cn/docs/zh-CN/docs/channel/react', label: messages.common.docLinks.react },
    { href: 'https://www.weiyuai.cn/docs/zh-CN/docs/channel/vue', label: messages.common.docLinks.vue },
    { href: 'https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/BasicDemo.tsx', label: messages.common.docLinks.reactExample },
    { href: 'https://github.com/Bytedesk/bytedesk-web/blob/master/examples/vue-demo/src/pages/BasicDemo.vue', label: messages.common.docLinks.vueExample }
  ];

  const quickActions = [
    { key: 'openChat', label: messages.common.buttons.openChat, handler: () => (window as any).bytedesk?.showChat() },
    {
      key: 'openChatParams',
      label: messages.common.buttons.openChatWithParams,
      handler: () => (window as any).bytedesk?.showChat({
        chatConfig: {
          org: 'df_org_uid',
          t: '1',
          sid: 'df_wg_uid'
        }
      })
    },
    { key: 'closeChat', label: messages.common.buttons.closeChat, handler: () => (window as any).bytedesk?.hideChat() },
    { key: 'showButton', label: messages.common.buttons.showButton, handler: () => (window as any).bytedesk?.showButton() },
    { key: 'hideButton', label: messages.common.buttons.hideButton, handler: () => (window as any).bytedesk?.hideButton() },
    { key: 'showBubble', label: messages.common.buttons.showBubble, handler: () => (window as any).bytedesk?.showBubble() },
    { key: 'hideBubble', label: messages.common.buttons.hideBubble, handler: () => (window as any).bytedesk?.hideBubble() },
    { key: 'showInvite', label: messages.common.buttons.showInvite, handler: () => (window as any).bytedesk?.showInviteDialog() },
    { key: 'hideInvite', label: messages.common.buttons.hideInvite, handler: () => (window as any).bytedesk?.hideInviteDialog() }
  ];

  const placementLabel =
    config.placement === 'bottom-left'
      ? messages.pages.basicDemo.placement.bottomLeft
      : messages.pages.basicDemo.placement.bottomRight;

  const themeColorLabel = config.theme?.backgroundColor || messages.pages.basicDemo.defaultColorLabel;
  const loadHistoryEnabled = Boolean(config.chatConfig?.loadHistory);

  return (
    <PageContainer>
      <Card>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Typography.Title level={2} style={{ marginBottom: 0 }}>{messages.pages.basicDemo.title}</Typography.Title>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
            {messages.pages.basicDemo.intro}
          </Typography.Paragraph>
          <Space direction="vertical" size={4}>
            {docLinks.map((link) => (
              <Typography.Link key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
                {link.label}
              </Typography.Link>
            ))}
          </Space>
          <Space wrap>
            {quickActions.map((action) => (
              <Button key={action.key} type="primary" onClick={action.handler}>
                {action.label}
              </Button>
            ))}
            <Button type="primary" onClick={handlePlacementToggle}>
              {messages.common.buttons.togglePlacement} ({placementLabel})
            </Button>
            <Button
              type="primary"
              onClick={handleThemeColorSwitch}
              style={{
                backgroundColor: config.theme?.backgroundColor || token.colorPrimary,
                borderColor: config.theme?.backgroundColor || token.colorPrimary
              }}
            >
              {messages.pages.basicDemo.themeButtonLabel} ({themeColorLabel})
            </Button>
            <Button type={loadHistoryEnabled ? 'primary' : 'default'} onClick={handleToggleLoadHistory}>
              {messages.pages.basicDemo.loadHistoryLabel}: {loadHistoryEnabled
                ? messages.pages.basicDemo.loadHistoryEnabled
                : messages.pages.basicDemo.loadHistoryDisabled}
            </Button>
          </Space>
          <Typography.Text type="secondary">
            {messages.common.apiHintPrefix} {messages.pages.basicDemo.loadHistoryApiHintPrefix}
            {loadHistoryEnabled ? 'true' : 'false'}
          </Typography.Text>
        </Space>
      </Card>

      <BytedeskReact
        {...config}
        onInit={handleInit}
      />

      <InstallGuide locale={locale} />
    </PageContainer>
  );
};

export default BasicDemo;
