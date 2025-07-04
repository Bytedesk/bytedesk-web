/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2025-01-06 21:22:08
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-07-04 09:10:40
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  技术/商务联系：270580156@qq.com
 * Copyright (c) 2025 by bytedesk.com, All Rights Reserved. 
 */
import { HTTP_CLIENT } from "../utils/constants";
import request from "./request";

// 第一步：初始化访客信息
export async function initVisitor(params: VISITOR.VisitorRequest) {
  return request<VISITOR.HttpInitResult>("/visitor/api/v1/init", {
    method: "POST",
    data: {
      ...params,
      client: HTTP_CLIENT,
    },
  });
}


// 第二步：请求会话
export async function requestThread(params: VISITOR.VisitorRequest) {
  return request<VISITOR.HttpThreadResult>("/visitor/api/v1/thread", {
    method: "POST",
    data: {
      ...params,
      client: HTTP_CLIENT,
    },
  });
}

export async function browse(params: VISITOR.VisitorRequest) {
  return request<VISITOR.HttpThreadResult>("/visitor/api/v1/browse", {
    method: "POST",
    data: {
      ...params,
      client: HTTP_CLIENT,
    },
  });
}

