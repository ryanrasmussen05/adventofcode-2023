import { getInput } from '../util/file-reader.js';

const input = await getInput('./day-4/input.txt');

// part 1
const cards = parseCards();
let points = 0;
cards.forEach(card => points += card.points);
console.log(points);

// part 2
const cardsTotals = playCopyRules();
let totalCards = 0;
cardsTotals.forEach(total => totalCards += total);
console.log(totalCards);

function parseCards() {
  const cards = [];
  input.forEach(card => {
    cards.push(parseCard(card));
  });
  return cards;
}

function parseCard(cardInput) {
  const [cardName, cardStats] = cardInput.split(':');
  const [rawWinningNumbers, rawDrawnNumbers] = cardStats.split('|');
  const winningNumbers = rawWinningNumbers.split(' ').filter(Boolean);
  const drawnNumbers = rawDrawnNumbers.split(' ').filter(Boolean);
  
  const wins = drawnNumbers.filter(number => winningNumbers.includes(number));
  const points = wins.length > 0 ? Math.pow(2, wins.length - 1) : 0;

  return { wins, winningNumbers, drawnNumbers, points };
}

function playCopyRules() {
  const cardCounts = new Array(input.length).fill(1);

  input.forEach((card, cardIndex) => {
    const { wins } = parseCard(card);
    const instancesOfThisCard = cardCounts[cardIndex];
    for (let i = 1; i <= wins.length; i++) {
      if (cardCounts[cardIndex + i]) {
        cardCounts[cardIndex + i] += instancesOfThisCard;
      }
    }
  });

  return cardCounts;
}