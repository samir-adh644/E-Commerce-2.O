import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Card = ({id,name,price,image}) => {

    console.log(image);

    
  return (
    <Link to={`/product/${id}`}>
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition">
      <img
        src={`http://localhost:3000/storage/${image}`}
        alt={name}
        className="w-full h-44 object-cover"
      />

      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">
          {name}
        </h2>

        <p className="text-green-600 text-xl font-bold mt-2">
          ${price}
        </p>
      </div>
    </div>

    </Link>
  );
};

export default Card;
