import fs from 'fs';

const parseInputFile = (input) => {
  const lines = input.split(/\r?\n/);
  const parsedInput = lines.map((line) => line.split(' '));

  return parsedInput;
};

const inputFile = fs.readFileSync('input.txt', 'utf8');
export const strategyGuide = parseInputFile(inputFile);

export const Points = {
  ROCK_PLAYED: 1,
  PAPER_PLAYED: 2,
  SCISSORS_PLAYED: 3,
  WIN: 6,
  LOSE: 0,
  DRAW: 3,
};
