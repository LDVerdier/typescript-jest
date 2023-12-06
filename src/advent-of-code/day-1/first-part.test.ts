import { extractValuesFromFile } from '../utils';
import { resolve } from 'path';

const stripLetters = (line: string): string => {
  return line
    .split('')
    .map((str) => +str)
    .filter(Number.isInteger)
    .join('')
    .toString();
};

const extractFirstAndLastDigit = (line: string): number => {
  const numbersOnly = stripLetters(line);

  return +`${numbersOnly[0]}${numbersOnly[numbersOnly.length - 1]}`;
};

describe('first part', () => {
  it('stripLetters', () => {
    expect(stripLetters('two65eightbkgqcsn91qxkfvg')).toBe('6591');
  });

  it('should sum...', () => {
    const lines = extractValuesFromFile(resolve(__dirname, 'values.txt'));
    const numbers = lines.map(extractFirstAndLastDigit);

    expect(numbers.reduce((a, b) => a + b)).toBe(57346);
  });
});
