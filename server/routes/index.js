const express = require("express");

const rootRouter = express.Router();
const router = express.Router();

rootRouter.use("/api", router);

router.route("/").get((req, res, next) => {
    res.send("Hello world! Session id is: " + req.session.userId);
});

router.use("/product", require("./product"));

router.use("/user", require("./user"));

router.use("/cart", require("./cart"));

router.use("/order", require("./order"));

router.use("/auth", require("./auth"));

module.exports = rootRouter;

// router.route("/").get(indexController.dashboard);
