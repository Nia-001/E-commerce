import React from "react";
import { useAppContext } from "../Context/AppContext";
import ProductCart from "../Components/ProductCart";
import { useState, useEffect } from "react";

const AllProducts = () => {
  const { products = [], searchQuery = "" } = useAppContext();
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilteredProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilteredProducts(products);
    }
  }, [products, searchQuery]);

  return (
    <div className="mt-16 flex flex-col px-8 ">
      
      {/* Title Section */}
      <div className="flex flex-col items-start w-max mb-10">
        <p className="text-2xl font-medium uppercase">
          All Products
        </p>
        <div className="w-16 h-0.5 bg-primary rounded-full mt-2"></div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
      { /* {filteredProducts
          .filter((product) => product.inStock)
          .map((product) => (
            <ProductCart key={product._id} product={product} />
           
          ))}*/}
           {filteredProducts.map((product) => (
  <ProductCart key={product._id} product={product} />
))}
      </div>

    </div>
  );
};

export default AllProducts;