import { Resolver, Args, Query, ID } from "@nestjs/graphql";
import { NotFoundException } from "@nestjs/common";
import { Recipe } from "./models/recipe.model";
import { RecipesService } from "./recipes.service";

@Resolver(() => Recipe)
export class RecipesResolver {
    constructor(private readonly recipesService: RecipesService) {}

    @Query(() => Recipe)
    async getRecipe(@Args("id", { type: () => ID }) id: string) {
        const recipe = this.recipesService.findOneById(id);
        if (!recipe) {
            throw new NotFoundException(id);
        }
        return recipe;
    }
}
