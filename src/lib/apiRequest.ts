import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { BASE_URL as baseUrl } from '@/constants/baseUrl';
import requests from '@/constants/requestURL';

interface Request {
  [key: string]: {
    path: string;
    method: string;
  };
}

interface AxiosError<T = any> extends Error {
  config: AxiosRequestConfig;
  code?: string;
  request?: any;
  response?: AxiosResponse<T>;
  isAxiosError: boolean;
  toJSON: () => object;
}

const apiRequest = async (
  path: string,
  body?: object | null,
  params?: URLSearchParams | null
) => {
  let data;
  let error;
  let status;

  let requestPath = (requests as Request)[path]
    ? (requests as Request)[path].path
    : path;

  const method = (requests as Request)[path]?.method;
  console.log((requests as Request)[path]?.method, 'MET');
  console.log(params, 'MET');

  if (params) {
    requestPath = `${requestPath}?${params.toString()}`;
  }

  try {
    const res = await axios.request({
      baseURL: baseUrl,
      url: requestPath,
      method,
      data: body,
      withCredentials: true,
    });

    status = res.status;
    data = res.data;
  } catch (err: any) {
    error = err?.response?.data;
  }

  return { data, error, status };
};

export default apiRequest;
