const { Router } = require("express");

const usersRouter = require("./users.routes");
const foodsRouter = require("./foods.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/foods", foodsRouter);


module.exports = routes;