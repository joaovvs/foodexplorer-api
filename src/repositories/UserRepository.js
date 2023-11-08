class UserRepository{
    users = [];
    async create({name, email, password, role}){
        const newUser = {
            id: Math.floor(Math.random()*1000+1),
            name,
            email,
            role,
            password
        };
        await this.users.push(newUser);
        console.log(this.users);
        return (newUser);
    }

    async update(user_id){
        return await (`usuário ${user_id} atualizado com sucesso`);
    }

    async findByEmail(email){
        console.log(this.users);
        return await this.users.find(user => user.email === email);

    }

    async findById(user_id){
        return await this.users.find(user => user.id === user_id);
    }

}

module.exports = UserRepository;