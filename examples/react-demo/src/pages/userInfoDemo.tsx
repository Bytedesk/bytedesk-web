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

import { useMemo } from 'react';
import { Button, Card, Typography, Space, List, theme as antdTheme } from 'antd';
// @ts-ignore
import { BytedeskReact } from '@bytedesk/web/adapters/react';
// @ts-ignore
import type { BytedeskConfig, Language, Theme as BytedeskTheme } from '@bytedesk/web/types';
// import { BytedeskReact } from 'bytedesk-web/react';
// import { BytedeskConfig } from 'bytedesk-web';
// import { useContext } from 'react';
import { getLocaleMessages } from '../locales';
import PageContainer from '../components/PageContainer';
import CurrentUserProfile from '../components/CurrentUserProfile';
import { DEMO_USER_PRESETS, type DemoUserKey, type DemoUserProfile } from '../types/demo-user';

const { Title, Paragraph } = Typography;

interface DemoPageProps {
    locale: Language;
    themeMode: BytedeskTheme['mode'];
    selectedUser: DemoUserProfile;
    isAnonymousMode: boolean;
    onSelectUser: (nextUser: DemoUserKey) => void;
    onAnonymousModeChange: (nextMode: boolean) => void;
}

const UserInfoDemo = ({ locale, themeMode, selectedUser, isAnonymousMode, onSelectUser, onAnonymousModeChange }: DemoPageProps) => {
    const messages = useMemo(() => getLocaleMessages(locale), [locale]);
    const { token } = antdTheme.useToken();
    const users = useMemo(() => (Object.keys(DEMO_USER_PRESETS) as DemoUserKey[]).map((key) => ({
        key,
        visitorUid: DEMO_USER_PRESETS[key].visitorUid,
        avatar: DEMO_USER_PRESETS[key].avatar,
        nickname: messages.pages.userInfoDemo.users[key]
    })), [messages]);
    const currentUser = selectedUser;

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
            title: messages.pages.basicDemo.bubbleTitle,
            subtitle: messages.pages.basicDemo.bubbleSubtitle
        },
        chatConfig: {
            org: 'df_org_uid', // 替换为您的组织ID
            t: "1", // 0: 一对一对话；1：工作组对话；2：机器人对话
            sid: 'df_wg_uid', // 替换为您的SID
            // 传入用户信息
            ...(isAnonymousMode
                ? {}
                : {
                    visitorUid: selectedUser.visitorUid,
                    nickname: selectedUser.nickname,
                    avatar: selectedUser.avatar,
                    mobile: '13800138000',
                    email: 'test@test.com',
                    note: 'test'
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
        // 添加 onVisitorInfo 回调
        onVisitorInfo: (uid: string, visitorUid: string) => {
            console.log('收到访客信息:', { uid, visitorUid });
        },
    }), [locale, messages, isAnonymousMode, selectedUser, themeMode]);

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
        { href: 'https://www.weiyuai.cn/docs/zh-CN/docs/development/user_info', label: messages.pages.userInfoDemo.docLinks.userInfoDoc },
        { href: 'https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/UserInfoDemo.tsx', label: messages.pages.userInfoDemo.docLinks.reactExample },
        { href: 'https://github.com/Bytedesk/bytedesk-web/blob/master/examples/vue-demo/src/pages/userInfoDemo.vue', label: messages.pages.userInfoDemo.docLinks.vueExample }
    ];

    const formatSwitchUserLabel = (name: string) =>
        messages.pages.userInfoDemo.switchToUserLabel.replace('{{name}}', name);

    const urlTemplate = useMemo(() => {
        return '{{BASE_URL}}/chat?org=df_org_uid&t=1&sid=df_wg_uid&visitorUid=visitor_001&nickname=访客小明&avatar=https%3A%2F%2Fweiyuai.cn%2Fassets%2Fimages%2Favatar%2F02.jpg&mobile=13800138000&email=test%40test.com&note=test&lang=zh-cn&mode=light';
    }, []);

    const sampleUrl = useMemo(() => {
        const baseHtmlUrl = (config.htmlUrl || 'https://cdn.weiyuai.cn/chat').replace(/\/chat(?:\/thread)?\/?$/, '');
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
        appendIfPresent('mobile', config.chatConfig?.mobile);
        appendIfPresent('email', config.chatConfig?.email);
        appendIfPresent('note', config.chatConfig?.note);
        appendIfPresent('extra', config.chatConfig?.extra);
        params.append('lang', locale);
        params.append('mode', String(themeMode || 'light'));
        return `${baseHtmlUrl}/chat?${params.toString()}`;
    }, [config.chatConfig, config.htmlUrl, locale, themeMode]);

    const urlParams = messages.pages.userInfoDemo.urlParams;

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
                    <CurrentUserProfile
                        title={messages.pages.userInfoDemo.currentUserTitle}
                        isAnonymousMode={isAnonymousMode}
                        avatar={currentUser.avatar}
                        anonymousIdText={messages.pages.userInfoDemo.anonymousUserHint}
                        anonymousNicknameText={messages.pages.userInfoDemo.anonymousUserLabel}
                        userIdLabel={messages.pages.userInfoDemo.currentUserIdLabel}
                        userId={currentUser.visitorUid}
                        userNicknameLabel={messages.pages.userInfoDemo.currentUserNicknameLabel}
                        userNickname={currentUser.nickname}
                    />

                    <Space wrap>
                        {users.map((user) => (
                            <Button
                                key={user.visitorUid}
                                type="primary"
                                onClick={() => {
                                    if (!isAnonymousMode && selectedUser.key === user.key) {
                                        return;
                                    }
                                    onAnonymousModeChange(false);
                                    onSelectUser(user.key);
                                }}
                                style={!isAnonymousMode && selectedUser.key === user.key ? { backgroundColor: token.colorSuccess, borderColor: token.colorSuccess } : undefined}
                            >
                                {formatSwitchUserLabel(user.nickname)}
                                {!isAnonymousMode && selectedUser.key === user.key ? '【当前】' : ''}
                            </Button>
                        ))}
                        <Button
                            type={isAnonymousMode ? 'primary' : 'default'}
                            onClick={() => {
                                if (isAnonymousMode) {
                                    return;
                                }
                                onAnonymousModeChange(true);
                            }}
                            style={isAnonymousMode ? { backgroundColor: token.colorSuccess, borderColor: token.colorSuccess } : undefined}
                        >
                            {messages.pages.userInfoDemo.switchAnonymousUserLabel}
                            {isAnonymousMode ? '【当前】' : ''}
                        </Button>
                    </Space>
                    <Space wrap>
                        <Button type="primary" onClick={handleShowChat}>{messages.common.buttons.openChat}</Button>
                        <Button onClick={handleHideChat}>{messages.common.buttons.closeChat}</Button>
                    </Space>
                </Space>
            </Card>

            <Card title={messages.pages.userInfoDemo.urlGuideTitle}>
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <Typography.Text strong>{messages.pages.userInfoDemo.urlTemplateLabel}</Typography.Text>
                    <Typography.Paragraph copyable={{ text: urlTemplate }} style={{ marginBottom: 0 }}>
                        <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{urlTemplate}</pre>
                    </Typography.Paragraph>

                    <Typography.Text strong>{messages.pages.userInfoDemo.urlParamsTitle}</Typography.Text>
                    <List
                        size="small"
                        dataSource={urlParams}
                        renderItem={(item) => <List.Item>{item}</List.Item>}
                    />

                    <Typography.Text strong>{messages.pages.userInfoDemo.sampleUrlLabel}</Typography.Text>
                    <Typography.Paragraph copyable={{ text: sampleUrl }} style={{ marginBottom: 0 }}>
                        <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{sampleUrl}</pre>
                    </Typography.Paragraph>
                </Space>
            </Card>

            <BytedeskReact {...config} />
        </PageContainer>
    );
};

export default UserInfoDemo;
