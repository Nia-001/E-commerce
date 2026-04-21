/*import React from "react";
import { useAppContext } from "../../Context/AppContext";
import toast from "react-hot-toast";

const ProductList = () => {
const {products,axios,fetchProducts} =useAppContext()

const toggleStock = async (id, inStock)=>{
    try{
const {data} = await axios.post('http://localhost:4000/api/product/stock', {id,inStock});
if(data.success){
    fetchProducts();
    toast.success(data.message)
}else{
    toast.error(data.message)
}
    }catch(error){
toast.error(error.message)
    }
}

    return (
        <div className=" no scrollbar flex-1 h-[95vh] overflow-y-scroll flex flex-col justify-between">
            <div className="w-full md:p-10 p-4">
                <h2 className="pb-4 text-lg font-medium">All Products</h2>
                <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md bg-white border border-gray-500/20">
                    <table className="md:table-auto table-fixed w-full overflow-hidden">
                        <thead className="text-gray-900 text-sm text-left">
                            <tr>
                                <th className="px-4 py-3 font-semibold truncate">Product</th>
                                <th className="px-4 py-3 font-semibold truncate">Category</th>
                                <th className="px-4 py-3 font-semibold truncate hidden md:block">Selling Price</th>
                                <th className="px-4 py-3 font-semibold truncate">In Stock</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm text-gray-500">
                            {products.map((product) => (
                                <tr key={product._id} className="border-t border-gray-500/20">
                                    <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3 truncate">
                                        <div className="border border-gray-300 rounded overflow-hidden">
                                            <img src={`http://localhost:4000/${product.image[0].replace(/\\/g, "/")}`}alt="Product"className="w-16"/>
                                        </div>
                                        <span className="truncate max-sm:hidden w-full">{product.name}</span>
                                    </td>
                                    <td className="px-4 py-3">{product.category}</td>
                                    <td className="px-4 py-3 max-sm:hidden">${product.offerPrice}</td>
                                    <td className="px-4 py-3">
                                        <label className="relative inline-flex items-center cursor-pointer text-gray-900 gap-3">
<input type="checkbox" checked={product.inStock ?? true} onChange={() =>toggleStock(product._id, !(product.inStock ?? true))
}className="sr-only peer"/>
                                            <div className="w-12 h-7 bg-slate-300 rounded-full peer peer-checked:bg-blue-600 transition-colors duration-200"></div>
                                            <span className="dot absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-5"></span>
                                        </label>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
export default ProductList*/
import React, { useState } from "react";
import { useAppContext } from "../../Context/AppContext";
import toast from "react-hot-toast";

const ProductList = () => {
  const { products, axios, fetchProducts } = useAppContext();

  const [editProduct, setEditProduct] = useState(null);

  //  TOGGLE STOCK
  const toggleStock = async (id, inStock) => {
    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/product/stock",
        { id, inStock }
      );

      if (data.success) {
        fetchProducts();
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //  DELETE PRODUCT
  const deleteProduct = async (id) => {
    try {
      const confirm = window.confirm("Delete this product?");
      if (!confirm) return;

      const { data } = await axios.delete(
        `http://localhost:4000/api/product/delete/${id}`
      );

      if (data.success) {
        toast.success("Product deleted");
        fetchProducts();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //  UPDATE PRODUCT
  const updateProduct = async () => {
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/product/update/${editProduct._id}`,
        editProduct
      );

      if (data.success) {
        toast.success("Product updated");
        setEditProduct(null);
        fetchProducts();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex-1 h-[95vh] overflow-y-scroll flex flex-col">
      <div className="w-full p-4 md:p-10">
        <h2 className="pb-4 text-lg font-medium">All Products</h2>

        <div className="w-full bg-white border rounded-md overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm">
                <th className="p-3">Product</th>
                <th>Category</th>
                <th >Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-t text-sm">
                  {/* PRODUCT */}
                  <td className="p-3 flex items-center gap-3">
                    <img
                      src={`http://localhost:4000/${product.image[0].replace(
                        /\\/g,
                        "/"
                      )}`}
                      className="w-14 h-14 object-cover rounded"
                    />
                    <span>{product.name}</span>
                  </td>

                  {/* CATEGORY */}
                  <td>{product.category}</td>

                  {/* PRICE */}
                  <td className="hidden md:block">
                    ${product.offerPrice}
                  </td>

                  {/* STOCK */}
                  <td>
                    
                    <input
                      type="checkbox"
                      checked={product.inStock ?? true}
                      onChange={() =>
                        toggleStock(
                          product._id,
                          !(product.inStock ?? true)
                        )
                      }
                    />
                  </td>

                  {/* ACTIONS */}
                  <td className="flex gap-2 p-2">
                    {/* EDIT */}
                    <button
                      onClick={() => setEditProduct(product)}
                      className="px-3 py-1 bg-blue-500 text-white rounded"
                    >
                      Edit
                    </button>

                    {/* DELETE */}
                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

     
      {editProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-[400px] space-y-3">
            <h2 className="text-lg font-semibold">Update Product</h2>

            <input
              className="border p-2 w-full"
              value={editProduct.name}
              onChange={(e) =>
                setEditProduct({ ...editProduct, name: e.target.value })
              }
            />

            <input
              className="border p-2 w-full"
              value={editProduct.offerPrice}
              onChange={(e) =>
                setEditProduct({
                  ...editProduct,
                  offerPrice: e.target.value,
                })
              }
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setEditProduct(null)}
                className="px-3 py-1 bg-gray-300 rounded"
              >
                Cancel
              </button>

              <button
                onClick={updateProduct}
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;