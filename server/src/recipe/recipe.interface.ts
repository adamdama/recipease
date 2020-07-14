export interface IUpdateRecipe {
    readonly id: string;

    readonly title?: string;

    readonly description?: string;

    readonly method?: [string];

    readonly ingredients?: [string];

    readonly serves?: Number;

    readonly takesTime?: Number;
}

export interface ICreateRecipe extends Omit<IUpdateRecipe, "id"> {
    readonly title: string;
}
