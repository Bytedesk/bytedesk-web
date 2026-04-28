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
import { Alert, Avatar, Button, Card, Select, Space, Table, Tag, Typography } from 'antd';
// @ts-ignore
import { BytedeskReact } from '@bytedesk/web/adapters/react';
// @ts-ignore
import type { BytedeskConfig, Language, Theme as BytedeskTheme } from '@bytedesk/web/types';
import { getLocaleMessages } from '../locales';
import PageContainer from '../components/PageContainer';
import type { DemoUserKey, DemoUserProfile } from '../types/demo-user';
import { formatChatConfigQuery, getConsultButtonLabel, type DemoChatProfile } from '../types/chat-profile';
import { demoApiUrl, getDemoHtmlBaseUrl } from '../utils/env';

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

interface JsonResult<T> {
  code?: number;
  message?: string;
  data?: T;
}

interface PageResult<T> {
  content?: T[];
}

interface OrderApiItem {
  orderUid?: string;
  visitorUid?: string;
  shopUid?: string;
  time?: string;
  status?: string;
  state?: string;
  statusText?: string;
  goodsUid?: string;
  goodsTitle?: string;
  goodsImage?: string;
  goodsDescription?: string;
  goodsPrice?: number;
  goodsUrl?: string;
  goodsTagList?: string[];
  goodsExtra?: string;
  goodsQuantity?: number;
  totalAmount?: number;
  shippingName?: string;
  shippingPhone?: string;
  shippingAddress?: string;
  paymentMethod?: string;
  extra?: string;
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

const getApiBaseUrl = () => demoApiUrl || window.location.origin;

const toOrderStatus = (value?: string): OrderStatus => {
  if (value === 'paid' || value === 'shipped' || value === 'delivered') {
    return value;
  }

  return 'pending';
};

const toDemoOrder = (item: OrderApiItem): DemoOrderInfo | null => {
  if (!item.orderUid || !item.visitorUid || !item.shopUid) {
    return null;
  }

  return {
    uid: item.orderUid,
    visitorUid: item.visitorUid,
    shopUid: item.shopUid,
    time: item.time || '',
    status: toOrderStatus(item.status || item.state),
    statusText: item.statusText || item.status || item.state || 'pending',
    goods: {
      uid: item.goodsUid || item.orderUid,
      title: item.goodsTitle || item.orderUid,
      image: item.goodsImage || '',
      description: item.goodsDescription || '',
      price: typeof item.goodsPrice === 'number' ? item.goodsPrice : 0,
      url: item.goodsUrl || '',
      tagList: Array.isArray(item.goodsTagList) ? item.goodsTagList : [],
      extra: item.goodsExtra || '',
      quantity: typeof item.goodsQuantity === 'number' ? item.goodsQuantity : 1
    },
    totalAmount: typeof item.totalAmount === 'number' ? item.totalAmount : (typeof item.goodsPrice === 'number' ? item.goodsPrice : 0),
    shippingAddress: {
      name: item.shippingName || '',
      phone: item.shippingPhone || '',
      address: item.shippingAddress || ''
    },
    paymentMethod: item.paymentMethod || '',
    extra: item.extra || ''
  };
};

const OrderInfoDemo = ({ locale, themeMode, selectedChatProfile, selectedUser, isAnonymousMode }: DemoPageProps) => {
  const messages = useMemo(() => getLocaleMessages(locale), [locale]);
  const htmlBaseUrl = getDemoHtmlBaseUrl(9006);
  const docLinks = [
    { href: 'https://www.weiyuai.cn/docs/zh-CN/docs/development/order_info', label: locale === 'en' ? 'View order info integration docs' : '查看订单信息对接文档' },
    { href: 'https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/OrderInfoDemo.tsx', label: locale === 'en' ? 'React order info sample' : 'React 订单信息对接代码示例' },
    { href: 'https://github.com/Bytedesk/bytedesk-web/blob/master/examples/vue-demo/src/pages/OrderInfoDemo.vue', label: locale === 'en' ? 'Vue order info sample' : 'Vue 订单信息对接代码示例' }
  ];
  const consultButtonLabel = getConsultButtonLabel(selectedChatProfile, locale);
  const chatConfigHint = formatChatConfigQuery(selectedChatProfile.chatConfig);
  const orgUid = selectedChatProfile.chatConfig?.org || '';
  const autoSendLabel = locale === 'en' ? 'Initial business card delivery' : '初始业务卡片发送方式';
  const autoSendOptions = locale === 'en'
    ? [
        { value: '1', label: 'Send automatically' },
        { value: '0', label: 'Preview and send manually' }
      ]
    : [
        { value: '1', label: '自动发送' },
        { value: '0', label: '弹窗确认后发送' }
      ];
  const [orderList, setOrderList] = useState<DemoOrderInfo[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState<string>();
  const shouldShowOrderList = !isAnonymousMode && orderList.length > 0;
  const [autoSendBizInfo, setAutoSendBizInfo] = useState(true);

  const [selectedShopUid, setSelectedShopUid] = useState<string>('');
  const [selectedOrderUid, setSelectedOrderUid] = useState<string>('');

  useEffect(() => {
    if (!orgUid || !selectedUser.visitorUid) {
      setOrderList([]);
      setOrdersError(locale === 'en' ? 'Missing orgUid or visitorUid, unable to load orders.' : '缺少 orgUid 或 visitorUid，无法加载订单数据');
      setOrdersLoading(false);
      return;
    }

    let cancelled = false;

    const loadOrders = async () => {
      setOrdersLoading(true);
      setOrdersError(undefined);

      try {
        const url = new URL('/visitor/api/v1/order/query/visitor', getApiBaseUrl());
        url.searchParams.set('orgUid', orgUid);
        url.searchParams.set('visitorUid', selectedUser.visitorUid);

        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const payload = await response.json() as JsonResult<PageResult<OrderApiItem>>;
        if (payload.code !== 200) {
          throw new Error(payload.message || 'Failed to load orders');
        }

        const orders = (payload.data?.content || [])
          .map(toDemoOrder)
          .filter((item): item is DemoOrderInfo => Boolean(item));

        if (!cancelled) {
          setOrderList(orders);
        }
      } catch (error) {
        if (!cancelled) {
          setOrderList([]);
          setOrdersError(error instanceof Error ? error.message : (locale === 'en' ? 'Failed to load order data.' : '订单数据加载失败'));
        }
      } finally {
        if (!cancelled) {
          setOrdersLoading(false);
        }
      }
    };

    void loadOrders();

    return () => {
      cancelled = true;
    };
  }, [locale, orgUid, selectedUser.visitorUid]);

  useEffect(() => {
    if (!orderList.length) {
      if (selectedShopUid) {
        setSelectedShopUid('');
      }
      return;
    }

    if (!orderList.some((item) => item.shopUid === selectedShopUid)) {
      setSelectedShopUid(orderList[0].shopUid);
    }
  }, [orderList, selectedShopUid]);

  const shopOptions = useMemo(() => {
    const shopCountMap = new Map<string, number>();

    orderList.forEach((item) => {
      shopCountMap.set(item.shopUid, (shopCountMap.get(item.shopUid) || 0) + 1);
    });

    return Array.from(shopCountMap.entries()).map(([shopUid, count]) => ({
      value: shopUid,
      label: `${shopUid} (${count})`
    }));
  }, [orderList]);

  const filteredOrderList = useMemo(() => {
    if (!shouldShowOrderList) {
      return [];
    }

    if (!selectedShopUid) {
      return orderList;
    }

    return orderList.filter((item) => item.shopUid === selectedShopUid);
  }, [orderList, selectedShopUid, shouldShowOrderList]);

  useEffect(() => {
    if (!filteredOrderList.length) {
      if (selectedOrderUid) {
        setSelectedOrderUid('');
      }
      return;
    }

    if (!filteredOrderList.some((item) => item.uid === selectedOrderUid)) {
      setSelectedOrderUid(filteredOrderList[0].uid);
    }
  }, [filteredOrderList, selectedOrderUid]);

  const selectedOrder = useMemo(() => {
    if (!shouldShowOrderList) {
      return undefined;
    }

    return filteredOrderList.find((item) => item.uid === selectedOrderUid) || filteredOrderList[0];
  }, [filteredOrderList, selectedOrderUid, shouldShowOrderList]);

  const orderInfoPayload = useMemo(
    () => {
      if (!selectedOrder) {
        return undefined;
      }
      return {
        uid: selectedOrder.uid,
        visitorUid: selectedOrder.visitorUid,
        shopUid: selectedOrder.shopUid,
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
    htmlUrl: htmlBaseUrl,
    ...(demoApiUrl
      ? {
          apiUrl: demoApiUrl
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
      show: true,
      action: 'chat'
    },
    bubbleConfig: {
      show: true,
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
      autoSendBizInfo: autoSendBizInfo ? '1' : '0',
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
    autoSendBizInfo,
    isAnonymousMode,
    htmlBaseUrl,
    locale,
    messages.pages.basicDemo.bubbleSubtitle,
    messages.pages.basicDemo.bubbleTitle,
    messages.pages.userInfoDemo.inviteText,
    orderInfoPayload,
    selectedChatProfile.chatConfig,
    selectedOrder?.shopUid,
    selectedOrder?.visitorUid,
    selectedUser.avatar,
    selectedUser.nickname,
    selectedUser.visitorUid,
    themeMode
  ]);

  const handleShowChat = () => (window as any).bytedesk?.showChat();
  const handleHideChat = () => (window as any).bytedesk?.hideChat();

  const chatPageUrl = useMemo(() => {
    const baseHtmlUrl = (config.htmlUrl || 'https://cdn.weiyuai.cn/chat').replace(/\/?chat(?:\/thread)?\/?$/, '');
    const params = new URLSearchParams();
    const appendIfPresent = (key: string, value: string | undefined) => {
      if (value) {
        params.append(key, value);
      }
    };

    params.append('org', config.chatConfig?.org || '');
    params.append('t', String(config.chatConfig?.t || '1'));
    params.append('sid', String(config.chatConfig?.sid || ''));
    appendIfPresent('visitorUid', config.chatConfig?.visitorUid);
    appendIfPresent('nickname', config.chatConfig?.nickname);
    appendIfPresent('avatar', config.chatConfig?.avatar);
    appendIfPresent('orderInfo', String(config.chatConfig?.orderInfo || ''));
    appendIfPresent('autoSendBizInfo', String((config.chatConfig as any)?.autoSendBizInfo || ''));
    appendIfPresent('extra', String(config.chatConfig?.extra || ''));
    params.append('lang', locale);
    params.append('mode', String(themeMode || 'light'));
    return `${baseHtmlUrl}/chat?${params.toString()}`;
  }, [config.chatConfig, config.htmlUrl, locale, themeMode]);

  const handleConsultOrder = (uid: string) => {
    setSelectedOrderUid(uid);
    setTimeout(() => {
      (window as any).bytedesk?.showChat();
    }, 0);
  };

  const rawUrlParams = useMemo(() => Array.from(new URL(chatPageUrl).searchParams.entries()), [chatPageUrl]);
  const requiredUrlParams = useMemo(() => new Set(['org', 't', 'sid']), []);
  const urlParamPurposeMap = useMemo<Record<string, string>>(() => ({
    ...messages.pages.orderInfoDemo.urlParamPurposes,
    autoSendBizInfo: locale === 'en'
      ? 'Whether goods or order cards are sent automatically when chat initializes. Use 0 for manual confirmation.'
      : '控制商品或订单卡片是否在会话初始化后自动发送；传 0 时改为弹窗确认发送。'
  } as Record<string, string>), [messages.pages.orderInfoDemo.urlParamPurposes]);

  const encodeHintText = locale === 'en'
    ? 'If you manually build URL strings, encode this parameter value with encodeURIComponent.'
    : '若手动拼接 URL，请对该参数值使用 encodeURIComponent 编码。';

  const needsManualEncoding = (key: string) => ['nickname', 'avatar', 'orderInfo', 'extra'].includes(key);

  const withEncodeHint = (key: string, purpose: string) => (
    needsManualEncoding(key) ? `${purpose} ${encodeHintText}` : purpose
  );

  const urlParams = useMemo(
    () => rawUrlParams.map(([key, value]) => ({ key, value, purpose: withEncodeHint(key, urlParamPurposeMap[key] || '—') })),
    [rawUrlParams, urlParamPurposeMap, encodeHintText]
  );

  return (
    <PageContainer>
      <Card>
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          <div>
            <Title level={2} style={{ marginBottom: 0 }}>{messages.pages.orderInfoDemo.title}</Title>
            <Paragraph type="secondary" style={{ marginBottom: 0 }}>{messages.pages.orderInfoDemo.description}</Paragraph>
          </div>
          <Space orientation="vertical" size={4}>
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
          <Tag color="blue">{messages.pages.orderInfoDemo.currentDemoUserLabel}: {selectedUser.visitorUid}</Tag>
        </Space>
      </Card>

      <Card title={messages.pages.orderInfoDemo.orderListCardTitle}>
        <Space wrap style={{ marginBottom: 12 }}>
          <Text strong>{messages.pages.goodsInfoDemo.currentShopLabel}</Text>
          <Select
            style={{ minWidth: 280 }}
            value={selectedShopUid || undefined}
            placeholder={messages.pages.goodsInfoDemo.currentShopLabel}
            loading={ordersLoading}
            disabled={!orderList.length}
            options={shopOptions}
            onChange={(value) => {
              setSelectedShopUid(value);
              setSelectedOrderUid(orderList.find((item) => item.shopUid === value)?.uid || '');
            }}
          />
          {selectedShopUid ? <Tag color="blue">shopUid: {selectedShopUid}</Tag> : null}
          <Text strong>{autoSendLabel}</Text>
          <Select
            style={{ minWidth: 220 }}
            value={autoSendBizInfo ? '1' : '0'}
            options={autoSendOptions}
            onChange={(value) => setAutoSendBizInfo(value === '1')}
          />
        </Space>

        {ordersError ? <Alert type="error" showIcon title={ordersError} style={{ marginBottom: 8 }} /> : null}
        {!ordersError && ordersLoading ? <Alert type="info" showIcon title={locale === 'en' ? 'Loading order data...' : '正在加载订单数据...'} style={{ marginBottom: 8 }} /> : null}

        {shouldShowOrderList ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filteredOrderList.map((item) => {
              const active = item.uid === selectedOrder?.uid;
              return (
                <div
                  key={item.uid}
                  style={{
                    display: 'flex',
                    gap: 12,
                    alignItems: 'flex-start',
                    padding: 8,
                    borderRadius: 8,
                    background: active ? 'rgba(24, 144, 255, 0.08)' : undefined,
                    cursor: 'pointer',
                    border: '1px solid rgba(0,0,0,0.06)'
                  }}
                  onClick={() => setSelectedOrderUid(item.uid)}
                >
                  <Avatar shape="square" size={40} src={item.goods.image} />
                  <div style={{ flex: 1 }}>
                    <div>{item.uid} · {item.goods.title}</div>
                    <Space size={8} wrap style={{ marginTop: 6 }}>
                      <Button
                        type={active ? 'primary' : 'default'}
                        size="small"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleConsultOrder(item.uid);
                        }}
                      >
                        {messages.pages.orderInfoDemo.consultOrderBtn}
                      </Button>
                      <Tag color="blue">{item.statusText}</Tag>
                      <Text strong>¥{item.totalAmount.toLocaleString()}</Text>
                      <Text type="secondary">{item.time}</Text>
                      <Text type="secondary">shopUid: {item.shopUid}</Text>
                    </Space>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <Alert
            type={ordersError ? 'error' : 'info'}
            showIcon
            title={isAnonymousMode
              ? messages.pages.orderInfoDemo.anonymousNoOrderAlert
              : (locale === 'en' ? 'No order data returned for the current visitor.' : '当前访客暂无可用订单数据')}
            style={{ marginBottom: 8 }}
          />
        )}

        <Space wrap style={{ marginTop: 12 }}>
          <Button type="primary" onClick={handleShowChat} disabled={!selectedOrder && !isAnonymousMode}>{consultButtonLabel}</Button>
          <Button onClick={handleHideChat}>{messages.common.buttons.closeChat}</Button>
          <Button onClick={() => window.open(chatPageUrl, '_blank', 'width=420,height=680,resizable=yes,scrollbars=yes')} disabled={!selectedOrder && !isAnonymousMode}>
            {messages.common.buttons.openInNewWindow}
          </Button>
          <Button onClick={() => window.open(chatPageUrl, '_blank')} disabled={!selectedOrder && !isAnonymousMode}>
            {messages.common.buttons.openInNewTab}
          </Button>
          <Alert type="info" showIcon title={`${messages.pages.orderInfoDemo.consultParamsLabel}: ${chatConfigHint}`} />
        </Space>
      </Card>

      {orderInfoPayload ? (
        <Card title={messages.pages.orderInfoDemo.orderPayloadCardTitle}>
          <Space orientation="vertical" style={{ width: '100%' }}>
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{JSON.stringify(orderInfoPayload, null, 2)}</pre>
            <Typography.Text type="secondary">{messages.pages.orderInfoDemo.orderStringifyHint}</Typography.Text>
            <pre style={{ margin: 0, fontFamily: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace', fontSize: 12, background: 'rgba(0,0,0,0.04)', padding: '10px 12px', borderRadius: 6 }}>{`chatConfig: {\n  orderInfo: JSON.stringify(orderInfoPayload),\n}`}</pre>
          </Space>
        </Card>
      ) : null}

      <Card title={messages.pages.orderInfoDemo.urlParamsCardTitle}>
        <Space orientation="vertical" style={{ width: '100%' }}>
          <Typography.Text type="secondary">{messages.pages.orderInfoDemo.standaloneUrlLabel}</Typography.Text>
          <pre style={{ margin: 0, fontFamily: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace', fontSize: 12, background: 'rgba(0,0,0,0.04)', padding: '10px 12px', borderRadius: 6, wordBreak: 'break-all' }}>{chatPageUrl}</pre>
          <Table
            size="small"
            bordered
            pagination={false}
            rowKey="key"
            dataSource={urlParams}
            columns={[
              {
                title: messages.pages.orderInfoDemo.paramNameCol,
                dataIndex: 'key',
                key: 'key',
                width: 180,
                ellipsis: true,
                render: (value: string) => (
                  <Space size={6} wrap={false}>
                    <Typography.Text copyable={{ text: value }} style={{ whiteSpace: 'nowrap', marginBottom: 0 }}>
                      {value}
                    </Typography.Text>
                    <Tag color={requiredUrlParams.has(value) ? 'error' : 'default'}>
                      {requiredUrlParams.has(value) ? messages.pages.orderInfoDemo.requiredLabel : messages.pages.orderInfoDemo.optionalLabel}
                    </Tag>
                  </Space>
                ),
              },
              {
                title: messages.pages.orderInfoDemo.paramValueCol,
                dataIndex: 'value',
                key: 'value',
                render: (value: string) => (
                  <Typography.Text>{value}</Typography.Text>
                ),
              },
              {
                title: messages.pages.orderInfoDemo.paramPurposeCol,
                dataIndex: 'purpose',
                key: 'purpose',
              },
            ]}
          />
          <Typography.Text type="secondary">{messages.pages.orderInfoDemo.orderUrlHint}</Typography.Text>
          <pre style={{ margin: 0, fontFamily: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace', fontSize: 12, background: 'rgba(0,0,0,0.04)', padding: '10px 12px', borderRadius: 6 }}>{`const params = new URLSearchParams();\nparams.append('orderInfo', JSON.stringify(orderInfoPayload));\nconst url = \`https://cdn.weiyuai.cn/chat?\${params.toString()}\`;`}</pre>
        </Space>
      </Card>

      <BytedeskReact {...config} />
    </PageContainer>
  );
};

export default OrderInfoDemo;
