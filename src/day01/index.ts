import run from "aocrunner";

type ElfCalories = number[];

const parseInput = (rawInput: string): ElfCalories[] => {
  const caloriesPerElf = rawInput.split(/\r?\n\r?\n/);
  return caloriesPerElf.map((elve) =>
    elve.split(/\r?\n/).map((item) => parseInt(item, 10)),
  );
};

const findTotalCaloriesOfTopElve = (caloriesPerElf: ElfCalories[]) => {
  const totalCaloryTotalPerElf = caloriesPerElf.map((elve) =>
    elve.reduce((total, itemCalories) => total + itemCalories, 0),
  );

  return Math.max(...totalCaloryTotalPerElf);
};

const findTotalCaloriesOfTopThree = (caloriesPerElf: ElfCalories[]) => {
  const caloriesTotalPerElf = caloriesPerElf.map((elve) =>
    elve.reduce((total, itemCalories) => total + itemCalories, 0),
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

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return findTotalCaloriesOfTopElve(input);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return findTotalCaloriesOfTopThree(input);
};

run({
  part1: {
    tests: [
      {
        input: `
          1000
          2000
          3000
          
          4000
          
          5000
          6000
          
          7000
          8000
          9000
          
          10000
        `,
        expected: 24000,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          1000
          2000
          3000
          
          4000
          
          5000
          6000
          
          7000
          8000
          9000
          
          10000
        `,
        expected: 45000,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
