const productModel = require("../db/product");
const cartModel = require("../db/cart");

const getAllProducts = (req, res, next) => {
    productModel
        .find({})
        .then((products) => {
            res.json(products);
        })
        .catch((error) => {
            return next(error);
        });
};

const getProduct = (req, res, next) => {
    productModel
        .findById(req.params.id)
        .then((product) => {
            res.json(product);
        })
        .catch((error) => {
            return next(error);
        });
};

// Ajout au panier
const grabProduct = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ error: "Unauthorized" });
    }

    let productStock = productModel
        .findById(req.params.id)
        .then((product) => product.stock)
        .catch((error) => {
            return next(error);
        });

    //prettier-ignore
    productModel
        .findByIdAndUpdate(req.params.id, {
            stock: productStock - 1,
        }
        .then((product) => {
            res.json(product);
        })
        .catch((error) => {
            return next(error);stock
        }));

    cartModel
        .findByIdAndUpdate(req.session.userId, {
            $push: { products: req.params.id },
        })
        .then((cart) => cart)
        .catch((error) => next(error));
};

module.exports = { getAllProducts, getProduct, grabProduct };
