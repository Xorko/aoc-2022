import run from "aocrunner";

const parseInput = (rawInput: string) => rawInput;

const areAllDifferents = (str: string) => {
  const set = new Set(str.split(""));
  return set.size === str.length;
};

const findFirstDifferents = (str: string, length: number) => {
  for (let i = length; i < str.length; i++) {
    if (areAllDifferents(str.slice(i - length, i))) {
      return i;
    }
  }
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return findFirstDifferents(input, 4);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return findFirstDifferents(input, 14);
};

run({
  part1: {
    tests: [
      {
        input: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`,
        expected: 7,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `mjqjpqmgbljsphdztnvjfqwrcgsmlb`,
        expected: 19,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
