export type ChatProfileKey = 'agent' | 'workgroup' | 'robot';
type SupportedLocale = 'zh-cn' | 'zh-tw' | 'en' | 'ja-jp' | 'vi-vn' | 'ms-my';

export interface DemoChatConfig {
  org: string;
  t: '0' | '1' | '2';
  sid: string;
  title?: string;
  qrcode?: '0' | '1';
  threadDetail?: '0' | '1';
  visitorProfile?: '0' | '1';
}

export interface DemoChatProfile {
  key: ChatProfileKey;
  label: string;
  chatConfig: DemoChatConfig;
}

const CHAT_PROFILE_LABELS: Record<SupportedLocale, Record<ChatProfileKey, string>> = {
  'zh-cn': {
    agent: '一对一客服',
    workgroup: '工作组测试',
    robot: '机器人测试'
  },
  'zh-tw': {
    agent: '一對一客服',
    workgroup: '工作組測試',
    robot: '機器人測試'
  },
  en: {
    agent: '1:1 Agent',
    workgroup: 'Workgroup',
    robot: 'Bot'
  },
  'vi-vn': {
    agent: 'Nhan vien 1:1',
    workgroup: 'Nhom lam viec',
    robot: 'Bot'
  },
  'ms-my': {
    agent: 'Ejen 1:1',
    workgroup: 'Kumpulan kerja',
    robot: 'Bot'
  },
  'ja-jp': {
    agent: '1対1サポート',
    workgroup: 'ワークグループ',
    robot: 'ボット'
  }
};

const CONSULT_BUTTON_LABELS: Record<SupportedLocale, Record<ChatProfileKey, string>> = {
  'zh-cn': {
    agent: '咨询一对一客服',
    workgroup: '咨询工作组客服',
    robot: '咨询机器人客服'
  },
  'zh-tw': {
    agent: '諮詢一對一客服',
    workgroup: '諮詢工作組客服',
    robot: '諮詢機器人客服'
  },
  en: {
    agent: 'Contact 1:1 agent',
    workgroup: 'Contact workgroup',
    robot: 'Contact bot'
  },
  'vi-vn': {
    agent: 'Lien he nhan vien 1:1',
    workgroup: 'Lien he nhom lam viec',
    robot: 'Lien he bot'
  },
  'ms-my': {
    agent: 'Hubungi ejen 1:1',
    workgroup: 'Hubungi kumpulan kerja',
    robot: 'Hubungi bot'
  },
  'ja-jp': {
    agent: '1対1サポートに相談',
    workgroup: 'ワークグループに相談',
    robot: 'ボットに相談'
  }
};

const normalizeLocale = (locale?: string): SupportedLocale => {
  if (!locale) {
    return 'zh-cn';
  }
  const normalized = locale.toLowerCase();
  if (normalized === 'ja') {
    return 'ja-jp';
  }
  if (normalized === 'en' || normalized === 'zh-cn' || normalized === 'zh-tw' || normalized === 'ja-jp' || normalized === 'vi-vn' || normalized === 'ms-my') {
    return normalized;
  }
  return 'zh-cn';
};

export const CHAT_PROFILE_STORAGE_KEY = 'bytedesk-react-demo-chat-profile';

export const DEMO_CHAT_PROFILES: Record<ChatProfileKey, DemoChatProfile> = {
  agent: {
    key: 'agent',
    label: '一对一客服',
    chatConfig: {
      org: 'df_org_uid',
      t: '0',
      sid: 'df_ag_uid'
    }
  },
  workgroup: {
    key: 'workgroup',
    label: '工作组测试',
    chatConfig: {
      org: 'df_org_uid',
      t: '1',
      sid: 'df_wg_uid'
    }
  },
  robot: {
    key: 'robot',
    label: '机器人测试',
    chatConfig: {
      org: 'df_org_uid',
      t: '2',
      sid: 'df_rt_uid'
    }
  }
};

export const DEMO_CHAT_PROFILE_KEYS: ChatProfileKey[] = ['agent', 'workgroup', 'robot'];

export const formatChatConfigQuery = (chatConfig: DemoChatConfig): string => (
  `org=${chatConfig.org}&t=${chatConfig.t}&sid=${chatConfig.sid}`
);

export const getChatProfileLabel = (profile: DemoChatProfile, locale?: string): string => {
  const currentLocale = normalizeLocale(locale);
  return CHAT_PROFILE_LABELS[currentLocale][profile.key] || profile.label;
};

export const getConsultButtonLabel = (profile: DemoChatProfile, locale?: string): string => {
  const currentLocale = normalizeLocale(locale);
  return CONSULT_BUTTON_LABELS[currentLocale][profile.key] || '咨询客服';
};
