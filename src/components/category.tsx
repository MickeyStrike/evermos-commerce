import React, { FC } from 'react'
import '@/css/category.css'
import { IResponseCategory } from '@/types'

interface ICategoryProps {
  listCategory: IResponseCategory[],
  selectedCategory: string,
  setSelectedCategory: (slug: string) => void
}

const Category:FC<ICategoryProps> = ({
  listCategory,
  selectedCategory,
  setSelectedCategory
}) => {
  return (
    <div className="navbar">
      <div className="navbar-container">
        {
          listCategory.map((dataCategory) => (
            <div key={dataCategory.slug} role="presentation" className="tab cursor-pointer" onClick={() => setSelectedCategory(dataCategory.slug)}>
              <div className={`wrapper-product-tab ${selectedCategory === dataCategory.slug ? "active-tab" : "inactive-tab"}`}>
                <div className="tab-title">{dataCategory.name}</div>
                <div className="mark-bottom"></div>
              </div>
            </div>
          ))
        }
        
        {/* <div className="tab cursor-pointer">
          <div className="wrapper-product-tab inactive-tab">
            <div className="tab-title">Paling Baru</div>
            <div className="mark-bottom invisible"></div>
          </div>
        </div>
        <div className="tab cursor-pointer">
          <div className="wrapper-product-tab inactive-tab">
            <div className="tab-title">Best deals</div>
            <div className="mark-bottom invisible"></div>
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default Category 
