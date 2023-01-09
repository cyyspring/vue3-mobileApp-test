<template>
  <RouterLink :to="menuItem.path" custom v-slot="{ navigate, isExactActive }">
    <div class="tar-bar-item" @click="navigate">
      <img
        :src="
          isExactActive
            ? getAssetURL(menuItem.imageActive)
            : getAssetURL(menuItem.image)
        "
      />
      <span :class="['text', { active: isExactActive }]">{{
        menuItem.text
      }}</span>
    </div>
  </RouterLink>
</template>

<script setup>
import { getAssetURL } from "@/utils/load_assets";

// 定义item 数据
defineProps({
  menuItem: {
    type: Object,
    default: () => ({
      path: "",
      image: "",
      imageActive: "",
      text: "",
    }),
  },
});
</script>

<style lang="less" scoped>
.tar-bar-item {
  --primary-color: #ff9854;

  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  img {
    width: 36px;
  }

  .text {
    font-size: 12px;
    margin-top: 2px;
    &.active {
      color: var(--primary-color);
    }
  }
}
</style>
