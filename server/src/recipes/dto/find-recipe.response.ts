import { ObjectType, Field } from "@nestjs/graphql";
import { Recipe } from "../recipe.model";

@ObjectType()
export class FindRecipeResponse {
    @Field(() => [Recipe], { nullable: "items" })
    readonly recipes!: Recipe[];
}
