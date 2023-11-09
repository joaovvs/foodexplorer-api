const UserRepositoryInMemory = require("../repositories/UserRepositoryInMemory");
const AppError = require("../utils/AppError");
const UserCreateService = require("./UserCreateService");

describe("userCreateService", ()=> {
    let userRepository = null;
    let userCreateService= null;

    beforeEach(()=> {
        userRepository = new UserRepositoryInMemory();
        userCreateService = new UserCreateService(userRepository);
    })

    it("user should be created", async ()=> {
        const user = {
            name: "João",
            email: "joao@email.com",
            password: "123",
            role: "admin"
        }
        const userCreated = await userCreateService.execute(user);
        expect(userCreated).toHaveProperty("id");
    });

    it("user shouldn't be created with existent e=mail", async () => {
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
        await userCreateService.execute(user1);
        await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError("Já existe cadastro para o e-mail informado!"));

    });
}
)
