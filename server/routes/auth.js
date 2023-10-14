const express = require("express");
const authController = require("../controllers/auth");

const router = express.Router();

router.route("/login").post(authController.login);

router.route("/signup").post(authController.signup);

router.route("/logout").post(authController.logout);

router.route("/logas/:id").post(authController.logas);

router.route("/session").get(authController.getSession);

module.exports = router;
