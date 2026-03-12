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

import { useMemo } from 'react';
import { Alert, Button, Card, Typography, Space, Tag, List, theme as antdTheme } from 'antd';
// @ts-ignore
import { BytedeskReact } from '@bytedesk/web/adapters/react';
// @ts-ignore
import type { BytedeskConfig, Language, Theme as BytedeskTheme } from '@bytedesk/web/types';
import { getLocaleMessages } from '../locales';
import CurrentUserProfile from '../components/CurrentUserProfile';
import PageContainer from '../components/PageContainer';
import { DEMO_USER_PRESETS, type DemoUserKey, type DemoUserProfile } from '../types/demo-user';
import { formatChatConfigQuery, getConsultButtonLabel, type DemoChatProfile } from '../types/chat-profile';

const { Title, Paragraph } = Typography;

// 定义用户信息接口
interface UserInfo {
    key: DemoUserKey;
    visitorUid: string;
    nickname: string;
    avatar: string;
    vipLevel: number;
}

interface DemoPageProps {
    locale: Language;
    themeMode: BytedeskTheme['mode'];
    selectedChatProfile: DemoChatProfile;
    selectedUser: DemoUserProfile;
    isAnonymousMode: boolean;
    onSelectUser: (nextUser: DemoUserKey) => void;
    onAnonymousModeChange: (nextMode: boolean) => void;
}

const VipLevelDemo = ({ locale, themeMode, selectedChatProfile, selectedUser, isAnonymousMode, onSelectUser, onAnonymousModeChange }: DemoPageProps) => {
    const messages = useMemo(() => getLocaleMessages(locale), [locale]);
    const { token } = antdTheme.useToken();
    const users = useMemo<UserInfo[]>(() => (Object.keys(DEMO_USER_PRESETS) as DemoUserKey[]).map((key) => ({
        key,
        visitorUid: DEMO_USER_PRESETS[key].visitorUid,
        avatar: DEMO_USER_PRESETS[key].avatar,
        vipLevel: DEMO_USER_PRESETS[key].vipLevel,
        nickname: messages.pages.vipLevelDemo.users[key]
    })), [messages]);
    const currentUser = users.find((user) => user.key === selectedUser.key) || users[0];
    const docLinks = useMemo(
        () => [
            { href: 'https://www.weiyuai.cn/docs/zh-CN/docs/development/viplevel', label: messages.pages.vipLevelDemo.docLinks.vipDoc },
            { href: 'https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/VipLevelDemo.tsx', label: messages.pages.vipLevelDemo.docLinks.reactExample },
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
            title: messages.pages.basicDemo.bubbleTitle,
            subtitle: messages.pages.basicDemo.bubbleSubtitle
        },
        chatConfig: {
            ...selectedChatProfile.chatConfig,
            // 传入用户信息，包含vipLevel
            ...(isAnonymousMode
                ? {}
                : {
                    visitorUid: currentUser.visitorUid,
                    nickname: currentUser.nickname,
                    avatar: currentUser.avatar,
                    vipLevel: String(currentUser.vipLevel)
                }),
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
    }), [currentUser, isAnonymousMode, locale, messages, selectedChatProfile, themeMode]);

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

    const urlTemplate = useMemo(() => {
        const { org, t, sid } = selectedChatProfile.chatConfig;
        return `{{BASE_URL}}/chat?org=${org}&t=${t}&sid=${sid}&visitorUid=visitor_001&nickname=普通体验账号&avatar=https%3A%2F%2Fweiyuai.cn%2Fassets%2Fimages%2Favatar%2F02.jpg&vipLevel=0&extra=%7B...%7D&lang=zh-cn&mode=light`;
    }, [selectedChatProfile]);

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
        appendIfPresent('vipLevel', String(config.chatConfig?.vipLevel || '0'));
        appendIfPresent('extra', String(config.chatConfig?.extra || ''));
        params.append('lang', locale);
        params.append('mode', String(themeMode || 'light'));
        return `${baseHtmlUrl}/chat?${params.toString()}`;
    }, [config.chatConfig, config.htmlUrl, locale, themeMode]);

    const urlParams = messages.pages.vipLevelDemo.urlParams;

    const vipPayload = useMemo(() => ({
        vipLevel: String(currentUser.vipLevel),
        extra: {
            type: 'type',
            test: 'test'
        }
    }), [currentUser.vipLevel]);

    const vipPayloadJson = useMemo(() => JSON.stringify(vipPayload), [vipPayload]);
    const vipPayloadEncoded = useMemo(() => encodeURIComponent(vipPayloadJson), [vipPayloadJson]);
    const chatConfigHint = formatChatConfigQuery(selectedChatProfile.chatConfig);
    const consultButtonLabel = getConsultButtonLabel(selectedChatProfile);

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
                        extraContent={
                            !isAnonymousMode ? (
                                <Paragraph style={{ marginBottom: 0 }}>
                                    {messages.pages.vipLevelDemo.vipLabel}:
                                    <Tag color={getVipLevelColor(currentUser.vipLevel)} style={{ marginLeft: 8 }}>
                                        {formatVipTag(currentUser.vipLevel)}
                                    </Tag>
                                </Paragraph>
                            ) : null
                        }
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
                                {formatSwitchLabel(user.nickname)}
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
                    <div style={{ textAlign: 'center' }}>
                        <Space>
                            <Button type="primary" size="large" onClick={handleShowChat}>
                                {consultButtonLabel}
                            </Button>
                            <Button size="large" onClick={handleHideChat}>
                                {messages.common.buttons.closeChat}
                            </Button>
                        </Space>
                        <div style={{ marginTop: 8 }}>
                            <Alert type="info" showIcon message={`咨询参数: ${chatConfigHint}`} style={{ alignSelf: 'flex-start', width: 'fit-content', maxWidth: '100%' }} />
                        </div>
                    </div>
                </Space>
            </Card>

            <Card title={messages.pages.vipLevelDemo.urlGuideTitle}>
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <Typography.Text strong>{messages.pages.vipLevelDemo.urlTemplateLabel}</Typography.Text>
                    <Typography.Paragraph copyable={{ text: urlTemplate }} style={{ marginBottom: 0 }}>
                        <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{urlTemplate}</pre>
                    </Typography.Paragraph>

                    <Typography.Text strong>{messages.pages.vipLevelDemo.urlParamsTitle}</Typography.Text>
                    <List
                        size="small"
                        dataSource={urlParams}
                        renderItem={(item) => <List.Item>{item}</List.Item>}
                    />

                    <Typography.Text strong>{messages.pages.vipLevelDemo.sampleUrlLabel}</Typography.Text>
                    <Typography.Paragraph copyable={{ text: sampleUrl }} style={{ marginBottom: 0 }}>
                        <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{sampleUrl}</pre>
                    </Typography.Paragraph>
                </Space>
            </Card>

            <Card title={messages.pages.vipLevelDemo.payloadGuideTitle}>
                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                    <Typography.Text strong>{messages.pages.vipLevelDemo.payloadObjectLabel}</Typography.Text>
                    <Typography.Paragraph copyable={{ text: JSON.stringify(vipPayload, null, 2) }} style={{ marginBottom: 0 }}>
                        <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{JSON.stringify(vipPayload, null, 2)}</pre>
                    </Typography.Paragraph>

                    <Typography.Text strong>{messages.pages.vipLevelDemo.payloadJsonLabel}</Typography.Text>
                    <Typography.Paragraph copyable={{ text: vipPayloadJson }} style={{ marginBottom: 0 }}>
                        <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{vipPayloadJson}</pre>
                    </Typography.Paragraph>

                    <Typography.Text strong>{messages.pages.vipLevelDemo.payloadEncodedLabel}</Typography.Text>
                    <Typography.Paragraph copyable={{ text: vipPayloadEncoded }} style={{ marginBottom: 0 }}>
                        <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{vipPayloadEncoded}</pre>
                    </Typography.Paragraph>

                    <List
                        size="small"
                        header={messages.pages.vipLevelDemo.payloadNotesTitle}
                        dataSource={messages.pages.vipLevelDemo.payloadNotes}
                        renderItem={(item) => <List.Item>{item}</List.Item>}
                    />
                </Space>
            </Card>

            <BytedeskReact {...config} />
        </PageContainer>
    );
};

export default VipLevelDemo;