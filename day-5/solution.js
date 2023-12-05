import { getInput } from '../util/file-reader.js';

const input = await getInput('./day-5/input.txt');

// part 1
const seeds = parseSeeds();
const maps = parseMaps();
const finalLocations = seeds.map(seed => traverseMaps(seed));
console.log(Math.min(...finalLocations));

// part 2
const seedRanges = parseSeedRanges();
let currentBestLocation = Number.MAX_SAFE_INTEGER;
for (const seedRange of seedRanges) {
  console.log('in range', seedRange);
  for (let i = seedRange.start; i < seedRange.start + seedRange.length; i++) {
    const location = traverseMaps(i);
    if (location < currentBestLocation) {
      currentBestLocation = location;
    }
  }
}
console.log(currentBestLocation);

function parseSeeds() {
  const [label, rawSeedsString] = input[0].split(':');
  return rawSeedsString.split(' ').filter(Boolean).map(Number);
}

function parseSeedRanges() {
  const seeds = [];
  const seedRangeParts = parseSeeds();
  for (let i = 0; i < seedRangeParts.length; i += 2) {
    seeds.push({ start: seedRangeParts[i], length: seedRangeParts[i + 1] });
  }
  return seeds;
}

function parseMaps() {
  const allMaps = [];
  let currentMap;

  for (let i = 2; i < input.length; i++) {
    const line = input[i];
    if (line.includes('map')) {
      const [rawMapName] = line.split(' ');
      const [from, to] = rawMapName.split('-to-');
      currentMap = { from, to, ranges: [] };
      allMaps.push(currentMap);
      continue;
    }
    if (line.length === 0) {
      continue;
    }
    const [destinationStart, sourceStart, length] = line.split(' ');
    currentMap.ranges.push({ destinationStart: Number(destinationStart), sourceStart: Number(sourceStart), length: Number(length) });
  }

  return allMaps;
}

function traverseMaps(seed) {
  let currentLocation = seed;
  let currentEntity = 'seed';

  while (currentEntity) {
    const map = maps.find(map => map.from === currentEntity);
    currentEntity = map?.to;
    if (!map) break;

    for (const range of map.ranges) {
      if (range.sourceStart <= currentLocation && currentLocation < range.sourceStart + range.length) {
        const diff = range.sourceStart - range.destinationStart;
        currentLocation -= diff;
        break;
      }
    }
  }

  return currentLocation;
}