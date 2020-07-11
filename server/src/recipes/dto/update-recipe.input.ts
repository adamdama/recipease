import { InputType, Field, ID } from "@nestjs/graphql";
import { MinLength } from "class-validator";
import { UpdateRecipeProperties as IUpdateRecipeProperties } from "../recipes.repository";
import { RecipeId } from "../recipe.model";

@InputType()
export class UpdateRecipeInput implements IUpdateRecipeProperties {
    @Field(() => ID)
    readonly id!: RecipeId;

    @Field({ nullable: true })
    @MinLength(3)
    readonly title?: string;

    @Field({ nullable: true })
    readonly description?: string;

    @Field(() => [String], { nullable: true })
    readonly method?: [string];

    @Field(() => [String], { nullable: true })
    readonly ingredients?: [string];

    @Field({ nullable: true })
    readonly serves?: Number;

    @Field({ nullable: true })
    readonly akesTime?: Number;
}
