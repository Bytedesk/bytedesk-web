/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2025-05-27 16:45:54
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-09-20 09:22:23
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  技术/商务联系：270580156@qq.com
 * Copyright (c) 2025 by bytedesk.com, All Rights Reserved. 
 */

import { useMemo } from 'react';
import { Button, Card, Typography, Space, Image, Divider, Row, Col, Tag, Steps, Descriptions } from 'antd';
import type { StepProps } from 'antd/es/steps';
// @ts-ignore
import { BytedeskReact } from '@bytedesk/web/adapters/react';
// @ts-ignore
import type { BytedeskConfig, Language, Theme as BytedeskTheme } from '@bytedesk/web/types';
import { getLocaleMessages } from '../locales';
import PageContainer from '../components/PageContainer';

const { Title, Paragraph, Text } = Typography;

type OrderStatus = 'pending' | 'paid' | 'shipped' | 'delivered';

interface GoodsInfo {
  uid: string;
  title: string;
  image: string;
  description: string;
  price: number;
  url: string;
  tagList: string[];
  extra: string;
  quantity: number;
}

interface OrderInfo {
  uid: string;
  time: string;
  status: OrderStatus;
  statusText?: string;
  goods: GoodsInfo;
  totalAmount: number;
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
  };
  paymentMethod: string;
  extra: string;
}

const ORDER_BASE: OrderInfo = {
  uid: 'ORD202505270001',
  time: '2025-05-27 14:30:00',
  status: 'paid',
  goods: {
    uid: 'goods_001',
    title: '比亚迪 仰望U7 豪华纯电动轿车',
    image: 'https://www.weiyuai.cn/assets/images/car/yu7.jpg',
    description:
      '比亚迪仰望U7是一款豪华纯电动轿车，采用最新一代刀片电池技术，续航里程最高可达1000公里，支持L3级别自动驾驶。',
    price: 299900,
    url: 'https://www.weiyuai.cn/car/yu7',
    tagList: ['新能源', '豪华轿车', '智能驾驶', '长续航'],
    extra: JSON.stringify({
      extraText: 'goodsExtraText',
      extraName: 'goodsExtraName'
    }),
    quantity: 1
  },
  totalAmount: 299900,
  shippingAddress: {
    name: '张三',
    phone: '13800138000',
    address: '北京市朝阳区建国路88号'
  },
  paymentMethod: '微信支付',
  extra: JSON.stringify({
    extraText: 'orderExtraText',
    extraName: 'orderExtraName'
  })
};

const ORDER_FLOW: OrderStatus[] = ['pending', 'paid', 'shipped', 'delivered'];

interface DemoPageProps {
  locale: Language;
  themeMode: BytedeskTheme['mode'];
}

const OrderInfoDemo = ({ locale, themeMode }: DemoPageProps) => {
  const messages = useMemo(() => getLocaleMessages(locale), [locale]);

  const currentOrder = useMemo<OrderInfo>(() => ({
    ...ORDER_BASE,
    statusText: messages.pages.orderInfoDemo.statusText[ORDER_BASE.status]
  }), [messages]);

  const docLinks = useMemo(
    () => [
      { href: 'https://www.weiyuai.cn/docs/zh-CN/docs/development/orderinfo', label: messages.pages.orderInfoDemo.docLinks.orderDoc },
      { href: 'https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/orderInfoDemo.tsx', label: messages.pages.orderInfoDemo.docLinks.reactExample },
      { href: 'https://github.com/Bytedesk/bytedesk-web/blob/master/examples/vue-demo/src/pages/orderInfoDemo.vue', label: messages.pages.orderInfoDemo.docLinks.vueExample }
    ],
    [messages]
  );

  const config = useMemo<BytedeskConfig>(() => ({
    isDebug: true,
    ...(process.env.NODE_ENV === 'development'
      ? {
          htmlUrl: 'http://127.0.0.1:9006',
          apiUrl: 'http://127.0.0.1:9003'
        }
      : {}),
    placement: 'bottom-right',
    autoPopup: false,
    inviteConfig: {
      show: false,
      text: messages.pages.userInfoDemo.inviteText
    },
    marginBottom: 20,
    marginSide: 20,
    buttonConfig: {
      show: false
    },
    bubbleConfig: {
      show: false,
      icon: '📦',
      title: messages.pages.localDemo.bubbleTitle,
      subtitle: messages.pages.localDemo.bubbleSubtitle
    },
    chatConfig: {
      org: 'df_org_uid',
      t: '1',
      sid: 'df_wg_aftersales',
      visitorUid: 'visitor_001',
      nickname: '访客小明',
      avatar: 'https://weiyuai.cn/assets/images/avatar/02.jpg',
      orderInfo: JSON.stringify(currentOrder),
      extra: JSON.stringify({
        type: 'type',
        test: 'test'
      })
    },
    locale,
    theme: {
      mode: themeMode,
    }
  }), [currentOrder, locale, messages, themeMode]);

  const orderSteps = useMemo<StepProps[]>(
    () => {
      const safeStatus: OrderStatus = currentOrder.status;
      const currentIndex = ORDER_FLOW.indexOf(safeStatus);

      return ORDER_FLOW.map((statusKey, index) => ({
        title: messages.pages.orderInfoDemo.statusText[statusKey],
        status: (index < currentIndex ? 'finish' : index === currentIndex ? 'process' : 'wait') as StepProps['status']
      }));
    },
    [currentOrder.status, messages]
  );

  const safeStatusLabel = useMemo(
    () => messages.pages.orderInfoDemo.statusText[currentOrder.status],
    [currentOrder.status, messages]
  );

  const formatApiHint = (code: string) => `${messages.common.apiHintPrefix} ${code}`;

  const handleShowChat = () => (window as any).bytedesk?.showChat();
  const handleHideChat = () => (window as any).bytedesk?.hideChat();

  return (
    <PageContainer>
      <Card>
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <div>
            <Title level={2} style={{ marginBottom: 0 }}>{messages.pages.orderInfoDemo.title}</Title>
            <Paragraph type="secondary" style={{ marginBottom: 0 }}>
              {messages.pages.orderInfoDemo.description}
            </Paragraph>
          </div>
          <Space direction="vertical" size={4}>
            {docLinks.map((link) => (
              <Typography.Link
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {link.label}
              </Typography.Link>
            ))}
          </Space>
        </Space>
      </Card>

      <Card>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <div>
            <Title level={4}>{messages.pages.orderInfoDemo.sections.statusTimeline}</Title>
            <Steps items={orderSteps} />
          </div>

          <div>
            <Title level={4}>{messages.pages.orderInfoDemo.sections.orderInfo}</Title>
            <Descriptions bordered>
              <Descriptions.Item label={messages.pages.orderInfoDemo.labels.orderId}>{currentOrder?.uid}</Descriptions.Item>
              <Descriptions.Item label={messages.pages.orderInfoDemo.labels.orderTime}>{currentOrder?.time}</Descriptions.Item>
              <Descriptions.Item label={messages.pages.orderInfoDemo.labels.orderStatus}>
                <Tag color="blue">{safeStatusLabel}</Tag>
              </Descriptions.Item>
              <Descriptions.Item label={messages.pages.orderInfoDemo.labels.paymentMethod}>{currentOrder?.paymentMethod}</Descriptions.Item>
              <Descriptions.Item label={messages.pages.orderInfoDemo.labels.totalAmount}>
                <Text strong style={{ color: '#f5222d' }}>
                  ¥{currentOrder?.totalAmount?.toLocaleString()}
                </Text>
              </Descriptions.Item>
            </Descriptions>
          </div>

          <div>
            <Title level={4}>{messages.pages.orderInfoDemo.sections.goodsInfo}</Title>
            <Row gutter={24}>
              <Col span={6}>
                <Image
                  src={currentOrder?.goods?.image}
                  alt={currentOrder?.goods?.title}
                  style={{ width: '100%', borderRadius: 8 }}
                />
              </Col>
              <Col span={18}>
                <Space direction="vertical" size="small">
                  <Title level={5}>{currentOrder.goods.title}</Title>
                  <Text>{messages.pages.orderInfoDemo.labels.unitPrice}：¥{currentOrder.goods.price.toLocaleString()}</Text>
                  <Text>{messages.pages.orderInfoDemo.labels.quantity}：{currentOrder.goods.quantity}</Text>
                </Space>
              </Col>
            </Row>
          </div>

          <div>
            <Title level={4}>{messages.pages.orderInfoDemo.sections.shippingInfo}</Title>
            <Descriptions bordered>
              <Descriptions.Item label={messages.pages.orderInfoDemo.labels.receiver}>{currentOrder.shippingAddress.name}</Descriptions.Item>
              <Descriptions.Item label={messages.pages.orderInfoDemo.labels.phone}>{currentOrder.shippingAddress.phone}</Descriptions.Item>
              <Descriptions.Item label={messages.pages.orderInfoDemo.labels.address}>{currentOrder.shippingAddress.address}</Descriptions.Item>
            </Descriptions>
          </div>

          <div style={{ textAlign: 'center' }}>
            <Button type="primary" size="large" onClick={handleShowChat}>
              {messages.pages.userInfoDemo.contactSupport}
            </Button>
          </div>
        </Space>
      </Card>

      <Card>
        <Title level={4}>{messages.pages.goodsInfoDemo.controlPanel.title}</Title>
        <Divider />
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Card size="small" title={messages.pages.goodsInfoDemo.controlPanel.chatWindow}>
              <Space direction="vertical" size="small" style={{ width: '100%' }}>
                <Space>
                  <Button onClick={handleShowChat}>{messages.common.buttons.openChat}</Button>
                  <Button onClick={handleHideChat}>{messages.common.buttons.closeChat}</Button>
                </Space>
                <Typography.Text type="secondary" style={{ fontSize: 12 }}>
                  {formatApiHint('bytedesk.showChat() / bytedesk.hideChat()')}
                </Typography.Text>
              </Space>
            </Card>
          </Col>
        </Row>
      </Card>

      <BytedeskReact {...config} />
    </PageContainer>
  );
};

export default OrderInfoDemo;
