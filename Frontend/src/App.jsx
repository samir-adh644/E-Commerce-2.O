import './App.css'
import Navbar from './components/Navbar'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Orderlist from './pages/Orderlist';
import Login from './pages/Login';
import Register from './pages/Register';
import UploadProduct from './pages/UploadProduct';

function App() {


  return (
    <>
      <BrowserRouter>
   
      <Navbar />
 
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/order_list" element={<Orderlist />} />
        <Route exact path="/login-user" element={<Login />} />
        <Route exact path="/register-user" element={<Register />} />
        <Route exact path="/upload-product" element={<UploadProduct />} />
      </Routes>
 
    
    </BrowserRouter>
       
    </>
  )
}

export default App
