import { InputType, Field, ID } from "@nestjs/graphql";
import { RecipeId } from "../recipe.model";

@InputType()
export class GetRecipeParamsInput {
    @Field(() => ID)
    readonly id!: RecipeId;
}
