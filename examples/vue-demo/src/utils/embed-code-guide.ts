/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2025-06-21 10:31:27
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-07-08 10:00:00
 * @Description: Vue embed code generator
 */
// @ts-ignore
import type { BytedeskConfig } from '@bytedesk/web/types';

const EMBED_CODE_LOCALE: Record<string, { title: string; import: string; template: string }> = {
  'zh-cn': {
    title: 'Vue 嵌入代码',
    import: "import { BytedeskVue } from '@bytedesk/web/adapters/vue';",
    template: '<BytedeskVue v-bind="config" />'
  },
  'zh-tw': {
    title: 'Vue 嵌入程式碼',
    import: "import { BytedeskVue } from '@bytedesk/web/adapters/vue';",
    template: '<BytedeskVue v-bind="config" />'
  },
  'ja-jp': {
    title: 'Vue 埋め込みコード',
    import: "import { BytedeskVue } from '@bytedesk/web/adapters/vue';",
    template: '<BytedeskVue v-bind="config" />'
  },
  en: {
    title: 'Vue Embed Code',
    import: "import { BytedeskVue } from '@bytedesk/web/adapters/vue';",
    template: '<BytedeskVue v-bind="config" />'
  }
};

const COPY_LOCALE: Record<string, string> = {
  'zh-cn': '已复制到剪贴板',
  'zh-tw': '已複製到剪貼板',
  'ja-jp': 'クリップボードにコピーしました',
  en: 'Copied to clipboard'
};

const DEFAULT_LOCALE = 'zh-cn';

export const getCurrentEmbedCodeCopy = (locale?: string): string => {
  return COPY_LOCALE[locale || DEFAULT_LOCALE] || COPY_LOCALE[DEFAULT_LOCALE];
};

function stringifyConfigValue(value: unknown, indent = '  '): string {
  if (value === undefined) {
    return 'undefined';
  }
  if (value === null) {
    return 'null';
  }
  if (typeof value === 'boolean') {
    return String(value);
  }
  if (typeof value === 'number') {
    return String(value);
  }
  if (typeof value === 'string') {
    return `'${value.replace(/'/g, "\\'")}'`;
  }
  if (typeof value === 'function') {
    return '() => {}';
  }
  if (Array.isArray(value)) {
    if (value.length === 0) {
      return '[]';
    }
    const items = value.map((item) => `${indent}  ${stringifyConfigValue(item, indent + '  ')}`);
    return `[\n${items.join(',\n')}\n${indent}]`;
  }
  if (typeof value === 'object') {
    const keys = Object.keys(value);
    if (keys.length === 0) {
      return '{}';
    }
    const entries = keys.map((key) => `${indent}  ${key}: ${stringifyConfigValue((value as Record<string, unknown>)[key], indent + '  ')}`);
    return `{\n${entries.join(',\n')}\n${indent}}`;
  }
  return String(value);
}

export const buildCurrentEmbedCodeExample = (config: BytedeskConfig, locale?: string): { title: string; code: string } => {
  const { title, import: importStmt, template } = EMBED_CODE_LOCALE[locale || DEFAULT_LOCALE] || EMBED_CODE_LOCALE[DEFAULT_LOCALE];

  const indent = '  ';
  const configLines = Object.entries(config).map(([key, value]) => {
    if (value === undefined) {
      return undefined;
    }
    return `${indent}${key}: ${stringifyConfigValue(value, '    ')}`;
  }).filter(Boolean);

  const code = [
    '<template>',
    `  ${template}`,
    '</template>',
    '',
    '<script setup lang="ts">',
    importStmt,
    `import type { BytedeskConfig } from '@bytedesk/web/types';`,
    '',
    `const config: BytedeskConfig = {`,
    configLines.join(',\n'),
    '};',
    '</' + 'script>',
  ].join('\n');

  return { title, code };
};
