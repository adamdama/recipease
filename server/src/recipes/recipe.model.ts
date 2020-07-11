import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Flavour } from "@/types/flavour";

export type RecipeId = Flavour<string, "Recipe">;

@ObjectType()
export class Recipe {
    @Field(() => ID)
    readonly id!: RecipeId;

    @Field()
    title!: string;

    @Field()
    created!: string;

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
