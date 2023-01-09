<template>
  <div>
    <homeNavBarVue />
    <div class="banner">
      <img src="@/assets/img/home/banner.webp" />
    </div>
    <homeSearchBox :hotSuggests="hotSuggests" />
    <homeCategories :categories="categories" />
    <homeContent :hotContent="hotContent" />
    <!-- 滚动距离屏幕上方360px 的时候 可以来决定是否显示搜索 -->
    <div class="search-bar" v-if="isShowSearchBar">
      <search-bar />
    </div>
    <home-content />
  </div>
</template>

<script setup>
import { onMounted, ref, watch, computed } from "vue";

import homeNavBarVue from "./components/home-nav-bar.vue";
import homeSearchBox from "./components/home-search-box.vue";
import homeCategories from "./components/home-categories.vue";
import homeContent from "./components/home-content.vue";
import searchBar from "./components/search-bar.vue";

import useScroll from "@/hooks/useScroll";

import {
  getHomeHotSuggests,
  getHomeCategories,
  getHomeHouselist,
} from "@/api/home";

const { isReachBottom, scrollTop } = useScroll();

const hotSuggests = ref([]);
const categories = ref([]);
const hotContent = ref([]);

const isShowSearchBar = computed(() => {
  return scrollTop.value >= 360;
});

let pageNum = 1;

onMounted(async () => {
  const [hs, hc, hl] = await Promise.all([
    getHomeHotSuggests(),
    getHomeCategories(),
    getHomeHouselist(pageNum),
  ]);

  hotSuggests.value = hs.data;
  categories.value = hc.data;
  hotContent.value = hl.data;
});

watch(isReachBottom, (newValue) => {
  if (newValue) {
    getHomeHouselist(++pageNum)
      .then((res) => {
        isReachBottom.value = false;
        hotContent.value.push(...res.data);
      })
      .catch(() => {
        --pageNum;
      });
  }
});
</script>

<style lang="less" scoped>
.banner {
  img {
    width: 100%;
  }
}
.search-bar {
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  right: 0;
  height: 45px;
  padding: 16px 16px 10px;
  background-color: #fff;
}
</style>
