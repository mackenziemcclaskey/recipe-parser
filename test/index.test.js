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
    it('of "1 teaspoon water"', () => {
      expect(parse('1 teaspoon water').unit).to.equal('teaspoon');
    });
    it('of "1 tablespoon water"', () => {
      expect(parse('1 tablespoon water').unit).to.equal('tablespoon');
    });
    it('of "1 cup water"', () => {
      expect(parse('1 cup water').unit).to.equal('cup');
    });
    it('of "1 gallon water"', () => {
      expect(parse('1 gallon water').unit).to.equal('gallon');
    });
    it('of "1 pound water"', () => {
      expect(parse('1 pound water').unit).to.equal('pound');
    });
    // it('of "1 ounce water"', () => {
    //   expect(parse('1 ounce water').unit).to.equal('ounce');
    // });
    // it('of "1 pint water"', () => {
    //   expect(parse('1 pint water').unit).to.equal('pint');
    // });
    // it('of "1 quart water"', () => {
    //   expect(parse('1 quart water').unit).to.equal('quart');
    // });
    // it('of "1 whole onion"', () => {
    //   expect(parse('1 whole onion').unit).to.equal('whole');
    // });
    // it('of "1 large onion"', () => {
    //   expect(parse('1 large onion').unit).to.equal('large');
    // });
    // it('of "1 clove garlic"', () => {
    //   expect(parse('1 clove garlic').unit).to.equal('clove');
    // });
    // it('of "1 bag garlic"', () => {
    //   expect(parse('1 bag garlic').unit).to.equal('bag');
    // });
  });

  // it('translates unit when no unit provided', () => {
  //   expect(parse('1 tortilla').unit).to.equal(null);
  // });

  describe('translates the abbreviated units', () => {
    it('of "1 teaspoon water"', () => {
      expect(parse('1 tsp water').unit).to.equal('teaspoon');
      expect(parse('1 tspn water').unit).to.equal('teaspoon');
      expect(parse('1 t water').unit).to.equal('teaspoon');
    });
    it('of "1 tablespoon water"', () => {
      expect(parse('1 T water').unit).to.equal('tablespoon');
      expect(parse('1 tbs water').unit).to.equal('tablespoon');
      expect(parse('1 tbsp water').unit).to.equal('tablespoon');
      expect(parse('1 tbspn water').unit).to.equal('tablespoon');
    });
    it('of "1 cup water"', () => {
      expect(parse('1 c water').unit).to.equal('cup');
    });
    it('of "1 gallon water"', () => {
      expect(parse('1 gal water').unit).to.equal('gallon');
    });
    it('of "1 pound water"', () => {
      expect(parse('1 lb water').unit).to.equal('pound');
    });
    it('of "1 ounce water"', () => {
      expect(parse('1 oz water').unit).to.equal('ounce');
    });
    it('of "1 pint water"', () => {
      expect(parse('1 pt water').unit).to.equal('pint');
    });
    it('of "1 quart water"', () => {
      expect(parse('1 qt water').unit).to.equal('quart');
    });
  });

  // describe('translates the ingredient of', () => {
  //   it('"1 teaspoon water"', () => {
  //     expect(parse('1 teaspoon water').ingredient).to.equal('water');
  //   });
  //   it('"1 teaspoon milk"', () => {
  //     expect(parse('1 teaspoon milk').ingredient).to.equal('milk');
  //   });
  // });

  // it('can handle units like cloves', () => {
  //   expect(parse('1 clove garlic').unit).to.equal('clove');
  // });
});
