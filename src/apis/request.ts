/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2025-03-29 12:51:08
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2025-06-21 11:14:14
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  联系：270580156@qq.com
 * Copyright (c) 2025 by bytedesk.com, All Rights Reserved. 
 */
import axios, { AxiosError } from "axios";
import {
  EVENT_BUS_SERVER_ERROR_500,
  EVENT_BUS_HTTP_ERROR,
  ACCESS_TOKEN,
  ANONYMOUS,
} from "../utils/constants";
import emitter from "../utils/eventsEmitter";
import logger from "../utils/logger";

// API URL配置，默认从BytedeskWeb中获取
// 初始为默认值，可以通过setApiUrl动态更新
let apiUrl = '';

export function getApiUrl() {
  // 如果apiUrl未设置，返回默认值
  return apiUrl || 'https://api.weiyuai.cn';
}

export function setApiUrl(url: string) {
  if (url && url.trim() !== '') {
    apiUrl = url;
    logger.debug('API URL已设置为:', apiUrl);
  } else {
    logger.warn('尝试设置无效的API URL');
  }
  return apiUrl;
}

// FIXME: Access to XMLHttpRequest at 'http://localhost:9003/...&client=web'
// from origin 'http://localhost:9006' has been blocked by CORS policy:
// The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.
// The credentials mode of requests initiated by the XMLHttpRequest is controlled by the withCredentials attribute.
// axios.defaults.withCredentials = true;
// 创建axios实例，每次请求都会重新获取最新的baseURL
const request = axios.create({
  timeout: 20000,
  // 初始化时设置一个默认值，后续会通过request拦截器动态获取
  baseURL: getApiUrl(),
});

request.interceptors.request.use(
  (config) => {
    config.baseURL = getApiUrl();
    // 发送请求之前做一些处理
    const accessToken = localStorage.getItem(ACCESS_TOKEN);
    // console.log("accessToken", accessToken);
    if (accessToken && accessToken.length > 10 && config.url && config.url.startsWith("/api")) {
      // token不为空，且长度大于10，说明已经登录，对于授权访问接口，则设置请求头
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    if (!accessToken && config.url && config.url.startsWith("/api")) {
      // token为空，且要请求需要授权接口，判定当前为匿名状态，则直接返回
      return Promise.reject(axiosError);
    }
    // 发送请求之前做一些处理
    // let token = localStorage.access_token;
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    //   // config.headers["Authorization"] = "Bearer " + token;
    // }
    // TODO: 如果token不为空的话，设置请求头
    // console.log("request config", config);
    return config;
  },
  (error) => {
    logger.error("request error", error);
    if (error.response.status === 403) {
      emitter.emit(EVENT_BUS_HTTP_ERROR, "403");
    }
    if (error.response.status === 401) {
      emitter.emit(EVENT_BUS_HTTP_ERROR, "401");
    }
    // 请求错误做些什么
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  (response) => {
    // 接收到响应数据之后做点什么
    // console.log('response success', response);
    return response;
  },
  (error) => {
    logger.error("response error", error);
    if (error.response) {
      switch (error.response.status) {
        case 400:
          // TODO: 修改登录错误提示为：密码错误
          logger.error("axios interception error 400");
          emitter.emit(EVENT_BUS_HTTP_ERROR, "400");
          break;
        case 401:
          // FIXME: 401报错自动清理本地存储access_token, 然后重新获取access_token
          logger.error("axios interception error 401");
          emitter.emit(EVENT_BUS_HTTP_ERROR, "401");
          break;
        case 403:
          // TODO: 通过refresh_token获取最新access_token?
          // 403 无权限，跳转到首页
          logger.error("axios interception error 403");
          emitter.emit(EVENT_BUS_HTTP_ERROR, "403");
          break;
        case 500:
          // TODO: 服务器错误
          logger.error("axios interception error 500");
          emitter.emit(EVENT_BUS_SERVER_ERROR_500, "500");
          break;
      }
    }
    // 响应错误做点什么
    return "return axios interception error";
  },
);

// 创建一个简化的 Axios 响应对象, 用于匿名状态下的错误处理
// 注意：这里故意使用了any来避免TypeScript类型检查错误
const response: any = {
  data: null, // 通常错误时不会有数据
  status: 601, // 自定义HTTP状态码，用于表示匿名状态
  statusText: ANONYMOUS, // HTTP 状态文本
  headers: {}, // 响应头
  config: {
    headers: {}
  }, // 请求配置
  request: null // 原始请求对象
};

// 手动创建一个 AxiosError 对象
const axiosError: AxiosError = {
  message: "匿名用户，无需访问服务器接口", // 错误消息
  name: ANONYMOUS, // 错误名称
  code: "601", // 自定义的错误代码
  config: response.config, // 请求配置
  request: response.request, // 原始请求对象
  response: response, // 响应对象
  isAxiosError: true, // 标记这是一个 AxiosError 对象
  toJSON: function () {
    // 实现 toJSON 方法，通常用于将错误对象转换为 JSON 格式
    return {
      message: this.message,
      name: this.name,
      code: this.code,
      config: this.config,
      request: this.request,
      response: this.response,
    };
  },
};


export default request;
