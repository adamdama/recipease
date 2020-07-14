import { InputType, Field, ID } from "@nestjs/graphql";
import { RecipeId } from "../recipe.model";
import { AddRecipeInput } from "./add-recipe.input";
import { IUpdateRecipe } from "../recipes.interface";

@InputType()
export class UpdateRecipeInput extends AddRecipeInput implements IUpdateRecipe {
    @Field(() => ID)
    readonly id!: RecipeId;
}
