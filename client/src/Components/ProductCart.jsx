import React from "react";
import { useAppContext } from "../Context/AppContext";

const ProductCart = ({ product }) => {
  const [count, setCount] = React.useState(0);
const {navigate,addToCart,removeFromCart,cartItems} =useAppContext()
  return product && (
    <div onClick={()=>{ navigate(`/products/${product.category.toLowerCase()}/${product._id}`);scrollTo(0,0)}} className="bg-white rounded-xl shadow-sm hover:shadow-lg transition duration-300 p-4 w-[220px] flex-shrink-0 relative">

      


      {/* Image */}
      <div className="flex items-center justify-center h-[140px]">
       
        <img
  src={`http://localhost:4000/${product.image[0].replace(/\\/g, "/")}`}
  alt={product.name}
  className="max-h-full object-contain hover:scale-105 transition"
/>
      </div>

      {/* Info */}
      <div className="mt-4">
        <p className="text-xs text-gray-400 uppercase">
          {product.category}
        </p>

        <p className="font-semibold text-gray-800 truncate">
          {product.name}
        </p>

        {/* Price + Cart */}
        <div className="flex items-center justify-between mt-3">

          <div>
            <p className="text-lg font-bold text-[#0f172a]">
              ${product.offerPrice}
            </p>
            <p className="text-xs text-gray-400 line-through">
              ${product.price}
            </p>
          </div>

          {/* Cart Button */}<div onClick={(e)=>{e.stopPropagation();}} className="text-primary">
          {!cartItems[product._id] ? (
            <button
              onClick={() => addToCart(product._id)}
              className="px-4 py-1.5 bg-[#0f172a] hover:bg-[#1e293b] text-white text-sm rounded-md transition cursor-pointer"
            >
              Add
            </button>
          ) : (
            <div className="flex items-center bg-[#0f172a]/10 rounded-md">
              <button
                onClick={() => {removeFromCart(product._id)}}
                className="px-3 text-[#0f172a] font-bold"
              >
                -
              </button>
              <span className="px-2 text-sm font-medium text-[#0f172a]" >
                {cartItems[product._id]}
              </span>
              <button
                onClick={() => {addToCart(product._id)}}
                className="px-3 text-[#0f172a] font-bold"
              >
                +
              </button>
            </div>
          )}</div>

        </div>
      </div>
    </div>
  );
};

export default ProductCart;