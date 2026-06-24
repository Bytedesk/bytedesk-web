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
        POST_MESSAGE_MESSAGE_BUBBLE_CLICK: 'message_bubble_click',
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

    if (specifier === '../utils/bizMessageCallbackDebug') {
      return {
        logBizMessageCallbackDebug() {},
      };
    }

    if (specifier === './browseUrl') {
      return {
        serializeBrowseConfig() {
          return undefined;
        },
      };
    }

    if (specifier === '../locales') {
      return {
        getLocaleMessages(locale) {
          const normalizedLocale = (locale || 'zh-cn').toLowerCase();
          const messages = {
            'zh-cn': { actions: { continueChat: '继续对话' } },
            'zh-tw': { actions: { continueChat: '繼續對話' } },
            en: { actions: { continueChat: 'Continue chat' } },
            ja: { actions: { continueChat: '会話を続ける' } },
            'ja-jp': { actions: { continueChat: '会話を続ける' } },
          };

          return messages[normalizedLocale]
            || messages[normalizedLocale.split('-')[0]]
            || messages['zh-cn'];
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
    window: global.window,
    document: global.document,
    requestAnimationFrame: global.requestAnimationFrame,
    HTMLElement: global.HTMLElement,
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

test('minimizeWindow hides default floating ui and restores the same window from minimized bar', async () => {
  global.window = {
    innerWidth: 1024,
    clearTimeout,
    addEventListener() {},
    removeEventListener() {},
  };
  global.HTMLElement = class HTMLElement {};

  const minimizedBarClicks = [];
  const appendedNodes = [];

  global.document = {
    body: {
      appendChild(node) {
        appendedNodes.push(node);
      },
      contains(node) {
        return appendedNodes.includes(node);
      },
    },
    createElement(tag) {
      return {
        tag,
        type: '',
        textContent: '',
        children: [],
        style: { cssText: '' },
        attributes: {},
        removed: false,
        setAttribute(name, value) {
          this.attributes[name] = value;
        },
        appendChild(child) {
          this.children.push(child);
        },
        addEventListener(eventName, handler) {
          if (eventName === 'click') {
            minimizedBarClicks.push(handler);
          }
        },
        remove() {
          this.removed = true;
          const index = appendedNodes.indexOf(this);
          if (index >= 0) {
            appendedNodes.splice(index, 1);
          }
        },
      };
    },
  };

  const instance = await createInstance();

  instance.windowState = 'normal';
  instance.isVisible = true;
  instance.config = {
    ...instance.config,
    placement: 'bottom-right',
    marginSide: 20,
    marginBottom: 20,
    animation: {
      duration: 0,
      type: 'ease',
    },
    theme: {
      backgroundColor: '#0066FF',
      textColor: '#ffffff',
    },
    bubbleConfig: {
      show: true,
    },
  };

  const windowElement = { style: { display: 'block' }, querySelector: () => null };
  const messageElement = new global.HTMLElement();
  messageElement.style = { display: 'block' };
  const bubbleContainer = { style: { display: 'block' } };

  instance.window = windowElement;
  instance.bubbleContainer = bubbleContainer;
  instance.bubble = { style: { display: 'block' }, messageElement };
  instance.buttonElements = [{}];
  instance.inviteDialog = null;
  instance.hideInviteDialog = () => {};
  instance.hideButtonPreview = () => {};
  instance.config.onHideChat = () => {};
  instance.config.onShowChat = () => {};

  instance.minimizeWindow();

  assert.equal(instance.windowState, 'minimized');
  assert.equal(windowElement.style.display, 'none');
  assert.equal(bubbleContainer.style.display, 'none');
  assert.equal(messageElement.style.display, 'block');
  assert.equal(appendedNodes.length, 1);
  assert.equal(appendedNodes[0].children[0].textContent, '💬');
  assert.equal(appendedNodes[0].children[1].textContent, '继续对话');

  minimizedBarClicks[0]();

  assert.equal(instance.windowState, 'normal');
  assert.equal(windowElement.style.display, 'block');
  assert.equal(appendedNodes.length, 0);

  delete global.window;
  delete global.document;
  delete global.HTMLElement;
});

test('minimized bar prefers custom configured text over locale default', async () => {
  global.window = {
    innerWidth: 1024,
    clearTimeout,
    addEventListener() {},
    removeEventListener() {},
  };
  global.HTMLElement = class HTMLElement {};

  const appendedNodes = [];

  global.document = {
    body: {
      appendChild(node) {
        appendedNodes.push(node);
      },
      contains(node) {
        return appendedNodes.includes(node);
      },
    },
    createElement() {
      return {
        type: '',
        textContent: '',
        children: [],
        style: { cssText: '' },
        attributes: {},
        setAttribute(name, value) {
          this.attributes[name] = value;
        },
        appendChild(child) {
          this.children.push(child);
        },
        addEventListener() {},
        remove() {},
      };
    },
  };

  const instance = await createInstance();
  instance.config = {
    ...instance.config,
    placement: 'bottom-right',
    marginSide: 20,
    theme: {
      backgroundColor: '#0066FF',
      textColor: '#ffffff',
    },
    minimizedBarConfig: {
      text: '继续上一段对话',
    },
  };

  instance.showMinimizedBar();

  assert.equal(appendedNodes[0].children[0].textContent, '💬');
  assert.equal(appendedNodes[0].children[1].textContent, '继续上一段对话');

  delete global.window;
  delete global.document;
  delete global.HTMLElement;
});

test('hideChat restores default button and bubble container visibility', async () => {
  global.window = { innerWidth: 1024 };
  global.HTMLElement = class HTMLElement {};

  const instance = await createInstance();

  instance.config = {
    ...instance.config,
    animation: {
      duration: 0,
      type: 'ease',
    },
    bubbleConfig: {
      show: true,
    },
  };

  const windowElement = { style: { display: 'block' } };
  const bubbleContainer = { style: { display: 'none' } };
  const bubble = { style: { display: 'none' }, messageElement: { style: { display: 'none' } } };
  const buttonElement = { style: { display: 'none' } };

  bubble.messageElement = Object.assign(new global.HTMLElement(), { style: { display: 'none' } });

  instance.window = windowElement;
  instance.bubbleContainer = bubbleContainer;
  instance.bubble = bubble;
  instance.buttonElements = [buttonElement];
  instance.config.onHideChat = () => {};

  instance.hideChat();

  assert.equal(windowElement.style.display, 'none');
  assert.equal(bubbleContainer.style.display, 'block');
  assert.equal(bubble.style.display, 'flex');
  assert.equal(buttonElement.style.display, 'flex');
  assert.equal(bubble.messageElement.style.display, 'block');

  delete global.window;
  delete global.HTMLElement;
});

test('minimized bar restores existing window without recreating chat window', async () => {
  global.window = {
    innerWidth: 1024,
    clearTimeout,
    addEventListener() {},
    removeEventListener() {},
  };
  global.requestAnimationFrame = (callback) => callback();
  global.HTMLElement = class HTMLElement {};

  const minimizedBarClicks = [];
  const appendedNodes = [];

  global.document = {
    body: {
      appendChild(node) {
        appendedNodes.push(node);
      },
      contains(node) {
        return appendedNodes.includes(node);
      },
    },
    createElement() {
      return {
        type: '',
        textContent: '',
        children: [],
        style: { cssText: '' },
        attributes: {},
        setAttribute(name, value) {
          this.attributes[name] = value;
        },
        appendChild(child) {
          this.children.push(child);
        },
        addEventListener(eventName, handler) {
          if (eventName === 'click') {
            minimizedBarClicks.push(handler);
          }
        },
        remove() {
          const index = appendedNodes.indexOf(this);
          if (index >= 0) {
            appendedNodes.splice(index, 1);
          }
        },
      };
    },
  };

  const instance = await createInstance();
  const existingWindow = { style: { display: 'none', transform: '' } };
  const messageElement = Object.assign(new global.HTMLElement(), { style: { display: 'block' } });

  instance.window = existingWindow;
  instance.bubble = { style: { display: 'block' }, messageElement };
  instance.hideInviteDialog = () => {};
  instance.config.onShowChat = () => {};

  let createChatWindowCalled = false;
  instance.createChatWindow = () => {
    createChatWindowCalled = true;
  };

  instance.showMinimizedBar();
  minimizedBarClicks[0]();

  assert.equal(createChatWindowCalled, false);
  assert.equal(instance.window, existingWindow);
  assert.equal(existingWindow.style.display, 'block');
  assert.equal(messageElement.style.display, 'none');

  delete global.window;
  delete global.document;
  delete global.requestAnimationFrame;
  delete global.HTMLElement;
});