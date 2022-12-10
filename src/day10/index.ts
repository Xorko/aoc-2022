import run from "aocrunner";

type InstructionTypes = "addx" | "noop";

interface Instruction {
  type: InstructionTypes;
  duration: number;
}

interface AddXInstruction extends Instruction {
  type: "addx";
  value: number;
  duration: 2;
}

interface NoopInstruction extends Instruction {
  type: "noop";
  duration: 1;
}

const isAddXInstruction = (
  instruction: Instruction,
): instruction is AddXInstruction => instruction.type === "addx";

const parseInstructionLine = (line: string) => {
  const [type, value] = line.split(" ");

  switch (type) {
    case "addx":
      return {
        type,
        value: parseInt(value, 10),
        duration: 2,
      } as AddXInstruction;

    case "noop":
      return {
        type,
        duration: 1,
      } as NoopInstruction;

    default:
      throw new Error(`Invalid instruction type: ${type}`);
  }
};

const processPart1 = (input: Instruction[]): number[] => {
  const checkpoints = [20, 60, 100, 140, 180, 220];
  let registerValue = 1;
  let currentCycle = 0;
  let signalStrengthHistory: number[] = [];

  while (input.length >= 0) {
    const instruction = input.shift();
    if (!instruction) break;

    for (let i = 0; i < instruction.duration; i++) {
      currentCycle++;
      signalStrengthHistory.push(registerValue * currentCycle);
    }

    if (isAddXInstruction(instruction)) {
      registerValue += instruction.value;
    }
  }

  return checkpoints.map((checkpoint) => signalStrengthHistory[checkpoint - 1]);
};

const processPart2 = (input: Instruction[]): string[] => {
  const screen: string[] = [];
  let register = 1;
  let currentCycle = 0;

  while (input.length >= 0) {
    const instruction = input.shift();
    if (!instruction) break;

    for (let i = 0; i < instruction.duration; i++) {
      currentCycle++;

      const rowPosition = (currentCycle - 1) % 40;

      if (register - 1 <= rowPosition && rowPosition <= register + 1) {
        screen.push("#");
      } else {
        screen.push(".");
      }
    }

    if (isAddXInstruction(instruction)) {
      register += instruction.value;
    }
  }

  return screen;
};

const splitInRows = (screen: string[], rowSize: number) => {
  const rows: string[][] = [];

  for (let i = 0; i < screen.length; i += rowSize) {
    rows.push(screen.slice(i, i + rowSize));
  }

  return rows;
};

const parseInput = (rawInput: string): Instruction[] =>
  rawInput.split(/\r?\n/).map((line) => parseInstructionLine(line));

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return processPart1(input).reduce((a, b) => a + b, 0);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);
  const screen = processPart2(input);
  const screenRowSize = 40;

  console.log(
    splitInRows(screen, screenRowSize)
      .map((row) => row.join(""))
      .join("\n"),
  );

  return "See console output";
};

run({
  part1: {
    tests: [
      {
        input: `
          addx 15
          addx -11
          addx 6
          addx -3
          addx 5
          addx -1
          addx -8
          addx 13
          addx 4
          noop
          addx -1
          addx 5
          addx -1
          addx 5
          addx -1
          addx 5
          addx -1
          addx 5
          addx -1
          addx -35
          addx 1
          addx 24
          addx -19
          addx 1
          addx 16
          addx -11
          noop
          noop
          addx 21
          addx -15
          noop
          noop
          addx -3
          addx 9
          addx 1
          addx -3
          addx 8
          addx 1
          addx 5
          noop
          noop
          noop
          noop
          noop
          addx -36
          noop
          addx 1
          addx 7
          noop
          noop
          noop
          addx 2
          addx 6
          noop
          noop
          noop
          noop
          noop
          addx 1
          noop
          noop
          addx 7
          addx 1
          noop
          addx -13
          addx 13
          addx 7
          noop
          addx 1
          addx -33
          noop
          noop
          noop
          addx 2
          noop
          noop
          noop
          addx 8
          noop
          addx -1
          addx 2
          addx 1
          noop
          addx 17
          addx -9
          addx 1
          addx 1
          addx -3
          addx 11
          noop
          noop
          addx 1
          noop
          addx 1
          noop
          noop
          addx -13
          addx -19
          addx 1
          addx 3
          addx 26
          addx -30
          addx 12
          addx -1
          addx 3
          addx 1
          noop
          noop
          noop
          addx -9
          addx 18
          addx 1
          addx 2
          noop
          noop
          addx 9
          noop
          noop
          noop
          addx -1
          addx 2
          addx -37
          addx 1
          addx 3
          noop
          addx 15
          addx -21
          addx 22
          addx -6
          addx 1
          noop
          addx 2
          addx 1
          noop
          addx -10
          noop
          noop
          addx 20
          addx 1
          addx 2
          addx 2
          addx -6
          addx -11
          noop
          noop
          noop
        `,
        expected: 13140,
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
