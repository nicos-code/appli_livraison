const userModel = require("../db/user");
const util = require("./util");

const getAllUsers = async (req, res, next) => {
    if (!(await util.isAdmin(req))) {
        return util.getNotAdminRes(res);
    }

    try {
        res.json(await userModel.find({}));
    } catch (error) {
        return next(error);
    }
};

const getUser = async (id, req, res, next) => {
    try {
        res.json(await userModel.findById(id));
    } catch (error) {
        return next(error);
    }
};

const getIdUser = async (req, res, next) => {
    //prettier-ignore
    if (!(await util.sessionIsCorresponding(req))) {
        return util.getSessionNotCorrespondingRes(res);
    }
    return await getUser(req.params.id, req, res, next);
};

const getSessionUser = async (req, res, next) => {
    if (!(await util.isLoggedIn(req))) {
        return util.getNotLoggedInRes(res);
    }
    return await getUser(req.session.userId, req, res, next);
};

const editUser = async (id, req, res, next) => {
    if (req.body.firstName) {
        try {
            await userModel.findByIdAndUpdate(
                id,
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
                id,
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
                id,
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
                id,
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
                id,
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
                id,
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

const editIdUser = async (req, res, next) => {
    //prettier-ignore
    if (!(await util.sessionIsCorresponding(req))) {
        return util.getSessionNotCorrespondingRes(res);
    }
    return await editUser(req.params.id, req, res, next);
};

const editSessionUser = async (req, res, next) => {
    if (!(await util.isLoggedIn(req))) {
        return util.getNotLoggedInRes(res);
    }
    return await editUser(req.session.userId, req, res, next);
};

module.exports = {
    getAllUsers,
    getIdUser,
    getSessionUser,
    editIdUser,
    editSessionUser,
};
