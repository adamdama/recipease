import { ObjectType, Field } from "@nestjs/graphql";
import { Recipe } from "../recipe.model";

@ObjectType()
export class UpdateRecipeResponse {
    @Field()
    readonly recipe!: Recipe;
}
