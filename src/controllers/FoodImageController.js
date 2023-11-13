const FoodsRepository = require("../repositories/FoodsRepository");
const FoodUpdateImageService = require("../services/FoodImageService");



class FoodImageController{

    async update(request, response){
        const {food_id} = request.params;
        const imageFilename = request.file.filename;
    
        const foodsRepository = new FoodsRepository();
        const foodUpdateImageService = new FoodUpdateImageService(foodsRepository);

        return response.json(await foodUpdateImageService.execute(food_id,imageFilename));
    }

}

module.exports = FoodImageController