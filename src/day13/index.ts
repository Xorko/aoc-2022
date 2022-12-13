import run from "aocrunner";
import { add } from "../utils/reducer-utils.js";

type PairWithIndex = [any[], number];

const compare = (a: any, b: any): number => {
  if (Number.isInteger(a) && Number.isInteger(b)) {
    return a - b;
  } else if (Number.isInteger(a)) {
    return compare([a], b);
  } else if (Number.isInteger(b)) {
    return compare(a, [b]);
  }

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
  const packets = parseInput(rawInput);

  return packets
    .map((pair, i) => [pair, i + 1] as PairWithIndex)
    .filter(([pair]) => compare(pair[0], pair[1]) < 0)
    .map(([, i]) => i)
    .reduce(add, 0);
};

const part2 = (rawInput: string) => {
  const dividers = [[[2]], [[6]]];
  const packets = [...parseInput(rawInput).flat(), ...dividers];

  const sortedPackets = packets.sort(compare);

  parseInput(rawInput).forEach((packet, i) => console.log(i, packet));

  return dividers.reduce((acc, divider) => {
    const dividerIndex = sortedPackets.indexOf(divider) + 1;

    if (dividerIndex === 0) {
      throw new Error("Divider not found");
    }
    return acc * dividerIndex;
  }, 1);
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
