import { getInput } from '../util/file-reader.js';

const input = await getInput('./day-3/input.txt');

// part 1
const potentialPartNumbers = [];
input.forEach((line, i) => parseLine(line, i, potentialPartNumbers));
const partNumbers = potentialPartNumbers.filter(isPartNumber);
let solution = 0;
partNumbers.forEach(partNumber => solution += parseInt(partNumber.string));
console.log(solution);

// part 2
const gearLocations = getGearLocations();
gearLocations.forEach(gear => getAdjacentParts(gear));
solution = 0;
gearLocations.forEach(gear => {
  if (gear.gearRatio) solution += gear.gearRatio;
});
console.log(solution);

function parseLine(line, lineIndex, trackedResults) {
  let i = 0;
  let inNumber = false;
  let numberStartIndex = 0;
  let currentNumberString = '';

  while (true) {
    if (!isNaN(line[i])) {
      if (!inNumber) {
        inNumber = true;
        numberStartIndex = i;
      }
      currentNumberString += line[i];
    }
    else if (inNumber) {
      trackedResults.push({ string: currentNumberString, lineIndex, startIndex: numberStartIndex });
      inNumber = false;
      currentNumberString = '';
    }
    if (i === line.length - 1) {
      if (inNumber) {
        trackedResults.push({ string: currentNumberString, lineIndex, startIndex: numberStartIndex });
      }
      break;
    }
    i++;
  }
}

function isPartNumber(potentialPartNumber) {
  const { string, lineIndex, startIndex } = potentialPartNumber;
  let isPartNumber = false;

  const start = startIndex - 1;
  const end = start + string.length + 1;

  // check previous line
  if (lineIndex > 0) {
    const previousLine = input[lineIndex - 1];

    for (let i = start; i <= end; i++) {
      if (previousLine[i] !== undefined && previousLine[i] !== '.' && isNaN(previousLine[i])) isPartNumber = true;
    }
  }

  // check next line
  if (lineIndex < input.length - 1) {
    const nextLine = input[lineIndex + 1];

    for (let i = start; i <= end; i++) {
      if (nextLine[i] !== undefined && nextLine[i] !== '.' && isNaN(nextLine[i])) isPartNumber = true;
    }
  }

  // check same line
  const sameLine = input[lineIndex];
  if (sameLine[start] !== undefined && sameLine[start] !== '.' && isNaN(sameLine[start])) isPartNumber = true;
  if (sameLine[end] !== undefined && sameLine[end] !== '.' && isNaN(sameLine[end])) isPartNumber = true;

  return isPartNumber;
}

function getGearLocations() {
  const gearLocations = [];

  input.forEach((line, lineIndex) => {
    line.split('').forEach((char, charIndex) => {
      if (char === '*') {
        gearLocations.push({ colIndex: charIndex, rowIndex: lineIndex });
      }
    });
  });

  return gearLocations;
}

function getAdjacentParts(gear) {
  const { colIndex: gearColIndex, rowIndex: gearRowIndex } = gear;

  let adjacentParts = partNumbers.filter(partNumber => {
    const { string, lineIndex: partRowIndex, startIndex: partStartIndex } = partNumber;

    if (partRowIndex <= gearRowIndex + 1 && partRowIndex >= gearRowIndex - 1) {
      if (gearColIndex >= partStartIndex - 1 && gearColIndex <= partStartIndex + string.length) return true;
    }
    return false;
  });

  gear.adjacentParts = adjacentParts;

  if (gear.adjacentParts.length === 2) {
    gear.gearRatio = parseInt(gear.adjacentParts[0].string) * parseInt(gear.adjacentParts[1].string);
  }
}