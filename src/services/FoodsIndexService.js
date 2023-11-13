const AppError = require("../utils/AppError");

class FoodsIndexService {
    constructor (foodsRepository){
        this.foodsRepository = foodsRepository;
    }

    async execute(ingredients){

        return this.foodsRepository.findFoodsByIngredients(ingredients);
    }    
}


module.exports = FoodsIndexService;