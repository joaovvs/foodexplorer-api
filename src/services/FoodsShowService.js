const AppError = require("../utils/AppError");

class FoodsShowService {
    constructor (foodsRepository){
        this.foodsRepository = foodsRepository;
    }

    async execute(food_id){
        const foodSearchResult = await this.foodsRepository.findFoodById(food_id)
        if(!foodSearchResult){
            throw new AppError("Registro não encontrado!");
        }
        return foodSearchResult;
    }    
}


module.exports = FoodsShowService;