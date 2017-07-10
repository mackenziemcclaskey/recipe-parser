const expect = require('chai').expect;
const parse = require('../src/index').parse;

describe('recipe parser', () => {
  it('returns an object', () => {
    expect(typeof parse('1 cup water')).to.equal('object');
  });

  describe('translates the quantity', () => {
    it('of "1 teaspoon water"', () => {
      expect(parse('1 teaspoon water').quantity).to.equal('1');
    });
    it('of "1 1/2 teaspoon water"', () => {
      expect(parse('1 1/2 teaspoon water').quantity).to.equal('1.5');
    });
    it('of "10-20 teaspoon water"', () => {
      expect(parse('10-20 teaspoon water').quantity).to.equal('10-20');
    });
    it('of "1/2 teaspoon water"', () => {
      expect(parse('1/2 teaspoon water').quantity).to.equal('0.5');
    });
    it('of "10 1/2 teaspoon water"', () => {
      expect(parse('10 1/2 teaspoon water').quantity).to.equal('10.5');
    });
  });

  describe('translates the literal units', () => {
    it('of "1 cup water"', () => {
      expect(parse('1 cup water').unit).to.equal('cup');
    });
    it('of "1 gallon water"', () => {
      expect(parse('1 gallon water').unit).to.equal('gallon');
    });
    it('of "1 ounce water"', () => {
      expect(parse('1 ounce water').unit).to.equal('ounce');
    });
    it('of "1 pint water"', () => {
      expect(parse('1 pint water').unit).to.equal('pint');
    });
    it('of "1 pound water"', () => {
      expect(parse('1 pound water').unit).to.equal('pound');
    });
    it('of "1 quart water"', () => {
      expect(parse('1 quart water').unit).to.equal('quart');
    });
    it('of "1 tablespoon water"', () => {
      expect(parse('1 tablespoon water').unit).to.equal('tablespoon');
    });
    it('of "1 teaspoon water"', () => {
      expect(parse('1 teaspoon water').unit).to.equal('teaspoon');
    });
    it('of "1 gram water"', () => {
      expect(parse('1 gram water').unit).to.equal('gram');
    });
    it('of "1 kilogram water"', () => {
      expect(parse('1 kilogram water').unit).to.equal('kilogram');
    });
    it('of "1 liter water"', () => {
      expect(parse('1 liter water').unit).to.equal('liter');
    });
    it('of "1 milligram water"', () => {
      expect(parse('1 milligram water').unit).to.equal('milligram');
    });
    it('of "1 milliliter water"', () => {
      expect(parse('1 milliliter water').unit).to.equal('milliliter');
    });
    it('of "1 large onion"', () => {
      expect(parse('1 large onion').unit).to.equal('large');
    });
    it('of "1 whole onion"', () => {
      expect(parse('1 whole onion').unit).to.equal('whole');
    });
    it('of "1 clove garlic"', () => {
      expect(parse('1 clove garlic').unit).to.equal('clove');
    });
    it('of "1 bag garlic"', () => {
      expect(parse('1 bag garlic').unit).to.equal('bag');
    });
    it('"1 pinch water"', () => {
      expect(parse('1 pinch salt').unit).to.equal('pinch');      
    });
  });

  it('translates unit when no unit provided', () => {
    expect(parse('1 tortilla').unit).to.equal(null);
  });

  describe('translates the abbreviated units of', () => {
    it('"1 cup water"', () => {
      expect(parse('1 c water').unit).to.equal('cup');
      expect(parse('2 c. water').unit).to.equal('cup');
      expect(parse('2 cups water').unit).to.equal('cup');
    });
    it('"1 gallon water"', () => {
      expect(parse('1 gal water').unit).to.equal('gallon');
      expect(parse('1 gallons water').unit).to.equal('gallon');
    });
    it('"1 ounce water"', () => {
      expect(parse('1 oz water').unit).to.equal('ounce');
      expect(parse('1 oz. water').unit).to.equal('ounce');
      expect(parse('2 ounces water').unit).to.equal('ounce');
    });
    it('"1 pint water"', () => {
      expect(parse('1 pt water').unit).to.equal('pint');
      expect(parse('2 pts water').unit).to.equal('pint');
      expect(parse('1 pt. water').unit).to.equal('pint');
      expect(parse('2 pints water').unit).to.equal('pint');
    });
    it('"1 pound water"', () => {
      expect(parse('1 lb water').unit).to.equal('pound');
      expect(parse('1 lb. water').unit).to.equal('pound');
      expect(parse('2 lbs water').unit).to.equal('pound');
      expect(parse('2 pounds water').unit).to.equal('pound');
    });
    it('"1 quart water"', () => {
      expect(parse('1 qt water').unit).to.equal('quart');
      expect(parse('1 qt. water').unit).to.equal('quart');
      expect(parse('1 qts water').unit).to.equal('quart');
      expect(parse('1 quarts water').unit).to.equal('quart');
    });
    it('"1 tablespoon water"', () => {
      expect(parse('1 T water').unit).to.equal('tablespoon');
      expect(parse('1 T. water').unit).to.equal('tablespoon');
      expect(parse('1 tbs water').unit).to.equal('tablespoon');
      expect(parse('1 tbsp water').unit).to.equal('tablespoon');
      expect(parse('1 tbspn water').unit).to.equal('tablespoon');
      expect(parse('2 tablespoons water').unit).to.equal('tablespoon');
    });
    it('"1 teaspoon water"', () => {
      expect(parse('1 tsp water').unit).to.equal('teaspoon');
      expect(parse('1 tspn water').unit).to.equal('teaspoon');
      expect(parse('1 t water').unit).to.equal('teaspoon');
      expect(parse('1 t. water').unit).to.equal('teaspoon');
      expect(parse('2 teaspoons water').unit).to.equal('teaspoon');
    });
    it('"1 gram water"', () => {
      expect(parse('1 g water').unit).to.equal('gram');      
      expect(parse('1 g. water').unit).to.equal('gram');      
      expect(parse('2 grams water').unit).to.equal('gram');      
    });
    it('"1 kilogram water"', () => {
      expect(parse('1 kg water').unit).to.equal('kilogram');      
      expect(parse('1 kg. water').unit).to.equal('kilogram');      
      expect(parse('2 kilograms water').unit).to.equal('kilogram');      
    });
    it('"1 liter water"', () => {
      expect(parse('1 l water').unit).to.equal('liter');      
      expect(parse('1 l. water').unit).to.equal('liter');      
      expect(parse('2 liters water').unit).to.equal('liter');      
    });
    it('"1 milligram water"', () => {
      expect(parse('1 mg water').unit).to.equal('milligram');      
      expect(parse('1 mg. water').unit).to.equal('milligram');      
      expect(parse('1 milligrams water').unit).to.equal('milligram');      
    });
    it('"1 milliliter water"', () => {
      expect(parse('1 ml water').unit).to.equal('milliliter');      
      expect(parse('1 ml. water').unit).to.equal('milliliter');      
      expect(parse('1 milliliters water').unit).to.equal('milliliter');      
    });
    it('"1 pinch water"', () => {
      expect(parse('2 pinches salt').unit).to.equal('pinch');      
    });
  });

  describe('translates the ingredient of', () => {
    it('"1 teaspoon water"', () => {
      expect(parse('1 teaspoon water').ingredient).to.equal('water');
    });
    it('"1 teaspoon milk"', () => {
      expect(parse('1 teaspoon milk').ingredient).to.equal('milk');
    });
  });
});
