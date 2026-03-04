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

export const DEMO_USER_PRESETS: Record<DemoUserKey, Pick<DemoUserProfile, 'visitorUid' | 'avatar'>> = {
  user1: {
    visitorUid: 'visitor_001',
    avatar: 'https://weiyuai.cn/assets/images/avatar/02.jpg'
  },
  user2: {
    visitorUid: 'visitor_002',
    avatar: 'https://weiyuai.cn/assets/images/avatar/01.jpg'
  },
  user3: {
    visitorUid: 'visitor_003',
    avatar: 'https://weiyuai.cn/assets/images/avatar/03.jpg'
  }
};
