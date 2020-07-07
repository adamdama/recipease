import { InputType, Field } from "@nestjs/graphql";
import { MinLength } from "class-validator";
import { UpdateRecipeProperties } from "../recipes.repository";

@InputType()
export class UpdateRecipeInput implements UpdateRecipeProperties {
    @Field({ nullable: true })
    @MinLength(3)
    title?: string;

    @Field({ nullable: true })
    description?: string;

    @Field(() => [String], { nullable: true })
    method?: [string];

    @Field(() => [String], { nullable: true })
    ingredients?: [string];

    @Field({ nullable: true })
    serves?: Number;

    @Field({ nullable: true })
    takesTime?: Number;
}
