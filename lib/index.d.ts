export interface Ingredient {
    ingredient: string;
    quantity: string | null;
    unit: string | null;
}
export declare function parse(recipeString: string): {
    quantity: string;
    unit: string | null;
    ingredient: string;
};
export declare function combine(ingredientArray: Ingredient[]): Ingredient[];
export declare function prettyPrintingPress(ingredient: Ingredient): string;
