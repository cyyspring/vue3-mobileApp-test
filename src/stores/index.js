import { createPinia } from "pinia";

const pinia = createPinia();

export default function setupStore(app) {
  app.use(pinia);
}
