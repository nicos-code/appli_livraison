const express = require("express");
const authController = require("../controllers/auth");

const router = express.Router();

router.route("/login").post(authController.login);

router.route("/signup").post(authController.signup);

router.route("/logout").post(authController.logout);

// router.route("/logas/id/:id").post(authController.logasId);

// router.route("/logas/email/:email").post(authController.logasEmail);

router.route("/session").get(authController.getSession);

module.exports = router;
