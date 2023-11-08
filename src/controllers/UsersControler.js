const UserCreateService = require("../services/UserCreateService");
const UserRepository = require("../repositories/UserRepository");

class UserController{
    

    async create(request,response){
        const { name, email, password, role}= request.body;

        const user = { name, email, password, role};
        const userRepository = new UserRepository();
        const userCreateService = new UserCreateService(userRepository);
        
        const newUser = await userCreateService.execute(user);
        return response.json(newUser);  
    }
}

module.exports = UserController;