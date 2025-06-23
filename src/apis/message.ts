/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-07-02 16:57:12
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-06-21 16:12:19
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 * 联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
 */
import { HTTP_CLIENT } from "../utils/constants";
import request from "./request";
// import { getApiUrl } from "@/utils/configUtils";
// import emitter from "@/utils/eventsEmitter";

// 长连接断开的情况下，发ping，获取未读消息数
export async function sendPingMessage(uid: string) {
  if (uid === null || uid === undefined || uid === '') {
    return
  }
  return request<MESSAGE.HttpPingResult>("/visitor/api/v1/ping", {
    method: "GET",
    params: {
      uid,
      client: HTTP_CLIENT,
    },
  });
}

// 拉取未读消息
export async function getMessageUnread(params: VISITOR.VisitorRequest) {
  return request<MESSAGE.HttpListResult>("/visitor/api/v1/message/unread", {
    method: "GET",
    params: {
      ...params,
      client: HTTP_CLIENT,
    },
  });
}

// 获取未读消息数
export async function getMessageUnreadCount(params: VISITOR.VisitorRequest) {
  return request<MESSAGE.HttpUnreadMessageCountResult>("/visitor/api/v1/message/unread/count", {
    method: "GET",
    params: {
      ...params,
      client: HTTP_CLIENT,
    },
  });
}

// 标记为已读，清空未读消息数
export async function clearMessageUnread(params: VISITOR.VisitorRequest) {
  return request<MESSAGE.HttpUnreadMessageCountResult>("/visitor/api/v1/message/unread/clear", {
    method: "POST",
    data: {
      ...params,
      client: HTTP_CLIENT,
    },
  });
}
