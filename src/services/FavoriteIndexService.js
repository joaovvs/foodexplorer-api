
const AppError = require("../utils/AppError");

class FavoriteIndexService {
    constructor (favoritesRepository){
        this.favoritesRepository = favoritesRepository;
    }

    async execute(user_id){
      const userFavorites = await this.favoritesRepository.favoritesByUserId(user_id);
      return userFavorites;
    }
}

module.exports = FavoriteIndexService;