const productModel = require("../db/product");
const cartModel = require("../db/cart");
const util = require("./util");

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
    if (!(await util.checkIfLoggedIn(req))) {
        return util.getNotLoggedInRes(res);
    }

    // Get product
    let product;
    try {
        product = await productModel.findById(req.params.id);
    } catch (error) {
        return next(error);
    }

    // Check product stocks
    if (product.stock <= 0) {
        return res.status(403).json({ status: 403, error: "Out of stock" });
    }

    // Get Cart
    let cart;
    try {
        cart = await cartModel.findById(req.session.userId);
    } catch (error) {
        return next(error);
    }

    // Update product
    product.stock -= 1;
    try {
        await product.save();
    } catch (error) {
        return next(error);
    }

    // Update cart
    const qteProduit = cart.qteProduit;
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

    // Response
    res.json(cart);
};

const dropProduct = async (req, res, next) => {
    // TODO: error should be handled by a middleware instead of a return res.status(401). ...
    if (!(await util.checkIfLoggedIn(req))) {
        return util.getNotLoggedInRes(res);
    }

    // Get product
    let product;
    try {
        product = await productModel.findById(req.params.id);
    } catch (error) {
        return next(error);
    }

    // Get Cart
    let cart;
    try {
        cart = await cartModel.findById(req.session.userId);
    } catch (error) {
        return next(error);
    }

    const qteProduit = cart.qteProduit;
    // Check quantity in cart
    if (
        !qteProduit.has(product._id.toString()) ||
        qteProduit.get(product._id.toString()) <= 0
    ) {
        return res.status(403).json({ status: 403, error: "Not in cart" });
    }

    // Update cart first because:
    // Updating the cart without updating the product is less of a problem than the opposite:
    //   -> If the cart updates the product does not, the product will not be counted at all, so it will become unavailable.
    //   -> But if the product updates and the cart does not, the product will be counted twice, so it could be bought twice.

    //prettier-ignore
    qteProduit.set(
        product._id,
        qteProduit.has(product._id.toString()) ? qteProduit.get(product.id.toString()) - 1 : 1
    );
    try {
        await cart.save();
    } catch (error) {
        return next(error);
    }

    // Update product
    product.stock += 1;
    try {
        await product.save();
    } catch (error) {
        return next(error);
    }

    // Response
    res.json(cart);
};

module.exports = { getAllProducts, getProduct, grabProduct, dropProduct };
