/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-28 12:41:30
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-12-30 14:54:40
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
 */
import React, { useState } from 'react';
// @ts-ignore
import { BytedeskReact } from '@bytedesk/web/adapters/react';
// @ts-ignore
import { PresetColor, Position, BytedeskConfig, Language } from '@bytedesk/web/types';
import { messages } from './locales';

// 添加导航栏预设颜色选
const NAVBAR_PRESETS = {
  light: {
    backgroundColor: '#ffffff',
    textColor: '#333333'
  },
  dark: {
    backgroundColor: '#333333',
    textColor: '#ffffff'
  },
  blue: {
    backgroundColor: '#0066FF',
    textColor: '#ffffff'
  },
  custom: {
    backgroundColor: '#ffffff',
    textColor: '#333333'
  }
};

// 添加预设主题
const PRESET_THEMES = {
  default: {
    primaryColor: '#2e88ff',
    secondaryColor: '#ffffff',
    textColor: '#333333',
    backgroundColor: '#ffffff',
    navbar: NAVBAR_PRESETS.light
  },
  dark: {
    primaryColor: '#1a1a1a',
    secondaryColor: '#ffffff',
    textColor: '#ffffff',
    backgroundColor: '#333333',
    navbar: NAVBAR_PRESETS.dark
  },
  ocean: {
    primaryColor: '#0066cc',
    secondaryColor: '#ffffff',
    textColor: '#333333',
    backgroundColor: '#f0f8ff',
    navbar: {
      backgroundColor: '#0066cc',
      textColor: '#ffffff'
    }
  },
  forest: {
    primaryColor: '#2e7d32',
    secondaryColor: '#ffffff',
    textColor: '#333333',
    backgroundColor: '#f1f8e9',
    navbar: {
      backgroundColor: '#2e7d32',
      textColor: '#ffffff'
    }
  }
};

function App() {
  // 添加本地存储键
  const STORAGE_KEY = 'bytedesk_demo_config';

  // 从 URL 读取初始参数
  const getInitialChatParams = () => {
    const searchParams = new URLSearchParams(window.location.search);
    return {
      org: searchParams.get('org') || 'df_org_uid',
      t: searchParams.get('t') ? Number(searchParams.get('t')) : 2,
      sid: searchParams.get('sid') || 'df_rt_uid'
    };
  };

  // 获取默认配置
  const getDefaultConfig = () => ({
    preset: 'blue',
    placement: 'bottom-right' as Position,
    marginBottom: 20,
    marginSide: 20,
    tabsConfig: {
      home: false,
      messages: true,
      help: false,
      news: false
    },
    bubbleConfig: {
      show: true,
      icon: '👋',
      title: '需要帮助吗？',
      subtitle: '点击开始对话'
    },
    showSupport: true,
    chatParams: getInitialChatParams(),
    navbarPreset: 'light',
    customColor: '#000000',
    navbarColor: '#ffffff',
    navbarTextColor: '#333333',
    margins: {
      bottom: 20,
      right: 20,
      left: 20
    },
    animation: {
      enabled: true,
      duration: 300,
      type: 'ease'
    },
    window: {
      width: 380,
      height: 640,
      title: '智能客服'
    },
    theme: {
      primaryColor: '#2e88ff',
      secondaryColor: '#ffffff',
      textColor: '#333333',
      backgroundColor: '#ffffff',
      navbar: {
        backgroundColor: '#ffffff',
        textColor: '#333333'
      }
    }
  });

  // 从本地存储加载配置
  const loadStoredConfig = () => {
    try {
      const storedConfig = localStorage.getItem(STORAGE_KEY);
      return storedConfig ? JSON.parse(storedConfig) : getDefaultConfig();
    } catch (e) {
      console.error('Failed to parse stored config:', e);
      return getDefaultConfig();
    }
  };

  // 状态管理
  const [config, setConfig] = useState(loadStoredConfig());

  // 保存配置到本地存储
  const saveConfig = (newConfig: any) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newConfig));
      setConfig(newConfig);
    } catch (e) {
      console.error('Failed to save config:', e);
    }
  };

  // 添加配置验证函数
  const validateConfig = (config: Partial<BytedeskConfig>): boolean => {
    try {
      // 验证必需字段
      if (!config.preset || !config.placement) {
        return false;
      }

      // 验证数值范围
      if (config.window) {
        if (config.window.width < 300 || config.window.width > 800) return false;
        if (config.window.height < 400 || config.window.height > 800) return false;
      }

      // 验证颜色格式
      const isValidColor = (color: string) => /^#[0-9A-Fa-f]{6}$/.test(color);
      if (config.theme) {
        if (!isValidColor(config.theme.primaryColor)) return false;
        if (!isValidColor(config.theme.secondaryColor)) return false;
      }

      // 验证动画配置
      if (config.animation) {
        if (config.animation.duration < 0 || config.animation.duration > 1000) return false;
        if (!['ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out'].includes(config.animation.type)) {
          return false;
        }
      }

      return true;
    } catch (e) {
      console.error('Config validation failed:', e);
      return false;
    }
  };

  // 修改配置更新函数
  const updateConfig = (path: string[], value: any) => {
    const newConfig = { ...config };
    let current = newConfig;
    
    // 更新配置值
    for (let i = 0; i < path.length - 1; i++) {
      if (!current[path[i]]) {
        current[path[i]] = {};
      }
      current = current[path[i]];
    }
    current[path[path.length - 1]] = value;

    // 验证新配置
    if (validateConfig(newConfig)) {
      saveConfig(newConfig);
    } else {
      console.error('Invalid configuration');
      // 可以添加用户提示
      alert('配置无效，请检查输入');
    }
  };
  
  // 处理函数
  const handleInit = () => {
    console.log('BytedeskReact component initialized');
  };

  const handleShowChat = () => {
    console.log('Show chat button clicked');
    const bytedesk = (window as any).bytedesk;
    if (bytedesk) {
      console.log('Found bytedesk instance, showing chat window...');
      bytedesk.showChat();
    } else {
      console.error('Bytedesk instance not found');
    }
  };

  const handlePlacementChange = (newPlacement: Position) => {
    const newConfig = { ...config };
    newConfig.placement = newPlacement;
    
    // 确保必需的主题属性有值
    if (newConfig.theme) {
      newConfig.theme = {
        ...newConfig.theme,
        position: newPlacement === 'bottom-left' ? 'left' : 'right',
        primaryColor: newConfig.theme.primaryColor || '#2e88ff',    // 添加默认值
        secondaryColor: newConfig.theme.secondaryColor || '#ffffff', // 添加默认值
        textColor: newConfig.theme.textColor || '#333333',          // 添加默认值
        backgroundColor: newConfig.theme.backgroundColor || '#ffffff' // 添加默认值
      };
    }
    
    if (newConfig.window) {
      newConfig.window.position = newPlacement === 'bottom-left' ? 'left' : 'right';
    }
    
    setConfig(newConfig);
  };

  const handleTabsChange = (tab: string, enabled: boolean) => {
    updateConfig(['tabsConfig', tab], enabled);
  };

  const handleBubbleConfigChange = (key: string, value: any) => {
    updateConfig(['bubbleConfig', key], value);
  };

  const handleNavbarPresetChange = (preset: string) => {
    updateConfig(['navbarPreset'], preset);
    if (preset === 'custom') {
      updateConfig(['navbarColor'], config.customColor);
      updateConfig(['navbarTextColor'], config.navbarTextColor);
    }
  };
  // 添加移动端检测
  const isMobile = window.innerWidth <= 768;

  // 修改响应式布局样式
  const styles = {
    container: {
      padding: isMobile ? '10px' : '20px',
      maxWidth: '600px',  // 添加最大宽度
      margin: '0 auto',   // 居中显示
    },
    grid: {
      display: 'flex',    // 改为 flex 布局
      flexDirection: 'column' as const,  // 单列布局
      gap: isMobile ? '10px' : '20px',
      margin: isMobile ? '10px 0' : '20px 0'
    },
    section: {
      marginBottom: isMobile ? '10px' : '20px',
      padding: isMobile ? '15px' : '20px',
      border: '1px solid #ddd',
      borderRadius: '8px',    // 稍微增加圆角
      backgroundColor: '#fff' // 添加背景色
    },
    button: {
      padding: isMobile ? '6px 12px' : '8px 16px',
      fontSize: isMobile ? '12px' : '14px'
    },
    input: {
      width: isMobile ? '100%' : 'auto',
      padding: isMobile ? '6px' : '8px',
      fontSize: isMobile ? '12px' : '14px'
    },
    colorPicker: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: '10px',
      alignItems: isMobile ? 'stretch' : 'center'
    },
    select: {
      padding: '8px',
      borderRadius: '4px',
      border: '1px solid #ddd',
      backgroundColor: '#fff',
      cursor: 'pointer'
    }
  };

  const [language, setLanguage] = useState<Language>('zh-CN');
  const t = messages[language];

  return (
    <div className="App" style={styles.container}>
      {/* 添加语言选择器 */}
      <div style={{ textAlign: 'right', marginBottom: '20px' }}>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as Language)}
          style={styles.select}
        >
          <option value="zh-CN">中文</option>
          <option value="en-US">English</option>
        </select>
      </div>

      <h1 style={{ 
        fontSize: isMobile ? '20px' : '24px',
        textAlign: 'center',
        marginBottom: '20px'
      }}>
        {t.title}
      </h1>
      
      <div style={styles.grid}>
        {/* 位置设置 */}
        <div className="config-section" style={styles.section}>
          <h3 style={{ fontSize: isMobile ? '16px' : '18px' }}>{t.settings.position}</h3>
          <div style={{ 
            display: 'flex', 
            gap: '10px',
            flexDirection: isMobile ? 'column' : 'row' 
          }}>
            <button
              onClick={() => handlePlacementChange('bottom-left')}
              style={{
                backgroundColor: config.placement === 'bottom-left' ? config.theme.primaryColor : '#fff',
                color: config.placement === 'bottom-left' ? '#fff' : '#333',
                border: '1px solid #ddd',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              左下角
            </button>
            <button
              onClick={() => handlePlacementChange('bottom-right')}
              style={{
                backgroundColor: config.placement === 'bottom-right' ? config.theme.primaryColor : '#fff',
                color: config.placement === 'bottom-right' ? '#fff' : '#333',
                border: '1px solid #ddd',
                padding: '8px 16px',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              右下角
            </button>
          </div>
        </div>

        {/* 标签页设置 */}
        <div className="config-section" style={styles.section}>
          <h3 style={{ fontSize: isMobile ? '16px' : '18px' }}>{t.settings.tabs}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {Object.entries(config.tabsConfig).map(([tab, enabled]) => (
              <label key={tab} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <input
                  type="checkbox"
                  // checked={enabled}
                  onChange={(e) => handleTabsChange(tab, e.target.checked)}
                />
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </label>
            ))}
          </div>
        </div>

        {/* 气泡消息设置 */}
        <div className="config-section" style={styles.section}>
          <h3 style={{ fontSize: isMobile ? '16px' : '18px' }}>{t.settings.bubble}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={config.bubbleConfig.show}
                onChange={(e) => {
                  const newConfig = { ...config };
                  newConfig.bubbleConfig.show = e.target.checked;
                  saveConfig(newConfig);
                }}
              />
              显示气泡消息
            </label>
            
            {config.bubbleConfig.show && (
              <>
                <div>
                  <label>图标</label>
                  <input
                    type="text"
                    value={config.bubbleConfig.icon}
                    onChange={(e) => {
                      const newConfig = { ...config };
                      newConfig.bubbleConfig.icon = e.target.value;
                      saveConfig(newConfig);
                    }}
                    style={{ padding: '4px 8px', marginLeft: '10px' }}
                  />
                </div>
                <div>
                  <label>标题</label>
                  <input
                    type="text"
                    value={config.bubbleConfig.title}
                    onChange={(e) => {
                      const newConfig = { ...config };
                      newConfig.bubbleConfig.title = e.target.value;
                      saveConfig(newConfig);
                    }}
                    style={{ padding: '4px 8px', marginLeft: '10px', width: '200px' }}
                  />
                </div>
                <div>
                  <label>副标题</label>
                  <input
                    type="text"
                    value={config.bubbleConfig.subtitle}
                    onChange={(e) => {
                      const newConfig = { ...config };
                      newConfig.bubbleConfig.subtitle = e.target.value;
                      saveConfig(newConfig);
                    }}
                    style={{ padding: '4px 8px', marginLeft: '10px', width: '200px' }}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* 添加导航栏样式设置 */}
        <div className="config-section" style={styles.section}>
          <h3 style={{ fontSize: isMobile ? '16px' : '18px' }}>{t.settings.navbar}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              {Object.keys(NAVBAR_PRESETS).map((preset) => (
                <button
                  key={preset}
                  onClick={() => handleNavbarPresetChange(preset)}
                  style={{
                    backgroundColor: config.navbarPreset === preset ? config.theme.primaryColor : '#fff',
                    color: config.navbarPreset === preset ? '#fff' : '#333',
                    border: '1px solid #ddd',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  {preset.charAt(0).toUpperCase() + preset.slice(1)}
                </button>
              ))}
            </div>
            
            {config.navbarPreset === 'custom' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                  <label>背景颜色</label>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <input
                      type="color"
                      value={config.navbarColor}
                      onChange={(e) => updateConfig(['navbarColor'], e.target.value)}
                    />
                    <input
                      type="text"
                      value={config.navbarColor}
                      onChange={(e) => updateConfig(['navbarColor'], e.target.value)}
                      style={{ padding: '4px 8px', width: '80px' }}
                    />
                  </div>
                </div>
                <div>
                  <label>文字颜色</label>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <input
                      type="color"
                      value={config.navbarTextColor}
                      onChange={(e) => updateConfig(['navbarTextColor'], e.target.value)}
                    />
                    <input
                      type="text"
                      value={config.navbarTextColor}
                      onChange={(e) => updateConfig(['navbarTextColor'], e.target.value)}
                      style={{ padding: '4px 8px', width: '80px' }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 添加主题颜色设置 */}
        <div className="config-section" style={styles.section}>
          <h3 style={{ fontSize: isMobile ? '16px' : '18px' }}>{t.settings.theme}</h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            {['blue', 'green', 'purple', 'custom'].map((color) => (
              <button
                key={color}
                onClick={() => updateConfig(['preset'], color as PresetColor)}
                style={{
                  backgroundColor: config.preset === color ? config.theme.primaryColor : '#fff',
                  color: config.preset === color ? '#fff' : '#333',
                  border: '1px solid #ddd',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </button>
            ))}
          </div>
          {config.preset === 'custom' && (
            <div style={{ marginTop: '10px' }}>
              <label>自定义颜色</label>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                  type="color"
                  value={config.customColor}
                  onChange={(e) => updateConfig(['customColor'], e.target.value)}
                />
                <input
                  type="text"
                  value={config.customColor}
                  onChange={(e) => updateConfig(['customColor'], e.target.value)}
                  style={{ padding: '4px 8px', width: '80px' }}
                />
              </div>
            </div>
          )}
        </div>

        {/* 添加窗口尺寸设置 */}
        <div className="config-section" style={styles.section}>
          <h3 style={{ fontSize: isMobile ? '16px' : '18px' }}>{t.settings.window}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <label>宽度 (px)</label>
              <input
                type="number"
                value={config.window.width}
                onChange={(e) => {
                  const newConfig = { ...config };
                  newConfig.window.width = Number(e.target.value);
                  // 更新配置
                }}
                style={{ padding: '4px 8px', width: '80px', marginLeft: '10px' }}
              />
            </div>
            <div>
              <label>高度 (px)</label>
              <input
                type="number"
                value={config.window.height}
                onChange={(e) => {
                  const newConfig = { ...config };
                  newConfig.window.height = Number(e.target.value);
                  // 更新配置
                }}
                style={{ padding: '4px 8px', width: '80px', marginLeft: '10px' }}
              />
            </div>
          </div>
        </div>

        {/* 添加边距设置 */}
        <div className="config-section" style={styles.section}>
          <h3 style={{ fontSize: isMobile ? '16px' : '18px' }}>{t.settings.margins}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div>
              <label>底部边距 (px)</label>
              <input
                type="number"
                value={config.margins.bottom}
                onChange={(e) => updateConfig(['margins', 'bottom'], Number(e.target.value))}
                style={{ padding: '4px 8px', width: '80px', marginLeft: '10px' }}
              />
            </div>
            <div>
              <label>{config.placement === 'bottom-right' ? '右侧' : '左侧'}边距 (px)</label>
              <input
                type="number"
                value={config.placement === 'bottom-right' ? config.margins.right : config.margins.left}
                onChange={(e) => updateConfig(['margins', config.placement === 'bottom-right' ? 'right' : 'left'], Number(e.target.value))}
                style={{ padding: '4px 8px', width: '80px', marginLeft: '10px' }}
              />
            </div>
          </div>
        </div>

        {/* 添加动画效果设置 */}
        <div className="config-section" style={styles.section}>
          <h3 style={{ fontSize: isMobile ? '16px' : '18px' }}>{t.settings.animation}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={config.animation.enabled}
                onChange={(e) => updateConfig(['animation', 'enabled'], e.target.checked)}
              />
              启用动画
            </label>
            
            {config.animation.enabled && (
              <>
                <div>
                  <label>动画时长 (ms)</label>
                  <input
                    type="number"
                    value={config.animation.duration}
                    onChange={(e) => updateConfig(['animation', 'duration'], Number(e.target.value))}
                    min={0}
                    max={1000}
                    step={50}
                    style={{ padding: '4px 8px', width: '80px', marginLeft: '10px' }}
                  />
                </div>
                <div>
                  <label>动画类型</label>
                  <select
                    value={config.animation.type}
                    onChange={(e) => updateConfig(['animation', 'type'], e.target.value)}
                    style={{ padding: '4px 8px', marginLeft: '10px' }}
                  >
                    <option value="ease">平滑</option>
                    <option value="linear">线性</option>
                    <option value="ease-in">渐入</option>
                    <option value="ease-out">渐出</option>
                    <option value="ease-in-out">渐入渐出</option>
                  </select>
                </div>
              </>
            )}
          </div>
        </div>

        {/* 添加更多自定义选项 */}
        <div className="config-section" style={styles.section}>
          <h3 style={{ fontSize: isMobile ? '16px' : '18px' }}>{t.settings.other}</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <input
                type="checkbox"
                checked={config.showSupport}
                onChange={(e) => updateConfig(['showSupport'], e.target.checked)}
              />
              显示支持信息
            </label>
            {/* 可以添加更多自定义选项 */}
          </div>
        </div>

        {/* 添加预设主题选择 */}
        <div className="config-section" style={styles.section}>
          <h3 style={{ fontSize: isMobile ? '16px' : '18px' }}>预设主题</h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {Object.entries(PRESET_THEMES).map(([name, theme]) => (
              <button
                key={name}
                onClick={() => updateConfig(['preset'], 'custom')}
                style={{
                  backgroundColor: theme.primaryColor,
                  color: theme.secondaryColor,
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* 添加使用步骤部分 */}
        <div className="config-section" style={styles.section}>
          <h3 style={{ fontSize: isMobile ? '16px' : '18px' }}>使用步骤</h3>
          <div style={{ 
            padding: '15px',
            background: '#f5f5f5',
            borderRadius: '4px',
            fontSize: '14px',
            lineHeight: '1.6'
          }}>
            <h4>1. 安装依赖</h4>
            <pre style={{ background: '#e0e0e0', padding: '10px', borderRadius: '4px' }}>
              npm install bytedesk-web
              
            </pre>
            <h4>或者</h4>
            <pre style={{ background: '#e0e0e0', padding: '10px', borderRadius: '4px' }}>
              yarn add bytedesk-web
            </pre>
            <h4>或者</h4>
            <pre style={{ background: '#e0e0e0', padding: '10px', borderRadius: '4px' }}>
              pnpm add bytedesk-web
            </pre>
          
            <h4>2. 导入组件</h4>
            <pre style={{ background: '#e0e0e0', padding: '10px', borderRadius: '4px' }}>
              import {'{ BytedeskReact }'} from 'bytedesk-web';
            </pre>

            <h4>3. 配置参数</h4>
            <pre style={{ background: '#e0e0e0', padding: '10px', borderRadius: '4px' }}>
{`const config = {
  theme: {
    primaryColor: '#2e88ff',
    secondaryColor: '#ffffff',
    textColor: '#333333',
    backgroundColor: '#ffffff'
  },
  window: {
    title: '在线客服',
    width: 380,
    height: 640
  },
  chatParams: {
    org: 'your_org_id',
    t: 2,
    sid: 'your_sid'
  }
};`}
            </pre>

            <h4>4. 使用组件</h4>
            <pre style={{ background: '#e0e0e0', padding: '10px', borderRadius: '4px' }}>
{`function YourComponent() {
  const handleInit = () => {
    console.log('BytedeskReact initialized');
  };

  return (
    <BytedeskReact 
      {...config}
      onInit={handleInit}
    />
  );
}`}
            </pre>

            <h4>5. 调用方法</h4>
            <pre style={{ background: '#e0e0e0', padding: '10px', borderRadius: '4px' }}>
{`// 打开聊天窗口
window.bytedesk?.showChat();

// 关闭聊天窗口
window.bytedesk?.hideChat();`}
            </pre>

            <div style={{ marginTop: '20px', padding: '10px', background: '#fff3cd', borderRadius: '4px' }}>
              <strong>注意：</strong>
              <ul style={{ marginTop: '10px', paddingLeft: '20px' }}>
                <li>确保替换配置中的 org_id 和 sid 为您的实际值</li>
                <li>组件会自动在全局注册 window.bytedesk 实例</li>
                <li>可以通过 onInit 回调获取初始化成功的通知</li>
              </ul>
            </div>
          </div>
        </div>

        <button 
          onClick={handleShowChat}
          style={{ 
            ...styles.button,
            backgroundColor: config.theme.primaryColor,
            color: config.theme.secondaryColor,
            border: 'none',
            borderRadius: '4px',
            width: '100%',
            marginBottom: isMobile ? '10px' : '20px'
          }}
        >
          打开聊天
        </button>

      </div>

      <BytedeskReact 
        {...config} 
        onInit={handleInit}
        text={{
          bubbleMessage: config.bubbleConfig.show ? {
            show: true,
            icon: config.bubbleConfig.icon,
            title: config.bubbleConfig.title,
            subtitle: config.bubbleConfig.subtitle
          } : {
            show: false,
            icon: '',
            title: '',
            subtitle: ''
          }
        }}
      />
    </div>
  );
}

export default App; 