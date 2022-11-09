const express = require('express');
const productController = require('../controller/products');

const router = express.Router();

router.post('/', (req, res) => {
  const body = req.body;

  const new_product = {
    title: body.title,
    price: body.price,
    thumbnail: body.thumbnail,
  };

  productController.save(new_product);

  res.redirect('/')
});

module.exports = router
