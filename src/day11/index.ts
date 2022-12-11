import run from "aocrunner";

type OperationSign = "+" | "-" | "*" | "/";
type Operation = [number, OperationSign, number];

interface Monkey {
  id: number;
  items: number[];
  operation: string;
  test: [number, number, number];
  inspectedItems: number;
}

const parseOperation = (operation: string, old: number): Operation => {
  const [a, sign, b] = operation.split(/(\+|\-|\*|\/)/);
  return [
    a.match(/old/i) ? old : parseInt(a),
    sign as OperationSign,
    b.match(/old/i) ? old : parseInt(b),
  ];
};

const calculateOperation = (operation: Operation): number => {
  const [a, sign, b] = operation;
  switch (sign) {
    case "+":
      return a + b;
    case "-":
      return a - b;
    case "*":
      return a * b;
    case "/":
      return a / b;
  }
};

const processRound = (monkeys: Monkey[], worryLevelReduction: boolean) => {
  monkeys.forEach((monkey) => {
    while (monkey.items.length) {
      const item = monkey.items.shift()!;

      // Inspect the item
      const operation = parseOperation(monkey.operation, item);
      let newWorryLevel = Math.floor(calculateOperation(operation));
      if (worryLevelReduction) {
        newWorryLevel = Math.floor(newWorryLevel / 3);
      }
      monkey.inspectedItems++;

      // If the new item worry value is divisible by the test number, throw to the next monkey
      const [testNumber, ifTrue, ifFalse] = monkey.test;
      if (newWorryLevel % testNumber === 0) {
        monkeys[ifTrue].items.push(newWorryLevel);
      } else {
        monkeys[ifFalse].items.push(newWorryLevel);
      }
    }
  });
};

const findMonkeysWithMostInspectedItems = (monkeys: Monkey[], limit = 2) =>
  monkeys
    .map((monkey) => monkey.inspectedItems)
    .sort((a, b) => b - a)
    .slice(0, limit);

const calculateMonkeyBusinessLevel = (monkeys: Monkey[]) => {
  const [monkeyWithMostInspectedItems, secondMonkeyWithMostInspectedItems] =
    findMonkeysWithMostInspectedItems(monkeys);

  return monkeyWithMostInspectedItems * secondMonkeyWithMostInspectedItems;
};

const processRounds = (
  monkeys: Monkey[],
  numberOfRounds: number,
  worryLevelReduction = true,
) => {
  for (let i = 0; i < numberOfRounds; i++) {
    processRound(monkeys, worryLevelReduction);
  }
};

const parseInput = (rawInput: string): Monkey[] => {
  const monkeys = rawInput.split(/\n\n/).map((monkey) => {
    const [id, items, operation, ...test] = monkey.split(/\n/);
    return {
      id: parseInt(id.split(" ")[1]),
      items: items
        .split(/Starting items: /i)[1]
        .split(/, /)
        .map((item) => parseInt(item)),
      operation: operation.split(/Operation: new = /i)[1],
      test: test
        .map((line) => line.match(/(\d+)/g)?.map(parseInt))
        .flat() as Monkey["test"],
      inspectedItems: 0,
    };
  });
  return monkeys;
};

const part1 = (rawInput: string) => {
  const monkeys = parseInput(rawInput);

  const NUMBER_OF_ROUNDS = 20;
  processRounds(monkeys, NUMBER_OF_ROUNDS);

  return calculateMonkeyBusinessLevel(monkeys);
};

const part2 = (rawInput: string) => {
  const monkeys = parseInput(rawInput);

  const NUMBER_OF_ROUNDS = 20;
  processRounds(monkeys, NUMBER_OF_ROUNDS, false);

  return calculateMonkeyBusinessLevel(monkeys);
};

run({
  part1: {
    tests: [
      {
        input: `
Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1
        `,
        expected: 10605,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1
        `,
        expected: 2713310158,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});
