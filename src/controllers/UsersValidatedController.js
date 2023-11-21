const AppError = require("../utils/AppError");
const UsersValidatedService = require("../services/UsersValidatedService");
const UsersRepository = require("../repositories/UsersRepository");


class UsersValidatedController {
    async  index(request, response){
        const {user} = request;
        const usersRepository = new UsersRepository();
        const usersValidatedService = new UsersValidatedService(usersRepository);

        const checkUserExists =  await usersValidatedService.execute(user.id);

        if( checkUserExists.length ===0) {
            throw new AppError("Unauthorized", 401);
        }

        return response.status(200).json();
    }



}

module.exports = UsersValidatedController;