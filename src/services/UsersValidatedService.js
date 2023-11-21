const AppError = require("../utils/AppError");

class UsersValidatedService {
    constructor (userRepository){
        this.userRepository = userRepository;
    }

    async execute(user_id){
        return await this.userRepository.findUserById(user_id);
    }

}

module.exports = UsersValidatedService;