import { Field, ArgsType } from "@nestjs/graphql";
import { FindRecipeParamsInput } from "./find-recipe-params.input";

@ArgsType()
export class FindRecipeArgs {
    @Field({ nullable: true })
    readonly params?: FindRecipeParamsInput;
}
