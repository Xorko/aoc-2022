// https://adventofcode.com/2022/day/2
import { Points, strategyGuide } from './common.js';

const calculateScoreAgainstRock = (shapePlayed) => {
  const scoreAgainstRock = {
    X: Points.DRAW + Points.ROCK_PLAYED,
    Y: Points.WIN + Points.PAPER_PLAYED,
    Z: Points.LOSE + Points.SCISSORS_PLAYED,
  };

  return scoreAgainstRock[shapePlayed];
};

const calculateScoreAgainstPaper = (shapePlayed) => {
  const scoreAgainstPaper = {
    X: Points.LOSE + Points.ROCK_PLAYED,
    Y: Points.DRAW + Points.PAPER_PLAYED,
    Z: Points.WIN + Points.SCISSORS_PLAYED,
  };

  return scoreAgainstPaper[shapePlayed];
};

const calculateScoreAgainstScissors = (shapePlayed) => {
  const scoreAgainstScissors = {
    X: Points.WIN + Points.ROCK_PLAYED,
    Y: Points.LOSE + Points.PAPER_PLAYED,
    Z: Points.DRAW + Points.SCISSORS_PLAYED,
  };

  return scoreAgainstScissors[shapePlayed];
};

const calculateScoreAgainstShape = (shapeToPlayAgainst, shapePlayed) => {
  const scoreAgainstShape = {
    A: calculateScoreAgainstRock(shapePlayed),
    B: calculateScoreAgainstPaper(shapePlayed),
    C: calculateScoreAgainstScissors(shapePlayed),
  };

  return scoreAgainstShape[shapeToPlayAgainst];
};

const calculateStrategyGuideScore = (strategyGuide) =>
  strategyGuide.reduce((totalScore, [shapeToPlayAgainst, shapePlayed]) => {
    return (
      totalScore + calculateScoreAgainstShape(shapeToPlayAgainst, shapePlayed)
    );
  }, 0);

console.log(`Part 1 - ${calculateStrategyGuideScore(strategyGuide)}`);
