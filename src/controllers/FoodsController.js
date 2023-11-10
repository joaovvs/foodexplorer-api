const FoodsRepository = require("../repositories/FoodsRepository");
const FoodsCreateService = require("../services/FoodsCreateService");


class FoodsController{

    async create(request,response){
        const food = request.body
        const foodsRepository = new FoodsRepository();
        const foodsCreateService = new FoodsCreateService(foodsRepository);

        const newFood = await  foodsCreateService.execute(food);



        return response.json(newFood);
    }


    async update(request, response){
        return response.json("update");
    }

    async show(request, response){
        return response.json("show");

    }

    async index(request, response){

        return response.json("index");
    }

    async delete(request, response){
        return response.json("delete");
    }
    
}


module.exports = FoodsController;