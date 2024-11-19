import React from "react";
import { FaArrowAltCircleUp, FaArrowCircleDown, FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { incrementQty, decrementQty, removeFromCart } from "../slices/cartSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="flex items-center border-b py-4" key={item._id}>
      <img
        className="w-20 h-20 object-cover"
        src={item.image}
        alt={item.name}
      />
      <div className="ml-4">
        <Link to={`/product/${item._id}`} className="font-semibold">
          {item.name}
        </Link>
        <p className="p-2">${item.price}</p>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => dispatch(decrementQty(item))}
            className={`text-red-500 text-[18px] ${
              item.qty === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            aria-label="Decrease quantity"
            disabled={item.qty === 1}
          >
            <FaArrowCircleDown />
          </button>

          <span className="py-1 border border-gray-300 w-12 text-center rounded-lg">
            {item.qty}
          </span>

          <button
            onClick={() => dispatch(incrementQty(item))}
            className={`text-green-500 text-[18px] ${
              item.qty === item.countInStock
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            aria-label="Increase quantity"
            disabled={item.qty === item.countInStock}
          >
            <FaArrowAltCircleUp />
          </button>

          <div
            className="text-red-700 cursor-pointer ml-2"
            onClick={() => handleRemoveFromCart(item._id)}
          >
            <FaTrashAlt className="inline-block mr-2 text-[12px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
