const UsersRepositoryInMemory = require("../repositories/UsersRepositoryInMemory");
const AppError = require("../utils/AppError");
const UsersCreateService = require("./UsersCreateService");

describe("userCreateService", ()=> {
    let usersRepository = null;
    let usersCreateService= null;

    beforeEach(()=> {
        usersRepository = new UsersRepositoryInMemory();
        usersCreateService = new UsersCreateService(usersRepository);
    })

    it("user should be created", async ()=> {
        const user = {
            name: "João",
            email: "joao@email.com",
            password: "123",
            role: "admin"
        }
        const usersCreated = await usersCreateService.execute(user);
        expect(usersCreated).toHaveProperty("id");
    });

    it("user shuldn't be created with invalid e-mail", async () => {
        const user = {
            name: "João",
            email: "joaoemailcom",
            password: "123",
            role: "admin"
        }
        await expect(usersCreateService.execute(user)).rejects.toEqual(new AppError("Informe um e-mail válido"));

    });

    it("user shouldn't be created with existent e-mail", async () => {
        const user1 = {
            name: "João",
            email: "joao@email.com",
            password: "123",
            role: "admin"
        }
        const user2 = {
            name: "José",
            email: "joao@email.com",
            password: "123",
            role: "admin"
        }
        await usersCreateService.execute(user1);
        await expect(usersCreateService.execute(user2)).rejects.toEqual(new AppError("Já existe cadastro para o e-mail informado!"));

    });
}
)
