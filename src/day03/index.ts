import run from "aocrunner";
import { isAlpha, isLowerCase } from "../utils/string-utils.js";

type Part = 1 | 2;
type Item = string;
type Compartment = Item[];
type Rucksack = Compartment[];
type UncompartmentedRucksack = Item[];
type UncompartmentedRucksackGroup = UncompartmentedRucksack[];

const parseInputForPart1 = (rawInput: string): Rucksack[] => {
  const lines = rawInput.split(/\r?\n/);
  const parsedInput = lines.map((line) => {
    const rucksacks = line.split("");
    const midIndex = Math.ceil(rucksacks.length / 2);

    const firstCompartment = rucksacks.slice(0, midIndex);
    const secondCompartment = rucksacks.slice(-midIndex);

    return [firstCompartment, secondCompartment];
  });

  return parsedInput;
};

const parseInputForPart2 = (
  rawInput: string,
): UncompartmentedRucksackGroup[] => {
  const groups = rawInput.match(/(?:.+\n?){3}/g);
  if (groups === null) return [];

  return groups.map((group) =>
    group.split(/\r?\n/).map((rucksack) => rucksack.split("")),
  );
};

const parseInput = (rawInput: string, part: Part) => {
  switch (part) {
    case 1:
      return parseInputForPart1(rawInput);
    case 2:
      return parseInputForPart2(rawInput);
  }
};

const findCommonItemsInCompartment = (rucksack: Rucksack) => {
  const [firstCompartment, secondCompartment] = rucksack;
  return firstCompartment.filter((item) => secondCompartment.includes(item));
};

const findCommonItemsInRucksacks = (rucksacks: Rucksack[]) =>
  rucksacks.flatMap((rucksack) => [
    ...new Set(findCommonItemsInCompartment(rucksack)),
  ]);

const findCommonItemInGroup = (group: UncompartmentedRucksackGroup): Item[] => {
  const [firstRubstack, secondRubstack, thirdRubstack] = group;
  return [
    ...new Set(
      firstRubstack.filter(
        (item) => secondRubstack.includes(item) && thirdRubstack.includes(item),
      ),
    ),
  ].flat();
};

const findCommonItemsInGroups = (
  groups: UncompartmentedRucksackGroup[],
): Item[] => groups.flatMap(findCommonItemInGroup);

export const calculatePriority = (item: Item) => {
  if (!isAlpha(item)) throw new Error(`${item} must be a letter`);
  if (item.length !== 1) throw new Error(`${item} is not a single item`);

  if (isLowerCase(item)) {
    return item.charCodeAt(0) - 96;
  } else {
    return item.charCodeAt(0) - 38;
  }
};

const calculateTotalPriority = (items: Item[]) =>
  items.reduce((total, item) => total + calculatePriority(item), 0);

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput, 1);

  return calculateTotalPriority(findCommonItemsInRucksacks(input));
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput, 2);

  return calculateTotalPriority(findCommonItemsInGroups(input));
};

run({
  part1: {
    tests: [
      {
        input: `
          vJrwpWtwJgWrhcsFMMfFFhFp
          jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
          PmmdzqPrVvPwwTWBwg
          wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
          ttgJtRGJQctTZtZT
          CrZsJsPPZsGzwwsLwLmpwMDw
        `,
        expected: 157,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          vJrwpWtwJgWrhcsFMMfFFhFp
          jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
          PmmdzqPrVvPwwTWBwg
          wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
          ttgJtRGJQctTZtZT
          CrZsJsPPZsGzwwsLwLmpwMDw
        `,
        expected: 70,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
