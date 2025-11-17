import type { CSSProperties, PropsWithChildren } from 'react';
import { Space, type SpaceProps } from 'antd';

interface PageContainerProps {
  style?: CSSProperties;
  size?: SpaceProps['size'];
}

const PageContainer = ({ children, style, size = 'large' }: PropsWithChildren<PageContainerProps>) => (
  <Space
    direction="vertical"
    size={size}
    style={{
      width: '100%',
      padding: 24,
      boxSizing: 'border-box',
      ...style
    }}
  >
    {children}
  </Space>
);

export default PageContainer;
