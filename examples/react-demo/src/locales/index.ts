import type { Language } from '@bytedesk/web/types';
import { en } from './en';
import { zhCn } from './zh-cn';
import { zhTw } from './zh-tw';

type WidenLiteral<T> =
  T extends string ? string :
  T extends number ? number :
  T extends boolean ? boolean :
  T extends readonly (infer U)[] ? WidenLiteral<U>[] :
  T extends object ? { [K in keyof T]: WidenLiteral<T[K]> } :
  T;

export type LocaleMessages = WidenLiteral<typeof zhCn>;

export const localeMessages: Record<Language, LocaleMessages> = {
  'en': en,
  'zh-cn': zhCn,
  'zh-tw': zhTw,
  'ja': zhCn,
  'ko': zhCn
} as const;

export const getLocaleMessages = (locale: Language): LocaleMessages => {
  return localeMessages[locale] || zhCn;
};

export type LocaleSection<K extends keyof LocaleMessages> = LocaleMessages[K];
