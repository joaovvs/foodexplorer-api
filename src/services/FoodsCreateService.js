
const AppError = require("../utils/AppError");
const { hash } = require("bcryptjs");

class FoodsCreateService {
    constructor (foodsRepository){
        this.foodsRepository = foodsRepository;
    }

    async execute({name,category,description,price, user_id, ingredients}){
        if(!name ||  !category || !description || !price ){
            throw new AppError("Preencha todos os campos para realizar o cadastro!");
        }

        const newFood = await this.foodsRepository.create({name,category,description,price, user_id});
        console.log(newFood);
        let ingredientsInsert= [];
        if(ingredients.length>0){
            ingredientsInsert = ingredients.map(ingredient => {
                   return {
                        food_id: newFood.id,
                        user_id: newFood.user_id,
                        name: ingredient
                    }
                });

            await this.foodsRepository.createIngredients(ingredientsInsert);
        }
        return {newFood,ingredients: ingredientsInsert};
    }
}

module.exports = FoodsCreateService;