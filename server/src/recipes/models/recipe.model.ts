import { Field, ID, ObjectType } from "@nestjs/graphql";
import { Method } from "./method.model";

// import { URLResolver, URLTypeDefinition } from "graphql-scalars";

@ObjectType()
export class Recipe {
    @Field(() => ID)
    id: string;

    @Field()
    title: string;

    @Field()
    method: Method;

    // @Field(() => URLTypeDefinition, { nullable: true })
    // url?: string;
}
