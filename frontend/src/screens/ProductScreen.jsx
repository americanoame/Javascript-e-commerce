import React, { useState, useEffect } from "react";
import Rating from "../components/Rating";
import ProductScreenThumbnail from "../components/ProductScreenThumbnail";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";

const ProductScreen = () => {
  const [product, setProduct] = useState({});
  const [addi, setAddi] = useState("");


  const { id: productId } = useParams();
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`/api/products/${productId}`); // Adjust endpoint as needed
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  // Function to set the selected image
  const handleAddi = (image) => {
    setAddi(image);
  };

  // Function to reset the image to the main product image
  const resetImage = () => {
    setAddi("");
  };

  return (
    <div>
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 flex items-start justify-center">
          <section className="max-w-7xl mx-auto flex justify-center items-start py-28 text-black">
            <Link to="/" className=" ">
              <div className="text-red-800 text-sm md:text-xs lg:text-sm xl:text-sm">
                GO BACK
              </div>
            </Link>

            <div className="flex flex-wrap items-center">
              <ProductScreenThumbnail
                mainImage={addi || product.image}
                additionalImages={product.additionalImages}
                onSelectImage={handleAddi}
                onResetImage={resetImage}
              />

              <div className="flex-1 ml-5 mr-2">
                <div className="p-4">
                  <p className="text-xl font-bold mb-2">$ {product.price}</p>
                  <p className="text-sm font-semibold">
                    <span className="text-green-600">
                      {product.countInStock} Products in Stock
                    </span>
                  </p>
                </div>

                {product.rating && (
                  <div className="flex items-center mb-4">
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                    />
                  </div>
                )}

                <h2 className="text-2xl md:text-2xl lg:text-2xl xl:text-xl font-bold mb-4 mt-4">
                  {product.name}
                </h2>

                <div className="mt-4">
                  <label
                    htmlFor="quantity"
                    className="block text-sm font-bold text-gray-900 mb-2"
                  >
                    Qty:
                  </label>
                  <div className="flex items-center space-x-2">
                    <button
                      className="text-red-900 text-2xl opacity-50 cursor-not-allowed"
                      aria-label="Decrease quantity"
                      disabled
                    >
                      <span>▼</span>
                    </button>
                    <span className="px-4 py-2 border border-gray-300">1</span>
                    <button className="text-green-600 text-2xl">
                      <span>▲</span>
                    </button>
                  </div>
                </div>

                <div className="flex items-center py-4">
                  <button
                    className={`${
                      product.countInStock === 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-900 hover:bg-red-800"
                    } text-white text-sm md:text-xs lg:text-lg xl:text-xl px-4 py-2 md:px-3 lg:px-12 xl:px-16 transition duration-300`}
                    disabled={product.countInStock === 0}
                  >
                    ADD TO CART
                  </button>
                </div>

                {/* Product Description */}
                <div className="ml-4">
                  <p className="text-sm md:text-base lg:text-lg leading-relaxed">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default ProductScreen;
