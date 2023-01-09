import { defineStore } from "pinia";

export const useCityStore = defineStore("city", {
  state: () => ({
    cityInfo: {},
  }),
  getters: {
    getCityName(state) {
      return state.cityInfo?.cityName || "北京";
    },
  },
});
