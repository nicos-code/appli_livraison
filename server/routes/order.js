const express = require("express");
const orderController = require("../controllers/order");

const router = express.Router();

router.route("/").get(orderController.getSessionOrders);

router.route("/all").get(orderController.getAllOrders);

router.route("/id/:id").get(orderController.getIdOrders);

module.exports = router;
