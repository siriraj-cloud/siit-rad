import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const axiosConfig: AxiosRequestConfig = {
  proxy:
    process.env.AXIOS_PROXY_ENABLE === "true"
      ? {
          protocol: process.env.AXIOS_PROXY_PROTOCOL ?? "",
          host: process.env.AXIOS_PROXY_HOST ?? "",
          port: Number(process.env.AXIOS_PROXY_PORT),
          auth: {
            username: process.env.AXIOS_PROXY_USERNAME ?? "",
            password: process.env.AXIOS_PROXY_PASSWORD ?? "",
          },
        }
      : false,
};

/**
 * Authentication service: siit-auth
 */
export const axiosInstanceAuth: AxiosInstance = axios.create({
  ...axiosConfig,
  baseURL: process.env.API_AUTH_BASEURL,
});

// Check process.env variable
if (process.env.API_AUTH_BASEURL === undefined)
  console.error("Missing API path configuration");

// Check process.env variable
if (process.env.AXIOS_PROXY_ENABLE === "true") {
  if (
    process.env.AXIOS_PROXY_ENABLE === undefined ||
    process.env.AXIOS_PROXY_PROTOCOL === undefined ||
    process.env.AXIOS_PROXY_HOST === undefined ||
    process.env.AXIOS_PROXY_PORT === undefined ||
    process.env.AXIOS_PROXY_USERNAME === undefined ||
    process.env.AXIOS_PROXY_PASSWORD === undefined
  )
    console.error("Missing proxy configuration");
} else if (process.env.AXIOS_PROXY_ENABLE === undefined) {
  console.error("Missing proxy configuration");
}
