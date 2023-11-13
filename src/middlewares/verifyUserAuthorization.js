const AppError = require("../utils/AppError");

function verifyUserAuthorization(rolesToVerify){
    return(request,response,next) => {
    const {role} = request.user;

    if(!rolesToVerify.includes(role)){
        throw new AppError("Usuário não autorizado", 401);
    }
    return next();
    }

}


module.exports = verifyUserAuthorization;