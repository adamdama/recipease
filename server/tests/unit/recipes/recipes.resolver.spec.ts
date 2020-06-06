import { Test, TestingModule } from "@nestjs/testing";
import { Recipe } from "../../../src/recipes/models/recipe.model";
import { RecipesResolver } from "../../../src/recipes/recipes.resolver";
import { RecipesService } from "../../../src/recipes/recipes.service";

describe("AppResolver", () => {
    let recipesResolver: RecipesResolver;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [RecipesResolver],
            providers: [RecipesService]
        }).compile();

        recipesResolver = app.get<RecipesResolver>(RecipesResolver);
    });

    describe("getRecipe", () => {
        it("should return a recipe", () => {
            expect(recipesResolver.getRecipe("10")).toBeTruthy();
        });
    });
});
