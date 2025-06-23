/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2025-05-27 16:45:54
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-05-28 12:36:37
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  技术/商务联系：270580156@qq.com
 * Copyright (c) 2025 by bytedesk.com, All Rights Reserved. 
 */

import { useState, useEffect } from 'react';
import { Button, Card, Typography, Space, Image, Divider, Row, Col, Tag } from 'antd';
// @ts-ignore
import { BytedeskReact } from '@bytedesk/web/adapters/react';
// @ts-ignore
import type { BytedeskConfig } from '@bytedesk/web/types';
// import { BytedeskReact } from 'bytedesk-web/react';
// import { BytedeskConfig } from 'bytedesk-web';
import { theme } from 'antd';
import { useContext } from 'react';
import React from 'react';

const { Title, Paragraph, Text } = Typography;
const { useToken } = theme;

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

// 定义测试商品
const TEST_GOODS: GoodsInfo = {
    uid: 'goods_001',
    title: '比亚迪 仰望U7 豪华纯电动轿车',
    image: 'https://www.weiyuai.cn/assets/images/car/yu7.jpg',
    description: '比亚迪仰望U7是一款豪华纯电动轿车，采用最新一代刀片电池技术，续航里程可达1000公里。配备智能驾驶辅助系统，支持L3级别自动驾驶。内饰采用高级真皮材质，配备全景天窗、智能座舱等豪华配置。',
    price: 299900,
    url: 'https://www.weiyuai.cn/assets/images/car/yu7.jpg',
    tagList: ['新能源', '豪华轿车', '智能驾驶', '长续航'],
    // 额外信息，自定义
    extra: JSON.stringify({
        extraText: 'goodsExtraText',
        extraName: 'goodsExtraName'
    })
};

const GoodsInfoDemo = () => {
    // 当前商品信息
    const [currentGoods, setCurrentGoods] = useState<GoodsInfo>(TEST_GOODS);
    const { token } = useToken();
    // const { isDarkMode } = useContext(AppContext);
    const [themeKey, setThemeKey] = useState(0); // 添加主题key用于强制重新渲染

    // 监听主题变化
    // useEffect(() => {
    //     setThemeKey(prev => prev + 1);
    // }, [isDarkMode]);

    // 配置客服组件
    const config: BytedeskConfig = {
        ...(process.env.NODE_ENV === 'development' ? { baseUrl: 'http://127.0.0.1:9006' } : {}),
        placement: 'bottom-right',
        autoPopup: false,
        inviteConfig: {
            show: false,
            text: '您好，请问有什么可以帮您？',
        },
        marginBottom: 20,
        marginSide: 20,
        buttonConfig: {
            show: false,
        },
        bubbleConfig: {
            show: false,
            icon: '🚗',
            title: '想了解更多？',
            subtitle: '点击咨询客服'
        },
        chatConfig: {
            org: 'df_org_uid', // 替换为您的组织ID
            t: "1", // 0: 一对一对话；1：工作组对话；2：机器人对话
            sid: 'df_wg_uid', // 替换为您的SID
            // 自定义用户信息
            uid: 'visitor_001',
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
        locale: 'zh-cn',
    };

    // Bytedesk 接口控制函数
    const handleShowChat = () => {
        console.log("showChat");
        (window as any).bytedesk?.showChat();
    };

    const handleHideChat = () => {
        console.log("hideChat");
        (window as any).bytedesk?.hideChat();
    };

    return (
        <div style={{
            height: '100%',
            overflowY: 'auto',
            boxSizing: 'border-box',
            background: 'transparent'
        }}>
            <div style={{
                padding: '24px',
                background: 'transparent',
                borderRadius: '8px'
            }}>
                <Title level={2} style={{ color: token.colorText }}>商品信息对接演示</Title>
                <Paragraph style={{ color: token.colorTextSecondary }}>
                    本示例演示如何通过配置参数传入商品信息（uid、title、image、description、price、url）到客服组件中。
                    点击下方按钮可以打开客服窗口，商品信息会自动传递给客服。
                    <br />
                    <a href="https://www.weiyuai.cn/docs/zh-CN/docs/development/goodsinfo" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       style={{ color: token.colorPrimary }}>
                        查看商品信息对接文档
                    </a>
                </Paragraph>

                <Card
                    key={themeKey}
                    style={{
                        marginTop: '20px',
                        background: token.colorBgContainer,
                        borderColor: token.colorBorder
                    }}
                >
                    <Space direction="vertical" size="large" style={{ width: '100%' }}>
                        <div>
                            <Title level={4}>商品信息：</Title>
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
                                        <Paragraph>{currentGoods.description}</Paragraph>
                                        <Text strong style={{ fontSize: '24px', color: '#f5222d' }}>
                                            ¥{currentGoods.price.toLocaleString()}
                                        </Text>
                                        <Button type="primary" size="large" onClick={handleShowChat}>
                                            咨询客服
                                        </Button>
                                    </Space>
                                </Col>
                            </Row>
                        </div>
                    </Space>
                </Card>

                <Card style={{ marginTop: '20px' }}>
                    <Title level={4}>微语 接口控制面板</Title>
                    <Divider />
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Card size="small" title="聊天窗口控制">
                                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                                    <Space>
                                        <Button onClick={handleShowChat}>显示聊天窗口</Button>
                                        <Button onClick={handleHideChat}>隐藏聊天窗口</Button>
                                    </Space>
                                    <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
                                        调用代码：bytedesk.showChat() / bytedesk.hideChat()
                                    </Typography.Text>
                                </Space>
                            </Card>
                        </Col>
                    </Row>
                </Card>

                <BytedeskReact {...config} />
            </div>
        </div>
    );
};

export default GoodsInfoDemo;