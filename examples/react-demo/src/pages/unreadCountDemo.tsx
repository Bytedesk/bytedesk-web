/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2025-06-21 11:10:07
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-06-24 09:57:52
 */
import React, { useState, useEffect } from 'react';
// @ts-ignore
import { BytedeskReact } from '@bytedesk/web/adapters/react';
// @ts-ignore
import type { BytedeskConfig } from '@bytedesk/web/types';

const UnreadCountDemo = () => {
    const [unreadCount, setUnreadCount] = useState<number>(0);
    const [config] = useState<BytedeskConfig>({
        ...(process.env.NODE_ENV === 'development' 
        ? { 
            baseUrl: 'http://127.0.0.1:9006', 
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
            uid: 'visitor_001',
            nickname: '访客小明',
            avatar: 'https://weiyuai.cn/assets/images/avatar/02.jpg',
        },
        theme: {
            mode: 'light',
        },
        locale: 'zh-cn',
        // 添加 onVisitorInfo 回调
        onVisitorInfo: (uid: string, visitorUid: string) => {
            // uid 是系统自动生成访客uid，visitorUid 是前端自定义访客uid
            // 只有在打开对话窗口时，才会触发
            console.log('收到访客信息:', { uid, visitorUid });
        },
    });

    const handleInit = () => {
        console.log('BytedeskReact initialized');
    };

    useEffect(() => {

        // 默认初始化未读消息数
        (window as any).bytedesk?.getUnreadMessageCount().then((count: number) => {
            console.log('刷新后未读消息数：', count);
            setUnreadCount(count);
        });

        // 组件卸载时清除监听器
        return () => {
            if ((window as any).bytedesk) {
                // (window as any).bytedesk.offUnreadCountChange();
            }
        };
    }, []);

    return (
        <div style={{ padding: '20px' }}>
            <h1>微语未读消息计数示例</h1>
            <p>
                <a href="https://www.weiyuai.cn/docs/zh-CN/docs/channel/react" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ color: '#2e88ff', textDecoration: 'none' }}>
                查看 React 集成文档
                </a>
            </p>

            <div style={{ 
                marginTop: '20px', 
                marginBottom: '20px', 
                padding: '20px', 
                backgroundColor: '#f5f5f5', 
                borderRadius: '8px' 
            }}>
                <h2>当前未读消息数: <span style={{ color: '#ff4d4f' }}>{unreadCount}</span></h2>
            </div>

            <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <button 
                    onClick={() => (window as any).bytedesk?.showChat()}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#2e88ff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    打开聊天
                </button>
                <button 
                    onClick={() => {
                        (window as any).bytedesk?.clearUnreadMessages().then((count: number) => {
                            console.log('所有消息已标记为已读:', count);
                            setUnreadCount(count); // 重置未读消息数
                        });
                    }}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#52c41a',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    标记所有消息为已读
                </button>
                <button 
                    onClick={() => {
                        (window as any).bytedesk?.getUnreadMessageCount().then((count: number) => {
                            console.log('刷新后未读消息数：', count);
                            setUnreadCount(count);
                        });
                    }}
                    style={{
                        padding: '10px 20px',
                        backgroundColor: '#722ed1',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    刷新未读消息数
                </button>
            </div>
            
            <BytedeskReact 
                {...config} 
                onInit={handleInit} 
            />

            <div style={{ marginTop: '40px' }}>
                <h2>使用说明</h2>
                <ul style={{ lineHeight: '1.6' }}>
                    {/* <li>未读消息数会自动更新（当收到新消息时）</li> */}
                    {/* <li>当用户阅读消息后，未读消息数会自动减少</li> */}
                    <li>使用 getUnreadMessageCount() 方法可以手动刷新未读消息数</li>
                    <li>您可以使用 clearUnreadMessages() 方法手动重置未读消息数为0</li>
                </ul>
            </div>


        </div>
    );
};

export default UnreadCountDemo;