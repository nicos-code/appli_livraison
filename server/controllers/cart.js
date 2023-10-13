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

const getCart = async (req, res, next) => {
    //prettier-ignore
    if (!(await util.sessionIsCorresponding(req))) {
        return util.getSessionNotCorrespondingRes(res);
    }

    try {
        res.json(await cartModel.findById(req.params.id));
    } catch (error) {
        return next(error);
    }
};

const validateCart = async (req, res, next) => {
    let cart;
    try {
        cart = await cartModel.findById(req.params.id);
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

module.exports = { getAllCarts, getCart, validateCart };
