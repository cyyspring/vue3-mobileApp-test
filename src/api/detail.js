import request from "@/services/index";

export function getDetailInfos(houseId) {
  return request.get({
    url: "/detail/infos",
    params: {
      houseId,
    },
  });
}
