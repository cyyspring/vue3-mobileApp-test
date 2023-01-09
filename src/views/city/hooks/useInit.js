import { ref } from "vue";
import { getCityAll } from "@/api/city";

export default function useInit() {
  const allCitiesRef = ref({});

  async function init() {
    const { data } = await getCityAll();
    allCitiesRef.value = data;
  }

  return {
    init,
    allCitiesRef,
  };
}
