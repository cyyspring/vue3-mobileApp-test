<template>
  <div class="city">
    <div class="city-search">
      <van-search
        shape="round"
        v-model="searchVal"
        show-action
        placeholder="城市/区域/位置"
      />
    </div>
    <van-tabs v-model:active="active" color="#ff9854" line-height="3">
      <template v-for="(val, key) in allCitiesRef" :key="key">
        <van-tab :title="val?.title">
          <cityGroup :hotCities="val?.hotCities" :cities="val?.cities" />
        </van-tab>
      </template>
    </van-tabs>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import useInit from "./hooks/useInit";

import cityGroup from "./components/city-group.vue";

const { init, allCitiesRef } = useInit();
const searchVal = ref(""); // 搜索条件
const active = ref(0); // tab 切换

// 获取数据
onMounted(() => {
  init();
});
</script>

<style lang="less" scoped>
.city {
  // 利用定位 基于z-index 形成覆盖
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
  // 设置当前容器为滚动，如果不设置这个那么是整个页面容器滚动
  overflow-y: auto;
  &-search {
    --van-search-left-icon-color: #ff9854;
    --van-search-action-text-color: #000;
  }
}
</style>
