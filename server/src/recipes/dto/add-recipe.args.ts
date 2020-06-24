import { MinLength } from "class-validator";
import { Field, ArgsType } from "@nestjs/graphql";

// TODO convert to input
@ArgsType()
export class AddRecipeArgs {
    @Field()
    @MinLength(3)
    title: string;

    @Field({ nullable: true })
    // @MinLength(15, { always: false })
    description?: string;

    @Field(() => [String], { nullable: true })
    method?: string[];
}