import type { BrowseConfig } from '../types';

const toNonEmptyString = (value: unknown): string | undefined => {
  if (typeof value !== 'string') {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed ? trimmed : undefined;
};

export const normalizeBrowseConfig = (browseConfig?: BrowseConfig): Record<string, string> => {
  if (!browseConfig) {
    return {};
  }

  const normalized: Record<string, string> = {};
  const referer = toNonEmptyString(browseConfig.referer) || toNonEmptyString(browseConfig.referrer);
  const title = toNonEmptyString(browseConfig.title);
  const url = toNonEmptyString(browseConfig.url);

  if (referer) {
    normalized.referer = referer;
  }
  if (title) {
    normalized.title = title;
  }
  if (url) {
    normalized.url = url;
  }

  return normalized;
};

export const serializeBrowseConfig = (browseConfig?: BrowseConfig): string | undefined => {
  const normalized = normalizeBrowseConfig(browseConfig);
  return Object.keys(normalized).length > 0 ? JSON.stringify(normalized) : undefined;
};