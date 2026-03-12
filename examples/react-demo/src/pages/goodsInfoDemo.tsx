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
import { useMemo, useState } from 'react';
import { Alert, Button, Card, Typography, Space, List, Tag, Select, Avatar } from 'antd';
// @ts-ignore
import { BytedeskReact } from '@bytedesk/web/adapters/react';
// @ts-ignore
import type { BytedeskConfig, Language, Theme as BytedeskTheme } from '@bytedesk/web/types';
import { getLocaleMessages } from '../locales';
import PageContainer from '../components/PageContainer';
import type { DemoUserProfile } from '../types/demo-user';
import { formatChatConfigQuery, getConsultButtonLabel, type DemoChatProfile } from '../types/chat-profile';

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
  shopDbUid: string;
}

interface DemoShop {
  shopUid: string;
  shopDbUid: string;
  name: string;
  goods: DemoGoodsInfo[];
}

interface DemoPageProps {
  locale: Language;
  themeMode: BytedeskTheme['mode'];
  selectedChatProfile: DemoChatProfile;
  selectedUser: DemoUserProfile;
  isAnonymousMode: boolean;
}

const GOODS_SHOPS: DemoShop[] = [
  {
    shopUid: 'shop_001',
    shopDbUid: 'df_org_uid_shop_001',
    name: '仰望汽车官方旗舰店',
    goods: [
      {
        uid: 'goods_001',
        title: '比亚迪 仰望U7 豪华纯电动轿车',
        image: 'https://www.weiyuai.cn/assets/images/car/yu7.jpg',
        description: '旗舰纯电轿车，续航与智能驾驶兼顾。',
        price: 299900,
        url: 'https://www.weiyuai.cn/shop/shop_001/goods/goods_001',
        tagList: ['新能源', '豪华轿车', '智能驾驶'],
        extra: JSON.stringify({ sku: 'goods_001', from: 'demo' }),
        quantity: 1,
        shopUid: 'shop_001',
        shopDbUid: 'df_org_uid_shop_001'
      },
      {
        uid: 'goods_002',
        title: '蔚来 ET7 行政版',
        image: 'https://www.weiyuai.cn/assets/images/car/yu7.jpg',
        description: '高性能智能电动轿车，支持高速 NOA。',
        price: 428000,
        url: 'https://www.weiyuai.cn/shop/shop_001/goods/goods_002',
        tagList: ['新能源', '高性能'],
        extra: JSON.stringify({ sku: 'goods_002', from: 'demo' }),
        quantity: 1,
        shopUid: 'shop_001',
        shopDbUid: 'df_org_uid_shop_001'
      },
      {
        uid: 'goods_003',
        title: '理想 L9 Max 家庭旗舰SUV',
        image: 'https://www.weiyuai.cn/assets/images/car/yu7.jpg',
        description: '大空间家庭 SUV，舒适与智能兼备。',
        price: 459800,
        url: 'https://www.weiyuai.cn/shop/shop_001/goods/goods_003',
        tagList: ['家庭SUV', '大空间'],
        extra: JSON.stringify({ sku: 'goods_003', from: 'demo' }),
        quantity: 1,
        shopUid: 'shop_001',
        shopDbUid: 'df_org_uid_shop_001'
      }
    ]
  },
  {
    shopUid: 'shop_002',
    shopDbUid: 'df_org_uid_shop_002',
    name: '星驰数码商城',
    goods: [
      {
        uid: 'goods_004',
        title: '星驰 XBook Pro 16',
        image: 'https://www.weiyuai.cn/assets/images/avatar/01.jpg',
        description: '16寸高性能轻薄本。',
        price: 9999,
        url: 'https://www.weiyuai.cn/shop/shop_002/goods/goods_004',
        tagList: ['笔记本', '轻薄'],
        extra: JSON.stringify({ sku: 'goods_004', from: 'demo' }),
        quantity: 1,
        shopUid: 'shop_002',
        shopDbUid: 'df_org_uid_shop_002'
      },
      {
        uid: 'goods_005',
        title: '星驰 NoiseCancel Pro 耳机',
        image: 'https://www.weiyuai.cn/assets/images/avatar/02.jpg',
        description: '旗舰主动降噪耳机。',
        price: 1599,
        url: 'https://www.weiyuai.cn/shop/shop_002/goods/goods_005',
        tagList: ['耳机', '主动降噪'],
        extra: JSON.stringify({ sku: 'goods_005', from: 'demo' }),
        quantity: 1,
        shopUid: 'shop_002',
        shopDbUid: 'df_org_uid_shop_002'
      },
      {
        uid: 'goods_006',
        title: '星驰 34寸电竞显示器',
        image: 'https://www.weiyuai.cn/assets/images/avatar/03.jpg',
        description: '超宽曲面，165Hz 刷新率。',
        price: 2699,
        url: 'https://www.weiyuai.cn/shop/shop_002/goods/goods_006',
        tagList: ['显示器', '电竞'],
        extra: JSON.stringify({ sku: 'goods_006', from: 'demo' }),
        quantity: 1,
        shopUid: 'shop_002',
        shopDbUid: 'df_org_uid_shop_002'
      }
    ]
  },
  {
    shopUid: 'shop_003',
    shopDbUid: 'df_org_uid_shop_003',
    name: '山海家居生活馆',
    goods: [
      {
        uid: 'goods_007',
        title: '山海原木餐桌',
        image: 'https://www.weiyuai.cn/assets/images/avatar/01.jpg',
        description: '环保原木，4-6人用餐。',
        price: 3299,
        url: 'https://www.weiyuai.cn/shop/shop_003/goods/goods_007',
        tagList: ['家具', '原木'],
        extra: JSON.stringify({ sku: 'goods_007', from: 'demo' }),
        quantity: 1,
        shopUid: 'shop_003',
        shopDbUid: 'df_org_uid_shop_003'
      },
      {
        uid: 'goods_008',
        title: '山海护脊人体工学椅',
        image: 'https://www.weiyuai.cn/assets/images/avatar/02.jpg',
        description: '久坐舒适，支撑性更好。',
        price: 1899,
        url: 'https://www.weiyuai.cn/shop/shop_003/goods/goods_008',
        tagList: ['人体工学', '办公椅'],
        extra: JSON.stringify({ sku: 'goods_008', from: 'demo' }),
        quantity: 1,
        shopUid: 'shop_003',
        shopDbUid: 'df_org_uid_shop_003'
      },
      {
        uid: 'goods_009',
        title: '山海静音床垫',
        image: 'https://www.weiyuai.cn/assets/images/avatar/03.jpg',
        description: '静音减震，提升睡眠质量。',
        price: 2599,
        url: 'https://www.weiyuai.cn/shop/shop_003/goods/goods_009',
        tagList: ['床垫', '家居'],
        extra: JSON.stringify({ sku: 'goods_009', from: 'demo' }),
        quantity: 1,
        shopUid: 'shop_003',
        shopDbUid: 'df_org_uid_shop_003'
      }
    ]
  }
];

const GoodsInfoDemo = ({ locale, themeMode, selectedChatProfile, selectedUser, isAnonymousMode }: DemoPageProps) => {
  const messages = useMemo(() => getLocaleMessages(locale), [locale]);
  const [selectedShopUid, setSelectedShopUid] = useState<string>(GOODS_SHOPS[0].shopUid);
  const selectedShop = useMemo(
    () => GOODS_SHOPS.find((shop) => shop.shopUid === selectedShopUid) || GOODS_SHOPS[0],
    [selectedShopUid]
  );
  const [selectedGoodsUid, setSelectedGoodsUid] = useState<string>(selectedShop.goods[0].uid);

  const selectedGoods = useMemo(() => {
    const hit = selectedShop.goods.find((goods) => goods.uid === selectedGoodsUid);
    return hit || selectedShop.goods[0];
  }, [selectedGoodsUid, selectedShop]);

  const consultButtonLabel = getConsultButtonLabel(selectedChatProfile);
  const chatConfigHint = formatChatConfigQuery(selectedChatProfile.chatConfig);

  const goodsInfoPayload = useMemo(
    () => ({
      uid: selectedGoods.uid,
      title: selectedGoods.title,
      image: selectedGoods.image,
      description: selectedGoods.description,
      price: selectedGoods.price,
      url: selectedGoods.url,
      tagList: selectedGoods.tagList,
      extra: selectedGoods.extra,
      quantity: selectedGoods.quantity,
      shopUid: selectedShop.shopUid,
      shopDbUid: selectedShop.shopDbUid
    }),
    [selectedGoods, selectedShop]
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
      goodsInfo: JSON.stringify(goodsInfoPayload),
      extra: JSON.stringify({
        type: 'type',
        test: 'test',
        shopUid: selectedShop.shopUid,
        shopDbUid: selectedShop.shopDbUid
      })
    },
    locale,
    theme: {
      mode: themeMode
    }
  }), [goodsInfoPayload, isAnonymousMode, locale, messages.pages.basicDemo.bubbleSubtitle, messages.pages.basicDemo.bubbleTitle, messages.pages.userInfoDemo.inviteText, selectedChatProfile.chatConfig, selectedShop.shopDbUid, selectedShop.shopUid, selectedUser.avatar, selectedUser.nickname, selectedUser.visitorUid, themeMode]);

  const handleShowChat = () => (window as any).bytedesk?.showChat();
  const handleHideChat = () => (window as any).bytedesk?.hideChat();

  const handleConsultGoods = (uid: string) => {
    setSelectedGoodsUid(uid);
    setTimeout(() => {
      (window as any).bytedesk?.showChat();
    }, 0);
  };

  return (
    <PageContainer>
      <Card>
        <Space direction="vertical" size="small" style={{ width: '100%' }}>
          <Title level={2} style={{ marginBottom: 0 }}>{messages.pages.goodsInfoDemo.title}</Title>
          <Paragraph type="secondary" style={{ marginBottom: 0 }}>{messages.pages.goodsInfoDemo.description}</Paragraph>
        </Space>
      </Card>

      <Card title="店铺与商品（紧凑列表）">
        <Space direction="vertical" size="middle" style={{ width: '100%' }}>
          <Space wrap>
            <Text strong>当前店铺</Text>
            <Select
              style={{ minWidth: 280 }}
              value={selectedShop.shopUid}
              options={GOODS_SHOPS.map((shop) => ({ value: shop.shopUid, label: `${shop.name} (${shop.shopUid})` }))}
              onChange={(value) => {
                setSelectedShopUid(value);
                const nextShop = GOODS_SHOPS.find((shop) => shop.shopUid === value) || GOODS_SHOPS[0];
                setSelectedGoodsUid(nextShop.goods[0].uid);
              }}
            />
            <Tag color="blue">shopUid: {selectedShop.shopUid}</Tag>
            <Tag>shopDbUid: {selectedShop.shopDbUid}</Tag>
          </Space>

          <List
            size="small"
            dataSource={selectedShop.goods}
            renderItem={(item) => {
              const active = item.uid === selectedGoods.uid;
              return (
                <List.Item
                  style={{
                    padding: 8,
                    borderRadius: 8,
                    background: active ? 'rgba(24, 144, 255, 0.08)' : undefined,
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedGoodsUid(item.uid)}
                >
                  <List.Item.Meta
                    avatar={<Avatar shape="square" size={40} src={item.image} />}
                    title={<span>{item.title}</span>}
                    description={
                      <Space size={8} wrap>
                        <Button
                          type={active ? 'primary' : 'default'}
                          size="small"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleConsultGoods(item.uid);
                          }}
                        >
                          咨询该商品
                        </Button>
                        <Text type="secondary">{item.uid}</Text>
                        <Text strong>¥{item.price.toLocaleString()}</Text>
                        {item.tagList.slice(0, 2).map((tag) => (
                          <Tag key={`${item.uid}-${tag}`}>{tag}</Tag>
                        ))}
                      </Space>
                    }
                  />
                </List.Item>
              );
            }}
          />

          <Space wrap>
            <Button type="primary" onClick={handleShowChat}>{consultButtonLabel}</Button>
            <Button onClick={handleHideChat}>{messages.common.buttons.closeChat}</Button>
            <Alert type="info" showIcon message={`咨询参数: ${chatConfigHint}`} />
          </Space>
        </Space>
      </Card>

      <Card title="当前发送的商品参数">
        <Typography.Paragraph copyable={{ text: JSON.stringify(goodsInfoPayload, null, 2) }} style={{ marginBottom: 0 }}>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{JSON.stringify(goodsInfoPayload, null, 2)}</pre>
        </Typography.Paragraph>
      </Card>

      <BytedeskReact {...config} />
    </PageContainer>
  );
};

export default GoodsInfoDemo;
