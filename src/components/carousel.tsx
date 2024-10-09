"use client"
import React, { FC, useEffect } from 'react';
import { useMinimizedState } from "@/helper";
import '@/css/carousel.css'
import Image from 'next/image';

interface ICarousel {
  images: string[]
}

interface IStateLocal {
  currentIndex: number
}

const Carousel:FC<ICarousel> = ({ images }) => {
  const [state, dispatch] = useMinimizedState<IStateLocal>({
    currentIndex: 0,
  });

  const nextSlide = () => {
    const index = state.currentIndex === images.length - 1 ? 0 : state.currentIndex + 1
    dispatch({ currentIndex: index })
  };

  const prevSlide = () => {
    const index = state.currentIndex === 0 ? images.length - 1 : state.currentIndex - 1
    dispatch({ currentIndex: index })
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide()
    }, 3000)
    return () => clearInterval(intervalId)
  }, [state.currentIndex])

  return (
    <div className="carousel-container">
      <button className="carousel-button prev" onClick={prevSlide}>❮</button>
      <div className="carousel-slide" style={{ transform: `translateX(-${state.currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <div key={index} className="carousel-item">
            <Image
              src={image}
              alt={`Slide ${index}`}
              fill
              style={{ objectFit: "contain" }}
              sizes='100%'
            />
          </div>
        ))}
      </div>
      <button className="carousel-button next" onClick={nextSlide}>❯</button>
    </div>
  );
};

export default Carousel;
