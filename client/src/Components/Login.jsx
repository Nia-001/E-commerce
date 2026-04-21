/*import React from "react";
import { useAppContext } from "../Context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
 

            const Login = () => {
                const{setShowUserLogin,setUser,navigate}=useAppContext()
    const [state, setState] = React.useState("login")
    const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
     
    

   const handleSubmit = async (e) => {
  try {
    e.preventDefault();

    const { data } = await axios.post(`http://localhost:4000/api/user/${state}`, {
      name,
      email,
      password
    });

    if (data.success) {
      navigate("/");
      setUser(data.user);
      setShowUserLogin(false);
    } else {
      toast.error(data.message);
    }

  } catch (error) {
    toast.error(error.message);
  }
};

   

    return (
        <div
  onClick={() => setShowUserLogin(false)}
  className="fixed inset-0 z-30 flex items-center justify-center text-sm text-gray-600 bg-black/50"
>
        <form onSubmit={handleSubmit}
        onClick={(e)=>e.stopPropagation()}
            
            className="sm:w-87.5 w-full text-center bg-gray-900 border border-gray-800 rounded-2xl px-8">
            <h1 className="text-white text-3xl mt-10 font-medium">
                {state === "login" ? "Login" : "Sign up"}
            </h1>

            <p className="text-gray-400 text-sm mt-2">Please sign in to continue</p>

            {state !== "login" && (
                <div className="flex items-center mt-6 w-full bg-gray-800 border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2 ">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <circle cx="12" cy="8" r="5" /> <path d="M20 21a8 8 0 0 0-16 0" /> </svg>
                    <input
  type="text"
  placeholder="Name"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
                </div>
            )}

            <div className="flex items-center w-full mt-4 bg-gray-800 border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2 ">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /> <rect x="2" y="4" width="20" height="16" rx="2" /> </svg>
                <input
  type="email"
  placeholder="Email id"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/></div>
            <div className=" flex items-center mt-4 w-full bg-gray-800 border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2 ">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /> <path d="M7 11V7a5 5 0 0 1 10 0v4" /> </svg>
               <input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/></div>

            <div className="mt-4 text-left">
                <button className="text-sm text-indigo-400 hover:underline">
                    Forget password?
                </button>
            </div>

            <button type="submit" className="mt-2 w-full h-11 rounded-full text-white bg-indigo-600 hover:bg-indigo-500 transition " >
                {state === "login" ? "Login" : "Sign up"}
            </button>

            <p onClick={() => setState(prev => prev === "login" ? "register" : "login") } className="text-gray-400 text-sm mt-3 mb-11 cursor-pointer" >
                {state === "login" ? "Don't have an account?" : "Already have an account?"}
                <span className="text-indigo-400 hover:underline ml-1">click here</span>
            </p>
        </form>
        </div>
    )
}
    export default Login   */


    import React from "react";
import { useAppContext } from "../Context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const { setShowUserLogin, setUser, setIsSeller, navigate } = useAppContext();

  const [state, setState] = React.useState("login"); // login | register
  const [role, setRole] = React.useState("user"); // user | seller

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let url = "";

      //  Decide API based on role
      if (role === "seller") {
        url = "http://localhost:4000/api/seller/login";
      } else {
        url = `http://localhost:4000/api/user/${state}`;
      }

      const { data } = await axios.post(url, {
        name,
        email,
        password,
      });

      if (data.success) {
        if (role === "seller") {
          setIsSeller(true);
          navigate("/seller");
        } else {
          setUser(data.user);
          navigate("/");
        }

        setShowUserLogin(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed inset-0 z-30 flex items-center justify-center text-sm text-gray-600 bg-black/50"
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="sm:w-87.5 w-full text-center bg-gray-900 border border-gray-800 rounded-2xl px-8"
      >
        <h1 className="text-white text-3xl mt-10 font-medium">
          {role === "seller"
            ? "Seller Login"
            : state === "login"
            ? "Login"
            : "Sign up"}
        </h1>

        {/* 🔹 Role Switch */}
        <div className="flex justify-center gap-4 mt-4">
          <button
            type="button"
            onClick={() => setRole("user")}
            className={`px-4 py-1 rounded ${
              role === "user" ? "bg-indigo-600 text-white" : "bg-gray-700"
            }`}
          >
            User
          </button>
          <button
            type="button"
            onClick={() => setRole("seller")}
            className={`px-4 py-1 rounded ${
              role === "seller" ? "bg-indigo-600 text-white" : "bg-gray-700"
            }`}
          >
            Seller
          </button>
        </div>

        {/* 🔹 Name (only for register & user) */}
        {state !== "login" && role === "user" && (
          <input
            className="mt-6 w-full p-2 rounded bg-gray-800 text-white"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

        {/* 🔹 Email */}
        <input
          className="mt-4 w-full p-2 rounded bg-gray-800 text-white"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        {/* 🔹 Password */}
        <input
          className="mt-4 w-full p-2 rounded bg-gray-800 text-white"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="mt-4 w-full py-2 bg-indigo-600 text-white rounded">
          {role === "seller"
            ? "Login as Seller"
            : state === "login"
            ? "Login"
            : "Sign up"}
        </button>

        {/* 🔹 Toggle login/register only for user */}
        {role === "user" && (
          <p
            onClick={() =>
              setState((prev) =>
                prev === "login" ? "register" : "login"
              )
            }
            className="text-gray-400 text-sm mt-3 mb-6 cursor-pointer"
          >
            {state === "login"
              ? "Don't have an account?"
              : "Already have an account?"}
            <span className="text-indigo-400 ml-1">click here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;