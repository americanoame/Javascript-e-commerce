import React from "react";
import products from "../products";
import Product from "../components/Product";

const HomeScreen = () => {
  return (
    <>
      <h1 className="flex justify-center items-center mt-16  text-2xl"></h1>

      <h1 className="text-center text-2xl tracking-wider font-thin  p-8">
        FEATURED PRODUCTS
      </h1>
      <div className="max-w-[2200px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 text-black p-4">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
};

export default HomeScreen;