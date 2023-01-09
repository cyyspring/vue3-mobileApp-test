<template>
  <van-nav-bar
    title="房屋详情"
    left-text="旅途"
    left-arrow
    @click-left="onClickLeft"
  />
  <div v-if="showTabControl" class="tabs">
    <span
      v-for="(item, index) in sectionEls"
      :key="index"
      :class="{ active: index === tabIndex }"
      @click="tabClick(index)"
      >{{ item.name }}</span
    >
  </div>
  <div
    class="main"
    v-if="detailInfosRef?.mainPart"
    v-memo="[detailInfosRef?.mainPart]"
  >
    <detailSwipe
      :swipe-data="detailInfosRef?.mainPart.topModule.housePicture.housePics"
    />
    <detail-infos
      :ref="getSectionRef"
      name="描述"
      :top-infos="detailInfosRef.mainPart.topModule"
    />
    <detail-facility
      name="设施"
      :ref="getSectionRef"
      :house-facility="
        detailInfosRef.mainPart?.dynamicModule.facilityModule.houseFacility
      "
    />
    <detail-comment
      name="评论"
      :ref="getSectionRef"
      :comment="detailInfosRef.mainPart?.dynamicModule.commentModule"
    />
    <detail-notice
      name="须知"
      :ref="getSectionRef"
      :order-rules="
        detailInfosRef.mainPart?.dynamicModule.rulesModule.orderRules
      "
    />

    <detail-intro :price-intro="detailInfosRef.mainPart?.introductionModule" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRouter } from "vue-router";

import detailSwipe from "./components/detail-swipe.vue";
import DetailInfos from "./components/detail_02-infos.vue";
import DetailFacility from "./components/detail_03-facility.vue";
import DetailComment from "./components/detail_05-comment.vue";
import DetailNotice from "./components/detail_06-notice.vue";
import DetailIntro from "./components/detail_08-intro.vue";

import { getDetailInfos } from "@/api/detail";

import useScroll from "@/hooks/useScroll";

const { scrollTop } = useScroll();

const showTabControl = computed(() => {
  return scrollTop.value >= 300;
});
const tabIndex = ref(0);

// 选中$ref 实例数组
const sectionEls = ref([]);

const getSectionRef = (value) => {
  if (!value) return; // 卸载时候也会触发做非空判断
  const name = value.$el.getAttribute("name");
  sectionEls.value.push({ name, el: value.$el });
};
const props = defineProps({
  id: String,
});

const detailInfosRef = ref({});

const router = useRouter();

// 点击tab 跳转到指定位置
function tabClick(index) {
  const { el } = sectionEls.value[index];

  // 获取对应的el 距离滚动的高度
  const height = el.offsetTop;
  // 如果是指定的div 容器 容器ref.value.scrollTo
  window.scrollTo({
    top: height - 48,
    behavior: "smooth",
  });
}

// 想滚动时候tab 对应，按照这个思路去改
watch(scrollTop, (newValue) => {
  // 2.根据newValue去匹配想要索引
  let index = sectionEls.value.length - 1;
  for (let i = 0; i < sectionEls.value.length; i++) {
    const values = sectionEls.value[i].el.offsetTop;
    if (values > newValue + 44) {
      index = i - 1;
      break;
    }
  }
  tabIndex.value = index;
});
// 监听返回按钮的点击
const onClickLeft = () => {
  router.back();
};

onMounted(async () => {
  const { data } = await getDetailInfos(props.id);
  console.log(data);
  detailInfosRef.value = data;
});
</script>

<style lang="less" scoped>
.tabs {
  position: fixed;
  justify-content: space-between;
  z-index: 19;
  left: 0;
  right: 0;
  top: 0;
  height: 40px;
  background-color: #fff;
  line-height: 40px;
  border-bottom: 1px solid #e2e2e2;
  display: flex;
  span {
    flex: 1;
    padding: 0 5px;
    display: flex;
    justify-content: center;
  }
  .active {
    color: #fa8c1d;
  }
}
</style>
