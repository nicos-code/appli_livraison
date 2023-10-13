const orderModel = require("../db/order");
const util = require("./util");

const getAllOrders = async (req, res, next) => {
    if (!(await util.checkIfAdmin(req))) {
        return util.getNotAdminRes(res);
    }

    try {
        res.json(await orderModel.find({}));
    } catch (error) {
        return next(error);
    }
};

const getOrders = async (req, res, next) => {
    //prettier-ignore
    if (!(await util.checkIfParamsIdIsUserId(req))) {
        return util.getNotCorrespondingRes(res);
    }

    try {
        res.json(orderModel.find({ user: req.params.id }));
    } catch (error) {
        return next(error);
    }
};

module.exports = { getAllOrders, getOrders };
