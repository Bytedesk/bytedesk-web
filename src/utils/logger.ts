/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-02-03 12:42:44
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-08-16 18:09:30
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM –
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license.
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE
 *  contact: 270580156@qq.com
 * 联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved.
 */
import * as constants from "./constants";
import type { BytedeskConfig } from "@/types";

// 日志级别定义
enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

// 全局配置存储
let globalConfig: BytedeskConfig | null = null;

// 设置全局配置
const setGlobalConfig = (config: BytedeskConfig): void => {
  globalConfig = config;
};

// 检查是否启用日志输出
const isLogEnabled = (): boolean => {
  const logEnable = localStorage.getItem(constants.LOG_ENABLE);
  // 如果没有设置过，默认根据globalConfig中的isDebug决定
  if (logEnable === null) {
    return globalConfig?.isDebug ?? false;
  }
  return logEnable === 'true';
};

// 获取当前应用的日志级别
const getCurrentLogLevel = (): LogLevel => {
  const isDebug = globalConfig?.isDebug ?? false;
  // 在生产环境中，即使isDebug为true，也限制debug日志输出
  if (isDebug && process.env.NODE_ENV === 'production') {
    return LogLevel.INFO;
  }
  return isDebug ? LogLevel.DEBUG : LogLevel.INFO;
};

// 当前配置的日志级别
const CURRENT_LOG_LEVEL = getCurrentLogLevel();

// 添加防抖机制，避免短时间内重复的debug日志
const debugLogCache = new Map<string, number>();
const DEBUG_LOG_THROTTLE = 1000; // 1秒内相同消息只输出一次

// 检查是否应该输出debug日志（防抖）
const shouldOutputDebug = (message: string): boolean => {
  const now = Date.now();
  const lastTime = debugLogCache.get(message);
  
  if (!lastTime || (now - lastTime) > DEBUG_LOG_THROTTLE) {
    debugLogCache.set(message, now);
    return true;
  }
  
  return false;
};

// 格式化时间戳
const formatTimestamp = (): string => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// 浏览器友好的日志工具
const logger = {
  debug: (message: string, ...meta: any[]): void => {
    if (isLogEnabled() && CURRENT_LOG_LEVEL <= LogLevel.DEBUG) {
      // 使用防抖机制，避免重复的debug日志
      if (!shouldOutputDebug(message)) {
        return;
      }
      
      const timestamp = formatTimestamp();
      if (meta.length) {
        console.debug(`${timestamp} [DEBUG]: ${message}`, ...meta);
      } else {
        console.debug(`${timestamp} [DEBUG]: ${message}`);
      }
    }
  },
  
  info: (message: string, ...meta: any[]): void => {
    if (isLogEnabled() && CURRENT_LOG_LEVEL <= LogLevel.INFO) {
      const timestamp = formatTimestamp();
      if (meta.length) {
        console.info(`${timestamp} [INFO]: ${message}`, ...meta);
      } else {
        console.info(`${timestamp} [INFO]: ${message}`);
      }
    }
  },
  
  warn: (message: string, ...meta: any[]): void => {
    if (isLogEnabled() && CURRENT_LOG_LEVEL <= LogLevel.WARN) {
      const timestamp = formatTimestamp();
      if (meta.length) {
        console.warn(`${timestamp} [WARN]: ${message}`, ...meta);
      } else {
        console.warn(`${timestamp} [WARN]: ${message}`);
      }
    }
  },
  
  error: (message: string, ...meta: any[]): void => {
    // 错误日志总是显示，不受开关控制
    const timestamp = formatTimestamp();
    if (meta.length) {
      console.error(`${timestamp} [ERROR]: ${message}`, ...meta);
    } else {
      console.error(`${timestamp} [ERROR]: ${message}`);
    }
  },
  
  // 输出日志的快捷方法
  debugIf: (message: string, ...meta: any[]): void => {
    if (isLogEnabled()) {
      logger.debug(message, ...meta);
    }
  },

  // 新增的日志方法
  log: (message: string, ...meta: any[]): void => {
    if (isLogEnabled()) {
      const timestamp = formatTimestamp();
      if (meta.length) {
        console.log(`${timestamp} [LOG]: ${message}`, ...meta);
      } else {
        console.log(`${timestamp} [LOG]: ${message}`);
      }
    }
  },

  // 分组日志
  group: (label: string): void => {
    if (isLogEnabled()) {
      console.group(`[ByteDesk] ${label}`);
    }
  },

  groupEnd: (): void => {
    if (isLogEnabled()) {
      console.groupEnd();
    }
  },

  // 表格日志
  table: (data: any): void => {
    if (isLogEnabled()) {
      console.table(data);
    }
  },

  // 时间日志
  time: (label: string): void => {
    if (isLogEnabled()) {
      console.time(`[ByteDesk] ${label}`);
    }
  },

  timeEnd: (label: string): void => {
    if (isLogEnabled()) {
      console.timeEnd(`[ByteDesk] ${label}`);
    }
  }
};

// 导出配置设置函数
export { setGlobalConfig };
export default logger;
