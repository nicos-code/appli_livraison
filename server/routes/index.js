const express = require("express");

const rootRouter = express.Router();
const router = express.Router();

rootRouter.use("/api", router);

router.route("/").get((req, res, next) => {
    res.send("Hello world!");
});

router.use("/product", require("./product"));

router.use("/user", require("./user"));

module.exports = rootRouter;

// router.route("/").get(indexController.dashboard);
