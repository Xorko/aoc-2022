import run from "aocrunner";
import { add, multiply } from "../utils/reducer-utils.js";

type PairWithIndex = [any[], number];

const compare = (a: any, b: any): number => {
  if ([a, b].every(Number.isInteger)) {
    return a - b;
  }

  // Make sure a and b are arrays
  a = [a].flat();
  b = [b].flat();

  for (let i = 0; i < Math.min(a.length, b.length); i++) {
    const result = compare(a[i], b[i]);
    if (result !== 0) {
      return result;
    }
  }

  return a.length - b.length;
};

const parseInput = (rawInput: string) =>
  rawInput
    .split(/(\r?\n){2}/)
    .filter((line) => line !== "\n")
    .map((line) => line.split(/\r?\n/).map((signal) => JSON.parse(signal)));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return input
    .map((pair, i) => [pair, i + 1] as PairWithIndex)
    .filter(([pair]) => compare(pair[0], pair[1]) < 0)
    .map(([, i]) => i)
    .reduce(add, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const dividerPackets = [[[2]], [[6]]];

  const orderedPairs = [...input, ...dividerPackets]
    .map((pair, i) => [pair, i + 1] as PairWithIndex)
    .filter(([pair]) => compare(pair[0], pair[1]) < 0);

  return dividerPackets
    .map((divider) => {
      const dividerIndex = orderedPairs.findIndex(
        ([pair]) => compare(pair, divider) === 0,
      );

      if (dividerIndex === -1) {
        throw new Error("Divider not found");
      }

      return dividerIndex + 1;
    })
    .reduce(multiply, 1);
};

run({
  part1: {
    tests: [
      {
        input: `
[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]
        `,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
[1,1,3,1,1]
[1,1,5,1,1]

[[1],[2,3,4]]
[[1],4]

[9]
[[8,7,6]]

[[4,4],4,4]
[[4,4],4,4,4]

[7,7,7,7]
[7,7,7]

[]
[3]

[[[]]]
[[]]

[1,[2,[3,[4,[5,6,7]]]],8,9]
[1,[2,[3,[4,[5,6,0]]]],8,9]
        `,
        expected: 140,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
