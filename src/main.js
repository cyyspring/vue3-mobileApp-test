import { createApp } from "vue";
import App from "./App.vue";

import "@/assets/css/index.less";

import setupRouter from "./router";
import setupStore from "./stores/index";

const app = createApp(App);

// 注册pinia
setupStore(app);
// 注册router
setupRouter(app);

app.mount("#app");
