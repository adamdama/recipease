import { Resolver, Args, Query, Mutation } from "@nestjs/graphql";
import { NotFoundException, UseGuards } from "@nestjs/common";
import { CurrentUser } from "@/auth/current-user.decorator";
import { GraphQLAuthGuard } from "@/auth/graphql-auth.guard";
import { User } from "@/auth/user.model";
import { Recipe } from "./recipe.model";
import { RecipeRepository } from "./recipe.repository";
import {
    FindRecipesResponse,
    FindRecipesArgs,
    GetRecipeResponse,
    GetRecipeArgs,
    AddRecipeResponse,
    AddRecipeArgs,
    UpdateRecipeResponse,
    UpdateRecipeArgs
} from "./dto";
// TODO change NotFound error - not appropriate for GQL

// TODO create response type objects

@UseGuards(GraphQLAuthGuard)
@Resolver(() => Recipe)
export class RecipeResolver {
    constructor(private readonly recipeRepository: RecipeRepository) {}

    // TODO paginate this
    @Query(() => FindRecipesResponse, { name: "recipes" })
    async findRecipes(
        @Args() args: FindRecipesArgs,
        @CurrentUser() user: User
    ): Promise<FindRecipesResponse> {
        return {
            recipes: await this.recipeRepository.find({
                ...args,
                userId: user.id
            })
        };
    }

    @Query(() => GetRecipeResponse, { name: "recipe" })
    async getRecipe(
        @Args() args: GetRecipeArgs,
        @CurrentUser() user: User
    ): Promise<GetRecipeResponse> {
        const recipe = await this.recipeRepository.findOneById({
            id: args.recipe.id,
            userId: user.id
        });
        if (!recipe) {
            throw new NotFoundException(
                `Cannot find recipe with id (${args.recipe.id})`
            );
        }
        return { recipe };
    }

    @Mutation(() => AddRecipeResponse)
    async addRecipe(
        @Args() args: AddRecipeArgs,
        @CurrentUser() user: User
    ): Promise<AddRecipeResponse> {
        return {
            recipe: await this.recipeRepository.createOne(args.recipe, user.id)
        };
    }

    @Mutation(() => UpdateRecipeResponse)
    async updateRecipe(
        @Args() args: UpdateRecipeArgs,
        @CurrentUser() user: User
    ): Promise<UpdateRecipeResponse> {
        const recipe = await this.recipeRepository.updateOne(
            args.recipe.id,
            args.recipe,
            user.id
        );

        if (!recipe) {
            throw new NotFoundException(
                `Cannot find recipe with id (${args.recipe.id})`
            );
        }

        return { recipe };
    }
}
