const { hash } = require("bcrypt");
const AppError = require("../util/AppError");

class UserCreateService {
    constructor (userRepository){
        this.userRepository = userRepository;
    }

    async execute(user){

        const checkUserExist = await this.userRepository.findByEmail(user.email);
        console.log(`usuario existe?: ${checkUserExist}`);
        if(checkUserExist){
            throw new AppError("Já existe cadastro para o e-mail informado!");
        }
        
        /* create hashed password*/
        const hashedPassword = await hash(user.password, 8);
        user.password = hashedPassword;

        const userCreated = await this.userRepository.create(user);

        return userCreated;
    }

}


module.exports = UserCreateService;