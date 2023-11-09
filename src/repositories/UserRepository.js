const knex = require("../database/knex");


class UserRepository{
    async create(user){

        const [user_id] = await knex("users").insert(user);
        return ({id: user_id,...user});
    }

    async update(user_data,user_id){
        const userUpdated = await knex("users").update({
            name: user_data.name,
            email: user_data.email,
            password: user_data.password, 
            updated_at: knex.fn.now() 
            }).where({id: user_id});

        return userUpdated;
    }

    async findUserByEmail(email){
        const user = await knex("users").where({email}).first();
        return user;

    }

    async findUserById(user_id){
        const user = await knex("users").where({id: user_id}).first();
        return user;
    }

}

module.exports = UserRepository;