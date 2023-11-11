const UsersRepositoryInMemory = require("../repositories/UsersRepositoryInMemory");
const AppError = require("../utils/AppError");
const UsersCreateService = require("./UsersCreateService");
const UsersUpdateService = require("./UsersUpdateService");

describe("userUpdateService", ()=> {
    let usersRepository = null;
    let usersCreateService= null;

    beforeEach(()=> {
        usersRepository = new UsersRepositoryInMemory();
        usersCreateService = new UsersCreateService(usersRepository);
        usersUpdateService = new UsersUpdateService(usersRepository);
        
    })

    it("user should be updated", async ()=> {
        const user = {
            name: "João",
            email: "joao@email.com",
            password: "123",

        }

        const userToUpdate = {
            name: "João Vinícius",
            email: "joao@email.com",
            password: "1234",
            old_password: "123"
        }

        const userCreated = await usersCreateService.execute(user);
        const userUpdated = await usersUpdateService.execute(userToUpdate,userCreated.id)
        expect(userUpdated.name).toEqual("João Vinícius");
    });

    it("email mustbe valid", async ()=> {
        const user = {
            name: "João",
            email: "joao@email.com",
            password: "123",

        }

        const userToUpdate = {
            name: "João Vinícius",
            email: "joaoemail.com",
            password: "1234",
            old_password: "123"
        }

        const usersCreated = await usersCreateService.execute(user);
        await expect(usersUpdateService.execute(userToUpdate,usersCreated.id)).rejects.toEqual(new AppError("Informe um e-mail válido"));

    });

    it("user shouldn't be updated if no exists user", async ()=> {
        /* id not existent*/
        const user_id = 100;
        const userToUpdate = {
            name: "João Vinícius",
            email: "joao@email.com",
            password: "123"
        };
        await expect(usersUpdateService.execute(userToUpdate,user_id)).rejects.toEqual(new AppError("Usuário não encontrado!"));

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

        const userCreated = await usersCreateService.execute(user);

        await expect(usersUpdateService.execute(userToUpdate,userCreated.id)).rejects.toEqual(new AppError("A senha antiga não confere!"));

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
        const userCreated = await usersCreateService.execute(user);
        /*create user2*/
        await usersCreateService.execute(user2);

        await expect(usersUpdateService.execute(userToUpdate,userCreated.id)).rejects.toEqual(new AppError("Este e-mail já está em uso por outro usuário"));

    });


});
