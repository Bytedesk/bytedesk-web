const DEBUG_STORAGE_KEY = 'BIZ_MESSAGE_CALLBACK_DEBUG';
const DEBUG_QUERY_KEYS = ['bizMessageCallbackDebug', 'bizCallbackDebug'] as const;
const LOG_PREFIX = '[biz-callback]';

const isTruthy = (value?: string | null) => {
  if (!value) {
    return false;
  }

  const normalized = value.trim().toLowerCase();
  return normalized === '1' || normalized === 'true' || normalized === 'yes' || normalized === 'on';
};

const readQueryFlag = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const params = new URLSearchParams(window.location.search);
    for (const key of DEBUG_QUERY_KEYS) {
      const value = params.get(key);
      if (value !== null) {
        return value;
      }
    }
  } catch (_error) {
    return null;
  }

  return null;
};

export const isBizMessageCallbackDebugEnabled = () => {
  const queryValue = readQueryFlag();
  if (queryValue !== null) {
    return isTruthy(queryValue);
  }

  if (typeof window === 'undefined') {
    return false;
  }

  try {
    return isTruthy(window.localStorage?.getItem(DEBUG_STORAGE_KEY));
  } catch (_error) {
    return false;
  }
};

export const logBizMessageCallbackDebug = (stage: string, detail?: Record<string, unknown>) => {
  if (!isBizMessageCallbackDebugEnabled()) {
    return;
  }

  console.log(`${LOG_PREFIX} ${stage}`, detail || {});
};