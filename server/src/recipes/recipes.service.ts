import { Injectable } from "@nestjs/common";
import { Recipe } from "./models/recipe.model";

@Injectable()
export class RecipesService {
    private db: Recipe[];

    constructor() {
        this.db = [
            {
                id: "10",
                title: "recipe one",
                description: "best food",
                method: {
                    steps: [
                        {
                            orderNumber: 1,
                            description: "put it in oven"
                        }
                    ]
                }
            }
        ];
    }

    findOneById(id: string): Recipe {
        return this.db.find((recipe) => recipe.id === id);
    }
}
