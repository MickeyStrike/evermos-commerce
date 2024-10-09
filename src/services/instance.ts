import axios, { AxiosError } from "axios";
import { ResponseAPIAxios } from "@/types";
import CONSTANT from '@/constant'

const useFrontendInstance = (prefix?: string, token?: string) => {
  const instance = axios.create({
    baseURL: CONSTANT.BACKEND_URL + (prefix ?? ""),
  });

  instance.interceptors.request.use((config) => {
    return config;
  });
  instance.interceptors.response.use(
    undefined,
    (err: AxiosError<ResponseAPIAxios<undefined>>) => {
      return Promise.reject(err);
    },
  );

  return instance;
};

export default useFrontendInstance;
