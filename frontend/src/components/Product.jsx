import React, { useState } from "react";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";

const Product = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative shrink-0 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Link to product details page */}
      <Link to={`/product/${product._id}`} title={product.name}>
        <figure className="relative overflow-hidden">
          {/* Image with hover effect */}
          <img
            src={
              isHovered ? product.hoverImage || product.image : product.image
            } // Change image based on hover
            alt={product.name}
            className="object-cover  w-full p-4 transition duration-300 transform hover:scale-105"
          />
        </figure>

        <div className="absolute inset-0 transform translate-y-full group-hover:translate-y-0 duration-500 ease-in-out  items-center justify-center px-1 rounded-full opacity-0 group-hover:opacity-100 w-12 h-24 lg:flex hidden">
          <button className="text-white text-[12px] font-thin bg-red-500  bg-opacity-90 py-2 px-1 rounded-full shadow-2xl gradient-text">
            ADD TO CART
          </button>
        </div>
      </Link>

      {/* Product name */}
      <div className="mt-4 w-full text-center px-7 text-gray-950">
        <h2 className="text-2xl tracking-widest font-extralight sm:text-xl">
          {product.name}
        </h2>
      </div>

      {/* Product price */}
      <div className="mt-2 w-full font-thin text-center px-7 text-gray-600 sm:mt-1">
        <span className="text-lg font-normal sm:text-base">
          ${product.price}
        </span>
      </div>

      {/* Product rating */}
      <div className="mt-2 w-full text-center px-7 text-gray-900">
        <Rating value={product.rating} text={`${product.numReviews} reviews`} />
      </div>
    </div>
  );
};

export default Product;
