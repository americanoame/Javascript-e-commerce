import React, { useState } from "react";
import img1 from "/images/13.png";
import img2 from "/images/02.png";
import img3 from "/images/03.png";
import img4 from "/images/04.png";
import img5 from "/images/12.png";
import img6 from "/images/06.png";
import img7 from "/images/10.png";

const CarouselAdd = () => {
  const images = [img1, img2, img3, img4, img5, img6, img7];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative max-w-full mx-auto mt-12 bg-gradient-to-r from-[#feb47b] to-[#ff7e5f] p-5 rounded-3xl shadow-xl">
      <div className="relative w-full h-[40vh] sm:h-[35vh] md:h-[30vh] lg:h-[40vh] xl:h-[45vh]  ipadpro:h-[20vh] nesthub:h-[40vh] nesthubmax:h-[40vh] overflow-hidden">
        <img
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          className="block w-full h-full object-contain object-center"
        />
      </div>

      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-5 transform -translate-y-1/2 p-2 bg-black text-white rounded-full opacity-50 hover:opacity-100"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-5 transform -translate-y-1/2 p-2 bg-black text-white rounded-full opacity-50 hover:opacity-100"
      >
        &#10095;
      </button>

      <h1 className="text-center text-white mt-4 text-sm sm:text-base md:text-lg lg:text-xl">
        Coming up soon!
      </h1>
    </div>
  );
};

export default CarouselAdd;
