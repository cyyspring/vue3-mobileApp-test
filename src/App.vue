<template>
  <div class="app">
    <router-view v-slot="{ Component }">
      <!-- 进行缓存，重复进入city页面不会在请求接口触发 -->
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
    <TabBarVant v-if="isShowTabBar" />
    <!-- <TabBarCommon /> -->
    <!-- <TabBarCpns /> -->
  </div>
</template>

<script setup>
// import { TabBarCommon } from "@/components/tab-bar-common";
// import TabBarCpns from "@/components/tab-bar-cpns";
import TabBarVant from "@/components/tab-bar-vant";
import { useRoute } from "vue-router";
import { computed } from "vue";
const route = useRoute();

const isShowTabBar = computed(() => route.meta.isShowTabBar);
</script>

<style lang="less" scoped></style>
