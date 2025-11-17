/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-28 12:41:30
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-06-21 10:31:27
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
 */
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { App as AntdApp, ConfigProvider, Layout, Select, Typography, theme as antdTheme } from 'antd';
import LocalDemo from './pages/LocalDemo';
import VipLevelDemo from './pages/vipLevelDemo';
import GoodsInfoDemo from './pages/goodsInfoDemo';
import OrderInfoDemo from './pages/orderInfoDemo';
import UserInfoDemo from './pages/userInfoDemo';
import UnreadCountDemo from './pages/unreadCountDemo';
import DocumentFeedbackDemo from './pages/DocumentFeedbackDemo';
// @ts-ignore
import type { Language, Theme as BytedeskTheme } from '@bytedesk/web/types';
import { getLocaleMessages, type LocaleMessages } from './locales';

type DemoLocale = keyof LocaleMessages['common']['languageOptions'];
type ThemeMode = keyof LocaleMessages['common']['themeOptions'];
type ResolvedThemeMode = Exclude<ThemeMode, 'system'>;

const THEME_STORAGE_KEY = 'bytedesk-react-demo-theme';
const isBrowser = typeof window !== 'undefined';

const getStoredThemeMode = (): ThemeMode => {
  if (!isBrowser) {
    return 'light';
  }
  const stored = window.localStorage.getItem(THEME_STORAGE_KEY) as ThemeMode | null;
  if (stored && ['light', 'dark', 'system'].includes(stored)) {
    return stored;
  }
  return 'light';
};

const useSystemTheme = (): ResolvedThemeMode => {
  const getPreference = () => {
    if (!isBrowser) {
      return 'light';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const [systemTheme, setSystemTheme] = useState<ResolvedThemeMode>(getPreference);

  useEffect(() => {
    if (!isBrowser) {
      return;
    }

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const updateTheme = (event: MediaQueryList | MediaQueryListEvent) => {
      setSystemTheme(event.matches ? 'dark' : 'light');
    };

    updateTheme(mediaQuery);

    if (mediaQuery.addEventListener) {
      const listener = (event: MediaQueryListEvent) => updateTheme(event);
      mediaQuery.addEventListener('change', listener);
      return () => mediaQuery.removeEventListener('change', listener);
    }

    const legacyListener = (event: MediaQueryListEvent) => updateTheme(event);
    mediaQuery.addListener?.(legacyListener);
    return () => mediaQuery.removeListener?.(legacyListener);
  }, []);

  return systemTheme;
};

const LANGUAGE_LIST: DemoLocale[] = ['en', 'zh-cn', 'zh-tw'];
const THEME_LIST: ThemeMode[] = ['light', 'dark', 'system'];

function App() {
  return (
    <Router basename="/reactdemo">
      <ThemedRouterApp />
    </Router>
  );
}

function ThemedRouterApp() {
  const [locale, setLocale] = useState<DemoLocale>('zh-cn');
  const [themeMode, setThemeMode] = useState<ThemeMode>(getStoredThemeMode);
  const systemTheme = useSystemTheme();
  const resolvedTheme: ResolvedThemeMode = themeMode === 'system' ? systemTheme : themeMode;

  useEffect(() => {
    if (isBrowser) {
      window.localStorage.setItem(THEME_STORAGE_KEY, themeMode);
    }
  }, [themeMode]);

  const messages = useMemo(() => getLocaleMessages(locale as Language), [locale]);

  const languageOptions = useMemo(() => (
    LANGUAGE_LIST.map((code) => ({
      value: code,
      label: messages.common.languageOptions[code]
    }))
  ), [messages]);

  const themeOptions = useMemo(() => (
    THEME_LIST.map((mode) => ({
      value: mode,
      label: messages.common.themeOptions[mode]
    }))
  ), [messages]);

  const themeConfig = useMemo(() => ({
    algorithm: resolvedTheme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
    token: {
      colorBgLayout: resolvedTheme === 'dark' ? '#030712' : '#f5f5f5'
    }
  }), [resolvedTheme]);

  return (
    <ConfigProvider theme={themeConfig} componentSize="middle">
      <AntdApp>
        <AppLayout
          locale={locale}
          messages={messages}
          languageOptions={languageOptions}
          themeOptions={themeOptions}
          themeMode={themeMode}
          resolvedTheme={resolvedTheme}
          onLocaleChange={setLocale}
          onThemeChange={setThemeMode}
        />
      </AntdApp>
    </ConfigProvider>
  );
}

interface AppLayoutProps {
  locale: DemoLocale;
  themeMode: ThemeMode;
  resolvedTheme: ResolvedThemeMode;
  messages: LocaleMessages;
  languageOptions: { value: DemoLocale; label: string }[];
  themeOptions: { value: ThemeMode; label: string }[];
  onLocaleChange: (nextLocale: DemoLocale) => void;
  onThemeChange: (nextTheme: ThemeMode) => void;
}

function AppLayout({
  locale,
  themeMode,
  resolvedTheme,
  messages,
  languageOptions,
  themeOptions,
  onLocaleChange,
  onThemeChange
}: AppLayoutProps) {
  const location = useLocation();
  const { token } = antdTheme.useToken();

  const navLinks = [
    { path: '/', label: messages.nav.localDemo },
    { path: '/userInfo', label: messages.nav.userInfoDemo },
    { path: '/goodsInfo', label: messages.nav.goodsInfoDemo },
    { path: '/orderInfo', label: messages.nav.orderInfoDemo },
    { path: '/vipLevel', label: messages.nav.vipLevelDemo },
    { path: '/unreadCount', label: messages.nav.unreadCountDemo },
    { path: '/documentFeedback', label: messages.nav.documentFeedbackDemo }
  ];

  const getLinkStyle = (path: string) => {
    const isActive = location.pathname === path;
    return {
      padding: '6px 12px',
      borderRadius: 6,
      textDecoration: 'none',
      fontWeight: isActive ? 600 : 500,
      color: isActive ? token.colorPrimary : token.colorText,
      backgroundColor: isActive ? token.colorFillSecondary : 'transparent',
      transition: 'all 0.2s ease'
    };
  };

  return (
    <Layout style={{ minHeight: '100vh', background: token.colorBgLayout }}>
      <Layout.Header
        style={{
          background: token.colorBgContainer,
          borderBottom: `1px solid ${token.colorSplit}`,
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 16
        }}
      >
        <nav
          style={{
            flex: 1,
            minWidth: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            overflowX: 'auto',
            padding: '12px 0'
          }}
        >
          {navLinks.map((item) => (
            <Link key={item.path} to={item.path} style={getLinkStyle(item.path)}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div
          style={{
            display: 'flex',
            gap: 16,
            flexShrink: 0,
            alignItems: 'center',
            flexWrap: 'wrap'
          }}
        >
          <div
            style={{
              minWidth: 160,
              display: 'flex',
              flexDirection: 'column',
              gap: 4
            }}
          >
            <Typography.Text type="secondary" style={{ fontSize: 12, lineHeight: 1 }}>
              {messages.common.languageLabel}
            </Typography.Text>
            <Select
              value={locale}
              options={languageOptions}
              onChange={(value: DemoLocale) => onLocaleChange(value)}
              style={{ width: '100%' }}
            />
          </div>
          <div
            style={{
              minWidth: 180,
              display: 'flex',
              flexDirection: 'column',
              gap: 4
            }}
          >
            <Typography.Text type="secondary" style={{ fontSize: 12, lineHeight: 1 }}>
              {messages.common.themeLabel}
            </Typography.Text>
            <Select
              value={themeMode}
              options={themeOptions}
              onChange={(value: ThemeMode) => onThemeChange(value)}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      </Layout.Header>
      <Layout.Content style={{ padding: 0, background: token.colorBgLayout }}>
        <Routes>
          <Route path="/" element={<LocalDemo locale={locale as Language} themeMode={resolvedTheme as BytedeskTheme['mode']} />} />
          <Route
            path="/userInfo"
            element={<UserInfoDemo locale={locale as Language} themeMode={resolvedTheme as BytedeskTheme['mode']} />}
          />
          <Route
            path="/orderInfo"
            element={<OrderInfoDemo locale={locale as Language} themeMode={resolvedTheme as BytedeskTheme['mode']} />}
          />
          <Route
            path="/goodsInfo"
            element={<GoodsInfoDemo locale={locale as Language} themeMode={resolvedTheme as BytedeskTheme['mode']} />}
          />
          <Route
            path="/vipLevel"
            element={<VipLevelDemo locale={locale as Language} themeMode={resolvedTheme as BytedeskTheme['mode']} />}
          />
          <Route
            path="/unreadCount"
            element={<UnreadCountDemo locale={locale as Language} themeMode={resolvedTheme as BytedeskTheme['mode']} />}
          />
          <Route
            path="/documentFeedback"
            element={<DocumentFeedbackDemo locale={locale as Language} themeMode={resolvedTheme as BytedeskTheme['mode']} />}
          />
        </Routes>
      </Layout.Content>
    </Layout>
  );
}

export default App; 