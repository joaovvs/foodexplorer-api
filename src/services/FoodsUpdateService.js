const AppError = require("../utils/AppError");

class FoodsUpdateService {
    constructor (foodsRepository){
        this.foodsRepository = foodsRepository;
    }

    async execute({id, name, category, description,image, price, ingredients}){

        const food = await this.foodsRepository.findFoodById(id);
        if(!food){
            throw new AppError("Comida não cadastrada!");
        }

        /* fill attributes with received information or preserve existent value*/ 
        food.name = name ?? food.name;
        food.category = category ?? food.category;
        food.description= description ?? food.description;
        food.price = price ?? food.price;
        food.ingredients = ingredients ?? food.ingredients;
        food.image = image ?? food.image;
    

        return await this.foodsRepository.update(food);
    }    
}


module.exports = FoodsUpdateService;