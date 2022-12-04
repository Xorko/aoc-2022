import run from "aocrunner";

type OpponentChoice = "A" | "B" | "C";
type PlayerChoice = "X" | "Y" | "Z";
type Game = [OpponentChoice, PlayerChoice];
type Guide = Game[];

enum Points {
  ROCK_PLAYED = 1,
  PAPER_PLAYED = 2,
  SCISSORS_PLAYED = 3,
  WIN = 6,
  LOSE = 0,
  DRAW = 3,
}

const parseInput = (rawInput: string): Guide => {
  const lines = rawInput.split(/\r?\n/);
  return lines.map((line) => line.split(" ", 2) as Game);
};

const part1 = (rawInput: string) => {
  const input = parseInput(rawInput);

  enum ScoreAgainstRock {
    X = Points.DRAW + Points.ROCK_PLAYED,
    Y = Points.WIN + Points.PAPER_PLAYED,
    Z = Points.LOSE + Points.SCISSORS_PLAYED,
  }

  enum ScoreAgainstPaper {
    X = Points.LOSE + Points.ROCK_PLAYED,
    Y = Points.DRAW + Points.PAPER_PLAYED,
    Z = Points.WIN + Points.SCISSORS_PLAYED,
  }

  enum ScoreAgainstScissors {
    X = Points.WIN + Points.ROCK_PLAYED,
    Y = Points.LOSE + Points.PAPER_PLAYED,
    Z = Points.DRAW + Points.SCISSORS_PLAYED,
  }

  const calculateScoreAgainstRock = (shapePlayed: PlayerChoice) =>
    ScoreAgainstRock[shapePlayed].valueOf();

  const calculateScoreAgainstPaper = (shapePlayed: PlayerChoice) =>
    ScoreAgainstPaper[shapePlayed].valueOf();

  const calculateScoreAgainstScissors = (shapePlayed: PlayerChoice) =>
    ScoreAgainstScissors[shapePlayed].valueOf();

  const calculateScoreAgainstShape = (
    shapeToPlayAgainst: OpponentChoice,
    shapePlayed: PlayerChoice,
  ) => {
    enum scoreAgainstShape {
      A = calculateScoreAgainstRock(shapePlayed),
      B = calculateScoreAgainstPaper(shapePlayed),
      C = calculateScoreAgainstScissors(shapePlayed),
    }

    return scoreAgainstShape[shapeToPlayAgainst];
  };

  const calculateScore = (strategyGuide: Guide) =>
    strategyGuide.reduce((totalScore, [shapeToPlayAgainst, shapePlayed]) => {
      return (
        totalScore + calculateScoreAgainstShape(shapeToPlayAgainst, shapePlayed)
      );
    }, 0);

  return calculateScore(input);
};

const part2 = (rawInput: string) => {
  const input = parseInput(rawInput);

  enum ScoreAgainstRock {
    X = Points.LOSE + Points.SCISSORS_PLAYED,
    Y = Points.DRAW + Points.ROCK_PLAYED,
    Z = Points.WIN + Points.PAPER_PLAYED,
  }

  enum ScoreAgainstPaper {
    X = Points.LOSE + Points.ROCK_PLAYED,
    Y = Points.DRAW + Points.PAPER_PLAYED,
    Z = Points.WIN + Points.SCISSORS_PLAYED,
  }

  enum ScoreAgainstScissors {
    X = Points.LOSE + Points.PAPER_PLAYED,
    Y = Points.DRAW + Points.SCISSORS_PLAYED,
    Z = Points.WIN + Points.ROCK_PLAYED,
  }

  const calculateScoreAgainstRock = (shapePlayed: PlayerChoice) =>
    ScoreAgainstRock[shapePlayed].valueOf();

  const calculateScoreAgainstPaper = (shapePlayed: PlayerChoice) =>
    ScoreAgainstPaper[shapePlayed].valueOf();

  const calculateScoreAgainstScissors = (shapePlayed: PlayerChoice) =>
    ScoreAgainstScissors[shapePlayed].valueOf();

  const calculateScoreAgainstShape = (
    shapeToPlayAgainst: OpponentChoice,
    shapePlayed: PlayerChoice,
  ) => {
    enum ScoreAgainstShape {
      A = calculateScoreAgainstRock(shapePlayed),
      B = calculateScoreAgainstPaper(shapePlayed),
      C = calculateScoreAgainstScissors(shapePlayed),
    }

    return ScoreAgainstShape[shapeToPlayAgainst];
  };

  const calculateScore = (strategyGuide: Guide) =>
    strategyGuide.reduce((totalScore, [shapeToPlayAgainst, shapePlayed]) => {
      return (
        totalScore + calculateScoreAgainstShape(shapeToPlayAgainst, shapePlayed)
      );
    }, 0);

  return calculateScore(input);
};

run({
  part1: {
    tests: [
      {
        input: `
          A Y
          B X
          C Z
        `,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
          A Y
          B X
          C Z
        `,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
