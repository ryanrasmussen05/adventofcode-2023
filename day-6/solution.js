import { getInput } from '../util/file-reader.js';

const input = await getInput('./day-6/input.txt');

// part 1
const races = parseRaces();
const winningStrategies = [];
races.forEach(race => winningStrategies.push(getWinningStrategies(race)));
let solution = 1;
winningStrategies.forEach(winners => solution *= winners.length);
console.log(solution);

// part 2
const singleRace = parseSingleRace();
console.log(getWinningStrategies(singleRace).length);

function parseRaces() {
  const times  = input[0].split(':')[1].split(' ').filter(Boolean).map(Number);
  const distances = input[1].split(':')[1].split(' ').filter(Boolean).map(Number);

  return times.map((time, index) => {
    return { time, distance: distances[index] };
  });
}

// definitely could optimize this, but meh it works
function getWinningStrategies(race) {
  const winners = [];
  for (let i = 1; i < race.time; i++) {
    const chargeTime = i;
    const totalDistance = (race.time - i) * chargeTime;
    if (totalDistance > race.distance) {
      winners.push({ chargeTime, totalDistance });
    }
  }
  return winners;
}

function parseSingleRace() {
  const time  = Number(input[0].split(':')[1].split(' ').filter(Boolean).join(''));
  const distance = Number(input[1].split(':')[1].split(' ').filter(Boolean).join(''));
  return { time, distance };
}