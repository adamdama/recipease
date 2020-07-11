import { ObjectType, Field } from "@nestjs/graphql";
import { Recipe } from "../recipe.model";

@ObjectType()
export class AddRecipeResponse {
    @Field()
    readonly recipe!: Recipe;
}
