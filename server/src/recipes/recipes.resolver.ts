import { Resolver, Args, Query, ID, Mutation } from "@nestjs/graphql";
import { NotFoundException } from "@nestjs/common";
import { Recipe } from "./recipe.model";
import { RecipesRepository } from "./recipes.repository";
import { AddRecipeArgs } from "./dto/add-recipe.args";
import { UpdateRecipeArgs } from "./dto/update-recipe.args";

// TODO change NotFound error - not appropriate for GQL

@Resolver(() => Recipe)
export class RecipesResolver {
    constructor(private readonly recipesRepository: RecipesRepository) {}

    // TODO paginate this
    @Query(() => [Recipe], { name: "recipes" })
    async getRecipes() {
        const recipes = await this.recipesRepository.find();
        if (!recipes) {
            throw new NotFoundException();
        }
        return recipes;
    }

    @Query(() => Recipe, { name: "recipe" })
    async getRecipe(@Args("id", { type: () => ID }) id: string) {
        const recipe = await this.recipesRepository.findOneById(id);
        if (!recipe) {
            throw new NotFoundException(id);
        }
        return recipe;
    }

    @Mutation(() => Recipe)
    async addRecipe(@Args() args: AddRecipeArgs) {
        return this.recipesRepository.mergeOne(args);
    }

    @Mutation(() => Recipe)
    async updateRecipe(@Args() args: UpdateRecipeArgs) {
        return this.recipesRepository.mergeOne(
            {
                title: args.title,
                description: args.description,
                method: args.method
            },
            args.id
        );
    }
}
