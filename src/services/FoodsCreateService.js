
const AppError = require("../utils/AppError");

class FoodsCreateService {
    constructor (foodsRepository){
        this.foodsRepository = foodsRepository;
    }

    async execute({name,category,description,price, ingredients, image},user_id){
        if(!name ||  !category || !description || !price ){
            throw new AppError("Preencha todos os campos para realizar o cadastro!");
        }


        price=String(price).replace(/R\$\s*/g, '').replace(',', '.');

        const newFood = await this.foodsRepository.create({name,category,description,price,image,ingredients, user_id});
        return {...newFood};
    }
}

module.exports = FoodsCreateService;