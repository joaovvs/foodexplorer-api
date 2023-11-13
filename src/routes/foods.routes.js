const { Router } = require("express");
const FoodsController = require("../controllers/FoodsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");

const foodsRoutes = Router();

const foodsController = new FoodsController();

foodsRoutes.use(ensureAuthenticated);

foodsRoutes.post("/",verifyUserAuthorization(["admin"]), foodsController.create);
foodsRoutes.put("/",verifyUserAuthorization(["admin"]), foodsController.update);
foodsRoutes.get("/", foodsController.index);
foodsRoutes.get("/:food_id", foodsController.show);
foodsRoutes.delete("/:food_id",verifyUserAuthorization(["admin"]), foodsController.delete);

module.exports = foodsRoutes;