/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-07-03 16:53:03
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-06-12 15:41:35
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
// 
declare namespace MESSAGE {
  //
  type HttpRequest = {
    pageNumber: number;
    pageSize: number;
    //
    uid?: string;
    topic?: string; // 对应话题
    threadUid?: string; // 对应会话
    rateDownTagList?: string[]; // 点踩的情况下的反馈意见
    rateDownReason?: string; // 点踩的原因
    user?: string; // 用户json
    orgUid?: string;
    componentType?: string;
  };
  //
  type HttpPageResult = {
    message: string;
    code: number;
    data: {
      content: MessageResponse[];
      empty: boolean;
      first: boolean;
      last: boolean;
      number: number;
      numberOfElements: number;
      totalElements: number;
      totalPages: number;
    };
  };
  //
  type HttpResult = {
    message?: string;
    code?: number;
    data?: MessageResponse;
  };
  //
  type HttpPingResult = {
    message?: string;
    code?: number;
    data?: number;
  };
  //
  type HttpListResult = {
    message?: string;
    code?: number;
    data?: MessageResponse[];
  };
  // 
  type HttpUnreadMessageCountResult = {
    message?: string;
    code?: number;
    data?: number;
  }
  //
  type HttpMessageResult = {
    message: string;
    code: number;
    data: MessageResponse;
  };
  type MessageKeyword = {
    uid: string;
    content: string;
    sid: string;
    orgUid: string;
  };
  //
  type MessageResponse = {
    uid?: string;
    type: string;
    content?: string;
    status: string;
    createdAt?: string;
    client?: string;
    extra?: string;
    timestamp?: number;
    //
    topic?: string;
    thread?: THREAD.ThreadResponse;
    user?: USER.UserProtobuf;
  };

  type MessageProtobuf = {
    uid?: string;
    type: string;
    content?: string;
    status: string;
    createdAt?: string;
    client?: string;
    extra?: string;
    //
    thread?: THREAD.ThreadResponse;
    user?: USER.UserProtobuf;
  };

  //
  type MessageExtra = {
    orgUid?: string;
  }

  type MessageFaqRateExtra = {
    faqUid?: string;
    rate?: string;
    orgUid?: string;
  };

  type MessageQaExtra = {
    orgUid?: string;
  };

  type MessageQaRateExtra = {
    qaUid?: string;
    rate?: string;
    orgUid?: string;
  };

  type MessageLeaveMsgExtra = {
    uid: string;
    contact?: string;
    content?: string;
    images?: string[];
    reply?: string;
    replyImages?: string[];
    status?: string;
    orgUid?: string;
  };

  type MessageRateExtra = {
    // uid: string;
    score: number;
    resolved: boolean;
    content: string;
    orgUid: string;
  };

  type MessageFaqExtra = {
    faqUid: string;
    images: string[];
    attachments: string[];
    answerList: FAQ.FaqAnswer[];
    relatedFaqs: FAQ.FaqResponseSimple[];
  };

  type RobotMessage = {
    question?: string;
    answer?: string;
  };

  type AskMessage = {
    question: string;
    sid: string;
    uid: string;
  };

  type MessageStatus =
    | "SENDING"
    | "TIMEOUT"
    | "BLOCKED"
    | "NOTFRIEND"
    | "ERROR"
    | "SUCCESS"
    | "RECALL"
    | "DELIVERED"
    | "READ"
    | "DESTROYED"
    | "UNPRECESSED"
    | "PROCESSED"
    | "RATED";


    // 
  type TransferContent = {
    // 
    note: string;
    receiver: USER.UserProtobuf;
    sender: USER.UserProtobuf;
    thread: THREAD.ThreadProtobuf;
    // 
    type?: string;
    status?: string;
    messageUid: string;
    expireLength: number;
  }
  
  type InviteContent = {
    note: string;
    thread: THREAD.ThreadProtobuf;
    receiver: USER.UserProtobuf;
    sender: USER.UserProtobuf;
    status: string;
    messageUid: string;
    expireLength: number;
  }
}