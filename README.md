# recipe-ingredient-parser
Natural language parser for recipes and lists of ingredients. Can parse a string into an object and also combine an array of these ingredient objects.

## To install
`npm install recipe-ingredient-parser` or `yarn add recipe-ingredient-parser`

## To use
`import { parse } from 'recipe-ingredient-parser';`

And then use on a string, for example:
`parse('1 teaspoon basil');`

Will return an object:
```
{
  quantity: 1,
  unit: 'teaspoon',
  ingredient: 'basil'
};
```

### Combine ingredient objects
```
combine([{
  quantity: 1,
  unit: 'teaspoon',
  ingredient: 'basil'
},
{
  quantity: 1,
  unit: 'teaspoon',
  ingredient: 'basil'
}]);
```

Will return
```
[{
  quantity: 2,
  unit: 'teaspoon',
  ingredient: 'basil'
}]
```


### Unicode Fractions
Will also correctly parse unicode fractions into the proper amount

### Development
Clone the repo and `yarn` to install packages. If `yarn test` comes back good after your code changes, give yourself a pat on the back.

## Natural Language Parsing
This project uses Natural, for more information, see https://dzone.com/articles/using-natural-nlp-module

### Publishing
Checkout https://docs.npmjs.com/getting-started/publishing-npm-packages for more info
