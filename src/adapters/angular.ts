/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-31 16:10:03
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-01-22 14:55:52
 */
import { Component, Input } from '@angular/core';
import BytedeskWeb from '../main';
import type { BytedeskConfig } from '../types';

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
  private bytedeskRef: BytedeskWeb | null = null;

  ngOnInit(): void {
    this.bytedeskRef = new BytedeskWeb(this.config);
    this.bytedeskRef.init();
    (window as any).bytedesk = this.bytedeskRef;
  }

  ngOnDestroy(): void {
    if (this.bytedeskRef) {
      this.bytedeskRef.destroy();
      delete (window as any).bytedesk;
      this.bytedeskRef = null;
    }
  }
}); 