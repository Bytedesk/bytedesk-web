
var constants = {
  
  // 文本消息类型
  MESSAGE_TYPE_TEXT: 'text',
  // 图片消息类型
  MESSAGE_TYPE_IMAGE: 'image',
  // 文件消息类型
  MESSAGE_TYPE_FILE: 'file',
  // 语音消息类型
  MESSAGE_TYPE_VOICE: 'voice',
  // 视频消息类型
  MESSAGE_TYPE_VIDEO: 'video',
  // 自定义消息类型
  MESSAGE_TYPE_CUSTOM: 'custom',
  // 红包
  MESSAGE_TYPE_RED_PACKET: 'red_packet',
  // 商品
  MESSAGE_TYPE_COMMODITY: 'commodity',
  // 短视频消息类型
  MESSAGE_TYPE_SHORT_VIDEO: 'shortvideo',
  // 位置消息类型
  MESSAGE_TYPE_LOCATION: 'location',
  // 链接消息类型
  MESSAGE_TYPE_LINK: 'link',
  // 事件消息类型
  MESSAGE_TYPE_EVENT: 'event',
  // 机器人, 自动回复
  MESSAGE_TYPE_ROBOT: 'robot',
  // 问卷
  MESSAGE_TYPE_QUESTIONNAIRE: 'questionnaire',
  // 分公司，方便提取分公司所包含的国家，金吉列大学长
  MESSAGE_TYPE_COMPANY: 'company',
  // 选择工作组
  MESSAGE_TYPE_WORK_GROUP: 'workGroup',
  // 通知消息类型
  MESSAGE_TYPE_NOTIFICATION: 'notification',
  // 非工作时间
  MESSAGE_TYPE_NOTIFICATION_NON_WORKING_TIME: 'notification_non_working_time',
  // 客服离线，当前无客服在线
  MESSAGE_TYPE_NOTIFICATION_OFFLINE: 'notification_offline',
  // 访客开始网页浏览
  MESSAGE_TYPE_NOTIFICATION_BROWSE_START: 'notification_browse_start',
  // 访客关闭网页
  MESSAGE_TYPE_NOTIFICATION_BROWSE_END: 'notification_browse_end',
  // 邀请访客
  MESSAGE_TYPE_NOTIFICATION_BROWSE_INVITE: 'notification_browse_invite',
  // 访客接受邀请
  MESSAGE_TYPE_NOTIFICATION_BROWSE_INVITE_ACCEPT: 'notification_browse_invite_accept',
  // 访客拒绝邀请
  MESSAGE_TYPE_NOTIFICATION_BROWSE_INVITE_REJECT: 'notification_browse_invite_reject',
  // 新会话thread
  MESSAGE_TYPE_NOTIFICATION_THREAD: 'notification_thread',
  // 重新进入会话
  MESSAGE_TYPE_NOTIFICATION_THREAD_REENTRY: 'notification_thread_reentry',
  // 排队通知类型
  MESSAGE_TYPE_NOTIFICATION_QUEUE: 'notification_queue',
  // 排队中离开
  MESSAGE_TYPE_NOTIFICATION_QUEUE_LEAVE: 'notification_queue_leave',
  // 接入队列访客
  MESSAGE_TYPE_NOTIFICATION_QUEUE_ACCEPT: 'notification_queue_accept',
  // 自动接入会话
  MESSAGE_TYPE_NOTIFICATION_ACCEPT_AUTO: 'notification_accept_auto',
  // 手动接入
  MESSAGE_TYPE_NOTIFICATION_ACCEPT_MANUAL: 'notification_accept_manual',
  // 上线
  MESSAGE_TYPE_NOTIFICATION_CONNECT: 'notification_connect',
  // 离线
  MESSAGE_TYPE_NOTIFICATION_DISCONNECT: 'notification_disconnect',
  // 离开会话页面
  MESSAGE_TYPE_NOTIFICATION_LEAVE: 'notification_leave',
  // 客服关闭会话
  MESSAGE_TYPE_NOTIFICATION_AGENT_CLOSE: 'notification_agent_close',
  // 访客关闭会话
  MESSAGE_TYPE_NOTIFICATION_VISITOR_CLOSE: 'notification_visitor_close',
  // 自动关闭会话
  MESSAGE_TYPE_NOTIFICATION_AUTO_CLOSE: 'notification_auto_close',
  // 邀请评价
  MESSAGE_TYPE_NOTIFICATION_INVITE_RATE: 'notification_invite_rate',
  // 评价结果
  MESSAGE_TYPE_NOTIFICATION_RATE_RESULT: 'notification_rate_result',
  // 邀请会话
  MESSAGE_TYPE_NOTIFICATION_INVITE: 'notification_invite',
  // 接受邀请
  MESSAGE_TYPE_NOTIFICATION_INVITE_ACCEPT: 'notification_invite_accept',
  // 拒绝邀请
  MESSAGE_TYPE_NOTIFICATION_INVITE_REJECT: 'notification_invite_reject',
  // 转接会话
  MESSAGE_TYPE_NOTIFICATION_TRANSFER: 'notification_transfer',
  // 接受转接
  MESSAGE_TYPE_NOTIFICATION_TRANSFER_ACCEPT: 'notification_transfer_accept',
  // 拒绝转接
  MESSAGE_TYPE_NOTIFICATION_TRANSFER_REJECT: 'notification_transfer_reject',
  // 满意度请求
  MESSAGE_TYPE_NOTIFICATION_RATE_REQUEST: 'notification_rate_request',
  // 评价
  MESSAGE_TYPE_NOTIFICATION_RATE: 'notification_rate',
  // 连接状态
  MESSAGE_TYPE_NOTIFICATION_CONNECTION_STATUS: 'notification_connection_status',
  // 接待状态
  MESSAGE_TYPE_NOTIFICATION_ACCEPT_STATUS: 'notification_accept_status',
  // 消息预知
  MESSAGE_TYPE_NOTIFICATION_PREVIEW: 'notification_preview',
  // 消息回执
  MESSAGE_TYPE_NOTIFICATION_RECEIPT: 'notification_receipt',
  // 踢掉其他客户端
  MESSAGE_TYPE_NOTIFICATION_KICKOFF: 'notification_kickoff',
  // 通知初始化localStream
  MESSAGE_TYPE_NOTIFICATION_WEBRTC_INVITE: 'notification_webrtc_invite',
  // webrtc取消邀请
  MESSAGE_TYPE_NOTIFICATION_WEBRTC_CANCEL: 'notification_webrtc_cancel',
  // webrtc邀请视频会话
  MESSAGE_TYPE_NOTIFICATION_WEBRTC_OFFER_VIDEO: 'notification_webrtc_offer_video',
  // webrtc邀请音频会话
  MESSAGE_TYPE_NOTIFICATION_WEBRTC_OFFER_AUDIO: 'notification_webrtc_offer_audio',
  // 接受webrtc邀请
  MESSAGE_TYPE_NOTIFICATION_WEBRTC_ANSWER: 'notification_webrtc_answer',
  // webrtccandidate信息
  MESSAGE_TYPE_NOTIFICATION_WEBRTC_CANDIDATE: 'notification_webrtc_candidate',
  // 接受webrtc邀请
  MESSAGE_TYPE_NOTIFICATION_WEBRTC_ACCEPT: 'notification_webrtc_accept',
  // 拒绝webrtc邀请
  MESSAGE_TYPE_NOTIFICATION_WEBRTC_REJECT: 'notification_webrtc_reject',
  // 被邀请方视频设备 + peeConnection已经就绪
  MESSAGE_TYPE_NOTIFICATION_WEBRTC_READY: 'notification_webrtc_ready',
  // webrtc忙线
  MESSAGE_TYPE_NOTIFICATION_WEBRTC_BUSY: 'notification_webrtc_busy',
  // 结束webrtc会话
  MESSAGE_TYPE_NOTIFICATION_WEBRTC_CLOSE: 'notification_webrtc_close',
  // 创建群组
  MESSAGE_TYPE_NOTIFICATION_GROUP_CREATE: 'notification_group_create',
  // 更新群名称、简介等
  MESSAGE_TYPE_NOTIFICATION_GROUP_UPDATE: 'notification_group_update',
  // 群公告
  MESSAGE_TYPE_NOTIFICATION_GROUP_ANNOUNCEMENT: 'notification_group_announcement',
  // 邀请多人加入群
  MESSAGE_TYPE_NOTIFICATION_GROUP_INVITE: 'notification_group_invite',
  // 受邀请：同意
  MESSAGE_TYPE_NOTIFICATION_GROUP_INVITE_ACCEPT: 'notification_group_invite_accept',
  // 受邀请：拒绝
  MESSAGE_TYPE_NOTIFICATION_GROUP_INVITE_REJECT: 'notification_group_invite_reject',
  // 不需要审核加入群组
  MESSAGE_TYPE_NOTIFICATION_GROUP_JOIN: 'notification_group_join',
  // 主动申请加入群组
  MESSAGE_TYPE_NOTIFICATION_GROUP_APPLY: 'notification_group_apply',
  // 同意：主动申请加群
  MESSAGE_TYPE_NOTIFICATION_GROUP_APPLY_APPROVE: 'notification_group_apply_approve',
  // 拒绝：主动申请加群
  MESSAGE_TYPE_NOTIFICATION_GROUP_APPLY_DENY: 'notification_group_apply_deny',
  // 踢人
  MESSAGE_TYPE_NOTIFICATION_GROUP_KICK: 'notification_group_kick',
  // 禁言
  MESSAGE_TYPE_NOTIFICATION_GROUP_MUTE: 'notification_group_mute',
  // 移交群组
  MESSAGE_TYPE_NOTIFICATION_GROUP_TRANSFER: 'notification_group_transfer',
  // 移交群组：同意、接受
  MESSAGE_TYPE_NOTIFICATION_GROUP_TRANSFER_ACCEPT: 'notification_group_transfer_accept',
  // 移交群组：拒绝
  MESSAGE_TYPE_NOTIFICATION_GROUP_TRANSFER_REJECT: 'notification_group_transfer_reject',
  // 退出群组
  MESSAGE_TYPE_NOTIFICATION_GROUP_WITHDRAW: 'notification_group_withdraw',
  // 解散群组
  MESSAGE_TYPE_NOTIFICATION_GROUP_DISMISS: 'notification_group_dismiss',
  //
  // 会话类型: 工作组会话、访客跟客服一对一、同事一对一、群组会话
  THREAD_TYPE_THREAD: 'thread',
  // 指定客服会话
  THREAD_TYPE_APPOINTED: 'appointed',
  // 同事会话
  THREAD_TYPE_CONTACT: 'contact',
  // 群组会话
  THREAD_TYPE_GROUP: 'group',
  // 消息会话类型：访客会话、同事一对一、群组会话
  MESSAGE_SESSION_TYPE_THREAD: 'thread',
  //
  MESSAGE_SESSION_TYPE_CONTACT: 'contact',
  //
  MESSAGE_SESSION_TYPE_GROUP: 'group',

  // 上传头像
  UPLOAD_AVATAR_URL: 'https://upload.bytedesk.com/visitor/api/upload/avatar',
  // 上传图片
  UPLOAD_IMAGE_URL: 'https://upload.bytedesk.com/visitor/api/upload/image',
  // 上传文件
  UPLOAD_FILE_URL: 'https://upload.bytedesk.com/visitor/api/upload/file',
  // 上传图片
  UPLOAD_LAYIM_IMAGE_URL: 'https://upload.bytedesk.com/visitor/api/upload/layim/image',
  // 上传文件
  UPLOAD_LAYIM_FILE_URL: 'https://upload.bytedesk.com/visitor/api/upload/layim/file',

};