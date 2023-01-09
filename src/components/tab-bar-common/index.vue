<template>
  <div class="tab-bar">
    <router-link custom to="/home" v-slot="{ navigate, isExactActive }">
      <div class="tab-bar-item" @click="navigate">
        <img
          :src="`src/assets/img/tabbar/tab_home${
            isExactActive ? '_active' : ''
          }.png`"
          alt=""
        />
        <span :class="['text', { active: isExactActive }]">首页</span>
      </div>
    </router-link>

    <router-link custom to="/favor" v-slot="{ navigate, isExactActive }">
      <div class="tab-bar-item" @click="navigate">
        <img
          :src="`src/assets/img/tabbar/tab_favor${
            isExactActive ? '_active' : ''
          }.png`"
          alt=""
        />
        <span :class="['text', { active: isExactActive }]">收藏</span>
      </div>
    </router-link>

    <router-link custom to="/order" v-slot="{ navigate, isExactActive }">
      <div class="tab-bar-item" @click="navigate">
        <!-- 这样使用@符号 url 符合的 -->
        <!-- <img src="@/assets/img/tabbar/tab_order_active.png" alt="" /> -->
        <img
          :src="`src/assets/img/tabbar/tab_order${
            isExactActive ? '_active' : ''
          }.png`"
        />
        <span :class="['text', { active: isExactActive }]">订单</span>
      </div>
    </router-link>

    <router-link custom to="/message" v-slot="{ navigate, isExactActive }">
      <div class="tab-bar-item" @click="navigate">
        <img
          :src="`src/assets/img/tabbar/tab_message${
            isExactActive ? '_active' : ''
          }.png`"
        />
        <span :class="['text', { active: isExactActive }]">消息</span>
      </div>
    </router-link>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
.tab-bar {
  --primary-color: #ff9854;

  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  display: flex;

  border-top: 1px solid #f3f3f3;

  &-item {
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
}
</style>
