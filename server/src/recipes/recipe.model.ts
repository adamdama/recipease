import { Field, ID, ObjectType } from "@nestjs/graphql";

export type RecipeResult = {
    result: Recipe;
};

@ObjectType()
export class Recipe {
    @Field(() => ID)
    readonly id: string = "";

    @Field()
    title: string = "";

    @Field({ nullable: true })
    description?: string;

    @Field(() => [String], { nullable: true })
    method?: [string];
}
