import type { BytedeskConfig } from '../types';
import BytedeskWeb from '../main';

export const BytedeskSvelte = (options: BytedeskConfig & { onInit?: () => void }) => {
  let instance: BytedeskWeb | null = null;

  // 初始化
  instance = new BytedeskWeb(options);
  instance.init();
  
  if (options.onInit) {
    options.onInit();
  }

  return {
    update(newOptions: BytedeskConfig & { onInit?: () => void }) {
      if (instance) {
        instance.destroy();
      }
      instance = new BytedeskWeb(newOptions);
      instance.init();
      
      if (newOptions.onInit) {
        newOptions.onInit();
      }
    },
    destroy() {
      if (instance) {
        instance.destroy();
        instance = null;
      }
    }
  };
}; 