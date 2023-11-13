const AppError = require("../utils/AppError");

class FoodsDeleteService {
    constructor (foodsRepository){
        this.foodsRepository = foodsRepository;
    }

    async execute(food_id){

        return this.foodsRepository.delete(food_id);
    }    
}


module.exports = FoodsDeleteService;