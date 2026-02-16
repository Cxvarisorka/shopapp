const express = require('express');
const { getProducts, getProduct, createProduct, deleteProduct } = require('../controllers/product.controller');
const allowedTo = require('../middlewares/roles.middleware');
const protect = require('../middlewares/auth.middleware');

const productsRouter = express.Router();

productsRouter.get('/', getProducts);
productsRouter.get('/:id', getProduct);
productsRouter.post('/', protect, allowedTo('admin'), createProduct);
productsRouter.delete('/:id', protect, allowedTo('admin'), deleteProduct);

module.exports = productsRouter;