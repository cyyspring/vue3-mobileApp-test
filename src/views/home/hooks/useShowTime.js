import dayjs from "dayjs";
import { ref, computed } from "vue";

export default function useShowTime() {
  const currentDate = new Date().getTime();
  const currentDateAddOne = dayjs().add(1, "day").valueOf();

  const startTime = ref(currentDate);
  const endTime = ref(currentDateAddOne);

  const getStartTime = computed(() => {
    return dayjs(startTime.value).format("MM月DD日");
  });
  const getEndTime = computed(() => {
    return dayjs(endTime.value).format("MM月DD日");
  });

  const getDiffDays = computed(() => {
    return dayjs(endTime.value).diff(startTime.value, "day");
  });

  return {
    startTime,
    endTime,
    getStartTime,
    getEndTime,
    getDiffDays,
  };
}
