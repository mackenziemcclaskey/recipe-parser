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
