import { Test, TestingModule } from "@nestjs/testing";
import { RecipesRepository } from "@/recipes/recipes.repository";
import { RecipesResolver } from "../../../src/recipes/recipes.resolver";

describe("AppResolver", () => {
    let recipesResolver: RecipesResolver;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [RecipesResolver],
            providers: [RecipesRepository]
        }).compile();

        recipesResolver = app.get<RecipesResolver>(RecipesResolver);
    });

    describe("getRecipe", () => {
        it("should return a recipe", () => {
            expect(recipesResolver.getRecipe("10")).toBeFalsy();
        });
    });
});
