
const AppError = require("../utils/AppError");

class FavoriteDeleteService {
    constructor (favoritesRepository){
        this.favoritesRepository = favoritesRepository;
    }

    async execute(user_id,food_id){
      const deleted = await this.favoritesRepository.delete(user_id,food_id);
      if(deleted===0){
        return new AppError("Não foi possível remover o registro");
      }
      return deleted;
    }
}

module.exports = FavoriteDeleteService;