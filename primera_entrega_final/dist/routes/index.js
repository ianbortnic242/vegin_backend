"use strict";

var express = require('express');
var ProductsRouter = require('./products');
var CartsRouter = require('./carts');
var router = express();
router.use('/products', ProductsRouter);
router.use('/carts', CartsRouter);
module.exports = router;