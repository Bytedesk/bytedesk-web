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

import { useState, useMemo } from 'react';
import { Button, Card, Typography, Space, Avatar, Divider, Row, Col } from 'antd';
// @ts-ignore
import { BytedeskReact } from '@bytedesk/web/adapters/react';
// @ts-ignore
import type { BytedeskConfig, Language, Theme as BytedeskTheme } from '@bytedesk/web/types';
// import { BytedeskReact } from 'bytedesk-web/react';
// import { BytedeskConfig } from 'bytedesk-web';
// import { useContext } from 'react';
import { getLocaleMessages, type LocaleMessages } from '../locales';
import PageContainer from '../components/PageContainer';

const { Title, Paragraph } = Typography;

// 定义用户信息接口
interface UserInfo {
    visitorUid: string;
    nickname: string;
    avatar: string;
}

type UserPreset = {
    visitorUid: string;
    avatar: string;
    nicknameKey: keyof LocaleMessages['pages']['userInfoDemo']['users'];
};

const USER_PRESETS: UserPreset[] = [
    {
        visitorUid: 'visitor_001',
        avatar: 'https://weiyuai.cn/assets/images/avatar/02.jpg',
        nicknameKey: 'user1'
    },
    {
        visitorUid: 'visitor_002',
        avatar: 'https://weiyuai.cn/assets/images/avatar/01.jpg',
        nicknameKey: 'user2'
    }
];

interface DemoPageProps {
    locale: Language;
    themeMode: BytedeskTheme['mode'];
}

const UserInfoDemo = ({ locale, themeMode }: DemoPageProps) => {
    const messages = useMemo(() => getLocaleMessages(locale), [locale]);
    const users = useMemo<UserInfo[]>(() => USER_PRESETS.map((preset) => ({
        visitorUid: preset.visitorUid,
        avatar: preset.avatar,
        nickname: messages.pages.userInfoDemo.users[preset.nicknameKey]
    })), [messages]);
    const [currentUserIndex, setCurrentUserIndex] = useState(0);
    const currentUser = users[currentUserIndex] || users[0];

    // 配置客服组件
    const config = useMemo<BytedeskConfig>(() => ({
        isDebug: true, // 是否开启调试模式, 默认: false, 生产环境请设置为false
        ...(process.env.NODE_ENV === 'development' 
        ? { 
            htmlUrl: 'http://127.0.0.1:9006', 
            apiUrl: 'http://127.0.0.1:9003' 
        } 
        : {}),
        placement: 'bottom-right',
        autoPopup: false,
        forceRefresh: true,
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
            icon: '👋',
            title: messages.pages.localDemo.bubbleTitle,
            subtitle: messages.pages.localDemo.bubbleSubtitle
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
        locale,
        theme: {
            mode: themeMode,
        },
        // 添加 onVisitorInfo 回调
        onVisitorInfo: (uid: string, visitorUid: string) => {
            console.log('收到访客信息:', { uid, visitorUid });
        },
    }), [locale, messages, currentUser, themeMode]);

    // 切换用户信息
    const handleSwitchUser = (index: number) => {
        setCurrentUserIndex(index);
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

    const docLinks = [
        { href: 'https://www.weiyuai.cn/docs/zh-CN/docs/development/userinfo', label: messages.pages.userInfoDemo.docLinks.userInfoDoc },
        { href: 'https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/userInfoDemo.tsx', label: messages.pages.userInfoDemo.docLinks.reactExample },
        { href: 'https://github.com/Bytedesk/bytedesk-web/blob/master/examples/vue-demo/src/pages/userInfoDemo.vue', label: messages.pages.userInfoDemo.docLinks.vueExample }
    ];

    const formatSwitchUserLabel = (name: string) =>
        messages.pages.userInfoDemo.switchToUserLabel.replace('{{name}}', name);

    const formatApiHint = (code: string) => `${messages.pages.userInfoDemo.apiHintPrefix} ${code}`;

        return (
        <PageContainer>
            <Card>
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                <div>
                    <Title level={2} style={{ marginBottom: 0 }}>{messages.pages.userInfoDemo.title}</Title>
                    <Paragraph type="secondary" style={{ marginBottom: 0 }}>
                        {messages.pages.userInfoDemo.description}
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
                            <Title level={4}>{messages.pages.userInfoDemo.currentUserTitle}</Title>
                            <Space>
                                <Avatar src={currentUser.avatar} size={64} />
                                <div>
                                    <Paragraph>
                                        {messages.pages.userInfoDemo.currentUserIdLabel}: {currentUser.visitorUid}
                                    </Paragraph>
                                    <Paragraph>
                                        {messages.pages.userInfoDemo.currentUserNicknameLabel}: {currentUser.nickname}
                                    </Paragraph>
                                </div>
                            </Space>
                        </div>

                        <Space wrap>
                            {users.map((user, index) => (
                                <Button
                                    key={user.visitorUid}
                                    type="primary"
                                    onClick={() => handleSwitchUser(index)}
                                    disabled={currentUser.visitorUid === user.visitorUid}
                                >
                                    {formatSwitchUserLabel(user.nickname)}
                                </Button>
                            ))}
                        </Space>
                        <div style={{ textAlign: 'center', marginTop: '16px' }}>
                            <Button type="primary" size="large" onClick={handleShowChat}>
                                {messages.pages.userInfoDemo.contactSupport}
                            </Button>
                        </div>
                    </Space>
                </Card>

                <Card>
                    <Title level={4}>{messages.pages.userInfoDemo.controlPanel.title}</Title>
                    <Divider />
                    <Row gutter={[16, 16]}>
                        <Col span={12}>
                            <Card size="small" title={messages.pages.userInfoDemo.controlPanel.chatWindow}>
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
                        <Col span={12}>
                            <Card size="small" title={messages.pages.userInfoDemo.controlPanel.button}>
                                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                                    <Space>
                                        <Button onClick={handleShowButton}>{messages.common.buttons.showButton}</Button>
                                        <Button onClick={handleHideButton}>{messages.common.buttons.hideButton}</Button>
                                    </Space>
                                    <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
                                        {formatApiHint('bytedesk.showButton() / bytedesk.hideButton()')}
                                    </Typography.Text>
                                </Space>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card size="small" title={messages.pages.userInfoDemo.controlPanel.bubble}>
                                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                                    <Space>
                                        <Button onClick={handleShowBubble}>{messages.common.buttons.showBubble}</Button>
                                        <Button onClick={handleHideBubble}>{messages.common.buttons.hideBubble}</Button>
                                    </Space>
                                    <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
                                        {formatApiHint('bytedesk.showBubble() / bytedesk.hideBubble()')}
                                    </Typography.Text>
                                </Space>
                            </Card>
                        </Col>
                        <Col span={12}>
                            <Card size="small" title={messages.pages.userInfoDemo.controlPanel.invite}>
                                <Space direction="vertical" size="small" style={{ width: '100%' }}>
                                    <Space>
                                        <Button onClick={handleShowInviteDialog}>{messages.common.buttons.showInvite}</Button>
                                        <Button onClick={handleHideInviteDialog}>{messages.common.buttons.hideInvite}</Button>
                                    </Space>
                                    <Typography.Text type="secondary" style={{ fontSize: '12px' }}>
                                        {formatApiHint('bytedesk.showInviteDialog() / bytedesk.hideInviteDialog()')}
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

export default UserInfoDemo;
