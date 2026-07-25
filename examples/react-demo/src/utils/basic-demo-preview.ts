import type { BytedeskConfig } from '@bytedesk/web/types';

export interface BasicDemoPreviewPayload {
  targetUrl: string;
  runtimeEmbedCode: string;
  vanillaJsEmbedCode: string;
  sdkConfig?: Partial<BytedeskConfig>;
  locale: string;
  createdAt: number;
}

const BASIC_DEMO_PREVIEW_STORAGE_PREFIX = 'bytedesk-react-demo-basic-preview:';

export const buildBasicDemoPreviewStorageKey = (previewId: string) => {
  return `${BASIC_DEMO_PREVIEW_STORAGE_PREFIX}${previewId}`;
};

export const isValidPreviewTargetUrl = (value: string) => {
  try {
    const parsedUrl = new URL(value);
    return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
  } catch {
    return false;
  }
};