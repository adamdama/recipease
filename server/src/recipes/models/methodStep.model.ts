import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class MethodStep {
    @Field(() => Int)
    orderNumber: number;

    @Field({ nullable: true })
    title?: string;

    @Field(() => String)
    description: string;
}
