/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2025-05-27 16:46:34
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-07-12 09:34:52
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
import { Button, Card, Typography, Space, Avatar, Divider, Row, Col } from 'antd';
// @ts-ignore
import { BytedeskReact } from '@bytedesk/web/adapters/react';
// @ts-ignore
import type { BytedeskConfig } from '@bytedesk/web/types';
// import { BytedeskReact } from 'bytedesk-web/react';
// import { BytedeskConfig } from 'bytedesk-web';
import { theme } from 'antd';
// import { useContext } from 'react';
import React from 'react';

const { Title, Paragraph } = Typography;
const { useToken } = theme;

// 定义用户信息接口
interface UserInfo {
    visitorUid: string;
    nickname: string;
    avatar: string;
}

// 定义两个测试用户
const TEST_USERS: UserInfo[] = [
    {
        visitorUid: 'visitor_001',
        nickname: '访客小明',
        avatar: 'https://weiyuai.cn/assets/images/avatar/02.jpg'
    },
    {
        visitorUid: 'visitor_002',
        nickname: '访客小红',
        avatar: 'https://weiyuai.cn/assets/images/avatar/01.jpg'
    }
];

const UserInfoDemo = () => {
    // 当前选中的用户信息
    const [currentUser, setCurrentUser] = useState<UserInfo>(TEST_USERS[0]);
    const { token } = useToken();
    // const { isDarkMode } = useContext(AppContext);
    const [themeKey, setThemeKey] = useState(0); // 添加主题key用于强制重新渲染

    // 监听主题变化
    // useEffect(() => {
    //     setThemeKey(prev => prev + 1);
    // }, [isDarkMode]);

    // 配置客服组件
    const config: BytedeskConfig = {
        isDebug: true, // 是否开启调试模式, 默认: false, 生产环境请设置为false
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
            org: 'df_org_uid', // 替换为您的组织ID
            t: "1", // 0: 一对一对话；1：工作组对话；2：机器人对话
            sid: 'df_wg_uid', // 替换为您的SID
            // 传入用户信息
            visitorUid: currentUser.visitorUid,
            nickname: currentUser.nickname,
            avatar: currentUser.avatar,
            mobile: '13800138000',
            email: 'test@test.com',
            note: 'test',
            // 自定义字段，可以传递任何字段
            extra: JSON.stringify({
                type: 'type',
                test: 'test'
            })
        },
        locale: 'zh-cn',
        // 添加 onVisitorInfo 回调
        onVisitorInfo: (uid: string, visitorUid: string) => {
            console.log('收到访客信息:', { uid, visitorUid });
        },
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

    const handleShowButton = () => {
        console.log("showButton");
        (window as any).bytedesk?.showButton();
    };

    const handleHideButton = () => {
        console.log("hideButton");
        (window as any).bytedesk?.hideButton();
    };

    const handleShowBubble = () => {
        console.log("showBubble");
        (window as any).bytedesk?.showBubble();
    };

    const handleHideBubble = () => {
        console.log("hideBubble");
        (window as any).bytedesk?.hideBubble();
    };

    const handleShowInviteDialog = () => {
        console.log("showInviteDialog");
        (window as any).bytedesk?.showInviteDialog();
    };

    const handleHideInviteDialog = () => {
        console.log("hideInviteDialog");
        (window as any).bytedesk?.hideInviteDialog();
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
                <Title level={2} style={{ color: token.colorText }}>用户信息对接演示</Title>
                <Paragraph style={{ color: token.colorTextSecondary }}>
                    本示例演示如何通过配置参数传入用户信息（visitorUid、nickname、avatar）到客服组件中。
                    点击下方按钮可以切换不同的用户信息。
                </Paragraph>
                
                <div style={{ marginBottom: '20px' }}>
                  <p style={{ marginBottom: '10px' }}>
                    <a href="https://www.weiyuai.cn/docs/zh-CN/docs/development/userinfo" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       style={{ color: token.colorPrimary }}>
                      查看用户信息对接文档
                    </a>
                  </p>
                  <p style={{ marginBottom: '10px' }}>
                    <a href="https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/userInfoDemo.tsx" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       style={{ color: token.colorPrimary }}>
                      React 用户信息对接代码示例
                    </a>
                  </p>
                  <p style={{ marginBottom: '10px' }}>
                    <a href="https://github.com/Bytedesk/bytedesk-web/blob/master/examples/vue-demo/src/pages/userInfoDemo.vue" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       style={{ color: token.colorPrimary }}>
                      Vue 用户信息对接代码示例
                    </a>
                  </p>
                </div>

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
                                    <Paragraph>用户ID: {currentUser.visitorUid}</Paragraph>
                                    <Paragraph>昵称: {currentUser.nickname}</Paragraph>
                                </div>
                            </Space>
                        </div>

                        <Space>
                            <Button 
                                type="primary"
                                onClick={() => handleSwitchUser(TEST_USERS[0])}
                                disabled={currentUser.visitorUid === TEST_USERS[0].visitorUid}
                            >
                                切换到访客小明
                            </Button>
                            <Button 
                                type="primary"
                                onClick={() => handleSwitchUser(TEST_USERS[1])}
                                disabled={currentUser.visitorUid === TEST_USERS[1].visitorUid}
                            >
                                切换到访客小红
                            </Button>
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
                        <Col span={12}>
                            <Card size="small" title="按钮控制">
                                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                                    <Space>
                                        <Button onClick={handleShowButton}>显示按钮</Button>
                                        <Button onClick={handleHideButton}>隐藏按钮</Button>
                                    </Space>
                                    <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
                                        调用代码：bytedesk.showButton() / bytedesk.hideButton()
                                    </Typography.Text>
                                </Space>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card size="small" title="气泡消息控制">
                                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                                    <Space>
                                        <Button onClick={handleShowBubble}>显示气泡</Button>
                                        <Button onClick={handleHideBubble}>隐藏气泡</Button>
                                    </Space>
                                    <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
                                        调用代码：bytedesk.showBubble() / bytedesk.hideBubble()
                                    </Typography.Text>
                                </Space>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card size="small" title="邀请对话框控制">
                                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                                    <Space>
                                        <Button onClick={handleShowInviteDialog}>显示邀请对话框</Button>
                                        <Button onClick={handleHideInviteDialog}>隐藏邀请对话框</Button>
                                    </Space>
                                    <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
                                        调用代码：bytedesk.showInviteDialog() / bytedesk.hideInviteDialog()
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

export default UserInfoDemo;
