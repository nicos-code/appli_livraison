const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();

//prettier-ignore
router
    .route("/")
    .get(userController.getSessionUser)
    .post(userController.editSessionUser);

//prettier-ignore
router
    .route("/all")
    .get(userController.getAllUsers)

router
    .route("/id/:id")
    .get(userController.getIdUser)
    .post(userController.editIdUser);

module.exports = router;
