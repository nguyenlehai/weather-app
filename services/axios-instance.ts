import axios, { AxiosResponse } from 'axios';
import qs from 'qs';

const requestConfigs = {
  openWeatherAPI: process.env.NEXT_PUBLIC_WEATHER_API,
};

const axiosInstance = axios.create({
  baseURL: requestConfigs.openWeatherAPI,
  timeout: 30 * 1000,
  paramsSerializer: params => qs.stringify(params, { arrayFormat: 'brackets' }),
});

// request interceptor
axiosInstance.interceptors.request.use(
  (config: any) => {
    // eslint-disable-next-line no-param-reassign
    config.headers = {
      ...config.headers,
    };
    return config;
  },
  error => {
    // TODO: Do something with response error.
    return Promise.reject(error.response);
  },
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse<any>) => response,
  error => {
    // TODO: Do something with response error.
    return Promise.reject(error.response);
  },
);

export default axiosInstance;
