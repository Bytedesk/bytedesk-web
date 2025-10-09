/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2025-09-15 17:30:00
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-09-15 17:30:00
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  联系：270580156@qq.com
 * Copyright (c) 2025 by bytedesk.com, All Rights Reserved. 
 */
import { getApiUrl } from './request';
import logger from '../utils/logger';

// 上传相关类型定义
export interface UploadResponse {
  uid?: string;
  fileName?: string;
  fileSize?: string;
  fileUrl?: string;
  fileType?: string;
  channel?: string;
  isLlm?: boolean;
  status?: string;
  categoryUid?: string;
  kbUid?: string;
  updatedAt?: string;
  user?: any; // USER.UserSimple
}

export interface HttpUploadResult {
  message: string;
  code: number;
  data: UploadResponse;
}

export interface UploadConfig {
  visitorUid?: string;
  visitorNickname?: string;
  visitorAvatar?: string;
  orgUid?: string;
  kbType?: string;
  isAvatar?: string;
  client?: string;
  isDebug?: boolean;
}

/**
 * 通用文件上传函数
 * @param file 要上传的文件
 * @param fileName 自定义文件名（可选）
 * @param fileType 文件类型（可选）
 * @param config 上传配置（可选）
 * @returns Promise<HttpUploadResult>
 */
export async function handleUpload(
  file: File, 
  fileName?: string, 
  fileType?: string,
  config?: UploadConfig
): Promise<HttpUploadResult> {
  try {
    // 生成默认文件名 - 使用时间戳格式化
    const timestamp = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14);
    const defaultFileName = fileName || `${timestamp}_${file.name}`;
    const defaultFileType = fileType || file.type || 'image/jpeg';
    
    // 构建FormData - 使用骆驼式命名
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', defaultFileName);
    formData.append('fileType', defaultFileType);
    formData.append('isAvatar', config?.isAvatar || 'false');
    formData.append('kbType', config?.kbType || 'feedback');
    
    // 添加访客信息 - 使用骆驼式命名
    const visitorUid = config?.visitorUid || 
      localStorage.getItem('bytedesk_uid') || 
      localStorage.getItem('bytedesk_visitor_uid') || '';
    const nickname = config?.visitorNickname || 
      localStorage.getItem('bytedesk_nickname') || '';
    const avatar = config?.visitorAvatar || 
      localStorage.getItem('bytedesk_avatar') || '';
    const orgUid = config?.orgUid || '';
    
    formData.append('visitorUid', visitorUid);
    formData.append('visitorNickname', nickname);
    formData.append('visitorAvatar', avatar);
    formData.append('orgUid', orgUid);
    formData.append('client', config?.client || 'web');

    if (config?.isDebug) {
      logger.debug('handleUpload formData', formData);
    }

    // 获取上传URL - 使用 getApiUrl
    const apiUrl = getApiUrl();
    const uploadUrl = `${apiUrl}/visitor/api/upload/file`;

    // 发送上传请求
    const response = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        // Authorization: "Bearer ", // + localStorage.getItem(ACCESS_TOKEN),
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`上传失败: ${response.status} ${response.statusText}`);
    }

    const result: HttpUploadResult = await response.json();
    
    if (config?.isDebug) {
      logger.debug('upload data:', result);
    }

    return result;
  } catch (error) {
    logger.error('文件上传失败:', error);
    throw error;
  }
}

/**
 * 上传截图文件的便捷方法
 * @param file 截图文件
 * @param config 上传配置
 * @returns Promise<string> 返回图片URL
 */
export async function uploadScreenshot(file: File, config?: UploadConfig): Promise<string> {
  const timestamp = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14);
  const fileName = `screenshot_${timestamp}.jpg`;
  
  const result = await handleUpload(file, fileName, 'image/jpeg', {
    ...config,
    kbType: 'feedback'
  });
  
  return result.data?.fileUrl || '';
}

/**
 * 批量上传文件
 * @param files 文件数组
 * @param config 上传配置
 * @returns Promise<string[]> 返回上传后的URL数组
 */
export async function uploadMultipleFiles(files: File[], config?: UploadConfig): Promise<string[]> {
  const uploadPromises = files.map(file => 
    handleUpload(file, undefined, undefined, config)
      .then(result => result.data?.fileUrl || '')
      .catch(error => {
        logger.error(`文件 ${file.name} 上传失败:`, error);
        return ''; // 失败时返回空字符串
      })
  );
  
  const results = await Promise.all(uploadPromises);
  return results.filter(url => url !== ''); // 过滤掉失败的上传
}