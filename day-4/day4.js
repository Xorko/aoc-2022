// https://adventofcode.com/2022/day/4
import fs from 'fs';

const parseElfRange = (elfRange) => {
  const range = elfRange.split('-').map((num) => parseInt(num, 10));
  return Array.from(
    { length: range[1] - range[0] + 1 },
    (_, index) => index + range[0]
  );
};

const parseInputFile = (input) => {
  const pairs = input.split(/\r?\n/);
  const splitPairs = pairs.map((pair) => pair.split(','));
  const splitPairsWithRange = splitPairs.map((pair) => {
    const [firstElf, secondElf] = pair;
    return [parseElfRange(firstElf), parseElfRange(secondElf)];
  });

  return splitPairsWithRange;
};

const inputFile = fs.readFileSync('input.txt', 'utf8');
const input = parseInputFile(inputFile);

const containsAll = (arr1, arr2) => arr2.every((item) => arr1.includes(item));

const numberOfPairsWithFullyOverlappingRanges = input.reduce(
  (acc, [firstElf, secondElf]) => {
    if (containsAll(firstElf, secondElf) || containsAll(secondElf, firstElf)) {
      return acc + 1;
    }
    return acc;
  },
  0
);

const numberOfPairsWithOverlappingRanges = input.reduce(
  (acc, [firstElf, secondElf]) => {
    const overlappingRange = firstElf.filter((num) => secondElf.includes(num));
    if (overlappingRange.length > 0) {
      return acc + 1;
    }
    return acc;
  },
  0
);

console.log(`Part 1 - ${numberOfPairsWithFullyOverlappingRanges}`);
console.log(`Part 2 - ${numberOfPairsWithOverlappingRanges}`);
