// https://adventofcode.com/2022/day/3
import fs from 'fs';
import { calculatePriority } from './common.js';

const parseInputFile = (input) => {
  const lines = input.split(/\r?\n/);
  const parsedInput = lines.map((line) => {
    const rucksacks = line.split('');
    const midIndex = Math.ceil(rucksacks.length / 2);

    const firstCompartment = rucksacks.slice(0, midIndex);
    const secondCompartment = rucksacks.slice(-midIndex);

    return [firstCompartment, secondCompartment];
  });

  return parsedInput;
};

const inputFile = fs.readFileSync('input.txt', 'utf8');
const parsedInput = parseInputFile(inputFile);

const findCommonItemsInCompartment = (rucksack) => {
  const [firstCompartment, secondCompartment] = rucksack;
  return firstCompartment.filter((item) => secondCompartment.includes(item));
};

const findCommonItemsInRucksacks = (rucksacks) =>
  rucksacks.flatMap((rucksack) => [
    ...new Set(findCommonItemsInCompartment(rucksack)),
  ]);

const calculateTotalPriority = (items) =>
  items.reduce((total, item) => total + calculatePriority(item), 0);

console.log(
  `Part 1 - ${calculateTotalPriority(findCommonItemsInRucksacks(parsedInput))}`
);
