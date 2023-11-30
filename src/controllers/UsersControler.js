const UsersCreateService = require("../services/UsersCreateService");
const UsersUpdateService = require("../services/UsersUpdateService");
const UsersRepository = require("../repositories/UsersRepository");

class UsersController{
    
    async create(request,response){
        const user= request.body;

        const usersRepository = new UsersRepository();
        const usersCreateService = new UsersCreateService(usersRepository);  
        
        const newUser = await usersCreateService.execute(user);
        return response.json(newUser);  
    }

    async update(request, response){
        const user_data = request.body;
        const user_id= request.user.id;


        const usersRepository = new UsersRepository();
        const usersUpdateService = new UsersUpdateService(usersRepository);  

        const updatedUser = await usersUpdateService.execute(user_data,user_id);

        return response.status(201).json(updatedUser);
    }
}

module.exports = UsersController;