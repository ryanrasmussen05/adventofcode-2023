import { getInput } from '../util/file-reader.js';

const input = await getInput('./day-2/input.txt');

// part 1
let sumPossibleGames = 0;
for (let i = 1; i <= input.length; i++) {
  const game = parseGame(input[i - 1]);
  if (game.red <= 12 && game.green <= 13 && game.blue <= 14) {
    sumPossibleGames += i;
  }
}
console.log(sumPossibleGames);

// part 2
let sumGamePowers = 0;
for (let i = 1; i <= input.length; i++) {
  const game = parseGame(input[i - 1]);
  sumGamePowers += getGamePower(game);
}
console.log(sumGamePowers);

function parseGame(gameInput) {
  const game = {};
  const [part1, part2] = gameInput.split(':');
  const sets = part2.split(';');
  sets.forEach(set => {
    parseSet(set, game);
  });
  return game;
}

function parseSet(setInput, game) {
  const parts = setInput.split(',');
  parts.forEach(part => {
    const trimmedPart = part.trim();
    const [amount, color] = trimmedPart.split(' ');
    if (game[color] && game[color] < parseInt(amount)) {
      game[color] = parseInt(amount);
    } else if (!game[color]) {
      game[color] = parseInt(amount);
    }
  });
}

function getGamePower(game) {
  return game.red * game.green * game.blue;
}