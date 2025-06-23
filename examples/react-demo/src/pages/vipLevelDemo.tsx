/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2025-05-27 16:46:34
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-06-21 11:11:29
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  技术/商务联系：270580156@qq.com
 * Copyright (c) 2025 by bytedesk.com, All Rights Reserved. 
 */

import { useState } from 'react';
import { Button, Card, Typography, Space, Avatar, Divider, Row, Col, Tag } from 'antd';
// @ts-ignore
import { BytedeskReact } from '@bytedesk/web/adapters/react';
// @ts-ignore
import type { BytedeskConfig } from '@bytedesk/web/types';
import { theme } from 'antd';
import React from 'react';

const { Title, Paragraph } = Typography;
const { useToken } = theme;

// 定义用户信息接口
interface UserInfo {
    uid: string;
    nickname: string;
    avatar: string;
    vipLevel: number;
}

// 定义测试用户，包含不同的VIP等级
const TEST_USERS: UserInfo[] = [
    {
        uid: 'visitor_001',
        nickname: '普通用户',
        avatar: 'https://weiyuai.cn/assets/images/avatar/02.jpg',
        vipLevel: 0
    },
    {
        uid: 'visitor_002',
        nickname: 'VIP1用户',
        avatar: 'https://weiyuai.cn/assets/images/avatar/01.jpg',
        vipLevel: 1
    },
    {
        uid: 'visitor_003',
        nickname: 'VIP2用户',
        avatar: 'https://weiyuai.cn/assets/images/avatar/03.jpg',
        vipLevel: 2
    }
];

const VipLevelDemo = () => {
    // 当前选中的用户信息
    const [currentUser, setCurrentUser] = useState<UserInfo>(TEST_USERS[0]);
    const { token } = useToken();
    const [themeKey, setThemeKey] = useState(0);

    // 配置客服组件
    const config: BytedeskConfig = {
        ...(process.env.NODE_ENV === 'development' 
        ? { 
            baseUrl: 'http://127.0.0.1:9006', 
            apiUrl: 'http://127.0.0.1:9003' 
        } 
        : {}),
        placement: 'bottom-right',
        autoPopup: false,
        forceRefresh: true,
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
            icon: '👋',
            title: '需要帮助吗？',
            subtitle: '点击与客服对话'
        },
        chatConfig: {
            org: 'df_org_uid',
            t: "1",
            sid: 'df_wg_uid',
            // 传入用户信息，包含vipLevel
            uid: currentUser.uid,
            nickname: currentUser.nickname,
            avatar: currentUser.avatar,
            vipLevel: currentUser.vipLevel,
            // 自定义字段
            extra: JSON.stringify({
                type: 'type',
                test: 'test'
            })
        },
        locale: 'zh-cn',
    };

    // 切换用户信息
    const handleSwitchUser = (user: UserInfo) => {
        setCurrentUser(user);
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

    // 获取VIP等级标签颜色
    const getVipLevelColor = (level: number) => {
        switch (level) {
            case 0:
                return 'default';
            case 1:
                return 'blue';
            case 2:
                return 'gold';
            default:
                return 'default';
        }
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
                <Title level={2} style={{ color: token.colorText }}>VIP等级对接演示</Title>
                <Paragraph style={{ color: token.colorTextSecondary }}>
                    本示例演示如何通过配置参数传入用户VIP等级（vipLevel）到客服组件中。
                    点击下方按钮可以切换不同VIP等级的用户信息。
                    <br />
                    <a href="https://www.weiyuai.cn/docs/zh-CN/docs/development/viplevel" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       style={{ color: token.colorPrimary }}>
                        查看VIP等级对接文档
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
                            <Title level={4}>当前用户信息：</Title>
                            <Space>
                                <Avatar src={currentUser.avatar} size={64} />
                                <div>
                                    <Paragraph>用户ID: {currentUser.uid}</Paragraph>
                                    <Paragraph>昵称: {currentUser.nickname}</Paragraph>
                                    <Paragraph>
                                        VIP等级: 
                                        <Tag color={getVipLevelColor(currentUser.vipLevel)} style={{ marginLeft: 8 }}>
                                            {currentUser.vipLevel === 0 ? '普通用户' : `VIP${currentUser.vipLevel}`}
                                        </Tag>
                                    </Paragraph>
                                </div>
                            </Space>
                        </div>

                        <Space>
                            {TEST_USERS.map((user) => (
                                <Button 
                                    key={user.uid}
                                    type="primary"
                                    onClick={() => handleSwitchUser(user)}
                                    disabled={currentUser.uid === user.uid}
                                >
                                    切换到{user.nickname}
                                </Button>
                            ))}
                        </Space>
                        <div style={{ textAlign: 'center', marginTop: '16px' }}>
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

export default VipLevelDemo;