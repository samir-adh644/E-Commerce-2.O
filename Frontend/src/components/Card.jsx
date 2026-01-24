import React from "react";

const Card = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
      <img
        src="https://via.placeholder.com/300"
        alt="Product"
        className="w-full h-44 object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Wireless Headphones
        </h2>

        <p className="text-green-600 text-xl font-bold mt-2">
          $99
        </p>
      </div>
    </div>
  );
};

export default Card;
