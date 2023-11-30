const knex = require("../database/knex");

class FoodsRepository{

    async create(food){
        const [food_id] = await knex("foods").insert({image: food.image, name: food.name,category: food.category,description: food.description,price: food.price, user_id: food.user_id});
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
        return this.findFoodById(food_id);
    }


    async update(food,newIngredients, removedIngredients){
        const  {id, name, category, description, image, price, user_id} = food;
        await knex("foods").update({name, category, description, image, price, "updated_at": knex.fn.now()}).where({id});
        //valid if there's a new ingredient to insert
        if(newIngredients?.length>0){
            newIngredients = newIngredients.map(ingredient => {
                return {
                    food_id: id,
                    user_id,
                    name: ingredient
                }
            })
            await knex("ingredients").insert(newIngredients);
        }
        //valid if there's a removed ingredient to delete
        if(removedIngredients?.length>0){
            removedIngredients = removedIngredients.map(ingredient => {
                return {
                    food_id: id,
                    user_id,
                    name: ingredient
                }
            })
               await knex("ingredients")
               .whereIn(["food_id","name"],removedIngredients.map(removed =>[removed.food_id,removed.name]))
               .delete();
            }
            
        

        return await this.findFoodById(id);

    }

    
    async delete(food_id){
            /*remove ingredients*/
            await knex("ingredients").where({food_id}).delete(); 
            /*delete food*/
            return await knex("foods").where({id: food_id}).delete();

    }


    async findFoodById(food_id){
        const foodSearched = await knex("foods").where({id: food_id}).first();
        if(foodSearched){
            const foodIngredients = await knex.select().from("ingredients").where({food_id}).orderBy("name");
            if (foodIngredients){
                return await {...foodSearched,ingredients: foodIngredients.map(ingredient => ingredient.name)}
            }else{
                return await {...foodSearched};
            }
            }
    }

    async findFoodsByIngredientsOrName(ingredients,name){
        let foods;
        /* if user send any ingredient search by ingredients else return all*/
        if(ingredients){
            const filterIngredients = ingredients.split(",").map(ingredient => ingredient.trim());
            foods = await knex("foods")
            .select([
                "foods.id",
                "foods.name",
                "foods.category",
                "foods.image",
                "foods.description",
                "foods.price",
                "foods.user_id"
            ]).distinct()
            .whereRaw('lower(foods.name) LIKE ?', `%${name.toLowerCase()}%`)
            .whereIn(knex.raw('LOWER(ingredients.name)'), filterIngredients.map(ingredient => ingredient.toLowerCase()))
            .innerJoin("ingredients", "foods.id","ingredients.food_id")
            .orderBy("foods.category","food.name");
            console.log(foods);
        }else{
           foods = await knex("foods")
           .select()
           .whereRaw('UPPER(foods.name) LIKE ?', `%${name.toUpperCase()}%`)
           .orderBy("foods.category","food.name");

           console.log(foods);
        }

        const ingredientsData = await knex("ingredients").orderBy("name");

        const foodsWithTags = foods.map(food => {
            const foodIngredients = ingredientsData.filter( ingredient => ingredient.food_id === food.id);
            const ingredientsList = foodIngredients.map(foodIngredient => foodIngredient.name);
            return {
                ...food,
                ingredients: ingredientsList
            }
        });



        return foodsWithTags;
    }

    async ingredientsByFoodId(food_id){
        return knex("ingredients").where({food_id});
    }

}

module.exports = FoodsRepository;