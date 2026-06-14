import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import path from 'node:path';
import vm from 'node:vm';
import ts from 'typescript';

const modulePath = path.resolve(process.cwd(), 'src/core/BytedeskWeb.ts');

const loadTsModule = async (filePath) => {
  const source = await fs.readFile(filePath, 'utf8');
  const transpiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
    },
    fileName: filePath,
  });

  const module = { exports: {} };
  const require = (specifier) => {
    if (specifier === '../utils/constants') {
      return {
        BYTEDESK_UID: 'bytedesk_uid',
        BYTEDESK_VISITOR_UID: 'bytedesk_visitor_uid',
        BYTEDESK_BROWSE_FAILED_TIMESTAMP: 'browse_failed',
        BYTEDESK_BROWSE_LAST_TIMESTAMP: 'browse_last',
        POST_MESSAGE_CLOSE_CHAT_WINDOW: 'close',
        POST_MESSAGE_INVITE_VISITOR: 'invite',
        POST_MESSAGE_INVITE_VISITOR_ACCEPT: 'invite_accept',
        POST_MESSAGE_INVITE_VISITOR_REJECT: 'invite_reject',
        POST_MESSAGE_LOCALSTORAGE_RESPONSE: 'localstorage_response',
        POST_MESSAGE_RESET_ANONYMOUS_VISITOR: 'reset_anonymous',
        POST_MESSAGE_MAXIMIZE_WINDOW: 'maximize',
        POST_MESSAGE_MINIMIZE_WINDOW: 'minimize',
        POST_MESSAGE_RECEIVE_MESSAGE: 'receive_message',
      };
    }

    if (specifier === '../utils/logger') {
      return {
        __esModule: true,
        default: {
          debug() {},
          info() {},
          error() {},
          warn() {},
        },
        setGlobalConfig() {},
      };
    }

    if (specifier === './browseUrl') {
      return {
        serializeBrowseConfig() {
          return undefined;
        },
      };
    }

    throw new Error(`Unexpected import: ${specifier}`);
  };

  const context = {
    module,
    exports: module.exports,
    require,
    console,
    setTimeout,
    clearTimeout,
  };

  vm.runInNewContext(transpiled.outputText, context, { filename: filePath });
  return module.exports;
};

const createInstance = async () => {
  const mod = await loadTsModule(modulePath);
  const BytedeskWeb = mod.default;
  const instance = Object.create(BytedeskWeb.prototype);
  instance.config = {
    locale: 'zh-cn',
    chatConfig: {
      org: 'df_org_uid',
      t: '1',
      sid: 'df_wg_uid',
      visitorUid: 'visitor_old',
      nickname: '旧昵称',
      avatar: 'https://example.com/old-avatar.png',
      extra: '{"source":"legacy"}',
    },
  };
  return instance;
};

test('mergeConfig replaces chatConfig snapshot when replaceChatConfig option is enabled', async () => {
  const instance = await createInstance();

  const merged = instance.mergeConfig(
    {
      chatConfig: {
        org: 'df_org_uid',
        t: '1',
        sid: 'df_wg_uid',
      },
    },
    { replaceChatConfig: true },
  );

  assert.deepEqual(merged.chatConfig, {
    org: 'df_org_uid',
    t: '1',
    sid: 'df_wg_uid',
  });
});

test('mergeConfig keeps incremental chatConfig merge by default', async () => {
  const instance = await createInstance();

  const merged = instance.mergeConfig({
    chatConfig: {
      org: 'df_org_uid',
      t: '1',
      sid: 'df_wg_uid',
    },
  });

  assert.equal(merged.chatConfig?.visitorUid, 'visitor_old');
  assert.equal(merged.chatConfig?.nickname, '旧昵称');
  assert.equal(merged.chatConfig?.avatar, 'https://example.com/old-avatar.png');
});