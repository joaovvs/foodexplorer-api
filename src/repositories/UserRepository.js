const knex = require("../database/knex");
const { hash } = require("bcrypt");

class UserRepository{
    async create(user){
        
        user.password = await hash(user.password, 8);

        const [user_id] = await knex("users").insert(user);
        return ({id: user_id,...user});
    }

    async update(user){
        return await (`usuário ${user_id} atualizado com sucesso`);
    }

    async findByEmail(email){
         return await knex("users").where({email});

    }

    async findById(user_id){
        return await this.users.find(user => user.id === user_id);
    }

}

module.exports = UserRepository;