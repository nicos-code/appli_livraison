const express = require("express");
const productController = require("../controllers/product");

const router = express.Router();

//prettier-ignore
router
    .route("/all")
    .get(productController.getAllProducts)

router
    .route("/id/:id")
    .get(productController.getProduct)
    .post(productController.grabProduct)
    .delete(productController.dropProduct);

module.exports = router;
