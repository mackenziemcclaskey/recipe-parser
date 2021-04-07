import * as convert from './convert';
import { units, pluralUnits } from './units';
import { repeatingFractions } from './repeatingFractions';
import * as Natural from 'natural';

const nounInflector = new Natural.NounInflector();

export interface Ingredient {
  ingredient: string;
  quantity?: string | null;
  unit?: string | null;
  extra?: string | null;
}

function getUnit(input: string) {
  if (units[input] || pluralUnits[input]) {
    return [input];
  }
  for (const unit of Object.keys(units)) {
    for (const shorthand of units[unit]) {
      if (input === shorthand) {
        return [unit, input];
      }
    }
  }
  for (const pluralUnit of Object.keys(pluralUnits)) {
    if (input === pluralUnits[pluralUnit]) {
      return [pluralUnit, input];
    }
  }
  return [];
}

export function parse(recipeString: string): Ingredient {
  const ingredientLine = recipeString.trim();

  let [quantityStr, noQuantity] = convert.findQuantityAndConvertIfUnicode(ingredientLine) as string[];

  const quantity = convert.convertFromFraction(quantityStr) || null;
  noQuantity = noQuantity.trim();

  let extras: string[] = [];

  let container: string | null = convert.getFirstMatch(noQuantity, /^\(([^\)]+)\)/)
  if (container) {
    noQuantity = noQuantity.replace(container, '').trim();
    container = container.substring(1, container.length - 1).trim();
    extras = [...extras, container]
  }

  const commaIndex = noQuantity.indexOf(',');
  const bracketIndex = noQuantity.indexOf('(');
  if (commaIndex >= 0 && (bracketIndex < 0 || commaIndex < bracketIndex)) {
    extras = [...extras, noQuantity.substring(commaIndex + 1).trim()];
    noQuantity = noQuantity.substring(0, commaIndex);
  }
  if (bracketIndex >= 0 && (commaIndex < 0 || bracketIndex < commaIndex)) {
    let bracketContent = convert.getFirstMatch(noQuantity, /\(([^\)]+)\)/);
    bracketContent = bracketContent.substring(1, bracketContent.length - 1).trim();
    extras = [...extras, bracketContent];
    noQuantity = noQuantity.substring(0, bracketIndex).trim();
  }

  const [unit, shorthand] = getUnit(noQuantity.split(' ')[0]) as string[];
  const ingredient = !!shorthand ? noQuantity.replace(shorthand, '').trim() : noQuantity.replace(unit, '').trim();

  return {
    quantity,
    unit: (unit || null),
    ingredient,
    extra: (extras.length > 0 ? extras.join(', ') : null)
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

export function prettyPrintingPress(ingredient: Ingredient) {
  let quantity = '';
  let unit = ingredient.unit;
  if (ingredient.quantity) {
    const [whole, remainder] = ingredient.quantity.split('.');
    if (+whole !== 0 && typeof whole !== 'undefined') {
      quantity = whole;
    }
    if (+remainder !== 0 && typeof remainder !== 'undefined') {
      let fractional;
      if (repeatingFractions[remainder]) {
        fractional = repeatingFractions[remainder];
      } else {
        const fraction = '0.' + remainder;
        const len = fraction.length - 2;
        let denominator = Math.pow(10, len);
        let numerator = +fraction * denominator;

        const divisor = gcd(numerator, denominator);

        numerator /= divisor;
        denominator /= divisor;
        fractional = Math.floor(numerator) + '/' + Math.floor(denominator);
      }

      quantity += quantity ? ' ' + fractional : fractional;
    }
    if (((+whole !== 0 && typeof remainder !== 'undefined') || +whole > 1) && unit) {
      unit = nounInflector.pluralize(unit);
    }
  } else {
    return ingredient.ingredient;
  }

  return `${quantity}${unit ? ' ' + unit : ''} ${ingredient.ingredient}`;
}

function gcd(a: number, b: number): number {
  if (b < 0.0000001) {
    return a;
  }

  return gcd(b, Math.floor(a % b));
}

// TODO: Maybe change this to existingIngredients: Ingredient | Ingredient[]
function combineTwoIngredients(existingIngredients: Ingredient, ingredient: Ingredient): Ingredient {
  const quantity = existingIngredients.quantity && ingredient.quantity ? (Number(existingIngredients.quantity) + Number(ingredient.quantity)).toString() : null;
  return Object.assign({}, existingIngredients, { quantity });
}

function compareIngredients(a: Ingredient, b: Ingredient) {
  if (a.ingredient === b.ingredient) {
    return 0;
  }
  return a.ingredient < b.ingredient ? -1 : 1;
}
