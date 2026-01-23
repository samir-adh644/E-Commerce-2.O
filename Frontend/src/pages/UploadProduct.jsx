import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const UploadProduct = () => {
  const navigate = useNavigate()

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: "",
    stock: ""
  })

  const [imageFile, setImage] = useState(null)

  const handleChange = (e) => {
    setProductData({
      ...productData,
      [e.target.name]: e.target.value
    })
  }

  const handleImageChange = (e) => {
    setImage(e.target.files[0])
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("name", productData.name)
    formData.append("description", productData.description)
    formData.append("price", productData.price)
    formData.append("stock", productData.stock)
    formData.append("image", imageFile)

    try {
      const res = await axios.post(
        "http://localhost:3000/upload-product",
        formData,
        { withCredentials: true }
      )

      alert(res.data.message)
      navigate("/")
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message)
      } else {
        alert("Network error")
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Upload Your Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
        
          <input
            type="text"
            name="name"
            placeholder="Product name"
            value={productData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="description"
            placeholder="Description"
            value={productData.description}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={productData.price}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            value={productData.stock}
            onChange={handleChange}
            required
          />

          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            required
          />

          <button type="submit" className="bg-blue-800 text-white p-1">
            Upload
          </button>

        </form>
      </div>
    </div>
  )
}

export default UploadProduct
