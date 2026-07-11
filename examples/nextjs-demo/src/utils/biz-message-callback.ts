export const parseBizPayloadFromNavigateToPath = <T extends object = Record<string, unknown>>(
  navigateToPath?: string | null,
) => {
  if (!navigateToPath) {
    return null;
  }

  try {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://example.com';
    const url = new URL(navigateToPath, baseUrl);
    const payload = url.searchParams.get('payload');
    if (!payload) {
      return null;
    }

    const parsed = JSON.parse(payload);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      return parsed as T;
    }

    return null;
  } catch {
    return null;
  }
};