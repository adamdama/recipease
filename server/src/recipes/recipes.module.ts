import { Module } from "@nestjs/common";
import { JwtStrategy } from "@/auth/jwt.strategy";
import { RecipesResolver } from "./recipes.resolver";
import { RecipesRepository } from "./recipes.repository";

@Module({
    providers: [RecipesResolver, RecipesRepository, JwtStrategy]
})
export class RecipesModule {}
