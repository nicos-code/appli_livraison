const userModel = require("../db/user");

const setFakeAdminSession = (req, res) => {
    userModel
        .find({ email: "test@test.com" })
        .then((user) => {
            user = user[0];
            req.session.userId = user.id;
            res.send("Fake session set to: " + req.session.userId);
        })
        .catch((error) => {
            console.log(error);
        });
};

module.exports = setFakeAdminSession;
