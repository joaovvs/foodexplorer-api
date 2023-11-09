const { hash, compare } = require("bcryptjs");
const AppError = require("../utils/AppError");

class UsersUpdateService {
    constructor (userRepository){
        this.userRepository = userRepository;
    }

    /* function to valid email with regex*/
    validEmail(email){
        return /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email);
    }

    async execute(user_data, user_id){
        const user = await this.userRepository.findUserById(user_id);
        
        
        /*check if user exists*/
        if(!user){
            throw new AppError("Usuário não encontrado!");
        }
        
       

        /* checks if exist email and its valid then check email is already in use */
        if(user_data.email){

            const emailIsValid =this.validEmail(user_data.email);
            if(!emailIsValid){
                throw new AppError("Informe um e-mail válido");
            }

            const userWithUpdatedEmail = await this.userRepository.findUserByEmail(user_data.email);
            
            /*check if email is already in use by another user */
            if(userWithUpdatedEmail && userWithUpdatedEmail.id !=user_id){
                throw new AppError("Este e-mail já está em uso por outro usuário");
            }

        }

        /* assign values to user name and email if received otherwise assign existent values*/ 
        user.name = user_data.name ?? user.name;
        user.email = user_data.email ?? user.email;


        /* verify if request contains a password and old_password */
        if(user_data.password && user_data.old_password){
            /*compate user password and old_passowrd*/ 
            const checkOldPassword = await compare(user_data.old_password, user.password);

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


module.exports = UsersUpdateService;