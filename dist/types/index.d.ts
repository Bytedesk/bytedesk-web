declare interface Animation_2 {
    enabled: boolean;
    duration: number;
    type: 'ease' | 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
}

declare interface BubbleConfig {
    show: boolean;
    icon: string;
    title: string;
    subtitle: string;
}

export declare interface BytedeskConfig {
    preset: string;
    placement: 'bottom-left' | 'bottom-right';
    marginBottom: number;
    marginSide: number;
    tabsConfig: TabsConfig;
    bubbleConfig: BubbleConfig;
    showSupport: boolean;
    chatParams: ChatParams;
    navbarPreset: string;
    customColor: string;
    navbarColor: string;
    navbarTextColor: string;
    margins: Margins;
    animation: Animation_2;
    window: WindowConfig;
    theme: Theme;
}

declare class BytedeskWeb {
    private config;
    private bubble;
    private window;
    private isVisible;
    private isDragging;
    private dragStartX;
    private dragStartY;
    private initialX;
    private initialY;
    private windowState;
    constructor(config: BytedeskConfig);
    private getDefaultConfig;
    init(): void;
    private createBubble;
    private createChatWindow;
    private generateChatUrl;
    private setupDragging;
    private handleDragStart;
    private handleDragMove;
    private handleDragEnd;
    private setupMessageListener;
    showChat(): void;
    hideChat(): void;
    private minimizeWindow;
    private toggleMaximize;
    private setupResizeListener;
    destroy(): void;
}
export default BytedeskWeb;

declare interface ChatParams {
    org: string;
    t: number;
    sid: string;
    [key: string]: string | number;
}

declare interface Margins {
    bottom: number;
    right: number;
    left: number;
}

declare interface NavbarPreset {
    backgroundColor: string;
    textColor: string;
}

declare interface TabsConfig {
    home: boolean;
    messages: boolean;
    help: boolean;
    news: boolean;
}

declare interface Theme {
    primaryColor: string;
    secondaryColor: string;
    textColor: string;
    backgroundColor: string;
    position?: 'left' | 'right';
    navbar: NavbarPreset;
}

declare interface WindowConfig {
    width: number;
    height: number;
    title: string;
    position?: 'left' | 'right';
}

export { }
