const UserCreateService = require("../services/UserCreateService");
const UserUpdateService = require("../services/UserUpdateService");
const UserRepository = require("../repositories/UserRepository");

class UserController{
    
    
     

    async create(request,response){
        const user= request.body;

        const userRepository = new UserRepository();
        const userCreateService = new UserCreateService(userRepository);  
        
        const newUser = await userCreateService.execute(user);
        return response.json(newUser);  
    }

    async update(request, response){
        const user_data = request.body;
        const user_id= request.params.id;

        const userRepository = new UserRepository();
        const userUpdateService = new UserUpdateService(userRepository);  

        const updatedUser = await userUpdateService.execute(user_data,user_id);

        return response.status(201).json(updatedUser);
    }
}

module.exports = UserController;