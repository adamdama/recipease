import { join } from "path";
import { Module } from "@nestjs/common";
import { GraphQLModule, GqlModuleOptions } from "@nestjs/graphql";
import {
    DrivineModule,
    DrivineModuleOptions
} from "@liberation-data/drivine/DrivineModule";
import { DatabaseRegistry } from "@liberation-data/drivine/connection/DatabaseRegistry";
import { AuthModule } from "@/auth";
import { RecipesModule } from "@/recipes";

const devMode = process.env.NODE_ENV === "development";
const autoSchemaFile = join(process.cwd(), "src/schema.gql");
const gqlOptions: GqlModuleOptions = {
    autoSchemaFile,
    debug: devMode,
    playground: devMode,
    introspection: devMode,
    // Make sure the request object is added to the context so that the
    //  authenticated user can be used
    context: (ctx) => ({ req: ctx.req })
};

@Module({
    imports: [
        AuthModule,
        DrivineModule.withOptions(<DrivineModuleOptions>{
            connectionProviders: [DatabaseRegistry.buildOrResolveFromEnv()]
        }),
        GraphQLModule.forRoot(gqlOptions),
        RecipesModule
    ]
})
export class AppModule {}
