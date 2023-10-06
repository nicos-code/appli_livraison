const cartModel = require("../db/cart");

const getAllCarts = (req, res, next) => {
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
    cartModel
        .findById(req.params.id)
        .then((cart) => {
            res.json(cart);
        })
        .catch((error) => {
            return next(error);
        });
};

module.exports = { getAllCarts, getCart };
