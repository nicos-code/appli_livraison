const express = require("express");
const cartController = require("../controllers/cart");

const router = express.Router();

router.route("/").get(cartController.getAllCarts);

router
    .route("/:id")
    .get(cartController.getCart)
    .post(cartController.validateCart);

module.exports = router;
