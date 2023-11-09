const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const AppError = require("../utils/AppError");
const UserCreateService = require("./UserCreateService");
const UserUpdateService = require("./UserUpdateService");

describe("userUpdateService", ()=> {
    let userRepository = null;
    let userCreateService= null;

    beforeEach(()=> {
        userRepository = new UserRepositoryInMemory();
        userCreateService = new UserCreateService(userRepository);
        userUpdateService = new UserUpdateService(userRepository);
        
    })

    it("user should be updated", async ()=> {
        const user = {
            name: "João",
            email: "joao@email.com",
            password: "123",
            role: "admin"
        }

        const userToUpdate = {
            name: "João Vinícius",
            email: "joao@email.com",
            password: "123",
            role: "admin"
        }

        const userCreated = await userCreateService.execute(user);
        const userUpdated = await userUpdateService.execute(userToUpdate,userCreated.id)
        expect(userUpdated.name).toEqual("João Vinícius");
    });

    it("user shouldn't be updated if no exists user", async ()=> {
        /* id not existent*/
        const user_id = 100;
        const userToUpdate = {
            name: "João Vinícius",
            email: "joao@email.com",
            password: "123"
        };
        await expect(userUpdateService.execute(userToUpdate,user_id)).rejects.toEqual(new AppError("Usuário não encontrado!"));

    });

    it("user shouldn't be updated if password and oldpassword don't match", async ()=> {
        /* id not existent*/
        const user = {
            name: "João",
            email: "joao@email.com",
            password: "123"
        }

        const userToUpdate = {
            name: "João Vinícius",
            email: "joao@email.com",
            password: "123",
            old_password: "1234"
        }

        const userCreated = await userCreateService.execute(user);

        await expect(userUpdateService.execute(userToUpdate,userCreated.id)).rejects.toEqual(new AppError("A senha antiga não confere!"));

    });

    it("user shouldn't be updated if new email alredy exist to another user", async ()=> {
        /* id not existent*/
        const user = {
            name: "João",
            email: "joao@email.com",
            password: "123"
        }

        const user2  ={
            name: "José",
            email: "jose@email.com",
            password: "123"
        }

        const userToUpdate = {
            name: "João Vinícius",
            email: "jose@email.com",
            password: "123",
            old_password: "123"
        }
        /*create user*/
        const userCreated = await userCreateService.execute(user);
        /*create user2*/
        await userCreateService.execute(user2);

        await expect(userUpdateService.execute(userToUpdate,userCreated.id)).rejects.toEqual(new AppError("Este e-mail já está em uso por outro usuário"));

    });


});
