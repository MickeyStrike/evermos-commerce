"use client"
import React, { FC, useMemo } from 'react'
import Image from 'next/image'
import { IResponseProduct } from '@/types'
import { useDebounce, useMinimizedState } from '@/helper'
import Card from '../card'
import useFrontendServices from '@/services/frontend-services'
import "@/css/productDetailPage.css"

interface IProductDetailPageProps {
  data: IResponseProduct;
}

interface IState {
  selectedImage: string;
  dataProductsRecommendation: IResponseProduct[];
  selectedVariant: string;
}

const listVariant = ["SB56AE M18634 R49S3", "SB56AE M18634 R49S4"]

const ProductDetailPage:FC<IProductDetailPageProps> = ({
  data
}) => {

  const { getAllProducts } = useFrontendServices()

  const [state, dispatch] = useMinimizedState<IState>({
    selectedImage: data.thumbnail,
    dataProductsRecommendation: [],
    selectedVariant: "SB56AE M18634 R49S3"
  })

  const priceAfterDiscount = useMemo(() => {
    return data.price - data.price * (Math.ceil(data.discountPercentage) / 100)
  }, [data])

  useDebounce(() => {
    getAllProducts({ limit: 18, skip: 10 })
      .then((res) => {
        dispatch({
          dataProductsRecommendation: res.data.products
        })
      })
      .catch((err) => console.log(err, "error"))
  }, [])

  return (
    <div className="container min-height-container">
      <section className='container-section mt-2'>
        <div className='pdp-container-flex gap-5'>
          {/* image section */}
          <div className="pdp-container-image">
            <div className="main-image-container">
              <div className='relative'>
                <Image
                  alt="main-product-image"
                  loading="lazy"
                  width={413}
                  height={413}
                  decoding="async"
                  className="main-image"
                  src={state.selectedImage}
                  style={{ color: "transparent" }}
                />
              </div>
            </div>
            <div className="thumbnail-container">
              {
                data.images.map((dataImage) => (
                  <div className="thumbnail" key={dataImage} onClick={() => dispatch({ selectedImage: dataImage })}>
                    <Image
                      alt=""
                      loading="lazy"
                      width="80"
                      height="80"
                      decoding="async"
                      className="thumbnail-image"
                      src={dataImage}
                      style={{ color: "transparent" }}
                    />
                  </div>
                ))
              }
            </div>
          </div>
          {/* description section */}
          <div className="pdp-container-image">
            <div className="pdp-main-container">
              <p className='pdp-product-title'>
                {data?.brand ? data.brand : "Evermos"} - {data.title}
              </p>
              <p className='pdp-product-price'>{priceAfterDiscount?.toLocaleString("en-US", {style:"currency", currency:"USD"})}</p>
              <div className='pdp-product-percent-wrapper'>
                <p className='pdp-product-percent'>
                  {Math.ceil(data.discountPercentage)}%
                </p>
                <p className='pdp-product-price-strikethrough'>
                  {data.price?.toLocaleString("en-US", {style:"currency", currency:"USD"})}
                </p>
              </div>
              <div className='pdp-product-variant-container'>
                <p className='pdp-product-variant-title'>Pilih Variant:</p>
                <div className='pdp-product-variant-wrapper'>
                  {
                    listVariant.map((variant) => (
                      <button
                        key={variant}
                        className={state.selectedVariant === variant ? 'pdp-product-variant-active' : "pdp-product-variant-inactive"}
                        onClick={() => dispatch({ selectedVariant: variant })}
                      >
                        SB56AE M18634 R49S3
                      </button>
                    ))
                  }
                  
                  {/* <button className='pdp-product-varian-inactive'>
                    SB56AE M18634 R49S4
                  </button> */}
                </div>
              </div>
              <div className='pdp-product-description-container'>
                <p className='pdp-product-variant-title'>Deskripsi:</p>
                <p className='pdp-product-description'>
                  {data.description}
                </p>
              </div>
            </div>
            <div className='pdp-store-container'>
              <div className='pdp-store-wrapper'>
                <Image
                  src="https://images.tokopedia.net/img/cache/215-square/shops-1/2017/10/19/450696/450696_86a26ceb-eb97-4026-87da-aff2fbf723f4.jpg"
                  width={48}
                  height={48}
                  style={{ objectFit: 'cover' }}
                  alt='notfoundstore'
                />
                <div className='pdp-store-body'>
                  <div className='flex-col gap-1'>
                    <div className='flex-row gap-1'>
                      <Image
                        src="https://images.tokopedia.net/img/official_store/badge_os.png"
                        width={16}
                        height={16}
                        alt='Official Store'
                      />
                      <p className='pdp-store-name'>{data?.brand ? data.brand : "Evermos"}</p>
                    </div>
                    <div className='pdp-store-name-container'>
                      <span className='pdp-store-status-online'>Online 24 menit lalu</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='pdp-store-action-container'>
              <button className='pdp-store-action-kunjungi'>
                Kunjungi Toko
              </button>
              <button className='pdp-store-action-follow'>
                + Follow Toko
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="container-section flex-col mt-1">
        <span className="section-title">Rekomendasi Produk</span>
        <div className="container-card">
          {
            state.dataProductsRecommendation.map((product) => (
              <Card
                key={product.id}
                product={product}
              />
            ))
          }
        </div>
      </section>
    </div>
  )
}

export default ProductDetailPage
