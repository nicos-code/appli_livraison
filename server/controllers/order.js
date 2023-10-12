const orderModel = require("../db/order");

const getAllOrders = (req, res, next) => {
    //TODO: This command Should only be accessible by admin
    orderModel
        .find({})
        .then((orders) => {
            res.json(orders);
        })
        .catch((error) => {
            return next(error);
        });
};

const getOrders = (req, res, next) => {
    //TODO: We should check if the user is logged in OR if the user is admin
    orderModel
        .find({ user: req.params.id })
        .then((orders) => {
            res.json(orders);
        })
        .catch((error) => {
            return next(error);
        });
};

module.exports = { getAllOrders, getOrders };
