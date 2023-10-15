const cartModel = require("../db/cart");
const orderModel = require("../db/order");
const productModel = require("../db/product");
const util = require("./util");
const {
    notAdminError,
    notLoggedInError,
    sessionNotCorrespondingError,
    stockError,
} = require("../error/errorList");

const getAllCarts = async (req, res, next) => {
    if (!(await util.isAdmin(req))) {
        return next(notAdminError());
    }

    try {
        res.json(await cartModel.find({}));
    } catch (error) {
        return next(error);
    }
};

const getCart = async (id, req, res, next) => {
    try {
        let cart = await cartModel.findById(id).lean();
        cart.prixTotal = 0;
        for (let produitId in cart.qteProduit) {
            const produit = await productModel.findById(produitId);
            cart.prixTotal += produit.prix * cart.qteProduit[produitId];
        }
        res.json(cart);
    } catch (error) {
        return next(error);
    }
};

const getIdCart = async (req, res, next) => {
    //prettier-ignore
    if (!(await util.sessionIsCorresponding(req))) {
        return next(sessionNotCorrespondingError());
    }

    return await getCart(req.params.id, req, res, next);
};

const getSessionCart = async (req, res, next) => {
    //prettier-ignore
    if (!(await util.isLoggedIn(req))) {
        return next(notLoggedInError());
    }

    return await getCart(req.session.userId, req, res, next);
};

const validateCart = async (id, req, res, next) => {
    let cart;
    try {
        cart = await cartModel.findById(id);
    } catch (error) {
        return next(error);
    }

    if (cart.qteProduit.size === 0) {
        return next(stockError("Le panier est vide"));
    }

    let order;
    try {
        order = await new orderModel({
            user: cart._id,
            qteProduit: cart.qteProduit,
        }).save();
    } catch (error) {
        return next(error);
    }

    cart.qteProduit = {};
    try {
        await cart.save();
    } catch (error) {
        return next(error);
    }

    res.json(order);
};

const validateIdCart = async (req, res, next) => {
    if (!(await util.sessionIsCorresponding(req))) {
        return next(sessionNotCorrespondingError());
    }

    return await validateCart(req.params.id, req, res, next);
};

const validateSessionCart = async (req, res, next) => {
    if (!(await util.isLoggedIn(req))) {
        return next(notLoggedInError());
    }

    return await validateCart(req.session.userId, req, res, next);
};

module.exports = {
    getAllCarts,
    getIdCart,
    getSessionCart,
    validateIdCart,
    validateSessionCart,
};
