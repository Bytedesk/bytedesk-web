import { useRef as d, useEffect as o } from "react";
import r from "../core/BytedeskWeb/index.js";
const l = ({ placement: i, ...t }) => {
  const e = d(null);
  return o(() => {
    if (e.current) {
      e.current.destroy();
      const n = i === "bottom-left" ? "left" : "right", c = {
        ...t,
        placement: i,
        theme: {
          ...t.theme,
          position: n
        },
        window: {
          ...t.window,
          position: n
        }
      };
      e.current = new r(c), e.current.init();
    }
  }, [i]), o(() => {
    var n;
    return console.log("Creating BytedeskWeb instance..."), e.current = new r({
      ...t,
      placement: i
    }), e.current && (console.log("BytedeskWeb instance created, initializing..."), e.current.init(), window.bytedesk = e.current, console.log("BytedeskWeb instance exposed to window.bytedesk"), (n = t.onInit) == null || n.call(t)), () => {
      console.log("Cleaning up BytedeskWeb instance..."), e.current && (e.current.destroy(), e.current = null, delete window.bytedesk);
    };
  }, []), null;
};
export {
  l as BytedeskReact
};
