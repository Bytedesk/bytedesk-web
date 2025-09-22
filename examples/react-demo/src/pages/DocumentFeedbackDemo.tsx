/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2025-09-15 18:00:00
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-09-15 16:35:34
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  联系：270580156@qq.com
 * Copyright (c) 2025 by bytedesk.com, All Rights Reserved. 
 */
import { useState } from 'react';
// @ts-ignore
import { BytedeskReact } from '@bytedesk/web/adapters/react';
// @ts-ignore
import type { BytedeskConfig, FeedbackData } from '@bytedesk/web/types';
import InstallGuide from '../components/InstallGuide';

const DocumentFeedbackDemo = () => {
  const [feedbackLogs, setFeedbackLogs] = useState<FeedbackData[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const [config] = useState<BytedeskConfig>({
    isDebug: true,
    ...(process.env.NODE_ENV === 'development' 
      ? { 
        htmlUrl: 'http://127.0.0.1:9006', 
        apiUrl: 'http://127.0.0.1:9003' 
      } 
      : {}),
    placement: 'bottom-right',
    marginBottom: 20,
    marginSide: 20,
    // 仅启用文档反馈功能，关闭其他功能以专注演示
    inviteConfig: {
      show: false,
    },
    tabsConfig: {
      home: false,
      messages: true,
      help: false,
      news: false
    },
    bubbleConfig: {
      show: false, // 关闭气泡，专注文档反馈
    },
    buttonConfig: {
      show: true,
      width: 60,
      height: 60,
    },
    // 文档反馈功能配置
    feedbackConfig: {
      enabled: true,
      trigger: 'selection',
      showOnSelection: true,
      selectionText: '文档反馈',
      dialogTitle: '文档反馈',
      placeholder: '请详细描述您的问题或优化建议',
      submitText: '提交反馈',
      cancelText: '取消',
      successMessage: '感谢您的反馈！我们会认真处理您的意见。',
      // 反馈类型配置
      categoryNames: [
        '错别字、拼写错误',
        '链接跳转有问题',
        '文档和实操过程不一致',
        '文档难以理解',
        '建议或其他'
      ],
      requiredTypes: false,
      typesSectionTitle: '问题类型',
      typesDescription: '（多选）',
      submitScreenshot: true,
      onSubmit: (feedbackData: FeedbackData) => {
        console.log('收到反馈数据:', feedbackData);
        // 添加到反馈日志
        setFeedbackLogs(prev => [feedbackData, ...prev]);
        
        // 模拟发送到服务器
        setTimeout(() => {
          console.log('反馈已发送到服务器');
        }, 1000);
      },
      onCancel: () => {
        console.log('用户取消了反馈');
      }
    },
    chatConfig: {
      org: 'df_org_uid',
      t: "2",
      sid: 'df_rt_uid'
    }
  });

  const handleInit = () => {
    console.log('BytedeskReact 文档反馈演示初始化回调被调用');
    
    // 延迟检查，确保异步初始化完成
    setTimeout(() => {
      const bytedesk = (window as any).bytedesk;
      if (bytedesk) {
        console.log('✅ BytedeskWeb 实例初始化成功');
        console.log('实例配置:', bytedesk.config);
        console.log('文档反馈配置:', bytedesk.config?.feedbackConfig);
        setIsInitialized(true);
      } else {
        console.error('❌ BytedeskWeb 实例未找到！');
        setIsInitialized(false);
        // 再次尝试检查
        setTimeout(() => {
          const retryBytedesk = (window as any).bytedesk;
          if (retryBytedesk) {
            console.log('✅ 延迟检查：BytedeskWeb 实例找到');
            setIsInitialized(true);
          } else {
            console.error('❌ 延迟检查：BytedeskWeb 实例仍未找到');
          }
        }, 1000);
      }
    }, 100);
  };

  const checkFunctionStatus = () => {
    const bytedesk = (window as any).bytedesk;
    
    // 详细调试信息
    console.log('=== 文档反馈功能状态检查 ===');
    console.log('BytedeskWeb 实例:', bytedesk);
    console.log('实例配置:', bytedesk?.config);
    console.log('反馈配置:', bytedesk?.config?.feedbackConfig);
    
    // 检查DOM元素
    const tooltip = document.querySelector('[data-bytedesk-feedback="tooltip"]');
    const dialog = document.querySelector('[data-bytedesk-feedback="dialog"]');
    console.log('反馈提示框元素:', tooltip);
    console.log('反馈对话框元素:', dialog);
    
    // 检查事件监听器
    const listeners = [];
    console.log('检查事件监听器...');
    
    const status = {
      bytedeskInstance: !!bytedesk,
      html2canvas: !!(window as any).html2canvas,
      feedbackFunction: !!(bytedesk && bytedesk.showDocumentFeedback),
      tooltipElement: !!tooltip,
      dialogElement: !!dialog,
      feedbackEnabled: bytedesk?.config?.feedbackConfig?.enabled,
    };
    
    alert(`功能状态检查：
    
✓ BytedeskWeb 实例: ${status.bytedeskInstance ? '已初始化' : '未初始化'}
✓ html2canvas 库: ${status.html2canvas ? '已加载' : '未加载'}
✓ 文档反馈功能: ${status.feedbackFunction ? '可用' : '不可用'}
✓ 反馈配置启用: ${status.feedbackEnabled ? '是' : '否'}
✓ 提示框元素: ${status.tooltipElement ? '已创建' : '未创建'}
✓ 对话框元素: ${status.dialogElement ? '已创建' : '未创建'}

${!status.bytedeskInstance ? '\n⚠️ 请确保 BytedeskWeb 已正确初始化' : ''}
${!status.feedbackEnabled ? '\n⚠️ 文档反馈功能未启用' : ''}
${!status.tooltipElement ? '\n⚠️ 反馈提示框元素未创建' : ''}
查看控制台获取详细调试信息`);
  };

  const triggerManualFeedback = () => {
    const bytedesk = (window as any).bytedesk;
    console.log('触发手动反馈，BytedeskWeb 实例:', bytedesk);
    
    if (bytedesk) {
      console.log('实例方法:', Object.getOwnPropertyNames(Object.getPrototypeOf(bytedesk)));
      console.log('showDocumentFeedback 方法:', bytedesk.showDocumentFeedback);
      
      if (bytedesk.showDocumentFeedback) {
        bytedesk.showDocumentFeedback('这是手动触发的文档反馈演示内容，用于测试功能是否正常工作。');
      } else {
        alert('showDocumentFeedback 方法不存在！');
      }
    } else {
      // 尝试等待实例初始化
      let retryCount = 0;
      const maxRetries = 5;
      
      const retryCheck = () => {
        retryCount++;
        const retryBytedesk = (window as any).bytedesk;
        
        if (retryBytedesk && retryBytedesk.showDocumentFeedback) {
          console.log(`✅ 重试第 ${retryCount} 次成功，找到 BytedeskWeb 实例`);
          retryBytedesk.showDocumentFeedback('这是手动触发的文档反馈演示内容，用于测试功能是否正常工作。');
        } else if (retryCount < maxRetries) {
          console.log(`⏳ 重试第 ${retryCount} 次，等待 BytedeskWeb 初始化...`);
          setTimeout(retryCheck, 500);
        } else {
          alert('❌ BytedeskWeb 实例初始化超时！请刷新页面重试。');
        }
      };
      
      retryCheck();
    }
  };

  // 强制初始化反馈功能
  const forceInitFeedback = () => {
    const bytedesk = (window as any).bytedesk;
    if (bytedesk) {
      console.log('=== 强制初始化反馈功能 ===');
      console.log('BytedeskWeb实例:', bytedesk);
      console.log('实例方法列表:', Object.getOwnPropertyNames(Object.getPrototypeOf(bytedesk)));
      
      // 获取调试信息
      if (typeof bytedesk.getDebugInfo === 'function') {
        const debugInfo = bytedesk.getDebugInfo();
        console.log('调试信息:', debugInfo);
      }
      
      // 调用强制初始化方法
      if (typeof bytedesk.forceInitFeedbackFeature === 'function') {
        console.log('调用 forceInitFeedbackFeature 方法');
        const result = bytedesk.forceInitFeedbackFeature();
        console.log('初始化结果:', result);
      } else {
        console.error('forceInitFeedbackFeature 方法不存在，尝试其他方法');
        
        // 手动设置配置并强制初始化
        if (!bytedesk.config.feedbackConfig) {
          bytedesk.config.feedbackConfig = {};
        }
        bytedesk.config.feedbackConfig.enabled = true;
        bytedesk.config.feedbackConfig.trigger = 'selection';
        bytedesk.config.feedbackConfig.showOnSelection = true;
        
        console.log('已更新配置:', bytedesk.config.feedbackConfig);
        
        // 如果有重新初始化方法，调用它
        if (bytedesk.reinitFeedbackFeature) {
          bytedesk.reinitFeedbackFeature();
        }
      }
      
      // 等待一下后再检查
      setTimeout(() => {
        console.log('检查初始化结果:');
        console.log('- showDocumentFeedback存在:', typeof bytedesk.showDocumentFeedback === 'function');
        console.log('- testTextSelection存在:', typeof bytedesk.testTextSelection === 'function');
        console.log('- 反馈提示框存在:', !!document.querySelector('[data-bytedesk-feedback="tooltip"]'));
        console.log('- 反馈对话框存在:', !!document.querySelector('[data-bytedesk-feedback="dialog"]'));
        console.log('- feedbackTooltip属性:', !!bytedesk.feedbackTooltip);
        console.log('- feedbackDialog属性:', !!bytedesk.feedbackDialog);
        
        if (typeof bytedesk.showDocumentFeedback === 'function') {
          alert('✅ 强制初始化成功！现在可以测试文档反馈功能了。');
        } else {
          alert('❌ 强制初始化失败，请检查控制台日志。');
        }
      }, 200);
    } else {
      console.error('BytedeskWeb 实例不存在！');
      alert('BytedeskWeb 实例不存在！');
    }
  };

  // 添加测试提示框显示的方法
  const testTooltipDisplay = () => {
    const bytedesk = (window as any).bytedesk;
    if (bytedesk) {
      console.log('=== 开始测试文本选择功能 ===');
      
      // 使用内置的测试方法
      if (bytedesk.testTextSelection) {
        console.log('使用内置测试方法');
        bytedesk.testTextSelection('这是测试选中的文字内容');
      } else {
        console.log('内置测试方法不存在，使用备用方案');
        
        // 设置选中文本
        bytedesk.selectedText = '测试选中文字';
        
        // 直接调用显示提示框的方法
        const tooltip = document.querySelector('[data-bytedesk-feedback="tooltip"]');
        if (tooltip) {
          console.log('找到提示框元素，强制显示');
          (tooltip as HTMLElement).style.display = 'block';
          (tooltip as HTMLElement).style.opacity = '1';
          (tooltip as HTMLElement).style.left = '100px';
          (tooltip as HTMLElement).style.top = '100px';
          (tooltip as HTMLElement).style.position = 'fixed';
          (tooltip as HTMLElement).style.zIndex = '999999';
        } else {
          console.log('未找到提示框元素，尝试手动创建');
          const testTooltip = document.createElement('div');
          testTooltip.style.cssText = `
            position: fixed;
            left: 100px;
            top: 100px;
            background: #2e88ff;
            color: white;
            padding: 8px 16px;
            border-radius: 6px;
            font-size: 14px;
            cursor: pointer;
            z-index: 999999;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          `;
          testTooltip.textContent = '📝 测试反馈提示';
          document.body.appendChild(testTooltip);
          
          setTimeout(() => {
            if (document.body.contains(testTooltip)) {
              document.body.removeChild(testTooltip);
            }
          }, 3000);
        }
      }
    } else {
      console.error('BytedeskWeb 实例不存在！');
    }
  };

  const clearFeedbackLogs = () => {
    setFeedbackLogs([]);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* 页面标题 */}
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ 
          color: '#333', 
          borderBottom: '3px solid #2e88ff', 
          paddingBottom: '15px',
          display: 'inline-block'
        }}>
          📝 BytedeskWeb 文档反馈功能演示
        </h1>
        <p style={{ fontSize: '16px', color: '#666', marginTop: '15px' }}>
          体验创新的文档反馈功能，让用户能够精准地针对页面内容提供反馈意见
        </p>
      </div>

      {/* 代码演示使用步骤 & 文档链接（参考 LocalDemo） */}
      <div style={{ 
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '12px',
        marginBottom: '20px',
        border: '1px solid #e9ecef',
        boxShadow: '0 2px 10px rgba(0,0,0,0.04)'
      }}>
        <h3 style={{ color: '#333', marginBottom: '12px' }}>📚 代码演示使用步骤：DocumentFeedbackDemo</h3>
        <ol style={{ margin: 0, paddingLeft: '20px', lineHeight: 1.8, color: '#333' }}>
          <li>
            安装 SDK 并引入组件：在页面中引入 <code>BytedeskReact</code>，并准备 <code>BytedeskConfig</code> 配置。
          </li>
          <li>
            启用文档反馈：在 <code>feedbackConfig</code> 中设置 <code>enabled: true</code>、<code>trigger: 'selection'</code>、<code>showOnSelection: true</code>。
          </li>
          <li>
            渲染组件：将 <code>{'<BytedeskReact {...config} />'}</code> 放在页面中。
          </li>
          <li>
            体验功能：用鼠标选中下方任意文本，页面会在光标附近显示“📝 文档反馈”提示按钮，点击后填写并提交。
          </li>
          <li>
            工具按钮：可使用上方“强制初始化/手动触发/测试文本选择/检查功能状态”按钮来辅助验证与调试。
          </li>
        </ol>
        <div style={{ marginTop: '12px' }}>
          <a href="https://www.weiyuai.cn/docs/zh-CN/docs/channel/react" target="_blank" rel="noopener noreferrer" style={{ color: '#2e88ff', textDecoration: 'none', marginRight: 16 }}>
            查看 React 集成文档
          </a>
          <a href="https://www.weiyuai.cn/docs/zh-CN/docs/channel/vue" target="_blank" rel="noopener noreferrer" style={{ color: '#2e88ff', textDecoration: 'none', marginRight: 16 }}>
            查看 Vue 集成文档
          </a>
          <a href="https://github.com/Bytedesk/bytedesk-web/blob/master/examples/react-demo/src/pages/DocumentFeedbackDemo.tsx" target="_blank" rel="noopener noreferrer" style={{ color: '#2e88ff', textDecoration: 'none' }}>
            本示例源码（DocumentFeedbackDemo.tsx）
          </a>
        </div>
      </div>

      {/* 功能介绍 */}
      <div style={{ 
        backgroundColor: '#e7f3ff', 
        padding: '20px', 
        borderRadius: '12px', 
        marginBottom: '30px',
        border: '1px solid #b3d8ff'
      }}>
        <h3 style={{ color: '#0066cc', marginBottom: '15px', fontSize: '18px' }}>
          🎯 如何使用文档反馈功能
        </h3>
        <ol style={{ 
          lineHeight: '1.8', 
          color: '#0066cc', 
          paddingLeft: '20px',
          margin: '0'
        }}>
          <li><strong>选中文字：</strong>用鼠标选中下面文档内容中的任意文字</li>
          <li><strong>触发反馈：</strong>会自动在鼠标附近显示"📝 文档反馈"提示按钮</li>
          <li><strong>填写反馈：</strong>点击按钮打开反馈对话框，查看选中内容和页面截图</li>
          <li><strong>提交反馈：</strong>输入您的意见建议，点击提交即可</li>
        </ol>
      </div>

      {/* 控制按钮区域 */}
      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '20px', 
        borderRadius: '8px', 
        marginBottom: '30px',
        textAlign: 'center'
      }}>
        <h4 style={{ marginBottom: '15px', color: '#333' }}>🔧 功能控制面板</h4>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={forceInitFeedback}
            style={{
              padding: '12px 24px',
              backgroundColor: '#ff6b35',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            🔧 强制初始化反馈功能
          </button>
          <button
            onClick={triggerManualFeedback}
            style={{
              padding: '12px 24px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            📝 手动触发反馈
          </button>
          <button
            onClick={testTooltipDisplay}
            style={{
              padding: '12px 24px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            🧪 测试文本选择功能
          </button>
          <button
            onClick={checkFunctionStatus}
            style={{
              padding: '12px 24px',
              backgroundColor: '#17a2b8',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            🔍 检查功能状态
          </button>
          <button
            onClick={clearFeedbackLogs}
            style={{
              padding: '12px 24px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            🗑️ 清空反馈记录
          </button>
          <button
            onClick={() => {
              const bytedesk = (window as any).bytedesk;
              if (bytedesk) {
                console.log('=== 当前状态检查 ===');
                console.log('selectedText:', bytedesk.selectedText);
                console.log('lastSelectionText:', bytedesk.lastSelectionText);
                console.log('isTooltipVisible:', bytedesk.isTooltipVisible);
                console.log('feedbackTooltip存在:', !!bytedesk.feedbackTooltip);
                console.log('feedbackTooltip在DOM中:', bytedesk.feedbackTooltip && document.body.contains(bytedesk.feedbackTooltip));
                console.log('feedbackTooltip样式:', bytedesk.feedbackTooltip ? {
                  display: bytedesk.feedbackTooltip.style.display,
                  opacity: bytedesk.feedbackTooltip.style.opacity,
                  visibility: bytedesk.feedbackTooltip.style.visibility
                } : 'null');
                
                const selection = window.getSelection();
                console.log('当前选择:', selection?.toString());
                
                alert(`状态检查结果：
                
selectedText: "${bytedesk.selectedText || ''}"
lastSelectionText: "${bytedesk.lastSelectionText || ''}"
isTooltipVisible: ${bytedesk.isTooltipVisible}
feedbackTooltip存在: ${!!bytedesk.feedbackTooltip}
feedbackTooltip在DOM中: ${bytedesk.feedbackTooltip && document.body.contains(bytedesk.feedbackTooltip)}
当前选择: "${selection?.toString() || ''}"

查看控制台获取详细样式信息`);
              } else {
                alert('BytedeskWeb 实例不存在！');
              }
            }}
            style={{
              padding: '12px 24px',
              backgroundColor: '#e83e8c',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '500'
            }}
          >
            🔍 检查当前状态
          </button>
        </div>
        <p style={{ 
          fontSize: '12px', 
          color: '#666', 
          marginTop: '10px',
          marginBottom: '0'
        }}>
          初始化状态: {isInitialized ? '✅ 已初始化' : '⏳ 初始化中...'}
        </p>
      </div>

      {/* 文档内容演示区域 */}
      <div style={{ display: 'flex', gap: '30px' }}>
        {/* 左侧：文档内容 */}
        <div style={{ flex: '2' }}>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '30px', 
            borderRadius: '12px', 
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            border: '1px solid #e9ecef'
          }}>
            <h2 style={{ color: '#333', marginBottom: '20px' }}>
              📖 BytedeskWeb 产品文档
            </h2>
            
            <h3 style={{ color: '#2e88ff', marginBottom: '15px' }}>
              🚀 核心功能介绍
            </h3>
            <p style={{ lineHeight: '1.8', color: '#333', marginBottom: '16px' }}>
              <span style={{ backgroundColor: '#fff3cd', padding: '2px 6px', borderRadius: '3px' }}>
                BytedeskWeb 是一个功能强大的客服插件
              </span>，它不仅支持传统的在线聊天功能，还创新性地加入了文档反馈功能。
              当用户在阅读文档时发现问题或有改进建议，可以直接选中相关文字进行反馈，
              <span style={{ backgroundColor: '#d1ecf1', padding: '2px 6px', borderRadius: '3px' }}>
                极大提升了用户体验和反馈质量
              </span>。
            </p>

            <h3 style={{ color: '#2e88ff', marginBottom: '15px' }}>
              ✨ 文档反馈功能特点
            </h3>
            <div style={{ 
              backgroundColor: '#f8f9fa', 
              padding: '20px', 
              borderRadius: '8px', 
              marginBottom: '20px',
              borderLeft: '4px solid #2e88ff'
            }}>
              <ul style={{ lineHeight: '1.8', margin: '0', paddingLeft: '20px' }}>
                <li>
                  <strong>智能文本检测：</strong>
                  <span style={{ backgroundColor: '#e2e3e5', padding: '2px 6px', borderRadius: '3px' }}>
                    自动监听页面文本选择事件，无需额外配置
                  </span>
                </li>
                <li>
                  <strong>实时截图生成：</strong>基于 html2canvas 技术自动截取页面状态，为反馈提供视觉上下文
                </li>
                <li>
                  <strong>精准定位：</strong>记录用户选中的具体文字内容，让开发者快速定位问题位置
                </li>
                <li>
                  <strong>友好界面：</strong>
                  <span style={{ backgroundColor: '#d4edda', padding: '2px 6px', borderRadius: '3px' }}>
                    简洁美观的反馈对话框设计，提升用户交互体验
                  </span>
                </li>
                <li>
                  <strong>灵活配置：</strong>支持多种触发方式、自定义样式和行为回调
                </li>
              </ul>
            </div>

            <h3 style={{ color: '#2e88ff', marginBottom: '15px' }}>
              🎨 使用场景
            </h3>
            <p style={{ lineHeight: '1.8', color: '#333', marginBottom: '16px' }}>
              该功能特别适用于<span style={{ backgroundColor: '#ffeaa7', padding: '2px 6px', borderRadius: '3px' }}>
              文档网站、帮助中心、产品介绍页面、在线教程</span>等需要收集用户反馈的场景。
              用户可以直接针对特定内容提出问题或建议，
              <span style={{ backgroundColor: '#fab1a0', padding: '2px 6px', borderRadius: '3px' }}>
                开发者能够更快速地定位和解决用户反馈的问题
              </span>。
            </p>

            <h3 style={{ color: '#2e88ff', marginBottom: '15px' }}>
              ⚙️ 技术实现
            </h3>
            <p style={{ lineHeight: '1.8', color: '#333', marginBottom: '16px' }}>
              文档反馈功能采用了多项先进技术：使用现代浏览器的 Selection API 进行文本选择检测，
              集成 html2canvas 库实现页面截图，采用模块化设计确保代码结构清晰，
              <span style={{ backgroundColor: '#a29bfe', padding: '2px 6px', borderRadius: '3px', color: 'white' }}>
                支持动态导入以减少初始包大小
              </span>。完善的类型定义和错误处理机制确保了功能的稳定性和可维护性。
            </p>

            <div style={{ 
              backgroundColor: '#fff3cd', 
              padding: '15px', 
              borderRadius: '6px', 
              border: '1px solid #ffeaa7',
              marginTop: '20px'
            }}>
              <p style={{ margin: '0', fontSize: '14px', color: '#856404' }}>
                <strong>💡 提示：</strong>
                尝试选中上面任意一段文字，体验文档反馈功能的便利性！
                系统会自动检测您的文本选择并显示反馈按钮。
              </p>
            </div>
          </div>
        </div>

        {/* 右侧：反馈记录 */}
        <div style={{ flex: '1' }}>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '20px', 
            borderRadius: '12px', 
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            border: '1px solid #e9ecef',
            height: 'fit-content'
          }}>
            <h3 style={{ color: '#333', marginBottom: '15px', fontSize: '16px' }}>
              📋 反馈记录 ({feedbackLogs.length})
            </h3>
            
            {feedbackLogs.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                color: '#999', 
                padding: '30px 20px',
                backgroundColor: '#f8f9fa',
                borderRadius: '6px'
              }}>
                <p style={{ margin: '0', fontSize: '14px' }}>
                  暂无反馈记录<br />
                  尝试选中文字或手动触发反馈
                </p>
              </div>
            ) : (
              <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
                {feedbackLogs.map((log, index) => (
                  <div key={index} style={{ 
                    marginBottom: '15px', 
                    padding: '12px', 
                    backgroundColor: '#f8f9fa', 
                    borderRadius: '6px',
                    border: '1px solid #e9ecef'
                  }}>
                    <div style={{ fontSize: '12px', color: '#666', marginBottom: '6px' }}>
                      {new Date(log.timestamp).toLocaleString('zh-CN')}
                    </div>
                    <div style={{ fontSize: '13px', color: '#333', marginBottom: '6px' }}>
                      <strong>选中文字：</strong>
                      <span style={{ 
                        backgroundColor: '#e7f3ff', 
                        padding: '2px 4px', 
                        borderRadius: '3px',
                        fontSize: '12px'
                      }}>
                        {log.selectedText.length > 30 
                          ? log.selectedText.substring(0, 30) + '...'
                          : log.selectedText
                        }
                      </span>
                    </div>
                    {log.categoryNames && log.categoryNames.length > 0 && (
                      <div style={{ fontSize: '13px', color: '#333', marginBottom: '6px' }}>
                        <strong>问题类型：</strong>
                        <div style={{ marginTop: '4px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                          {log.categoryNames.map((categoryName: string, idx: number) => {
                            return (
                              <span key={idx} style={{
                                backgroundColor: '#fff3cd',
                                color: '#856404',
                                padding: '2px 6px',
                                borderRadius: '3px',
                                fontSize: '11px',
                                border: '1px solid #ffeaa7'
                              }}>
                                {categoryName}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    <div style={{ fontSize: '13px', color: '#333' }}>
                      <strong>反馈内容：</strong>
                      <div style={{ 
                        marginTop: '4px',
                        fontSize: '12px',
                        color: '#666',
                        fontStyle: 'italic'
                      }}>
                        {log.feedback.length > 50 
                          ? log.feedback.substring(0, 50) + '...'
                          : log.feedback
                        }
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* BytedeskReact 组件 */}
      <BytedeskReact
        {...config}
        onInit={handleInit}
      />

      {/* 安装指引（与 LocalDemo 一致） */}
      <div style={{ marginTop: '20px' }}>
        <InstallGuide />
      </div>
    </div>
  );
};

export default DocumentFeedbackDemo;