
const AppError = require("../utils/AppError");

class FoodsCreateService {
    constructor (foodsRepository){
        this.foodsRepository = foodsRepository;
    }

    async execute({name,category,description,price, ingredients},user_id){
        if(!name ||  !category || !description || !price ){
            throw new AppError("Preencha todos os campos para realizar o cadastro!");
        }

        const newFood = await this.foodsRepository.create({name,category,description,price,ingredients, user_id});
        return {...newFood};
    }
}

module.exports = FoodsCreateService;