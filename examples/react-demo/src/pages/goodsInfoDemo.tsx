/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2025-05-27 16:45:54
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-09-20 09:22:29
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
import { Button, Card, Typography, Space, Image, Divider, Row, Col, Tag } from 'antd';
// @ts-ignore
import { BytedeskReact } from '@bytedesk/web/adapters/react';
// @ts-ignore
import type { BytedeskConfig, Language, Theme as BytedeskTheme } from '@bytedesk/web/types';
// import { BytedeskReact } from 'bytedesk-web/react';
// import { BytedeskConfig } from 'bytedesk-web';
import { getLocaleMessages } from '../locales';
import PageContainer from '../components/PageContainer';

const { Title, Paragraph, Text } = Typography;

// 定义商品信息接口
interface GoodsInfo {
    uid: string;
    title: string;
    image: string;
    description: string;
    price: number;
    url: string;
    tagList: string[];
    extra: string;
}

const GOODS_BASE: Pick<GoodsInfo, 'uid' | 'image' | 'price' | 'url' | 'extra'> = {
    uid: 'goods_001',
    image: 'https://www.weiyuai.cn/assets/images/car/yu7.jpg',
    price: 299900,
    url: 'https://www.weiyuai.cn/assets/images/car/yu7.jpg',
    extra: JSON.stringify({
        extraText: 'goodsExtraText',
        extraName: 'goodsExtraName'
    })
};

interface DemoPageProps {
    locale: Language;
    themeMode: BytedeskTheme['mode'];
}

const GoodsInfoDemo = ({ locale, themeMode }: DemoPageProps) => {
    const messages = useMemo(() => getLocaleMessages(locale), [locale]);
    const currentGoods = useMemo<GoodsInfo>(() => ({
        ...GOODS_BASE,
        title: messages.pages.goodsInfoDemo.product.title,
        description: messages.pages.goodsInfoDemo.product.description,
        tagList: [...messages.pages.goodsInfoDemo.product.tags],
        extra: GOODS_BASE.extra
    }), [messages]);

    // 配置客服组件
    const config = useMemo<BytedeskConfig>(() => ({
        isDebug: true, // 是否开启调试模式, 默认: false, 生产环境请设置为false
        ...(process.env.NODE_ENV === 'development' ? { htmlUrl: 'http://127.0.0.1:9006' } : {}),
        placement: 'bottom-right',
        autoPopup: false,
        inviteConfig: {
            show: false,
            text: messages.pages.userInfoDemo.inviteText,
        },
        marginBottom: 20,
        marginSide: 20,
        buttonConfig: {
            show: false,
        },
        bubbleConfig: {
            show: false,
            icon: '🚗',
            title: messages.pages.localDemo.bubbleTitle,
            subtitle: messages.pages.localDemo.bubbleSubtitle
        },
        chatConfig: {
            org: 'df_org_uid', // 替换为您的组织ID
            t: "1", // 0: 一对一对话；1：工作组对话；2：机器人对话
            sid: 'df_wg_aftersales', // 替换为您的SID
            // 自定义用户信息
            visitorUid: 'visitor_001',
            nickname: '访客小明',
            avatar: 'https://weiyuai.cn/assets/images/avatar/02.jpg',
            // 商品信息通过自定义消息发送
            goodsInfo: JSON.stringify({
                uid: currentGoods.uid,
                title: currentGoods.title,
                image: currentGoods.image,
                description: currentGoods.description,
                price: currentGoods.price,
                url: currentGoods.url,
                tagList: currentGoods.tagList,
                extra: currentGoods.extra
            }),
            // 自定义字段，可以传递任何字段
            extra: JSON.stringify({
                type: 'type',
                test: 'test'
            })
        },
        locale,
        theme: {
            mode: themeMode,
        },
    }), [currentGoods, locale, messages, themeMode]);

    // Bytedesk 接口控制函数
    const handleShowChat = () => {
        console.log("showChat");
        (window as any).bytedesk?.showChat();
    };

    const handleHideChat = () => {
        console.log("hideChat");
        (window as any).bytedesk?.hideChat();
    };

    const docLinks = [
        { href: 'https://www.weiyuai.cn/docs/zh-CN/docs/development/goodsinfo', label: messages.pages.goodsInfoDemo.docLinks.goodsDoc },
        { href: 'https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/goodsInfoDemo.tsx', label: messages.pages.goodsInfoDemo.docLinks.reactExample },
        { href: 'https://github.com/Bytedesk/bytedesk-web/blob/master/examples/vue-demo/src/pages/goodsInfoDemo.vue', label: messages.pages.goodsInfoDemo.docLinks.vueExample }
    ];

    const formatApiHint = (code: string) => `${messages.common.apiHintPrefix} ${code}`;

    return (
        <PageContainer>
                <Card>
                    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                        <div>
                                <Title level={2} style={{ marginBottom: 0 }}>{messages.pages.goodsInfoDemo.title}</Title>
                                <Paragraph type="secondary" style={{ marginBottom: 0 }}>
                                        {messages.pages.goodsInfoDemo.description}
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
                            <Title level={4}>{messages.pages.goodsInfoDemo.infoCardTitle}</Title>
                            <Row gutter={24}>
                                <Col span={12}>
                                    <Image
                                        src={currentGoods.image}
                                        alt={currentGoods.title}
                                        style={{ width: '100%', borderRadius: '8px' }}
                                    />
                                </Col>
                                <Col span={12}>
                                    <Space direction="vertical" size="middle">
                                        <Title level={3}>{currentGoods.title}</Title>
                                        <Space>
                                            {currentGoods.tagList.map((tag, index) => (
                                                <Tag key={index} color="blue">{tag}</Tag>
                                            ))}
                                        </Space>
                                        <Paragraph>
                                            <Text strong>{messages.pages.goodsInfoDemo.descriptionLabel}：</Text> {currentGoods.description}
                                        </Paragraph>
                                        <Text strong style={{ fontSize: '24px', color: '#f5222d' }}>
                                            {messages.pages.goodsInfoDemo.priceLabel}: ¥{currentGoods.price.toLocaleString()}
                                        </Text>
                                        <Button type="primary" size="large" onClick={handleShowChat}>
                                            {messages.pages.goodsInfoDemo.contactSupport}
                                        </Button>
                                    </Space>
                                </Col>
                            </Row>
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
                                    <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
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

export default GoodsInfoDemo;