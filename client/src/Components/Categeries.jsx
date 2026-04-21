import React from "react";
import { useNavigate } from "react-router-dom";


export const categoriesData = [
  {
    name: "Fruits",
    image: "https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg",
    bg: "bg-red-100",
  },
  {
    name: "Vegetables",
    image: "https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg",
    bg: "bg-green-100",
  },
  {
    name: "Bakery",
    image: "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg",
    bg: "bg-yellow-100",
  },
  {
    name: "Dairy",
    image: "https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg",
    bg: "bg-blue-100",
  },
  {
    name: "Beverages",
    image: "https://images.pexels.com/photos/544961/pexels-photo-544961.jpeg",
    bg: "bg-purple-100",
  },
  {
    name: "Snacks",
    image: "https://images.pexels.com/photos/1583884/pexels-photo-1583884.jpeg",
    bg: "bg-orange-100",
  },
  {
    name: "Meat",
    image: "https://images.pexels.com/photos/65175/pexels-photo-65175.jpeg",
    bg: "bg-rose-100",
  },
  {
    name: "Seafood",
    image: "https://images.pexels.com/photos/3296279/pexels-photo-3296279.jpeg",
    bg: "bg-cyan-100",
  },
  {
    name: "Frozen",
    image: "https://images.pexels.com/photos/4397919/pexels-photo-4397919.jpeg",
    bg: "bg-indigo-100",
  },
  {
    name: "Organic",
    image: "https://images.pexels.com/photos/1458695/pexels-photo-1458695.jpeg",
    bg: "bg-lime-100",
  },
];

const Categories = () => {
 const navigate = useNavigate();
 
  return (
    <div className="mt-20 px-6 md:px-16 lg:px-24">

      {/* Section Heading */}
      <div className="text-left">
        <h1 className="text-3xl font-bold text-gray-800">
         Categories
      </h1>
      </div>

      {/* Categories Grid */}
       <div className="mt-8 flex gap-6 overflow-x-auto overflow-y-hidden scrollbar-hide">
        {categoriesData.map((category, index) => (
          <div
            key={index}
            className={`w-[160px] h-[170px] flex-shrink-0 ${category.bg}
  rounded-2xl p-5 flex flex-col items-center justify-center
  cursor-pointer transition hover:scale-105`}
         onClick={()=>{
            navigate(`/products/${category.name.toLowerCase()}`);
            scrollTo(0,0)
         }} >

            <img
              src={category.image}
              alt={category.name}
             className="w-16 h-16 object-cover rounded-full"
            />

            <p className="mt-4 font-semibold text-gray-700 group-hover:text-blue-500 transition">
              {category.name}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Categories;