const knex = require("../database/knex");

class FoodsRepository{

    async create(food){
        const [food_id] = await knex("foods").insert(food);
        return await knex("foods").where({id: food_id}).first(); 
    }


    async update(food){

    }

    async findFoodById(food_id){

    }

    async findFoodsByIngredients(ingredients){

    }

    async createIngredients(ingredientsList){
        return await knex("ingredients").insert(ingredientsList);
    }

    async deleteIngredient(removeIngredientsList){
        await knex("ingredients")
                .whereIn(["id", "user_id", "food_id"],removeIngredientsList.map(removed=> [removed.id, removed.user_id, removed.food_id]))
                .delete();
    }
}


module.exports = FoodsRepository;