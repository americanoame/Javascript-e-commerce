import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CheckOutSteps from "../components/CheckOutSteps";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../components/Loader";
import { useCreateOrderMutation } from "../slices/OrdersApiSlice";
import { clearCartitems } from "../slices/cartSlice";

const placeOrderScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  // Calculate prices (items, tax, shipping, total)
  const itemsPrice = cart.cartItems.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );
  const taxPrice = Number((0.15 * itemsPrice).toFixed(2)); // 15% tax
  const shippingPrice = itemsPrice > 100 ? 0 : 10; // Free shipping over $100
  const totalPrice = (itemsPrice + taxPrice + shippingPrice).toFixed(2);

  const [createOrder, { isLoading, error }] = useCreateOrderMutation();

  useEffect(() => {
    if (!cart.shippingAddress.address) {
      
    } else if (!cart.paymentMethod) {
      navigate("/payment");
    }
  }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

  const placeOrderHandler = async () => {
    try {
      const res = await createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice
      }).unwrap();
       dispatch(clearCartitems());
       navigate(`/order/${res._id}`)
      } catch (error) {
        toast.error("Failed to place order. Please try again.");
      }
    
  };

  return (
    <>
    <div className="max-w-[500px] mx-auto text-black mt-24">
        <CheckOutSteps step1 step2 step3 step4 />
      </div>
    <div className="p-8 mt-4 mb-10 max-w-[1300px] min-h-screen mx-auto w-full">
      <Toaster />
      
      <div className="flex flex-col md:flex-row">
        <div className="md:w-2/3 w-full">
          <ul>
            <li>
              <h2 className="text-xl font-semibold">Shipping</h2>
              <p>
                <strong>Address: </strong>
                {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                {cart.shippingAddress.postalCode},{" "}
                {cart.shippingAddress.country}
              </p>
            </li>
            <li>
              <h2 className="text-xl font-semibold">Payment Method</h2>
              <p>
                <strong>Method: </strong>
                {cart.paymentMethod}
              </p>
            </li>
            <li>
              <h2 className="text-xl font-semibold">Order Items</h2>
              <ul>
                {cart.cartItems.length === 0 ? (
                  <h1>Your Cart is empty</h1>
                ) : (
                  cart.cartItems.map((item, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center py-2 border-b border-gray-300"
                    >
                      <div className="flex items-center space-x-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover"
                        />
                        <Link
                          to={`/products/${item.product}`}
                          className="text-blue-600 hover:underline"
                        >
                          {item.name}
                        </Link>
                      </div>
                      <div>
                        {item.qty} x ${item.price} = $
                        {(item.qty * item.price).toFixed(2)}
                      </div>
                    </li>
                  ))
                )}
              </ul>
            </li>
          </ul>
        </div>
        <div className="md:w-1/3 bg-gray-100 p-6 rounded-md ml-10 h-full max-h-[500px] overflow-y-auto">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            <div className="flex justify-between">
              <div>Items</div>
              <div>${itemsPrice.toFixed(2)}</div>
            </div>
            <div className="flex justify-between">
              <div>Tax</div>
              <div>${taxPrice}</div>
            </div>
            <div className="flex justify-between">
              <div>Shipping</div>
              <div>${shippingPrice}</div>
            </div>
            <div className="flex justify-between font-bold">
              <div>Total</div>
              <div>${totalPrice}</div>
            </div>

            <div>
              <button
                type="button"
                className="w-full py-2 px-4 bg-gradient-to-r text-white rounded-md from-[#feb47b] to-[#ff7e5f] hover:opacity-80 transition-all duration-300"
                onClick={placeOrderHandler}
                disabled={cart.cartItems.length === 0}
              >
                {isLoading && <Loader />}
                Place Oder
              </button>
            </div>
            {error && <div className="text-red-500 text-center">{error}</div>}
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default placeOrderScreen;
