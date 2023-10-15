const express = require("express");
const cartController = require("../controllers/cart");

const router = express.Router();

router
    .route("/")
    .get(cartController.getSessionCart)
    .post(cartController.validateSessionCart);

//prettier-ignore
router
    .route("/all")
    .get(cartController.getAllCarts);

router
    .route("/id/:id")
    .get(cartController.getIdCart)
    .post(cartController.validateIdCart);

module.exports = router;
