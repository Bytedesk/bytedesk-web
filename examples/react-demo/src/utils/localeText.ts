import type { Language } from '@bytedesk/web/types';

export type SupportedLocale = 'en' | 'zh-cn' | 'zh-tw' | 'ja-jp' | 'vi-vn' | 'ms-my';

export interface LocaleTextMap {
  en: string;
  'zh-cn': string;
  'zh-tw': string;
  'ja-jp'?: string;
  'vi-vn': string;
  'ms-my': string;
}

const isSupportedLocale = (locale: Language): locale is SupportedLocale => {
  return locale === 'en' || locale === 'zh-cn' || locale === 'zh-tw' || locale === 'ja-jp' || locale === 'vi-vn' || locale === 'ms-my';
};

export const createTranslator = (locale: Language) => {
  return (texts: LocaleTextMap): string => {
    if (locale === 'ja') {
      return texts['ja-jp'] || texts.en || texts['zh-cn'];
    }
    if (isSupportedLocale(locale)) {
      return texts[locale] || texts['zh-cn'];
    }
    return texts['zh-cn'];
  };
};
