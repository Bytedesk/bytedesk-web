import type { CSSProperties } from 'react';
import { Alert, Button, Card, ColorPicker, Dropdown, Input, Space, Table, Tag, Typography, type MenuProps } from 'antd';
import type { DemoLanguage } from '../../locales';
import { LANGUAGE_OPTIONS } from './constants';

type LocalizedCopy = {
  apiMessageLabel: string;
  consultParamsLabel: string;
  entrySelectorLabel: string;
  qrInputLabel: string;
  qrInputPlaceholder: string;
  bubbleDemoLabel: string;
  popupUrlTitle: string;
  popupUrlParamsTitle: string;
  popupParamNameTitle: string;
  popupParamValueTitle: string;
  popupParamPurposeTitle: string;
  multiBubbleLabel: string;
  switchModeLabel: string;
};

type QuickAction = {
  key: string;
  label: string;
  handler: () => void;
};

type PopupParam = {
  key: string;
  value: string;
  purpose: string;
};

interface BasicDemoControlsCardProps {
  title: string;
  intro: string;
  docLinks: Array<{ href: string; label: string }>;
  quickActions: QuickAction[];
  togglePlacementLabel: string;
  placementLabel: string;
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
  selectedThemeModeKeys: string[];
  selectedEntryActions: string[];
  isMultiBubbleDemo: boolean;
  locale: DemoLanguage;
  localeValueHint: string;
  lastActionApiHint: string;
  apiHintPrefix: string;
  loadHistoryApiHintPrefix: string;
  navbarHidden: boolean;
  navbarLabel: string;
  navbarHiddenLabel: string;
  navbarShownLabel: string;
  loadHistoryEnabled: boolean;
  loadHistoryLabel: string;
  loadHistoryEnabledLabel: string;
  loadHistoryDisabledLabel: string;
  localizedCopy: LocalizedCopy;
  chatConfigHint: string;
  qrCodeImageUrl: string;
  chatPageUrl: string;
  popupUrlParams: PopupParam[];
  requiredPopupParams: Set<string>;
  requiredLabel: string;
  optionalLabel: string;
  codeBlockStyle: CSSProperties;
  navButtonColor: string;
  navButtonTextColor: string;
  fallbackPrimaryColor: string;
  copyLabel: string;
  onPlacementToggle: () => void;
  onNavColorChange: (nextColor: string) => void;
  onNavTextColorChange: (nextColor: string) => void;
  onThemeModeClick: NonNullable<MenuProps['onClick']>;
  onEntrySelect: NonNullable<MenuProps['onSelect']>;
  onEntryDeselect: NonNullable<MenuProps['onDeselect']>;
  onNavbarToggle: () => void;
  onLoadHistoryToggle: () => void;
  onMultiBubbleToggle: () => void;
  onBubbleSwitchModeToggle: () => void;
  onLocaleSwitch: (nextLocale: DemoLanguage) => void;
  onQrCodeImageUrlChange: (nextUrl: string) => void;
}

const BasicDemoControlsCard = ({
  title,
  intro,
  docLinks,
  quickActions,
  togglePlacementLabel,
  placementLabel,
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
  selectedThemeModeKeys,
  selectedEntryActions,
  isMultiBubbleDemo,
  locale,
  localeValueHint,
  lastActionApiHint,
  apiHintPrefix,
  loadHistoryApiHintPrefix,
  navbarHidden,
  navbarLabel,
  navbarHiddenLabel,
  navbarShownLabel,
  loadHistoryEnabled,
  loadHistoryLabel,
  loadHistoryEnabledLabel,
  loadHistoryDisabledLabel,
  localizedCopy,
  chatConfigHint,
  qrCodeImageUrl,
  chatPageUrl,
  popupUrlParams,
  requiredPopupParams,
  requiredLabel,
  optionalLabel,
  codeBlockStyle,
  navButtonColor,
  navButtonTextColor,
  fallbackPrimaryColor,
  copyLabel,
  onPlacementToggle,
  onNavColorChange,
  onNavTextColorChange,
  onThemeModeClick,
  onEntrySelect,
  onEntryDeselect,
  onNavbarToggle,
  onLoadHistoryToggle,
  onMultiBubbleToggle,
  onBubbleSwitchModeToggle,
  onLocaleSwitch,
  onQrCodeImageUrlChange,
}: BasicDemoControlsCardProps) => {
  return (
    <Card>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <Typography.Title level={2} style={{ marginBottom: 0 }}>{title}</Typography.Title>
        <Typography.Paragraph type="secondary" style={{ marginBottom: 0 }}>
          {intro}
        </Typography.Paragraph>
        <Space direction="vertical" size={4}>
          {docLinks.map((link) => (
            <Typography.Link key={link.href} href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </Typography.Link>
          ))}
        </Space>
        <Space wrap>
          {quickActions.map((action) => (
            <Button key={action.key} type="primary" onClick={action.handler}>
              {action.label}
            </Button>
          ))}
          <Button type="primary" onClick={onPlacementToggle}>
            {togglePlacementLabel} ({placementLabel})
          </Button>
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
          <Button type={navbarHidden ? 'primary' : 'default'} onClick={onNavbarToggle}>
            {navbarLabel}: {navbarHidden ? navbarHiddenLabel : navbarShownLabel}
          </Button>
          <Button type={loadHistoryEnabled ? 'primary' : 'default'} onClick={onLoadHistoryToggle}>
            {loadHistoryLabel}: {loadHistoryEnabled ? loadHistoryEnabledLabel : loadHistoryDisabledLabel}
          </Button>
          <Button type={isMultiBubbleDemo ? 'primary' : 'default'} onClick={onMultiBubbleToggle}>
            {localizedCopy.multiBubbleLabel}
          </Button>
          <Button type="primary" onClick={onBubbleSwitchModeToggle}>
            {localizedCopy.switchModeLabel}
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
        <Typography.Text type="secondary">{localeValueHint}</Typography.Text>
        {lastActionApiHint && (
          <Alert
            type="info"
            showIcon
            message={`${localizedCopy.apiMessageLabel} ${lastActionApiHint}`}
            style={{ alignSelf: 'flex-start', width: 'fit-content', maxWidth: '100%' }}
          />
        )}
        <Typography.Text type="secondary">
          {apiHintPrefix} {loadHistoryApiHintPrefix}
          {loadHistoryEnabled ? 'true' : 'false'}
        </Typography.Text>
        <Typography.Text type="secondary">{localizedCopy.consultParamsLabel} {chatConfigHint}</Typography.Text>
        {selectedEntryActions.includes('qrcode') && (
          <Space direction="vertical" size={6} style={{ width: '100%' }}>
            <Typography.Text type="secondary">{localizedCopy.qrInputLabel}</Typography.Text>
            <Input
              value={qrCodeImageUrl}
              placeholder={localizedCopy.qrInputPlaceholder}
              onChange={(event) => onQrCodeImageUrlChange(event.target.value)}
            />
          </Space>
        )}
        <Space direction="vertical" size={8} style={{ width: '100%' }}>
          <Typography.Text type="secondary">{localizedCopy.popupUrlTitle}</Typography.Text>
          <Typography.Paragraph copyable={{ text: chatPageUrl, tooltips: [copyLabel, copyLabel] }} style={codeBlockStyle}>
            {chatPageUrl}
          </Typography.Paragraph>
          <Typography.Text type="secondary">{localizedCopy.popupUrlParamsTitle}</Typography.Text>
          <Table
            size="small"
            bordered
            pagination={false}
            rowKey="key"
            dataSource={popupUrlParams}
            columns={[
              {
                title: localizedCopy.popupParamNameTitle,
                dataIndex: 'key',
                key: 'key',
                render: (value: string) => (
                  <Space size={6}>
                    <Typography.Text copyable={{ tooltips: false }}>{value}</Typography.Text>
                    <Tag color={requiredPopupParams.has(value) ? 'error' : 'default'}>
                      {requiredPopupParams.has(value) ? requiredLabel : optionalLabel}
                    </Tag>
                  </Space>
                ),
              },
              {
                title: localizedCopy.popupParamValueTitle,
                dataIndex: 'value',
                key: 'value',
                render: (value: string) => (
                  <Typography.Text copyable={value !== '-' ? { tooltips: false } : false}>{value}</Typography.Text>
                ),
              },
              {
                title: localizedCopy.popupParamPurposeTitle,
                dataIndex: 'purpose',
                key: 'purpose',
              },
            ]}
          />
        </Space>
        <Typography.Text type="secondary">{localizedCopy.bubbleDemoLabel}</Typography.Text>
      </Space>
    </Card>
  );
};

export default BasicDemoControlsCard;