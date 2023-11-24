const FavoriteCreateService = require("../services/FavoriteCreateService");
const FavoriteIndexService = require("../services/FavoriteIndexService");
const FavoriteDeleteService = require("../services/FavoriteDeleteService");


const FavoritesRepository = require("../repositories/FavoritesRepository");

const AppError = require("../utils/AppError");


class FavoritesController{

    async create(request, response){
        const user_id = request.user.id;
        const {food_id} = request.params;

        console.log(user_id) ;
        console.log(food_id);

        const favoritesRepository = new FavoritesRepository();
        const favoriteCreateService = new FavoriteCreateService(favoritesRepository);

        const result = await favoriteCreateService.execute(user_id, food_id);
        if(result.message){
            return    
        }else{
            return response.json(result);
        }

    }

    async index(request, response){
        const user_id = request.user.id;

        const favoritesRepository = new FavoritesRepository();
        const favoriteIndexService = new FavoriteIndexService(favoritesRepository);
        
        return response.json(await favoriteIndexService.execute(user_id));
    }

    async delete(request, response){
        const user_id = request.user.id;
        const {food_id} = request.params;

        const favoritesRepository = new FavoritesRepository();
        const favoriteDeleteService = new FavoriteDeleteService(favoritesRepository);

        const result = await favoriteDeleteService.execute(user_id,food_id);
        if(result>0){
            return response.json("Registro demovido com sucesso");
        }else{
            return response.status(result.statusCode).json(result.message);
        }
        

    }
}

module.exports = FavoritesController;