
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import toast from "react-hot-toast";

const Order = () => {
const [orders,setOrders]=useState([])
const {axios} = useAppContext()

const fetchMyOrders = async () => {
  try {
    const {data} = await axios.get('http://localhost:4000/api/order/seller')
 

    if(data.success){
      setOrders(data.orders)
    }else{
      toast.error(data.message)
    }
  }catch(error){
    toast.error(error.message)
  }
  
};

useEffect(()=>{
    fetchMyOrders();
},[])

    const boxIcon = "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/e-commerce/boxIcon.svg"

    
    return (
        <div className="no-scrollbar flex-1 h-[95vh] overflow-y-srcoll">
        <div className="md:p-10 p-4 space-y-4">
            <h2 className="text-lg font-medium">Orders List</h2>
            {orders.map((order, index) => (
                <div key={index} className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center md:flex-row gap-5 p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800">
                    <div className="flex gap-5 max-w-80">
                        <img className="w-12 h-12 object-cover opacity-60" src={boxIcon} alt="boxIcon" />
                        <div>
                            {order.items?.map((item, index) => (
  <div key={index} className="flex flex-col">
      <p className="font-medium">
          {item.product?.name} {" "}
          <span className="text-primary"> x {item.quantity}</span>
      </p>
  </div>
))}
                        </div>
                    </div>

                    <div className="text-sm md:text-base text-block/60">
                        <p className='text-black/80'>{order.address.firstName} {order.address.lastName}</p>
                        <p>{order.address.street}, {order.address.city}</p>
                         <p>{order.address.state}, {order.address.zipcode}, {order.address.country}</p>
                         <p>{order.address.phone}</p>
                    </div>

                    <p className="font-medium text-base my-auto text-black/60">${order.amount}</p>

                    <div className="flex flex-col text-sm">
                        <p>Method: {order.paymentType}</p>
                        <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                        <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
                    </div>
                </div>
            ))}
        </div></div>
    );
};

export default Order