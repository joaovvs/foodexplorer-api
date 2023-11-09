class UserRepositoryInMemory{
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

    async update(user_data,user_id){
        this.users.filter(user => user.id === user_id);
        this.users.push(user_data);
 
        return this.users.find(user => user.id ===user_id);
    }

    async findUserByEmail(email){
        return await [this.users.find(user => user.email === email)];

    }

    async findUserById(user_id){
        return await this.users.find(user => user.id === user_id);
    }

}

module.exports = UserRepositoryInMemory;