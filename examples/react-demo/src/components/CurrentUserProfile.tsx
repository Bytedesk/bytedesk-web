import { Avatar, Space, Typography } from 'antd';
import type { ReactNode } from 'react';
import { DEMO_ANONYMOUS_AVATAR_TEXT } from '../types/demo-user';

const { Title, Paragraph } = Typography;

interface CurrentUserProfileProps {
  title: string;
  isAnonymousMode: boolean;
  avatar: string;
  anonymousIdText: string;
  anonymousNicknameText: string;
  userIdLabel: string;
  userId: string;
  userNicknameLabel: string;
  userNickname: string;
  compact?: boolean;
  extraContent?: ReactNode;
}

const CurrentUserProfile = ({
  title,
  isAnonymousMode,
  avatar,
  anonymousIdText,
  anonymousNicknameText,
  userIdLabel,
  userId,
  userNicknameLabel,
  userNickname,
  compact = false,
  extraContent
}: CurrentUserProfileProps) => (
  <div>
    <Title level={compact ? 5 : 4} style={{ marginBottom: compact ? 8 : 16 }}>{title}</Title>
    <Space size={compact ? 8 : 16}>
      <Avatar src={isAnonymousMode ? undefined : avatar} size={compact ? 48 : 64}>
        {isAnonymousMode ? DEMO_ANONYMOUS_AVATAR_TEXT : null}
      </Avatar>
      <div>
        <Paragraph style={{ marginBottom: 4 }}>
          {isAnonymousMode ? anonymousIdText : `${userIdLabel}: ${userId}`}
        </Paragraph>
        <Paragraph style={{ marginBottom: extraContent ? 4 : 0 }}>
          {isAnonymousMode ? anonymousNicknameText : `${userNicknameLabel}: ${userNickname}`}
        </Paragraph>
        {extraContent}
      </div>
    </Space>
  </div>
);

export default CurrentUserProfile;