import { useState } from 'react';
import { Alert, Button, Card, ColorPicker, Divider, Dropdown, Input, Modal, Space, Switch, Typography, type MenuProps } from 'antd';
import type { DemoLanguage } from '../../locales';
import type { BubbleSwitchMode } from './copy';
import { LANGUAGE_OPTIONS } from './constants';

type LocalizedCopy = {
  apiMessageLabel: string;
  consultParamsLabel: string;
  entrySelectorLabel: string;
  entryIconLabel: string;
  entryTextToggleLabel: string;
  entryTextInputLabel: string;
  entryTextInputPlaceholder: string;
  minimizedBarTextToggleLabel: string;
  minimizedBarTextInputLabel: string;
  minimizedBarTextInputPlaceholder: string;
  qrInputLabel: string;
  qrInputPlaceholder: string;
  customTitleLabel: string;
  carryBrowseInfoLabel: string;
  draggableLabel: string;
};

type QuickAction = {
  key: string;
  label: string;
  handler: () => void;
  type?: 'primary' | 'default';
};

interface BasicDemoControlsCardProps {
  quickActions: QuickAction[];
  togglePlacementLabel: string;
  placementLabel: string;
  bubbleSwitchModeLabel: string;
  selectedBubbleSwitchMode: BubbleSwitchMode | 'default';
  themeButtonLabel: string;
  themeColorLabel: string;
  themeTextButtonLabel: string;
  themeTextColorLabel: string;
  themeLabel: string;
  themeModeLabel: string;
  navColorPresets: Array<{ label: string; colors: string[] }>;
  navTextColorPresets: Array<{ label: string; colors: string[] }>;
  themeModeMenuItems: MenuProps['items'];
  entryMenuItems: MenuProps['items'];
  entryIconMenuItems: MenuProps['items'];
  selectedThemeModeKeys: string[];
  selectedEntryActions: string[];
  selectedEntryButtonIconKeys: string[];
  selectedEntryButtonIconLabel: string;
  isEntryButtonTextEnabled: boolean;
  entryButtonTextValue: string;
  minimizedBarTextValue: string;
  locale: DemoLanguage;
  localeValueHint: string;
  lastActionApiHint: string;
  apiHintPrefix: string;
  loadHistoryApiHintPrefix: string;
  navbarHidden: boolean;
  navbarLabel: string;
  navbarHiddenLabel: string;
  navbarShownLabel: string;
  qrCodeParamEnabled: boolean;
  qrCodeParamLabel: string;
  threadDetailParamEnabled: boolean;
  threadDetailParamLabel: string;
  visitorProfileParamEnabled: boolean;
  visitorProfileParamLabel: string;
  loadHistoryEnabled: boolean;
  loadHistoryLabel: string;
  loadHistoryEnabledLabel: string;
  loadHistoryDisabledLabel: string;
  customTitleEnabled: boolean;
  carryBrowseInfoEnabled: boolean;
  draggableEnabled: boolean;
  localizedCopy: LocalizedCopy;
  chatConfigHint: string;
  qrCodeImageUrl: string;
  navButtonColor: string;
  navButtonTextColor: string;
  fallbackPrimaryColor: string;
  onPlacementToggle: () => void;
  onBubbleSwitchModeChange: (nextMode: BubbleSwitchMode) => void;
  onNavColorChange: (nextColor: string) => void;
  onNavTextColorChange: (nextColor: string) => void;
  onThemeModeClick: NonNullable<MenuProps['onClick']>;
  onEntrySelect: NonNullable<MenuProps['onSelect']>;
  onEntryDeselect: NonNullable<MenuProps['onDeselect']>;
  onEntryButtonIconClick: NonNullable<MenuProps['onClick']>;
  onEntryButtonTextToggle: () => void;
  onEntryButtonTextChange: (nextText: string) => void;
  onMinimizedBarTextChange: (nextText: string) => void;
  onNavbarToggle: () => void;
  onQrCodeParamToggle: () => void;
  onThreadDetailParamToggle: () => void;
  onVisitorProfileParamToggle: () => void;
  onLoadHistoryToggle: () => void;
  onCustomTitleToggle: () => void;
  onCarryBrowseInfoToggle: () => void;
  onDraggableToggle: () => void;
  onLocaleSwitch: (nextLocale: DemoLanguage) => void;
  onQrCodeImageUrlChange: (nextUrl: string) => void;
}

const BasicDemoControlsCard = ({
  quickActions,
  togglePlacementLabel,
  placementLabel,
  bubbleSwitchModeLabel,
  selectedBubbleSwitchMode,
  themeButtonLabel,
  themeColorLabel,
  themeTextButtonLabel,
  themeTextColorLabel,
  themeLabel,
  themeModeLabel,
  navColorPresets,
  navTextColorPresets,
  themeModeMenuItems,
  entryMenuItems,
  entryIconMenuItems,
  selectedThemeModeKeys,
  selectedEntryActions,
  selectedEntryButtonIconKeys,
  selectedEntryButtonIconLabel,
  isEntryButtonTextEnabled,
  entryButtonTextValue,
  minimizedBarTextValue,
  locale,
  localeValueHint,
  lastActionApiHint,
  apiHintPrefix,
  loadHistoryApiHintPrefix,
  navbarHidden,
  navbarLabel,
  navbarHiddenLabel,
  navbarShownLabel,
  qrCodeParamEnabled,
  qrCodeParamLabel,
  threadDetailParamEnabled,
  threadDetailParamLabel,
  visitorProfileParamEnabled,
  visitorProfileParamLabel,
  loadHistoryEnabled,
  loadHistoryLabel,
  loadHistoryEnabledLabel,
  loadHistoryDisabledLabel,
  customTitleEnabled,
  carryBrowseInfoEnabled,
  draggableEnabled,
  localizedCopy,
  chatConfigHint,
  qrCodeImageUrl,
  navButtonColor,
  navButtonTextColor,
  fallbackPrimaryColor,
  onPlacementToggle,
  onBubbleSwitchModeChange,
  onNavColorChange,
  onNavTextColorChange,
  onThemeModeClick,
  onEntrySelect,
  onEntryDeselect,
  onEntryButtonIconClick,
  onEntryButtonTextToggle,
  onEntryButtonTextChange,
  onMinimizedBarTextChange,
  onNavbarToggle,
  onQrCodeParamToggle,
  onThreadDetailParamToggle,
  onVisitorProfileParamToggle,
  onLoadHistoryToggle,
  onCustomTitleToggle,
  onCarryBrowseInfoToggle,
  onDraggableToggle,
  onLocaleSwitch,
  onQrCodeImageUrlChange,
}: BasicDemoControlsCardProps) => {
  const [isEntryTextModalOpen, setIsEntryTextModalOpen] = useState(false);
  const [isMinimizedBarTextModalOpen, setIsMinimizedBarTextModalOpen] = useState(false);
  const bubbleSwitchModeMenuItems: MenuProps['items'] = [
    { key: 'default', label: 'default' },
    { key: 'fade', label: 'fade' },
    { key: 'slide-up', label: 'slide-up' },
    { key: 'ticker', label: 'ticker' },
  ];
  const featuredQuickActionKeys = new Set([
    'openChat',
    'closeChat',
    'openInNewWindow',
    'openInNewTab'
  ]);
  const featuredQuickActions = quickActions.filter((action) => featuredQuickActionKeys.has(action.key));
  const secondaryQuickActions = quickActions.filter((action) => !featuredQuickActionKeys.has(action.key));

  return (
    <Card>
      <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
        <Space wrap>
          {secondaryQuickActions.map((action) => (
            <Space key={action.key} size={8}>
              <Button type={action.type || 'primary'} onClick={action.handler}>
                {action.label}
              </Button>
              {action.key === 'toggleButtonVisibility' && (
                <Button type={isEntryButtonTextEnabled ? 'primary' : 'default'} onClick={() => setIsEntryTextModalOpen(true)}>
                  {localizedCopy.entryTextToggleLabel}: {isEntryButtonTextEnabled ? loadHistoryEnabledLabel : loadHistoryDisabledLabel}
                </Button>
              )}
            </Space>
          ))}
          <Button type={minimizedBarTextValue.trim() ? 'primary' : 'default'} onClick={() => setIsMinimizedBarTextModalOpen(true)}>
            {localizedCopy.minimizedBarTextToggleLabel}: {minimizedBarTextValue.trim() ? loadHistoryEnabledLabel : loadHistoryDisabledLabel}
          </Button>
          <Button type="primary" onClick={onPlacementToggle}>
            {togglePlacementLabel} ({placementLabel})
          </Button>
          <Dropdown
            trigger={['click']}
            menu={{
              items: bubbleSwitchModeMenuItems,
              selectable: true,
              selectedKeys: [selectedBubbleSwitchMode],
              onClick: ({ key }) => onBubbleSwitchModeChange(key as BubbleSwitchMode),
            }}
          >
            <Button type="primary">
              {bubbleSwitchModeLabel}
            </Button>
          </Dropdown>
          <ColorPicker
            value={navButtonColor || fallbackPrimaryColor}
            presets={navColorPresets}
            onChangeComplete={(value) => onNavColorChange(value.toHexString())}
          >
            <Button
              type="primary"
              style={{
                backgroundColor: navButtonColor || fallbackPrimaryColor,
                borderColor: navButtonColor || fallbackPrimaryColor,
                color: navButtonTextColor,
              }}
            >
              {themeButtonLabel} ({themeColorLabel})
            </Button>
          </ColorPicker>
          <ColorPicker
            value={navButtonTextColor}
            presets={navTextColorPresets}
            onChangeComplete={(value) => onNavTextColorChange(value.toHexString())}
          >
            <Button
              type="primary"
              style={{
                backgroundColor: navButtonColor || fallbackPrimaryColor,
                borderColor: navButtonColor || fallbackPrimaryColor,
                color: navButtonTextColor,
              }}
            >
              {themeTextButtonLabel} ({themeTextColorLabel})
            </Button>
          </ColorPicker>
          <Dropdown
            trigger={['click']}
            menu={{
              items: themeModeMenuItems,
              selectable: true,
              selectedKeys: selectedThemeModeKeys,
              onClick: onThemeModeClick,
            }}
          >
            <Button type="primary">
              {themeLabel} ({themeModeLabel})
            </Button>
          </Dropdown>
          <Dropdown
            trigger={['click']}
            menu={{
              items: entryMenuItems,
              multiple: true,
              selectable: true,
              selectedKeys: selectedEntryActions,
              onSelect: onEntrySelect,
              onDeselect: onEntryDeselect,
            }}
          >
            <Button type="primary">
              {localizedCopy.entrySelectorLabel} ({selectedEntryActions.length})
            </Button>
          </Dropdown>
          <Dropdown
            trigger={['click']}
            menu={{
              items: entryIconMenuItems,
              selectable: true,
              selectedKeys: selectedEntryButtonIconKeys,
              onClick: onEntryButtonIconClick,
            }}
          >
            <Button type="primary">
              {localizedCopy.entryIconLabel} ({selectedEntryButtonIconLabel})
            </Button>
          </Dropdown>
          <Button type={navbarHidden ? 'primary' : 'default'} onClick={onNavbarToggle}>
            {navbarLabel}: {navbarHidden ? navbarHiddenLabel : navbarShownLabel}
          </Button>
          <Button type={qrCodeParamEnabled ? 'primary' : 'default'} onClick={onQrCodeParamToggle}>
            {qrCodeParamLabel}: {qrCodeParamEnabled ? loadHistoryEnabledLabel : loadHistoryDisabledLabel}
          </Button>
          <Button type={threadDetailParamEnabled ? 'primary' : 'default'} onClick={onThreadDetailParamToggle}>
            {threadDetailParamLabel}: {threadDetailParamEnabled ? loadHistoryEnabledLabel : loadHistoryDisabledLabel}
          </Button>
          <Button type={visitorProfileParamEnabled ? 'primary' : 'default'} onClick={onVisitorProfileParamToggle}>
            {visitorProfileParamLabel}: {visitorProfileParamEnabled ? loadHistoryEnabledLabel : loadHistoryDisabledLabel}
          </Button>
          <Button type={loadHistoryEnabled ? 'primary' : 'default'} onClick={onLoadHistoryToggle}>
            {loadHistoryLabel}: {loadHistoryEnabled ? loadHistoryEnabledLabel : loadHistoryDisabledLabel}
          </Button>
          <Button type={customTitleEnabled ? 'primary' : 'default'} onClick={onCustomTitleToggle}>
            {localizedCopy.customTitleLabel}: {customTitleEnabled ? navbarHiddenLabel : navbarShownLabel}
          </Button>
          <Button type={carryBrowseInfoEnabled ? 'primary' : 'default'} onClick={onCarryBrowseInfoToggle}>
            {localizedCopy.carryBrowseInfoLabel}: {carryBrowseInfoEnabled ? navbarHiddenLabel : navbarShownLabel}
          </Button>
          <Button type={draggableEnabled ? 'primary' : 'default'} onClick={onDraggableToggle}>
            {localizedCopy.draggableLabel}: {draggableEnabled ? navbarHiddenLabel : navbarShownLabel}
          </Button>
        </Space>
        <Space wrap>
          {LANGUAGE_OPTIONS.map((item) => (
            <Button
              key={item.value}
              type={locale === item.value ? 'primary' : 'default'}
              onClick={() => onLocaleSwitch(item.value as DemoLanguage)}
            >
              {item.label}
            </Button>
          ))}
        </Space>
        <Divider />
        <Space wrap>
          {featuredQuickActions.map((action, index) => (
            <Button key={action.key} type={index === 0 ? 'primary' : 'default'} onClick={action.handler}>
              {action.label}
            </Button>
          ))}
        </Space>
        <Typography.Text type="secondary">{localeValueHint}</Typography.Text>
        {lastActionApiHint && (
          <Alert
            type="info"
            showIcon
            title={`${localizedCopy.apiMessageLabel} ${lastActionApiHint}`}
            style={{ alignSelf: 'flex-start', width: 'fit-content', maxWidth: '100%' }}
          />
        )}
        <Typography.Text type="secondary">
          {apiHintPrefix} {loadHistoryApiHintPrefix}
          {loadHistoryEnabled ? 'true' : 'false'}
        </Typography.Text>
        <Alert
          type="info"
          showIcon
          title={`${localizedCopy.consultParamsLabel} ${chatConfigHint}`}
          style={{ alignSelf: 'flex-start', width: 'fit-content', maxWidth: '100%' }}
        />
        {selectedEntryActions.includes('qrcode') && (
          <Space orientation="vertical" size={6} style={{ width: '100%' }}>
            <Typography.Text type="secondary">{localizedCopy.qrInputLabel}</Typography.Text>
            <Input
              value={qrCodeImageUrl}
              placeholder={localizedCopy.qrInputPlaceholder}
              onChange={(event) => onQrCodeImageUrlChange(event.target.value)}
            />
          </Space>
        )}
      </Space>
      <Modal
        title={localizedCopy.entryTextToggleLabel}
        open={isEntryTextModalOpen}
        onCancel={() => setIsEntryTextModalOpen(false)}
        footer={[
          <Button key="close" type="primary" onClick={() => setIsEntryTextModalOpen(false)}>
            OK
          </Button>,
        ]}
      >
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          <Space align="center" style={{ justifyContent: 'space-between', width: '100%' }}>
            <Typography.Text>{localizedCopy.entryTextToggleLabel}</Typography.Text>
            <Switch checked={isEntryButtonTextEnabled} onChange={onEntryButtonTextToggle} />
          </Space>
          <Space orientation="vertical" size={6} style={{ width: '100%' }}>
            <Typography.Text type="secondary">{localizedCopy.entryTextInputLabel}</Typography.Text>
            <Input
              value={entryButtonTextValue}
              placeholder={localizedCopy.entryTextInputPlaceholder}
              onChange={(event) => onEntryButtonTextChange(event.target.value)}
              disabled={!isEntryButtonTextEnabled}
            />
          </Space>
        </Space>
      </Modal>
      <Modal
        title={localizedCopy.minimizedBarTextToggleLabel}
        open={isMinimizedBarTextModalOpen}
        onCancel={() => setIsMinimizedBarTextModalOpen(false)}
        footer={[
          <Button key="close" type="primary" onClick={() => setIsMinimizedBarTextModalOpen(false)}>
            OK
          </Button>,
        ]}
      >
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          <Space orientation="vertical" size={6} style={{ width: '100%' }}>
            <Typography.Text type="secondary">{localizedCopy.minimizedBarTextInputLabel}</Typography.Text>
            <Input
              value={minimizedBarTextValue}
              placeholder={localizedCopy.minimizedBarTextInputPlaceholder}
              onChange={(event) => onMinimizedBarTextChange(event.target.value)}
            />
          </Space>
        </Space>
      </Modal>
    </Card>
  );
};

export default BasicDemoControlsCard;