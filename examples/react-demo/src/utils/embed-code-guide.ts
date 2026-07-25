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

export const getVanillaJsCurrentEmbedCodeCopy = (locale: string) => {
  switch (locale) {
    case 'en':
      return {
        title: 'Pure JavaScript embed code',
        description: 'This snippet can be copied directly into a static HTML page. It uses plain <script> tags without requiring React or any other framework.'
      };
    case 'zh-tw':
      return {
        title: '純 JavaScript 嵌入程式碼',
        description: '這段程式碼可以直接複製到靜態 HTML 頁面中。使用純 <script> 標籤，不需要 React 或其他框架。'
      };
    case 'ja':
    case 'ja-jp':
      return {
        title: '純粋な JavaScript 埋め込みコード',
        description: 'このコードは静的な HTML ページに直接コピーできます。React や他のフレームワークを必要とせず、プレーンな <script> タグを使用します。'
      };
    case 'ko':
    case 'ko-kr':
      return {
        title: '순수 JavaScript 임베드 코드',
        description: '이 코드는 정적 HTML 페이지에 직접 복사할 수 있습니다. React나 다른 프레임워크 없이 순수 <script> 태그를 사용합니다.'
      };
    case 'vi-vn':
      return {
        title: 'Ma nhung JavaScript thuan',
        description: 'Doan ma nay co the sao chep truc tiep vao trang HTML tinh. No su dung the <script> thuan ma khong can React hoac framework nao khac.'
      };
    case 'ms-my':
      return {
        title: 'Kod benam JavaScript tulen',
        description: 'Kod ini boleh disalin terus ke dalam halaman HTML statik. Ia menggunakan tag <script> tulen tanpa memerlukan React atau sebarang framework lain.'
      };
    case 'es-es':
      return {
        title: 'Codigo embebido JavaScript puro',
        description: 'Este codigo se puede copiar directamente en una pagina HTML estatica. Utiliza etiquetas <script> puras sin necesidad de React ni otros frameworks.'
      };
    case 'fr-fr':
      return {
        title: 'Code embarque JavaScript pur',
        description: "Ce code peut etre copie directement dans une page HTML statique. Il utilise des balises <script> pures sans necessiter React ou d'autres frameworks."
      };
    case 'th-th':
      return {
        title: 'โค้ดฝัง JavaScript ล้วน',
        description: 'โค้ดชุดนี้สามารถคัดลอกไปใช้ในหน้า HTML โดยตรง ใช้แท็ก <script> ล้วน ไม่ต้องใช้ React หรือเฟรมเวิร์กอื่น'
      };
    case 'zh-cn':
    default:
      return {
        title: '纯 JavaScript 嵌入代码',
        description: '这段代码可以直接复制到静态 HTML 页面中使用。使用纯 <script> 标签，无需 React 或其他框架。'
      };
  }
};

export const buildVanillaJsCurrentEmbedCodeExample = ({
  config,
}: {
  config: BytedeskConfig;
}) => {
  // Derive script CDN base from htmlUrl (e.g. https://www.weiyuai.cn/chat -> https://www.weiyuai.cn)
  let scriptBase = 'https://www.weiyuai.cn';
  if (config.htmlUrl) {
    try {
      const url = new URL(config.htmlUrl);
      scriptBase = url.origin;
    } catch {
      // keep default
    }
  }

  const vanillaConfig: Record<string, unknown> = {};
  if (typeof config.isDebug === 'boolean') vanillaConfig.isDebug = config.isDebug;
  if (typeof config.forceRefresh === 'boolean') vanillaConfig.forceRefresh = config.forceRefresh;
  if (config.apiUrl) vanillaConfig.apiUrl = config.apiUrl;
  if (config.htmlUrl) vanillaConfig.htmlUrl = config.htmlUrl;
  if (config.chatPath) vanillaConfig.chatPath = config.chatPath;
  if (config.threadPath) vanillaConfig.threadPath = config.threadPath;
  if (config.webrtcPath) vanillaConfig.webrtcPath = config.webrtcPath;
  if (config.callPath) vanillaConfig.callPath = config.callPath;
  if (config.ticketPath) vanillaConfig.ticketPath = config.ticketPath;
  if (config.placement) vanillaConfig.placement = config.placement;
  if (typeof config.autoPopup === 'boolean') vanillaConfig.autoPopup = config.autoPopup;
  if (typeof config.draggable === 'boolean') vanillaConfig.draggable = config.draggable;
  if (typeof config.marginBottom === 'number') vanillaConfig.marginBottom = config.marginBottom;
  if (typeof config.marginSide === 'number') vanillaConfig.marginSide = config.marginSide;
  if (config.locale) vanillaConfig.locale = config.locale;
  if (config.tabsConfig) vanillaConfig.tabsConfig = config.tabsConfig;
  if (config.inviteConfig) vanillaConfig.inviteConfig = config.inviteConfig;
  if (config.buttonConfig) vanillaConfig.buttonConfig = config.buttonConfig;
  if (config.bubbleConfig) vanillaConfig.bubbleConfig = config.bubbleConfig;
  if (config.chatConfig) vanillaConfig.chatConfig = config.chatConfig;
  if (config.theme) vanillaConfig.theme = config.theme;
  if (config.window) vanillaConfig.window = config.window;

  const serializedConfig = stringifyForCode(vanillaConfig);

  return `<!-- bytedesk.com -->
<script src="${scriptBase}/embed/bytedesk-web.js"></script>
<script>
  const config = ${serializedConfig};
  const bytedesk = new BytedeskWeb(config);
  bytedesk.init();
</script>`;
};