
const AppError = require("../utils/AppError");

class FavoriteCreateService {
    constructor (favoritesRepository){
        this.favoritesRepository = favoritesRepository;
    }

    async execute(user_id,food_id){

        const checkIfExists = await this.favoritesRepository.favoritesByUserIdAndFoodId(user_id, food_id);
        
        if(checkIfExists){
            return new AppError("Já é um favorito"); 
        }
            
        const result = await this.favoritesRepository.create(user_id,food_id);

        
        if(!result){
            return new AppError("Não foi possível adicionar aos favoritos!");
        }
        else {
            return result;
        }   
    }
}

module.exports = FavoriteCreateService;