import type { Language } from '@bytedesk/web/types';
import { en } from './en';
import { esEs } from './es-es';
import { frFr } from './fr-fr';
import { jaJp } from './ja-jp';
import { koKr } from './ko-kr';
import { msMy } from './ms-my';
import { viVn } from './vi-vn';
import { zhCn } from './zh-cn';
import { zhTw } from './zh-tw';

export type DemoLanguage = Language | 'es-es' | 'fr-fr' | 'ko-kr';

type WidenLiteral<T> =
  T extends string ? string :
  T extends number ? number :
  T extends boolean ? boolean :
  T extends readonly (infer U)[] ? WidenLiteral<U>[] :
  T extends object ? { [K in keyof T]: WidenLiteral<T[K]> } :
  T;

export type LocaleMessages = WidenLiteral<typeof zhCn>;

export const localeMessages: Record<DemoLanguage, LocaleMessages> = {
  'en': en,
  'es-es': esEs,
  'fr-fr': frFr,
  'zh-cn': zhCn,
  'zh-tw': zhTw,
  'ja': jaJp,
  'ja-jp': jaJp,
  'ko': koKr,
  'ko-kr': koKr,
  'vi-vn': viVn,
  'ms-my': msMy
} as const;

export const getLocaleMessages = (locale: DemoLanguage): LocaleMessages => {
  return localeMessages[locale] || zhCn;
};

export type LocaleSection<K extends keyof LocaleMessages> = LocaleMessages[K];
