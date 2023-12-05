import { getInput } from '../util/file-reader.js';

const input = await getInput('./day-1/input.txt');

const STRING_NUMBERS = [
  { string: 'zero', value: 0 },
  { string: 'one', value: 1 },
  { string: 'two', value: 2 },
  { string: 'three', value: 3 },
  { string: 'four', value: 4 },
  { string: 'five', value: 5 },
  { string: 'six', value: 6 },
  { string: 'seven', value: 7 },
  { string: 'eight', value: 8 },
  { string: 'nine', value: 9 },
]

// Part 1
let sum = 0;
input.forEach(line => {
  const firstNumber = findNumber(line);
  const lastNumber = findNumber(line, true);
  const stringValue = `${firstNumber}${lastNumber}`;
  sum += parseInt(stringValue);
});
console.log(sum);

function findNumber(string, last = false) {
  const characters = string.split('');
  if (last) characters.reverse();
  return characters.find(character => {
    return !isNaN(character)
  })
}

// Part 2
sum = 0;
input.forEach(line => {
  const firstNumber = findFirstNumber(line);
  const lastNumber = findLastNumber(line);
  const stringValue = `${firstNumber}${lastNumber}`;
  sum += parseInt(stringValue);
});
console.log(sum);

function findFirstNumber(string) {
  for (let i = 0; i < string.length; i++) {
    const character = string[i];
    if (!isNaN(character)) return character;
    const stringNumber = isStringNumber(string, i);
    if (stringNumber !== 100) return stringNumber;
  }
}

function findLastNumber(string) {
  for (let i = string.length - 1; i >= 0; i--) {
    const character = string[i];
    if (!isNaN(character)) return character;
    const stringNumber = isStringNumber(string, i);
    if (stringNumber !== 100) return stringNumber;
  }
}

function isStringNumber(string, startIndex) {
  let result = 100;
  STRING_NUMBERS.forEach(stringNumber => {
    const stringToCheck = string.substring(startIndex, startIndex + stringNumber.string.length);
    if (stringToCheck === stringNumber.string) result = stringNumber.value;
  });
  return result;
}