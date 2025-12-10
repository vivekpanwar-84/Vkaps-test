import express from 'express';
import { addProdcut, allProduct, singleproduct, deleteproduct, editproduct } from '../controller/productController.js';
import userAuth from '../middelware/userAuth.js'

const productRouter = express.Router();

productRouter.post('/addProdcut', userAuth, addProdcut);
productRouter.get('/products', allProduct);
productRouter.get('/product/:id', userAuth, singleproduct);
productRouter.delete('/product/:deleteId', userAuth, deleteproduct);
productRouter.put('/:editId/edit', userAuth, editproduct);


export default productRouter;
