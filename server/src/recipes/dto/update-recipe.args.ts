import { Field, ArgsType } from "@nestjs/graphql";
import { UpdateRecipeInput } from "./update-recipe.input";

@ArgsType()
export class UpdateRecipeArgs {
    @Field()
    recipe!: UpdateRecipeInput;
}
