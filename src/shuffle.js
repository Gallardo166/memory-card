export default function shuffle(array) {
  for (let i=0; i<array.length - 1; i++) {
    const randomIndex = Math.floor(Math.random() * (array.length - i - 1)) + i + 1;
    const placeholder = {...array[i]};
    array[i] = {...array[randomIndex]};
    array[randomIndex] = placeholder;
  }

  return array;
}