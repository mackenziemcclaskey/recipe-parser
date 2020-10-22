"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var convert = require("./convert");
var units_1 = require("./units");
var repeatingFractions_1 = require("./repeatingFractions");
var Natural = require("natural");
var nounInflector = new Natural.NounInflector();
function getUnit(input) {
    if (units_1.units[input] || units_1.pluralUnits[input]) {
        return [input];
    }
    for (var _i = 0, _a = Object.keys(units_1.units); _i < _a.length; _i++) {
        var unit = _a[_i];
        for (var _b = 0, _c = units_1.units[unit]; _b < _c.length; _b++) {
            var shorthand = _c[_b];
            if (input === shorthand) {
                return [unit, input];
            }
        }
    }
    for (var _d = 0, _e = Object.keys(units_1.pluralUnits); _d < _e.length; _d++) {
        var pluralUnit = _e[_d];
        if (input === units_1.pluralUnits[pluralUnit]) {
            return [pluralUnit, input];
        }
    }
    return [];
}
function parse(recipeString) {
    var ingredientLine = recipeString.trim();
    var _a = convert.findQuantityAndConvertIfUnicode(ingredientLine), quantity = _a[0], noQuantity = _a[1];
    quantity = convert.convertFromFraction(quantity);
    var extraInfo;
    if (convert.getFirstMatch(noQuantity, /\(([^\)]+)\)/)) {
        extraInfo = convert.getFirstMatch(noQuantity, /\(([^\)]+)\)/);
        noQuantity = noQuantity.replace(extraInfo, '').trim();
    }
    var _b = getUnit(noQuantity.split(' ')[0]), unit = _b[0], shorthand = _b[1];
    var ingredient = !!shorthand ? noQuantity.replace(shorthand, '').trim() : noQuantity.replace(unit, '').trim();
    return {
        quantity: quantity,
        unit: !!unit ? unit : null,
        ingredient: extraInfo ? extraInfo + " " + ingredient : ingredient
    };
}
exports.parse = parse;
function combine(ingredientArray) {
    var combinedIngredients = ingredientArray.reduce(function (acc, ingredient) {
        var _a, _b;
        var key = ingredient.ingredient + ingredient.unit; // when combining different units, remove this from the key and just use the name
        var existingIngredient = acc[key];
        if (existingIngredient) {
            return Object.assign(acc, (_a = {}, _a[key] = combineTwoIngredients(existingIngredient, ingredient), _a));
        }
        else {
            return Object.assign(acc, (_b = {}, _b[key] = ingredient, _b));
        }
    }, {});
    return Object.keys(combinedIngredients).reduce(function (acc, key) {
        var ingredient = combinedIngredients[key];
        return acc.concat(ingredient);
    }, []).sort(compareIngredients);
}
exports.combine = combine;
function prettyPrintingPress(ingredient) {
    var quantity = '';
    var unit = ingredient.unit;
    if (ingredient.quantity) {
        var _a = ingredient.quantity.split('.'), whole = _a[0], remainder = _a[1];
        if (+whole !== 0 && typeof whole !== 'undefined') {
            quantity = whole;
        }
        if (+remainder !== 0 && typeof remainder !== 'undefined') {
            var fractional = void 0;
            if (repeatingFractions_1.repeatingFractions[remainder]) {
                fractional = repeatingFractions_1.repeatingFractions[remainder];
            }
            else {
                var fraction = '0.' + remainder;
                var len = fraction.length - 2;
                var denominator = Math.pow(10, len);
                var numerator = +fraction * denominator;
                var divisor = gcd(numerator, denominator);
                numerator /= divisor;
                denominator /= divisor;
                fractional = Math.floor(numerator) + '/' + Math.floor(denominator);
            }
            quantity += quantity ? ' ' + fractional : fractional;
        }
        if (((+whole !== 0 && typeof remainder !== 'undefined') || +whole > 1) && unit) {
            unit = nounInflector.pluralize(unit);
        }
    }
    else {
        return ingredient.ingredient;
    }
    return "" + quantity + (unit ? ' ' + unit : '') + " " + ingredient.ingredient;
}
exports.prettyPrintingPress = prettyPrintingPress;
function gcd(a, b) {
    if (b < 0.0000001) {
        return a;
    }
    return gcd(b, Math.floor(a % b));
}
// TODO: Maybe change this to existingIngredients: Ingredient | Ingredient[]
function combineTwoIngredients(existingIngredients, ingredient) {
    var quantity = existingIngredients.quantity && ingredient.quantity ? (Number(existingIngredients.quantity) + Number(ingredient.quantity)).toString() : null;
    return Object.assign({}, existingIngredients, { quantity: quantity });
}
function compareIngredients(a, b) {
    if (a.ingredient === b.ingredient) {
        return 0;
    }
    return a.ingredient < b.ingredient ? -1 : 1;
}
//# sourceMappingURL=index.js.map