const UsersRepository = require("../repositories/UsersRepository");
const SessionsCreateService = require("../services/SessionsCreateService");
const authConfig = require("../configs/auth");
const { sign } = require("jsonwebtoken");



class SessionsController {
    async create(request, response){
        const {email, password} = request.body;

        console.log(email, password);
        const usersRepository = new UsersRepository();
        const sessionsCreateService = new SessionsCreateService(usersRepository);

        const user = await sessionsCreateService.execute({email, password});

        const { secret, expiresIn} = authConfig.jwt;

        const token= sign({ role: user.role}, secret, {
            subject: String(user.id),
            expiresIn
        });
        response.cookie("token", token, {
            httpOnly:true,
            sameSite: "none",
            secure: true,
            maxAge: 15 * 60 * 1000
          });

        delete user.password;
        
        return await response.status(201).json({user});
 
    }
}

module.exports = SessionsController;