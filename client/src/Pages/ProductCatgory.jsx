import React from "react";
import { useAppContext } from "../Context/AppContext";
import { useParams } from "react-router-dom";
import ProductCart from "../Components/ProductCart";

const ProductCategory = () => {
  const { products } = useAppContext();
  const { category } = useParams();   // must match route param name

  // Filter products safely
  const filteredProducts = products.filter(
  (product) =>
    product.category &&
    category &&
    product.category.trim().toLowerCase() ===
    category.trim().toLowerCase()
);
 

  return (
    <div className="mt-16 px-6">

      {/* Heading */}
      <div className="flex flex-col items-start mb-8">
        <p className="text-2xl font-medium uppercase">
          {category}
        </p>
        <div className="w-16 h-0.5 bg-primary rounded-full"></div>
      </div>

      {/* Products Grid */}
      {
        filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {filteredProducts.map((product) => (
          <ProductCart key={product._id} product={product} />
         
        ))
        }</div>):
        (
            <div className="flex items-center justify-center h-[60vh]"> 
            <p className="text-2xl font-medium text-primary">No products found in this category.</p>
            </div>
        )
      }
      
       
    
    </div>
  );
};

export default ProductCategory;