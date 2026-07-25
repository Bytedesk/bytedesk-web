import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { Empty, theme } from 'antd';
// @ts-ignore
import { BytedeskReact } from '@bytedesk/web/adapters/react';
import {
  buildBasicDemoPreviewStorageKey,
  type BasicDemoPreviewPayload,
} from '../utils/basic-demo-preview';

const getPreviewPayload = (previewId: string | null): BasicDemoPreviewPayload | null => {
  if (!previewId) {
    return null;
  }

  const storedPayload = window.sessionStorage.getItem(buildBasicDemoPreviewStorageKey(previewId));

  if (!storedPayload) {
    return null;
  }

  try {
    return JSON.parse(storedPayload) as BasicDemoPreviewPayload;
  } catch {
    return null;
  }
};

const BasicDemoPreview = () => {
  const location = useLocation();
  const { token } = theme.useToken();

  const previewPayload = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return getPreviewPayload(params.get('previewId'));
  }, [location.search]);

  const copy = useMemo(() => {
    if (previewPayload?.locale === 'en') {
      return {
        missingState: 'Preview data has expired. Return to BasicDemo and launch the preview again.',
        iframeTitle: 'Website iframe preview',
      };
    }

    return {
      missingState: '预览数据已失效，请返回 BasicDemo 重新发起预览。',
      iframeTitle: '网站 iframe 预览',
    };
  }, [previewPayload?.locale]);

  if (!previewPayload) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: token.colorBgLayout,
          padding: 24,
        }}
      >
          <Empty description={copy.missingState} />
      </div>
    );
  }

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        background: token.colorBgLayout,
        overflow: 'hidden',
      }}
    >
      <iframe
        title={copy.iframeTitle}
        src={previewPayload.targetUrl}
        style={{
          width: '100%',
          height: '100vh',
          border: '0',
          background: token.colorBgContainer,
        }}
      />
      {previewPayload.sdkConfig && (
        <BytedeskReact {...previewPayload.sdkConfig} />
      )}
    </div>
  );
};

export default BasicDemoPreview;