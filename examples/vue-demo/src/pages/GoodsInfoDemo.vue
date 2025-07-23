<template>
  <div style="height: 100%; overflow-y: auto; box-sizing: border-box; background: transparent">
    <div style="padding: 24px; background: transparent; border-radius: 8px">
      <h2>商品信息对接演示</h2>
      <p>
        本示例演示如何通过配置参数传入商品信息（uid、title、image、description、price、url）到客服组件中。
        点击下方按钮可以打开客服窗口，商品信息会自动传递给客服。
        <br />
        <a
          href="https://www.weiyuai.cn/docs/zh-CN/docs/development/goodsinfo"
          target="_blank"
          rel="noopener noreferrer"
          style="color: #2e88ff"
        >
          查看商品信息对接文档
        </a>
      </p>

      <div class="card">
        <h3>商品信息：</h3>
        <div class="product-grid">
          <div class="product-image">
            <img :src="currentGoods.image" :alt="currentGoods.title" class="img-responsive" />
          </div>
          <div class="product-info">
            <h2>{{ currentGoods.title }}</h2>
            <div class="tags">
              <span v-for="(tag, index) in currentGoods.tagList" :key="index" class="tag">{{ tag }}</span>
            </div>
            <p class="description">{{ currentGoods.description }}</p>
            <p class="price">¥{{ currentGoods.price.toLocaleString() }}</p>
            <button class="large-button" @click="handleShowChat">
              咨询客服
            </button>
          </div>
        </div>
      </div>

      <div class="card">
        <h3>微语 接口控制面板</h3>
        <hr />
        <div class="control-grid">
          <div class="control-card">
            <h4>聊天窗口控制</h4>
            <div class="vertical-space">
              <div class="button-group">
                <button @click="handleShowChat">显示聊天窗口</button>
                <button @click="handleHideChat">隐藏聊天窗口</button>
              </div>
              <p class="note">
                调用代码：bytedesk.showChat() / bytedesk.hideChat()
              </p>
            </div>
          </div>
        </div>
      </div>

      <BytedeskVue v-bind="config" @init="handleInit" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from 'vue';
// @ts-ignore
import { BytedeskVue } from '@bytedesk/web/adapters/vue';
// @ts-ignore
import type { BytedeskConfig } from '@bytedesk/web/types';

// 定义商品信息接口
interface GoodsInfo {
  uid: string;
  title: string;
  image: string;
  description: string;
  price: number;
  url: string;
  tagList: string[];
  extra: string;
}

export default defineComponent({
  name: 'GoodsInfoDemo',
  components: {
    BytedeskVue
  },
  setup() {
    // 定义测试商品
    const currentGoods = reactive<GoodsInfo>({
      uid: 'goods_001',
      title: '比亚迪 仰望U7 豪华纯电动轿车',
      image: 'https://www.weiyuai.cn/assets/images/car/yu7.jpg',
      description: '比亚迪仰望U7是一款豪华纯电动轿车，采用最新一代刀片电池技术，续航里程可达1000公里。配备智能驾驶辅助系统，支持L3级别自动驾驶。内饰采用高级真皮材质，配备全景天窗、智能座舱等豪华配置。',
      price: 299900,
      url: 'https://www.weiyuai.cn/assets/images/car/yu7.jpg',
      tagList: ['新能源', '豪华轿车', '智能驾驶', '长续航'],
      extra: JSON.stringify({
        extraText: 'goodsExtraText',
        extraName: 'goodsExtraName'
      })
    });

    const bytedeskInstance = ref<any>(null);

    // 配置客服组件
    const config = ref<BytedeskConfig>({
      ...(process.env.NODE_ENV === 'development' ? { htmlUrl: 'http://127.0.0.1:9006' } : {}),
      placement: 'bottom-right',
      autoPopup: false,
      inviteConfig: {
        show: false,
        text: '您好，请问有什么可以帮您？',
      },
      marginBottom: 20,
      marginSide: 20,
      buttonConfig: {
        show: false,
      },
      bubbleConfig: {
        show: false,
        icon: '🚗',
        title: '想了解更多？',
        subtitle: '点击咨询客服'
      },
      chatConfig: {
        org: 'df_org_uid',
        t: "1",
        sid: 'df_wg_uid',
        // 传入商品信息
        visitorUid: 'visitor_001',
        nickname: '访客小明',
        avatar: 'https://weiyuai.cn/assets/images/avatar/02.jpg',
        // 商品信息通过自定义消息发送
        goodsInfo: JSON.stringify({
          uid: currentGoods.uid,
          title: currentGoods.title,
          image: currentGoods.image,
          description: currentGoods.description,
          price: currentGoods.price,
          url: currentGoods.url,
          tagList: currentGoods.tagList,
          extra: currentGoods.extra
        }),
        // 自定义字段，可以传递任何字段
        extra: JSON.stringify({
          type: 'type',
          test: 'test'
        })
      },
      locale: 'zh-cn',
    });

    const handleInit = (instance: any) => {
      console.log('BytedeskVue initialized');
      bytedeskInstance.value = instance;
    };

    // Bytedesk 接口控制函数
    const handleShowChat = () => {
      console.log("showChat");
      bytedeskInstance.value?.showChat();
    };

    const handleHideChat = () => {
      console.log("hideChat");
      bytedeskInstance.value?.hideChat();
    };

    return {
      currentGoods,
      config,
      bytedeskInstance,
      handleInit,
      handleShowChat,
      handleHideChat
    };
  }
});
</script>

<style scoped>
.card {
  margin-top: 20px;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
}

.product-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

@media (max-width: 768px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
}

.product-image img {
  width: 100%;
  border-radius: 8px;
  max-height: 300px;
  object-fit: cover;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  background-color: #e6f7ff;
  color: #1890ff;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
}

.description {
  color: #666;
  line-height: 1.5;
}

.price {
  font-size: 24px;
  font-weight: bold;
  color: #f5222d;
}

.vertical-space {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.button-group {
  display: flex;
  gap: 10px;
}

.large-button {
  padding: 12px 24px;
  background-color: #2e88ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  align-self: flex-start;
}

.control-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
}

.control-card {
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 10px;
  margin-top: 10px;
}

.note {
  font-size: 12px;
  color: #888;
  margin-top: 5px;
}

button {
  padding: 8px 16px;
  background-color: #f5f5f5;
  color: #333;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #e0e0e0;
}
</style>
