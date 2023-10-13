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

const editUser = async (req, res, next) => {
    if (req.body.firstName) {
        try {
            await userModel.findByIdAndUpdate(
                req.params.id,
                { firstName: req.body.firstName },
                { new: true }
            );
        } catch (error) {
            return next(error);
        }
    }
    if (req.body.secondName) {
        try {
            await userModel.findByIdAndUpdate(
                req.params.id,
                { secondName: req.body.secondName },
                { new: true }
            );
        } catch (error) {
            return next(error);
        }
    }
    if (req.body.adresseNumero) {
        try {
            await userModel.findByIdAndUpdate(
                req.params.id,
                { adresseNumero: req.body.adresseNumero },
                { new: true }
            );
        } catch (error) {
            return next(error);
        }
    }
    if (req.body.adresseRue) {
        try {
            await userModel.findByIdAndUpdate(
                req.params.id,
                { adresseRue: req.body.adresseRue },
                { new: true }
            );
        } catch (error) {
            return next(error);
        }
    }
    if (req.body.ville) {
        try {
            await userModel.findByIdAndUpdate(
                req.params.id,
                { ville: req.body.ville },
                { new: true }
            );
        } catch (error) {
            return next(error);
        }
    }
    if (req.body.codePostal) {
        try {
            await userModel.findByIdAndUpdate(
                req.params.id,
                { codePostal: req.body.codePostal },
                { new: true }
            );
        } catch (error) {
            return next(error);
        }
    }

    try {
        const user = await userModel.findById(req.params.id);
        res.json(user);
    } catch (error) {
        return next(error);
    }
};
module.exports = { getAllUsers, getUser, editUser };
