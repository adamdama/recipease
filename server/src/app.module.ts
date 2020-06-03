import { join } from "path";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { RecipesModule } from "./recipes/recipes.module";

const autoSchemaFile = join(process.cwd(), "src/schema.gql");
console.log(autoSchemaFile);

@Module({
    imports: [
        RecipesModule,
        GraphQLModule.forRoot({
            // debug: true,
            // playground: true,
            autoSchemaFile
            // introspection: true
        })
    ]
})
export class AppModule {}
