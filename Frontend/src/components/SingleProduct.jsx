import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleProduct = () => {
  const { id } = useParams(); // get product id from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <p className="p-6">Loading...</p>;
  }

  if (!product) {
    return <p className="p-6">Product not found</p>;
  }

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
                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
                disabled={product.stock === 0}
              >
                Buy Now
              </button>

              <button
                className="border border-green-600 text-green-600 px-6 py-2 rounded-lg hover:bg-green-50 transition"
                disabled={product.stock === 0}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SingleProduct;
