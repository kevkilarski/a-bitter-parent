export const randomIndex = (array) => {
  return Math.floor(Math.random() * array.length)
}

export const randomLetter = () => {
  const letters = [ 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w'];

  const randomLetterIndex = randomIndex(letters);

  console.log(randomLetterIndex);

  return letters[randomLetterIndex];
}