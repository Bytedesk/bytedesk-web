import { SvelteComponent } from 'svelte';
import BytedeskWeb from '../main';
import type { BytedeskConfig } from '../main';

export class BytedeskSvelte extends SvelteComponent {
  constructor(options: any) {
    super(options);
    const config: BytedeskConfig = {
      theme: options.props.theme,
      window: options.props.window,
      text: options.props.text,
      tabs: options.props.tabs,
      showSupport: options.props.showSupport,
      chatParams: options.props.chatParams
    };
    
    const bytedesk = new BytedeskWeb(config);
    bytedesk.init();
    
    if (options.props.onInit) {
      options.props.onInit(bytedesk);
    }
  }
} 