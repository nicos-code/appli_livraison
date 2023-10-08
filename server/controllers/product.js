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
const grabProduct = async (req, res, next) => {
    // TODO: error should be handled by a middleware instead of a return res.status(401). ...
    if (!req.session.userId) {
        return res
            .status(401)
            .json({ status: 401, error: "Unauthorized: sessionId is not set" });
    }

    let product;
    try {
        product = await productModel.findById(req.params.id);
    } catch (error) {
        return next(error);
    }

    if (product.stock <= 0) {
        return res.status(403).json({ status: 403, error: "Out of stock" });
    }

    let cart;
    try {
        cart = await cartModel.findById(req.session.userId);
    } catch (error) {
        return next(error);
    }

    product.stock -= 1;

    try {
        await product.save();
    } catch (error) {
        return next(error);
    }

    console.log("cart: ", cart);
    qteProduit = cart.qteProduit;
    console.log("qteProduit: ", qteProduit);

    //prettier-ignore
    qteProduit.set(
        product._id,
        qteProduit.has(product._id.toString()) ? qteProduit.get(product.id.toString()) + 1 : 1
    );

    try {
        await cart.save();
    } catch (error) {
        return next(error);
    }

    res.json(cart);
};

module.exports = { getAllProducts, getProduct, grabProduct };
