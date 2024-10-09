import ProductDetailPage from "@/components/pages/productDetailPage";
import CONSTANT from "@/constant";
import { IResponseProduct } from "@/types";
import { FC } from "react";

interface IProductDetailProps {
  params: {
    id: string;
  };
}

// SSR Implementation in PDP
const ProductDetail: FC<IProductDetailProps> = async ({ params }) => {
  const { id } = params;

  const res = await fetch(`${CONSTANT.BACKEND_URL}/products/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data: IResponseProduct = await res.json();

  return <ProductDetailPage data={data} />;
};

export default ProductDetail;