import run from "aocrunner";

const parseInput = (rawInput: string) =>
  rawInput.split(/\r?\n/).map((row) => row.split("").map(Number));

const isVisibleFromTop = (x: number, y: number, input: number[][]) => {
  const treeHeight = input[y][x];

  // If it is the top most row, return true
  if (y === 0) {
    return true;
  }

  for (let i = 0; i < y; i++) {
    if (input[i][x] >= treeHeight) {
      return false;
    }
  }

  return true;
};

const isVisibleFromBottom = (x: number, y: number, input: number[][]) => {
  const treeHeight = input[y][x];

  // If it is the bottom most row, return true
  if (y === input.length - 1) {
    return true;
  }

  for (let i = y + 1; i < input.length; i++) {
    if (input[i][x] >= treeHeight) {
      return false;
    }
  }

  return true;
};

const isVisibleFromLeft = (x: number, y: number, input: number[][]) => {
  const treeHeight = input[y][x];

  // If it is the left most column, return true
  if (x === 0) {
    return true;
  }

  for (let i = 0; i < x; i++) {
    if (input[y][i] >= treeHeight) {
      return false;
    }
  }

  return true;
};

const isVisibleFromRight = (x: number, y: number, input: number[][]) => {
  const treeHeight = input[y][x];

  // If it is the right most column, return true
  if (x === input[y].length - 1) {
    return true;
  }

  for (let i = x + 1; i < input[y].length; i++) {
    if (input[y][i] >= treeHeight) {
      return false;
    }
  }

  return true;
};

const isVisible = (x: number, y: number, input: number[][]) =>
  isVisibleFromBottom(x, y, input) ||
  isVisibleFromLeft(x, y, input) ||
  isVisibleFromRight(x, y, input) ||
  isVisibleFromTop(x, y, input);

const calculateNumberOfVisibleTrees = (input: number[][]) => {
  let numberOfVisibleTrees = 0;
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      if (isVisible(x, y, input)) {
        numberOfVisibleTrees++;
      }
    }
  }

  return numberOfVisibleTrees;
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return calculateNumberOfVisibleTrees(input);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return;
};

run({
  part1: {
    tests: [
      {
        input: `
        30373
        25512
        65332
        33549
        35390`,
        expected: 21,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: "",
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
