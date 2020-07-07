import { Field, ArgsType } from "@nestjs/graphql";
import { UpdateRecipeInput } from "./update-recipe.input";
import { RecipeId } from "../recipe.model";

@ArgsType()
export class UpdateRecipeArgs {
    @Field()
    id!: RecipeId;

    @Field()
    recipe!: UpdateRecipeInput;
}
