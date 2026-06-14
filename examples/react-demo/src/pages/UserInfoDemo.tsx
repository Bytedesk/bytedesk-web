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
import { Alert, Button, Card, Typography, Space, Table, Tag, theme as antdTheme, FloatButton } from 'antd';
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
import { formatChatConfigQuery, getConsultButtonLabel, type DemoChatProfile } from '../types/chat-profile';
import { demoApiUrl, getDemoHtmlBaseUrl } from '../utils/env';
import { buildCurrentEmbedCodeExample, getCurrentEmbedCodeCopy } from '../utils/embed-code-guide';
import { buildUrlParamRowsWithEncodeHint } from '../utils/url-param-guide';

const { Title, Paragraph } = Typography;

interface DemoPageProps {
    locale: Language;
    themeMode: BytedeskTheme['mode'];
    selectedChatProfile: DemoChatProfile;
    selectedUser: DemoUserProfile;
    isAnonymousMode: boolean;
    onSelectUser: (nextUser: DemoUserKey) => void;
    onAnonymousModeChange: (nextMode: boolean) => void;
}

const UserInfoDemo = ({ locale, themeMode, selectedChatProfile, selectedUser, isAnonymousMode, onSelectUser, onAnonymousModeChange }: DemoPageProps) => {
    const messages = useMemo(() => getLocaleMessages(locale), [locale]);
    const { token } = antdTheme.useToken();
    const htmlBaseUrl = getDemoHtmlBaseUrl(9006);
    const bubbleNickname = isAnonymousMode ? messages.pages.userInfoDemo.anonymousUserLabel : selectedUser.nickname;
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
        buttonConfig: {
            show: true,
            action: 'chat',
        },
        bubbleConfig: {
            show: true,
            icon: '👋',
            title: `${bubbleNickname} ${messages.pages.basicDemo.bubbleTitle}`,
            subtitle: messages.pages.basicDemo.bubbleSubtitle
        },
        chatConfig: {
            ...selectedChatProfile.chatConfig,
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
    }), [htmlBaseUrl, locale, messages, isAnonymousMode, selectedChatProfile, selectedUser, themeMode]);

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
        { href: 'https://www.weiyuai.cn/docs/zh-CN/docs/integration/user_info', label: messages.pages.userInfoDemo.docLinks.userInfoDoc },
        { href: 'https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/UserInfoDemo.tsx', label: messages.pages.userInfoDemo.docLinks.reactExample },
        { href: 'https://github.com/Bytedesk/bytedesk-web/blob/master/examples/vue-demo/src/pages/userInfoDemo.vue', label: messages.pages.userInfoDemo.docLinks.vueExample }
    ];

    const formatSwitchUserLabel = (name: string) =>
        messages.pages.userInfoDemo.switchToUserLabel.replace('{{name}}', name);

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

    const requiredUrlParams = useMemo(() => new Set(['org', 't', 'sid']), []);
    const userInfoMessages = messages.pages.userInfoDemo;
    const requiredLabel = userInfoMessages.requiredLabel;
    const optionalLabel = userInfoMessages.optionalLabel;
    const urlParamNameTitle = userInfoMessages.parameterLabel;
    const urlParamValueTitle = userInfoMessages.currentValueLabel;
    const urlParamPurposeTitle = userInfoMessages.purposeLabel;
    const chatConfigHint = formatChatConfigQuery(selectedChatProfile.chatConfig);
    const consultButtonLabel = getConsultButtonLabel(selectedChatProfile, locale);
    const manualEncodeHint = userInfoMessages.manualEncodeHint;
    const switchApiTitle = userInfoMessages.switchApiTitle;
    const switchApiDescription = userInfoMessages.switchApiDescription;
    const switchApiCode = isAnonymousMode
        ? `(window as any).bytedesk?.resetAnonymousVisitor?.();\n(window as any).bytedesk?.initVisitor?.();`
        : `(window as any).bytedesk?.initVisitor?.();`;
    const switchApiNotes = userInfoMessages.switchApiNotes;
    const embedCodeCopy = useMemo(() => getCurrentEmbedCodeCopy(locale), [locale]);
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
    const currentUrlParams = useMemo(
        () => new URL(sampleUrl).searchParams,
        [sampleUrl]
    );
    const urlParamRows = useMemo(
        () => buildUrlParamRowsWithEncodeHint(
            messages.pages.userInfoDemo.urlParams,
            currentUrlParams,
            locale,
            ['nickname', 'avatar', 'email', 'note', 'extra']
        ),
        [currentUrlParams, locale, messages.pages.userInfoDemo.urlParams]
    );
    const currentEmbedCodeExample = useMemo(
        () => buildCurrentEmbedCodeExample({
            config,
            callbackSources: {
                onVisitorInfo: "(uid, visitorUid) => console.log('visitor info', { uid, visitorUid })"
            }
        }),
        [config]
    );

    return (
        <PageContainer>
            <Card>
                <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
                    <div>
                        <Title level={2} style={{ marginBottom: 0 }}>{messages.pages.userInfoDemo.title}</Title>
                        <Paragraph type="secondary" style={{ marginBottom: 0 }}>
                            {messages.pages.userInfoDemo.description}
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
                        <Button type="primary" onClick={handleShowChat}>{consultButtonLabel}</Button>
                        <Button onClick={handleHideChat}>{messages.common.buttons.closeChat}</Button>
                        <Button onClick={() => window.open(sampleUrl, '_blank', 'width=420,height=680,resizable=yes,scrollbars=yes')}>
                            {messages.common.buttons.openInNewWindow}
                        </Button>
                        <Button onClick={() => window.open(sampleUrl, '_blank')}>
                            {messages.common.buttons.openInNewTab}
                        </Button>
                    </Space>
                    <Alert type="info" showIcon title={`咨询参数: ${chatConfigHint}`} style={{ alignSelf: 'flex-start', width: 'fit-content', maxWidth: '100%' }} />
                </Space>
            </Card>

            <Card title={switchApiTitle}>
                <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
                    <Alert type="warning" showIcon title={switchApiDescription} />
                    <Typography.Paragraph
                        copyable={{ text: switchApiCode }}
                        style={{ ...codeBlockStyle, marginBottom: 0 }}
                    >
                        {switchApiCode}
                    </Typography.Paragraph>
                    <Space orientation="vertical" size={4} style={{ width: '100%' }}>
                        {switchApiNotes.map((note) => (
                            <Typography.Text key={note} type="secondary">
                                {note}
                            </Typography.Text>
                        ))}
                    </Space>
                </Space>
            </Card>

            <Card title={messages.pages.userInfoDemo.urlGuideTitle}>
                <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
                    <Typography.Text strong>{messages.pages.userInfoDemo.sampleUrlLabel}</Typography.Text>
                    <Typography.Paragraph
                        copyable={{ text: sampleUrl }}
                        style={{ ...codeBlockStyle, marginBottom: 0 }}
                    >
                        {sampleUrl}
                    </Typography.Paragraph>

                    <Typography.Text strong>{messages.pages.userInfoDemo.urlParamsTitle}</Typography.Text>
                    <Table
                        size="small"
                        bordered
                        pagination={false}
                        rowKey="key"
                        dataSource={urlParamRows}
                        columns={[
                            {
                                title: urlParamNameTitle,
                                dataIndex: 'key',
                                key: 'key',
                                render: (value: string) => (
                                    <Space size={6}>
                                        <Typography.Text copyable={{ text: value }}>{value}</Typography.Text>
                                        <Tag color={requiredUrlParams.has(value) ? 'error' : 'default'}>
                                            {requiredUrlParams.has(value) ? requiredLabel : optionalLabel}
                                        </Tag>
                                    </Space>
                                ),
                            },
                            {
                                title: urlParamValueTitle,
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
                                title: urlParamPurposeTitle,
                                dataIndex: 'purpose',
                                key: 'purpose',
                            },
                        ]}
                    />
                    <Typography.Text type="secondary">{manualEncodeHint}</Typography.Text>
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

export default UserInfoDemo;
