const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();

//prettier-ignore
router.route("/")
    .get(userController.getAllUsers)

router.route("/:id").get(userController.getUser);

module.exports = router;
