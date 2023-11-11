const knex = require("../database/knex");

class FoodsRepository{

    async create(food){
        const [food_id] = await knex("foods").insert({name: food.name,category: food.category,description: food.description,price: food.price, user_id: food.user_id});
        const foodCreated = await knex("foods").where({id: food_id}).first();
        let ingredientsInsert= [];
        if(food.ingredients.length>0){
            ingredientsInsert = food.ingredients.map(ingredient => {
                   return {
                        food_id: foodCreated.id,
                        user_id: foodCreated.user_id,
                        name: ingredient
                    }
                });

            await knex("ingredients").insert(ingredientsInsert);
        }
        const ingredientsCreated = await knex.select().from("ingredients").where({food_id}).orderBy("name");
        const foodWithIngredients = {...foodCreated,ingredients: ingredientsCreated.map(ingredient => ingredient.name)}; 
        return {...foodWithIngredients}
    }


    async update(food){

    }

    async findFoodById(food_id){

    }

    async findFoodsByIngredients(ingredients){

    }
}


module.exports = FoodsRepository;