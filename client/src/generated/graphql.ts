export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddRecipeInput = {
  readonly title: Scalars['String'];
  readonly description?: Maybe<Scalars['String']>;
  readonly method?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly ingredients?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly serves?: Maybe<Scalars['Float']>;
  readonly takesTime?: Maybe<Scalars['Float']>;
};

export type AddRecipeResponse = {
  readonly __typename?: 'AddRecipeResponse';
  readonly recipe: Recipe;
};

export type FindRecipeParamsInput = {
  readonly titleMatch?: Maybe<Scalars['String']>;
};

export type FindRecipeResponse = {
  readonly __typename?: 'FindRecipeResponse';
  readonly recipes: ReadonlyArray<Maybe<Recipe>>;
};

export type GetRecipeInput = {
  readonly id: Scalars['ID'];
};

export type GetRecipeResponse = {
  readonly __typename?: 'GetRecipeResponse';
  readonly recipe: Recipe;
};

export type Mutation = {
  readonly __typename?: 'Mutation';
  readonly addRecipe: AddRecipeResponse;
  readonly updateRecipe: UpdateRecipeResponse;
};


export type MutationAddRecipeArgs = {
  recipe: AddRecipeInput;
};


export type MutationUpdateRecipeArgs = {
  recipe: UpdateRecipeInput;
};

export type Query = {
  readonly __typename?: 'Query';
  readonly recipes: FindRecipeResponse;
  readonly recipe: GetRecipeResponse;
};


export type QueryRecipesArgs = {
  params?: Maybe<FindRecipeParamsInput>;
};


export type QueryRecipeArgs = {
  recipe: GetRecipeInput;
};

export type Recipe = {
  readonly __typename?: 'Recipe';
  readonly id: Scalars['ID'];
  readonly title: Scalars['String'];
  readonly created: Scalars['String'];
  readonly description?: Maybe<Scalars['String']>;
  readonly method?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly ingredients?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly serves?: Maybe<Scalars['Float']>;
  readonly takesTime?: Maybe<Scalars['Float']>;
};

export type UpdateRecipeInput = {
  readonly title: Scalars['String'];
  readonly description?: Maybe<Scalars['String']>;
  readonly method?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly ingredients?: Maybe<ReadonlyArray<Scalars['String']>>;
  readonly serves?: Maybe<Scalars['Float']>;
  readonly takesTime?: Maybe<Scalars['Float']>;
  readonly id: Scalars['ID'];
};

export type UpdateRecipeResponse = {
  readonly __typename?: 'UpdateRecipeResponse';
  readonly recipe: Recipe;
};

export type RecipeFragment = (
  { readonly __typename?: 'Recipe' }
  & Pick<Recipe, 'title' | 'description' | 'method' | 'ingredients'>
);

export type FindRecipesQueryVariables = Exact<{ [key: string]: never; }>;


export type FindRecipesQuery = (
  { readonly __typename?: 'Query' }
  & { readonly recipes: (
    { readonly __typename?: 'FindRecipeResponse' }
    & { readonly recipes: ReadonlyArray<Maybe<(
      { readonly __typename?: 'Recipe' }
      & RecipeFragment
    )>> }
  ) }
);


      export interface IntrospectionResultData {
        __schema: {
          types: {
            kind: string;
            name: string;
            possibleTypes: {
              name: string;
            }[];
          }[];
        };
      }
      const result: IntrospectionResultData = {
  "__schema": {
    "types": []
  }
};
      export default result;
    