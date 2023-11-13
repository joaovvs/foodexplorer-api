const { Router } = require("express");
const FoodsController = require("../controllers/FoodsController");

const foodsRoutes = Router();

const foodsController = new FoodsController();

foodsRoutes.post("/", foodsController.create);
foodsRoutes.put("/", foodsController.update);
foodsRoutes.get("/", foodsController.index);
foodsRoutes.get("/:food_id", foodsController.show);
foodsRoutes.delete("/:food_id", foodsController.delete);

module.exports = foodsRoutes;