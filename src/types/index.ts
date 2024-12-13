export interface IResponseProduct {
  id:                   number;
  title:                string;
  description:          string;
  category:             string;
  price:                number;
  discountPercentage:   number;
  rating:               number;
  stock:                number;
  tags:                 string[];
  brand:                string;
  sku:                  string;
  weight:               number;
  dimensions:           Dimensions;
  warrantyInformation:  string;
  shippingInformation:  string;
  availabilityStatus:   string;
  reviews:              Review[];
  returnPolicy:         string;
  minimumOrderQuantity: number;
  meta:                 Meta;
  images:               string[];
  thumbnail:            string;
}

export interface Dimensions {
  width:  number;
  height: number;
  depth:  number;
}

export interface Meta {
  createdAt: Date | string;
  updatedAt: Date | string;
  barcode:   string;
  qrCode:    string;
}

export interface Review {
  rating:        number;
  comment:       string;
  date:          Date;
  reviewerName:  string;
  reviewerEmail: string;
}

export interface IParamsGetAllProduct {
  limit: number;
  skip?: number;
}

export interface IResponseCategory {
  name: string;
  slug: string;
  url: string;
}

export interface ResponseAPIAxios<T> {
  products: T;
  skip: number;
  total: number
}
