/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2025-06-21 11:10:07
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-06-24 09:57:52
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
// @ts-ignore
import { BytedeskReact } from '@bytedesk/web/adapters/react';
// @ts-ignore
import type { BytedeskConfig, Language, Theme as BytedeskTheme } from '@bytedesk/web/types';
import { Alert, Button, Card, List, Space, Statistic, Typography, theme } from 'antd';
import { getLocaleMessages } from '../locales';
import type { DemoUserProfile } from '../types/demo-user';
import { formatChatConfigQuery, getConsultButtonLabel, type DemoChatProfile } from '../types/chat-profile';

interface DemoPageProps {
    locale: Language;
    themeMode: BytedeskTheme['mode'];
    selectedChatProfile: DemoChatProfile;
    selectedUser: DemoUserProfile;
    isAnonymousMode: boolean;
}

const UnreadCountDemo = ({ locale, themeMode, selectedChatProfile, selectedUser, isAnonymousMode }: DemoPageProps) => {
    const messages = useMemo(() => getLocaleMessages(locale), [locale]);
    const { token } = theme.useToken();
    const [unreadCount, setUnreadCount] = useState<number>(0);
    const [config, setConfig] = useState<BytedeskConfig>({
        isDebug: true, // 是否开启调试模式, 默认: false, 生产环境请设置为false
        ...(process.env.NODE_ENV === 'development' 
        ? { 
            htmlUrl: 'http://127.0.0.1:9006', 
            apiUrl: 'http://127.0.0.1:9003' 
        } 
        : {}),
        placement: 'bottom-right',
        marginBottom: 20,
        marginSide: 20,
        autoPopup: false,
        draggable: true,
        chatConfig: {
            ...selectedChatProfile.chatConfig,
            // 自定义用户信息
            ...(isAnonymousMode
                ? {}
                : {
                    visitorUid: selectedUser.visitorUid,
                    nickname: selectedUser.nickname,
                    avatar: selectedUser.avatar
                }),
        },
        theme: {
            mode: themeMode,
        },
        locale,
        // 添加 onVisitorInfo 回调
        onVisitorInfo: (uid: string, visitorUid: string) => {
            // uid 是系统自动生成访客uid，visitorUid 是前端自定义访客uid
            // 只有在打开对话窗口时，才会触发
            console.log('收到访客信息:', { uid, visitorUid });
        },
    });

    useEffect(() => {
        setConfig((prevConfig: BytedeskConfig) => {
            if (!prevConfig.chatConfig) {
                return prevConfig;
            }

            return {
                ...prevConfig,
                locale,
                theme: {
                    ...(prevConfig.theme || {}),
                    mode: themeMode
                },
                chatConfig: {
                    ...prevConfig.chatConfig,
                    ...selectedChatProfile.chatConfig,
                    ...(isAnonymousMode
                        ? {
                            visitorUid: undefined,
                            nickname: undefined,
                            avatar: undefined
                        }
                        : {
                            visitorUid: selectedUser.visitorUid,
                            nickname: selectedUser.nickname,
                            avatar: selectedUser.avatar
                        })
                }
            } as BytedeskConfig;
        });
    }, [isAnonymousMode, locale, messages, selectedChatProfile, selectedUser, themeMode]);

    const handleInit = () => {
        console.log('BytedeskReact initialized');
    };

    const docLinks = useMemo(
        () => [
            { href: 'https://www.weiyuai.cn/docs/zh-CN/docs/development/unread_count', label: messages.pages.unreadCountDemo.docLinks.unreadDoc },
            { href: 'https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/UnreadCountDemo.tsx', label: messages.pages.unreadCountDemo.docLinks.reactExample },
            { href: 'https://github.com/Bytedesk/bytedesk-web/blob/master/examples/vue-demo/src/pages/unreadCountDemo.vue', label: messages.pages.unreadCountDemo.docLinks.vueExample }
        ],
        [messages]
    );

    const updateUnreadCount = useCallback(() => {
        (window as any).bytedesk?.getUnreadMessageCount().then((count: number) => {
            console.log('刷新后未读消息数：', count);
            setUnreadCount(count);
        });
    }, []);

    const handleMarkAllRead = useCallback(() => {
        (window as any).bytedesk?.clearUnreadMessages().then((count: number) => {
            console.log('所有消息已标记为已读:', count);
            setUnreadCount(count);
        });
    }, []);

    const consultButtonLabel = getConsultButtonLabel(selectedChatProfile);

    const actionButtons = useMemo(
        () => [
            {
                key: 'open',
                label: consultButtonLabel,
                type: 'primary' as const,
                onClick: () => (window as any).bytedesk?.showChat()
            },
            {
                key: 'close',
                label: messages.common.buttons.closeChat,
                onClick: () => (window as any).bytedesk?.hideChat()
            },
            {
                key: 'markAllRead',
                label: messages.pages.unreadCountDemo.buttons.markAllRead,
                onClick: handleMarkAllRead
            },
            {
                key: 'refresh',
                label: messages.pages.unreadCountDemo.buttons.refresh,
                onClick: updateUnreadCount
            }
        ],
        [consultButtonLabel, handleMarkAllRead, messages, updateUnreadCount]
    );

    const apiBaseUrl = useMemo(() => config.apiUrl || 'https://api.weiyuai.cn', [config.apiUrl]);

    const countApiTemplate = useMemo(
        () => 'GET {{API_BASE}}/visitor/api/v1/message/unread/count?uid={uid}&visitorUid={visitorUid}&orgUid={orgUid}&client=WEB_FLOAT',
        []
    );

    const clearApiTemplate = useMemo(
        () => 'POST {{API_BASE}}/visitor/api/v1/message/unread/clear',
        []
    );

    const countApiSampleUrl = useMemo(() => {
        const params = new URLSearchParams();
        params.append('uid', 'BYTEDESK_UID');
        params.append('visitorUid', config.chatConfig?.visitorUid || selectedUser.visitorUid || 'visitor_001');
        params.append('orgUid', config.chatConfig?.org || 'df_org_uid');
        params.append('client', 'WEB_FLOAT');
        return `${apiBaseUrl}/visitor/api/v1/message/unread/count?${params.toString()}`;
    }, [apiBaseUrl, config.chatConfig?.org, config.chatConfig?.visitorUid, selectedUser.visitorUid]);

    const clearApiSampleBody = useMemo(
        () => JSON.stringify({
            uid: 'BYTEDESK_UID',
            visitorUid: config.chatConfig?.visitorUid || selectedUser.visitorUid || 'visitor_001',
            orgUid: config.chatConfig?.org || 'df_org_uid',
            client: 'WEB_FLOAT'
        }, null, 2),
        [config.chatConfig?.org, config.chatConfig?.visitorUid, selectedUser.visitorUid]
    );

    useEffect(() => {
        updateUnreadCount();

        return () => {
            if ((window as any).bytedesk) {
                // (window as any).bytedesk.offUnreadCountChange();
            }
        };
    }, [updateUnreadCount]);

    const chatConfigHint = formatChatConfigQuery(selectedChatProfile.chatConfig);

    return (
        <div style={{ padding: 24 }}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Card>
                    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                        <div>
                            <Typography.Title level={2} style={{ marginBottom: 0 }}>
                                {messages.pages.unreadCountDemo.title}
                            </Typography.Title>
                            <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
                                {messages.pages.unreadCountDemo.description}
                            </Typography.Paragraph>
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
                        <Statistic
                            title={messages.pages.unreadCountDemo.currentCount}
                            value={unreadCount}
                            valueStyle={{ color: token.colorError, fontSize: 36 }}
                        />
                        <Space wrap>
                            {actionButtons.map((button) => (
                                <Button key={button.key} type={button.type} onClick={button.onClick}>
                                    {button.label}
                                </Button>
                            ))}
                        </Space>
                        <Alert
                            type="info"
                            showIcon
                            message={`${messages.common.apiHintPrefix} getUnreadMessageCount(), clearUnreadMessages()`}
                            style={{ alignSelf: 'flex-start', width: 'fit-content', maxWidth: '100%' }}
                        />
                        <Alert type="info" showIcon message={`咨询参数: ${chatConfigHint}`} style={{ alignSelf: 'flex-start', width: 'fit-content', maxWidth: '100%' }} />
                        <BytedeskReact {...config} onInit={handleInit} />
                    </Space>
                </Card>

                <Card title={messages.pages.unreadCountDemo.urlGuideTitle}>
                    <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                        <Typography.Text strong>{messages.pages.unreadCountDemo.countApiLabel}</Typography.Text>
                        <Typography.Paragraph copyable={{ text: countApiTemplate }} style={{ marginBottom: 0 }}>
                            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{countApiTemplate}</pre>
                        </Typography.Paragraph>

                        <Typography.Text strong>{messages.pages.unreadCountDemo.clearApiLabel}</Typography.Text>
                        <Typography.Paragraph copyable={{ text: clearApiTemplate }} style={{ marginBottom: 0 }}>
                            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{clearApiTemplate}</pre>
                        </Typography.Paragraph>

                        <Typography.Text strong>{messages.pages.unreadCountDemo.urlParamsTitle}</Typography.Text>
                        <List
                            size="small"
                            dataSource={messages.pages.unreadCountDemo.urlParams}
                            renderItem={(item) => <List.Item>{item}</List.Item>}
                        />

                        <Typography.Text strong>{messages.pages.unreadCountDemo.sampleUrlLabel}</Typography.Text>
                        <Typography.Paragraph copyable={{ text: countApiSampleUrl }} style={{ marginBottom: 0 }}>
                            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{countApiSampleUrl}</pre>
                        </Typography.Paragraph>

                        <Typography.Text strong>{messages.pages.unreadCountDemo.sampleBodyLabel}</Typography.Text>
                        <Typography.Paragraph copyable={{ text: clearApiSampleBody }} style={{ marginBottom: 0 }}>
                            <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>{clearApiSampleBody}</pre>
                        </Typography.Paragraph>

                        <List
                            size="small"
                            header={messages.pages.unreadCountDemo.apiNotesTitle}
                            dataSource={messages.pages.unreadCountDemo.apiNotes}
                            renderItem={(item) => <List.Item>{item}</List.Item>}
                        />
                    </Space>
                </Card>

                <Card title={messages.pages.unreadCountDemo.usageNotesTitle} styles={{ body: { paddingBottom: 0 } }}>
                    <List
                        dataSource={messages.pages.unreadCountDemo.usageNotes}
                        renderItem={(note) => (
                            <List.Item key={note} style={{ border: 'none', padding: '4px 0' }}>
                                <Typography.Text>{note}</Typography.Text>
                            </List.Item>
                        )}
                    />
                </Card>
            </Space>
        </div>
    );
};

export default UnreadCountDemo;