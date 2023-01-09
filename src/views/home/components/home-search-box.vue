<template>
  <div class="search-box">
    <!-- 位置信息 -->
    <div class="location">
      <RouterLink custom v-slot="{ navigate }" to="/city">
        <span @click="navigate">{{ getCityName }}</span>
      </RouterLink>
      <div class="position">
        <span>我的位置</span>
        <img src="@/assets/img/home/icon_location.png" />
      </div>
    </div>
    <!-- 日期范围 -->
    <div class="date-range" @click="showCalendar = true">
      <div class="start">
        <span>入住</span>
        <span>{{ getStartTime }}</span>
      </div>
      <div class="days">共 {{ getDiffDays }}晚</div>
      <div class="end">
        <span>离店</span>
        <span>{{ getEndTime }}</span>
      </div>
    </div>

    <!-- 价格/人数选择 -->
    <div class="price-counter">
      <div class="start">价格不限</div>
      <div class="end">人数不限</div>
    </div>
    <!-- 关键字 -->
    <div class="keyword">关键字/位置/民宿名</div>

    <!-- 热门建议 -->
    <div class="section hot-suggests">
      <template v-for="(item, index) in hotSuggests" :key="index">
        <div
          class="item"
          :style="{
            color: item.tagText.color,
            background: item.tagText.background.color,
          }"
        >
          {{ item.tagText.text }}
        </div>
      </template>
    </div>

    <!-- 搜索按钮 -->
    <div class="section search-btn">
      <div class="btn" @click="searchBtnClick">开始搜索</div>
    </div>
    <!-- 日历 -->
    <van-calendar
      :default-date="[new Date(startTime), new Date(endTime)]"
      v-model:show="showCalendar"
      type="range"
      color="#ff9854"
      :round="false"
      :show-confirm="false"
      @confirm="onConfirm"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCityStore } from "@/stores/modules/city";
import { storeToRefs } from "pinia";

import useShowTime from "../hooks/useShowTime";

defineProps({
  hotSuggests: {
    type: Array,
    default: () => [],
  },
});

const { getCityName } = storeToRefs(useCityStore());
const showCalendar = ref(false);

const { startTime, endTime, getStartTime, getEndTime, getDiffDays } =
  useShowTime();

// 选中日历
function onConfirm([st, endt]) {
  startTime.value = st;
  endTime.value = endt;
}

function searchBtnClick() {}
</script>

<style lang="less" scoped>
.search-box {
  padding: 0 20px;
  --van-calendar-popup-height: 100%;
}
.section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  color: #999;
  height: 44px;
}
.location {
  display: flex;

  justify-content: space-between;
  height: 44px;
  line-height: 44px;
  .position {
    display: flex;
    align-items: baseline;
    img {
      position: relative;
      top: 2px;
      margin-left: 5px;
      width: 18px;
      height: 18px;
    }
  }
}
.date-range {
  display: flex;
  justify-content: space-between;
  .start,
  .end {
    display: flex;
    flex-direction: column;
    width: 84px;
    span:nth-child(1) {
      color: #999;
    }

    .days {
      display: flex;
      align-items: center;
    }
  }
}
.price-counter {
  display: flex;
  justify-content: space-between;
  color: #999;
  padding: 10px 0;
  div {
    width: 84px;
  }
}
.keyword {
  padding: 10px 0;
}

.hot-suggests {
  margin: 10px 0;
  height: auto;

  .item {
    padding: 4px 8px;
    margin: 4px;
    border-radius: 14px;
    font-size: 12px;
    line-height: 1;
  }
}
.search-btn {
  .btn {
    width: 342px;
    height: 38px;
    max-height: 50px;
    font-weight: 500;
    font-size: 18px;
    line-height: 38px;
    text-align: center;
    border-radius: 20px;
    color: #fff;
    background-image: linear-gradient(90deg, #fa8c1d, #fcaf3f);
  }
}
</style>
