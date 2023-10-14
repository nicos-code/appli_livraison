const bcrypt = require("bcrypt");
const userModel = require("../db/user");
const cartModel = require("../db/cart");
const util = require("./util");

const SALT_ROUNDS = 11;

const login = async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(401).json({
            status: 401,
            error: "Unauthorized: no email or no password provided",
        });
    }

    let user = null;
    try {
        user = await userModel.findOne({ email: req.body.email });
    } catch (error) {
        return next(error);
    }

    if (!user) {
        return res.status(401).json({
            status: 401,
            error: "Unauthorized: wrong email or password",
        });
    }

    let result = false;
    try {
        result = await bcrypt.compare(req.body.password, user.password);
    } catch (error) {
        return next(error); //TODO: This may not be safe if the logging includes the password
    }

    if (!result) {
        return res.status(401).json({
            status: 401,
            error: "Unauthorized: wrong email or password",
        });
    }

    try {
        req.session.userId = user.id;
        return res.status(200).json({
            status: 200,
            message: "User logged in successfully, session id is: " + user.id,
        });
    } catch (error) {
        return next(error);
    }
};

const signup = async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return res.status(401).json({
            status: 401,
            error: "Unauthorized: no email or no password provided",
        });
    }

    try {
        if (await userModel.findOne({ email: req.body.email })) {
            return res.status(401).json({
                status: 401,
                error: "Unauthorized: email already exists",
            });
        }
    } catch (error) {
        return next(error);
    }

    let hash = null;
    try {
        hash = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    } catch (error) {
        return next(error);
    }

    if (!hash) {
        return res.status(401).json({
            status: 401,
            error: "Unauthorized: password could not be hashed",
        });
    }

    try {
        const user = await new userModel({
            email: req.body.email,
            password: hash,
        }).save();

        await new cartModel({
            _id: user._id,
        }).save();

        req.session.userId = user.id;

        return res.status(200).json({
            status: 200,
            message:
                "User signed up successfull, session id is: " +
                req.session.userId,
        });
    } catch (error) {
        return next(error);
    }
};

const logout = async (req, res, next) => {
    try {
        req.session.destroy();
        return res.status(200).json({
            status: 200,
            message: "User logged out successfully",
        });
    } catch (error) {
        return next(error);
    }
};

const logas = async (req, res, next) => {
    if (!(await util.isAdmin(req))) {
        return util.getNotAdminRes(res);
    }

    let user = null;
    try {
        user = await userModel.findById(req.params.id);
    } catch (error) {
        return next(error);
    }

    if (!user) {
        return res.status(401).json({
            status: 401,
            error: "Unauthorized: wrong user id",
        });
    }

    req.session.userId = user.id;
    return res.status(200).json({
        status: 200,
        message:
            "Logged as another user successfully, session id is: " +
            req.session.userId,
    });
};

module.exports = { login, signup, logout, logas };
