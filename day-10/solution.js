import { getInput } from '../util/file-reader.js';

const input = await getInput('./day-10/input.txt');

// part 1
const start = findStart();
const visitedPipes = [start];
while (visitNextPipe(visitedPipes)) {
  continue;
}
console.log(visitedPipes.length / 2);

// part 2


function findStart() {
  const sLine = input.find(line => line.includes('S'));
  const sRow = sLine.indexOf('S');
  const row = input.indexOf(sLine);
  const column = sRow;

  const topNode = input[row - 1]?.[column] || '.';
  const bottomNode = input[row + 1]?.[column] || '.';
  const leftNode = input[row][column - 1] || '.';
  const rightNode = input[row][column + 1] || '.';

  const doesTopConnect = topNode === '|' || topNode === '7' || topNode === 'F';
  const doesBottomConnect = bottomNode === '|' || bottomNode === 'J' || bottomNode === 'L';
  const doesLeftConnect = leftNode === '-' || leftNode === 'L' || leftNode === 'F';
  const doesRightConnect = rightNode === '-' || rightNode === 'J' || rightNode === '7';

  let startCharacter = '';
  if (doesTopConnect && doesBottomConnect) startCharacter = '|';
  if (doesLeftConnect && doesRightConnect) startCharacter = '-';
  if (doesTopConnect && doesRightConnect) startCharacter = 'L';
  if (doesTopConnect && doesLeftConnect) startCharacter = 'J';
  if (doesBottomConnect && doesLeftConnect) startCharacter = '7';
  if (doesBottomConnect && doesRightConnect) startCharacter = 'F';

  return { row, column, character: startCharacter };
}

function visitNextPipe(visitedPipes) {
  const currentPipe = visitedPipes[visitedPipes.length - 1];
  let pipesToVisit = [];
  if (currentPipe.character === '|') {
    pipesToVisit.push({ row: currentPipe.row - 1, column: currentPipe.column });
    pipesToVisit.push({ row: currentPipe.row + 1, column: currentPipe.column });
  }
  if (currentPipe.character === '-') {
    pipesToVisit.push({ row: currentPipe.row, column: currentPipe.column - 1 });
    pipesToVisit.push({ row: currentPipe.row, column: currentPipe.column + 1 });
  }
  if (currentPipe.character === 'L') {
    pipesToVisit.push({ row: currentPipe.row - 1, column: currentPipe.column });
    pipesToVisit.push({ row: currentPipe.row, column: currentPipe.column + 1 });
  }
  if (currentPipe.character === 'J') {
    pipesToVisit.push({ row: currentPipe.row - 1, column: currentPipe.column });
    pipesToVisit.push({ row: currentPipe.row, column: currentPipe.column - 1 });
  }
  if (currentPipe.character === '7') {
    pipesToVisit.push({ row: currentPipe.row + 1, column: currentPipe.column });
    pipesToVisit.push({ row: currentPipe.row, column: currentPipe.column - 1 });
  }
  if (currentPipe.character === 'F') {
    pipesToVisit.push({ row: currentPipe.row + 1, column: currentPipe.column });
    pipesToVisit.push({ row: currentPipe.row, column: currentPipe.column + 1 });
  }

  const firstPipeToTry = pipesToVisit[0];
  const isFirstPipeVisited = visitedPipes.some(pipe => pipe.row === firstPipeToTry.row && pipe.column === firstPipeToTry.column);
  const secondPipeToTry = pipesToVisit[1];
  const isSecondPipeVisited = visitedPipes.some(pipe => pipe.row === secondPipeToTry.row && pipe.column === secondPipeToTry.column);

  if (!isFirstPipeVisited) {
    visitedPipes.push({ row: firstPipeToTry.row, column: firstPipeToTry.column, character: input[firstPipeToTry.row][firstPipeToTry.column] });
    return true;
  } else if (!isSecondPipeVisited) {
    visitedPipes.push({ row: secondPipeToTry.row, column: secondPipeToTry.column, character: input[secondPipeToTry.row][secondPipeToTry.column] });
    return true;
  } else {
    return false;
  }
}