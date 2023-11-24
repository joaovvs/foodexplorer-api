const { Router } = require("express");

const FavoritesController = require("../controllers/FavoritesController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");


const favoritesRoutes = Router();

const favoritesController = new FavoritesController();

favoritesRoutes.use(ensureAuthenticated);


favoritesRoutes.post("/:food_id",verifyUserAuthorization(["admin","costumer"]), favoritesController.create);
favoritesRoutes.get("/",verifyUserAuthorization(["admin","costumer"]), favoritesController.index);
favoritesRoutes.delete("/:food_id",verifyUserAuthorization(["admin","costumer"]), favoritesController.delete);


module.exports = favoritesRoutes;