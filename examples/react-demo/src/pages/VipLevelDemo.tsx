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
import { Alert, Button, Card, Table, Typography, Space, Tag, theme as antdTheme, FloatButton } from 'antd';
// @ts-ignore
import { BytedeskReact } from '@bytedesk/web/adapters/react';
// @ts-ignore
import type { BytedeskConfig, Language, Theme as BytedeskTheme } from '@bytedesk/web/types';
import { getLocaleMessages } from '../locales';
import CurrentUserProfile from '../components/CurrentUserProfile';
import PageContainer from '../components/PageContainer';
import { DEMO_USER_PRESETS, type DemoUserKey, type DemoUserProfile } from '../types/demo-user';
import { formatChatConfigQuery, getConsultButtonLabel, type DemoChatProfile } from '../types/chat-profile';
import { demoApiUrl, getDemoHtmlBaseUrl } from '../utils/env';
import { buildUrlParamRowsWithEncodeHint } from '../utils/url-param-guide';
import { buildCurrentEmbedCodeExample, getCurrentEmbedCodeCopy } from '../utils/embed-code-guide';

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
    const htmlBaseUrl = getDemoHtmlBaseUrl(9006);
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
            { href: 'https://www.weiyuai.cn/docs/zh-CN/docs/integration/viplevel', label: messages.pages.vipLevelDemo.docLinks.vipDoc },
            { href: 'https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/VipLevelDemo.tsx', label: messages.pages.vipLevelDemo.docLinks.reactExample },
            { href: 'https://github.com/Bytedesk/bytedesk-web/blob/master/examples/vue-demo/src/pages/vipLevelDemo.vue', label: messages.pages.vipLevelDemo.docLinks.vueExample }
        ],
        [messages]
    );

    // 配置客服组件
    const config = useMemo<BytedeskConfig>(() => ({
        isDebug: true, // 是否开启调试模式, 默认: false, 生产环境请设置为false
        htmlUrl: htmlBaseUrl,
        ...(demoApiUrl
        ? {
            apiUrl: demoApiUrl
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
        // 隐藏不显示悬浮按钮
        buttonConfig: {
            show: false,
            action: 'chat',
        },
        // 隐藏不显示气泡
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
    }), [currentUser, htmlBaseUrl, isAnonymousMode, locale, messages, selectedChatProfile, themeMode]);

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

    const requiredUrlParams = useMemo(() => new Set(['org', 't', 'sid']), []);
    const currentUrlParamMap = useMemo(() => new URL(sampleUrl).searchParams, [sampleUrl]);
    const embedCodeCopy = useMemo(() => getCurrentEmbedCodeCopy(locale), [locale]);
    const urlParamRows = useMemo(
        () => buildUrlParamRowsWithEncodeHint(
            messages.pages.vipLevelDemo.urlParams,
            currentUrlParamMap,
            locale,
            ['nickname', 'avatar', 'extra']
        ),
        [currentUrlParamMap, locale, messages.pages.vipLevelDemo.urlParams]
    );

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
    const consultButtonLabel = getConsultButtonLabel(selectedChatProfile, locale);
    const codeBlockStyle = useMemo(() => ({
        margin: 0,
        padding: '12px 14px',
        borderRadius: 8,
        border: `1px solid ${token.colorBorderSecondary || token.colorBorder}`,
        background: token.colorFillQuaternary,
        fontSize: 12,
        lineHeight: 1.7,
        fontFamily: 'SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace',
        whiteSpace: 'pre-wrap' as const,
        wordBreak: 'break-all' as const
    }), [token.colorBorder, token.colorBorderSecondary, token.colorFillQuaternary]);
    const currentEmbedCodeExample = useMemo(
        () => buildCurrentEmbedCodeExample({ config }),
        [config]
    );

    return (
        <PageContainer>
            <Card>
                <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
                    <div>
                        <Title level={2} style={{ marginBottom: 0 }}>{messages.pages.vipLevelDemo.title}</Title>
                        <Paragraph type="secondary" style={{ marginBottom: 0 }}>
                            {messages.pages.vipLevelDemo.description}
                        </Paragraph>
                    </div>
                    <Space orientation="vertical" size={4}>
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
                <Space orientation="vertical" size="large" style={{ width: '100%' }}>
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
                    <Space wrap>
                        <Button type="primary" onClick={handleShowChat}>
                            {consultButtonLabel}
                        </Button>
                        <Button onClick={handleHideChat}>
                            {messages.common.buttons.closeChat}
                        </Button>
                        <Button onClick={() => window.open(sampleUrl, '_blank', 'width=420,height=680,resizable=yes,scrollbars=yes')}>
                            {messages.common.buttons.openInNewWindow}
                        </Button>
                        <Button onClick={() => window.open(sampleUrl, '_blank')}>
                            {messages.common.buttons.openInNewTab}
                        </Button>
                    </Space>
                    <div style={{ marginTop: 8 }}>
                        <Alert type="info" showIcon title={`咨询参数: ${chatConfigHint}`} style={{ alignSelf: 'flex-start', width: 'fit-content', maxWidth: '100%' }} />
                    </div>
                </Space>
            </Card>

            <Card title={messages.pages.vipLevelDemo.urlGuideTitle}>
                <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
                    {/* <Typography.Text strong>{messages.pages.vipLevelDemo.urlTemplateLabel}</Typography.Text> */}
                    {/* <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{urlTemplate}</pre> */}

                    <Typography.Text strong>{messages.pages.vipLevelDemo.sampleUrlLabel}</Typography.Text>
                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{sampleUrl}</pre>

                    <Typography.Text strong>{messages.pages.vipLevelDemo.urlParamsTitle}</Typography.Text>
                    <Table
                        size="small"
                        bordered
                        pagination={false}
                        rowKey="key"
                        dataSource={urlParamRows}
                        columns={[
                            {
                                title: messages.pages.userInfoDemo.parameterLabel,
                                dataIndex: 'key',
                                key: 'key',
                                render: (value: string) => (
                                    <Space size={6}>
                                        <Typography.Text copyable={{ text: value }}>{value}</Typography.Text>
                                        <Tag color={requiredUrlParams.has(value) ? 'error' : 'default'}>
                                            {requiredUrlParams.has(value)
                                                ? messages.pages.userInfoDemo.requiredLabel
                                                : messages.pages.userInfoDemo.optionalLabel}
                                        </Tag>
                                    </Space>
                                ),
                            },
                            {
                                title: messages.pages.userInfoDemo.currentValueLabel,
                                dataIndex: 'value',
                                key: 'value',
                                render: (value: string) => {
                                    const hasCopyableValue = value.trim() !== '' && value !== '-';

                                    return (
                                        <Typography.Paragraph
                                            copyable={hasCopyableValue ? { text: value } : false}
                                            style={{ marginBottom: 0, wordBreak: 'break-all' }}
                                        >
                                            {value}
                                        </Typography.Paragraph>
                                    );
                                },
                            },
                            {
                                title: messages.pages.userInfoDemo.purposeLabel,
                                dataIndex: 'purpose',
                                key: 'purpose',
                            },
                        ]}
                    />
                </Space>
            </Card>

            <Card title={messages.pages.vipLevelDemo.payloadGuideTitle}>
                <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
                    <Typography.Text strong>{messages.pages.vipLevelDemo.payloadObjectLabel}</Typography.Text>
                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{JSON.stringify(vipPayload, null, 2)}</pre>

                    <Typography.Text strong>{messages.pages.vipLevelDemo.payloadJsonLabel}</Typography.Text>
                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{vipPayloadJson}</pre>

                    <Typography.Text strong>{messages.pages.vipLevelDemo.payloadEncodedLabel}</Typography.Text>
                    <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{vipPayloadEncoded}</pre>

                    <div>
                        <Typography.Text strong>{messages.pages.vipLevelDemo.payloadNotesTitle}</Typography.Text>
                        <ul style={{ margin: '8px 0 0', paddingLeft: 20, lineHeight: 1.8 }}>
                            {messages.pages.vipLevelDemo.payloadNotes.map((item) => (
                                <li key={item}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </Space>
            </Card>

            <Card title={embedCodeCopy.title}>
                <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
                    <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
                        {embedCodeCopy.description}
                    </Typography.Paragraph>
                    <Typography.Paragraph
                        copyable={{ text: currentEmbedCodeExample }}
                        style={{ ...codeBlockStyle, marginBottom: 0 }}
                    >
                        {currentEmbedCodeExample}
                    </Typography.Paragraph>
                </Space>
            </Card>

            <BytedeskReact {...config} />

            <FloatButton.BackTop style={{ marginRight: 200, marginBottom: -30 }}/>
        </PageContainer>
    );
};

export default VipLevelDemo;