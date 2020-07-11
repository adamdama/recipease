import { InputType, Field } from "@nestjs/graphql";
import { MinLength } from "class-validator";
import { UpdateRecipeInput } from "./update-recipe.input";

@InputType()
export class AddRecipeInput extends UpdateRecipeInput {
    @Field()
    @MinLength(3)
    readonly title!: string;
}
