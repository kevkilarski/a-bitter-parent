
// GET RANDOM INDEX FROM AN ARRAY
export const randomIndex = (array) => {
  return Math.floor(Math.random() * array.length)
}

// GET RANDOM LETTER TO SEARCH WITH IN API CALL (LEAVING OUT UNCOMMON LETTERS...THE LETTER "A" DOESN'T WORK. WE CAN SEARCH BY JUST A SINGLE LETTER BECAUSE THE API HAS AUTO COMPLETE)
export const randomLetter = () => {
  const letters = [ 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w'];

  const randomLetterIndex = randomIndex(letters);

  return letters[randomLetterIndex];
}

// MOSTLY SEARCH FOR FOODS WITH 10g LESS SUGAR BUT RANDOMLY SOMETIMES WITH 5g LESS SUGAR
export const randomSugar = (searchFoodSugar) => {
  const sugarVal = [ 10, 10, 10, 10, 10, 5, 10, 10,10, 10, 5];

  const randomSugarIndex = randomIndex(sugarVal);

  return searchFoodSugar - sugarVal[randomSugarIndex];
}

// TAKE IN USER FOOD NUTRIENT, SUGGESTED FOOD NUTRIENT AND NUTRIENT UNIT MEASUREMENT. RETURN IF EQUAL. SET MESSAGE BASED ON DIFFERENCE. RETURN ABSOLUTE VALUE OF DIFFERENCE AND COMBINE WITH MESSAGE.
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