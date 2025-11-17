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
import { Button, Card, List, Space, Statistic, Typography, theme } from 'antd';
import { getLocaleMessages } from '../locales';

interface DemoPageProps {
    locale: Language;
    themeMode: BytedeskTheme['mode'];
}

const UnreadCountDemo = ({ locale, themeMode }: DemoPageProps) => {
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
            org: 'df_org_uid',
            t: "1", // 0: 一对一对话；1：工作组对话；2：机器人对话
            sid: 'df_wg_uid',
            // 自定义用户信息
            visitorUid: 'visitor_001',
            nickname: messages.pages.userInfoDemo.users.user1,
            avatar: 'https://weiyuai.cn/assets/images/avatar/02.jpg',
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
                    nickname: messages.pages.userInfoDemo.users.user1
                }
            } as BytedeskConfig;
        });
    }, [locale, messages, themeMode]);

    const handleInit = () => {
        console.log('BytedeskReact initialized');
    };

    const docLinks = useMemo(
        () => [
            { href: 'https://www.weiyuai.cn/docs/zh-CN/docs/channel/react', label: messages.pages.unreadCountDemo.docLinks.reactDoc },
            { href: 'https://www.weiyuai.cn/docs/zh-CN/docs/channel/vue', label: messages.pages.unreadCountDemo.docLinks.vueDoc },
            { href: 'https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/unreadCountDemo.tsx', label: messages.pages.unreadCountDemo.docLinks.reactExample },
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

    const actionButtons = useMemo(
        () => [
            {
                key: 'open',
                label: messages.common.buttons.openChat,
                type: 'primary' as const,
                onClick: () => (window as any).bytedesk?.showChat()
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
        [handleMarkAllRead, messages, updateUnreadCount]
    );

    useEffect(() => {
        updateUnreadCount();

        return () => {
            if ((window as any).bytedesk) {
                // (window as any).bytedesk.offUnreadCountChange();
            }
        };
    }, [updateUnreadCount]);

    return (
        <div style={{ padding: 24 }}>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
                <Card title={messages.pages.unreadCountDemo.title} bodyStyle={{ paddingBottom: 8 }}>
                    <Typography.Paragraph type="secondary" style={{ marginBottom: 16 }}>
                        {messages.pages.unreadCountDemo.description}
                    </Typography.Paragraph>
                    <List
                        dataSource={docLinks}
                        split={false}
                        renderItem={(link) => (
                            <List.Item key={link.href} style={{ padding: '6px 0' }}>
                                <Typography.Link href={link.href} target="_blank" rel="noopener noreferrer">
                                    {link.label}
                                </Typography.Link>
                            </List.Item>
                        )}
                    />
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
                        <Typography.Text type="secondary">
                            {messages.common.apiHintPrefix} getUnreadMessageCount(), clearUnreadMessages()
                        </Typography.Text>
                        <BytedeskReact {...config} onInit={handleInit} />
                    </Space>
                </Card>

                <Card title={messages.pages.unreadCountDemo.usageNotesTitle} bodyStyle={{ paddingBottom: 0 }}>
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