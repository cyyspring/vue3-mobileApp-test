<template>
  <div class="nav-bar">
    <span class="title">弘源旅途</span>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.nav-bar {
  height: 50px;
  display: flex;
  justify-content: center;
  height: 46px;
  border-bottom: 1px solid #f2f2f2;
  --primary-color: #ff9854;
  line-height: 46px;

  .title {
    color: var(--primary-color);
    font-size: 16px;
    font-weight: 600;
  }
}
</style>
