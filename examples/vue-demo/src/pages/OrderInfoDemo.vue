<template>
  <div style="height: 100%; overflow-y: auto; box-sizing: border-box; background: transparent">
    <div style="padding: 24px; background: transparent; border-radius: 8px">
      <h2>订单信息对接演示</h2>
      <p>
        本示例演示如何通过配置参数传入订单信息到客服组件中。
        点击下方按钮可以打开客服窗口，订单信息会自动传递给客服。
        <br />
        <a
          href="https://www.weiyuai.cn/docs/zh-CN/docs/development/orderinfo"
          target="_blank"
          rel="noopener noreferrer"
          style="color: #2e88ff"
        >
          查看订单信息对接文档
        </a>
      </p>

      <div class="card">
        <div class="vertical-space">
          <h3>订单状态</h3>
          <div class="steps">
            <div 
              v-for="(step, index) in orderSteps" 
              :key="index"
              class="step"
              :class="{ 
                'step-finish': step.status === 'finish',
                'step-process': step.status === 'process',
                'step-wait': step.status === 'wait'
              }"
            >
              <div class="step-indicator"></div>
              <div class="step-title">{{ step.title }}</div>
            </div>
          </div>
        </div>

        <div class="vertical-space">
          <h3>订单信息</h3>
          <table class="order-table">
            <tbody>
              <tr>
                <th>订单编号</th>
                <td>{{ currentOrder.uid }}</td>
                <th>下单时间</th>
                <td>{{ currentOrder.time }}</td>
              </tr>
              <tr>
                <th>订单状态</th>
                <td><span class="status-tag">{{ currentOrder.statusText }}</span></td>
                <th>支付方式</th>
                <td>{{ currentOrder.paymentMethod }}</td>
              </tr>
              <tr>
                <th>订单金额</th>
                <td colspan="3" class="price">¥{{ currentOrder.totalAmount.toLocaleString() }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="vertical-space">
          <h3>商品信息</h3>
          <div class="product-grid">
            <div class="product-image">
              <img :src="currentOrder.orderImage" :alt="currentOrder.orderTitle" class="img-responsive" />
            </div>
            <div>
              <h4>{{ currentOrder.orderTitle }}</h4>
              <p>单价：¥{{ currentOrder.orderPrice.toLocaleString() }}</p>
              <p>数量：{{ currentOrder.orderQuantity }}</p>
            </div>
          </div>
        </div>

        <div class="vertical-space">
          <h3>收货信息</h3>
          <table class="order-table">
            <tbody>
              <tr>
                <th>收货人</th>
                <td>{{ currentOrder.shippingAddress.name }}</td>
              </tr>
              <tr>
                <th>联系电话</th>
                <td>{{ currentOrder.shippingAddress.phone }}</td>
              </tr>
              <tr>
                <th>收货地址</th>
                <td>{{ currentOrder.shippingAddress.address }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="center">
          <button class="large-button" @click="handleShowChat">
            咨询客服
          </button>
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
import { defineComponent, ref, reactive, computed } from 'vue';
// @ts-ignore
import { BytedeskVue } from '@bytedesk/web/adapters/vue';
// @ts-ignore
import type { BytedeskConfig } from '@bytedesk/web/types';

// 定义商品信息接口
interface OrderInfo {
  orderUid: string;
  type: string;
  title: string;
  description: string;
  state: string;
  navigateToPath: string;
  time: string;
  status: 'pending' | 'paid' | 'shipped' | 'delivered';
  statusText: string;
  orderTitle: string;
  orderImage: string;
  orderDescription: string;
  orderPrice: number;
  orderUrl: string;
  orderTagList: string[];
  orderExtra: string;
  orderQuantity: number;
  totalAmount: number;
  shopUid: string;
  visitorUid: string;
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
  };
  paymentMethod: string;
  extra: string;
}

export default defineComponent({
  name: 'OrderInfoDemo',
  components: {
    BytedeskVue
  },
  setup() {
    // 定义测试订单
    const currentOrder = reactive<OrderInfo>({
      orderUid: 'ORD202505270001',
      type: 'order',
      title: '比亚迪 仰望U7 豪华纯电动轿车订单',
      description: '订单商品快照',
      state: 'paid',
      navigateToPath: '/pages/order/detail/index?type=order&orderUid=ORD202505270001&shopUid=shop_001',
      time: '2025-05-27 14:30:00',
      status: 'paid',
      statusText: '已支付',
      orderTitle: '比亚迪 仰望U7 豪华纯电动轿车',
      orderImage: 'https://www.weiyuai.cn/assets/images/car/yu7.jpg',
      orderDescription: '比亚迪仰望U7是一款豪华纯电动轿车，采用最新一代刀片电池技术，续航里程可达1000公里。配备智能驾驶辅助系统，支持L3级别自动驾驶。内饰采用高级真皮材质，配备全景天窗、智能座舱等豪华配置。',
      orderPrice: 299900,
      orderUrl: 'https://www.weiyuai.cn/car/yu7',
      orderTagList: ['新能源', '豪华轿车', '智能驾驶', '长续航'],
      orderExtra: JSON.stringify({
        extraText: 'goodsExtraText',
        extraName: 'goodsExtraName'
      }),
      orderQuantity: 1,
      totalAmount: 299900,
      shopUid: 'shop_001',
      visitorUid: 'visitor_001',
      shippingAddress: {
        name: '张三',
        phone: '13800138000',
        address: '北京市朝阳区建国路88号'
      },
      paymentMethod: '微信支付',
      extra: JSON.stringify({
        extraText: 'orderExtraText',
        extraName: 'orderExtraName'
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
        icon: '📦',
        title: '订单有问题？',
        subtitle: '点击咨询客服'
      },
      chatConfig: {
        org: 'df_org_uid',
        t: "1",
        sid: 'df_wg_uid',
        visitorUid: 'visitor_001',
        nickname: '访客小明',
        avatar: 'https://weiyuai.cn/assets/images/avatar/02.jpg',
        // 订单信息通过自定义消息发送
        orderInfo: JSON.stringify({
          orderUid: currentOrder.orderUid,
          type: currentOrder.type,
          title: currentOrder.title,
          description: currentOrder.description,
          state: currentOrder.state,
          navigateToPath: currentOrder.navigateToPath,
          time: currentOrder.time,
          status: currentOrder.status,
          statusText: currentOrder.statusText,
          orderTitle: currentOrder.orderTitle,
          orderImage: currentOrder.orderImage,
          orderDescription: currentOrder.orderDescription,
          orderPrice: currentOrder.orderPrice,
          orderUrl: currentOrder.orderUrl,
          orderTagList: currentOrder.orderTagList,
          orderExtra: currentOrder.orderExtra,
          orderQuantity: currentOrder.orderQuantity,
          totalAmount: currentOrder.totalAmount,
          shopUid: currentOrder.shopUid,
          visitorUid: currentOrder.visitorUid,
          shippingAddress: currentOrder.shippingAddress,
          paymentMethod: currentOrder.paymentMethod,
          extra: currentOrder.extra
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

    // 获取订单状态步骤
    const orderSteps = computed(() => {
      type StepStatus = 'wait' | 'process' | 'finish';
      interface OrderStep {
        title: string;
        status: StepStatus;
      }

      const steps: OrderStep[] = [
        { title: '待支付', status: 'wait' },
        { title: '已支付', status: 'wait' },
        { title: '已发货', status: 'wait' },
        { title: '已完成', status: 'wait' }
      ];

      const statusIndex: Record<string, number> = {
        'pending': 0,
        'paid': 1,
        'shipped': 2,
        'delivered': 3
      };

      const currentIndex = statusIndex[currentOrder.status];
      steps.forEach((step, index) => {
        if (index < currentIndex) {
          step.status = 'finish';
        } else if (index === currentIndex) {
          step.status = 'process';
        }
      });

      return steps;
    });

    return {
      currentOrder,
      config,
      bytedeskInstance,
      orderSteps,
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

.vertical-space {
  margin-bottom: 24px;
}

.steps {
  display: flex;
  justify-content: space-between;
  position: relative;
  margin: 20px 0;
}

.steps::before {
  content: '';
  position: absolute;
  top: 12px;
  left: 0;
  right: 0;
  height: 2px;
  background: #eee;
  z-index: 1;
}

.step {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  flex: 1;
}

.step-indicator {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: #eee;
  margin-bottom: 8px;
}

.step-finish .step-indicator {
  background: #52c41a;
}

.step-process .step-indicator {
  background: #1890ff;
}

.step-wait .step-indicator {
  background: #d9d9d9;
}

.order-table {
  width: 100%;
  border-collapse: collapse;
}

.order-table th, .order-table td {
  padding: 12px;
  border: 1px solid #eee;
  text-align: left;
}

.order-table th {
  background-color: #f9f9f9;
  width: 20%;
}

.status-tag {
  background-color: #1890ff;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.price {
  color: #f5222d;
  font-weight: bold;
}

.product-grid {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 16px;
}

.product-image img {
  width: 100%;
  border-radius: 4px;
}

.center {
  text-align: center;
  margin-top: 20px;
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
