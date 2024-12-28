import BytedeskWeb from '@bytedesk/web/main'

const bytedesk = new BytedeskWeb({
  appId: 'your-app-id'
})

bytedesk.init()

document.querySelector('#chat-button').addEventListener('click', () => {
  bytedesk.showChat()
}) 