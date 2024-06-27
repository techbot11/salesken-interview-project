import axios, { CreateAxiosDefaults } from "axios";
import { Logout } from "./helper";

const apiUrl = "https://api.spacexdata.com/v3";

let singletonAxios;
const HEADER_TIMEOUT_MS = 120000;

const HTTP_HEADERS = getHttpHeader();

function getHttpHeader() {
  // we can auth token other comon headers
  return {
    "Content-Type": "application/json",
  };
}

export function apiAdapter(options: any = {}) {
  const axios = getAxiosInstance(options);

  axios.interceptors.response.use(
    (response) => handleAxiosResponseSuccess(response),
    (error) => handleAxiosResponseError(error)
  );

  return axios(options);
}

function handleAxiosResponseSuccess(response: any) {
  switch (response?.data?.status) {
    case 404:
      break;
    case 403:
      break;
    case 401:
      Logout();
      break;
    case 500:
    case 503:
      break;
    case 200:
    case 201:
    case 202:
      return response;
    default:
      return response;
  }
  // return response;
}

function handleAxiosResponseError(error: any) {
  switch (error.response?.data?.status) {
    case 404:
      break;
    case 403:
      Logout();
      break;
    case 401:
      Logout();
      break;
    case 500:
    case 503:
      break;
    case 200:
    case 201:
    case 202:
      return error;
    default:
      return error;
  }
}

function getAxiosInstance(options: any) {
  singletonAxios = axios.create({
    baseURL: getBaseURL(),
    headers: options.overrideHeader
      ? { ...getHttpHeader(), ...options.overrideHeader }
      : getHttpHeader(),
  });
  singletonAxios.defaults.timeout = HEADER_TIMEOUT_MS;
  return singletonAxios;
}

function getBaseURL() {
  return apiUrl;
}

export function getPostFilterPayload() {
  return {
    filters: {
      pageNo: 0,
      pageSize: 10,
      totalCount: 0,
    },
  };
}
