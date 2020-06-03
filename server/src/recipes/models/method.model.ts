import { Field, ObjectType } from "@nestjs/graphql";
import { MethodStep } from "./methodStep.model";

@ObjectType()
export class Method {
    @Field(() => [MethodStep], { nullable: "items" })
    steps: MethodStep[];
}
