import React, { useContext, useState, createContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import DummyProduct from "../Components/DummyProduct";
import axios from "axios";
import { useEffect } from "react";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;


export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
 const [sellerChecked, setSellerChecked] = useState(false);
 const [userChecked, setUserChecked] = useState(false);

  const [ isSeller, setIsSeller ] = useState(false)
  const [showUserLogin, setShowUserLogin] = useState(false);
const[searchQuery,setSearchQuery] = useState("")
 const [cartItems,setCartItems] = useState({})

 //fetch seller status

const fetchSeller = async () => {
  try {
    const { data } = await axios.get('http://localhost:4000/api/seller/is-auth');
    setIsSeller(data.success);
  } catch (error) {
    setIsSeller(false);
  } finally {
    setSellerChecked(true); 
  }
};

 //fetch user Auth status
/*const fetchUser = async ()=>{
  try{
    const {data} = await axios.get('http://localhost:4000/api/user/is-auth');
    if (data.success){
      setUser(data.user)
      setCartItems(data.user.cartItems)
    }
  }catch(error){
    setUser(null)
  }
  finally {
    setUserChecked(true); 
  }
}
*/


const fetchUser = async () => {
  try {
    const { data } = await axios.get(
      "http://localhost:4000/api/user/is-auth"
    );

    if (data.success) {
      setUser(data.user);

      // ✅ CHECK if coming from payment success page
      const isPaymentRedirect = window.location.search.includes("session_id");

      if (!isPaymentRedirect) {
        setCartItems(data.user.cartItems);
      } else {
        // ✅ DO NOT restore cart after payment
        setCartItems({});
      }
    }
  } catch (error) {
    setUser(null);
  } finally {
    setUserChecked(true);
  }
};
 

 //Fetch All products
const fetchProducts = async () => {
  try {
    const { data } = await axios.get('http://localhost:4000/api/product/list');

    console.log("DATA FROM API:", data);   

    if (data.success) {
      setProducts(data.products);
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    console.log(error);
    toast.error(error.message);
  }
};

 const getCartCount = ()=>{
  let totalCount =0
  for(const item in cartItems){
    totalCount+= cartItems[item];
  }
  return totalCount;
 }
 
 const getCartAmount = () => {
  let totalAmount = 0;

  for (const item in cartItems) {
    let itemInfo = products.find((product) => product._id === item);

    if (itemInfo && cartItems[item] > 0) {
      totalAmount += itemInfo.offerPrice * cartItems[item];
    }
  }

  return Math.floor(totalAmount * 100) / 100;
};

const addToCart = (itemId) => {
  let cartData = structuredClone(cartItems);

  if (cartData[itemId]) {
    cartData[itemId] += 1;
  } else {
    cartData[itemId] = 1;
  }

  setCartItems(cartData);
  toast.success("Added to cart");
};

  const removeFromCart = (itemId) => {
  let cartData = structuredClone(cartItems);

  if (cartData[itemId]) {
    cartData[itemId] -= 1;

    if (cartData[itemId] === 0) {
      delete cartData[itemId];
    }
  }

  setCartItems(cartData);
  toast.success("Removed from cart");
};

  const updateCartItem = (itemId,quantity)=>{
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData)
    toast.success("cart Updated")
  }

  
useEffect(()=>{
  fetchSeller()
  fetchUser()
  fetchProducts()
},[])

useEffect(() => {
  const updateCart = async () => {
    try {
      const { data } = await axios.post(
        'http://localhost:4000/api/cart/update',
        { cartItems }

        
      );

      if (!data.success) {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (user) {
    updateCart(); 
  }

}, [cartItems, user]);

 

const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,searchQuery,setSearchQuery,products,setProducts, addToCart,updateCartItem,removeFromCart,cartItems,
    getCartAmount,getCartCount,axios,fetchProducts,sellerChecked,setCartItems
  };


  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};