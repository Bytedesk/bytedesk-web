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
import { Alert, Avatar, Button, Card, Descriptions, FloatButton, Modal, Select, Space, Table, Tag, Typography } from 'antd';
// @ts-ignore
import { BytedeskReact } from '@bytedesk/web/adapters/react';
// @ts-ignore
import type { BytedeskConfig, Language, MessageBubbleClickEvent, Theme as BytedeskTheme } from '@bytedesk/web/types';
import { getLocaleMessages } from '../locales';
import PageContainer from '../components/PageContainer';
import type { DemoUserKey, DemoUserProfile } from '../types/demo-user';
import { formatChatConfigQuery, getConsultButtonLabel, type DemoChatProfile } from '../types/chat-profile';
import type { DemoGoodsInfo, DemoOrderInfo, DemoOrderInfoInput, DemoShippingAddress, LegacyOrderInfoPayload } from '../utils/biz-card';
import { normalizeDemoGoods, normalizeDemoOrder, parseJsonString } from '../utils/biz-card';
import { parseBizPayloadFromNavigateToPath } from '../utils/biz-message-callback';
import { demoApiUrl, getDemoHtmlBaseUrl } from '../utils/env';
import { buildCurrentEmbedCodeExample, getCurrentEmbedCodeCopy } from '../utils/embed-code-guide';

const { Title, Paragraph, Text } = Typography;
const callbackModalTitle = '订单回调Demo演示';
const callbackModalZIndex = 1000000;

interface JsonResult<T> {
  code?: number;
  message?: string;
  data?: T;
}

interface PageResult<T> {
  content?: T[];
}

interface OrderApiItem {
  type?: string;
  title?: string;
  description?: string;
  orderUid?: string;
  visitorUid?: string;
  shopUid?: string;
  navigateToPath?: string;
  time?: string;
  status?: string;
  state?: string;
  statusText?: string;
  orderTitle?: string;
  orderImage?: string;
  orderDescription?: string;
  orderPrice?: number;
  orderUrl?: string;
  orderTagList?: string[] | string;
  orderExtra?: string;
  orderQuantity?: number;
  totalAmount?: number;
  shippingName?: string;
  shippingPhone?: string;
  shippingAddress?: string | DemoShippingAddress;
  paymentMethod?: string;
  extra?: string;
}

interface DemoShop {
  shopUid: string;
  name: string;
}

interface ShopApiItem {
  shopUid?: string;
  name?: string;
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

const resolveOrderDetailFromBubbleClick = (event: MessageBubbleClickEvent) => {
  const payload = parseBizPayloadFromNavigateToPath<DemoOrderInfoInput & LegacyOrderInfoPayload>(event.navigateToPath);
  if (payload) {
    return normalizeDemoOrder(payload);
  }

  return normalizeDemoOrder(parseJsonString<DemoOrderInfoInput & LegacyOrderInfoPayload>(event.content));
};

const resolveGoodsDetailFromBubbleClick = (event: MessageBubbleClickEvent) => {
  const payload = parseBizPayloadFromNavigateToPath<DemoGoodsInfo>(event.navigateToPath);
  if (payload) {
    return normalizeDemoGoods(payload);
  }

  return normalizeDemoGoods(parseJsonString<DemoGoodsInfo>(event.content));
};


const toDemoOrder = (item: OrderApiItem): DemoOrderInfo | null => {
  const normalized = normalizeDemoOrder({
    navigateToPath: item.navigateToPath,
    type: item.type,
    title: item.title,
    description: item.description,
    state: item.state,
    time: item.time,
    status: item.status,
    statusText: item.statusText,
    orderUid: item.orderUid,
    orderTitle: item.orderTitle,
    orderImage: item.orderImage,
    orderDescription: item.orderDescription,
    orderPrice: item.orderPrice,
    orderUrl: item.orderUrl,
    orderTagList: item.orderTagList,
    orderExtra: item.orderExtra,
    orderQuantity: item.orderQuantity,
    totalAmount: item.totalAmount,
    paymentMethod: item.paymentMethod,
    extra: item.extra,
    visitorUid: item.visitorUid,
    shopUid: item.shopUid,
    shippingAddress: item.shippingAddress,
    shippingName: item.shippingName,
    shippingPhone: item.shippingPhone,
  });

  return normalized || null;
};

const toDemoShop = (item: ShopApiItem): DemoShop | null => {
  if (!item.shopUid) {
    return null;
  }

  return {
    shopUid: item.shopUid,
    name: item.name || item.shopUid,
  };
};

const OrderInfoDemo = ({ locale, themeMode, selectedChatProfile, selectedUser, isAnonymousMode }: DemoPageProps) => {
  const messages = useMemo(() => getLocaleMessages(locale), [locale]);
  const htmlBaseUrl = getDemoHtmlBaseUrl(9006);
  const docLinks = [
    { href: 'https://www.weiyuai.cn/docs/zh-CN/docs/integration/order_info', label: locale === 'en' ? 'View order info integration docs' : '查看订单信息对接文档' },
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
  const [shops, setShops] = useState<DemoShop[]>([]);
  const [shopsLoading, setShopsLoading] = useState(false);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState<string>();
  const shouldShowOrderList = !isAnonymousMode && orderList.length > 0;
  const [autoSendBizInfo, setAutoSendBizInfo] = useState(true);
  const [lastBubbleClickEvent, setLastBubbleClickEvent] = useState<MessageBubbleClickEvent>();
  const [clickedOrderDetail, setClickedOrderDetail] = useState<DemoOrderInfo>();
  const [isOrderDetailModalOpen, setIsOrderDetailModalOpen] = useState(false);
  const [clickedGoodsDetail, setClickedGoodsDetail] = useState<DemoGoodsInfo>();
  const [isGoodsDetailModalOpen, setIsGoodsDetailModalOpen] = useState(false);

  const [selectedShopUid, setSelectedShopUid] = useState<string>('');
  const [selectedOrderUid, setSelectedOrderUid] = useState<string>('');

  useEffect(() => {
    if (!orgUid) {
      setShops([]);
      setOrderList([]);
      setOrdersError(locale === 'en' ? 'Missing orgUid, unable to load stores.' : '缺少 orgUid，无法加载店铺数据');
      setShopsLoading(false);
      setOrdersLoading(false);
      return;
    }

    let cancelled = false;

    const loadShops = async () => {
      setShopsLoading(true);
      setOrdersError(undefined);

      try {
        const url = new URL('/visitor/api/v1/shop/query/org', getApiBaseUrl());
        url.searchParams.set('orgUid', orgUid);
        url.searchParams.set('pageNumber', '0');
        url.searchParams.set('pageSize', '20');

        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const payload = await response.json() as JsonResult<PageResult<ShopApiItem>>;
        if (payload.code !== 200) {
          throw new Error(payload.message || 'Failed to load shops');
        }

        const nextShops = (payload.data?.content || [])
          .map(toDemoShop)
          .filter((item): item is DemoShop => Boolean(item));

        if (!cancelled) {
          setShops(nextShops);
          setSelectedShopUid((currentValue) => (
            nextShops.some((shop) => shop.shopUid === currentValue)
              ? currentValue
              : (nextShops[0]?.shopUid || '')
          ));
        }
      } catch (error) {
        if (!cancelled) {
          setShops([]);
          setOrderList([]);
          setSelectedShopUid('');
          setOrdersError(error instanceof Error ? error.message : (locale === 'en' ? 'Failed to load store data.' : '店铺数据加载失败'));
        }
      } finally {
        if (!cancelled) {
          setShopsLoading(false);
        }
      }
    };

    void loadShops();

    return () => {
      cancelled = true;
    };
  }, [locale, orgUid]);

  useEffect(() => {
    if (!orgUid || !selectedUser.visitorUid) {
      setOrderList([]);
      setOrdersError(locale === 'en' ? 'Missing orgUid or visitorUid, unable to load orders.' : '缺少 orgUid 或 visitorUid，无法加载订单数据');
      setOrdersLoading(false);
      return;
    }

    if (!selectedShopUid) {
      setOrderList([]);
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
        url.searchParams.set('shopUid', selectedShopUid);
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
  }, [locale, orgUid, selectedShopUid, selectedUser.visitorUid]);

  useEffect(() => {
    if (!shops.length) {
      if (selectedShopUid) {
        setSelectedShopUid('');
      }
      return;
    }

    if (!shops.some((item) => item.shopUid === selectedShopUid)) {
      setSelectedShopUid(shops[0].shopUid);
    }
  }, [selectedShopUid, shops]);

  const shopOptions = useMemo(() => {
    return shops.map((shop) => ({
      value: shop.shopUid,
      label: `${shop.name} (${shop.shopUid})`
    }));
  }, [shops]);

  const filteredOrderList = useMemo(() => {
    if (!shouldShowOrderList) {
      return [];
    }

    return orderList;
  }, [orderList, shouldShowOrderList]);

  useEffect(() => {
    if (!filteredOrderList.length) {
      if (selectedOrderUid) {
        setSelectedOrderUid('');
      }
      return;
    }

    if (!filteredOrderList.some((item) => item.orderUid === selectedOrderUid)) {
      setSelectedOrderUid(filteredOrderList[0].orderUid);
    }
  }, [filteredOrderList, selectedOrderUid]);

  const selectedOrder = useMemo(() => {
    if (!shouldShowOrderList) {
      return undefined;
    }

    return filteredOrderList.find((item) => item.orderUid === selectedOrderUid) || filteredOrderList[0];
  }, [filteredOrderList, selectedOrderUid, shouldShowOrderList]);

  const orderInfoPayload = useMemo(
    () => selectedOrder,
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
    onMessageBubbleClick: (event: MessageBubbleClickEvent) => {
      console.log('order demo bubble click', event);
      setLastBubbleClickEvent(event);

      if (event.type === 'ORDER') {
        const orderDetail = resolveOrderDetailFromBubbleClick(event);
        if (orderDetail) {
          setClickedOrderDetail(orderDetail);
          setIsOrderDetailModalOpen(true);
        }
        return;
      }

      if (event.type === 'GOODS') {
        const goodsDetail = resolveGoodsDetailFromBubbleClick(event);
        if (goodsDetail) {
          setClickedGoodsDetail(goodsDetail);
          setIsGoodsDetailModalOpen(true);
        }
      }
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
  const currentEmbedCodeExample = useMemo(
    () => buildCurrentEmbedCodeExample({
      config,
      callbackSources: {
        onMessageBubbleClick: `(event) => {
  console.log('order demo bubble click', event);
  const targetUrl = event.navigateToPath;
  if (!targetUrl) {
    return;
  }
  const parsed = new URL(targetUrl, window.location.origin);
  const payload = parsed.searchParams.get('payload');
  console.log('resolved target url', targetUrl);
  console.log('resolved biz payload', payload ? JSON.parse(payload) : null);
}`
      }
    }),
    [config]
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
            loading={shopsLoading}
            disabled={!shops.length}
            options={shopOptions}
            onChange={(value) => {
              setSelectedShopUid(value);
              setSelectedOrderUid('');
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
  {!ordersError && shopsLoading ? <Alert type="info" showIcon title={locale === 'en' ? 'Loading store data...' : '正在加载店铺数据...'} style={{ marginBottom: 8 }} /> : null}
        {!ordersError && ordersLoading ? <Alert type="info" showIcon title={locale === 'en' ? 'Loading order data...' : '正在加载订单数据...'} style={{ marginBottom: 8 }} /> : null}

        {shouldShowOrderList ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {filteredOrderList.map((item) => {
              const active = item.orderUid === selectedOrder?.orderUid;
              return (
                <div
                  key={item.orderUid}
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
                  onClick={() => setSelectedOrderUid(item.orderUid)}
                >
                  <Avatar shape="square" size={40} src={item.orderImage} />
                  <div style={{ flex: 1 }}>
                    <div>{item.orderUid} · {item.orderTitle}</div>
                    <Space size={8} wrap style={{ marginTop: 6 }}>
                      <Button
                        type={active ? 'primary' : 'default'}
                        size="small"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleConsultOrder(item.orderUid);
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

      <Card title={locale === 'en' ? 'Bubble click listener demo' : '消息气泡点击监听演示'}>
        <Space orientation="vertical" style={{ width: '100%' }}>
          <Alert
            type="info"
            showIcon
            title={locale === 'en'
              ? 'Click any message bubble in the embedded chat window. The SDK listener receives messageType, content, and a navigateToPath already suffixed with the original payload.'
              : '点击嵌入聊天窗口中的任意消息气泡，SDK 监听器会接收到 iframe postMessage 传出的 messageType、content，以及已自动拼接原始 payload 的 navigateToPath。'}
          />
          <Alert
            type="success"
            showIcon
            title={locale === 'en'
              ? 'Scenario: the host can read event.navigateToPath, parse its payload query parameter, and route to the corresponding order detail page without rebuilding the business payload.'
              : '应用场景：宿主系统可直接读取 event.navigateToPath，解析其中的 payload 参数，并完成订单详情页跳转，无需自行重组业务数据。'}
          />
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all', fontFamily: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace', fontSize: 12, background: 'rgba(0,0,0,0.04)', padding: '10px 12px', borderRadius: 6 }}>{JSON.stringify(lastBubbleClickEvent || {}, null, 2)}</pre>
        </Space>
      </Card>

      <Modal
        open={isOrderDetailModalOpen}
        title={callbackModalTitle}
        footer={null}
        onCancel={() => setIsOrderDetailModalOpen(false)}
        width={760}
        zIndex={callbackModalZIndex}
        getContainer={document.body}
      >
        {clickedOrderDetail ? (
          <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
            <Space align="start" size="middle" style={{ width: '100%' }}>
              <Avatar shape="square" size={88} src={clickedOrderDetail.orderImage} />
              <Space orientation="vertical" size={4} style={{ flex: 1 }}>
                <Typography.Title level={4} style={{ margin: 0 }}>{clickedOrderDetail.orderTitle}</Typography.Title>
                <Typography.Text type="secondary">{clickedOrderDetail.orderDescription || '-'}</Typography.Text>
                <Space wrap>
                  <Tag color="blue">orderUid: {clickedOrderDetail.orderUid}</Tag>
                  <Tag color="gold">shopUid: {clickedOrderDetail.shopUid}</Tag>
                  <Tag color="green">¥{clickedOrderDetail.totalAmount.toLocaleString()}</Tag>
                  <Tag color="processing">{clickedOrderDetail.statusText}</Tag>
                </Space>
              </Space>
            </Space>

            <Descriptions bordered size="small" column={1}>
              <Descriptions.Item label="type">{clickedOrderDetail.type || '-'}</Descriptions.Item>
              <Descriptions.Item label="title">{clickedOrderDetail.title || '-'}</Descriptions.Item>
              <Descriptions.Item label="description">{clickedOrderDetail.description || '-'}</Descriptions.Item>
              <Descriptions.Item label="state">{clickedOrderDetail.state || '-'}</Descriptions.Item>
              <Descriptions.Item label="status">{clickedOrderDetail.status || '-'}</Descriptions.Item>
              <Descriptions.Item label="navigateToPath">{clickedOrderDetail.navigateToPath || '-'}</Descriptions.Item>
              <Descriptions.Item label={locale === 'en' ? 'Order time' : '下单时间'}>{clickedOrderDetail.time || '-'}</Descriptions.Item>
              <Descriptions.Item label={locale === 'en' ? 'Payment method' : '支付方式'}>{clickedOrderDetail.paymentMethod || '-'}</Descriptions.Item>
              <Descriptions.Item label={locale === 'en' ? 'Visitor uid' : '访客uid'}>{clickedOrderDetail.visitorUid || '-'}</Descriptions.Item>
              <Descriptions.Item label={locale === 'en' ? 'Order URL' : '订单链接'}>{clickedOrderDetail.orderUrl || '-'}</Descriptions.Item>
              <Descriptions.Item label={locale === 'en' ? 'Goods title' : '商品标题'}>{clickedOrderDetail.orderTitle || '-'}</Descriptions.Item>
              <Descriptions.Item label={locale === 'en' ? 'Goods description' : '商品描述'}>{clickedOrderDetail.orderDescription || '-'}</Descriptions.Item>
              <Descriptions.Item label={locale === 'en' ? 'Goods price' : '商品价格'}>{clickedOrderDetail.orderPrice}</Descriptions.Item>
              <Descriptions.Item label={locale === 'en' ? 'Goods quantity' : '商品数量'}>{clickedOrderDetail.orderQuantity}</Descriptions.Item>
              <Descriptions.Item label={locale === 'en' ? 'Receiver' : '收货人'}>
                {clickedOrderDetail.shippingAddress.name || '-'} / {clickedOrderDetail.shippingAddress.phone || '-'}
              </Descriptions.Item>
              <Descriptions.Item label={locale === 'en' ? 'Shipping address' : '收货地址'}>{clickedOrderDetail.shippingAddress.address || '-'}</Descriptions.Item>
              <Descriptions.Item label={locale === 'en' ? 'Goods tags' : '商品标签'}>
                {clickedOrderDetail.orderTagList.length ? clickedOrderDetail.orderTagList.join(' / ') : '-'}
              </Descriptions.Item>
              <Descriptions.Item label={locale === 'en' ? 'Order extra' : '订单扩展信息'}>
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                  {JSON.stringify(parseJsonString<Record<string, unknown>>(clickedOrderDetail.extra) || clickedOrderDetail.extra || {}, null, 2)}
                </pre>
              </Descriptions.Item>
              <Descriptions.Item label={locale === 'en' ? 'Goods extra' : '商品扩展信息'}>
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                  {JSON.stringify(parseJsonString<Record<string, unknown>>(clickedOrderDetail.orderExtra) || clickedOrderDetail.orderExtra || {}, null, 2)}
                </pre>
              </Descriptions.Item>
              <Descriptions.Item label={locale === 'en' ? 'Raw payload' : '原始回调内容'}>
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                  {JSON.stringify(clickedOrderDetail, null, 2)}
                </pre>
              </Descriptions.Item>
            </Descriptions>
          </Space>
        ) : null}
      </Modal>

      <Modal
        open={isGoodsDetailModalOpen}
        title="商品回调Demo演示"
        footer={null}
        onCancel={() => setIsGoodsDetailModalOpen(false)}
        width={720}
        zIndex={callbackModalZIndex}
        getContainer={document.body}
      >
        {clickedGoodsDetail ? (
          <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
            <Space align="start" size="middle" style={{ width: '100%' }}>
              <Avatar shape="square" size={88} src={clickedGoodsDetail.image} />
              <Space orientation="vertical" size={4} style={{ flex: 1 }}>
                <Typography.Title level={4} style={{ margin: 0 }}>{clickedGoodsDetail.title}</Typography.Title>
                <Typography.Text type="secondary">{clickedGoodsDetail.description || '-'}</Typography.Text>
                <Space wrap>
                  <Tag color="blue">goodsUid: {clickedGoodsDetail.goodsUid}</Tag>
                  <Tag color="gold">shopUid: {clickedGoodsDetail.shopUid}</Tag>
                  <Tag color="green">¥{clickedGoodsDetail.price.toLocaleString()}</Tag>
                  <Tag>{locale === 'en' ? `Quantity: ${clickedGoodsDetail.quantity}` : `数量: ${clickedGoodsDetail.quantity}`}</Tag>
                </Space>
              </Space>
            </Space>

            <Descriptions bordered size="small" column={1}>
              <Descriptions.Item label="type">{clickedGoodsDetail.type || '-'}</Descriptions.Item>
              <Descriptions.Item label="status">{clickedGoodsDetail.status || '-'}</Descriptions.Item>
              <Descriptions.Item label="navigateToPath">{clickedGoodsDetail.navigateToPath || '-'}</Descriptions.Item>
              <Descriptions.Item label="URL">{clickedGoodsDetail.url || '-'}</Descriptions.Item>
              <Descriptions.Item label={locale === 'en' ? 'Tags' : '标签'}>
                {clickedGoodsDetail.tagList.length ? clickedGoodsDetail.tagList.join(' / ') : '-'}
              </Descriptions.Item>
              <Descriptions.Item label="extra">
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                  {JSON.stringify(parseJsonString<Record<string, unknown>>(clickedGoodsDetail.extra) || clickedGoodsDetail.extra || {}, null, 2)}
                </pre>
              </Descriptions.Item>
              <Descriptions.Item label={locale === 'en' ? 'Raw payload' : '原始回调内容'}>
                <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                  {JSON.stringify(clickedGoodsDetail, null, 2)}
                </pre>
              </Descriptions.Item>
            </Descriptions>
          </Space>
        ) : null}
      </Modal>

      <BytedeskReact {...config} />

      <FloatButton.BackTop style={{ marginRight: 200, marginBottom: -30 }}/>
    </PageContainer>
  );
};

export default OrderInfoDemo;
