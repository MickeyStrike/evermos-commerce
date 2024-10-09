import React, { FC, useMemo } from 'react'
import '@/css/card.css'
import Image from 'next/image'
import { IResponseProduct } from '@/types'
import Link from 'next/link'

interface ICardProps {
  product: IResponseProduct
}

const Card:FC<ICardProps> = ({
  product
}) => {

  const priceAfterDiscount = useMemo(() => {
    return product.price - product.price * (Math.ceil(product.discountPercentage) / 100)
  }, [product])

  return (
    <Link href={`/${product.id}`}>
      <div className="wrapper-card">
        <div className="card">
          <div className="image-container">
            <Image
              className="active"
              alt={product.title}
              // src="https://images.tokopedia.net/img/cache/300-square/VqbcmM/2021/6/21/e7d6183d-00f6-412a-96d2-73a562d37f25.jpg"
              src={product.thumbnail}
              loading="lazy"
              fill
              style={{ objectFit: 'cover' }}
              sizes='100%'
            />
          </div>
          <div className="product-info">
            <p className="product-title">{product.title}</p>
            <p className="price">{priceAfterDiscount?.toLocaleString("en-US", {style:"currency", currency:"USD"})}</p>
            <div className="discount">
              <span className="discount-percentage">{Math.ceil(product.discountPercentage)}%</span>
              <span className="original-price">{product.price?.toLocaleString("en-US", {style:"currency", currency:"USD"})}</span>
            </div>
            <p className="brand">{product?.brand ? product.brand : "Evermos"}</p>
            <p className="location">BANDUNG BARAT</p>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Card
