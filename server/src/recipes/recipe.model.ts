import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Flavour } from "@/types/flavour";
import { ITimestampable } from "@/common/model.interface";

export type RecipeId = Flavour<string, "Recipe">;

@ObjectType()
export class Recipe implements ITimestampable {
    @Field(() => ID)
    readonly id!: RecipeId;

    @Field()
    title!: string;

    @Field()
    createdAt!: string;

    @Field({ nullable: true })
    modifiedAt?: string;

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
