import { Resolver, Args, Query, ID, Mutation } from "@nestjs/graphql";
import { NotFoundException, UseGuards } from "@nestjs/common";
import { CurrentUser } from "@/auth/current-user.decorator";
import { GraphQLAuthGuard } from "@/auth/graphql-auth.guard";
import { User } from "@/auth/user.model";
import { Recipe, RecipeId } from "./recipe.model";
import { RecipesRepository } from "./recipes.repository";
import { AddRecipeArgs } from "./dto/add-recipe.args";
import { UpdateRecipeArgs } from "./dto/update-recipe.args";
// import { UpdateRecipeArgs } from "./dto/update-recipe.args";
// TODO change NotFound error - not appropriate for GQL

// TODO create response type objects

@UseGuards(GraphQLAuthGuard)
@Resolver(() => Recipe)
export class RecipesResolver {
    constructor(private readonly recipesRepository: RecipesRepository) {}

    // TODO paginate this
    @Query(() => [Recipe], { name: "recipes", nullable: "items" })
    async getRecipes(@CurrentUser() user: User) {
        return this.recipesRepository.find({ userId: user.id });
    }

    @Query(() => Recipe, { name: "recipe" })
    async getRecipe(
        @Args("id", { type: () => ID }) id: RecipeId,
        @CurrentUser() user: User
    ) {
        const recipe = await this.recipesRepository.findOneById({
            id,
            userId: user.id
        });
        if (!recipe) {
            throw new NotFoundException(`Cannot find recipe with id (${id})`);
        }
        return recipe;
    }

    @Mutation(() => Recipe)
    async addRecipe(@Args() args: AddRecipeArgs, @CurrentUser() user: User) {
        return this.recipesRepository.createOne(args.recipe, user.id);
    }

    @Mutation(() => Recipe)
    async updateRecipe(
        @Args() args: UpdateRecipeArgs,
        @CurrentUser() user: User
    ) {
        const recipe = await this.recipesRepository.updateOne(
            args.recipe.id,
            args.recipe,
            user.id
        );

        if (!recipe) {
            throw new NotFoundException(
                `Cannot find recipe with id (${args.recipe.id})`
            );
        }

        return recipe;
    }
}
