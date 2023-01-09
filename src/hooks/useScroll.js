import { onMounted, onUnmounted, ref } from "vue";

// export default function useScroll(reachBottomCB) {
//   const scrollListenerHandler = () => {
//     const clientHeight = document.documentElement.clientHeight
//     const scrollTop = document.documentElement.scrollTop
//     const scrollHeight = document.documentElement.scrollHeight
//     console.log("-------")
//     if (clientHeight + scrollTop >= scrollHeight) {
//       console.log("滚动到底部了")
//       if (reachBottomCB) reachBottomCB()
//     }
//   }

//   onMounted(() => {
//     window.addEventListener("scroll", scrollListenerHandler)
//   })

//   onUnmounted(() => {
//     window.removeEventListener("scroll", scrollListenerHandler)
//   })
// }

export default function useScroll(elRef) {
  let el = window;

  const isReachBottom = ref(false);

  const clientHeight = ref(0);
  const scrollTop = ref(0);
  const scrollHeight = ref(0);

  // 防抖/节流
  const scrollListenerHandler = () => {
    if (el === window) {
      clientHeight.value = document.documentElement.clientHeight;
      scrollTop.value = document.documentElement.scrollTop;
      scrollHeight.value = document.documentElement.scrollHeight;
    } else {
      clientHeight.value = el.clientHeight;
      scrollTop.value = el.scrollTop;
      scrollHeight.value = el.scrollHeight;
    }
    if (clientHeight.value + scrollTop.value >= scrollHeight.value) {
      console.log("滚动到底部了");
      isReachBottom.value = true; // 记录属性
    }
  };

  onMounted(() => {
    if (elRef) el = elRef.value;
    el.addEventListener("scroll", scrollListenerHandler);
  });

  onUnmounted(() => {
    el.removeEventListener("scroll", scrollListenerHandler);
  });

  return { isReachBottom, clientHeight, scrollTop, scrollHeight };
}
