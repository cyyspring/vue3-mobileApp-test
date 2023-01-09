<template>
  <div class="content">
    <h2 class="title">热门精选</h2>
    <div class="list">
      <template v-for="item in hotContent" :key="item.data.houseId">
        <component
          :is="item.discoveryContentType === 9 ? HouseItemV9 : HouseItemV3"
          :item-data="item.data"
          @click="itemClick(item.data)"
        />
      </template>
    </div>
  </div>
</template>
<script setup>
import HouseItemV9 from "@/components/house-item-v9";
import HouseItemV3 from "@/components/house-item-v3";

import { useRouter } from "vue-router";

defineProps({
  hotContent: {
    type: Array,
    default: () => [],
  },
});

const router = useRouter();
const itemClick = (item) => {
  // 跳转到Detail页面
  router.push("/detail/" + item.houseId);
};
</script>
<style lang="less">
.content {
  padding: 10px 8px;

  .title {
    font-size: 22px;
    padding: 10px;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
