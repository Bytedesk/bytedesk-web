/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-31 11:53:47
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-07-24 14:49:20
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
        <div>
        <h3>5. 可用方法</h3>
        <ul style={{ lineHeight: '1.6' }}>
          <li><code>(window as any).bytedesk?.showButton()</code> - 显示按钮</li>
          <li><code>(window as any).bytedesk?.hideButton()</code> - 隐藏按钮</li>
          <li><code>(window as any).bytedesk?.showBubble()</code> - 显示气泡消息</li>
          <li><code>(window as any).bytedesk?.hideBubble()</code> - 隐藏气泡消息</li>
          <li><code>(window as any).bytedesk?.showChat()</code> - 显示聊天窗口</li>
          <li><code>(window as any).bytedesk?.hideChat()</code> - 隐藏聊天窗口</li>
          <li><code>(window as any).bytedesk?.showInviteDialog()</code> - 显示邀请对话框</li>
          <li><code>(window as any).bytedesk?.hideInviteDialog()</code> - 隐藏邀请对话框</li>
          <li><code>(window as any).bytedesk?.showDocumentFeedback(selectedText?)</code> - 显示文档反馈对话框 (新功能)</li>
        </ul>
      </div>

      <div style={{ marginTop: '20px' }}>
        <h3>6. 文档反馈功能说明</h3>
        <p style={{ marginBottom: '12px' }}>文档反馈功能是一个全新的特色功能，可以让用户针对页面内容提交精准的反馈意见：</p>
        <ul style={{ lineHeight: '1.6', marginBottom: '16px' }}>
          <li><strong>自动检测文本选择：</strong>当用户选中页面中的文字时，自动显示"文档反馈"提示</li>
          <li><strong>智能截图：</strong>自动截取当前页面状态，为反馈提供视觉上下文</li>
          <li><strong>精准定位：</strong>记录用户选中的具体文字内容，方便开发者快速定位问题</li>
          <li><strong>多种触发方式：</strong>支持文本选择触发、按钮触发或两者结合</li>
          <li><strong>自定义处理：</strong>支持自定义提交逻辑，可以发送到自己的服务器</li>
        </ul>
        
        <div style={{ backgroundColor: '#e7f3ff', padding: '12px', borderRadius: '6px', border: '1px solid #b3d8ff' }}>
          <p style={{ margin: '0', fontSize: '14px', color: '#0066cc' }}>
            <strong>💡 提示：</strong>文档反馈功能需要安装 <code>html2canvas</code> 库来支持截图功能：
          </p>
          <pre style={{ background: '#f8f9fa', padding: '8px', borderRadius: '4px', marginTop: '8px', fontSize: '12px' }}>
            {`npm install html2canvas`}
          </pre>
        </div>
      </div>e aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  联系：270580156@qq.com
 * Copyright (c) 2025 by bytedesk.com, All Rights Reserved. 
 */
import { useMemo } from 'react';
import { Alert, Card, List, Space, Typography, theme } from 'antd';
// @ts-ignore
import type { Language } from '@bytedesk/web/types';
import { getLocaleMessages } from '../locales';

interface InstallGuideProps {
  locale: Language;
}

const codeStyle = (background: string, borderColor: string) => ({
  background,
  border: `1px solid ${borderColor}`,
  borderRadius: 6,
  padding: 12,
  fontSize: 13,
  lineHeight: 1.6,
  whiteSpace: 'pre-wrap'
}) as const;

const InstallGuide = ({ locale }: InstallGuideProps) => {
  const messages = useMemo(() => getLocaleMessages(locale), [locale]);
  const { token } = theme.useToken();
  const guide = messages.components.installGuide;

  const renderCode = (code: string, emphasis = false) => (
    <pre style={codeStyle(emphasis ? token.colorInfoBg : token.colorFillQuaternary, token.colorBorder)}>
      {code}
    </pre>
  );

  return (
    <Card style={{ marginTop: 40 }}>
      <Typography.Title level={3}>{guide.title}</Typography.Title>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Card type="inner" title={guide.sections.installDeps.title} bordered>
          {renderCode(guide.sections.installDeps.code)}
        </Card>

        <Card type="inner" title={guide.sections.importComponent.title} bordered>
          {renderCode(guide.sections.importComponent.code)}
        </Card>

        <Card type="inner" title={guide.sections.config.title} bordered>
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <Typography.Text strong>{guide.sections.config.minimalTitle}</Typography.Text>
            {renderCode(guide.sections.config.minimalCode, true)}
            <Typography.Paragraph type="secondary">{guide.sections.config.minimalNote}</Typography.Paragraph>
            <Typography.Text strong>{guide.sections.config.fullTitle}</Typography.Text>
            {renderCode(guide.sections.config.fullCode)}
          </Space>
        </Card>

        <Card type="inner" title={guide.sections.usage.title} bordered>
          {renderCode(guide.sections.usage.code)}
        </Card>

        <Card type="inner" title={guide.sections.methods.title} bordered>
          <List
            dataSource={[...guide.sections.methods.list]}
            renderItem={(item: (typeof guide.sections.methods.list)[number]) => (
              <List.Item style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <Typography.Text code>{item.code}</Typography.Text>
                <Typography.Text type="secondary">{item.description}</Typography.Text>
              </List.Item>
            )}
          />
        </Card>

        <Card type="inner" title={guide.sections.feedback.title} bordered>
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <Typography.Paragraph>{guide.sections.feedback.intro}</Typography.Paragraph>
            <List
              size="small"
              dataSource={[...guide.sections.feedback.bullets]}
              renderItem={(text: (typeof guide.sections.feedback.bullets)[number]) => (
                <List.Item style={{ paddingInline: 0 }}>{text}</List.Item>
              )}
            />
            <Alert
              type="info"
              showIcon
              message={guide.sections.feedback.tip}
              description={renderCode(guide.sections.feedback.tipCommand, true)}
            />
          </Space>
        </Card>
      </Space>
    </Card>
  );
};

export default InstallGuide;