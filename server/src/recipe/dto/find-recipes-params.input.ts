import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class FindRecipesParamsInput {
    @Field({ nullable: true })
    readonly titleMatch?: string;
}
