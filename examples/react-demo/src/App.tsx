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
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useLayoutEffect, useMemo, useState, useCallback, useRef } from 'react';
import { App as AntdApp, Button, ConfigProvider, Dropdown, Layout, theme as antdTheme, type MenuProps } from 'antd';
import LocalDemo from './pages/LocalDemo';
import VipLevelDemo from './pages/vipLevelDemo';
import GoodsInfoDemo from './pages/goodsInfoDemo';
import OrderInfoDemo from './pages/orderInfoDemo';
import UserInfoDemo from './pages/userInfoDemo';
import UnreadCountDemo from './pages/unreadCountDemo';
import DocumentFeedbackDemo from './pages/DocumentFeedbackDemo';
// import FlightBookingDemo from './pages/FlightBookingDemo';
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
  const navigate = useNavigate();
  const { token } = antdTheme.useToken();

  const navLinks = useMemo(() => ([
    { path: '/', label: messages.nav.localDemo },
    { path: '/userInfo', label: messages.nav.userInfoDemo },
    { path: '/goodsInfo', label: messages.nav.goodsInfoDemo },
    { path: '/orderInfo', label: messages.nav.orderInfoDemo },
    { path: '/vipLevel', label: messages.nav.vipLevelDemo },
    { path: '/unreadCount', label: messages.nav.unreadCountDemo },
    { path: '/documentFeedback', label: messages.nav.documentFeedbackDemo },
    // { path: '/flightBooking', label: messages.nav.flightBookingDemo }
  ]), [messages]);

  const NAV_GAP = 12;
  const navContainerRef = useRef<HTMLElement | null>(null);
  const measureItemRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const measureMoreRef = useRef<HTMLSpanElement | null>(null);
  const [visibleNavCount, setVisibleNavCount] = useState(navLinks.length);

  const setMeasureItemRef = useCallback((index: number) => (node: HTMLSpanElement | null) => {
    measureItemRefs.current[index] = node;
  }, []);

  const computeVisibleCount = useCallback((containerWidth: number) => {
    const widths = navLinks.map((_, index) => measureItemRefs.current[index]?.offsetWidth ?? 0);
    const moreWidth = measureMoreRef.current?.offsetWidth ?? 0;

    if (!containerWidth || widths.length === 0) {
      return widths.length;
    }

    const sum = (values: number[]) => values.reduce((acc, value) => acc + value, 0);
    for (let visible = widths.length; visible >= 0; visible -= 1) {
      const overflow = widths.length - visible;
      const visibleWidths = widths.slice(0, visible);
      const visibleTotal = sum(visibleWidths) + (visible > 0 ? NAV_GAP * (visible - 1) : 0);
      const extra = overflow > 0 ? NAV_GAP + moreWidth : 0;
      if (visibleTotal + extra <= containerWidth) {
        return visible;
      }
    }

    return 0;
  }, [navLinks]);

  const recalcNav = useCallback(() => {
    const container = navContainerRef.current;
    if (!container) {
      return;
    }
    const containerWidth = container.clientWidth;
    const nextVisibleCount = computeVisibleCount(containerWidth);
    setVisibleNavCount((prev) => (prev === nextVisibleCount ? prev : nextVisibleCount));
  }, [computeVisibleCount]);

  useLayoutEffect(() => {
    recalcNav();

    if (!isBrowser) {
      return;
    }

    const container = navContainerRef.current;
    if (!container) {
      return;
    }

    const observer = new ResizeObserver(() => {
      recalcNav();
    });
    observer.observe(container);

    window.addEventListener('resize', recalcNav);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', recalcNav);
    };
  }, [recalcNav, messages]);

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

  const visibleNavLinks = navLinks.slice(0, visibleNavCount);
  const overflowNavLinks = navLinks.slice(visibleNavCount);
  const overflowMenuItems: MenuProps['items'] = overflowNavLinks.map((item) => ({
    key: item.path,
    label: item.label
  }));

  const languageMenuItems: MenuProps['items'] = languageOptions.map((option) => ({
    key: option.value,
    label: option.label
  }));

  const themeMenuItems: MenuProps['items'] = themeOptions.map((option) => ({
    key: option.value,
    label: option.label
  }));

  const githubUrl = 'https://github.com/Bytedesk/bytedesk-web';
  const siteUrlMap: Record<DemoLocale, string> = {
    en: 'https://www.weiyuai.cn/en/',
    'zh-cn': 'https://www.weiyuai.cn/',
    'zh-tw': 'https://www.weiyuai.cn/zh-TW/'
  };
  const currentSiteUrl = siteUrlMap[locale] || siteUrlMap['zh-cn'];

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
          ref={navContainerRef}
          style={{
            flex: 1,
            minWidth: 0,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            overflowX: 'hidden',
            padding: '12px 0'
          }}
        >
          {visibleNavLinks.map((item) => (
            <Link key={item.path} to={item.path} style={getLinkStyle(item.path)}>
              {item.label}
            </Link>
          ))}

          {overflowNavLinks.length > 0 && (
            <Dropdown
              trigger={['click']}
              menu={{
                items: overflowMenuItems,
                onClick: ({ key }) => navigate(String(key))
              }}
            >
              <Button
                type="text"
                style={{
                  padding: '6px 12px',
                  borderRadius: 6,
                  fontWeight: 600,
                  color: token.colorText,
                  height: 'auto'
                }}
                aria-label={messages.nav.more}
              >
                {messages.nav.more}
              </Button>
            </Dropdown>
          )}
        </nav>

        {/* Hidden measurement nodes for responsive nav overflow */}
        <div
          style={{
            position: 'absolute',
            left: -9999,
            top: -9999,
            visibility: 'hidden',
            whiteSpace: 'nowrap',
            pointerEvents: 'none'
          }}
        >
          {navLinks.map((item, index) => (
            <span
              key={item.path}
              ref={setMeasureItemRef(index)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '6px 12px',
                borderRadius: 6,
                fontWeight: 500
              }}
            >
              {item.label}
            </span>
          ))}
          <span
            ref={measureMoreRef}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '6px 12px',
              borderRadius: 6,
              fontWeight: 600
            }}
          >
            {messages.nav.more}
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            gap: 16,
            flexShrink: 0,
            alignItems: 'center',
            flexWrap: 'wrap'
          }}
        >
          <Dropdown
            trigger={['hover']}
            menu={{
              items: languageMenuItems,
              selectable: true,
              selectedKeys: [locale],
              onClick: ({ key }) => onLocaleChange(String(key) as DemoLocale)
            }}
          >
            <Button
              type="text"
              aria-label={messages.common.languageLabel}
              style={{
                width: 36,
                height: 36,
                padding: 0,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 6,
                color: token.colorText
              }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
                <path
                  d="M12 22a10 10 0 100-20 10 10 0 000 20zm0 0c2.761 0 5-4.477 5-10S14.761 2 12 2 7 6.477 7 12s2.239 10 5 10zm-9.5-10h19"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>
          </Dropdown>

          <Dropdown
            trigger={['hover']}
            menu={{
              items: themeMenuItems,
              selectable: true,
              selectedKeys: [themeMode],
              onClick: ({ key }) => onThemeChange(String(key) as ThemeMode)
            }}
          >
            <Button
              type="text"
              aria-label={messages.common.themeLabel}
              style={{
                width: 36,
                height: 36,
                padding: 0,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 6,
                color: token.colorText
              }}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" aria-hidden="true">
                <path
                  d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364-1.414 1.414M7.05 16.95l-1.414 1.414m0-11.314 1.414 1.414m11.314 11.314 1.414 1.414"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  d="M12 17a5 5 0 100-10 5 5 0 000 10z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                />
              </svg>
            </Button>
          </Dropdown>
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Bytedesk GitHub"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '6px 12px',
              borderRadius: 6,
              textDecoration: 'none',
              fontWeight: 600,
              color: token.colorPrimary,
              backgroundColor: 'transparent',
              transition: 'all 0.15s ease'
            }}
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
              <path d="M12 .297C5.373.297 0 5.67 0 12.297c0 5.292 3.438 9.776 8.205 11.366.6.111.82-.261.82-.58 0-.287-.011-1.046-.017-2.053-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.73.083-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.835 2.807 1.305 3.492.998.108-.775.418-1.305.762-1.605-2.665-.303-5.467-1.332-5.467-5.931 0-1.31.469-2.381 1.235-3.221-.124-.303-.535-1.525.117-3.176 0 0 1.008-.323 3.301 1.23a11.52 11.52 0 013.003-.404c1.02.005 2.045.138 3.003.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.651.242 2.873.118 3.176.77.84 1.233 1.911 1.233 3.221 0 4.609-2.807 5.625-5.48 5.921.43.373.814 1.103.814 2.222 0 1.606-.015 2.903-.015 3.296 0 .322.216.697.825.579C20.565 22.07 24 17.587 24 12.297 24 5.67 18.627.297 12 .297z" />
            </svg>
            <span style={{ fontSize: 13 }}>GitHub</span>
          </a>
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
          {/* <Route
            path="/flightBooking"
            element={<FlightBookingDemo locale={locale as Language} themeMode={resolvedTheme as BytedeskTheme['mode']} />}
          /> */}
        </Routes>
      </Layout.Content>
      <Layout.Footer
        style={{
          background: token.colorBgContainer,
          borderTop: `1px solid ${token.colorSplit}`,
          padding: '10px 24px',
          textAlign: 'center'
        }}
      >
        <div style={{ fontSize: 12, color: token.colorTextSecondary || token.colorText }}>
          <a
            href={currentSiteUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`${messages.common.officialSiteLabel} ${messages.common.languageOptions[locale]}`}
            style={{ color: token.colorText }}
          >
            {messages.common.officialSiteLabel}
          </a>
        </div>
      </Layout.Footer>
    </Layout>
  );
}

export default App; 