const express = require("express");
const productController = require("../controllers/product");

const router = express.Router();

//prettier-ignore
router.route("/")
    .get(productController.getAllProducts)

router
    .route("/:id")
    .get(productController.getProduct)
    .post(productController.grabProduct);

module.exports = router;
