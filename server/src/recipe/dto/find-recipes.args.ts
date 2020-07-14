import { Field, ArgsType } from "@nestjs/graphql";
import { FindRecipesParamsInput } from "./find-recipes-params.input";

@ArgsType()
export class FindRecipesArgs {
    @Field({ nullable: true })
    readonly params?: FindRecipesParamsInput;
}
