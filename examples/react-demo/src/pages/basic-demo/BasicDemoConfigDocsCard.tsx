import { Card, Descriptions, Space, Typography } from 'antd';
import type { CSSProperties, ReactNode } from 'react';

type ConfigSection = {
  title: string;
  items: Array<{
    key: string;
    label: ReactNode;
    children: ReactNode;
  }>;
};

interface BasicDemoConfigDocsCardProps {
  minimalConfigTitle: string;
  minimalConfigDescription: string;
  recommendedConfigTitle: string;
  recommendedConfigDescription: string;
  configExampleTitle: string;
  configExampleDescription: string;
  configGuideTitle: string;
  configGuideDescription: string;
  minimalConfigExample: string;
  recommendedConfigExample: string;
  fullConfigExample: string;
  configDocSections: ConfigSection[];
  codeBlockStyle: CSSProperties;
}

const BasicDemoConfigDocsCard = ({
  minimalConfigTitle,
  minimalConfigDescription,
  recommendedConfigTitle,
  recommendedConfigDescription,
  configExampleTitle,
  configExampleDescription,
  configGuideTitle,
  configGuideDescription,
  minimalConfigExample,
  recommendedConfigExample,
  fullConfigExample,
  configDocSections,
  codeBlockStyle,
}: BasicDemoConfigDocsCardProps) => {
  return (
    <Card style={{ marginTop: 16 }}>
      <Space orientation="vertical" size="large" style={{ width: '100%' }}>
        <div>
          <Typography.Title level={4} style={{ marginBottom: 8 }}>
            {minimalConfigTitle}
          </Typography.Title>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 8 }}>
            {minimalConfigDescription}
          </Typography.Paragraph>
          <pre style={codeBlockStyle}>{minimalConfigExample}</pre>
        </div>

        <div>
          <Typography.Title level={4} style={{ marginBottom: 8 }}>
            {recommendedConfigTitle}
          </Typography.Title>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 8 }}>
            {recommendedConfigDescription}
          </Typography.Paragraph>
          <pre style={codeBlockStyle}>{recommendedConfigExample}</pre>
        </div>

        <div>
          <Typography.Title level={4} style={{ marginBottom: 8 }}>
            {configExampleTitle}
          </Typography.Title>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 8 }}>
            {configExampleDescription}
          </Typography.Paragraph>
          <pre style={codeBlockStyle}>{fullConfigExample}</pre>
        </div>

        <div>
          <Typography.Title level={4} style={{ marginBottom: 12 }}>
            {configGuideTitle}
          </Typography.Title>
          <Typography.Paragraph type="secondary" style={{ marginBottom: 12 }}>
            {configGuideDescription}
          </Typography.Paragraph>
          <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
            {configDocSections.map((section) => (
              <Card key={section.title} size="small">
                <Typography.Title level={5} style={{ marginBottom: 12 }}>
                  {section.title}
                </Typography.Title>
                <Descriptions size="small" bordered column={1} items={section.items} />
              </Card>
            ))}
          </Space>
        </div>
      </Space>
    </Card>
  );
};

export default BasicDemoConfigDocsCard;