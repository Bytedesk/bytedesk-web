export const isDevDemo = import.meta.env.DEV;

export const demoApiUrl = isDevDemo ? 'http://127.0.0.1:9003' : 'https://api.weiyuai.cn';

export const getDemoHtmlBaseUrl = (devPort: number | string, productionBaseUrl = 'https://cdn.weiyuai.cn') => (
  isDevDemo ? `http://127.0.0.1:${devPort}` : productionBaseUrl
);