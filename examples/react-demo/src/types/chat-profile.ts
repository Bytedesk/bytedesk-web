export type ChatProfileKey = 'agent' | 'workgroup' | 'robot';

export interface DemoChatConfig {
  org: string;
  t: '0' | '1' | '2';
  sid: string;
}

export interface DemoChatProfile {
  key: ChatProfileKey;
  label: string;
  chatConfig: DemoChatConfig;
}

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

export const getConsultButtonLabel = (profile: DemoChatProfile): string => {
  switch (profile.key) {
    case 'agent':
      return '咨询一对一客服';
    case 'workgroup':
      return '咨询工作组客服';
    case 'robot':
      return '咨询机器人客服';
    default:
      return '咨询客服';
  }
};
