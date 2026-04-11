export const THEME_COLORS = ['#0066ff', '#f97316', '#10b981', '#8b5cf6'];
export const TEXT_COLORS = ['#ffffff', '#111111', '#1f2937', '#f8fafc'];
export const LANG_ZH_CN = 'zh-cn'; // 简体中文（中国）
export const LANG_ZH_TW = 'zh-tw'; // 繁体中文（中国台湾）
export const LANG_EN = 'en'; // 英语
export const LANG_JA_JP = 'ja-jp'; // 日语（日本）
export const LANG_KO_KR = 'ko-kr'; // 韩语（韩国）
export const LANG_VI_VN = 'vi-vn'; // 越南语（越南）
export const LANG_MS_MY = 'ms-my'; // 马来语（马来西亚）
export const LANG_ES_ES = 'es-es'; // 西班牙语（西班牙）
export const LANG_FR_FR = 'fr-fr'; // 法语（法国）
export const LANG_TH_TH = "th-th"; // 泰语（泰国）

export const LANGUAGE_OPTIONS = [
  { value: LANG_ZH_CN, label: '简体中文' },
  { value: LANG_ZH_TW, label: '繁體中文' },
  { value: LANG_EN, label: 'English' },
  { value: LANG_JA_JP, label: '日本語' },
  { value: LANG_KO_KR, label: '한국어' },
  { value: LANG_VI_VN, label: 'Tiếng Việt' },
  { value: LANG_MS_MY, label: 'Bahasa Melayu' },
  { value: LANG_ES_ES, label: 'Español' },
  { value: LANG_FR_FR, label: 'Français' },
  { value: LANG_TH_TH, label: 'ไทย' }
];

export type EntryAction = 'chat' | 'thread' | 'webrtc' | 'call' | 'qrcode';