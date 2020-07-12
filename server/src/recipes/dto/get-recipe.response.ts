import { ObjectType, Field } from "@nestjs/graphql";
import { Recipe } from "../recipe.model";

@ObjectType()
export class GetRecipeResponse {
    @Field(() => Recipe)
    readonly recipe!: Recipe;
}
