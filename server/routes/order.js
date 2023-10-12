const express = require("express");
const orderController = require("../controllers/order");

const router = express.Router();

router.route("/").get(orderController.getAllOrders);

router.route("/:id").get(orderController.getOrders);

module.exports = router;
