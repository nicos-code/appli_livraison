const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();

//prettier-ignore
router.route("/")
    .get(userController.getAllUsers)

//prettier-ignore
router.route("/:id")
    .get(userController.getUser)
    .post(userController.editUser);

module.exports = router;
