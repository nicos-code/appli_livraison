const userModel = require("../db/user");

const setFakeSession = async (req, res, email) => {
    try {
        const user = await userModel.findOne({ email: email });
        req.session.userId = user.id;
        res.send("Fake session set to: " + req.session.userId);
    } catch (error) {
        console.log(error);
    }
};

const setFakeTestSession = async (req, res) => {
    setFakeSession(req, res, "test@test.com");
};

const setFakeAdminSession = (req, res) => {
    setFakeSession(req, res, "admin@admin.com");
};

module.exports = { setFakeTestSession, setFakeAdminSession };
