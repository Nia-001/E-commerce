import mongoose from "mongoose";


// const productSchema = new mongoose.Schema({

// name:{type: String, required: true },
//     description:{type: Array, required: true},
//     price: {type: Number, required: true},
//     offerPrice: {type: Number, required: true},
//     image: {type: Array, required: true},
//     category: {type: String, required: true},
//     inStock: {type: Boolean, default: true}
// },{timestamps: true})

// const Product = mongoose.models.product || mongoose.model('client', productSchema,"client")

// export default Product


const productSchema = new mongoose.Schema({
  name: String,
  description: Array,
  category: String,
  price: Number,
  offerPrice: Number,
  image: Array
});

const Product = mongoose.model("Product", productSchema);

export default Product;