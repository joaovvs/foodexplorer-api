const FoodsRepositoryInMemory = require("../repositories/FoodsRepositoryInMemory");
const AppError = require("../utils/AppError");
const FoodsCreateService = require("./FoodsCreateService");

describe("foodsCreateService", ()=> {
    let foodsRepository = null;
    let foodsCreateService= null;

    beforeEach(()=> {
        foodsRepository = new FoodsRepositoryInMemory();
        foodsCreateService = new FoodsCreateService(foodsRepository);
    })

    it("food should be created", async ()=> {
        const food = {
            name: "Arroz com feijão",
            category: "Prato Feito",
            description: "prato básico",
            price: 7.50,
            user_id: 1,
            ingredients: ["arroz","feijão"]
        }
        const foodCreated = await foodsCreateService.execute(food);
        expect(foodCreated).toHaveProperty("id");
    });

    it("food shuldn't be created without price", async () => {
        const food = {
            name: "Arroz com feijão",
            category: "Prato Feito",
            description: "prato básico",
            user_id: 1,
            ingredients: ["arroz","feijão"]
        }
        await expect(foodsCreateService.execute(food)).rejects.toEqual(new AppError("Preencha todos os campos para realizar o cadastro!"));

    });

}
)
