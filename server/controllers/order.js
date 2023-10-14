const orderModel = require("../db/order");
const productModel = require("../db/product");
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
        let orders = await orderModel.find({ user: id }).lean();
        for (let order of orders) {
            order.prixTotal = 0;
            for (let produitId in order.qteProduit) {
                const produit = await productModel.findById(produitId);
                order.prixTotal += produit.prix * order.qteProduit[produitId];
            }
        }

        res.json(orders);
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
