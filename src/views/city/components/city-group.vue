<template>
  <div class="city-group">
    <van-index-bar :sticky="false" :index-list="indexList">
      <van-index-anchor :index="hotCitiesRef.group" />
      <div class="list">
        <template v-for="(city, index) in hotCitiesRef.cities" :key="index">
          <div class="city" @click="selectedCity(city)">
            {{ city.cityName }}
          </div>
        </template>
      </div>

      <template v-for="(group, index) in cities" :key="index">
        <van-index-anchor :index="group.group" />
        <template v-for="(city, indey) in group.cities" :key="indey">
          <van-cell :title="city.cityName" @click="selectedCity(city)" />
        </template>
      </template>
    </van-index-bar>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useCityStore } from "@/stores/modules/city";
import { useRouter } from "vue-router";

const props = defineProps({
  hotCities: {
    type: Array,
    default: () => [],
  },
  cities: {
    type: Array,
    default: () => [],
  },
});

const cityStore = useCityStore();
const router = useRouter();
// 选中城市全局保存
function selectedCity(cityInfo) {
  cityStore.cityInfo = cityInfo;
  router.back();
}

// 热门城市
const hotCitiesRef = computed(() => {
  return { group: "热门", cities: props.hotCities };
});

// 动态的索引
const indexList = computed(() => {
  const list = props.cities.map((item) => item.group);
  list.unshift("#");
  return list;
});
</script>

<style lang="less" scoped>
.city-group {
  height: calc(100vh - 98px);
  overflow-y: auto;
  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 10px;
    padding-right: 25px;

    .city {
      width: 70px;
      height: 28px;
      border-radius: 14px;
      font-size: 12px;
      color: #000;
      text-align: center;
      line-height: 28px;
      background-color: #fff4ec;
      margin: 6px 0;
    }
  }
}
</style>
