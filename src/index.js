const units = require('./units');
const convert = require('./convert');

const getUnit = (string) => {
  for (unit in units) {
    if (string === unit) return { unit, unit };
    for (shorthand of units[unit]) {
      if (string === shorthand) return { unit, shorthand };
    }
  }
  return {};
}

const parse = (recipeString) => {
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
    quantity: quantity,
    unit: !!unit ? unit : null,
    ingredient: extraInfo ? `${extraInfo} ${ingredient}` : ingredient
  };
}

module.exports = {
  parse
}
