import useFrontendInstance from "./instance";

import { IResponseProduct, ResponseAPIAxios, IParamsGetAllProduct, IResponseCategory } from "@/types";

const useFrontendServices = () => {
  const instance = useFrontendInstance();

  return {
    getAllProducts: (params: IParamsGetAllProduct) =>
      instance.get<ResponseAPIAxios<IResponseProduct[]>>(
        `/products`, { params }
      ),
    getProductsByCategory: (category: string) =>
      instance.get<ResponseAPIAxios<IResponseProduct[]>>(
        `/products/category/${category}`
      ),
    getAllCategories: () =>
      instance.get<IResponseCategory[]>(
        `/products/categories`
      ),
    getProductBySearch: (query: string) =>
      instance.get<ResponseAPIAxios<IResponseProduct[]>>(
        `/products/search?q=${query}`
      ),
  };
};

export default useFrontendServices;
