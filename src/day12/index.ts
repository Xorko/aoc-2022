import run from "aocrunner";

type Coordinates = {
  x: number;
  y: number;
};

const keyOfCoords = (coords: Coordinates) => `${coords.x},${coords.y}`;

const coords: {
  start: Coordinates;
  end: Coordinates;
} = {
  start: { x: 0, y: 0 },
  end: { x: 0, y: 0 },
};

const getHeight = (c: string) => {
  if (c === "S") return 0;
  if (c === "E") return 25;
  return c.charCodeAt(0) - "a".charCodeAt(0);
};

const getValueAt = (input: number[][], coords: Coordinates) =>
  input[coords.y][coords.x];

const findNeighborsCoordinates = (input: number[][], coords: Coordinates) => {
  const { x, y } = coords;
  const neighbors = [] as Coordinates[];

  if (x > 0) neighbors.push({ x: x - 1, y });
  if (x < input[0].length - 1) neighbors.push({ x: x + 1, y });
  if (y > 0) neighbors.push({ x, y: y - 1 });
  if (y < input.length - 1) neighbors.push({ x, y: y + 1 });

  return neighbors;
};

const findNumberOfStepsToReachEnd = (
  input: number[][],
  start = coords.start,
) => {
  const queue: [Coordinates, number][] = [[start, 0]];
  const visited = new Set<string>();
  const endKey = keyOfCoords(coords.end);

  while (queue.length) {
    const [current, steps] = queue.shift()!;
    const key = keyOfCoords(current);

    if (visited.has(key)) continue;

    visited.add(key);

    if (key === endKey) return steps;

    const currentHeight = getValueAt(input, current);
    findNeighborsCoordinates(input, current).forEach((neighbor) => {
      if (getValueAt(input, neighbor) <= currentHeight + 1) {
        queue.push([neighbor, steps + 1]);
      }
    });
  }

  return Number.MAX_SAFE_INTEGER;
};

const parseInput = (rawInput: string) =>
  rawInput.split("\n").map((line, colIndex) =>
    line.split("").map((c, rowIndex) => {
      if (c === "S") coords.start = { x: rowIndex, y: colIndex };
      else if (c === "E") coords.end = { x: rowIndex, y: colIndex };
      return getHeight(c);
    }),
  );

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  return findNumberOfStepsToReachEnd(input);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  const toTest: Coordinates[] = [];
  input.forEach((line, colIndex) => {
    line.forEach((height, rowIndex) => {
      if (height === 0) toTest.push({ x: rowIndex, y: colIndex });
    });
  });

  const results = toTest.map((coords) =>
    findNumberOfStepsToReachEnd(input, coords),
  );

  return Math.min(...results);
};

run({
  part1: {
    tests: [
      {
        input: `
          Sabqponm
          abcryxxl
          accszExk
          acctuvwj
          abdefghi
        `,
        expected: 31,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
        Sabqponm
        abcryxxl
        accszExk
        acctuvwj
        abdefghi
        `,
        expected: 29,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
