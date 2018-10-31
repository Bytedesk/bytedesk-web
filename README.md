# 萝卜丝·云客服

- 致力于提供强大、稳定、灵活、可扩展、定制化的客户服务一站式平台
- [官方网站](https://www.bytedesk.com)
- [开发文档](https://www.bytedesk.com/support/article?uid=201808221551193&aid=201808252118461)

## 准备工作

- [注册账号](https://www.bytedesk.com/admin#/register)
- [登录后台](https://www.bytedesk.com/admin#/login)
- 分配应用：登录后台->所有设置->应用管理->Web

## 更多客服账号

- 登录管理员账号 -> 所有设置 -> 客服管理 -> 客服账号
- 可以查看：企业号，用户名，默认密码跟用户名一致
- 客服账号可以通过上面的管理后台地址登录

## 测试会话

- 登录管理员账号
- 打开连接地址：https://www.bytedesk.com/chat?uid=201808221551193&wid=201807171659201&type=workGroup&aid=&ph=ph
- 选择业务类型：留学
- 选择工作组：北京-美国，注：选择其他工作组，需要登录相应的客服账号
- 上述操作完成之后，即可以正常会话
- 注：管理员修改某个客服账号所属工作组之后，相应客服账号需要刷新页面或者重新登录才会生效

## 获取客服链接连接

### 工作组会话

- 登录管理员账号 -> 所有设置 -> 客服管理 -> 工作组 -> 获取代码
- 两种会话样式：单独窗口、嵌入窗口

### 一对一会话

- 登录管理员账号 -> 所有设置 -> 客服管理 -> 客服账号 -> 获取代码
- 两种会话样式：单独窗口、嵌入窗口

## 参数说明

### 单独窗口

```
<a href="https://www.bytedesk.com/chat?uid=201808221551193&wid=201810201809427&type=visitor&aid=201810201811085&ph=ph" target="_blank">在线客服</a>
```

- uid: 管理员唯一ID，可在客服管理->客服账号页面查看
- wid：工作组唯一ID，可以在客服管理->工作组页面查看
- type: 有两个值，1. 'visitor' 代表一对一会话，'workGroup' 为工作组会话
- aid：为一对一会话指定客服账号唯一ID，必须；工作组会话值设置为空，但需要保留参数
- placeholder 占位符，可选

### 嵌入窗口

```
<!--萝卜丝·智能客服代码 开始 -->
<div id="byteDesk"></div>
<script type="text/javascript">
window.adminUid = "201808221551193";
window.workGroupWid = "201810201809427";
window.subDomain = "vip";
window.type = "visitor";
window.agentUid = "201810201811085";
(function () {
  d = document;
  s = d.createElement("script");
  s.src = "https://www.bytedesk.com/js/n.js";
  s.async = 1;
  d.getElementsByTagName("head")[0].appendChild(s);
})();
</script>
<!--./萝卜丝·智能客服代码 结束 -->
```

- adminUid：管理员唯一ID，可在客服管理->客服账号页面查看
- workGroupWid：工作组唯一ID，可以在客服管理->工作组页面查看
- subDomain：企业号，可在客服管理->客服账号页面查看
- type：有两个值，1. 'visitor' 代表一对一会话，'workGroup' 为工作组会话
- agentUid：为一对一会话指定客服账号唯一ID，必须；工作组会话值设置为空，但需要保留参数
