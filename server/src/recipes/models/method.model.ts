import { Field, ObjectType } from "@nestjs/graphql";
import { MethodStep } from "./methodStep.model";

@ObjectType()
export class Method {
    recipeId: string;

    @Field(() => [MethodStep], { nullable: "items" })
    steps: MethodStep[];
}
