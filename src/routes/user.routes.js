const { Router } = require("express");
const UserController = require("../controllers/UsersControler");

const userRoutes = Router();

const userController = new UserController();

userRoutes.post("/", userController.create);

module.exports = userRoutes;