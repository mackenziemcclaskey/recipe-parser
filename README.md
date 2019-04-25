# recipe-ingredient-parser-v2
Natural language parser for recipes and lists of ingredients. Can parse a string into an object and also combine an array of these ingredient objects.

## About
This project was built on top of code written by [mackenziefernandez](https://github.com/mackenziefernandez/recipe-parser). 

What's different from the original? 
- this project contains some extra units (including units like `large`, `pinch`, etc.).
- This project will *eventually* handle combining multiple ingredients with different units (for example, combining `45 mL milk` and `6 cups milk`)

## To install
`npm install recipe-ingredient-parser-v2` or `yarn add recipe-ingredient-parser-v2`

## To use
`import { parse } from 'recipe-ingredient-parser-v2';`

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
