/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2025-09-15 17:00:00
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-09-15 17:20:08
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  联系：270580156@qq.com
 * Copyright (c) 2025 by bytedesk.com, All Rights Reserved. 
 */

declare namespace FEEDBACK {

  // 反馈请求参数
  interface FeedbackRequest {
    selectedText: string; // 选中的文本
    images?: string[]; // 上传图片URL列表
    content: string; // 用户反馈内容
    categoryNames?: string; // 反馈类型，多个类型用逗号分隔
    url: string; // 当前页面URL
    title: string; // 当前页面标题
    userAgent: string; // 用户代理信息
    visitorUid?: string; // 访客ID
    orgUid?: string; // 组织ID
  }

  // 反馈响应参数
  interface FeedbackResponse {
    code: number;
    message: string;
    data?: any;
  }
}