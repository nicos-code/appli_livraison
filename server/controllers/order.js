const orderModel = require("../db/order");
const util = require("./util");

const getAllOrders = async (req, res, next) => {
    if (!(await util.isAdmin(req))) {
        return util.getNotAdminRes(res);
    }

    try {
        res.json(await orderModel.find({}));
    } catch (error) {
        return next(error);
    }
};

const getOrders = async (id, req, res, next) => {
    try {
        res.json(await orderModel.find({ user: id }));
    } catch (error) {
        return next(error);
    }
};

const getIdOrders = async (req, res, next) => {
    //prettier-ignore
    if (!(await util.sessionIsCorresponding(req))) {
        return util.getSessionNotCorrespondingRes(res);
    }

    return await getOrders(req.params.id, req, res, next);
};

const getSessionOrders = async (req, res, next) => {
    //prettier-ignore
    if (!(await util.isLoggedIn(req))) {
        return util.getNotLoggedInRes(res);
    }

    return await getOrders(req.session.userId, req, res, next);
};

module.exports = { getAllOrders, getIdOrders, getSessionOrders };
