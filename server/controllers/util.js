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

module.exports = {
    isLoggedIn,
    isAdmin,
    sessionIsCorresponding,
};
