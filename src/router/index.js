import { createRouter, createWebHistory } from "vue-router";
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/home",
      alias: "/",
      meta: {
        isShowTabBar: true,
      },
      component: () => import("@/views/home/index.vue"),
    },
    {
      path: "/message",
      meta: {
        isShowTabBar: true,
      },
      component: () => import("@/views/message/index.vue"),
    },
    {
      path: "/order",
      meta: {
        isShowTabBar: true,
      },
      component: () => import("@/views/order/index.vue"),
    },
    {
      path: "/favor",
      meta: {
        isShowTabBar: true,
      },
      component: () => import("@/views/favor/index.vue"),
    },
    {
      path: "/city",
      meta: {
        isShowTabBar: true,
      },
      component: () => import("@/views/city/index.vue"),
    },
    {
      path: "/detail/:id",
      props: true,
      component: () => import("@/views/detail/index.vue"),
    },
  ],
  strict: true, // 严格检查路径末尾不能有 /
});

export default function setupRouter(app) {
  app.use(router);
}
