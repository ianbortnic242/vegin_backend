import { Router } from "express";
import ProductsRouter from './products'
import CartsRouter from './carts'

const mainRouter = Router()

mainRouter.use('/products', ProductsRouter);
mainRouter.use('/carts', CartsRouter);

export default mainRouter
