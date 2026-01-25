import React, { useEffect, useState } from "react";
import axios from "axios";

const Carts = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:3000/cart-render", {
          withCredentials: true,
        });

        setCartItems(res.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  if (loading) return <p className="p-4">Loading cart...</p>;

  if (cartItems.length === 0)
    return <p className="p-4">Your cart is empty</p>;

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">My Cart</h2>

      <ul className="space-y-3">
        {cartItems.map((item) => (
          <li
            key={item.productId}
            className="flex justify-between border-b pb-2"
          >
            <span className="font-medium text-gray-800">
              {item.product.name}
            </span>

            <span className="text-gray-600">
              Qty: {item.quantity}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Carts;
