type UrlParamGuideItem = {
  key: string;
  value: string;
  purpose: string;
};

const parseUrlParamDocItem = (item: string) => {
  const matched = item.match(/^([^:：]+)\s*([:：])\s*(.+)$/);
  const rawKeys = matched?.[1] || item;

  return {
    separator: matched?.[2] || ':',
    rawKeys,
    paramKeys: rawKeys
      .split('/')
      .map((value) => value.trim())
      .filter(Boolean),
    purpose: matched?.[3]?.trim() || item,
  };
};

export const getEncodeHintText = (locale: string) => {
  switch (locale) {
    case 'en':
      return 'If you build the URL manually, encode this value with encodeURIComponent.';
    case 'zh-tw':
      return '若手動拼接 URL，請對該參數值使用 encodeURIComponent 編碼。';
    case 'ja':
    case 'ja-jp':
      return '手動で URL を組み立てる場合は、この値に encodeURIComponent を使用してください。';
    case 'ko':
    case 'ko-kr':
      return 'URL 을 수동으로 조합할 때는 이 값에 encodeURIComponent 를 사용하세요.';
    case 'vi-vn':
      return 'Khi tu ghep URL, hay dung encodeURIComponent cho gia tri nay.';
    case 'ms-my':
      return 'Apabila membina URL secara manual, gunakan encodeURIComponent untuk nilai ini.';
    case 'es-es':
      return 'Si construyes la URL manualmente, codifica este valor con encodeURIComponent.';
    case 'fr-fr':
      return 'Si vous construisez l\'URL manuellement, encodez cette valeur avec encodeURIComponent.';
    case 'th-th':
      return 'หากประกอบ URL เอง ให้เข้ารหัสค่านี้ด้วย encodeURIComponent';
    case 'zh-cn':
    default:
      return '若手动拼接 URL，请对该参数值使用 encodeURIComponent 编码。';
  }
};

export const buildUrlParamListWithEncodeHint = (
  items: string[],
  locale: string,
  encodeKeys: string[]
) => {
  const encodeKeySet = new Set(encodeKeys);
  const encodeHintText = getEncodeHintText(locale);

  return items.map((item) => {
    const parsed = parseUrlParamDocItem(item);
    if (!parsed.paramKeys.some((key) => encodeKeySet.has(key))) {
      return item;
    }

    return `${parsed.rawKeys}${parsed.separator} ${parsed.purpose} ${encodeHintText}`;
  });
};

export const buildUrlParamRowsWithEncodeHint = (
  items: string[],
  currentParams: URLSearchParams,
  locale: string,
  encodeKeys: string[]
) => {
  const encodeKeySet = new Set(encodeKeys);
  const encodeHintText = getEncodeHintText(locale);

  return items.flatMap<UrlParamGuideItem>((item) => {
    const parsed = parseUrlParamDocItem(item);
    const purpose = parsed.paramKeys.some((key) => encodeKeySet.has(key))
      ? `${parsed.purpose} ${encodeHintText}`
      : parsed.purpose;

    return parsed.paramKeys.map((key) => ({
      key,
      value: currentParams.get(key) || '-',
      purpose,
    }));
  });
};