/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2025-05-27 16:45:54
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2026-03-11 10:40:00
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
import type { DemoUserProfile } from '../types/demo-user';
import { formatChatConfigQuery, getConsultButtonLabel, type DemoChatProfile } from '../types/chat-profile';
import { demoApiUrl, getDemoHtmlBaseUrl } from '../utils/env';

const { Title, Paragraph, Text } = Typography;

interface DemoGoodsInfo {
  uid: string;
  title: string;
  image: string;
  description: string;
  price: number;
  url: string;
  tagList: string[];
  extra: string;
  quantity: number;
  shopUid: string;
}

interface DemoShop {
  shopUid: string;
  name: string;
  goods: DemoGoodsInfo[];
}

interface JsonResult<T> {
  code?: number;
  message?: string;
  data?: T;
}

interface PageResult<T> {
  content?: T[];
}

interface GoodsApiItem {
  goodsUid?: string;
  shopUid?: string;
  title?: string;
  image?: string;
  description?: string;
  price?: number;
  url?: string;
  tagList?: string[];
  extra?: string;
  quantity?: number;
}

interface DemoPageProps {
  locale: Language;
  themeMode: BytedeskTheme['mode'];
  selectedChatProfile: DemoChatProfile;
  selectedUser: DemoUserProfile;
  isAnonymousMode: boolean;
}

const getApiBaseUrl = () => demoApiUrl || window.location.origin;

const toDemoGoods = (item: GoodsApiItem): DemoGoodsInfo | null => {
  if (!item.goodsUid || !item.shopUid) {
    return null;
  }

  return {
    uid: item.goodsUid,
    title: item.title || item.goodsUid,
    image: item.image || '',
    description: item.description || '',
    price: typeof item.price === 'number' ? item.price : 0,
    url: item.url || '',
    tagList: Array.isArray(item.tagList) ? item.tagList : [],
    extra: item.extra || '',
    quantity: typeof item.quantity === 'number' ? item.quantity : 1,
    shopUid: item.shopUid
  };
};

const groupGoodsByShop = (goodsList: DemoGoodsInfo[]): DemoShop[] => {
  const shopMap = new Map<string, DemoShop>();

  goodsList.forEach((goods) => {
    const existingShop = shopMap.get(goods.shopUid);
    if (existingShop) {
      existingShop.goods.push(goods);
      return;
    }

    shopMap.set(goods.shopUid, {
      shopUid: goods.shopUid,
      name: goods.shopUid,
      goods: [goods]
    });
  });

  return Array.from(shopMap.values());
};

const GoodsInfoDemo = ({ locale, themeMode, selectedChatProfile, selectedUser, isAnonymousMode }: DemoPageProps) => {
  const messages = useMemo(() => getLocaleMessages(locale), [locale]);
  const htmlBaseUrl = getDemoHtmlBaseUrl(9006);
  const docLinks = [
    { href: 'https://www.weiyuai.cn/docs/zh-CN/docs/development/goods_info', label: locale === 'en' ? 'View goods info integration docs' : '查看商品信息对接文档' },
    { href: 'https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/GoodsInfoDemo.tsx', label: locale === 'en' ? 'React goods info sample' : 'React 商品信息对接代码示例' },
    { href: 'https://github.com/Bytedesk/bytedesk-web/blob/master/examples/vue-demo/src/pages/GoodsInfoDemo.vue', label: locale === 'en' ? 'Vue goods info sample' : 'Vue 商品信息对接代码示例' }
  ];
  const orgUid = selectedChatProfile.chatConfig?.org || '';
  const [goodsShops, setGoodsShops] = useState<DemoShop[]>([]);
  const [goodsLoading, setGoodsLoading] = useState(false);
  const [goodsError, setGoodsError] = useState<string>();
  const [selectedShopUid, setSelectedShopUid] = useState<string>('');
  const [selectedGoodsUid, setSelectedGoodsUid] = useState<string>('');
  const [autoSendBizInfo, setAutoSendBizInfo] = useState(true);

  useEffect(() => {
    if (!orgUid) {
      setGoodsShops([]);
      setGoodsError(locale === 'en' ? 'Missing orgUid, unable to load goods data.' : '缺少 orgUid，无法加载商品数据');
      setGoodsLoading(false);
      return;
    }

    let cancelled = false;

    const loadGoods = async () => {
      setGoodsLoading(true);
      setGoodsError(undefined);

      try {
        const url = new URL('/visitor/api/v1/goods/query/org', getApiBaseUrl());
        url.searchParams.set('orgUid', orgUid);

        const response = await fetch(url.toString());
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const payload = await response.json() as JsonResult<PageResult<GoodsApiItem>>;
        if (payload.code !== 200) {
          throw new Error(payload.message || 'Failed to load goods');
        }

        const shops = groupGoodsByShop(
          (payload.data?.content || [])
            .map(toDemoGoods)
            .filter((item): item is DemoGoodsInfo => Boolean(item))
        );

        if (!cancelled) {
          setGoodsShops(shops);
        }
      } catch (error) {
        if (!cancelled) {
          setGoodsShops([]);
          setGoodsError(error instanceof Error ? error.message : (locale === 'en' ? 'Failed to load goods data.' : '商品数据加载失败'));
        }
      } finally {
        if (!cancelled) {
          setGoodsLoading(false);
        }
      }
    };

    void loadGoods();

    return () => {
      cancelled = true;
    };
  }, [locale, orgUid]);

  const selectedShop = useMemo(
    () => goodsShops.find((shop) => shop.shopUid === selectedShopUid) || goodsShops[0],
    [goodsShops, selectedShopUid]
  );

  useEffect(() => {
    if (!goodsShops.length) {
      if (selectedShopUid) {
        setSelectedShopUid('');
      }
      return;
    }

    if (!goodsShops.some((shop) => shop.shopUid === selectedShopUid)) {
      setSelectedShopUid(goodsShops[0].shopUid);
    }
  }, [goodsShops, selectedShopUid]);

  useEffect(() => {
    if (!selectedShop?.goods.length) {
      if (selectedGoodsUid) {
        setSelectedGoodsUid('');
      }
      return;
    }

    if (!selectedShop.goods.some((goods) => goods.uid === selectedGoodsUid)) {
      setSelectedGoodsUid(selectedShop.goods[0].uid);
    }
  }, [selectedGoodsUid, selectedShop]);

  const selectedGoods = useMemo(() => {
    if (!selectedShop) {
      return undefined;
    }

    const hit = selectedShop.goods.find((goods) => goods.uid === selectedGoodsUid);
    return hit || selectedShop.goods[0];
  }, [selectedGoodsUid, selectedShop]);

  const consultButtonLabel = getConsultButtonLabel(selectedChatProfile, locale);
  const chatConfigHint = formatChatConfigQuery(selectedChatProfile.chatConfig);
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

  const goodsInfoPayload = useMemo(
    () => selectedGoods && selectedShop
      ? {
          uid: selectedGoods.uid,
          title: selectedGoods.title,
          image: selectedGoods.image,
          description: selectedGoods.description,
          price: selectedGoods.price,
          url: selectedGoods.url,
          tagList: selectedGoods.tagList,
          extra: selectedGoods.extra,
          quantity: selectedGoods.quantity,
          shopUid: selectedShop.shopUid
        }
      : undefined,
    [selectedGoods, selectedShop]
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
      icon: '🚗',
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
      ...(goodsInfoPayload
        ? {
            goodsInfo: JSON.stringify(goodsInfoPayload)
          }
        : {}),
      ...(selectedShop
        ? {
            extra: JSON.stringify({
              type: 'type',
              test: 'test',
              shopUid: selectedShop.shopUid
            })
          }
        : {})
    },
    locale,
    theme: {
      mode: themeMode
    }
  }), [autoSendBizInfo, goodsInfoPayload, htmlBaseUrl, isAnonymousMode, locale, messages.pages.basicDemo.bubbleSubtitle, messages.pages.basicDemo.bubbleTitle, messages.pages.userInfoDemo.inviteText, selectedChatProfile.chatConfig, selectedShop, selectedUser.avatar, selectedUser.nickname, selectedUser.visitorUid, themeMode]);

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
    appendIfPresent('goodsInfo', String(config.chatConfig?.goodsInfo || ''));
    appendIfPresent('autoSendBizInfo', String((config.chatConfig as any)?.autoSendBizInfo || ''));
    appendIfPresent('extra', String(config.chatConfig?.extra || ''));
    params.append('lang', locale);
    params.append('mode', String(themeMode || 'light'));
    return `${baseHtmlUrl}/chat?${params.toString()}`;
  }, [config.chatConfig, config.htmlUrl, locale, themeMode]);

  const handleConsultGoods = (uid: string) => {
    setSelectedGoodsUid(uid);
    setTimeout(() => {
      (window as any).bytedesk?.showChat();
    }, 0);
  };

  const rawUrlParams = useMemo(() => Array.from(new URL(chatPageUrl).searchParams.entries()), [chatPageUrl]);
  const requiredUrlParams = useMemo(() => new Set(['org', 't', 'sid']), []);
  const urlParamPurposeMap = useMemo<Record<string, string>>(() => ({
    ...messages.pages.goodsInfoDemo.urlParamPurposes,
    autoSendBizInfo: locale === 'en'
      ? 'Whether goods or order cards are sent automatically when chat initializes. Use 0 for manual confirmation.'
      : '控制商品或订单卡片是否在会话初始化后自动发送；传 0 时改为弹窗确认发送。'
  } as Record<string, string>), [messages.pages.goodsInfoDemo.urlParamPurposes]);

  const encodeHintText = locale === 'en'
    ? 'If you manually build URL strings, encode this parameter value with encodeURIComponent.'
    : '若手动拼接 URL，请对该参数值使用 encodeURIComponent 编码。';

  const needsManualEncoding = (key: string) => ['nickname', 'avatar', 'goodsInfo', 'extra'].includes(key);

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
            <Title level={2} style={{ marginBottom: 0 }}>{messages.pages.goodsInfoDemo.title}</Title>
            <Paragraph type="secondary" style={{ marginBottom: 0 }}>{messages.pages.goodsInfoDemo.description}</Paragraph>
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
        </Space>
      </Card>

      <Card title={messages.pages.goodsInfoDemo.shopGoodsCardTitle}>
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          <Space wrap>
            <Text strong>{messages.pages.goodsInfoDemo.currentShopLabel}</Text>
            <Select
              style={{ minWidth: 280 }}
              value={selectedShop?.shopUid}
              loading={goodsLoading}
              options={goodsShops.map((shop) => ({ value: shop.shopUid, label: `${shop.name} (${shop.shopUid})` }))}
              onChange={(value) => {
                setSelectedShopUid(value);
                const nextShop = goodsShops.find((shop) => shop.shopUid === value);
                setSelectedGoodsUid(nextShop?.goods[0]?.uid || '');
              }}
            />
            {selectedShop ? <Tag color="blue">shopUid: {selectedShop.shopUid}</Tag> : null}
            <Text strong>{autoSendLabel}</Text>
            <Select
              style={{ minWidth: 220 }}
              value={autoSendBizInfo ? '1' : '0'}
              options={autoSendOptions}
              onChange={(value) => setAutoSendBizInfo(value === '1')}
            />
          </Space>

          {goodsError ? <Alert type="error" showIcon title={goodsError} /> : null}
          {!goodsError && goodsLoading ? <Alert type="info" showIcon title={locale === 'en' ? 'Loading goods data...' : '正在加载商品数据...'} /> : null}
          {!goodsError && !goodsLoading && !selectedShop ? <Alert type="warning" showIcon title={locale === 'en' ? 'No goods data returned by API.' : '接口未返回商品数据'} /> : null}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {(selectedShop?.goods || []).map((item) => {
              const active = item.uid === selectedGoods?.uid;
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
                  onClick={() => setSelectedGoodsUid(item.uid)}
                >
                  <Avatar shape="square" size={40} src={item.image} />
                  <div style={{ flex: 1 }}>
                    <div>{item.title}</div>
                    <Space size={8} wrap style={{ marginTop: 6 }}>
                      <Button
                        type={active ? 'primary' : 'default'}
                        size="small"
                        onClick={(event) => {
                          event.stopPropagation();
                          handleConsultGoods(item.uid);
                        }}
                      >
                        {messages.pages.goodsInfoDemo.consultGoodsBtn}
                      </Button>
                      <Text type="secondary">{item.uid}</Text>
                      <Text strong>¥{item.price.toLocaleString()}</Text>
                      {item.tagList.slice(0, 2).map((tag) => (
                        <Tag key={`${item.uid}-${tag}`}>{tag}</Tag>
                      ))}
                    </Space>
                  </div>
                </div>
              );
            })}
          </div>

          <Space wrap>
            <Button type="primary" onClick={handleShowChat} disabled={!selectedGoods}>{consultButtonLabel}</Button>
            <Button onClick={handleHideChat}>{messages.common.buttons.closeChat}</Button>
            <Button onClick={() => window.open(chatPageUrl, '_blank', 'width=420,height=680,resizable=yes,scrollbars=yes')} disabled={!selectedGoods}>
              {messages.common.buttons.openInNewWindow}
            </Button>
            <Button onClick={() => window.open(chatPageUrl, '_blank')} disabled={!selectedGoods}>
              {messages.common.buttons.openInNewTab}
            </Button>
            <Alert type="info" showIcon title={`${messages.pages.goodsInfoDemo.consultParamsLabel}: ${chatConfigHint}`} />
          </Space>
        </Space>
      </Card>

      <Card title={messages.pages.goodsInfoDemo.goodsPayloadCardTitle}>
        <Space orientation="vertical" style={{ width: '100%' }}>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{JSON.stringify(goodsInfoPayload || {}, null, 2)}</pre>
          <Typography.Text type="secondary">{messages.pages.goodsInfoDemo.goodsStringifyHint}</Typography.Text>
          <pre style={{ margin: 0, fontFamily: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace', fontSize: 12, background: 'rgba(0,0,0,0.04)', padding: '10px 12px', borderRadius: 6 }}>{`chatConfig: {\n  goodsInfo: JSON.stringify(goodsInfoPayload),\n}`}</pre>
        </Space>
      </Card>

      <Card title={messages.pages.goodsInfoDemo.urlParamsCardTitle}>
        <Space orientation="vertical" style={{ width: '100%' }}>
          <Typography.Text type="secondary">{messages.pages.goodsInfoDemo.standaloneUrlLabel}</Typography.Text>
          <pre style={{ margin: 0, fontFamily: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace', fontSize: 12, background: 'rgba(0,0,0,0.04)', padding: '10px 12px', borderRadius: 6, wordBreak: 'break-all' }}>{chatPageUrl}</pre>
          <Table
            size="small"
            bordered
            pagination={false}
            rowKey="key"
            dataSource={urlParams}
            columns={[
              {
                title: messages.pages.goodsInfoDemo.paramNameCol,
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
                      {requiredUrlParams.has(value) ? messages.pages.goodsInfoDemo.requiredLabel : messages.pages.goodsInfoDemo.optionalLabel}
                    </Tag>
                  </Space>
                ),
              },
              {
                title: messages.pages.goodsInfoDemo.paramValueCol,
                dataIndex: 'value',
                key: 'value',
                render: (value: string) => (
                  <Typography.Text>{value}</Typography.Text>
                ),
              },
              {
                title: messages.pages.goodsInfoDemo.paramPurposeCol,
                dataIndex: 'purpose',
                key: 'purpose',
              },
            ]}
          />
          <Typography.Text type="secondary">{messages.pages.goodsInfoDemo.goodsUrlHint}</Typography.Text>
          <pre style={{ margin: 0, fontFamily: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, monospace', fontSize: 12, background: 'rgba(0,0,0,0.04)', padding: '10px 12px', borderRadius: 6 }}>{`const params = new URLSearchParams();\nparams.append('goodsInfo', JSON.stringify(goodsInfoPayload));\nconst url = \`https://cdn.weiyuai.cn/chat?\${params.toString()}\`;`}</pre>
        </Space>
      </Card>

      <BytedeskReact {...config} />
    </PageContainer>
  );
};

export default GoodsInfoDemo;
