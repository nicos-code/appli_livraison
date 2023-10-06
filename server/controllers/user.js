const userModel = require("../db/user");
const cartModel = require("../db/cart");

const getAllUsers = (req, res, next) => {
    userModel
        .find({})
        .then((users) => {
            res.json(users);
        })
        .catch((error) => {
            return next(error);
        });
};

const getUser = (req, res, next) => {
    userModel
        .findById(req.params.id)
        .then((user) => {
            res.json(user);
        })
        .catch((error) => {
            return next(error);
        });
};

module.exports = { getAllUsers, getUser };
