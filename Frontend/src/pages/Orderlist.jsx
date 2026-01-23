import React, { useEffect, useState } from 'react'
import axios from'axios'
import { useNavigate } from 'react-router-dom'

const Orderlist = () => {
  const [orders,setOrders]= useState([])
  const navigate = useNavigate()

  useEffect(()=>{
    axios.get("http://localhost:3000/order-list",{
      withCredentials:true
    })
    .then(res=>setOrders(res.data))
    .catch(err =>{
      if(err.response?.status === 401){
        navigate("/login-user")
      }
    })
    
  },[])

  return (
    <div>
      <h2>Your Orders</h2>
      {orders.map(o =>{
        <div key={o.id}>{o.quantity}</div>
      })}
    </div>
  )
}

export default Orderlist