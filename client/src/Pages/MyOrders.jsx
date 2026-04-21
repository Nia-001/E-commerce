import React, { useEffect, useState } from "react";
import { useAppContext } from "../Context/AppContext";

const MyOrders = ()=>{

const [myOrders, setMyOrders] = useState([])
const {axios,user} = useAppContext()

const fetchOrders = async ()=>{
    try{
        const {data} = await axios.get('http://localhost:4000/api/order/user')
        
        if(data.success){
            setMyOrders(data.orders)
        }
    }catch(error){
console.log(error)
    }

   
}

useEffect(()=>{
    if (user){fetchOrders()
        
    }
    
},[user])

return(
<div className="mt-16 pb-16">
<div className="flex flex-col md:flex-row items-start md:items-end w-full mb-8">
  <p className="text-2xl font-medium uppercase">
    My Orders
  </p>
  <div className="w-16 h-0.5 bg-primary rounded-full mt-2 md:mt-0"></div>
</div>

{myOrders.map((order,index)=>(
<div key={index} className="border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl">
<p className="flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col">
<span>OrderId : {order._id}</span>
<span>Payment : {order.paymentType}</span>
<span>Total Amount : ${order.amount}</span>
</p>
</div>
))}

</div>
)
}

export default MyOrders