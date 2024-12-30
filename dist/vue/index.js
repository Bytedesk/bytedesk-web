import { defineComponent as l, ref as u, onMounted as i, onUnmounted as r } from "vue";
import a from "../core/BytedeskWeb/index.js";
const f = l({
  name: "BytedeskVue",
  props: {
    placement: {
      type: String,
      required: !0,
      validator: (e) => ["bottom-left", "bottom-right"].includes(e)
    },
    onInit: {
      type: Function,
      default: null
    }
  },
  setup(e, { attrs: n }) {
    const t = u(null);
    return i(() => {
      const o = {
        ...n,
        placement: e.placement
      };
      t.value = new a(o), t.value.init(), e.onInit && e.onInit();
    }), r(() => {
      t.value && (t.value.destroy(), t.value = null);
    }), () => null;
  }
});
export {
  f as BytedeskVue
};
