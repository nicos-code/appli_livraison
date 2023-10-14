const cartModel = require("../db/cart");
const orderModel = require("../db/order");
const util = require("./util");

const getAllCarts = async (req, res, next) => {
    if (!(await util.isAdmin(req))) {
        return util.getNotAdminRes(res);
    }

    try {
        res.json(await cartModel.find({}));
    } catch (error) {
        return next(error);
    }
};

const getCart = async (id, req, res, next) => {
    try {
        res.json(await cartModel.findById(id));
    } catch (error) {
        return next(error);
    }
};

const getIdCart = async (req, res, next) => {
    //prettier-ignore
    if (!(await util.sessionIsCorresponding(req))) {
        return util.getSessionNotCorrespondingRes(res);
    }

    return await getCart(req.params.id, req, res, next);
};

const getSessionCart = async (req, res, next) => {
    //prettier-ignore
    if (!(await util.isLoggedIn(req))) {
        return util.getNotLoggedInRes(res);
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
        return res.status(403).json({ status: 403, error: "Cart is empty" });
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
        return util.getSessionNotCorrespondingRes(res);
    }

    return await validateCart(req.params.id, req, res, next);
};

const validateSessionCart = async (req, res, next) => {
    if (!(await util.isLoggedIn(req))) {
        return util.getNotLoggedInRes(res);
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
