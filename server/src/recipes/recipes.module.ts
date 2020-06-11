import { Module } from "@nestjs/common";
import { RecipesResolver } from "./recipes.resolver";
import { RecipesRepository } from "./recipes.repository";

@Module({
    providers: [RecipesResolver, RecipesRepository]
})
export class RecipesModule {}
