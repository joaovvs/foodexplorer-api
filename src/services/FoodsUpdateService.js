const AppError = require("../utils/AppError");

class FoodsUpdateService {
    constructor (foodsRepository){
        this.foodsRepository = foodsRepository;
    }

    async execute({id, name, category, description,image, price, ingredients,user_id}){

        const food = await this.foodsRepository.findFoodById(id);
        if(!food){
            throw new AppError("Comida não cadastrada!");
        }
        //remove R$ and replace "," for "."

        if(price){
            price=String(price).replace(/R\$\s*/g, '').replace(',', '.');
        }







        /* fill attributes with received information or preserve existent value*/ 
        food.name = name ?? food.name;
        food.category = category ?? food.category;
        food.description= description ?? food.description;
        food.price = price ?? food.price;

        food.image = image ?? food.image;

        const newIngredients = [];
        const removedIngredients = [];
    
        // ingredients update
        //check there's a ingredient list
            //fill newIngredients if not exist ingredient
        if(ingredients){ 
                ingredients.forEach(receivedIngredient => {
                    if(!food.ingredients.some(ingredient => ingredient === receivedIngredient)){
                        newIngredients.push(receivedIngredient); 
                    }
                })

            //check if ingredient was removed and include on removedIngredients    
                food.ingredients.forEach(foodIngredient => {
                    if(!ingredients.some(ingredient => ingredient === foodIngredient)){
                        removedIngredients.push(foodIngredient);
                    }
                });
        }

        return await this.foodsRepository.update(food,newIngredients,removedIngredients);
    }    
}


module.exports = FoodsUpdateService;