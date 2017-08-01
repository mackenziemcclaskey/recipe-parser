export function convertFromFraction(number) {
  // number comes in -> 1 1/3
  if (number && number.split(' ').length > 1) {
    const [whole, fraction] = number.split(' ');
    let [a, b] = fraction.split('/');
    const wholeAndFraction = parseInt(whole) ? parseInt(whole) + parseFloat(a/b) : parseFloat(a/b);
    return keepThreeDecimals(wholeAndFraction);
  } else if (!number || number.split('-').length > 1) {
    return number;
  } else {
    let [a, b] = number.split('/');
    return b ? keepThreeDecimals(parseFloat(a/b)) : a;
  }
}

export function findQuantityAndConvertIfUnicode(string) {
  const numericAndFractionRegex = /^(\d+\/\d+)|(\d+\s\d+\/\d+)|(\d+\-\d+)|\d+/g;
  const unicodeFractionRegex = /\d*[^\u0000-\u007F]+/g;
  const onlyUnicodeFraction = /[^\u0000-\u007F]+/g;

  if (string.match(unicodeFractionRegex)) {
    let numericPart, unicodePart;
    if (string.match(numericAndFractionRegex)) {
      numericPart = string.match(numericAndFractionRegex)[0];
      unicodePart = string.match(onlyUnicodeFraction)[0];
    } else {
      numericPart = '';
      unicodePart = string.match(unicodeFractionRegex)[0];
    }
    const unicodeObj = {
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

    return [`${numericPart} ${unicodeObj[unicodePart]}`, string.replace(string.match(unicodeFractionRegex)[0], '').trim()];
  } else if (string.match(numericAndFractionRegex)) {
    return [string.match(numericAndFractionRegex) && string.match(numericAndFractionRegex)[0], string.replace(string.match(numericAndFractionRegex)[0], '').trim()];
  } else {
    return [null, string];
  }
}

function keepThreeDecimals(val) {
  val = val.toString();
  return val.split(".")[0] + "." + val.split(".")[1].substring(0,3);
}
