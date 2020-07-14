import { Field, ArgsType } from "@nestjs/graphql";
import { GetRecipeInput } from "./get-recipe.input";

@ArgsType()
export class GetRecipeArgs {
    @Field()
    readonly recipe!: GetRecipeInput;
}
