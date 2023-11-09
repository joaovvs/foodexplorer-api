const { Router } = require("express");
const FoodsController = require("../controllers/FoodsController");

const foodsRoutes = Router();

const foodsController = new FoodsController();

foodsRoutes.post("/", foodsController.create);
foodsRoutes.put("/:id", foodsController.update);
foodsRoutes.get("/", foodsController.index);
foodsRoutes.get("/:id", foodsController.show);

module.exports = foodsRoutes;