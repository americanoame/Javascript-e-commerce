import React, { useState, useEffect } from "react";
import Product from "../components/Product";
import axios from "axios";

const HomeScreen = () => {
const [products, setProducts] = useState([]);


useEffect(() => {
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/products"); 
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  fetchProducts();
}, []); //  

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
