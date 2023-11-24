const { Router } = require("express");

const usersRouter = require("./users.routes");
const sessionRouter = require("./sessions.routes");
const foodsRouter = require("./foods.routes");
const favoritesRoutes = require("./favorites.routes");

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/foods", foodsRouter);
routes.use("/sessions", sessionRouter);
routes.use("/favorites", favoritesRoutes);


module.exports = routes;