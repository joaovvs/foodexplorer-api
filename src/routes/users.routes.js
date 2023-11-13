const { Router } = require("express");
const UsersController = require("../controllers/UsersControler");

const usersRoutes = Router();

const usersController = new UsersController();

usersRoutes.post("/", usersController.create);
usersRoutes.put("/", usersController.update);

module.exports = usersRoutes;