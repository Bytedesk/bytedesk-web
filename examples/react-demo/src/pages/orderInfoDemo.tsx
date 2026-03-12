/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2025-05-27 16:45:54
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2026-03-11 10:45:00
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM –
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license.
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE
 *  contact: 270580156@qq.com
 *  技术/商务联系：270580156@qq.com
 * Copyright (c) 2025 by bytedesk.com, All Rights Reserved.
 */

import { useEffect, useMemo, useState } from 'react';
import { Alert, Avatar, Button, Card, List, Select, Space, Tag, Typography } from 'antd';
// @ts-ignore
import { BytedeskReact } from '@bytedesk/web/adapters/react';
// @ts-ignore
import type { BytedeskConfig, Language, Theme as BytedeskTheme } from '@bytedesk/web/types';
import { getLocaleMessages } from '../locales';
import PageContainer from '../components/PageContainer';
import { DEMO_USER_PRESETS, type DemoUserKey, type DemoUserProfile } from '../types/demo-user';
import { formatChatConfigQuery, getConsultButtonLabel, type DemoChatProfile } from '../types/chat-profile';

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

interface DemoOrderInfo {
  uid: string;
  visitorUid: string;
  shopUid: string;
  shopDbUid: string;
  time: string;
  status: OrderStatus;
  statusText: string;
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

interface DemoPageProps {
  locale: Language;
  themeMode: BytedeskTheme['mode'];
  selectedChatProfile: DemoChatProfile;
  selectedUser: DemoUserProfile;
  isAnonymousMode: boolean;
  onSelectUser: (nextUser: DemoUserKey) => void;
  onAnonymousModeChange: (nextMode: boolean) => void;
}

const DEMO_ORDERS: DemoOrderInfo[] = [
  {
    uid: 'ORD202505270001',
    visitorUid: 'visitor_001',
    shopUid: 'shop_001',
    shopDbUid: 'df_org_uid_shop_001',
    time: '2025-05-27 14:30:00',
    status: 'paid',
    statusText: '已支付',
    goods: {
      uid: 'goods_001',
      title: '比亚迪 仰望U7 豪华纯电动轿车',
      image: 'https://www.weiyuai.cn/assets/images/car/yu7.jpg',
      description: '旗舰纯电轿车，续航与智能驾驶兼顾。',
      price: 299900,
      url: 'https://www.weiyuai.cn/shop/shop_001/goods/goods_001',
      tagList: ['新能源', '豪华轿车'],
      extra: JSON.stringify({ sku: 'goods_001' }),
      quantity: 1
    },
    totalAmount: 299900,
    shippingAddress: {
      name: '张三',
      phone: '13800138000',
      address: '北京市朝阳区建国路88号'
    },
    paymentMethod: '微信支付',
    extra: JSON.stringify({ source: 'demo' })
  },
  {
    uid: 'ORD202505270004',
    visitorUid: 'visitor_001',
    shopUid: 'shop_001',
    shopDbUid: 'df_org_uid_shop_001',
    time: '2025-05-30 11:10:00',
    status: 'shipped',
    statusText: '已发货',
    goods: {
      uid: 'goods_002',
      title: '蔚来 ET7 行政版',
      image: 'https://www.weiyuai.cn/assets/images/car/yu7.jpg',
      description: '高性能智能电动轿车，支持高速NOA和全景交互座舱。',
      price: 428000,
      url: 'https://www.weiyuai.cn/shop/shop_001/goods/goods_002',
      tagList: ['新能源', '高性能'],
      extra: JSON.stringify({ sku: 'goods_002' }),
      quantity: 1
    },
    totalAmount: 428000,
    shippingAddress: {
      name: '张三',
      phone: '13800138000',
      address: '北京市朝阳区建国路88号'
    },
    paymentMethod: '支付宝',
    extra: JSON.stringify({ source: 'demo' })
  },
  {
    uid: 'ORD202505270005',
    visitorUid: 'visitor_001',
    shopUid: 'shop_001',
    shopDbUid: 'df_org_uid_shop_001',
    time: '2025-05-31 16:45:00',
    status: 'delivered',
    statusText: '已送达',
    goods: {
      uid: 'goods_003',
      title: '理想 L9 Max 家庭旗舰SUV',
      image: 'https://www.weiyuai.cn/assets/images/car/yu7.jpg',
      description: '六座家庭旗舰SUV，支持增程与全场景智能辅助驾驶。',
      price: 459800,
      url: 'https://www.weiyuai.cn/shop/shop_001/goods/goods_003',
      tagList: ['家庭SUV', '大空间'],
      extra: JSON.stringify({ sku: 'goods_003' }),
      quantity: 1
    },
    totalAmount: 459800,
    shippingAddress: {
      name: '张三',
      phone: '13800138000',
      address: '北京市朝阳区建国路88号'
    },
    paymentMethod: '云闪付',
    extra: JSON.stringify({ source: 'demo' })
  },
  {
    uid: 'ORD202505270002',
    visitorUid: 'visitor_002',
    shopUid: 'shop_002',
    shopDbUid: 'df_org_uid_shop_002',
    time: '2025-05-28 10:15:00',
    status: 'shipped',
    statusText: '已发货',
    goods: {
      uid: 'goods_004',
      title: '星驰 XBook Pro 16',
      image: 'https://www.weiyuai.cn/assets/images/avatar/01.jpg',
      description: '16寸高性能轻薄本。',
      price: 9999,
      url: 'https://www.weiyuai.cn/shop/shop_002/goods/goods_004',
      tagList: ['笔记本', '轻薄'],
      extra: JSON.stringify({ sku: 'goods_004' }),
      quantity: 1
    },
    totalAmount: 9999,
    shippingAddress: {
      name: '李四',
      phone: '13900139000',
      address: '上海市浦东新区世纪大道100号'
    },
    paymentMethod: '支付宝',
    extra: JSON.stringify({ source: 'demo' })
  },
  {
    uid: 'ORD202505270006',
    visitorUid: 'visitor_002',
    shopUid: 'shop_002',
    shopDbUid: 'df_org_uid_shop_002',
    time: '2025-05-29 09:20:00',
    status: 'paid',
    statusText: '已支付',
    goods: {
      uid: 'goods_005',
      title: '星驰 NoiseCancel Pro 耳机',
      image: 'https://www.weiyuai.cn/assets/images/avatar/02.jpg',
      description: '旗舰降噪耳机，支持空间音频与48小时续航。',
      price: 1599,
      url: 'https://www.weiyuai.cn/shop/shop_002/goods/goods_005',
      tagList: ['耳机', '主动降噪'],
      extra: JSON.stringify({ sku: 'goods_005' }),
      quantity: 1
    },
    totalAmount: 1599,
    shippingAddress: {
      name: '李四',
      phone: '13900139000',
      address: '上海市浦东新区世纪大道100号'
    },
    paymentMethod: '微信支付',
    extra: JSON.stringify({ source: 'demo' })
  },
  {
    uid: 'ORD202505270007',
    visitorUid: 'visitor_002',
    shopUid: 'shop_002',
    shopDbUid: 'df_org_uid_shop_002',
    time: '2025-06-01 08:05:00',
    status: 'delivered',
    statusText: '已送达',
    goods: {
      uid: 'goods_006',
      title: '星驰 34寸电竞显示器',
      image: 'https://www.weiyuai.cn/assets/images/avatar/03.jpg',
      description: '34寸超宽曲面屏，165Hz刷新率，适合电竞与生产力场景。',
      price: 2699,
      url: 'https://www.weiyuai.cn/shop/shop_002/goods/goods_006',
      tagList: ['显示器', '电竞'],
      extra: JSON.stringify({ sku: 'goods_006' }),
      quantity: 1
    },
    totalAmount: 2699,
    shippingAddress: {
      name: '李四',
      phone: '13900139000',
      address: '上海市浦东新区世纪大道100号'
    },
    paymentMethod: '云闪付',
    extra: JSON.stringify({ source: 'demo' })
  },
  {
    uid: 'ORD202505270003',
    visitorUid: 'visitor_003',
    shopUid: 'shop_003',
    shopDbUid: 'df_org_uid_shop_003',
    time: '2025-05-29 19:20:00',
    status: 'delivered',
    statusText: '已送达',
    goods: {
      uid: 'goods_008',
      title: '山海护脊人体工学椅',
      image: 'https://www.weiyuai.cn/assets/images/avatar/02.jpg',
      description: '久坐舒适，支撑性更好。',
      price: 1899,
      url: 'https://www.weiyuai.cn/shop/shop_003/goods/goods_008',
      tagList: ['人体工学', '办公椅'],
      extra: JSON.stringify({ sku: 'goods_008' }),
      quantity: 1
    },
    totalAmount: 1899,
    shippingAddress: {
      name: '王五',
      phone: '13700137000',
      address: '广州市天河区体育西路66号'
    },
    paymentMethod: '云闪付',
    extra: JSON.stringify({ source: 'demo' })
  },
  {
    uid: 'ORD202505270008',
    visitorUid: 'visitor_003',
    shopUid: 'shop_003',
    shopDbUid: 'df_org_uid_shop_003',
    time: '2025-05-30 13:05:00',
    status: 'paid',
    statusText: '已支付',
    goods: {
      uid: 'goods_007',
      title: '山海原木餐桌',
      image: 'https://www.weiyuai.cn/assets/images/avatar/01.jpg',
      description: '北欧简约风原木餐桌，环保材质，适合4-6人用餐。',
      price: 3299,
      url: 'https://www.weiyuai.cn/shop/shop_003/goods/goods_007',
      tagList: ['家具', '原木'],
      extra: JSON.stringify({ sku: 'goods_007' }),
      quantity: 1
    },
    totalAmount: 3299,
    shippingAddress: {
      name: '王五',
      phone: '13700137000',
      address: '广州市天河区体育西路66号'
    },
    paymentMethod: '微信支付',
    extra: JSON.stringify({ source: 'demo' })
  },
  {
    uid: 'ORD202505270009',
    visitorUid: 'visitor_003',
    shopUid: 'shop_003',
    shopDbUid: 'df_org_uid_shop_003',
    time: '2025-06-02 18:40:00',
    status: 'shipped',
    statusText: '已发货',
    goods: {
      uid: 'goods_009',
      title: '山海静音床垫',
      image: 'https://www.weiyuai.cn/assets/images/avatar/03.jpg',
      description: '独立袋装弹簧，静音减震，提升睡眠品质。',
      price: 2599,
      url: 'https://www.weiyuai.cn/shop/shop_003/goods/goods_009',
      tagList: ['床垫', '家居'],
      extra: JSON.stringify({ sku: 'goods_009' }),
      quantity: 1
    },
    totalAmount: 2599,
    shippingAddress: {
      name: '王五',
      phone: '13700137000',
      address: '广州市天河区体育西路66号'
    },
    paymentMethod: '支付宝',
    extra: JSON.stringify({ source: 'demo' })
  }
];

const OrderInfoDemo = ({ locale, themeMode, selectedChatProfile, selectedUser, isAnonymousMode, onSelectUser, onAnonymousModeChange }: DemoPageProps) => {
  const messages = useMemo(() => getLocaleMessages(locale), [locale]);
  const consultButtonLabel = getConsultButtonLabel(selectedChatProfile);
  const chatConfigHint = formatChatConfigQuery(selectedChatProfile.chatConfig);
  const users = useMemo(
    () => (Object.keys(DEMO_USER_PRESETS) as DemoUserKey[]).map((key) => ({
      key,
      visitorUid: DEMO_USER_PRESETS[key].visitorUid,
      nickname: messages.pages.userInfoDemo.users[key]
    })),
    [messages]
  );

  const orderList = useMemo(
    () => DEMO_ORDERS.filter((item) => item.visitorUid === selectedUser.visitorUid),
    [selectedUser.visitorUid]
  );
  const shouldShowOrderList = !isAnonymousMode && orderList.length > 0;

  const [selectedOrderUid, setSelectedOrderUid] = useState<string>(orderList[0]?.uid || DEMO_ORDERS[0].uid);

  useEffect(() => {
    if (!orderList.length) {
      return;
    }
    if (!orderList.some((item) => item.uid === selectedOrderUid)) {
      setSelectedOrderUid(orderList[0].uid);
    }
  }, [orderList, selectedOrderUid]);

  const selectedOrder = useMemo(() => {
    if (!shouldShowOrderList) {
      return undefined;
    }
    return orderList.find((item) => item.uid === selectedOrderUid) || orderList[0];
  }, [orderList, selectedOrderUid, shouldShowOrderList]);

  const orderInfoPayload = useMemo(
    () => {
      if (!selectedOrder) {
        return undefined;
      }
      return {
        uid: selectedOrder.uid,
        visitorUid: selectedOrder.visitorUid,
        shopUid: selectedOrder.shopUid,
        shopDbUid: selectedOrder.shopDbUid,
        time: selectedOrder.time,
        status: selectedOrder.status,
        statusText: selectedOrder.statusText,
        goods: selectedOrder.goods,
        totalAmount: selectedOrder.totalAmount,
        shippingAddress: selectedOrder.shippingAddress,
        paymentMethod: selectedOrder.paymentMethod,
        extra: selectedOrder.extra
      };
    },
    [selectedOrder]
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
      title: messages.pages.basicDemo.bubbleTitle,
      subtitle: messages.pages.basicDemo.bubbleSubtitle
    },
    chatConfig: {
      ...selectedChatProfile.chatConfig,
      ...(isAnonymousMode
        ? {}
        : {
            visitorUid: selectedUser.visitorUid,
            nickname: selectedUser.nickname,
            avatar: selectedUser.avatar
          }),
      ...(orderInfoPayload
        ? {
            orderInfo: JSON.stringify(orderInfoPayload)
          }
        : {}),
      extra: JSON.stringify({
        type: 'type',
        test: 'test',
        ...(selectedOrder
          ? {
              shopUid: selectedOrder.shopUid,
              shopDbUid: selectedOrder.shopDbUid,
              visitorUid: selectedOrder.visitorUid
            }
          : {})
      })
    },
    locale,
    theme: {
      mode: themeMode
    }
  }), [
    isAnonymousMode,
    locale,
    messages.pages.basicDemo.bubbleSubtitle,
    messages.pages.basicDemo.bubbleTitle,
    messages.pages.userInfoDemo.inviteText,
    orderInfoPayload,
    selectedChatProfile.chatConfig,
    selectedOrder?.shopDbUid,
    selectedOrder?.shopUid,
    selectedOrder?.visitorUid,
    selectedUser.avatar,
    selectedUser.nickname,
    selectedUser.visitorUid,
    themeMode
  ]);

  const handleShowChat = () => (window as any).bytedesk?.showChat();
  const handleHideChat = () => (window as any).bytedesk?.hideChat();

  const handleConsultOrder = (uid: string) => {
    setSelectedOrderUid(uid);
    setTimeout(() => {
      (window as any).bytedesk?.showChat();
    }, 0);
  };

  const selectedUserKey = isAnonymousMode ? undefined : selectedUser.key;

  return (
    <PageContainer>
      <Card>
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Title level={2} style={{ marginBottom: 0 }}>{messages.pages.orderInfoDemo.title}</Title>
          <Paragraph type="secondary" style={{ marginBottom: 0 }}>{messages.pages.orderInfoDemo.description}</Paragraph>
          <Tag color="blue">当前 demo-user: {selectedUser.visitorUid}</Tag>
        </Space>
      </Card>

      <Card title="订单列表（紧凑）">
        <Space wrap style={{ marginBottom: 12 }}>
          <Text strong>当前用户</Text>
          <Select
            style={{ minWidth: 280 }}
            value={selectedUserKey}
            placeholder={messages.pages.userInfoDemo.switchAnonymousUserLabel}
            options={users.map((user) => ({
              value: user.key,
              label: `${user.nickname} (${user.visitorUid})`
            }))}
            onChange={(value) => {
              onAnonymousModeChange(false);
              onSelectUser(value);
              const nextOrder = DEMO_ORDERS.find((item) => item.visitorUid === DEMO_USER_PRESETS[value].visitorUid);
              if (nextOrder) {
                setSelectedOrderUid(nextOrder.uid);
              }
            }}
          />
          <Button
            size="small"
            type={isAnonymousMode ? 'primary' : 'default'}
            onClick={() => {
              if (isAnonymousMode) {
                return;
              }
              onAnonymousModeChange(true);
            }}
          >
            {messages.pages.userInfoDemo.switchAnonymousUserLabel}
            {isAnonymousMode ? '【当前】' : ''}
          </Button>
        </Space>

        {shouldShowOrderList ? (
          <List
            size="small"
            dataSource={orderList}
            locale={{ emptyText: '当前用户暂无订单' }}
            renderItem={(item) => {
              const active = item.uid === selectedOrder?.uid;
              return (
                <List.Item
                  style={{
                    padding: 8,
                    borderRadius: 8,
                    background: active ? 'rgba(24, 144, 255, 0.08)' : undefined,
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedOrderUid(item.uid)}
                >
                  <List.Item.Meta
                    avatar={<Avatar shape="square" size={40} src={item.goods.image} />}
                    title={<span>{item.uid} · {item.goods.title}</span>}
                    description={
                      <Space size={8} wrap>
                        <Button
                          type={active ? 'primary' : 'default'}
                          size="small"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleConsultOrder(item.uid);
                          }}
                        >
                          咨询该订单
                        </Button>
                        <Tag color="blue">{item.statusText}</Tag>
                        <Text strong>¥{item.totalAmount.toLocaleString()}</Text>
                        <Text type="secondary">{item.time}</Text>
                        <Text type="secondary">shopUid: {item.shopUid}</Text>
                      </Space>
                    }
                  />
                </List.Item>
              );
            }}
          />
        ) : (
          <Alert
            type="info"
            showIcon
            message="匿名用户无订单数据，当前咨询不会携带订单参数"
            style={{ marginBottom: 8 }}
          />
        )}

        <Space wrap style={{ marginTop: 12 }}>
          <Button type="primary" onClick={handleShowChat}>{consultButtonLabel}</Button>
          <Button onClick={handleHideChat}>{messages.common.buttons.closeChat}</Button>
          <Alert type="info" showIcon message={`咨询参数: ${chatConfigHint}`} />
        </Space>
      </Card>

      {orderInfoPayload ? (
        <Card title="当前发送的订单参数">
          <Typography.Paragraph copyable={{ text: JSON.stringify(orderInfoPayload, null, 2) }} style={{ marginBottom: 0 }}>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{JSON.stringify(orderInfoPayload, null, 2)}</pre>
          </Typography.Paragraph>
        </Card>
      ) : null}

      <BytedeskReact {...config} />
    </PageContainer>
  );
};

export default OrderInfoDemo;
