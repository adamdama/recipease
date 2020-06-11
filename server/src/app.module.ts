import { join } from "path";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import {
    DrivineModule,
    DrivineModuleOptions
} from "@liberation-data/drivine/DrivineModule";
import { DatabaseRegistry } from "@liberation-data/drivine/connection/DatabaseRegistry";
import { RecipesModule } from "./recipes/recipes.module";

const devMode = process.env.NODE_ENV === "development";
const autoSchemaFile = join(process.cwd(), "src/schema.gql");
const gqlOptions = {
    autoSchemaFile,
    debug: devMode,
    playground: devMode,
    introspection: devMode
};

@Module({
    imports: [
        DrivineModule.withOptions(<DrivineModuleOptions>{
            connectionProviders: [DatabaseRegistry.buildOrResolveFromEnv()]
        }),
        RecipesModule,
        GraphQLModule.forRoot(gqlOptions)
    ]
})
export class AppModule {}
