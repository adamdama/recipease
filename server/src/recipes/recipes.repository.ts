import { Injectable } from "@nestjs/common";
import { QuerySpecification } from "@liberation-data/drivine/query/QuerySpecification";
import { InjectPersistenceManager } from "@liberation-data/drivine/DrivineInjectionDecorators";
import { PersistenceManager } from "@liberation-data/drivine/manager/PersistenceManager";
import { plainToClass } from "class-transformer";
import { generateId } from "@/utils";
import { Recipe } from "./recipe.model";
import { AddRecipeArgs } from "./dto/add-recipe.args";
import { UpdateRecipeArgs } from "./dto/update-recipe.args";

// TODO use ts enum for varName?

@Injectable()
export class RecipesRepository {
    constructor(
        @InjectPersistenceManager()
        readonly persistenceManager: PersistenceManager
    ) {}

    getMapper(varName: string) {
        return (item: any) => plainToClass(Recipe, item[varName]);
    }

    async find(): Promise<Recipe[]> {
        const varName = "r";
        const result = await this.persistenceManager.query<Recipe>(
            new QuerySpecification<Recipe>()
                .withStatement(`MATCH (${varName}:Recipe) RETURN ${varName}`)
                .map(this.getMapper(varName))
        );
        return result;
    }

    async findOneById(id: string): Promise<Recipe | undefined> {
        const varName = "r";
        return this.persistenceManager.maybeGetOne<Recipe>(
            new QuerySpecification<Recipe>()
                .withStatement(
                    `MATCH (${varName}:Recipe {id: $1}) RETURN ${varName}`
                )
                .bind([id])
                .limit(1)
                .map(this.getMapper(varName))
        );
    }

    async mergeOne<ArgsType extends UpdateRecipeArgs | AddRecipeArgs>(
        properties: ArgsType,
        id: string = generateId()
    ): Promise<Recipe> {
        const varName = "r";
        const { props, params } = Object.entries(properties).reduce(
            (acc, entry) => {
                if (entry[1] == null) {
                    return acc;
                }
                acc.props.push(`r.${entry[0]} = $${acc.params.length + 1}`);
                acc.params.push(entry[1]);
                return acc;
            },
            { props: [] as string[], params: [id] }
        );
        const query =
            `MERGE (r:Recipe { id: $1 })\n` +
            `ON CREATE SET ${props}, ${varName}.created = timestamp()\n` +
            `ON MATCH SET ${props}, ${varName}.modified = timestamp()\n` +
            `RETURN ${varName}`;

        const [recipe] = await this.persistenceManager.query<Recipe>(
            new QuerySpecification<Recipe>()
                .withStatement(query)
                .bind(params)
                .map(this.getMapper(varName))
        );
        return recipe;
    }
}
