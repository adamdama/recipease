import { Injectable } from "@nestjs/common";
import { Recipe } from "./models/recipe.model";

@Injectable()
export class RecipesService {
    private db: Object;

    constructor() {
        this.db = {};
    }

    findOneById(id: string): Recipe {
        return this.db[id];
    }
}
