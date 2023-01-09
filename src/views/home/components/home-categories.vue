<template>
  <div class="home-category">
    <div
      v-for="category in categories"
      :key="category.id"
      class="home-category-item"
    >
      <img :src="category.pictureUrl" />
      <span class="text">{{ category.title }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  categories: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="less" scoped>
.home-category {
  display: flex;
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }
  &-item {
    width: 70px;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0; // 当父元素缩小时候子元素不按照等比例压缩

    img {
      width: 32px;
      height: 32px;
    }

    .text {
      font-size: 12px;
      margin-top: 8px;
    }
  }
}
</style>
