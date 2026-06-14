import type { ConfigGuideCopy } from './copy';

export interface FieldDocCopy {
  fields: Record<string, string>;
}

export interface ConfigDocSectionItem {
  key: string;
  label: string;
  children: string;
}

export interface ConfigDocSection {
  title: string;
  items: ConfigDocSectionItem[];
}

export const buildConfigDocSections = (
  configGuideCopy: ConfigGuideCopy,
  fieldDocCopy: FieldDocCopy,
): ConfigDocSection[] => ([
  {
    title: configGuideCopy.baseSectionTitle,
    items: [
      { key: 'isDebug', label: 'isDebug', children: fieldDocCopy.fields.isDebug },
      { key: 'forceRefresh', label: 'forceRefresh', children: fieldDocCopy.fields.forceRefresh },
      { key: 'apiUrl', label: 'apiUrl', children: fieldDocCopy.fields.apiUrl },
      { key: 'htmlUrl', label: 'htmlUrl', children: fieldDocCopy.fields.htmlUrl },
      { key: 'chatPath', label: 'chatPath', children: fieldDocCopy.fields.chatPath },
      { key: 'threadPath', label: 'threadPath', children: fieldDocCopy.fields.threadPath },
      { key: 'webrtcPath', label: 'webrtcPath', children: fieldDocCopy.fields.webrtcPath },
      { key: 'callPath', label: 'callPath', children: fieldDocCopy.fields.callPath },
      { key: 'locale', label: 'locale', children: fieldDocCopy.fields.locale },
    ],
  },
  {
    title: configGuideCopy.uiSectionTitle,
    items: [
      { key: 'placement', label: 'placement', children: fieldDocCopy.fields.placement },
      { key: 'marginBottom', label: 'marginBottom', children: fieldDocCopy.fields.marginBottom },
      { key: 'marginSide', label: 'marginSide', children: fieldDocCopy.fields.marginSide },
      { key: 'autoPopup', label: 'autoPopup', children: fieldDocCopy.fields.autoPopup },
      { key: 'autoPopupDelay', label: 'autoPopupDelay', children: fieldDocCopy.fields.autoPopupDelay },
      { key: 'draggable', label: 'draggable', children: fieldDocCopy.fields.draggable },
      { key: 'tabsConfig', label: 'tabsConfig', children: fieldDocCopy.fields.tabsConfig },
      { key: 'bubbleConfig', label: 'bubbleConfig', children: fieldDocCopy.fields.bubbleConfig },
      { key: 'buttonConfig', label: 'buttonConfig', children: fieldDocCopy.fields.buttonConfig },
      { key: 'buttonsConfig', label: 'buttonsConfig', children: fieldDocCopy.fields.buttonsConfig },
      { key: 'inviteConfig', label: 'inviteConfig', children: fieldDocCopy.fields.inviteConfig },
      { key: 'theme', label: 'theme', children: fieldDocCopy.fields.theme },
      { key: 'animation', label: 'animation', children: fieldDocCopy.fields.animation },
      { key: 'window', label: 'window', children: fieldDocCopy.fields.window },
    ],
  },
  {
    title: configGuideCopy.callbackSectionTitle,
    items: [
      { key: 'onInit', label: 'onInit', children: fieldDocCopy.fields.onInit },
      { key: 'onShowChat', label: 'onShowChat', children: fieldDocCopy.fields.onShowChat },
      { key: 'onHideChat', label: 'onHideChat', children: fieldDocCopy.fields.onHideChat },
      { key: 'onMessage', label: 'onMessage', children: fieldDocCopy.fields.onMessage },
      { key: 'onConfigChange', label: 'onConfigChange', children: fieldDocCopy.fields.onConfigChange },
      { key: 'onVisitorInfo', label: 'onVisitorInfo', children: fieldDocCopy.fields.onVisitorInfo },
    ],
  },
  {
    title: configGuideCopy.themeSectionTitle,
    items: [
      { key: 'theme.mode', label: 'theme.mode', children: fieldDocCopy.fields['theme.mode'] },
      { key: 'theme.textColor', label: 'theme.textColor', children: fieldDocCopy.fields['theme.textColor'] },
      { key: 'theme.backgroundColor', label: 'theme.backgroundColor', children: fieldDocCopy.fields['theme.backgroundColor'] },
    ],
  },
  {
    title: configGuideCopy.bubbleSectionTitle,
    items: [
      { key: 'bubble.show', label: 'show', children: fieldDocCopy.fields['bubble.show'] },
      { key: 'bubble.icon', label: 'icon', children: fieldDocCopy.fields['bubble.icon'] },
      { key: 'bubble.title', label: 'title', children: fieldDocCopy.fields['bubble.title'] },
      { key: 'bubble.subtitle', label: 'subtitle', children: fieldDocCopy.fields['bubble.subtitle'] },
      { key: 'bubble.messages', label: 'messages', children: fieldDocCopy.fields['bubble.messages'] },
      { key: 'bubble.autoRotate', label: 'autoRotate', children: fieldDocCopy.fields['bubble.autoRotate'] },
      { key: 'bubble.rotateInterval', label: 'rotateInterval', children: fieldDocCopy.fields['bubble.rotateInterval'] },
      { key: 'bubble.switchMode', label: 'switchMode', children: fieldDocCopy.fields['bubble.switchMode'] },
    ],
  },
  {
    title: configGuideCopy.buttonSectionTitle,
    items: [
      { key: 'button.show', label: 'show', children: fieldDocCopy.fields['button.show'] },
      { key: 'button.icon', label: 'icon', children: fieldDocCopy.fields['button.icon'] },
      { key: 'button.text', label: 'text', children: fieldDocCopy.fields['button.text'] },
      { key: 'button.width', label: 'width', children: fieldDocCopy.fields['button.width'] },
      { key: 'button.height', label: 'height', children: fieldDocCopy.fields['button.height'] },
      { key: 'button.action', label: 'action', children: fieldDocCopy.fields['button.action'] },
      { key: 'button.previewImageUrl', label: 'previewImageUrl', children: fieldDocCopy.fields['button.previewImageUrl'] },
      { key: 'button.previewImageAlt', label: 'previewImageAlt', children: fieldDocCopy.fields['button.previewImageAlt'] },
      { key: 'button.onClick', label: 'onClick', children: fieldDocCopy.fields['button.onClick'] },
    ],
  },
  {
    title: configGuideCopy.inviteSectionTitle,
    items: [
      { key: 'invite.show', label: 'show', children: fieldDocCopy.fields['invite.show'] },
      { key: 'invite.text', label: 'text', children: fieldDocCopy.fields['invite.text'] },
      { key: 'invite.icon', label: 'icon', children: fieldDocCopy.fields['invite.icon'] },
      { key: 'invite.delay', label: 'delay', children: fieldDocCopy.fields['invite.delay'] },
      { key: 'invite.loop', label: 'loop', children: fieldDocCopy.fields['invite.loop'] },
      { key: 'invite.loopDelay', label: 'loopDelay', children: fieldDocCopy.fields['invite.loopDelay'] },
      { key: 'invite.loopCount', label: 'loopCount', children: fieldDocCopy.fields['invite.loopCount'] },
      { key: 'invite.acceptText', label: 'acceptText', children: fieldDocCopy.fields['invite.acceptText'] },
      { key: 'invite.rejectText', label: 'rejectText', children: fieldDocCopy.fields['invite.rejectText'] },
      { key: 'invite.onAccept', label: 'onAccept', children: fieldDocCopy.fields['invite.onAccept'] },
      { key: 'invite.onReject', label: 'onReject', children: fieldDocCopy.fields['invite.onReject'] },
      { key: 'invite.onClose', label: 'onClose', children: fieldDocCopy.fields['invite.onClose'] },
      { key: 'invite.onOpen', label: 'onOpen', children: fieldDocCopy.fields['invite.onOpen'] },
    ],
  },
  {
    title: configGuideCopy.chatSectionTitle,
    items: [
      { key: 'chat.org', label: 'org', children: fieldDocCopy.fields['chat.org'] },
      { key: 'chat.t', label: 't', children: fieldDocCopy.fields['chat.t'] },
      { key: 'chat.sid', label: 'sid', children: fieldDocCopy.fields['chat.sid'] },
      { key: 'chat.uid', label: 'uid', children: fieldDocCopy.fields['chat.uid'] },
      { key: 'chat.visitorUid', label: 'visitorUid', children: fieldDocCopy.fields['chat.visitorUid'] },
      { key: 'chat.nickname', label: 'nickname', children: fieldDocCopy.fields['chat.nickname'] },
      { key: 'chat.avatar', label: 'avatar', children: fieldDocCopy.fields['chat.avatar'] },
      { key: 'chat.mobile', label: 'mobile', children: fieldDocCopy.fields['chat.mobile'] },
      { key: 'chat.email', label: 'email', children: fieldDocCopy.fields['chat.email'] },
      { key: 'chat.note', label: 'note', children: fieldDocCopy.fields['chat.note'] },
      { key: 'chat.channel', label: 'channel', children: fieldDocCopy.fields['chat.channel'] },
      { key: 'chat.goodsInfo', label: 'goodsInfo', children: fieldDocCopy.fields['chat.goodsInfo'] },
      { key: 'chat.orderInfo', label: 'orderInfo', children: fieldDocCopy.fields['chat.orderInfo'] },
      { key: 'chat.extra', label: 'extra', children: fieldDocCopy.fields['chat.extra'] },
      { key: 'chat.vipLevel', label: 'vipLevel', children: fieldDocCopy.fields['chat.vipLevel'] },
      { key: 'chat.debug', label: 'debug', children: fieldDocCopy.fields['chat.debug'] },
      { key: 'chat.draft', label: 'draft', children: fieldDocCopy.fields['chat.draft'] },
      { key: 'chat.settingsUid', label: 'settingsUid', children: fieldDocCopy.fields['chat.settingsUid'] },
      { key: 'chat.loadHistory', label: 'loadHistory', children: fieldDocCopy.fields['chat.loadHistory'] },
      { key: 'chat.custom', label: '[key: string]', children: fieldDocCopy.fields['chat.custom'] },
    ],
  },
  {
    title: configGuideCopy.browseSectionTitle,
    items: [
      { key: 'browse.referrer', label: 'referrer', children: fieldDocCopy.fields['browse.referrer'] },
      { key: 'browse.url', label: 'url', children: fieldDocCopy.fields['browse.url'] },
      { key: 'browse.title', label: 'title', children: fieldDocCopy.fields['browse.title'] },
      { key: 'browse.custom', label: '[key: string]', children: fieldDocCopy.fields['browse.custom'] },
    ],
  },
  {
    title: configGuideCopy.feedbackSectionTitle,
    items: [
      { key: 'feedback.enabled', label: 'enabled', children: fieldDocCopy.fields['feedback.enabled'] },
      { key: 'feedback.trigger', label: 'trigger', children: fieldDocCopy.fields['feedback.trigger'] },
      { key: 'feedback.showOnSelection', label: 'showOnSelection', children: fieldDocCopy.fields['feedback.showOnSelection'] },
      { key: 'feedback.selectionText', label: 'selectionText', children: fieldDocCopy.fields['feedback.selectionText'] },
      { key: 'feedback.buttonText', label: 'buttonText', children: fieldDocCopy.fields['feedback.buttonText'] },
      { key: 'feedback.dialogTitle', label: 'dialogTitle', children: fieldDocCopy.fields['feedback.dialogTitle'] },
      { key: 'feedback.placeholder', label: 'placeholder', children: fieldDocCopy.fields['feedback.placeholder'] },
      { key: 'feedback.submitText', label: 'submitText', children: fieldDocCopy.fields['feedback.submitText'] },
      { key: 'feedback.cancelText', label: 'cancelText', children: fieldDocCopy.fields['feedback.cancelText'] },
      { key: 'feedback.successMessage', label: 'successMessage', children: fieldDocCopy.fields['feedback.successMessage'] },
      { key: 'feedback.categoryNames', label: 'categoryNames', children: fieldDocCopy.fields['feedback.categoryNames'] },
      { key: 'feedback.requiredTypes', label: 'requiredTypes', children: fieldDocCopy.fields['feedback.requiredTypes'] },
      { key: 'feedback.typesSectionTitle', label: 'typesSectionTitle', children: fieldDocCopy.fields['feedback.typesSectionTitle'] },
      { key: 'feedback.typesDescription', label: 'typesDescription', children: fieldDocCopy.fields['feedback.typesDescription'] },
      { key: 'feedback.submitScreenshot', label: 'submitScreenshot', children: fieldDocCopy.fields['feedback.submitScreenshot'] },
      { key: 'feedback.onSubmit', label: 'onSubmit', children: fieldDocCopy.fields['feedback.onSubmit'] },
      { key: 'feedback.onCancel', label: 'onCancel', children: fieldDocCopy.fields['feedback.onCancel'] },
    ],
  },
  {
    title: configGuideCopy.animationSectionTitle,
    items: [
      { key: 'animation.enabled', label: 'enabled', children: fieldDocCopy.fields['animation.enabled'] },
      { key: 'animation.duration', label: 'duration', children: fieldDocCopy.fields['animation.duration'] },
      { key: 'animation.type', label: 'type', children: fieldDocCopy.fields['animation.type'] },
    ],
  },
  {
    title: configGuideCopy.windowSectionTitle,
    items: [
      { key: 'window.width', label: 'width', children: fieldDocCopy.fields['window.width'] },
      { key: 'window.height', label: 'height', children: fieldDocCopy.fields['window.height'] },
    ],
  },
  {
    title: configGuideCopy.tabsSectionTitle,
    items: [
      { key: 'tabs.messages', label: 'messages', children: fieldDocCopy.fields['tabs.messages'] },
      { key: 'tabs.thread', label: 'thread', children: fieldDocCopy.fields['tabs.thread'] },
      { key: 'tabs.help', label: 'help', children: fieldDocCopy.fields['tabs.help'] },
    ],
  },
]);