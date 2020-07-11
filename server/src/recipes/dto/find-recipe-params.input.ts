import { InputType, Field } from "@nestjs/graphql";

@InputType()
export class FindRecipeParamsInput {
    @Field({ nullable: true })
    readonly titleMatch?: string;
}
