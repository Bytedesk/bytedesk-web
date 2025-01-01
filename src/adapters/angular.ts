/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-31 16:10:03
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-01-01 16:04:21
 */
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import BytedeskWeb from '../main';
import type { BytedeskConfig } from '../types';

@Component({
  selector: 'bytedesk-angular',
  template: '',
  styles: [`
    :host {
      display: block;
      position: fixed;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100%;
      z-index: 999;
    }
  `]
})
export class BytedeskAngular implements OnInit, OnDestroy {
  @Input() config!: BytedeskConfig;
  private instance: BytedeskWeb | null = null;

  ngOnInit() {
    this.instance = new BytedeskWeb(this.config);
    this.instance.init();
    (window as any).bytedesk = this.instance;
  }

  ngOnDestroy() {
    this.instance?.destroy();
    delete (window as any).bytedesk;
  }
} 