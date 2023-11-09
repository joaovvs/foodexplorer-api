const knex = require("knex");

class FoodsRepository{

    async create(food){
        const food_id = await knex("foods").insert(food);
        return await knex("foods").where({id: food_id}).first(); 
    }


    async update(food){

    }

    async findFoodById(food_id){

    }

    async findFoodsByIngredients(ingredients){

    }
}


module.exports = FoodsRepository;