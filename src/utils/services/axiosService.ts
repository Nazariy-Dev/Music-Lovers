import { AxiosRequestConfig } from "axios";
import axiosInstance from "./interceptors";

const axiosBaseQuery =
    ({ baseUrl } = { baseUrl: "" }) =>
        async ({ url, method, data, params, headers }: AxiosRequestConfig) => {
            // debugger
            try {
                const result = await axiosInstance({
                    url: baseUrl + url,
                    method,
                    data,
                    params,
                    headers,
                });
            return Promise.resolve(result)
            } catch (axiosError: any) {
                return Promise.reject(axiosError?.response?.data); // Should return in this format only, becasuse in order to populate error from axios interceptor "return response.data"
            }

        };

export default axiosBaseQuery;
