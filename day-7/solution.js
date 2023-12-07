import { getInput } from '../util/file-reader.js';

const input = await getInput('./day-7/input.txt');

const HAND_RANKINGS = ['HIGH_CARD', 'PAIR', 'TWO_PAIR', 'THREE_OF_A_KIND', 'FULL_HOUSE', 'FOUR_OF_A_KIND', 'FIVE_OF_A_KIND'];
const CARD_RANKINGS = ['2', '3', '4', '5', '6', '7', '8', '9', 'T', 'J' ,'Q', 'K', 'A'];
const CARD_RANKINGS_WITH_JOKER = ['J', '2', '3', '4', '5', '6', '7', '8', '9', 'T' ,'Q', 'K', 'A'];

// part 1
const cards = parseCards();
cards.sort(compareHands);
let winnings = 0;
cards.forEach((hand, i) => winnings += getHandWinnings(hand, i + 1));
console.log(winnings);

// part 2
const cardsPart2 = parseCards(true);
cardsPart2.sort((hand1, hand2) => compareHands(hand1, hand2, true));
winnings = 0;
cardsPart2.forEach((hand, i) => winnings += getHandWinnings(hand, i + 1));
console.log(winnings);

function parseCards(useJoker = false) {
  return input.map(line => {
    const [cards, bid] = line.split(' ');
    const cardCounts = {};
    for (const card of cards) {
      cardCounts[card] = cardCounts[card] || 0;
      cardCounts[card]++;
    }
    const hand = { cards, bid: parseInt(bid), cardCounts };
    if (isXOfAKind(hand, 5, useJoker)) hand.type = 'FIVE_OF_A_KIND';
    else if (isXOfAKind(hand, 4, useJoker)) hand.type = 'FOUR_OF_A_KIND';
    else if (isFullHouse(hand, useJoker)) hand.type = 'FULL_HOUSE';
    else if (isXOfAKind(hand, 3, useJoker)) hand.type = 'THREE_OF_A_KIND';
    else if (isTwoPair(hand, useJoker)) hand.type = 'TWO_PAIR';
    else if (isXOfAKind(hand, 2, useJoker)) hand.type = 'PAIR';
    else hand.type = 'HIGH_CARD';
    return hand;
  });
}

function compareHands(hand1, hand2, useJoker = false) {
  const CARD_RANK_CONST = useJoker ? CARD_RANKINGS_WITH_JOKER : CARD_RANKINGS;
  const hand1Rank = HAND_RANKINGS.indexOf(hand1.type);
  const hand2Rank = HAND_RANKINGS.indexOf(hand2.type);
  if (hand1Rank !== hand2Rank) return hand1Rank - hand2Rank;

  for (let i = 0; i < 5; i++) {
    const card1Rank = CARD_RANK_CONST.indexOf(hand1.cards[i]);
    const card2Rank = CARD_RANK_CONST.indexOf(hand2.cards[i]);
    if (card1Rank !== card2Rank) return card1Rank - card2Rank;
  }

  return 0;
}

function isXOfAKind(hand, x, useJoker = false) {
  const cardCounts = Object.values(hand.cardCounts);

  const cardCountExcludingJokers = { ...hand.cardCounts };
  delete cardCountExcludingJokers['J'];

  if (cardCounts.includes(x)) return true;
  
  if (useJoker && hand.cardCounts['J'] > 0) {
    const jokerCount = hand.cardCounts['J'] || 0;
    return Object.values(cardCountExcludingJokers).includes(x - jokerCount);
  }

  return false;
}

function isFullHouse(hand, useJoker = false) {
  if (!useJoker) return isXOfAKind(hand, 3) && isXOfAKind(hand, 2);

  const jokerCount = hand.cardCounts['J'] || 0;
  if (jokerCount === 0) return isXOfAKind(hand, 3) && isXOfAKind(hand, 2);
  if (jokerCount === 1) return isTwoPair(hand);
  if (jokerCount === 2) return isTwoPair(hand) || isXOfAKind(hand, 3);
  if (jokerCount >= 3) return true;
}

function isTwoPair(hand, useJoker = false) {
  if (!useJoker) return Object.values(hand.cardCounts).filter(count => count === 2).length === 2;

  const jokerCount = hand.cardCounts['J'] || 0;
  if (jokerCount === 0) return Object.values(hand.cardCounts).filter(count => count === 2).length === 2;
  if (jokerCount === 1) return isXOfAKind(hand, 2);
  if (jokerCount >= 2) return true;
}

function getHandWinnings(hand, rank) {
  return hand.bid * rank;
}
