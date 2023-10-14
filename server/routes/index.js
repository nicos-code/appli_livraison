const express = require("express");

const rootRouter = express.Router();
const router = express.Router();

const {
    setFakeAdminSession,
    setFakeTestSession,
} = require("../security/fake_session");

rootRouter.use("/api", router);

router.route("/").get((req, res, next) => {
    res.send("Hello world! Session id is: " + req.session.userId);
});

router.use("/product", require("./product"));

router.use("/user", require("./user"));

router.use("/cart", require("./cart"));

router.use("/order", require("./order"));

router.route("/fake").get((req, res, next) => {
    setFakeTestSession(req, res);
});

router.route("/fake-admin").get((req, res, next) => {
    setFakeAdminSession(req, res);
});

router.use("/login", require("./login"));

module.exports = rootRouter;

// router.route("/").get(indexController.dashboard);
