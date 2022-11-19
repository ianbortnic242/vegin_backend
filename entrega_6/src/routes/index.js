const express = require('express');
const ProductsRouter = require('./products');
const router = express();

router.use('/products', ProductsRouter);

module.exports = router;
