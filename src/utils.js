export const randomIndex = (array) => {
  return Math.floor(Math.random() * array.length)
}

export const randomLetter = () => {
  const letters = [ 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w'];

  const randomLetterIndex = randomIndex(letters);

  return letters[randomLetterIndex];
}

export const randomSugar = (searchFoodSugar) => {
  const sugarVal = [ 10, 10, 10, 10, 10, 5, 10, 10,10, 10, 5  ];

  const randomSugarIndex = randomIndex(sugarVal);

  return searchFoodSugar - sugarVal[randomSugarIndex];

}

export const lessMore = (ingredientOne, ingredientTwo, unit = '') => {
  if(ingredientOne - ingredientTwo === 0) return;

  let message = '';
  
  if(ingredientOne - ingredientTwo > 0){
    message = 'more';
  } else if(ingredientOne - ingredientTwo < 0) {
    message = 'less';
  } 

  const difference = ingredientOne - ingredientTwo;

  const formattedMessage = `(${Math.abs(difference.toFixed(2))}${unit} ${message})`
  
  return formattedMessage;
}