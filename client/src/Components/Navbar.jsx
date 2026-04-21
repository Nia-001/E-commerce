import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAppContext } from "../Context/AppContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { user, setUser, setShowUserLogin,setSearchQuery,searchQuery,getCartCount,axios} = useAppContext();

const { cartItems } = useAppContext();

const cartCount = Object.values(cartItems).reduce(
  (total, num) => total + num,
  0
);


  const logout = async() => {
    try{
      const { data } = await axios.get('http://localhost:4000/api/user/logout')
if(data.success){
  toast.success(data.message)
  setUser(null);
    navigate("/");
}else{
  toast.error(data.message)
}

    }catch(error){
toast.error(error.message)
    }
      
  };
  useEffect(()=>{
    if(searchQuery.length > 0){
      navigate("/products")
    }
  },[searchQuery])

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "text-blue-400 font-semibold"
      : "text-white hover:text-blue-400 transition";

  return (
    <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 bg-[#0f172a] text-white relative transition-all relative z-50">

      {/* Logo */}
      <NavLink to="/" className="text-2xl font-bold text-white">
        BlueCart
      </NavLink>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center gap-8">

        <NavLink to="/" className={navLinkStyle}>
          Home
        </NavLink>

        <NavLink to="/products" className={navLinkStyle}>
          Products
        </NavLink>

        {user && (
          <NavLink to="/my-orders" className={navLinkStyle}>
            My Orders
          </NavLink>
        )}

        <NavLink to="/contacts" className={navLinkStyle}>
          Contact
        </NavLink>

        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="cursor-pointer px-6 py-2 bg-blue-500 hover:bg-blue-600 transition text-white rounded-full text-sm"
          >
            Login
          </button>
        ) : (
          <button
            onClick={logout}
            className="cursor-pointer px-6 py-2 bg-blue-500 hover:bg-blue-600 transition text-white rounded-full text-sm"
          >
            Logout
          </button>
        )}

        {/* Desktop Search */}
        <div className="hidden lg:flex items-center text-sm gap-2 border border-gray-600 bg-[#1e293b] px-3 rounded-full">
          <input onChange={(e)=>setSearchQuery(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none placeholder-gray-400 text-white"
            type="text"
            placeholder="Search products"
          />
          <svg
            width="16"
            height="16"
            fill="none"
            stroke="gray"
            strokeWidth="1.5"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>

        {/* Cart */}
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer text-xl"
        >
          🛒
         {cartCount > 0 && (
  <span className="absolute -top-2 -right-3 text-xs bg-blue-500 text-white w-5 h-5 flex items-center justify-center rounded-full">
    {cartCount}
  </span>
)}
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Menu"
        className="md:hidden"
      >
        <svg width="24" height="18" fill="white">
          <rect width="24" height="2" rx="1" />
          <rect y="8" width="24" height="2" rx="1" />
          <rect y="16" width="24" height="2" rx="1" />
        </svg>
      </button>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-[60px] left-0 w-full bg-[#0f172a] shadow-md py-4 flex flex-col items-start gap-4 px-6 text-sm md:hidden">

          <NavLink to="/" className={navLinkStyle} onClick={() => setOpen(false)}>
            Home
          </NavLink>

          <NavLink to="/products" className={navLinkStyle} onClick={() => setOpen(false)}>
            All Products
          </NavLink>

          {user && (
            <NavLink to="/my-orders" className={navLinkStyle} onClick={() => setOpen(false)}>
              My Orders
            </NavLink>
          )}

          <NavLink to="/contacts" className={navLinkStyle} onClick={() => setOpen(false)}>
            Contact
          </NavLink>

          <div
            onClick={() => {
              navigate("/cart");
              setOpen(false);
            }}
            className="relative cursor-pointer text-lg"
          >
            🛒
            {cartCount > 0 && (
  <span className="absolute -top-2 -right-3 text-xs bg-blue-500 text-white w-5 h-5 flex items-center justify-center rounded-full">
    {cartCount}</span>)}
          </div>

          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="cursor-pointer px-6 py-2 bg-blue-500 hover:bg-blue-600 transition text-white rounded-full text-sm"
            >
              Login
            </button>
          ) : (
            <button
              onClick={() => {
                logout();
                setOpen(false);
              }}
              className="cursor-pointer px-6 py-2 bg-blue-500 hover:bg-blue-600 transition text-white rounded-full text-sm"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;