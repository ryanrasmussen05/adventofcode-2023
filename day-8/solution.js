import { getInput } from '../util/file-reader.js';

const input = await getInput('./day-8/input.txt');

let instructions, map;
parseInput();

// part 1
console.log(navigateToZZZ());

// part 2
console.log(navigateGhost());

function parseInput() {
  instructions = input[0].split('');
  map = {};

  for (let i = 2; i < input.length; i++) {
    const [key, rawDestinations] = input[i].split(' = ');
    const leftDestination = rawDestinations.split(', ')[0].replace('(', '');
    const rightDestination = rawDestinations.split(', ')[1].replace(')', '');
    map[key] = { left: leftDestination, right: rightDestination };
  }
}

function navigateToZZZ() {
  let currentStep = 0;
  let currentLocation = 'AAA';

  while(currentLocation !== 'ZZZ') {
    currentStep++;
    const instruction = instructions[(currentStep - 1) % instructions.length];

    if (instruction === 'L') {
      currentLocation = map[currentLocation].left;
    } else {
      currentLocation = map[currentLocation].right;
    }
  }

  return currentStep;
}

function navigateGhost() {
  let currentLocations = Object.keys(map).filter(key => key[2] === 'A');
  const stepMultipliers = currentLocations.map(location => getStepOfFirstZ(location));
  return LCM(stepMultipliers);
}

function getStepOfFirstZ(location) {
  let currentStep = 0;
  while(true) {
    currentStep++;
    const instruction = instructions[(currentStep - 1) % instructions.length];
    if (instruction === 'L') {
      location = map[location].left;
    } else {
      location = map[location].right;
    }

    if (location[2] === 'Z') {
      return currentStep;
    }
  }
}

function LCM(numbers) {
  const multiples = [...numbers];

  while(!multiples.every(multiple => multiple === multiples[0])) {
    let currentLow = Math.min(...multiples);
    let currentLowIndex = multiples.indexOf(currentLow);
    multiples[currentLowIndex] += numbers[currentLowIndex];
  }

  return multiples[0];
}