import { Injectable } from "@nestjs/common";
import { QuerySpecification } from "@liberation-data/drivine/query/QuerySpecification";
import { InjectPersistenceManager } from "@liberation-data/drivine/DrivineInjectionDecorators";
import { PersistenceManager } from "@liberation-data/drivine/manager/PersistenceManager";
import { generateId } from "@/utils";
import { UserId, USER_LABEL as USER_NODE_LABEL } from "@/auth/user.model";
import { Query, node, relation } from "cypher-query-builder";
import { Recipe, RecipeId } from "./recipe.model";

export interface IFindArgs {
    userId?: UserId;
}

export interface IFindOneByIdArgs {
    id: RecipeId;
    userId?: UserId;
}

interface IFindMatchArgs extends Partial<IFindOneByIdArgs> {}

export const RECIPE_NODE_LABEL = "Recipe";
export const CREATED_RELATIONSHIP_LABEL = "CREATED";

export interface IUpdateRecipeProperties {
    readonly id: string;

    readonly title?: string;

    readonly description?: string;

    readonly method?: [string];

    readonly ingredients?: [string];

    readonly serves?: Number;

    readonly takesTime?: Number;
}

export interface ICreateRecipeProperties
    extends Omit<IUpdateRecipeProperties, "id"> {
    title: string;
}

const prefixObjectKeys = (obj: Record<string, any>, prefix: string) =>
    Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [`${prefix}${key}`, value])
    );

// TODO: Pagination and limits

@Injectable()
export class RecipesRepository {
    constructor(
        @InjectPersistenceManager()
        readonly persistenceManager: PersistenceManager
    ) {}

    private getFindMatch(args?: IFindMatchArgs) {
        const recipeProps = args?.id ? { id: args.id } : undefined;
        const match = [node("r", RECIPE_NODE_LABEL, recipeProps)];
        if (args?.userId) {
            match.push(
                relation("in", "", CREATED_RELATIONSHIP_LABEL),
                node("u", USER_NODE_LABEL, { id: args.userId })
            );
        }

        return match;
    }

    async find(args?: IFindArgs): Promise<Recipe[]> {
        const { query, params } = new Query()
            .match(this.getFindMatch(args))
            .return("r")
            .buildQueryObject();

        const result = await this.persistenceManager.query<Recipe>(
            new QuerySpecification<Recipe>()
                .withStatement(query)
                .bind(params)
                .transform(Recipe)
        );
        return result;
    }

    async findOneById(args: IFindOneByIdArgs): Promise<Recipe | undefined> {
        const { query, params } = new Query()
            .match(this.getFindMatch(args))
            .return("r")
            .buildQueryObject();

        return this.persistenceManager.maybeGetOne<Recipe>(
            new QuerySpecification<Recipe>()
                .withStatement(query)
                .bind({ ...params })
                .transform(Recipe)
        );
    }

    async createOne(
        properties: ICreateRecipeProperties,
        userId: UserId
    ): Promise<Recipe> {
        const id = generateId();

        const { query, params } = new Query()
            .merge([node("u", USER_NODE_LABEL, { id: userId })])
            .onCreate.setVariables({ "u.createdAt": "timestamp()" })
            .create([
                node("r", RECIPE_NODE_LABEL, { id, ...properties }),
                relation("in", "", CREATED_RELATIONSHIP_LABEL),
                node("u")
            ])
            .return("r")
            .buildQueryObject();

        const [result] = await this.persistenceManager.query<Recipe>(
            new QuerySpecification<Recipe>()
                .withStatement(query)
                .bind(params)
                .transform(Recipe)
        );
        return result;
    }

    async updateOne(
        id: RecipeId,
        properties: IUpdateRecipeProperties,
        userId: UserId
    ): Promise<Recipe> {
        // Ensure the id cannot be changed
        const safeProperties = { ...properties };
        delete safeProperties.id;
        // If title is null it will get removed and we cannot have a recipe wihtout a title
        if (safeProperties.title === null) {
            delete safeProperties.title;
        }

        const q = new Query().match([
            node("r", RECIPE_NODE_LABEL, { id }),
            relation("in", "", CREATED_RELATIONSHIP_LABEL),
            node("u", USER_NODE_LABEL, { id: userId })
        ]);
        if (Object.keys(safeProperties).length) {
            q.setVariables({ "r.modifiedAt": "timestamp()" });
            q.setValues(prefixObjectKeys(safeProperties, "r."));
        }
        q.return("r");

        const { query, params } = q.buildQueryObject();

        const [result] = await this.persistenceManager.query<Recipe>(
            new QuerySpecification<Recipe>()
                .withStatement(query)
                .bind(params)
                .transform(Recipe)
        );
        return result;
    }
}
