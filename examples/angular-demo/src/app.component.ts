/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2025-01-01 15:48:32
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-01-01 16:06:36
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  联系：270580156@qq.com
 * Copyright (c) 2025 by bytedesk.com, All Rights Reserved. 
 */
import { Component } from '@angular/core';
import type { BytedeskConfig } from 'bytedesk-web';

@Component({
  selector: 'app-root',
  standalone: false,
  template: `
    <div style="padding: 20px">
      <h1>Bytedesk Angular Demo</h1>
      <p>This demo uses the published npm package</p>

      <div style="margin-top: 20px">
        <button 
          (click)="showChat()"
          style="padding: 10px 20px; background-color: #2e88ff; color: white; border: none; border-radius: 4px; cursor: pointer"
        >
          Open Chat
        </button>
      </div>

      <div style="margin-top: 20px">
        <button 
          (click)="hideChat()"
          style="padding: 10px 20px; background-color: #2e88ff; color: white; border: none; border-radius: 4px; cursor: pointer"
        >
          Close Chat
        </button>
      </div>

      <bytedesk-angular [config]="config"></bytedesk-angular>
      
      <app-install-guide></app-install-guide>
    </div>
  `
})
export class AppComponent {
  config: BytedeskConfig = {
    placement: 'bottom-right',
    marginBottom: 20,
    marginSide: 20,
    bubbleConfig: {
      show: true,
      icon: '👋',
      title: 'Need help?',
      subtitle: 'Click to chat'
    },
    chatConfig: {
      org: 'df_org_uid',
      t: "2",
      sid: 'df_rt_uid'
    }
  };

  showChat() {
    (window as any).bytedesk?.showChat();
  }

  hideChat() {
    (window as any).bytedesk?.hideChat();
  }
} 