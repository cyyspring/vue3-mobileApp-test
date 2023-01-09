import request from "@/services/index";

export function getHomeHotSuggests() {
  return request.get({
    url: "/home/hotSuggests",
  });
}

export function getHomeCategories() {
  return request.get({
    url: "/home/categories",
  });
}

export function getHomeHouselist(currentPage) {
  return request.get({
    url: "/home/houselist",
    params: {
      page: currentPage,
    },
  });
}
