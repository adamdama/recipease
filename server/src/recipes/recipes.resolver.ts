import { Resolver, Args, Query, Mutation } from "@nestjs/graphql";
import { NotFoundException, UseGuards } from "@nestjs/common";
import { CurrentUser } from "@/auth/current-user.decorator";
import { GraphQLAuthGuard } from "@/auth/graphql-auth.guard";
import { User } from "@/auth/user.model";
import { Recipe } from "./recipe.model";
import { RecipesRepository } from "./recipes.repository";
import {
    FindRecipeResponse,
    FindRecipeArgs,
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
export class RecipesResolver {
    constructor(private readonly recipesRepository: RecipesRepository) {}

    // TODO paginate this
    @Query(() => FindRecipeResponse, { name: "recipes" })
    async findRecipes(
        @Args() args: FindRecipeArgs,
        @CurrentUser() user: User
    ): Promise<FindRecipeResponse> {
        return {
            recipes: await this.recipesRepository.find({
                ...args,
                userId: user.id
            })
        };
    }

    @Query(() => GetRecipeResponse, { name: "recipe" })
    async getRecipe(
        @Args() { params }: GetRecipeArgs,
        @CurrentUser() user: User
    ): Promise<GetRecipeResponse> {
        const recipe = await this.recipesRepository.findOneById({
            id: params.id,
            userId: user.id
        });
        if (!recipe) {
            throw new NotFoundException(
                `Cannot find recipe with id (${params.id})`
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
            recipe: await this.recipesRepository.createOne(args.recipe, user.id)
        };
    }

    @Mutation(() => UpdateRecipeResponse)
    async updateRecipe(
        @Args() args: UpdateRecipeArgs,
        @CurrentUser() user: User
    ): Promise<UpdateRecipeResponse> {
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

        return { recipe };
    }
}
