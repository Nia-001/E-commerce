import React from "react";
import ProductCart from "./ProductCart";
import { useAppContext } from "../Context/AppContext";

const products = [
  {
    name: "Fresh Apples",
    category: "Fruits",
    price: 5,
    offerPrice: 3.5,
    image: "https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg",
  },
  {
    name: "Organic Milk",
    category: "Dairy",
    price: 4,
    offerPrice: 2.8,
    image: "https://images.pexels.com/photos/416656/pexels-photo-416656.jpeg",
  },
  {
    name: "Brown Bread",
    category: "Bakery",
    price: 3,
    offerPrice: 2,
    image: "https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg",
  },
  {
    name: "Fresh Tomatoes",
    category: "Vegetables",
    price: 4,
    offerPrice: 2.5,
    image: "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg",
  },
  {
    name: "Orange Juice",
    category: "Beverages",
    price: 6,
    offerPrice: 4.5,
    image: "https://images.pexels.com/photos/96974/pexels-photo-96974.jpeg",
  },
];

const BestSeller = () => {

const {products} = useAppContext()
  return (
    <div className="mt-20 px-6 md:px-16 lg:px-24">

      <h1 className="text-3xl font-bold text-gray-800">
         Best Sellers
      </h1>

      <div className="mt-8 flex gap-6 overflow-x-auto overflow-y-hidden">
        {products.map((item, index) => (
          <ProductCart key={index} product={item}   />

        ))}
        
      </div>

    </div>
  );
};

export default BestSeller;