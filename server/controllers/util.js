const userModel = require("../db/user");

const isLoggedIn = (req) => {
    return !!req.session.userId;
};

const isAdmin = async (req) => {
    if (!isLoggedIn(req)) {
        return false;
    }

    try {
        const user = await userModel.findById(req.session.userId);
        return user ? user.isRoot : false;
    } catch (error) {
        return false;
    }
};

const sessionIsCorresponding = async (req) => {
    // Note: Admins can bypass this check
    return (
        isLoggedIn(req) &&
        (req.params.id === req.session.userId || (await isAdmin(req)))
    );
};

const getNotLoggedInRes = (res) => {
    return res
        .status(401)
        .json({ status: 401, error: "Unauthorized: user is not logged in" });
};

const getNotAdminRes = (res) => {
    return res
        .status(403)
        .json({ status: 403, error: "Unauthorized: user is not admin" });
};

const getSessionNotCorrespondingRes = (res) => {
    //prettier-ignore
    return res
        .status(403)
        .json({ status: 403, error: "Unauthorized: cannot access resources of other users (or not logged in)" });
};

module.exports = {
    isLoggedIn,
    isAdmin,
    sessionIsCorresponding,
    getNotLoggedInRes,
    getNotAdminRes,
    getSessionNotCorrespondingRes,
};
