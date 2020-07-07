import { Injectable } from "@nestjs/common";
import { QuerySpecification } from "@liberation-data/drivine/query/QuerySpecification";
import { InjectPersistenceManager } from "@liberation-data/drivine/DrivineInjectionDecorators";
import { PersistenceManager } from "@liberation-data/drivine/manager/PersistenceManager";
import { plainToClass } from "class-transformer";
import { generateId } from "@/utils";
import { UserId, USER_LABEL } from "@/auth/user.model";
import { Recipe, RecipeId } from "./recipe.model";

// TODO use ts enum for varName? Or generics?
const recipeResultKey = "r";

interface FindArgs {
    userId?: UserId;
}
interface FindOneByIdArgs {
    id: RecipeId;
    userId?: UserId;
}

export const RECIPE_LABEL = "Recipe";

export interface UpdateRecipeProperties {
    title?: string;

    description?: string;

    method?: [string];

    ingredients?: [string];

    serves?: Number;

    takesTime?: Number;
}

export interface CreateRecipeProperties extends UpdateRecipeProperties {
    title: string;
}

// TODO make a cypher query builder
// TODO: refactor this recipeResultKey mess into something sensible

@Injectable()
export class RecipesRepository {
    constructor(
        @InjectPersistenceManager()
        readonly persistenceManager: PersistenceManager
    ) {}

    private resultMap(item: { [recipeResultKey]: Recipe }) {
        return plainToClass(Recipe, item[recipeResultKey]);
    }

    async find(args?: FindArgs): Promise<Recipe[]> {
        const filter = args?.userId ? "{ userId: $1 }" : "";
        const result = await this.persistenceManager.query<Recipe>(
            new QuerySpecification<Recipe>()
                .withStatement(
                    `MATCH (${recipeResultKey}:${RECIPE_LABEL} ${filter}) RETURN ${recipeResultKey}`
                )
                .bind([args?.userId])
                .map(this.resultMap)
        );
        return result;
    }

    async findOneById(args: FindOneByIdArgs): Promise<Recipe | undefined> {
        const filter = `{ id: $1 ${args.userId ? "userId: $2" : ""} }`;
        return this.persistenceManager.maybeGetOne<Recipe>(
            new QuerySpecification<Recipe>()
                .withStatement(
                    `MATCH (${recipeResultKey}:${RECIPE_LABEL} ${filter}) RETURN ${recipeResultKey}`
                )
                .bind([args.id, args.userId])
                .limit(1)
                .map(this.resultMap)
        );
    }

    async createOne(
        properties: CreateRecipeProperties,
        userId: UserId
    ): Promise<Recipe> {
        const id = generateId();
        const query =
            `MERGE (u:${USER_LABEL} { id: $1 })\n` +
            `ON CREATE SET u.createdAt = timestamp()\n` +
            `CREATE (${recipeResultKey}:${RECIPE_LABEL} $2)<-[:CREATED]-(u)\n` +
            `RETURN ${recipeResultKey}`;

        const [result] = await this.persistenceManager.query<Recipe>(
            new QuerySpecification<Recipe>()
                .withStatement(query)
                .bind([userId, { ...properties, id }])
                .map(this.resultMap)
        );
        return result;
    }

    async updateOne(
        id: RecipeId,
        properties: UpdateRecipeProperties,
        userId: UserId
    ): Promise<Recipe> {
        // MATCH + SET
        // TODO: implement a saner way of achieving this
        const { props, params } = Object.entries(properties).reduce(
            (acc, entry) => {
                if (entry[1] == null) {
                    return acc;
                }
                acc.props.push(`r.${entry[0]} = $${acc.params.length + 1}`);
                acc.params.push(entry[1]);
                return acc;
            },
            { props: [] as string[], params: [userId, id] }
        );

        const set = props.length
            ? `SET r.modifiedAt = timestamp(), ${props.join(", ")}\n`
            : "";

        const query =
            `MATCH (u:${USER_LABEL} { id: $1 })-[:CREATED]->(r:Recipe { id: $2 })\n${set}` +
            `RETURN ${recipeResultKey}`;

        const [result] = await this.persistenceManager.query<Recipe>(
            new QuerySpecification<Recipe>()
                .withStatement(query)
                .bind(params)
                .map(this.resultMap)
        );
        return result;
    }
}
