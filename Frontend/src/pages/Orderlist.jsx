import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Orderlist = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/order-list", { withCredentials: true })
      .then((res) => setOrders(res.data))
      .catch((err) => {
        if (err.response?.status === 401) {
          navigate("/login-user");
        }
      });
  }, [navigate]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="bg-orange-400 m-2 p-3 border rounded-md text-white font-bold text-xl">
        Your Orders
      </h2>

      {orders.length === 0 && (
        <p className="text-gray-500 text-center mt-4">No orders found</p>
      )}

      {orders.map((order) => (
        <div
          key={order.orderId}
          className="border border-gray-300 p-4 mb-6 rounded-lg shadow-sm bg-white"
        >
          <h3 className="text-lg font-semibold mb-2">Order #{order.orderId}</h3>

          <div className="flex gap-4 mb-2">
            <p className="font-medium">Status:</p>
            <p
              className={`font-semibold ${
                order.status === "completed"
                  ? "text-green-500"
                  : "text-yellow-500"
              }`}
            >
              {order.status}
            </p>
          </div>

          <div className="flex gap-4 mb-2">
            <p className="font-medium">Total Price:</p>
            <p className="font-semibold text-orange-500">₹{order.totalPrice}</p>
          </div>

          <div className="flex gap-4 mb-2">
            <p className="font-medium">Created At:</p>
            <p className="text-gray-600">
              {new Date(order.createdAt).toLocaleString()}
            </p>
          </div>

          <div className="mt-3">
            <h4 className="font-medium mb-1">Items:</h4>
            <div className="ml-4">
              {order.orderItems.map((item) => (
                <div
                  key={item.productName}
                  className="flex justify-between mb-1"
                >
                  <span>{item.productName} × {item.quantity}</span>
                  <span>₹{item.quantity * item.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orderlist;

