const express = require("express");
const authController = require("../controllers/auth");

const router = express.Router();

//prettier-ignore
router.route("/login")
    .post(authController.login)

//prettier-ignore
router.route("/signup")
    .post(authController.signup);

//prettier-ignore
router.route("/logout")
    .post(authController.logout);

module.exports = router;
