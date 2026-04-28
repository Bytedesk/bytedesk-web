<script lang="ts">
  import { onMount } from 'svelte'
  // @ts-ignore
  import BytedeskWeb from '@bytedesk/web/main'

  let bytedesk: BytedeskWeb

  const config = {
    chatConfig: {
      org: 'df_org_uid',
      t: '2',
      sid: 'df_rt_uid'
    }
  }

  onMount(() => {
    bytedesk = new BytedeskWeb(config)
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