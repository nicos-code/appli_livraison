const express = require("express");
const loginController = require("../controllers/login");

const router = express.Router();

//prettier-ignore
router.route("/")
    .post(loginController.login)

//prettier-ignore
router.route("/signup")
    .post(loginController.signup);

//prettier-ignore
router.route("/logout")
    .get(loginController.logout);

module.exports = router;
