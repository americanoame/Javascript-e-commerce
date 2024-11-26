import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import {
  useGetOrderDetailsQuery,
  usePayOrderMutation,
  useGetPayPalClientIdQuery,
} from "../slices/OrdersApiSlice";

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  

  const {
    data: order,
    isLoading,
    refetch,
    isError,
  } = useGetOrderDetailsQuery(orderId);

  useEffect(() => {
    if (!orderId) {
    }
  }, [orderId]);

  const [payOrder, { isLoading: loadingPay }] = usePayOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  const {
    data: paypal,
    isLoading: loadingPayPal,
    error: errorPayPal,
  } = useGetPayPalClientIdQuery();


  useEffect(() => {
    if (!errorPayPal && !loadingPayPal && paypal.clientId) {
      const loadPayPalScript = async () => {
        paypalDispatch({
          type: "resetOptions",
          value: {
            "client-id": paypal.clientId,
            currency: "USD",
          },
        });
        paypalDispatch({ type: "setLoadingStatus", value: "pending" });
      };
      if (order && !order.isPaid) {
        if (!window.paypal) {
          loadPayPalScript();
        }
      }
    }
  }, [order, paypal, paypalDispatch, loadingPayPal, errorPayPal]);

  function onApprove(data, actions) {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success("Payment seccessfu");
      } catch (err) {
        toast.error(err?.data?.message || err.message);
      }
    });
  }

  async function onApproveTest() {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    toast.success("Payment seccessfu");
  }

  function onError() {
    toast.error(err.message);
  }

  function createOrder(data, actions) {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }

  return isLoading ? (
    <Loader />
  ) : isError ? (
    <div className="text-red-500 text-center">
      Failed to load order details. Please try again later.
    </div>
  ) : (
    <>
      <div className="max-w-[1200px] mx-auto mt-32 px-4">
        <h1 className="text-2xl font-bold mb-4">Order {orderId}</h1>
        <div className="flex flex-col md:flex-row">
          {/* Left Section: Order Details */}
          <div className="md:w-2/3 w-full">
            <ul className="space-y-4">
              <li>
                <h2 className="text-lg font-semibold">Shipping Address</h2>
                <p>
                  <strong>Name: </strong> {order.user.name}
                </p>
                <p>
                  <strong>Email: </strong> {order.user.email}
                </p>

                <p>
                  {order.shippingAddress.address}, {order.shippingAddress.city},{" "}
                  {order.shippingAddress.postalCode},{" "}
                  {order.shippingAddress.country}
                </p>

                {order.isDelivered ? (
                  <div className="text-green-500 text-center">
                    Delivered on {order.delivered}
                  </div>
                ) : (
                  <div className="text-red-500">
                    <h1>Not Delivered</h1>
                  </div>
                )}
              </li>
              <li>
                <h2 className="text-lg font-semibold">Payment Method</h2>
                <p>{order.paymentMethod}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  {order.isPaid ? (
                    <span className="text-green-500">
                      Paid on {order.paidAt}
                    </span>
                  ) : (
                    <span className="text-red-500">Not Paid</span>
                  )}
                </p>
              </li>
              <li>
                <h2 className="text-lg font-semibold">Order Items</h2>
                {order.orderItems.length === 0 ? (
                  <p>Your order is empty.</p>
                ) : (
                  <ul className="space-y-2">
                    {order.orderItems.map((item, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center border-b py-2"
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
                    ))}
                  </ul>
                )}
              </li>
            </ul>
          </div>

          {/* Right Section: Order Summary */}
          <div className="md:w-1/3 bg-gray-100 p-6 rounded-md ml-10 h-full">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Order Summary</h2>
              <div className="flex justify-between">
                <div>Items:</div>
                <div>${order.itemsPrice.toFixed(2)}</div>
              </div>
              <div className="flex justify-between">
                <div>Tax:</div>
                <div>${order.taxPrice.toFixed(2)}</div>
              </div>
              <div className="flex justify-between">
                <div>Shipping:</div>
                <div>${order.shippingPrice.toFixed(2)}</div>
              </div>
              <div className="flex justify-between font-bold">
                <div>Total:</div>
                <div>${order.totalPrice.toFixed(2)}</div>
              </div>
              <div>
                {!order.isPaid && (
                  <div>
                    {loadingPay && <Loader />}

                    {isPending ? (
                      <Loader />
                    ) : (
                      <div>
                        <button
                          onClick={onApproveTest}
                          style={{ marginBottom: "10px" }}
                        >
                          Test pay Order
                        </button>
                        <div>
                          <PayPalButtons
                            createOrder={createOrder}
                            onApprove={onApprove}
                            onError={onError}
                          ></PayPalButtons>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderScreen;

// sb-xduuj34195545@personal.example.com

// z@1a7F}3

