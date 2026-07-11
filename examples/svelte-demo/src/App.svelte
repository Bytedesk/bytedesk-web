<script lang="ts">
  import { onMount } from 'svelte'
  // @ts-ignore
  import BytedeskWeb from '@bytedesk/web/main'

  let bytedesk: BytedeskWeb
  let chatType: 'agent' | 'workgroup' | 'robot' = 'robot'
  let themeColor = '#1677ff'
  let showBubble = true
  let showButton = true

  const chatConfigs = {
    agent: { t: '0', sid: 'df_rt_uid', label: '一对一客服' },
    workgroup: { t: '1', sid: 'df_wg_uid', label: '工作组' },
    robot: { t: '2', sid: 'df_rt_uid', label: '机器人' },
  }

  const colors = ['#1677ff', '#ff4d4f', '#52c41a', '#faad14', '#722ed1']

  $: currentConfig = chatConfigs[chatType]

  $: config = {
    isDebug: true,
    apiUrl: 'https://api.weiyuai.cn',
    htmlUrl: 'https://cdn.weiyuai.cn/chat',
    placement: 'bottom-right' as const,
    marginBottom: 20,
    marginSide: 20,
    autoPopup: false,
    draggable: true,
    inviteConfig: { show: false },
    bubbleConfig: {
      show: showBubble,
      icon: '👋',
      title: '需要帮助吗？',
      subtitle: '点击开始对话'
    },
    buttonConfig: { show: showButton, width: 60, height: 60 },
    theme: {
      mode: 'light' as const,
      backgroundColor: themeColor,
      textColor: '#ffffff'
    },
    chatConfig: {
      org: 'df_org_uid',
      t: currentConfig.t,
      sid: currentConfig.sid,
    },
    locale: 'zh-cn',
  }

  onMount(() => {
    bytedesk = new BytedeskWeb(config)
    bytedesk.init()
    console.log('Bytedesk initialized in Svelte')
  })

  function showChat() { bytedesk?.showChat() }
  function hideChat() { bytedesk?.hideChat() }
  function toggleBubble() { showBubble = !showBubble }
</script>

<main class="container">
  <h1>微语 Svelte Demo</h1>
  <p class="desc">Bytedesk Svelte integration with full control panel</p>

  <section class="card">
    <h3>选择客服类型</h3>
    <div class="btn-group">
      {#each Object.entries(chatConfigs) as [key, cfg]}
        <button
          class="chip"
          class:active={chatType === key}
          on:click={() => chatType = key as typeof chatType}
        >
          {cfg.label}
        </button>
      {/each}
    </div>
  </section>

  <section class="card">
    <h3>主题色</h3>
    <div class="btn-group">
      {#each colors as color}
        <button
          class="color-btn"
          class:selected={themeColor === color}
          style="background-color: {color}"
          on:click={() => themeColor = color}
        />
      {/each}
    </div>
  </section>

  <section class="card">
    <h3>控制面板</h3>
    <div class="btn-group">
      <button class="btn primary" on:click={showChat}>打开聊天</button>
      <button class="btn danger" on:click={hideChat}>关闭聊天</button>
      <button class="btn" on:click={toggleBubble}>
        {showBubble ? '隐藏' : '显示'}气泡
      </button>
    </div>
  </section>

  <section class="card">
    <h3>当前配置</h3>
    <pre><code>{JSON.stringify({ chatConfig: config.chatConfig, theme: config.theme }, null, 2)}</code></pre>
  </section>
</main>

<style>
  .container { max-width: 800px; margin: 0 auto; padding: 24px; font-family: -apple-system, BlinkMacSystemFont, sans-serif; }
  h1 { font-size: 24px; margin-bottom: 4px; }
  .desc { color: #666; margin-bottom: 24px; }
  .card { background: #fff; border-radius: 8px; padding: 24px; margin-bottom: 16px; }
  h3 { margin: 0 0 12px; font-size: 16px; }
  .btn-group { display: flex; gap: 8px; flex-wrap: wrap; }
  .chip { padding: 8px 20px; border: 1px solid #d9d9d9; border-radius: 6px; background: #fff; cursor: pointer; font-size: 13px; font-weight: 500; }
  .chip.active { border-color: #1677ff; background: #e6f4ff; color: #1677ff; }
  .color-btn { width: 32px; height: 32px; border-radius: 50%; border: 2px solid #d9d9d9; cursor: pointer; }
  .color-btn.selected { border-color: #333; border-width: 3px; }
  .btn { padding: 8px 16px; border: 1px solid #d9d9d9; border-radius: 6px; background: #fff; cursor: pointer; font-size: 13px; }
  .btn.primary { background: #1677ff; color: #fff; border-color: #1677ff; }
  .btn.danger { background: #ff4d4f; color: #fff; border-color: #ff4d4f; }
  pre { background: #f6f8fa; padding: 12px; border-radius: 6px; font-size: 12px; overflow: auto; margin: 0; }
</style> 