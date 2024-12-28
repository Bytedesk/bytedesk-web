<script lang="ts">
  import { onMount } from 'svelte'
  // @ts-ignore
  import BytedeskWeb from '@bytedesk/web/main'

  const appId = 'your-app-id'
  let bytedesk: BytedeskWeb

  onMount(() => {
    bytedesk = new BytedeskWeb({ appId })
    bytedesk.init()
    console.log('Bytedesk initialized in Svelte')
  })

  const showChat = () => {
    bytedesk?.showChat()
  }
</script>

<main>
  <h1>Bytedesk Svelte Demo</h1>
  <button on:click={showChat}>Open Chat</button>
</main> 