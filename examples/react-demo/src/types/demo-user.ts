export type DemoUserKey = 'user1' | 'user2' | 'user3';
export const DEMO_ANONYMOUS_KEY = 'anonymous' as const;
export const DEMO_ANONYMOUS_AVATAR_TEXT = '匿' as const;
export type DemoUserMenuKey = DemoUserKey | typeof DEMO_ANONYMOUS_KEY;

export interface DemoUserProfile {
  key: DemoUserKey;
  visitorUid: string;
  avatar: string;
  nickname: string;
}

export interface DemoUserPreset {
  visitorUid: string;
  avatar: string;
  vipLevel: number;
}

export const DEMO_USER_PRESETS: Record<DemoUserKey, DemoUserPreset> = {
  user1: {
    visitorUid: 'visitor_001',
    avatar: 'https://weiyuai.cn/assets/images/avatar/02.jpg',
    vipLevel: 0
  },
  user2: {
    visitorUid: 'visitor_002',
    avatar: 'https://weiyuai.cn/assets/images/avatar/01.jpg',
    vipLevel: 1
  },
  user3: {
    visitorUid: 'visitor_003',
    avatar: 'https://weiyuai.cn/assets/images/avatar/03.jpg',
    vipLevel: 2
  }
};
