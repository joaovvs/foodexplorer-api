
const AppError = require("../utils/AppError");
const { hash } = require("bcryptjs");

class FoodsCreateService {
    constructor (foodsRepository){
        this.foodsRepository = foodsRepository;
    }

    async execute(food){
        if(!food.name ||  !food.category || !food.description || !food.price ){
            throw new AppError("Preencha todos os campos para realizar o cadastro!");
        }

        const newFood = this.foodsRepository.execute(food);
        return newFood;
    }
}

module.exports = FoodsCreateService;