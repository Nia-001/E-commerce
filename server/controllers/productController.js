
import Product from '../models/Product.js'
//add product : /api/product/add
export const addProduct = async(req,res)=>{
try{
 let product_data = JSON.parse(req.body.product_data)

    const images = req.files || []
    console.log("Parsed Data:", product_data);
    console.log("Images:", images);

    
let imagesUrl = images.map(item => item.path);

await Product.create({
  ...product_data,
  image: imagesUrl
});



 console.log("SAVED:", Product);

res.json({success: true, message: "Product Added"})

}catch(error){
   console.log(error.message);
   res.json({success: false,message: error.message})
}
}

//get product : /api/product/list
export const productList = async(req,res)=>{
try{
    const products =await Product.find({})
    res.json({success: true, products})

}catch(error){
 console.log(error.message);
   res.json({success: false,message: error.message})
}
}

//get single product : /api/product/id
export const productById = async(req,res)=>{
try{
    const { id } = req.body
    const product =await Product.findById(id)
    res.json({success: true, product})
}
catch(error){
 console.log(error.message);
   res.json({success: false,message: error.message})
}
}

//change product instock: /api/product/stock
export const changeStock = async(req,res)=>{
try{
const {id,inStock}=req.body
await Product.findByIdAndUpdate(id,{inStock})
 res.json({success: true, message: "Stock Updated"})
}
catch(error){
 console.log(error.message);
   res.json({success: false,message: error.message})
}
}







export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await Product.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Product deleted"
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, offerPrice, category, inStock } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        offerPrice,
        category,
        inStock
      },
      { new: true }
    );

    res.json({
      success: true,
      message: "Product updated",
      product: updatedProduct
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};






export const toggleStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;

    await Product.findByIdAndUpdate(id, { inStock });

    res.json({
      success: true,
      message: "Stock updated"
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};