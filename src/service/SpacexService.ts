import { apiAdapter } from "../utils/ApiAdapter";

export function FetchSpaceLaunches(payload = {}) {
  return apiAdapter({
    url: "/launches",
    method: "GET",
    params: payload,
  });
}
