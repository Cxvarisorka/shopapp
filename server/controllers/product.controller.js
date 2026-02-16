const Product = require("../models/product.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

const createProduct = catchAsync(async (req, res, next) => {
    const { name, price, description } = req.body;

    const product = await Product.create({name, price, description});

    res.status(201).json(product);
});

const getProducts = catchAsync(async (req, res) => {
    const product = await Product.find();

    res.status(200).json(product);
});

const getProduct = catchAsync(async (req, res) => {
    const { id } = req.params;

    const product = await Product.findById(id);

    res.status(201).json(product);
});

const deleteProduct = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    if(!id) {
        return next(new AppError("To delete product we need id!", 400));
    }

    await Product.findByIdAndDelete(id);

    res.status(204).json({ message: "Product deleted!" });
});

module.exports = { createProduct, getProducts, getProduct, deleteProduct };