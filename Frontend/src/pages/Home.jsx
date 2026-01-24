import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";

const Home = () => {
  const [products,setProducts] = useState([])

  useEffect(()=>{
    const fetchProducts= async ()=>{
      try{
        const res = await axios.get("http://localhost:3000/renderProduct")
        setProducts(res.data.data)
      } catch (err){
        console.log(err);
      }
    };
    fetchProducts();
  },[]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        
        {products.map((p)=>(
          <Card 
           id ={p.id}
           name={p.name}
           price = {p.price}
           image = {p.image}
          />
        ))}
        
        
      </div>
    </div>
  );
};

export default Home;
