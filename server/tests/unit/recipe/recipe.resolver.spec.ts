/* eslint-disable */

import { Test, TestingModule } from "@nestjs/testing";
import { RecipeRepository, RecipeResolver } from "@/recipe";

describe("AppResolver", () => {
    let recipesResolver: RecipeResolver;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [RecipeResolver],
            providers: [RecipeRepository]
        }).compile();

        recipesResolver = app.get<RecipeResolver>(RecipeResolver);
    });

    describe("getRecipe", () => {
        it("should return a recipe", () => {
            expect(
                recipesResolver.getRecipe(
                    { recipe: { id: "10" } },
                    { id: "test-1234567890", email: "user@test.com" }
                )
            ).toBeFalsy();
        });
    });
});
