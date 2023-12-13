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

class NumberAtIndex {
  private static NUMBERS_HASH_MAP = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };
  constructor(private readonly value: string, private readonly index: number) {}

  toIntString(): string {
    if (this.value.length === 1) {
      return this.value;
    }

    return NumberAtIndex.NUMBERS_HASH_MAP[
      this.value as keyof typeof NumberAtIndex.NUMBERS_HASH_MAP
    ].toString();
  }
}

function matchOverlap(input: string, re: RegExp) {
  const numbersAtIndex: NumberAtIndex[] = [];
  let m;
  // Prevent infinite loops
  if (!re.global) re = new RegExp(re.source, (re + '').split('/').pop() + 'g');
  while ((m = re.exec(input))) {
    re.lastIndex -= m[0].length - 1;
    numbersAtIndex.push(new NumberAtIndex(m[0] as string, re.lastIndex - 1));
  }
  return numbersAtIndex;
}

const extractFirstAndLastDigit2 = (line: string): number => {
  const numbers = matchOverlap(
    line,
    /(one|two|three|four|five|six|seven|eight|nine|[0-9])/g,
  ).map((numberAtIndex) => numberAtIndex.toIntString());

  return +`${numbers[0]}${numbers[numbers.length - 1]}`;
};

describe('second part', () => {
  it('should...', () => {
    const result = Array.from(
      matchOverlap(
        'twone2six',
        /(one|two|three|four|five|six|seven|eight|nine|[0-9])/g,
      ),
    )
      .map((numberAtIndex) => numberAtIndex.toIntString())
      .join('');
    expect(result).toBe('2126');
  });

  it('final result', () => {
    const lines = extractValuesFromFile(resolve(__dirname, 'values.txt'));
    const numbers = lines.map(extractFirstAndLastDigit2);

    expect(numbers.reduce((a, b) => a + b)).toBe(57345);
  });
});
