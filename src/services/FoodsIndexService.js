const AppError = require("../utils/AppError");

class FoodsIndexService {
    constructor (foodsRepository){
        this.foodsRepository = foodsRepository;
    }

    async execute(ingredients,name){

        return this.foodsRepository.findFoodsByIngredients(ingredients,name);
    }    
}


module.exports = FoodsIndexService;