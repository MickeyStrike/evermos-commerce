import React, { FC, useRef } from 'react'
import "@/css/slider.css"

interface ISliderProps {
  children: React.ReactNode
}

const Slider:FC<ISliderProps> = ({
  children
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScrollLeft = () => {
    if (containerRef.current) {
      // containerRef.current.scrollLeft -= containerRef.current.clientWidth;
      containerRef.current.scrollLeft -= 180;
    }
  };

  const handleScrollRight = () => {
    if (containerRef.current) {
      // containerRef.current.scrollLeft += containerRef.current.clientWidth;
      containerRef.current.scrollLeft += 180;
    }
  };

  return (
    <div className="slider-wrapper">
      <button className="arrow left" onClick={handleScrollLeft}>
        &lt;
      </button>
      <div className="slider-container-card" ref={containerRef}>
        {children}
      </div>
      <button className="arrow right" onClick={handleScrollRight}>
        &gt;
      </button>
    </div>
  )
}

export default Slider
