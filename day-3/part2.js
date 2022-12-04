// https://adventofcode.com/2022/day/3
import fs from 'fs';
import { calculatePriority } from './common.js';

const parseInputFile = (input) =>
  input
    .match(/(?:.+\n?){3}/g)
    .map((group) => group.split(/\r?\n/).map((rubstack) => rubstack.split('')));

const inputFile = fs.readFileSync('input.txt', 'utf8');
const parsedInput = parseInputFile(inputFile);

const findCommonItemInGroup = (group) => {
  const [firstRubstack, secondRubstack, thirdRubstack] = group;
  return [
    ...new Set(
      firstRubstack.filter(
        (item) => secondRubstack.includes(item) && thirdRubstack.includes(item)
      )
    ),
  ];
};

const findCommonItemsInGroups = (groups) =>
  groups.flatMap(findCommonItemInGroup);

const calculateTotalPriority = (badges) =>
  badges.reduce((total, badge) => total + calculatePriority(badge), 0);

console.log(
  `Part 2 - ${calculateTotalPriority(findCommonItemsInGroups(parsedInput))}`
);
