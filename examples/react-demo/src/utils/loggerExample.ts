/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2025-08-06 10:00:00
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-08-06 10:00:00
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM –
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license.
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE
 *  contact: 270580156@qq.com
 * 联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved.
 */

/**
 * 日志工具使用示例
 * 
 * 这个文件展示了如何在项目中使用更新后的logger工具
 * 日志输出现在受用户设置中的"控制台日志"开关控制
 */

import logger from '@/utils/logger';

export class LoggerExample {
  
  static demonstrateUsage() {
    // 基本日志输出 - 受开关控制
    logger.log('这是一条普通日志');
    logger.info('这是一条信息日志');
    logger.warn('这是一条警告日志');
    logger.debug('这是一条调试日志');
    
    // 错误日志 - 总是显示，不受开关控制
    logger.error('这是一条错误日志，总是会显示');
    
    // 带参数的日志
    const user = { id: 1, name: 'John Doe' };
    logger.info('用户信息', user);
    
    // 分组日志
    logger.group('用户操作流程');
    logger.info('步骤1：验证用户身份');
    logger.info('步骤2：加载用户数据');
    logger.info('步骤3：显示用户界面');
    logger.groupEnd();
    
    // 表格日志
    const tableData = [
      { name: 'Alice', age: 25 },
      { name: 'Bob', age: 30 },
      { name: 'Charlie', age: 35 }
    ];
    logger.table(tableData);
    
    // 时间统计
    logger.time('数据处理时间');
    // 模拟一些处理时间
    setTimeout(() => {
      logger.timeEnd('数据处理时间');
    }, 100);
  }
  
  static demonstrateApiCall() {
    logger.group('API调用');
    logger.info('开始调用用户API');
    
    // 模拟API调用
    fetch('/api/users')
      .then(response => {
        logger.info('API调用成功', { status: response.status });
        return response.json();
      })
      .then(data => {
        logger.info('接收到数据', { count: data.length });
      })
      .catch(error => {
        logger.error('API调用失败', error);
      })
      .finally(() => {
        logger.info('API调用结束');
        logger.groupEnd();
      });
  }
  
  static demonstrateErrorHandling() {
    try {
      // 模拟一个可能出错的操作
      const data = JSON.parse('invalid json');
      logger.info('JSON解析成功', data);
    } catch (error) {
      // 错误日志总是会显示
      logger.error('JSON解析失败', error);
    }
  }
  
  static demonstrateConditionalLogging() {
    const isDevelopment = import.meta.env.DEV;
    
    // 使用debugIf进行条件日志
    logger.debugIf('开发环境特有的调试信息');
    
    // 手动条件判断
    if (isDevelopment) {
      logger.debug('这条信息只在开发环境显示');
    }
  }
}

// 使用示例
export const runLoggerExamples = () => {
  logger.debug('=== Logger功能演示 ===');
  logger.debug('请在设置页面中切换"控制台日志"开关来查看效果');
  
  LoggerExample.demonstrateUsage();
  LoggerExample.demonstrateApiCall();
  LoggerExample.demonstrateErrorHandling();
  LoggerExample.demonstrateConditionalLogging();
};

export default LoggerExample;
