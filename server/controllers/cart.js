const cartModel = require("../db/cart");
const orderModel = require("../db/order");

const getAllCarts = (req, res, next) => {
    //TODO: This command Should only be accessible by admin
    cartModel
        .find({})
        .then((carts) => {
            res.json(carts);
        })
        .catch((error) => {
            return next(error);
        });
};

const getCart = (req, res, next) => {
    //TODO: We should check if the user is logged in OR if the user is admin
    cartModel
        .findById(req.params.id)
        .then((cart) => {
            res.json(cart);
        })
        .catch((error) => {
            return next(error);
        });
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
