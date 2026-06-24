import type { BytedeskConfig } from '@bytedesk/web/types';

type CallbackSourceMap = Record<string, string>;

const escapeSingleQuotedString = (value: string): string => value
  .replace(/\\/g, '\\\\')
  .replace(/'/g, "\\'");

const stringifyForCode = (value: unknown): string => {
  return JSON.stringify(value, null, 2)
    .replace(/"([^"]+)":/g, '$1:')
    .replace(/"([^"\\]*(?:\\.[^"\\]*)*)"/g, (_match, group) => `'${escapeSingleQuotedString(group)}'`);
};

export const getCurrentEmbedCodeCopy = (locale: string) => {
  switch (locale) {
    case 'en':
      return {
        title: 'Current embed code',
        description: 'This snippet is generated from the current page state and can be used as a React embed example.'
      };
    case 'zh-tw':
      return {
        title: '目前嵌入程式碼',
        description: '這段程式碼會依照目前頁面狀態即時產生，可直接作為 React 嵌入範例。'
      };
    case 'ja':
    case 'ja-jp':
      return {
        title: '現在の埋め込みコード',
        description: 'このコードは現在のページ状態から生成され、そのまま React 埋め込み例として使えます。'
      };
    case 'ko':
    case 'ko-kr':
      return {
        title: '현재 임베드 코드',
        description: '이 코드는 현재 페이지 상태를 기준으로 생성되며 React 임베드 예제로 바로 사용할 수 있습니다.'
      };
    case 'vi-vn':
      return {
        title: 'Ma nhung hien tai',
        description: 'Doan ma nay duoc tao theo trang thai hien tai cua trang va co the dung truc tiep lam vi du nhung React.'
      };
    case 'ms-my':
      return {
        title: 'Kod benam semasa',
        description: 'Kod ini dijana berdasarkan keadaan semasa halaman dan boleh terus digunakan sebagai contoh benam React.'
      };
    case 'es-es':
      return {
        title: 'Codigo embebido actual',
        description: 'Este fragmento se genera a partir del estado actual de la pagina y puede usarse como ejemplo de integracion React.'
      };
    case 'fr-fr':
      return {
        title: 'Code embarque actuel',
        description: 'Cet extrait est genere a partir de l etat actuel de la page et peut servir directement d exemple d integration React.'
      };
    case 'th-th':
      return {
        title: 'โค้ดฝังปัจจุบัน',
        description: 'โค้ดชุดนี้สร้างจากสถานะปัจจุบันของหน้า และสามารถใช้เป็นตัวอย่างการฝัง React ได้ทันที'
      };
    case 'zh-cn':
    default:
      return {
        title: '当前嵌入代码',
        description: '这段代码会根据当前页面状态实时生成，可直接作为 React 嵌入示例。'
      };
  }
};

export const buildCurrentEmbedCodeExample = ({
  config,
  callbackSources = {},
}: {
  config: BytedeskConfig;
  callbackSources?: CallbackSourceMap;
}) => {
  const runtimeConfig = {
    ...(typeof config.isDebug === 'boolean' ? { isDebug: config.isDebug } : {}),
    ...(typeof config.forceRefresh === 'boolean' ? { forceRefresh: config.forceRefresh } : {}),
    ...(config.apiUrl ? { apiUrl: config.apiUrl } : {}),
    ...(config.htmlUrl ? { htmlUrl: config.htmlUrl } : {}),
    ...(config.chatPath ? { chatPath: config.chatPath } : {}),
    ...(config.threadPath ? { threadPath: config.threadPath } : {}),
    ...(config.webrtcPath ? { webrtcPath: config.webrtcPath } : {}),
    ...(config.callPath ? { callPath: config.callPath } : {}),
    ...(config.ticketPath ? { ticketPath: config.ticketPath } : {}),
    ...(config.placement ? { placement: config.placement } : {}),
    ...(typeof config.autoPopup === 'boolean' ? { autoPopup: config.autoPopup } : {}),
    ...(typeof config.draggable === 'boolean' ? { draggable: config.draggable } : {}),
    ...(typeof config.marginBottom === 'number' ? { marginBottom: config.marginBottom } : {}),
    ...(typeof config.marginSide === 'number' ? { marginSide: config.marginSide } : {}),
    ...(config.locale ? { locale: config.locale } : {}),
    ...(config.tabsConfig ? { tabsConfig: config.tabsConfig } : {}),
    ...(config.inviteConfig ? { inviteConfig: config.inviteConfig } : {}),
    ...(config.buttonConfig ? { buttonConfig: config.buttonConfig } : {}),
    ...(config.bubbleConfig ? { bubbleConfig: config.bubbleConfig } : {}),
    ...(config.chatConfig ? { chatConfig: config.chatConfig } : {}),
    ...(config.theme ? { theme: config.theme } : {}),
    ...(config.window ? { window: config.window } : {}),
    ...Object.fromEntries(Object.keys(callbackSources).map((key) => [key, `__CALLBACK__${key}__`])),
  };

  let serializedConfig = stringifyForCode(runtimeConfig);
  Object.entries(callbackSources).forEach(([key, source]) => {
    serializedConfig = serializedConfig.replace(`'__CALLBACK__${key}__'`, source);
  });

  return `import { BytedeskReact } from '@bytedesk/web/adapters/react';
import type { BytedeskConfig } from '@bytedesk/web/types';

const bytedeskConfig: BytedeskConfig = ${serializedConfig};

export default function VisitorWidget() {
  return <BytedeskReact {...bytedeskConfig} />;
}`;
};