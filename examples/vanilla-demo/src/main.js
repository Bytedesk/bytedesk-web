/*
 * @Author: jackning 270580156@qq.com
 * @Date: 2024-12-28 13:27:53
 * @LastEditors: jackning 270580156@qq.com
 * @LastEditTime: 2024-12-31 12:21:21
 * @Description: bytedesk.com https://github.com/Bytedesk/bytedesk
 *   Please be aware of the BSL license restrictions before installing Bytedesk IM – 
 *  selling, reselling, or hosting Bytedesk IM as a service is a breach of the terms and automatically terminates your rights under the license. 
 *  仅支持企业内部员工自用，严禁私自用于销售、二次销售或者部署SaaS方式销售 
 *  Business Source License 1.1: https://github.com/Bytedesk/bytedesk/blob/main/LICENSE 
 *  contact: 270580156@qq.com 
 *  联系：270580156@qq.com
 * Copyright (c) 2024 by bytedesk.com, All Rights Reserved. 
 */
import BytedeskWeb from '@bytedesk/web/main'

const bytedesk = new BytedeskWeb({
  appId: 'your-app-id'
})

bytedesk.init()

document.querySelector('#chat-button').addEventListener('click', () => {
  bytedesk.showChat()
}) 