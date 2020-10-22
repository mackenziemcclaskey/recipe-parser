"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function convertFromFraction(value) {
    // number comes in -> 1 1/3
    if (value && value.split(' ').length > 1) {
        var _a = value.split(' '), whole = _a[0], fraction = _a[1];
        var _b = fraction.split('/'), a = _b[0], b = _b[1];
        var remainder = parseFloat(a) / parseFloat(b);
        var wholeAndFraction = parseInt(whole) ? parseInt(whole) + remainder : remainder;
        return keepThreeDecimals(wholeAndFraction);
    }
    else if (!value || value.split('-').length > 1) {
        return value;
    }
    else {
        var _c = value.split('/'), a = _c[0], b = _c[1];
        return b ? keepThreeDecimals(parseFloat(a) / parseFloat(b)) : a;
    }
}
exports.convertFromFraction = convertFromFraction;
function getFirstMatch(line, regex) {
    var match = line.match(regex);
    return (match && match[0]) || '';
}
exports.getFirstMatch = getFirstMatch;
var unicodeObj = {
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
function findQuantityAndConvertIfUnicode(ingredientLine) {
    var numericAndFractionRegex = /^(\d+\/\d+)|(\d+\s\d+\/\d+)|(\d+\-\d+)|(\d+.\d+)|\d+/g;
    var unicodeFractionRegex = /\d*\s*[^\u0000-\u007F]+/g;
    var onlyUnicodeFraction = /[^\u0000-\u007F]+/g;
    if (ingredientLine.match(unicodeFractionRegex)) {
        var numericPart = getFirstMatch(ingredientLine, numericAndFractionRegex);
        var unicodePart = getFirstMatch(ingredientLine, numericPart ? onlyUnicodeFraction : unicodeFractionRegex);
        if (unicodeObj[unicodePart]) {
            return [numericPart + " " + unicodeObj[unicodePart], ingredientLine.replace(getFirstMatch(ingredientLine, unicodeFractionRegex), '').trim()];
        }
    }
    if (ingredientLine.match(numericAndFractionRegex)) {
        return [ingredientLine.match(numericAndFractionRegex) && getFirstMatch(ingredientLine, numericAndFractionRegex), ingredientLine.replace(getFirstMatch(ingredientLine, numericAndFractionRegex), '').trim()];
    }
    return [null, ingredientLine];
}
exports.findQuantityAndConvertIfUnicode = findQuantityAndConvertIfUnicode;
function keepThreeDecimals(val) {
    var strVal = val.toString();
    return strVal.split('.')[0] + '.' + strVal.split('.')[1].substring(0, 3);
}
//# sourceMappingURL=convert.js.map