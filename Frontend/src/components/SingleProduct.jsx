import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  


const handleAddToCart = async () => {
  try {
    const res = await axios.post(
      "http://localhost:3000/add-to-cart",
      {
        productId: id,
        quantity: quantity, // 👈 directly from state
      },
      {
        withCredentials: true, // if you use cookies/auth
      }
    );

    console.log(res.data);
  } catch (err) {
    console.error(err);
  }
};


  // State for showing quantity form
  const [cart, setCart] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/product/${id}`);
        setProduct(res.data.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!product) return <p className="p-6">Product not found</p>;

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) setQuantity(value);
  };

  const handleBuyNow = () => {
    alert(`Buying ${quantity} of ${product.name}`);
  };



  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-md p-6">
        
        {/* Product Name */}
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          {product.name}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Image */}
          <img
            src={`http://localhost:3000/storage/${product.image}`}
            alt={product.name}
            className="w-full h-80 object-cover rounded-xl"
          />

          {/* Product Info */}
          <div>
            <p className="text-2xl font-semibold text-green-600">
              ${product.price}
            </p>

            <p className="mt-2 text-sm text-gray-600">
              Stock:{" "}
              <span
                className={`font-semibold ${
                  product.stock > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.stock > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </p>

            <p className="mt-4 text-gray-700 leading-relaxed">
              {product.description}
            </p>

            {/* Buttons */}
            <div className="mt-6 flex gap-4">
              <button
                onClick={handleBuyNow}
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                disabled={product.stock === 0}
              >
                Buy Now
              </button>

              {!cart &&(
                 <button
                onClick={handleAddToCart}
                className="border border-green-600 text-green-600 px-6 py-2 rounded-lg hover:bg-green-50 transition"
                disabled={product.stock === 0}
              >
                Add to Cart
              </button>


              )
              
              }
             
            </div>

            {/* for selecting quantity */}
            <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 mt-4 rounded-lg hover:bg-green-700 transition "
                  onClick={()=>{setCart(true)}}
                >
                  Select qunatity
                </button>

            {/* Quantity Form - only visible if cart is true */}
            {cart && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  alert(`Quantity set to ${quantity}`);
                }}
                className="relative flex items-center gap-4 mt-4 p-4 border rounded-lg bg-gray-50"
              >
                {/* Close button */}
                <button
                  type="button"
                  onClick={() => setCart(false)}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 font-bold text-lg"
                >
                  &times;
                </button>

                <label className="font-semibold text-gray-700">
                  Quantity:
                </label>

                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min={1}
                  className="w-20 px-3 py-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />

                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Update qunatity
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
