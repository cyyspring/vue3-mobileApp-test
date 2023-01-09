<template>
  <van-tabbar v-model="active" active-color="#ff9854">
    <van-tabbar-item
      v-for="menuItem in tabbarData"
      :key="menuItem.path"
      :to="menuItem.path"
    >
      <span>{{ menuItem.text }}</span>
      <template #icon="{ active }">
        <img
          :src="
            active
              ? getAssetURL(menuItem.imageActive)
              : getAssetURL(menuItem.image)
          "
        />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup>
import { ref } from "vue";
import { getAssetURL } from "@/utils/load_assets";

const active = ref(0);

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

<style lang="less" scoped></style>
