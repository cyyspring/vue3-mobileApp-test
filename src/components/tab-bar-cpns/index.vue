<template>
  <div class="tar-bar">
    <template v-for="menuItem in tabbarData" :key="menuItem.path">
      <TarBarItem :menu-item="menuItem"></TarBarItem>
    </template>
  </div>
</template>

<script setup>
import TarBarItem from "./componets/tar-bar-item.vue";
const tabbarData = [
  {
    text: "首页",
    image: "tabbar/tab_home.png",
    imageActive: "tabbar/tab_home_active.png",
    path: "/home",
  },
  {
    text: "收藏",
    image: "tabbar/tab_favor.png",
    imageActive: "tabbar/tab_favor_active.png",
    path: "/favor",
  },
  {
    text: "订单",
    image: "tabbar/tab_order.png",
    imageActive: "tabbar/tab_order_active.png",
    path: "/order",
  },
  {
    text: "消息",
    image: "tabbar/tab_message.png",
    imageActive: "tabbar/tab_message.png",
    path: "/message",
  },
];
</script>

<style lang="less" scoped>
.tar-bar {
  border-top: 1px solid #f3f3f3;

  display: flex;
  position: fixed;

  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
}
</style>
