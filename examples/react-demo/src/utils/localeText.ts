import type { Language } from '@bytedesk/web/types';

export type SupportedLocale = 'en' | 'zh-cn' | 'zh-tw';

export interface LocaleTextMap {
  en: string;
  'zh-cn': string;
  'zh-tw': string;
}

const isSupportedLocale = (locale: Language): locale is SupportedLocale => {
  return locale === 'en' || locale === 'zh-cn' || locale === 'zh-tw';
};

export const createTranslator = (locale: Language) => {
  return (texts: LocaleTextMap): string => {
    if (isSupportedLocale(locale)) {
      return texts[locale];
    }
    return texts['zh-cn'];
  };
};
