/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-04-05 15:34:40
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-07-04 16:04:42
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM –
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license.
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE
 *  contact: 270580156@qq.com
 * 联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved.
 */
//
declare namespace BROWSE {
  //
  type BrowseRequest = {
    uid?: string;
    // 
    referrer?: string; // 来源页面URL
    url?: string; // 浏览的URL
    title?: string; // 浏览的标题
    // 
    // 新增字段 - 参考Java代码
    ipAddress?: string; // 浏览的IP地址
    duration?: number; // 停留时长（单位：秒）
    pageLoadTime?: number; // 页面加载时间（单位：毫秒）
    userAgent?: string; // 用户代理(User-Agent)
    deviceType?: string; // 设备类型（desktop、mobile、tablet）
    operatingSystem?: string; // 操作系统类型及版本
    browser?: string; // 浏览器类型
    screenResolution?: string; // 屏幕分辨率（如"1920x1080"）
    geoLocation?: string; // 地理位置
    sessionId?: string; // 会话ID
    eventData?: string; // 事件信息（JSON格式）
    utmSource?: string; // UTM来源参数
    utmMedium?: string; // UTM媒介参数
    utmCampaign?: string; // UTM活动参数
    status?: string; // 状态，默认为ONLINE
    // 
    visitorUid?: string; // 访客的系统uid，非自动生成
    orgUid?: string;
  };
  //
  type HttpResult = {
    message?: string;
    code?: number;
    data?: BrowseResponse;
  };

  type BrowseResponse = {
    uid?: string; // 浏览的uid
    // 
    referrer?: string; // 来源页面URL
    url?: string; // 浏览的URL
    title?: string; // 浏览的标题
    // 
    // 新增字段 - 参考Java代码
    ipAddress?: string; // 浏览的IP地址
    duration?: number; // 停留时长（单位：秒）
    pageLoadTime?: number; // 页面加载时间（单位：毫秒）
    userAgent?: string; // 用户代理(User-Agent)
    deviceType?: string; // 设备类型（desktop、mobile、tablet）
    operatingSystem?: string; // 操作系统类型及版本
    browser?: string; // 浏览器类型
    screenResolution?: string; // 屏幕分辨率（如"1920x1080"）
    geoLocation?: string; // 地理位置
    sessionId?: string; // 会话ID
    eventData?: string; // 事件信息（JSON格式）
    utmSource?: string; // UTM来源参数
    utmMedium?: string; // UTM媒介参数
    utmCampaign?: string; // UTM活动参数
    status?: string; // 状态，默认为ONLINE
    // 
    createdAt?: string;
    updatedAt?: string;
    // 
    visitorUid?: string; // 访客的系统uid，非自动生成
    orgUid?: string;
  };

}
