import i from "../core/BytedeskWeb/index.js";
const d = (t) => {
  let e = null;
  return e = new i(t), e.init(), t.onInit && t.onInit(), {
    update(n) {
      e && e.destroy(), e = new i(n), e.init(), n.onInit && n.onInit();
    },
    destroy() {
      e && (e.destroy(), e = null);
    }
  };
};
export {
  d as BytedeskSvelte
};
