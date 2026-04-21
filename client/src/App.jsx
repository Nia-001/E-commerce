import React from "react";
import Navbar from "./Components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import Footer from "./Components/Footer";
import {useAppContext} from './Context/AppContext';
import Login from "./Components/Login";
import AllProducts from "./Pages/AllProducts";
import ProductCatgroy from "./Pages/ProductCatgory";
import {Toaster} from "react-hot-toast"
import ProductDetails from "./Pages/ProductDetails";
import Cart from "./Pages/Cart";
import AddAddress from "./Pages/AddAddress";
import MyOrders from "./Pages/MyOrders"
import SellerLogin from "./Components/Seller/SellerLogin";
import SellerLayout from "./Pages/Seller/SellerLayout";
import AddProduct from "./Pages/Seller/AddProduct";
import ProductList from "./Pages/Seller/ProductList";
import Order from "./Pages/Seller/Order";
import Contact from "./Pages/Seller/Contact";
import Loading from "./Components/Loading";
const App = ()=>{
 const  isSellerPath = useLocation().pathname.includes("seller");
 const {showUserLogin,isSeller, sellerChecked}=useAppContext() 
 return(
    <div className="text-default min-h-screen text-gray-700 bg-white">
{isSellerPath ? null :<Navbar/>}
<Toaster/>

{showUserLogin ? <Login/> : null}

<div className={`${isSellerPath ? "":"px-6 md:px-16 lg:px-24 xl:px-32"}`}>
<Routes>
  <Route path='/' element={<Home/>}/>
   <Route path='/products' element={<AllProducts/>}/>
   <Route path='/products/:category' element={<ProductCatgroy/>}/>
  <Route path="/products/:category/:id" element={<ProductDetails />} /> 
   <Route path="/cart" element={<Cart />} /> 
    <Route path="/add-address" element={<AddAddress />} /> 
  <Route path="/my-orders" element={<MyOrders/>} /> 
   <Route path="/contacts" element={<Contact/>} /> 
    <Route path="/loader" element={<Loading/>} /> 
  
  <Route 
  path="/seller" 
  element={
    !sellerChecked 
      ? <Loading /> 
      : isSeller 
        ? <SellerLayout/> 
        : <SellerLogin/>
  }
>
    <Route index element={isSeller ? <AddProduct/> : null }/>
    <Route path="product-list" element={<ProductList/>}/>
     <Route path="orders" element={<Order/>}/>
    
  </Route>

</Routes>
{!isSellerPath && <Footer/>}
</div>
    </div>
  )
}
export default App