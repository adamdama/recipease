import { InputType, Field } from "@nestjs/graphql";
import { MinLength } from "class-validator";
import { ICreateRecipeProperties } from "../recipes.repository";

@InputType()
export class AddRecipeInput implements ICreateRecipeProperties {
    @Field()
    @MinLength(3)
    readonly title!: string;

    @Field({ nullable: true })
    readonly description?: string;

    @Field(() => [String], { nullable: true })
    readonly method?: [string];

    @Field(() => [String], { nullable: true })
    readonly ingredients?: [string];

    @Field({ nullable: true })
    readonly serves?: Number;

    @Field({ nullable: true })
    readonly takesTime?: Number;
}
