import { render, screen } from '@testing-library/react';
import Card from '@/components/card';
import { IResponseProduct } from '@/types';
import '@testing-library/jest-dom';
import React from 'react';
import Link from 'next/link';

// Mock Next.js `Image` component
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

// Mock Data for Test
const mockProduct: IResponseProduct = {
  id: 1,
  title: 'Product Title',
  thumbnail: 'https://example.com/image.jpg',
  price: 100,
  discountPercentage: 20,
  brand: 'Test Brand',
  description: '',
  category: '',
  rating: 0,
  stock: 0,
  tags: [],
  sku: '',
  weight: 0,
  dimensions:{
    width:  0,
    height: 0,
    depth:  0,
  },
  warrantyInformation: '',
  shippingInformation: '',
  availabilityStatus: '',
  reviews: [],
  returnPolicy: '',
  minimumOrderQuantity: 0,
  meta: {
    barcode: "2517819903837",
    createdAt: "2024-05-23T08:56:21.620Z",
    qrCode: "https://assets.dummyjson.com/public/qr-code.png",
    updatedAt: "2024-05-23T08:56:21.620Z"
  },
  images: []
};

describe('Card Component', () => {
  it('renders product title, image, and brand', () => {
    render(<Card product={mockProduct} />);

    // Check product title
    expect(screen.getByText(mockProduct.title)).toBeInTheDocument();

    // Check product image
    const image = screen.getByAltText(mockProduct.title);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', mockProduct.thumbnail);

    // Check product brand
    expect(screen.getByText(mockProduct.brand)).toBeInTheDocument();
  });

  it('calculates and displays price after discount', () => {
    render(<Card product={mockProduct} />);

    const priceAfterDiscount = (mockProduct.price - mockProduct.price * (mockProduct.discountPercentage / 100))
      .toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    expect(screen.getByText(priceAfterDiscount)).toBeInTheDocument();
  });

  it('displays original price and discount percentage', () => {
    render(<Card product={mockProduct} />);

    const originalPrice = mockProduct.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    const discountPercentage = `${Math.ceil(mockProduct.discountPercentage)}%`;

    expect(screen.getByText(originalPrice)).toBeInTheDocument();
    expect(screen.getByText(discountPercentage)).toBeInTheDocument();
  });

  it('displays the default brand if none is provided', () => {
    const productWithoutBrand = { ...mockProduct, brand: "" };
    render(<Card product={productWithoutBrand} />);

    expect(screen.getByText('Evermos')).toBeInTheDocument();
  });

  it('renders a link with the correct href', () => {
    render(<Card product={mockProduct} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', `/${mockProduct.id}`);
  });
});
