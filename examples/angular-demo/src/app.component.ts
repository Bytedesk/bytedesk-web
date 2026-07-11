/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2025-01-01 15:48:32
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-07-08 10:00:00
 * @Description: Bytedesk Angular Demo - replicates react-demo patterns
 */
import { Component } from '@angular/core';
import type { BytedeskConfig } from 'bytedesk-web';

type ChatType = 'agent' | 'workgroup' | 'robot';

interface ChatTypeOption {
  key: ChatType;
  t: string;
  sid: string;
  label: string;
}

@Component({
  selector: 'app-root',
  standalone: false,
  template: `
    <div class="container">
      <h1>微语 Angular Demo</h1>
      <p class="desc">Bytedesk Angular integration with full control panel</p>

      <!-- Chat Type Selector -->
      <div class="card">
        <h3>选择客服类型</h3>
        <div class="btn-group">
          <button
            *ngFor="let opt of chatTypeOptions"
            class="chip"
            [class.active]="chatType === opt.key"
            (click)="selectChatType(opt.key)"
          >
            {{ opt.label }}
          </button>
        </div>
      </div>

      <!-- Theme Color -->
      <div class="card">
        <h3>主题色</h3>
        <div class="btn-group">
          <button
            *ngFor="let color of themeColors"
            class="color-btn"
            [class.selected]="themeColor === color"
            [style.background-color]="color"
            (click)="selectThemeColor(color)"
          ></button>
        </div>
      </div>

      <!-- Controls -->
      <div class="card">
        <h3>控制面板</h3>
        <div class="btn-group">
          <button class="btn primary" (click)="showChat()">打开聊天</button>
          <button class="btn danger" (click)="hideChat()">关闭聊天</button>
          <button class="btn primary" (click)="showButton()">显示按钮</button>
          <button class="btn" (click)="hideButton()">隐藏按钮</button>
          <button class="btn" (click)="toggleBubble()">
            {{ showBubble ? '隐藏' : '显示' }}气泡
          </button>
        </div>
      </div>

      <!-- Config Summary -->
      <div class="card">
        <h3>当前配置</h3>
        <pre><code>{{ configSummary }}</code></pre>
      </div>

      <bytedesk-angular [config]="config"></bytedesk-angular>
      <app-install-guide></app-install-guide>
    </div>
  `,
  styles: [`
    .container { max-width: 800px; margin: 0 auto; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
    h1 { font-size: 24px; margin-bottom: 4px; }
    .desc { color: #666; margin-bottom: 24px; }
    .card { background: #fff; border-radius: 8px; padding: 24px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
    h3 { margin: 0 0 12px; font-size: 16px; }
    .btn-group { display: flex; gap: 8px; flex-wrap: wrap; }
    .chip { padding: 8px 20px; border: 1px solid #d9d9d9; border-radius: 6px; background: #fff; cursor: pointer; font-size: 13px; font-weight: 500; }
    .chip.active { border-color: #1677ff; background: #e6f4ff; color: #1677ff; }
    .color-btn { width: 32px; height: 32px; border-radius: 50%; border: 2px solid #d9d9d9; cursor: pointer; }
    .color-btn.selected { border-color: #333; border-width: 3px; }
    .btn { padding: 8px 16px; border: 1px solid #d9d9d9; border-radius: 6px; background: #fff; cursor: pointer; font-size: 13px; }
    .btn.primary { background: #1677ff; color: #fff; border-color: #1677ff; }
    .btn.danger { background: #ff4d4f; color: #fff; border-color: #ff4d4f; }
    pre { background: #f6f8fa; padding: 12px; border-radius: 6px; font-size: 12px; overflow-x: auto; margin: 0; }
    code { font-family: monospace; }
  `]
})
export class AppComponent {
  chatType: ChatType = 'robot';
  themeColor = '#1677ff';
  showBubble = true;
  showButtonBtn = true;

  chatTypeOptions: ChatTypeOption[] = [
    { key: 'agent', t: '0', sid: 'df_rt_uid', label: '一对一客服' },
    { key: 'workgroup', t: '1', sid: 'df_wg_uid', label: '工作组' },
    { key: 'robot', t: '2', sid: 'df_rt_uid', label: '机器人' },
  ];

  themeColors = ['#1677ff', '#ff4d4f', '#52c41a', '#faad14', '#722ed1'];

  get currentChatConfig(): ChatTypeOption {
    return this.chatTypeOptions.find(o => o.key === this.chatType) || this.chatTypeOptions[2];
  }

  get config(): BytedeskConfig {
    const cfg = this.currentChatConfig;
    return {
      isDebug: true,
      placement: 'bottom-right',
      marginBottom: 20,
      marginSide: 20,
      autoPopup: false,
      draggable: true,
      inviteConfig: { show: false },
      bubbleConfig: {
        show: this.showBubble,
        icon: '👋',
        title: '需要帮助吗？',
        subtitle: '点击开始对话'
      },
      buttonConfig: { show: this.showButtonBtn, width: 60, height: 60 },
      theme: {
        mode: 'light',
        backgroundColor: this.themeColor,
        textColor: '#ffffff'
      },
      chatConfig: {
        org: 'df_org_uid',
        t: cfg.t,
        sid: cfg.sid,
      },
      locale: 'zh-cn',
    };
  }

  get configSummary(): string {
    return JSON.stringify({ chatConfig: this.config.chatConfig, theme: this.config.theme }, null, 2);
  }

  selectChatType(type: ChatType) { this.chatType = type; }
  selectThemeColor(color: string) { this.themeColor = color; }
  showChat() { (window as any).bytedesk?.showChat(); }
  hideChat() { (window as any).bytedesk?.hideChat(); }
  showButton() { (window as any).bytedesk?.showButton(); }
  hideButton() { (window as any).bytedesk?.hideButton(); }
  toggleBubble() { this.showBubble = !this.showBubble; }
} 