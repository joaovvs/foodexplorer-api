const { Router } = require("express");
const multer = require("multer");
const uploadConfig = require("../configs/upload");

const FoodsController = require("../controllers/FoodsController");
const ensureAuthenticated = require("../middlewares/ensureAuthenticated");
const verifyUserAuthorization = require("../middlewares/verifyUserAuthorization");
const FoodImageController = require("../controllers/FoodImageController");

const foodsRoutes = Router();
const upload = multer(uploadConfig.MULTER);
const foodsController = new FoodsController();
const foodImageController = new FoodImageController();

foodsRoutes.use(ensureAuthenticated);

foodsRoutes.post("/",verifyUserAuthorization(["admin"]), foodsController.create);
foodsRoutes.put("/",verifyUserAuthorization(["admin"]), foodsController.update);
foodsRoutes.patch("/image/:food_id",verifyUserAuthorization(["admin"]),upload.single("image"), foodImageController.update);
foodsRoutes.get("/", foodsController.index);
foodsRoutes.get("/:food_id", foodsController.show);
foodsRoutes.delete("/:food_id",verifyUserAuthorization(["admin"]), foodsController.delete);

module.exports = foodsRoutes;