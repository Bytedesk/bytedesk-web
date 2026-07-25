/* eslint-disable @typescript-eslint/no-explicit-any */
/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-02-03 12:42:44
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-08-14 13:37:01
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

// 日志级别定义
enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3
}

// 从 localStorage 读取日志级别（运行时可配置）
const readStoredLogLevel = (): LogLevel | null => {
  const level = localStorage.getItem(constants.LOG_LEVEL);
  switch (level) {
    case 'DEBUG':
      return LogLevel.DEBUG;
    case 'INFO':
      return LogLevel.INFO;
    case 'WARN':
      return LogLevel.WARN;
    case 'ERROR':
      return LogLevel.ERROR;
    default:
      return null;
  }
};

// 获取当前生效的日志级别（优先使用存储值，其次按环境默认）
const getEffectiveLogLevel = (): LogLevel => {
  const stored = readStoredLogLevel();
  if (stored !== null) return stored;
  return constants.IS_DEBUG ? LogLevel.DEBUG : LogLevel.INFO;
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

// 安全地将对象转换为字符串，避免循环引用错误
// const safeStringify = (obj: any): string => {
//   if (obj === null || obj === undefined) {
//     return String(obj);
//   }
  
//   if (typeof obj !== 'object') {
//     return String(obj);
//   }
  
//   try {
//     // 使用 JSON.stringify 的 replacer 参数来处理循环引用
//     const seen = new WeakSet();
//     return JSON.stringify(obj, (key, value) => {
//       if (typeof value === 'object' && value !== null) {
//         if (seen.has(value)) {
//           return '[Circular Reference]';
//         }
//         seen.add(value);
//       }
//       return value;
//     });
//   } catch (error) {
//     // 如果仍然失败，返回对象的构造函数名称
//     return `[${obj.constructor?.name || 'Object'}]`;
//   }
// };

// 浏览器友好的日志工具
const logger = {
  debug: (message: string, ...meta: any[]): void => {
    if (getEffectiveLogLevel() <= LogLevel.DEBUG) {
      const timestamp = formatTimestamp();
      if (meta.length) {
        console.log(`${timestamp} [DEBUG]: ${message}`, ...meta);
      } else {
        console.log(`${timestamp} [DEBUG]: ${message}`);
      }
    }
  },
  
  info: (message: string, ...meta: any[]): void => {
    if (getEffectiveLogLevel() <= LogLevel.INFO) {
      const timestamp = formatTimestamp();
      if (meta.length) {
        console.info(`${timestamp} [INFO]: ${message}`, ...meta);
      } else {
        console.info(`${timestamp} [INFO]: ${message}`);
      }
    }
  },
  
  warn: (message: string, ...meta: any[]): void => {
    if (getEffectiveLogLevel() <= LogLevel.WARN) {
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
    logger.debug(message, ...meta);
  },

  // 新增的日志方法
  log: (message: string, ...meta: any[]): void => {
    if (getEffectiveLogLevel() <= LogLevel.INFO) {
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
    if (getEffectiveLogLevel() <= LogLevel.INFO) {
      console.group(`[ByteDesk] ${label}`);
    }
  },

  groupEnd: (): void => {
    if (getEffectiveLogLevel() <= LogLevel.INFO) {
      console.groupEnd();
    }
  },

  // 表格日志
  table: (data: any): void => {
    if (getEffectiveLogLevel() <= LogLevel.INFO) {
      console.table(data);
    }
  },

  // 时间日志
  time: (label: string): void => {
    if (getEffectiveLogLevel() <= LogLevel.INFO) {
      console.time(`[ByteDesk] ${label}`);
    }
  },

  timeEnd: (label: string): void => {
    if (getEffectiveLogLevel() <= LogLevel.INFO) {
      console.timeEnd(`[ByteDesk] ${label}`);
    }
  }
};

export default logger;
