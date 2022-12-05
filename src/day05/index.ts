import run from "aocrunner";

type Input = {
  stacks: string[][];
  commands: number[][];
};

const parseStacks = (data: string[][]) => {
  const numberOfStacks =
    data[data.length - 1].join("").match(/\d+/g)?.length || 0;
  const stacks: string[][] = Array.from({ length: numberOfStacks }, () => []);

  for (let i = data.length - 2; i >= 0; i--) {
    for (let j = 1; j < data[i].length; j += 4) {
      if (data[i][j] && data[i][j] !== " ") {
        stacks[(j - 1) / 4].push(data[i][j]);
      }
    }
  }

  return stacks;
};

const parseInput = (rawInput: string): Input => {
  const [stacks, commands] = rawInput.split("\n\n");

  return {
    stacks: parseStacks(stacks.split("\n").map((line) => line.split(""))),
    commands: commands
      .split(/\r?\n/)
      .map((command) => command.match(/\d+/g))
      .map((command) => command?.map((number) => parseInt(number, 10)) || []),
  };
};

const part1 = (rawInput: string) => {
  const { stacks, commands } = parseInput(rawInput);

  commands.forEach(([quantity, from, to]) => {
    const source = stacks[from - 1];
    const destination = stacks[to - 1];

    while (quantity-- && source.length) {
      destination.push(source.pop()!);
    }
  });

  return stacks.reduce((result, stack) => `${result}${stack.at(-1)}`, "");
};

const part2 = (rawInput: string) => {
  const { stacks, commands } = parseInput(rawInput);

  commands.forEach(([quantity, from, to]) => {
    const source = stacks[from - 1];
    const destination = stacks[to - 1];

    const items = [];
    while (quantity-- && source.length) {
      items.push(source.pop()!);
    }
    items.reverse().forEach((item) => destination.push(item));
  });

  return stacks.reduce((result, stack) => `${result}${stack.at(-1)}`, "");
};

run({
  part1: {
    tests: [
      {
        input: `
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
        `,
        expected: "CMZ",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
        `,
        expected: "MCD",
      },
    ],
    solution: part2,
  },
  trimTestInputs: false,
  onlyTests: false,
});
