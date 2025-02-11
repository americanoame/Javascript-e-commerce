import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";


const CartScreen = () => {
  const navigate = useNavigate();
  

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const { userInfo } = useSelector((state) => state.auth);

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const itemsTotal = cartItems.reduce(
    (acc, item) => acc + item.qty * item.price,
    0
  );
  const estimatedTax = itemsTotal * 0.1;
  const shippingCost = itemsTotal < 100 ? 10 : 0;
  const orderTotal = itemsTotal + estimatedTax + shippingCost;

  

  const checkOutHandler = () => {
    if (userInfo) {
      navigate("/shipping");
    } else {
      navigate("/login?redirect=/shipping");
    }
  };

  return (
    <div className="p-8 mt-14 mb-10 max-w-[1300px] min-h-screen mx-auto w-full">
      {cartItems.length === 0 ? (
        <div className="text-center">
          <p>
            Your cart is currently empty <span className="text-2xl">∅</span>
          </p>
          <div className="mt-4">
            <Link to="/" className=" items-center justify-center text-blue-600">
              <i className="fa fa-arrow-left mr-2" aria-hidden="true"></i>
              <span>← Continue Shopping</span>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <Link to="/" className="text-blue-600">
            ← Continue shopping
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
            <div>
              {cartItems.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </div>

            <div>
              <OrderSummary
                totalQuantity={totalQuantity}
                itemsTotal={itemsTotal}
                estimatedTax={estimatedTax}
                shippingCost={shippingCost}
                orderTotal={orderTotal}
                checkOutHandler={checkOutHandler}
                cartItems={cartItems}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;



























// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { FaArrowAltCircleUp, FaArrowCircleDown, FaTrashAlt } from "react-icons/fa";
// import {
//   removeFromCart,
//   incrementQty,
//   decrementQty,
// } from "../slices/cartSlice";

// const CartScreen = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const cart = useSelector((state) => state.cart);
//   const { cartItems } = cart;

//   // Fetching userInfo from the auth state to check if the user is logged in
//   const { userInfo } = useSelector((state) => state.auth);

//   const totalQuantity = cartItems.reduce((acc, item) => acc + item.qty, 0);
//   const itemsTotal = cartItems.reduce(
//     (acc, item) => acc + item.qty * item.price,
//     0
//   );
//   const estimatedTax = itemsTotal * 0.1;
//   const shippingCost = itemsTotal < 100 ? 10 : 0;
//   const orderTotal = itemsTotal + estimatedTax + shippingCost;

//   const removeFromCartHandler = async (id) => {
//     dispatch(removeFromCart(id));
//   };

//   const checkOutHandler = () => {
//     if (userInfo) {
//       navigate("/shipping");
//     } else {
//       navigate("/login?redirect=/shipping");
//     }
//   };

//   // const checkOutHandler = () => {
//   //   navigate("/login?redirect=/shipping");
//   // };

//   return (
//     <div className="p-8 mt-14 mb-10 max-w-[1300px] min-h-screen mx-auto w-full">
//       {cartItems.length === 0 ? (
//         <div className="flex flex-col justify-center h-72 text-center">
//           <p>
//             Your cart is currently empty <span className="text-2xl">∅</span>
//           </p>
//           <div className="mt-4">
//             <Link
//               to="/"
//               className=" items-center justify-center text-blue-600"
//             >
//               <i className="fa fa-arrow-left mr-2" aria-hidden="true"></i>
//               <span>← Continue Shopping</span>
//             </Link>
//           </div>
//         </div>
//       ) : (
//         <div>
//           <Link to="/" className="text-blue-600">
//             ← Continue shopping
//           </Link>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
//             <div>
//               {cartItems.map((item) => (
//                 <div className="flex items-center border-b py-4" key={item._id}>
//                   <img
//                     className="w-20 h-20 object-cover"
//                     src={item.image}
//                     alt={item.name}
//                   />
//                   <div className="ml-4">
//                     <Link to={`/product/${item._id}`} className="font-semibold">
//                       {item.name}
//                     </Link>
//                     <p className="p-2">${item.price}</p>

//                     <div className="flex items-center space-x-2">
//                       <button
//                         onClick={() => dispatch(decrementQty(item))}
//                         className={`text-red-500 text-[18px] ${
//                           item.qty === 1 ? "opacity-50 cursor-not-allowed" : ""
//                         }`}
//                         aria-label="Decrease quantity"
//                         disabled={item.qty === 1}
//                       >
//                         <FaArrowCircleDown />
//                       </button>

//                       <span className="py-1 border border-gray-300 w-12 text-center rounded-lg">
//                         {item.qty}
//                       </span>

//                       <button
//                         onClick={() => dispatch(incrementQty(item))}
//                         className={`text-green-500 text-[18px] ${
//                           item.qty === item.countInStock
//                             ? "opacity-50 cursor-not-allowed"
//                             : ""
//                         }`}
//                         aria-label="Increase quantity"
//                         disabled={item.qty === item.countInStock}
//                       >
//                         <FaArrowAltCircleUp />
//                       </button>

//                       <div
//                         className="text-red-700 cursor-pointer ml-2"
//                         onClick={() => removeFromCartHandler(item._id)}
//                       >
//                         <FaTrashAlt className="inline-block mr-2 text-[12px] " />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>

//             <div>
//               <div className="bg-gray-100 p-6 rounded-md">
//                 <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
//                 <div className="flex justify-between mb-2">
//                   <span>Items: {totalQuantity}</span>
//                 </div>
//                 <div className="flex justify-between mb-2">
//                   <span>Shipping & handling:</span>
//                   <span>${shippingCost.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between mb-2">
//                   <span>Total before tax:</span>
//                   <span>${itemsTotal.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between mb-2">
//                   <span>Estimated tax (10%):</span>
//                   <span>${estimatedTax.toFixed(2)}</span>
//                 </div>
//                 <div className="flex justify-between font-semibold text-lg mt-4">
//                   <span>Order total:</span>
//                   <span>${orderTotal.toFixed(2)}</span>
//                 </div>
//                 <button
//                   className={`px-4 py-2 rounded-md mt-4 w-full ${
//                     cartItems.length === 0
//                     ? "bg-gray-400 cursor-not-allowed"
//                     : "bg-gradient-to-r  from-[#feb47b] to-[#ff7e5f] hover:opacity-80"
//                 } text-white text-sm md:text-xs lg:text-lg xl:text-xl px-4 py-2 md:px-3 lg:px-12 xl:px-16 transition duration-300`}
//                   disabled={cartItems.length === 0}
//                   onClick={checkOutHandler}
//                 >
//                   Proceed to checkout
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartScreen;
