import run from "aocrunner";
import { containsAll } from "../utils/array-utils.js";

const parseElfRange = (elfRange: string) => {
  const range = elfRange.split("-").map((num) => parseInt(num, 10));
  return Array.from(
    { length: range[1] - range[0] + 1 },
    (_, index) => index + range[0],
  );
};

const parseInput = (rawInput: string) => {
  const pairs = rawInput.split(/\r?\n/);
  const splitPairs = pairs.map((pair) => pair.split(","));
  return splitPairs.map((pair) => {
    const [firstElf, secondElf] = pair;
    return [parseElfRange(firstElf), parseElfRange(secondElf)];
  });
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.reduce((acc, [firstElf, secondElf]) => {
    if (containsAll(firstElf, secondElf) || containsAll(secondElf, firstElf)) {
      return acc + 1;
    }
    return acc;
  }, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input.reduce((acc, [firstElf, secondElf]) => {
    const overlappingRange = firstElf.filter((num) => secondElf.includes(num));
    if (overlappingRange.length > 0) {
      return acc + 1;
    }
    return acc;
  }, 0);
};

run({
  part1: {
    tests: [
      {
        input: `
          2-4,6-8
          2-3,4-5
          5-7,7-9
          2-8,3-7
          6-6,4-6
          2-6,4-8
        `,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          2-4,6-8
          2-3,4-5
          5-7,7-9
          2-8,3-7
          6-6,4-6
          2-6,4-8
        `,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
