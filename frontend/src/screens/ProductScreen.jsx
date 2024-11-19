import React, { useState } from "react";
import { FaArrowAltCircleUp, FaArrowAltCircleDown } from "react-icons/fa";
import ProductScreenThumbnail from "../components/ProductScreenThumbnail";
import { useParams, useNavigate } from "react-router-dom";
import Rating from "../components/Rating";
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import { addToCart } from "../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const ProductScreen = () => {
  const [addi, setAddi] = useState("");
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get the quantity of this product in the cart from Redux
  const qty = useSelector(
    (state) =>
      state.cart.cartItems.find((item) => item._id === productId)?.qty || 1
  );

  // Use the getProductDetails query to fetch the product
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  // Function to set the selected image
  const handleAddi = (image) => {
    setAddi(image);
  };

  // Function to reset the image to the main product image
  const resetImage = () => {
    setAddi("");
  };

  const incrementQty = () => {
    if (qty < product.countInStock) {
      dispatch(addToCart({ ...product, qty: qty + 1 })); // Incrementing via Redux
    }
  };

  const decrementQty = () => {
    if (qty > 1) {
      dispatch(addToCart({ ...product, qty: qty - 1 })); // Decrementing via Redux
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));

    navigate("/cart");
  };

  return (
    <>
      {isLoading ? (
        <h1 className="flex justify-center items-center h-screen text-2xl">
          Loading...
        </h1>
      ) : error ? (
        <div className="flex justify-center items-center h-screen">
          {error?.data?.message ||
            error.error ||
            "An error occurred while fetching the product details."}
        </div>
      ) : (
        <div className="flex flex-col min-h-screen">
          <main className="flex-1 flex items-start justify-center">
            <section className="max-w-7xl mx-auto flex justify-center items-start py-28 text-black">
              {/* <Link to="/" className=" ">
                <div className=" text-red-800 text-sm md:text-xs lg:text-sm xl:text-sm">
                  GO BACK
                </div>
              </Link> */}

              <div className="flex flex-wrap items-center">
                <ProductScreenThumbnail
                  mainImage={addi || product.image}
                  additionalImages={product.additionalImages}
                  onSelectImage={handleAddi}
                  onResetImage={resetImage}
                />

                <div className="flex-1 ml-5 mr-2">
                  {/* Price and Stock Status Card moved above product name */}

                  <div className="p-4">
                    <p className="text-xl font-bold mb-2">${product.price}</p>
                    <p className="text-sm font-semibold">
                      {product.countInStock > 0 ? (
                        <span className="text-green-600">
                          {product.countInStock} Produts in Stock
                        </span>
                      ) : (
                        <span className="text-red-600">
                          Produt Out of Stock
                        </span>
                      )}
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

                  <h2 className="text-xl sm:text-2xl md:text-2xl lg:text-2xl xl:text-xl font-bold mb-4 mt-4">
                    {product.name}
                  </h2>

                  {product.countInStock > 0 && (
                    <div className="mt-4">
                      <label
                        htmlFor="quantity"
                        className="block text-sm font-bold text-gray-900 mb-2"
                      >
                        Qty:
                      </label>
                      <div className="flex items-center space-x-2">
                        {/* Decrement button */}
                        <button
                          onClick={decrementQty}
                          className={`text-red-500 text-[18px] ${
                            qty === 1 ? "opacity-50 cursor-not-allowed" : ""
                          }`}
                          aria-label="Decrease quantity"
                          disabled={qty === 1}
                        >
                          <FaArrowAltCircleDown />
                        </button>

                        {/* Display for selected quantity */}
                        <span className="px-4 py-2 border border-gray-300 w-12 text-center rounded-lg">
                          {qty}
                        </span>

                        {/* Increment button */}
                        <button
                          onClick={incrementQty}
                          className={`text-green-500 text-[18px] ${
                            qty === product.countInStock
                              ? "opacity-50 cursor-not-allowed"
                              : ""
                          }`}
                          aria-label="Increase quantity"
                          disabled={qty === product.countInStock}
                        >
                          <FaArrowAltCircleUp />
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center py-4">
                    <button
                      className={`${
                        product.countInStock === 0
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-gradient-to-r from-[#ff7e5f] to-[#feb47b] hover:from-[#ffa58c] hover:to-[#ffbf9c] rounded-lg"
                      } text-white text-sm md:text-xs lg:text-lg xl:text-xl px-4 py-2 md:px-3 lg:px-12 xl:px-16 transition duration-300`}
                      disabled={product.countInStock === 0}
                      onClick={addToCartHandler}
                    >
                      ADD TO CART
                    </button>
                  </div>

                  <div className="">
                    <p className="text-sm md:text-base lg:text-lg mb-4 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      )}
    </>
  );
};
export default ProductScreen;
