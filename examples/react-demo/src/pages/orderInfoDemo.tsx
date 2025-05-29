/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2025-05-27 16:45:54
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-05-28 12:12:02
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
import { Button, Card, Typography, Space, Image, Divider, Row, Col, Tag, Steps, Descriptions } from 'antd';
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
    quantity: number
}

// 定义订单信息接口
interface OrderInfo {
    uid: string;
    time: string;
    status: 'pending' | 'paid' | 'shipped' | 'delivered';
    statusText: string;
    goods: GoodsInfo
    totalAmount: number;
    shippingAddress: {
        name: string;
        phone: string;
        address: string;
    };
    paymentMethod: string;
    extra: string;
}

// 定义测试订单
const TEST_ORDER: OrderInfo = {
    uid: 'ORD202505270001',
    time: '2025-05-27 14:30:00',
    status: 'paid',
    statusText: '已支付',
    goods: {
        uid: 'goods_001',
        title: '比亚迪 仰望U7 豪华纯电动轿车',
        image: 'https://www.weiyuai.cn/assets/images/car/yu7.jpg',
        description: '比亚迪仰望U7是一款豪华纯电动轿车，采用最新一代刀片电池技术，续航里程可达1000公里。配备智能驾驶辅助系统，支持L3级别自动驾驶。内饰采用高级真皮材质，配备全景天窗、智能座舱等豪华配置。',
        price: 299900,
        url: 'https://www.weiyuai.cn/car/yu7',
        tagList: ['新能源', '豪华轿车', '智能驾驶', '长续航'],
        // 额外信息，自定义
        extra: JSON.stringify({
            extraText: 'goodsExtraText',
            extraName: 'goodsExtraName'
        }),
        quantity: 1  // 添加数量字段
    },
    totalAmount: 299900,
    shippingAddress: {
        name: '张三',
        phone: '13800138000',
        address: '北京市朝阳区建国路88号'
    },
    paymentMethod: '微信支付',
    // 额外信息，自定义
    extra: JSON.stringify({
        extraText: 'orderExtraText',
        extraName: 'orderExtraName'
    })
};

const OrderInfoDemo = () => {
    // 当前订单信息
    const [currentOrder, setCurrentOrder] = useState<OrderInfo>(TEST_ORDER);
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
            icon: '📦',
            title: '订单有问题？',
            subtitle: '点击咨询客服'
        },
        chatConfig: {
            org: 'df_org_uid',
            t: "1",
            sid: 'df_wg_uid',
            uid: 'visitor_001',
            nickname: '访客小明',
            avatar: 'https://weiyuai.cn/assets/images/avatar/02.jpg',
            // 订单信息通过自定义消息发送
            orderInfo: JSON.stringify({
                uid: currentOrder.uid,
                time: currentOrder.time,
                status: currentOrder.status,
                statusText: currentOrder.statusText,
                goods: currentOrder.goods,
                totalAmount: currentOrder.totalAmount,
                shippingAddress: currentOrder.shippingAddress,
                paymentMethod: currentOrder.paymentMethod,
                extra: currentOrder.extra
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

    // 获取订单状态步骤
    const getOrderSteps = () => {
        type StepStatus = 'wait' | 'process' | 'finish' | 'error';
        interface OrderStep {
            title: string;
            status: StepStatus;
        }

        const steps: OrderStep[] = [
            { title: '待支付', status: 'wait' },
            { title: '已支付', status: 'wait' },
            { title: '已发货', status: 'wait' },
            { title: '已完成', status: 'wait' }
        ];

        const statusIndex = {
            'pending': 0,
            'paid': 1,
            'shipped': 2,
            'delivered': 3
        };

        const currentIndex = statusIndex[currentOrder.status];
        steps.forEach((step, index) => {
            if (index < currentIndex) {
                step.status = 'finish';
            } else if (index === currentIndex) {
                step.status = 'process';
            }
        });

        return steps;
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
                <Title level={2} style={{ color: token.colorText }}>订单信息对接演示</Title>
                <Paragraph style={{ color: token.colorTextSecondary }}>
                    本示例演示如何通过配置参数传入订单信息到客服组件中。
                    点击下方按钮可以打开客服窗口，订单信息会自动传递给客服。
                    <br />
                    <a href="https://www.weiyuai.cn/docs/zh-CN/docs/development/orderinfo" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       style={{ color: token.colorPrimary }}>
                        查看订单信息对接文档
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
                            <Title level={4}>订单状态</Title>
                            <Steps items={getOrderSteps()} />
                        </div>

                        <div>
                            <Title level={4}>订单信息</Title>
                            <Descriptions bordered>
                                <Descriptions.Item label="订单编号">{currentOrder.uid}</Descriptions.Item>
                                <Descriptions.Item label="下单时间">{currentOrder.time}</Descriptions.Item>
                                <Descriptions.Item label="订单状态">
                                    <Tag color="blue">{currentOrder.statusText}</Tag>
                                </Descriptions.Item>
                                <Descriptions.Item label="支付方式">{currentOrder.paymentMethod}</Descriptions.Item>
                                <Descriptions.Item label="订单金额">
                                    <Text strong style={{ color: '#f5222d' }}>
                                        ¥{currentOrder.totalAmount.toLocaleString()}
                                    </Text>
                                </Descriptions.Item>
                            </Descriptions>
                        </div>

                        <div>
                            <Title level={4}>商品信息</Title>
                            <Row gutter={24}>
                                <Col span={6}>
                                    <Image
                                        src={currentOrder.goods.image}
                                        alt={currentOrder.goods.title}
                                        style={{ width: '100%', borderRadius: '8px' }}
                                    />
                                </Col>
                                <Col span={18}>
                                    <Space direction="vertical" size="small">
                                        <Title level={5}>{currentOrder.goods.title}</Title>
                                        <Text>单价：¥{currentOrder.goods.price.toLocaleString()}</Text>
                                        <Text>数量：{currentOrder.goods.quantity}</Text>
                                    </Space>
                                </Col>
                            </Row>
                        </div>

                        <div>
                            <Title level={4}>收货信息</Title>
                            <Descriptions bordered>
                                <Descriptions.Item label="收货人">{currentOrder.shippingAddress.name}</Descriptions.Item>
                                <Descriptions.Item label="联系电话">{currentOrder.shippingAddress.phone}</Descriptions.Item>
                                <Descriptions.Item label="收货地址">{currentOrder.shippingAddress.address}</Descriptions.Item>
                            </Descriptions>
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            <Button type="primary" size="large" onClick={handleShowChat}>
                                咨询客服
                            </Button>
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

export default OrderInfoDemo;