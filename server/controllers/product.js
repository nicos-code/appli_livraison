const productModel = require("../db/product");
const commandModel = require("../db/command");

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

    var productStock = null;
    productModel
        .findById(req.params.id)
        .then((product) => {
            productStock = product.stock;
        })
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

    commandModel
        .create({
            user: req.session.userId,
            listeProduit: req.params.id,
            valide: false,
        })
        .then((command) => {
            res.json(command);
        })
        .catch((error) => {
            return next(error);
        });
};

module.exports = { getAllProducts, getProduct, grabProduct };
