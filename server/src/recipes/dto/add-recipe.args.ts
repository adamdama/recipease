import { Field, ArgsType } from "@nestjs/graphql";
import { AddRecipeInput } from "./add-recipe.input";

@ArgsType()
export class AddRecipeArgs {
    @Field()
    recipe!: AddRecipeInput;
}
