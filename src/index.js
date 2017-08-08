import units from './units';
import * as convert from './convert';

function getUnit(input) {
  for (let unit of Object.keys(units)) {
    if (input === unit) {
      return { unit };
    }
    for (let shorthand of units[unit]) {
      if (input === shorthand) {
        return { unit, shorthand };
      }
    }
  }
  return {};
}

export function parse(recipeString) {
  const ingredientLine = recipeString.trim();

  let [quantity, noQuantity] = convert.findQuantityAndConvertIfUnicode(ingredientLine);

  quantity = convert.convertFromFraction(quantity);

  let extraInfo;
  if (noQuantity.match(/\(([^\)]+)\)/)) {
    extraInfo = noQuantity.match(/\(([^\)]+)\)/)[0];
    noQuantity = noQuantity.replace(extraInfo, '').trim();
  }

  const { unit, shorthand } = getUnit(noQuantity.split(' ')[0]);
  const ingredient = !!shorthand ? noQuantity.replace(shorthand, '').trim() : noQuantity.replace(unit, '').trim();

  return {
    quantity,
    unit: !!unit ? unit : null,
    ingredient: extraInfo ? `${extraInfo} ${ingredient}` : ingredient
  };
}

export function combine(ingredientArray) {
  const combinedIngredients = ingredientArray.reduce((acc, ingredient) => {
    const key = ingredient.ingredient + ingredient.unit; // when combining different units, remove this from the key and just use the name
    const existingIngredient = acc[key];

    if (existingIngredient) {
      return Object.assign(acc, { [key]: combineTwoIngredients(existingIngredient, ingredient) });
    } else {
      return Object.assign(acc, { [key]: ingredient });
    }
  }, {});

  return Object.keys(combinedIngredients).reduce((acc, key) => {
    return acc.concat(combinedIngredients[key]);
  }, []).sort(compareIngredients);
}

function combineTwoIngredients(existingIngredients, ingredient) {
  const quantity = (Number(existingIngredients.quantity) + Number(ingredient.quantity)).toString();
  return Object.assign({}, existingIngredients, { quantity });
}

function compareIngredients(a, b) {
  if (a.ingredient < b.ingredient)
    return -1;
  if (a.ingredient > b.ingredient)
    return 1;
  return 0;
}
