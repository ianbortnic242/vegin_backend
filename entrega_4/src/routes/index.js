const { Router } = require('express');
const ProductsRouter = require('./products');

const rutaPrincipal = Router();

rutaPrincipal.use('/products', ProductsRouter);

module.exports = rutaPrincipal;