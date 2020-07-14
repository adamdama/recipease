import { Module } from "@nestjs/common";
import { JwtStrategy } from "@/auth/jwt.strategy";
import { RecipeResolver } from "./recipe.resolver";
import { RecipeRepository } from "./recipe.repository";

@Module({
    providers: [RecipeResolver, RecipeRepository, JwtStrategy]
})
export class RecipesModule {}
