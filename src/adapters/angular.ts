/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-31 16:10:03
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-01-22 14:55:52
 */
import { Component, Input } from '@angular/core';
import BytedeskWeb from '../main';
import type { BytedeskConfig } from '../types';

// 全局单例实例
let globalBytedeskInstance: BytedeskWeb | null = null;
let activeComponentCount = 0;

// 定义组件类型
type BytedeskAngularType = {
  config: BytedeskConfig;
  ngOnInit(): void;
  ngOnDestroy(): void;
};

// 导出组件
export const BytedeskAngular: any = Component({
  selector: 'bytedesk-angular',
  template: '',
  styles: [`
    :host {
      display: none;
    }
  `]
})(class implements BytedeskAngularType {
  @Input() config!: BytedeskConfig;

  ngOnInit(): void {
    activeComponentCount++;
    
    // 检查是否已经存在全局实例
    if (globalBytedeskInstance) {
      // console.log('BytedeskAngular: 使用现有全局实例，当前活跃组件数:', activeComponentCount);
      (window as any).bytedesk = globalBytedeskInstance;
      return;
    }

    // 创建新的全局实例
    // console.log('BytedeskAngular: 创建新的全局实例');
    globalBytedeskInstance = new BytedeskWeb(this.config);
    
    globalBytedeskInstance.init();
    (window as any).bytedesk = globalBytedeskInstance;
  }

  ngOnDestroy(): void {
    activeComponentCount--;
    console.log('BytedeskAngular: 组件卸载，当前活跃组件数:', activeComponentCount);
    
    // 如果没有活跃组件了，清理全局实例
    if (activeComponentCount <= 0) {
      console.log('BytedeskAngular: 没有活跃组件，清理全局实例');
              setTimeout(() => {
          if (globalBytedeskInstance && activeComponentCount <= 0) {
            globalBytedeskInstance.destroy();
            globalBytedeskInstance = null;
            delete (window as any).bytedesk;
            activeComponentCount = 0;
          }
        }, 100);
    }
  }
}); 