/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-04-05 15:34:40
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-07-12 09:28:47
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
declare namespace VISITOR {
  //
  type VisitorRequest = {
    orgUid?: string;
    type?: string;
    sid?: string;
    //
    uid?: string; // 自动生成访客uID
    visitorUid?: string; // 自定义访客uID
    nickname?: string;
    avatar?: string;
    mobile?: string;
    email?: string;
    note?: string;
    lang?: string;
    //
    browser?: string;
    os?: string;
    device?: string;
    // 
    referrer?: string;
    url?: string;
    title?: string;
    forceAgent?: boolean;
    // 
    goodsInfo?: string;
    orderInfo?: string;
    extra?: string;
    // 
    vipLevel?: string;
    debug?: boolean; // 用于区分本地测试还是线上环境
    loadHistory?: boolean; // 是否加载历史消息
  };
  //
  type HttpInitResult = {
    message?: string;
    code?: number;
    data?: VisitorResponse;
  };

  type HttpThreadResult = {
    message?: string;
    code?: number;
    data?: MESSAGE.MessageResponse;
  };

  type HttpUploadResult = {
    message: string;
    code: number;
    data: UPLOAD.UploadResponse;
  };
  //
  type VisitorProtobuf = {
    uid?: string; // 自动生成访客uID
    visitorUid?: string; // 自定义访客uID
    nickname?: string;
    avatar?: string;
    type?: string;
    extra?: string;
  };

  type VisitorDevice = {
    ip?: string;
    ipLocation?: string;
    //
    browser?: string;
    os?: string;
    device?: string;
    referrer?: string;
  };

  type VisitorResponse = {
    //
    uid?: string; // 自动生成访客uID
    visitorUid?: string; // 自定义访客uID
    nickname?: string;
    avatar?: string;
    // 
    device?: VisitorDevice;
    // 
    mobile?: string;
    email?: string;
    note?: string;
    // 
    client?: string;
    status?: string;
    // 
    tagList?: string[];
    extra?: string;
    orgUid?: string;
  };

}
