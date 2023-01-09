import request from "@/services/index";

export function getCityAll() {
  return request.get({
    url: "/city/all",
  });
}
