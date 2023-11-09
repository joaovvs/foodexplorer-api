
const AppError = require("../utils/AppError");
const { hash } = require("bcryptjs");

class UserCreateService {
    constructor (userRepository){
        this.userRepository = userRepository;
    }

    /* function to valid email with regex*/
    validEmail(email){
        return /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/.test(email);
    }

    /* execute service Create User*/
    async execute(user){

        const emailIsValid = this.validEmail(user.email);
        if(!emailIsValid){
            throw new AppError("Informe um e-mail válido");
        }
        
        const checkUserExist = await this.userRepository.findUserByEmail(user.email);
        /*valid if exists another user with same email*/
        if(checkUserExist){
            throw new AppError("Já existe cadastro para o e-mail informado!");
        }
        
        /* create hashed password*/
        const hashedPassword = await hash(user.password, 8);
        
        /* switch hashed password on user */ 
        user.password = hashedPassword;

        /*receive user created*/ 
        const userCreated = await this.userRepository.create(user);

        return userCreated;
    }

}


module.exports = UserCreateService;