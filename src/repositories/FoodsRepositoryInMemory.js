const knex = require("knex");

class FoodsRepository{
    foods = []
    async create(food){
        const id = Math.floor(Math.random()*1000+1);
        const newFood = {id, ...food}
        this.foods.push(newFood);

        return newFood;
    }


    async update(foodUpdated, food_id){
        this.foods.filter(food => food.id === food_id);
        this.foods.push({id:food_id}, ...foodUpdated);

        return this.foods.find(food => food.id =food_id);
    }

    async findFoodById(food_id){
        return this.foods.find(food => food.id = food_id);
    }

    async findFoodsByIngredients(ingredientsList){
        return this.foods
        .filter(food => food.ingredients
            .find(ingredient => ingredient ===ingredientsList
                .find(item => item ===ingredient)));
    }

    async delete(food_id){
        this.foods.filter(food => food.id === food_id);
        return; 
    }
}


module.exports = FoodsRepository;