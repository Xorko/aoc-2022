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

const calculateScenicScoreOfTop = (x: number, y: number, input: number[][]) => {
  const treeHeight = input[y][x];
  let scenicScore = 0;

  if (y === 0) {
    return scenicScore;
  }

  for (let i = y - 1; i >= 0; i--) {
    if (input[i][x] >= treeHeight) {
      return scenicScore + 1;
    } else {
      scenicScore++;
    }
  }

  return scenicScore;
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

const calculateScenicScoreOfBottom = (
  x: number,
  y: number,
  input: number[][],
) => {
  const treeHeight = input[y][x];
  let scenicScore = 0;

  if (y === input.length - 1) {
    return scenicScore;
  }

  for (let i = y + 1; i < input.length; i++) {
    if (input[i][x] >= treeHeight) {
      return scenicScore + 1;
    } else {
      scenicScore++;
    }
  }

  return scenicScore;
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

const calculateScenicScoreOfLeft = (
  x: number,
  y: number,
  input: number[][],
) => {
  const treeHeight = input[y][x];
  let scenicScore = 0;

  if (x === 0) {
    return scenicScore;
  }

  for (let i = x - 1; i >= 0; i--) {
    if (input[y][i] >= treeHeight) {
      return scenicScore + 1;
    } else {
      scenicScore++;
    }
  }

  return scenicScore;
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

const calculateScenicScoreOfRight = (
  x: number,
  y: number,
  input: number[][],
) => {
  const treeHeight = input[y][x];
  let scenicScore = 0;

  if (x === input[y].length - 1) {
    return scenicScore;
  }

  for (let i = x + 1; i < input[y].length; i++) {
    if (input[y][i] >= treeHeight) {
      return scenicScore + 1;
    } else {
      scenicScore++;
    }
  }

  return scenicScore;
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

const calculateScenicScore = (x: number, y: number, input: number[][]) =>
  calculateScenicScoreOfBottom(x, y, input) *
  calculateScenicScoreOfLeft(x, y, input) *
  calculateScenicScoreOfRight(x, y, input) *
  calculateScenicScoreOfTop(x, y, input);

const calculateScenicScoreOfAllTrees = (input: number[][]) => {
  let scenicScores: number[] = [];
  for (let y = 0; y < input.length; y++) {
    for (let x = 0; x < input[y].length; x++) {
      scenicScores.push(calculateScenicScore(x, y, input));
    }
  }

  return scenicScores;
};

const findHighestScenicScore = (input: number[][]) =>
  Math.max(...calculateScenicScoreOfAllTrees(input));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return calculateNumberOfVisibleTrees(input);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return findHighestScenicScore(input);
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
          35390
          `,
        expected: 21,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        30373
        25512
        65332
        33549
        35390
        `,
        expected: 8,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
