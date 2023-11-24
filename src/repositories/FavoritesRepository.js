const knex = require("../database/knex");

class FavoritesRepository{

    async create (user_id,food_id){
           return await knex("favorites").insert({user_id,food_id});
    }

    async favoritesByUserId(user_id){
        return await knex("favorites").where({user_id});
    }

    async favoritesByUserIdAndFoodId(user_id, food_id){
        const favorite = await knex("favorites").select().where({user_id, food_id}).first();
        return favorite;
    }

    async delete(user_id, food_id){
       return await knex("favorites").where({user_id,food_id}).delete(); 
    }
}

module.exports = FavoritesRepository;