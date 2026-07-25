# TODO

- [x] 参考vipleveldemo中，给basicdemo、userinfodemo中参数增加：请对该参数值使用 encodeURIComponent 编码 说明
- [x] 将访客小明、访客小红、访客小美，修改为 用户小明、用户小红、用户小美
- [x] 参考 ThreadHistoryDemo 演示排版，在TicketDemo中增加 历史工单查看、工单提交、工单状态查看、工单详情查看、消息提醒 等查看按钮，在visitorTicket项目中增加相应页面组件，并添加相应路由。用于在BytedeskWeb中使用iframe签入查看。可以参考visitor项目中TicketDrawer
- [x] 参考 ThreadHistoryDemo 演示排版，在RatingDemo中增加 待评价历史会话、支持追评 按钮
- [x] 参考 ThreadHistoryDemo 演示排版，在PlatformDemo中增加说明：使用默认组织orgUid=df_org_uid作为平台客服，其余orgUid都视为店铺客服，并且每个组织支持设置多个咨询入口：售前客服、售后客服等
- [x] 修改TicketDemo中消息提醒：通知消息提醒
- [x] 参考react-demo中实现，帮我补充完善 [examples](/Users/ningjinpeng/Desktop/Git/Github/private/bytedesk-3x/frontend/apps/visitorSdk/examples) 文件夹中其余几个demo，不要增加或减少 react-demo 中功能，尽量实现功能一比一复刻
- [x] 参考ftl和channelCode生成纯JavaScript嵌入式代码，在BasicDemo当前嵌入式代码底部再增加一个纯JavaScript版嵌入式代码，方便用户修改上述配置之后，直接复制粘贴到静态html页面中
- [x] 在 BasicDemo 中增加一个演示按钮，点击按钮弹窗用户输入自己网址，点击确定之后，打开一个新tab，使用iframe的方式嵌入显示用户输入的网址，然后在此页面显示 BasicDemo 中的当前嵌入代码。用于方便用户在自家网站预览效果。
- [x] 当在 BasicDemo中打开嵌入式窗口时，使用iframe显示的是 visitor 中 chatbox，需要支持通过拖动嵌入式窗口导航拖动整个对话窗口
- [x] 现在visitor中ChatBox页面已经支持拖动，帮我完善visitorCall中#sym:VisitorCall 使得在 #sym:CallCenterDemo 中也支持拖拽呼叫窗口
- [x] 继续在 TicketDemo 中打开 visitorTicket 中 Ticket 窗口时，也支持拖拽窗口上方导航实现拖拽
