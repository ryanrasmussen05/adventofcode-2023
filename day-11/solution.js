import { getInput } from '../util/file-reader.js';

const input = await getInput('./day-11/input.txt');

// part 1
let starMap = [...input];
expandRowsWithoutGalaxies();
expandColumnsWithoutGalaxies();
const galaxies = getGalaxyObjects();
console.log(sumDistanceBetweenGalaxies());


function expandRowsWithoutGalaxies() {
  let updatedStarMap = [];

  starMap.forEach((row, rowIndex) => {
    updatedStarMap.push(row);
    if (!row.includes('#')) {
      updatedStarMap.push(row);
    }
  });

  starMap = updatedStarMap;
}

function expandColumnsWithoutGalaxies() {
  let columnsWithoutGalaxies = [];
  let updatedStarMap = [...starMap];

  for (let i = 0; i < starMap[0].length; i++) {
    if (starMap.every(row => row[i] !== '#')) {
      columnsWithoutGalaxies.push(i);
    }
  }

  columnsWithoutGalaxies.forEach((column, index) => {
    const tempStarMap = [];
    updatedStarMap.forEach(row => {
      tempStarMap.push(row.slice(0, column + 1 + index) + '.' + row.slice(column + 1 + index));
    });
    updatedStarMap = tempStarMap;
  });

  starMap = updatedStarMap;
}

function getGalaxyObjects() {
  let currGalaxy = 1;
  const galaxyObjects = [];

  starMap.forEach((row, rowIndex) => {
    row.split('').forEach((character, columnIndex) => {
      if (character === '#') {
        galaxyObjects.push({ column: columnIndex, row: rowIndex, number: currGalaxy });
        currGalaxy++;
      }
    });
  });

  return galaxyObjects;
}

function getDistanceBetweenGalaxies(galaxy1, galaxy2) {
  return Math.abs(galaxy1.column - galaxy2.column) + Math.abs(galaxy1.row - galaxy2.row);
}

function sumDistanceBetweenGalaxies() {
  let sum = 0;
  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      sum += getDistanceBetweenGalaxies(galaxies[i], galaxies[j]);
    }
  }
  return sum;
}
