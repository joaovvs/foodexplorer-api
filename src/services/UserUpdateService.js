const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");

class UserUpdateService {
    constructor (userRepository){
        this.userRepository = userRepository;
    }

    async execute(user_data, user_id){
        const user = await this.userRepository.findUserById(user_id);
        /*check if user exists*/
        if(!user){
            throw new AppError("Usuário não encontrado!");
        }
        const userWithUpdatedEmail = await this.userRepository.findUserByEmail(user_data.email);
        
        /*check if email is already in use by another user */
        if(userWithUpdatedEmail.email && userWithUpdatedEmail.id !=user_id){
            throw new AppError("Este e-mail já está em uso por outro usuário");
        }

        /* assign values to user name and email if received */ 
        user.name = user_data.name ?? user.name;
        user.email = user_data.email ?? user.email;

        /* verify if request contains a password and old_password */
        if(user_data.password && user_data.old_password){
            /*compate user password and old_passowrd*/ 
            console.log("old = "+ user_data.old_password);
            console.log("atual = "+ user.password);
            const checkOldPassword = await compare(user_data.old_password, user.password);
            console.log(checkOldPassword);
            /* if don't match throw a error message*/
            if(!checkOldPassword){
                throw new AppError("A senha antiga não confere!");
            }
            /* hash and assign new password to user*/
            user.password = await hash(user_data.password, 8)    
        }

        await this.userRepository.update(user, user_id);

        const userUpdated = await this.userRepository.findUserById(user_id);

        delete(userUpdated.password);

        return userUpdated;
        
    }

}


module.exports = UserUpdateService;