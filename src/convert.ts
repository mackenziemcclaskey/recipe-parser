export function convertFromFraction(value: string) {
  // number comes in -> 1 1/3
  if (value && value.split(' ').length > 1) {
    const [whole, fraction] = value.split(' ');
    const [a, b] = fraction.split('/');
    const remainder = parseFloat(a) / parseFloat(b);
    const wholeAndFraction = parseInt(whole) ? parseInt(whole) + remainder : remainder;
    return keepThreeDecimals(wholeAndFraction);
  } else if (!value || value.split('-').length > 1) {
    return value;
  } else {
    const [a, b] = value.split('/');
    return b ? keepThreeDecimals(parseFloat(a) / parseFloat(b)) : a;
  }
}

export function getFirstMatch(line: string, regex: RegExp) {
  const match = line.match(regex);
  return (match && match[0]) || '';
}

const unicodeObj: { [key: string]: string } = {
  '¼': '1/4',
  '½': '1/2',
  '¾': '3/4',
  '⅐': '1/7',
  '⅑': '1/9',
  '⅒': '1/10',
  '⅓': '1/3',
  '⅔': '2/3',
  '⅕': '1/5',
  '⅖': '2/5',
  '⅗': '3/5',
  '⅘': '4/5',
  '⅙': '1/6',
  '⅚': '5/6',
  '⅛': '1/8',
  '⅜': '3/8',
  '⅝': '5/8',
  '⅞': '7/8'
};

export function findQuantityAndConvertIfUnicode(ingredientLine: string) {
  const numericAndFractionRegex = /^(\d+\/\d+)|(\d+\s\d+\/\d+)|(\d+\-\d+)|(\d+.\d+)|\d+/g;
  const unicodeFractionRegex = /\d*[^\u0000-\u007F]+/g;
  const onlyUnicodeFraction = /[^\u0000-\u007F]+/g;

  if (ingredientLine.match(unicodeFractionRegex)) {
    const numericPart = getFirstMatch(ingredientLine, numericAndFractionRegex);
    const unicodePart = getFirstMatch(ingredientLine, numericPart ? onlyUnicodeFraction : unicodeFractionRegex);
    if (unicodeObj[unicodePart]) {
      return [`${numericPart} ${unicodeObj[unicodePart]}`, ingredientLine.replace(getFirstMatch(ingredientLine, unicodeFractionRegex), '').trim()];
    }
  }
  if (ingredientLine.match(numericAndFractionRegex)) {
    return [ingredientLine.match(numericAndFractionRegex) && getFirstMatch(ingredientLine, numericAndFractionRegex), ingredientLine.replace(getFirstMatch(ingredientLine, numericAndFractionRegex), '').trim()];
  }
  return [null, ingredientLine];
}

function keepThreeDecimals(val: number) {
  const strVal = val.toString();
  return strVal.split('.')[0] + '.' + strVal.split('.')[1].substring(0, 3);
}
