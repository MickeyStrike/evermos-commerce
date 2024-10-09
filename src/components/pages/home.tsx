"use client"
import Carousel from "@/components/carousel";
import Card from "@/components/card";
import Category from "@/components/category";
import { useDebounce, useMinimizedState } from "@/helper";
import useFrontendServices from "@/services/frontend-services";
import { IParamsGetAllProduct, IResponseCategory, IResponseProduct } from "@/types";
import Slider from "../slider";

const images = [
  "https://images.tokopedia.net/img/cache/1208/NsjrJu/2024/10/4/eb07ecdd-9893-4837-ae01-a3e63dff7ce7.jpg.webp?ect=4g",
  "https://images.tokopedia.net/img/cache/1208/NsjrJu/2024/10/7/a4ceae4e-6872-4b2f-9ab2-a2a7852de86e.jpg.webp?ect=4g",
]

interface IState {
  dataProducts: IResponseProduct[],
  dataProductsTerpopuler: IResponseProduct[],
  dataProductsTerbaru: IResponseProduct[],
  listCategory: IResponseCategory[],
  selectedCategory: string
}

const HomePage = () => {
  const [state, dispatch] = useMinimizedState<IState>({
    dataProducts: [],
    dataProductsTerpopuler: [],
    dataProductsTerbaru: [],
    listCategory: [],
    selectedCategory: "groceries"
  })
  const { getAllProducts, getAllCategories, getProductsByCategory } = useFrontendServices();

  useDebounce(() => {
    getAllProducts({ limit: 15, skip: 10 })
      .then((res) => {
        dispatch({
          dataProductsTerpopuler: res.data.products
        })
      })
      .catch((err) => console.log(err, "error"))
  }, [])

  useDebounce(() => {
    getProductsByCategory("mobile-accessories")
    .then((res) => {
      dispatch({
        dataProductsTerbaru: res.data.products
      })
    })
    .catch((err) => console.log(err, "error"))
  }, [])

  useDebounce((selectedCategory) => {
    getProductsByCategory(selectedCategory)
    .then((res) => {
      dispatch({
        dataProducts: res.data.products
      })
    })
    .catch((err) => console.log(err, "error"))
  }, [state.selectedCategory])

  useDebounce(() => {
    getAllCategories()
    .then((res) => {
      dispatch({
        listCategory: res.data
      })
    })
    .catch((err) => console.log(err, "error"))
  }, [])
  
  return (
    <div className="container min-height-container">
      <Carousel images={images} />
      <section className="container-section flex-col">
        <span className="section-title">🔥 Product Terpopuler</span>
        <Slider>
          {
            state.dataProductsTerpopuler.map((product) => (
              <Card
                key={product.id}
                product={product}
              />
            ))
          }
        </Slider>
      </section>
      <section className="container-section flex-col">
        <span className="section-title">✨ Product Terbaru</span>
        <Slider>
          {
            state.dataProductsTerbaru.map((product) => (
              <Card
                key={product.id}
                product={product}
              />
            ))
          }
        </Slider>
      </section>
      <section className="container-section flex-col">
        <Category
          listCategory={state.listCategory}
          selectedCategory={state.selectedCategory}
          setSelectedCategory={(slug) => dispatch({ selectedCategory: slug })}
        />
        <div className="container-card">
          {
            state.dataProducts.map((product) => (
              <Card
                key={product.id}
                product={product}
              />
            ))
          }
        </div>
      </section>
    </div>
  );
}

export default HomePage
