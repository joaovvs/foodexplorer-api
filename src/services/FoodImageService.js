
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage");

class FoodsCreateService {
    constructor (foodsRepository){
        this.foodsRepository = foodsRepository;
    }
    async execute(food_id, imageFilename){

        const food = await this.foodsRepository.findFoodById(food_id);
        const diskStorage = new DiskStorage();
        // test if food exists 
        if(!food){
            throw new AppError("Comida não encontrada!");
        }
        //remove old image before update new filename
        if(food.image){
            await diskStorage.deleteFile(food.image);
        }

        const newImageFilename = await diskStorage.saveFile(imageFilename);

        food.image= newImageFilename;

        

        return await this.foodsRepository.update(food);
        
    }

}

module.exports = FoodsCreateService;