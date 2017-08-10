import * as convert from './convert';
import units from './units';

export interface Ingredient {
  ingredient: string;
  quantity: string | null;
  unit: string | null;
}

function getUnit(input: string) {
  for (const unit of Object.keys(units)) {
    if (input === unit) {
      return [unit];
    }
    for (const shorthand of units[unit]) {
      if (input === shorthand) {
        return [unit, shorthand];
      }
    }
  }
  return [];
}

export function parse(recipeString: string) {
  const ingredientLine = recipeString.trim();

  let [quantity, noQuantity] = convert.findQuantityAndConvertIfUnicode(ingredientLine) as string[];

  quantity = convert.convertFromFraction(quantity);

  let extraInfo;
  if (convert.getFirstMatch(noQuantity, /\(([^\)]+)\)/)) {
    extraInfo = convert.getFirstMatch(noQuantity, /\(([^\)]+)\)/);
    noQuantity = noQuantity.replace(extraInfo, '').trim();
  }

  const [unit, shorthand] = getUnit(noQuantity.split(' ')[0]) as string[];
  const ingredient = !!shorthand ? noQuantity.replace(shorthand, '').trim() : noQuantity.replace(unit, '').trim();

  return {
    quantity,
    unit: !!unit ? unit : null,
    ingredient: extraInfo ? `${extraInfo} ${ingredient}` : ingredient
  };
}

export function combine(ingredientArray: Ingredient[]) {
  const combinedIngredients = ingredientArray.reduce((acc, ingredient) => {
    const key = ingredient.ingredient + ingredient.unit; // when combining different units, remove this from the key and just use the name
    const existingIngredient = acc[key];

    if (existingIngredient) {
      return Object.assign(acc, { [key]: combineTwoIngredients(existingIngredient, ingredient) });
    } else {
      return Object.assign(acc, { [key]: ingredient });
    }
  }, {} as { [key: string]: Ingredient });

  return Object.keys(combinedIngredients).reduce((acc, key) => {
    const ingredient = combinedIngredients[key];
    return acc.concat(ingredient);
  }, [] as Ingredient[]).sort(compareIngredients);
}

// TODO: Maybe change this to existingIngredients: Ingredient | Ingredient[]
function combineTwoIngredients(existingIngredients: Ingredient, ingredient: Ingredient): Ingredient {
  const quantity = (Number(existingIngredients.quantity) + Number(ingredient.quantity)).toString();
  return Object.assign({}, existingIngredients, { quantity });
}

function compareIngredients(a: Ingredient, b: Ingredient) {
  if (a.ingredient === b.ingredient) {
    return 0;
  }
  return a.ingredient < b.ingredient ? -1 : 1;
}
