import React, { useEffect, useState } from "react";
import { useAppContext } from "../Context/AppContext";
import toast from "react-hot-toast";
import cors from 'cors'


const Cart = () => {
    const{products,cartItems,removeFromCart,getCartCount,updateCartItem,navigate,getCartAmount,axios,user,setCartItems}= useAppContext()
     const [cartArray,setCartArray]=useState([])
const [addresses,setAddresses]=useState([])
const [selecteAddress,setSelecteAddress] = useState(null)
const[paymentOption,setPaymentOption] = useState("COD")

const getCart =()=>{
let tempArray = []
for(const key in cartItems)
{
    const product =products.find((item)=>item._id === key)
    tempArray.push({
  ...product,
  quantity: cartItems[key]
})
}
setCartArray(tempArray)
}

const getUserAddress = async ()=>{
    try{

         const {data} = await axios.get('http://localhost:4000/api/address/get')

          console.log("API RESPONSE:", data);

         if(data.success){
            setAddresses(data.addresses)
            if(data.addresses.length > 0){
                setSelecteAddress(data.addresses[0])
            }
         }else{
            toast.error(data.message)
         }

    } catch(error){
             toast.error(error.message)
        }
}



const placeOrder = async ()=>{
try{
    if(!selecteAddress){
        return toast.error('Please select an address')
    }
    if(paymentOption === 'COD'){
        const {data} = await axios.post('http://localhost:4000/api/order/cod' , {
            userId: user._id,
            items: cartArray.map(item=> ({product: item._id, quantity: item.quantity})),address: selecteAddress._id
        })
if(data.success)
{
    toast.success(data.message)
    setCartItems({})
    navigate('/my-orders')
}   else{
    toast.error(data.message)
}


    }else{
        //place order with stripe
        const {data} = await axios.post('http://localhost:4000/api/order/stripe' , {
            
            items: cartArray.map(item=> ({product: item._id, quantity: item.quantity})),address: selecteAddress._id
        })
if(data.success)
{
    window.location.replace(data.url)
}   else{
    toast.error(data.message)
}

    }
}catch(error){
toast.error(error.message)
}
}


useEffect(()=>{
    if(products.length >0 && cartItems){
        getCart()
    }
},[products,cartItems])

    const [showAddress, setShowAddress] = useState(false)
useEffect(() => {
    if (user) {
        getUserAddress();
    }
}, [user]);

    
    return products.length >0 && cartItems ? (
        <div className="flex flex-col md:flex-row mt-16 gap-10 items-start">
            <div className='flex-1 max-w-full'>
                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart <span className="text-sm text-indigo-500">{getCartCount()} Items</span>
                </h1>

                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>

                {cartArray.map((product, index) => (
                    <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                        <div className="flex items-center md:gap-6 gap-3">
                            <div onClick={()=>{
                                navigate(`/products/${product.category.toLowerCase()}/${product._id}`);scrollTo(0,0)
                            }} className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden">
                               <img
  className="max-w-full h-full object-cover"
  src={`http://localhost:4000/${product.image[0].replace(/\\/g, "/")}`}
  alt={product.name}
/>
                            </div>
                            <div>
                                <p className="hidden md:block font-semibold">{product.name}</p>
                                <div className="font-normal text-gray-500/70">
                                    <p>Weight: <span>{product.weight || "N/A"}</span></p>
                                    <div className='flex items-center'>
                                        <p>Qty:</p>
                                        <select onChange={e=>updateCartItem(product._id,Number(e.target.value))} value={cartItems[product._id]} className='outline-none'>
                                            {Array(cartItems[product._id] >9 ? cartItems[product._id]: 9).fill('').map((_, index) => (
                                                <option key={index} value={index + 1}>{index + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center">${product.offerPrice * product.quantity}</p>
                       <button
 onClick={() => removeFromCart(product._id)}
 className="cursor-pointer mx-auto"
>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="m12.5 7.5-5 5m0-5 5 5m5.833-2.5a8.333 8.333 0 1 1-16.667 0 8.333 8.333 0 0 1 16.667 0" stroke="#FF532E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>
                    </div>)
                )}

                <button onClick={()=>{navigate("/products");scrollTo(0,0)}} className="group cursor-pointer flex items-center mt-8 gap-2 text-indigo-500 font-medium">
                    <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M14.09 5.5H1M6.143 10 1 5.5 6.143 1" stroke="#615fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Continue Shopping
                </button>

            </div>

            <div className="w-full md:max-w-[360px] bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
                <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
                <hr className="border-gray-300 my-5" />

                <div className="mb-6">
  <p className="text-sm font-medium uppercase">Delivery Address</p>

 <div className="mt-3 space-y-2">
  {addresses.length > 0 ? (
    addresses.map((addr) => (
      <div
        key={addr._id}
        onClick={() => setSelecteAddress(addr)}
        className={`p-3 border rounded cursor-pointer ${
          selecteAddress?._id === addr._id
            ? "border-indigo-500 bg-indigo-50"
            : "border-gray-300"
        }`}
      >
        <p className="text-sm text-gray-700">
          {addr.firstName} {addr.lastName}
        </p>
        <p className="text-xs text-gray-500">
          {addr.street}, {addr.city}, {addr.state}, {addr.country}
        </p>
        <p className="text-xs text-gray-500">{addr.phone}</p>
      </div>
    ))
  ) : (
    <p className="text-gray-500 text-sm">No address found</p>
  )}
</div>

  <div className="flex flex-col items-start">
    <button
      onClick={() => setShowAddress(!showAddress)}
      className="text-indigo-500 hover:underline cursor-pointer"
    >
      Change
    </button>

    {showAddress && (
      <p
        onClick={() =>{ if (!user) {
    toast.error("Please login first");
    return;
  }navigate("/add-address")}}
        className="text-indigo-500 cursor-pointer mt-1 hover:underline"
      >
        Add Address
      </p>
    )}
  </div>
</div>

                    <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

                    <select onChange={e => setPaymentOption(e.target.value)} className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none">
                        <option value="COD">Cash On Delivery</option>
                        <option value="Online">Online Payment</option>
                    </select>
                

                <hr className="border-gray-300" />

                <div className="text-gray-500 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Price</span><span>{getCartAmount()}</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Shipping Fee</span><span className="text-green-600">Free</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Tax (2%)</span><span>{getCartAmount()*2/100}</span>
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Total Amount:</span><span>{getCartAmount() + getCartAmount()*2/100}</span>
                    </p>
                </div>

                <button  onClick={placeOrder} className="w-full py-3 mt-6 cursor-pointer bg-indigo-500 text-white font-medium hover:bg-indigo-600 transition">
                   {paymentOption === 'COD'? "Place Order" : "Proceed to Checkout"}
                </button>
            </div>
      </div>
    ): null
}
export default Cart