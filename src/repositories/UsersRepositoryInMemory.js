class UsersRepositoryInMemory{
    users = [];
    async create({name, email, password}){
        const newUser = {
            id: Math.floor(Math.random()*1000+1),
            name,
            email,
            password
        };
        await this.users.push(newUser);
        return (newUser);
    }

    async update(user_data,user_id){
        this.users.map(user => {
            if(user.id === user_id)
                return {id: user.id, ...user_data}
        });
        console.log(this.user);
 
        return this.users.find(user => user.id ===user_id);
    }

    async findUserByEmail(email){
        return await this.users.find(user => user.email === email);

    }

    async findUserById(user_id){
        return await this.users.find(user => user.id === user_id);
    }

}

module.exports = UsersRepositoryInMemory;