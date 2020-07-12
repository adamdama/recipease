import { InputType, Field, ID } from "@nestjs/graphql";
import { IUpdateRecipeProperties } from "../recipes.repository";
import { RecipeId } from "../recipe.model";
import { AddRecipeInput } from "./add-recipe.input";

@InputType()
export class UpdateRecipeInput extends AddRecipeInput
    implements IUpdateRecipeProperties {
    @Field(() => ID)
    readonly id!: RecipeId;
}
