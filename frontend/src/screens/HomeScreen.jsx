import React from "react";
import Product from "../components/Product";
import Loader from "../components/Loader";
import { useGetProductsQuery } from "../slices/productsApiSlice";

import { LuSearch } from "react-icons/lu";

const HomeScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <div className="flex justify-center items-center h-screen">
          {error?.data?.message ||
            error.error ||
            "An error occurred while fetching the products."}
        </div>
      ) : (
        <div
          className="max-w-[2230px] mx-auto mt-16"
          style={{
            // background: "linear-gradient(to right, #b9bb48, #38a169)", 
          }}
        >
          <h1 className="text-center text-black text-[18px] sm:text-xl md:text-2xl lg:text-3xl tracking-wider font-thin p-8 flex items-center justify-center">
            <LuSearch className="text-[24px] mr-4" />
            FEATURED PRODUCTS
          </h1>
          <div className="max-w-[2200px] mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-black p-4">
              {products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HomeScreen;
