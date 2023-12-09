import { getInput } from '../util/file-reader.js';

const input = await getInput('./day-9/input.txt');

// part 1
let total = 0;
input.forEach(line => {
  total += findNextValue(line);
});
console.log(total);

// part 2
total = 0;
input.forEach(line => {
  total += findPreviousValue(line);
});
console.log(total);

function findNextValue(line) {
  const numbers = line.split(' ').map(Number);
  const numberHistory = [numbers];
  let currentNumbers = numbers;

  while (currentNumbers.some(n => n !== 0)) {
    const newNumbers = [];
    for (let i = 1; i < currentNumbers.length; i++) {
      newNumbers.push(currentNumbers[i] - currentNumbers[i - 1]);
    }
    numberHistory.push(newNumbers);
    currentNumbers = newNumbers;
  }

  for (let i = numberHistory.length - 1; i >= 0; i--) {
    const numbers = numberHistory[i];

    if (numbers.every(n => n === 0)) {
      numbers.push(0);
      continue;
    } else {
      numbers.push(numbers[numbers.length - 1] + numberHistory[i + 1][numbers.length - 1]);
    }
  }

  return numberHistory[0][numberHistory[0].length - 1];
}

function findPreviousValue(line) {
  const numbers = line.split(' ').map(Number);
  const numberHistory = [numbers];
  let currentNumbers = numbers;

  while (currentNumbers.some(n => n !== 0)) {
    const newNumbers = [];
    for (let i = 1; i < currentNumbers.length; i++) {
      newNumbers.push(currentNumbers[i] - currentNumbers[i - 1]);
    }
    numberHistory.push(newNumbers);
    currentNumbers = newNumbers;
  }

  for (let i = numberHistory.length - 1; i >= 0; i--) {
    const numbers = numberHistory[i];

    if (numbers.every(n => n === 0)) {
      numbers.push(0);
      continue;
    } else {
      numbers.unshift(numbers[0] - numberHistory[i + 1][0])
    }
  }

  return numberHistory[0][0];
}