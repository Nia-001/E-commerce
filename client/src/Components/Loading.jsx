/*import React from "react";
import { useAppContext } from "../Context/AppContext";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const Loading = () =>{

const {navigate} = useAppContext()
let {search} = useLocation()
const query = new URLSearchParams(search)
const nextUrl = query.get('next');

useEffect(()=>{
if(nextUrl){
  
    setTimeout(()=>{
navigate(`/${nextUrl}`)
    },5000)
}
},[nextUrl])

    return(
        <div className="flex justify-center items-center h-screen"> 
        <div className="animate-spin rounded-full h-24 border-4 border-gray-300 border-t-primary">

        </div>


        </div>
    )
}
export default Loading
*/


/*import React, { useEffect } from "react";
import { useAppContext } from "../Context/AppContext";
import { useLocation } from "react-router-dom";

const Loading = () => {
  const { navigate, setCartItems } = useAppContext();

  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const nextUrl = query.get("next");
  const session_id = query.get("session_id");

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        if (!session_id) return;

        const res = await fetch(
          `/api/order/verify?session_id=${session_id}`
        );

        const data = await res.json();

        if (data.success) {
          // ✅ clear frontend cart (if using context/state)
          if (setCartItems) {
            setCartItems([]);
          }

          // optional small delay for UX
          setTimeout(() => {
            navigate(`/${nextUrl || "my-orders"}`);
          }, 1000);
        } else {
          console.log("Payment not verified");
        }
      } catch (err) {
        console.log(err);
      }
    };

    verifyPayment();
  }, [session_id, nextUrl]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-24 border-4 border-gray-300 border-t-primary"></div>
    </div>
  );
};

export default Loading;*/


/*import React, { useEffect } from "react";
import { useAppContext } from "../Context/AppContext";
import { useLocation } from "react-router-dom";
import axios from "axios"; // ✅ FIX 1

const Loading = () => {
  const { navigate, setCartItems } = useAppContext();

  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const nextUrl = query.get("next");
  const session_id = query.get("session_id");

  useEffect(() => {
  const verifyAndRedirect = async () => {
    try {
        console.log("SESSION ID:", session_id);

      if (!session_id) return;

      const res = await fetch(
        `http://localhost:4000/api/order/verify?session_id=${session_id}`
      );

      const data = await res.json();

      if (data.success) {
        // ✅ clear frontend
        setCartItems({});

        setTimeout(() => {
          navigate(`/${nextUrl || "my-orders"}`);
        }, 1000);
      } else {
        console.log("Payment failed");
        
      }

    } catch (err) {
      console.log(err);
    }
  };

  verifyAndRedirect();
}, [session_id]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-24 border-4 border-gray-300 border-t-primary"></div>
    </div>
  );
};

export default Loading;*/




import React, { useEffect } from "react";
import { useAppContext } from "../Context/AppContext";
import { useLocation } from "react-router-dom";

const Loading = () => {
  const { navigate, setCartItems } = useAppContext();

  const { search } = useLocation();
  const query = new URLSearchParams(search);

  const nextUrl = query.get("next");

  useEffect(() => {
    // ✅ CLEAR CART (UI only)
    setCartItems({});

    // ✅ redirect after short delay
    setTimeout(() => {
      navigate(`/${nextUrl || "my-orders"}`);
    }, 1000);

  }, []);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-24 border-4 border-gray-300 border-t-primary"></div>
    </div>
  );
};

export default Loading;