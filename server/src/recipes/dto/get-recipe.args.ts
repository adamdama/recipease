import { Field, ArgsType } from "@nestjs/graphql";
import { GetRecipeParamsInput } from "./get-recipe-params.input";

@ArgsType()
export class GetRecipeArgs {
    @Field()
    readonly params!: GetRecipeParamsInput;
}
