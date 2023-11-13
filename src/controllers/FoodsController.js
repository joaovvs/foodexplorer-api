const FoodsRepository = require("../repositories/FoodsRepository");
const FoodsCreateService = require("../services/FoodsCreateService");
const FoodsDeleteService = require("../services/FoodsDeleteService");
const FoodsIndexService = require("../services/FoodsIndexService");
const FoodsShowService = require("../services/FoodsShowService");

const AppError = require("../utils/AppError");


class FoodsController{

    async create(request,response){
        const food = request.body
        
        const foodsRepository = new FoodsRepository();
        const foodsCreateService = new FoodsCreateService(foodsRepository);
 

        const newFood = await  foodsCreateService.execute(food);



        return response.json({...newFood});
    }


    async update(request, response){
        return response.json("update");
    }

    async show(request, response){
        const {food_id} =request.params
        const foodsRepository = new FoodsRepository();
        const foodsShowService = new FoodsShowService(foodsRepository);


        return response.json(await foodsShowService.execute(food_id));

    }

    async index(request, response){
        const {ingredients}=request.query

        const foodsRepository = new FoodsRepository();
        const foodsIndexService = new FoodsIndexService(foodsRepository);



        return response.json( await foodsIndexService.execute(ingredients));
    }

    async delete(request, response){

        const foodsRepository = new FoodsRepository();
        const foodsDeleteService = new FoodsDeleteService(foodsRepository);
        const food_id= request.params.food_id;

            
        const result = await foodsDeleteService.execute(food_id);
        if(result>0) 
            return response.status(200).json("Registro removido com sucesso!") 
        else 
            throw new AppError("Não foi possível deletar!");

    }
    
}


module.exports = FoodsController;