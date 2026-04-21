import express from 'express';
import { upload } from '../configs/multer.js';
import authSeller from '../middlewares/authSeller.js';
import { addProduct, changeStock, productById, productList,updateProduct,deleteProduct,toggleStock } from '../controllers/productController.js';
//mongoose.connect("mongodb://127.0.0.1:27017/ecomm");

const productRouter = express.Router();

productRouter.post('/add', upload.array("images"), authSeller, addProduct);


productRouter.get('/list',productList);
productRouter.get('/:id',productById)
productRouter.post('/stock',authSeller, changeStock)
productRouter.post("/stock", toggleStock);
productRouter.put("/update/:id", updateProduct);
productRouter.delete("/delete/:id", deleteProduct);


export default productRouter;