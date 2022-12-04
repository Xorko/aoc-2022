// https://adventofcode.com/2022/day/1

import fs from 'fs';

const parseInputFile = (input) => {
  const inputArrayByElve = input.split(/\r?\n\r?\n/);
  const parsedInput = inputArrayByElve.map((elve) =>
    elve.split(/\r?\n/).map((item) => parseInt(item, 10))
  );

  return parsedInput;
};

const inputFile = fs.readFileSync('input.txt', 'utf8');
const parsedInputFile = parseInputFile(inputFile);

// Day 1 - Part 1
const findTotalCaloriesOfTopElve = () => {
  const caloriesTotalPerElf = parsedInputFile.map((elve) =>
    elve.reduce((total, itemCalories) => total + itemCalories, 0)
  );

  return Math.max(...caloriesTotalPerElf);
};

// Day 1 - Part 2
const findTotalCaloriesOfTopThree = () => {
  const caloriesTotalPerElf = parsedInputFile.map((elve) =>
    elve.reduce((total, itemCalories) => total + itemCalories, 0)
  );

  let output = 0;

  for (var i = 0; i < 3; i++) {
    const maxCalories = Math.max(...caloriesTotalPerElf);
    output += maxCalories;
    const indexOfMaxCalories = caloriesTotalPerElf.indexOf(maxCalories);
    caloriesTotalPerElf[indexOfMaxCalories] = 0;
  }

  return output;
};

console.log(`Part 1 - ${findTotalCaloriesOfTopElve()}`);
console.log(`Part 2 - ${findTotalCaloriesOfTopThree()}`);
