/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2025-05-27 16:46:34
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-07-04 09:57:14
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
import { Button, Card, Typography, Space, Avatar, Divider, Row, Col, Tag } from 'antd';
// @ts-ignore
import { BytedeskReact } from '@bytedesk/web/adapters/react';
// @ts-ignore
import type { BytedeskConfig, Language, Theme as BytedeskTheme } from '@bytedesk/web/types';
import { getLocaleMessages, type LocaleMessages } from '../locales';
import PageContainer from '../components/PageContainer';

const { Title, Paragraph } = Typography;

// 定义用户信息接口
interface UserInfo {
    visitorUid: string;
    nickname: string;
    avatar: string;
    vipLevel: number;
}

type VipUserPreset = {
    visitorUid: string;
    avatar: string;
    vipLevel: number;
    nicknameKey: keyof LocaleMessages['pages']['vipLevelDemo']['users'];
};

const USER_PRESETS: VipUserPreset[] = [
    {
        visitorUid: 'visitor_001',
        avatar: 'https://weiyuai.cn/assets/images/avatar/02.jpg',
        vipLevel: 0,
        nicknameKey: 'user1'
    },
    {
        visitorUid: 'visitor_002',
        avatar: 'https://weiyuai.cn/assets/images/avatar/01.jpg',
        vipLevel: 1,
        nicknameKey: 'user2'
    },
    {
        visitorUid: 'visitor_003',
        avatar: 'https://weiyuai.cn/assets/images/avatar/03.jpg',
        vipLevel: 2,
        nicknameKey: 'user3'
    }
];

interface DemoPageProps {
    locale: Language;
    themeMode: BytedeskTheme['mode'];
}

const VipLevelDemo = ({ locale, themeMode }: DemoPageProps) => {
    const messages = useMemo(() => getLocaleMessages(locale), [locale]);
    const users = useMemo<UserInfo[]>(() => USER_PRESETS.map((preset) => ({
        visitorUid: preset.visitorUid,
        avatar: preset.avatar,
        vipLevel: preset.vipLevel,
        nickname: messages.pages.vipLevelDemo.users[preset.nicknameKey]
    })), [messages]);
    const [currentUserIndex, setCurrentUserIndex] = useState(0);
    const currentUser = users[currentUserIndex] || users[0];
    const docLinks = useMemo(
        () => [
            { href: 'https://www.weiyuai.cn/docs/zh-CN/docs/development/viplevel', label: messages.pages.vipLevelDemo.docLinks.vipDoc },
            { href: 'https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/vipLevelDemo.tsx', label: messages.pages.vipLevelDemo.docLinks.reactExample },
            { href: 'https://github.com/Bytedesk/bytedesk-web/blob/master/examples/vue-demo/src/pages/vipLevelDemo.vue', label: messages.pages.vipLevelDemo.docLinks.vueExample }
        ],
        [messages]
    );

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
            org: 'df_org_uid',
            t: "1",
            sid: 'df_wg_uid',
            // 传入用户信息，包含vipLevel
            visitorUid: currentUser.visitorUid,
            nickname: currentUser.nickname,
            avatar: currentUser.avatar,
            vipLevel: String(currentUser.vipLevel),
            // 自定义字段
            extra: JSON.stringify({
                type: 'type',
                test: 'test'
            })
        },
        locale,
        theme: {
            mode: themeMode,
        },
    }), [currentUser, locale, messages, themeMode]);

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

    const formatVipTag = (level: number) =>
        level === 0 ? messages.pages.vipLevelDemo.normalLabel : `${messages.pages.vipLevelDemo.vipPrefix}${level}`;

    const formatSwitchLabel = (name: string) =>
        messages.pages.vipLevelDemo.switchButtonLabel.replace('{{name}}', name);

    const formatApiHint = (code: string) => `${messages.common.apiHintPrefix} ${code}`;

    return (
        <PageContainer>
            <Card>
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <div>
                        <Title level={2} style={{ marginBottom: 0 }}>{messages.pages.vipLevelDemo.title}</Title>
                        <Paragraph type="secondary" style={{ marginBottom: 0 }}>
                            {messages.pages.vipLevelDemo.description}
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
                                <Paragraph style={{ marginBottom: 4 }}>
                                    {messages.pages.userInfoDemo.currentUserIdLabel}: {currentUser.visitorUid}
                                </Paragraph>
                                <Paragraph style={{ marginBottom: 4 }}>
                                    {messages.pages.userInfoDemo.currentUserNicknameLabel}: {currentUser.nickname}
                                </Paragraph>
                                <Paragraph style={{ marginBottom: 0 }}>
                                    {messages.pages.vipLevelDemo.vipLabel}:
                                    <Tag color={getVipLevelColor(currentUser.vipLevel)} style={{ marginLeft: 8 }}>
                                        {formatVipTag(currentUser.vipLevel)}
                                    </Tag>
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
                                {formatSwitchLabel(user.nickname)}
                            </Button>
                        ))}
                    </Space>
                    <div style={{ textAlign: 'center' }}>
                        <Button type="primary" size="large" onClick={handleShowChat}>
                            {messages.pages.userInfoDemo.contactSupport}
                        </Button>
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

export default VipLevelDemo;