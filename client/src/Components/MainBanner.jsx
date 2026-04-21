import React from "react";
import { Link } from "react-router-dom";

const MainBanner = () => {
  return (
    <div className="relative">

      {/* Same Image for All Devices */}
      <img
        src="https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg"
        className="w-full h-[500px] object-cover"
        alt="Banner"
      />

      {/* Overlay Content */}
      <div
        className="absolute inset-0 flex flex-col 
        items-start text-left justify-center 
        md:items-start md:text-left 
        px-4 md:px-16"
      >
        <h1
          className="text-3xl md:text-4xl lg:text-5xl font-bold 
          max-w-3xl leading-tight text-blue-900 md:text-blue-900"
        >
          Freshness You Can <br />Trust, Savings You <br />Will Love!
        </h1>

        <div className="mt-6">
          <Link
            to="/products"
            className="inline-block px-8 py-3 bg-[#0f172a] hover:bg-blue-600 transition rounded-full text-white font-medium"
          >
            Shop Now
          </Link>
        </div>
      </div>

    </div>
  );
};

export default MainBanner;