/**
 * 演示平台客服、店铺售前/售后客服	用户可以选择平台客服或店铺客服
 */
import { useMemo } from 'react';
import { Alert, Card, FloatButton, Space, Table, Tag, Typography } from 'antd';
// @ts-ignore
import type { Language, Theme as BytedeskTheme } from '@bytedesk/web/types';
import { getLocaleMessages } from '../locales';
import PageContainer from '../components/PageContainer';
import type { DemoUserKey, DemoUserProfile } from '../types/demo-user';
import type { DemoChatProfile } from '../types/chat-profile';

interface DemoPageProps {
  locale: Language;
  themeMode: BytedeskTheme['mode'];
  selectedChatProfile: DemoChatProfile;
  selectedUser: DemoUserProfile;
  isAnonymousMode: boolean;
  onSelectUser: (nextUser: DemoUserKey) => void;
  onAnonymousModeChange: (nextMode: boolean) => void;
}

type PlatformScenarioKey = 'platform' | 'presales' | 'aftersales';

const PLATFORM_SCENARIO_ORDER: PlatformScenarioKey[] = ['platform', 'presales', 'aftersales'];

const PlatformDemo = ({ locale }: DemoPageProps) => {
  const messages = useMemo(() => getLocaleMessages(locale), [locale]);
  const platformMessages = messages.pages.platformDemo;

  const scenarioRows = platformMessages.routeRows;

  const docLinks = useMemo(() => [
    { href: 'https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/PlatformDemo.tsx', label: platformMessages.docLinks.reactExample }
  ], [platformMessages.docLinks.reactExample]);

  const routeTableRows = useMemo(() => PLATFORM_SCENARIO_ORDER.map((key) => ({
    key,
    route: scenarioRows[key].example,
    label: scenarioRows[key].label,
    purpose: scenarioRows[key].purpose,
  })), [scenarioRows]);

  return (
    <PageContainer>
      <Card>
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          <Typography.Title level={2} style={{ marginBottom: 0 }}>
            {platformMessages.title}
          </Typography.Title>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
            {platformMessages.description}
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
            <Typography.Text strong>{platformMessages.currentPathLabel}</Typography.Text>
            <Tag color="processing">/chat</Tag>
            <Typography.Text type="secondary">{platformMessages.currentPathHint}</Typography.Text>
          </Space>

          <Alert
            type="info"
            showIcon
            title={platformMessages.mappingAlertTitle}
            description={platformMessages.mappingAlertDescription}
          />

          <div>
            <Typography.Text strong>{platformMessages.usageTitle}</Typography.Text>
            <ul style={{ margin: '8px 0 0', paddingLeft: 20, lineHeight: 1.8 }}>
              {platformMessages.usageNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
        </Space>
      </Card>

      <Card title={platformMessages.routeTableTitle}>
        <Table
          size="small"
          bordered
          pagination={false}
          rowKey="key"
          dataSource={routeTableRows}
          columns={[
            {
              title: platformMessages.routeTable.routeLabel,
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
              title: platformMessages.routeTable.purposeLabel,
              dataIndex: 'purpose',
              key: 'purpose',
            },
            {
              title: platformMessages.routeTable.exampleLabel,
              dataIndex: 'route',
              key: 'route',
              render: (value: string) => <Typography.Text copyable={{ text: value }}>{value}</Typography.Text>,
            },
          ]}
        />
      </Card>

      <FloatButton.BackTop style={{ marginRight: 200, marginBottom: -30 }} />
    </PageContainer>
  );
};

export default PlatformDemo;
