import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData]= useState({
            email:"",
            password:""
        });
    
        const handleChange =(e)=>{
            setFormData({
                ...formData,
                [e.target.name]: e.target.value
            });
        };
    
        const handleSubmit = async(e)=>{
            e.preventDefault();
            console.log(formData);

            try{
              const res =await axios.post(
                "http://localhost:3000/login",
                formData,
                {
                  withCredentials: true,
                  headers:{"Content-Type":"application/json"}}
              )

               if (res.status === 200) {
                alert(res.data.message);            // Optional: show success
                navigate("/");            // Redirect to homepage                 }
              }

            } catch (error){
              if(error.response){
                alert(error.response.data.message);
            } else {
            alert("Network error");
        }

            }

        };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Log In
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition duration-200"
          >
            LogIn
          </button>
        </form>

        

      </div>
    </div>

    </>
  )
}

export default Login