import run from "aocrunner";

type Direction = "U" | "D" | "L" | "R";

interface Point {
  x: number;
  y: number;
}

interface Motion {
  direction: Direction;
  step: number;
}

type Directions = {
  [direction in Direction]: Point;
};

const Directions: Directions = {
  U: { x: 0, y: 1 },
  D: { x: 0, y: -1 },
  L: { x: -1, y: 0 },
  R: { x: 1, y: 0 },
};

const initialState: Point = { x: 0, y: 0 };

const generateRope = (knots: number): Point[] =>
  Array.from({ length: knots }, () => initialState);

const calculateMove = (point: Point, direction: Direction): Point => {
  const directionCoords = Directions[direction];

  return {
    x: point.x + directionCoords.x,
    y: point.y + directionCoords.y,
  };
};

const movePointTowards = (from: Point, towards: Point): Point => ({
  x: Math.sign(towards.x - from.x) + from.x,
  y: Math.sign(towards.y - from.y) + from.y,
});

const areTouching = (a: Point, b: Point): boolean =>
  Math.abs(a.x - b.x) <= 1 && Math.abs(a.y - b.y) <= 1;

const visualize = (visited: Point[]) => {
  const minX = 0;
  const maxX = Math.max(...visited.map((p) => p.x));
  const minY = 0;
  const maxY = Math.max(...visited.map((p) => p.y));

  const width = maxX - minX + 1;
  const height = maxY - minY + 1;

  const grid = Array.from({ length: height }, () =>
    Array.from({ length: width }, () => "."),
  );

  visited.forEach((point) => {
    grid[height - point.y - 1][point.x] = "#";
  });

  console.log(grid.map((row) => row.join(" ")).join("\n"));
};

const parseInput = (rawInput: string): Motion[] =>
  rawInput.split(/\r?\n/).map((line) => {
    const [direction, step] = line.split(" ");

    if (!["U", "D", "L", "R"].includes(direction)) {
      throw new Error(`Invalid direction: ${direction}`);
    }

    return {
      direction: direction as Direction,
      step: parseInt(step),
    };
  });

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  let head = initialState;
  let tail = initialState;
  const visited: Point[] = [];

  input.forEach((motion) => {
    const { direction, step } = motion;

    for (let i = 0; i < step; i++) {
      head = calculateMove(head, direction);

      if (!areTouching(head, tail)) {
        tail = movePointTowards(tail, head);
      }

      if (!visited.some((p) => p.x === tail.x && p.y === tail.y)) {
        visited.push(tail);
      }
    }
  });

  return visited.length;
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const rope = generateRope(10);
  const visited: Point[] = [];

  input.forEach((motion) => {
    const { direction, step } = motion;

    for (let i = 0; i < step; i++) {
      rope[0] = calculateMove(rope[0], direction);

      for (let j = 1; j < rope.length; j++) {
        if (!areTouching(rope[j - 1], rope[j])) {
          rope[j] = movePointTowards(rope[j], rope[j - 1]);
        }
      }

      if (
        !visited.some(
          (p) =>
            p.x === rope[rope.length - 1].x && p.y === rope[rope.length - 1].y,
        )
      ) {
        visited.push(rope[rope.length - 1]);
      }
    }
  });

  return visited.length;
};

run({
  part1: {
    tests: [
      {
        input: `
          R 4
          U 4
          L 3
          D 1
          R 4
          D 1
          L 5
          R 2
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
          R 5
          U 8
          L 8
          D 3
          R 17
          D 10
          L 25
          U 20
        `,
        expected: 36,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
