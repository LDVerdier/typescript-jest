import { extractValuesFromFile } from '../utils';
import { resolve } from 'path';

type Set = {
  red: number;
  green: number;
  blue: number;
};

type Game = {
  index: number;
  sets: Set[];
};

type Color = 'red' | 'green' | 'blue';

const toSet = (colorValuePairs: [number, Color][]): Set => {
  const newSet: Set = {
    red: 0,
    green: 0,
    blue: 0,
  };

  return colorValuePairs.reduce<Set>((acc, [value, color]) => {
    acc[color] = value;

    return acc;
  }, newSet);
};

const aggregateSets = (sets: Set[], rawSet: string): Set[] => {
  const colorValuePairs = rawSet
    .split(', ')
    .map((pair: string): [number, Color] => {
      const [value, color] = pair.split(' ');

      return [+value, color as Color];
    });

  const set = toSet(colorValuePairs);

  sets.push(set);

  return sets;
};

const toGame = (line: string): Game => {
  const [gamePrefix, rawSets] = line.split(': ');
  const index = +gamePrefix.split(' ')[1];
  const sets = rawSets.split('; ').reduce<Set[]>(aggregateSets, []);

  return {
    index,
    sets,
  };
};

const rules = {
  red: 12,
  green: 13,
  blue: 14,
};

const isSetInvalid = (set: Set): boolean => {
  return (
    set.blue > rules.blue || set.green > rules.green || set.red > rules.red
  );
};

const isGameValid = (game: Game): boolean => {
  return !game.sets.some(isSetInvalid);
};

const getMinimumColorValues = ({ sets }: Game): Set => {
  const { reds, greens, blues } = sets.reduce<{
    reds: number[];
    greens: number[];
    blues: number[];
  }>(
    (acc, set) => {
      acc.reds.push(set.red);
      acc.greens.push(set.green);
      acc.blues.push(set.blue);

      return acc;
    },
    {
      reds: [],
      greens: [],
      blues: [],
    },
  );

  return {
    red: Math.max(...reds),
    green: Math.max(...greens),
    blue: Math.max(...blues),
  };
};

const getPower = ({ red, green, blue }: Set): number => {
  return red * green * blue;
};

describe('toGame', () => {
  it('should...', () => {
    const line =
      'Game 1: 12 blue, 15 red, 2 green; 17 red, 8 green, 5 blue; 8 red, 17 blue; 9 green, 1 blue, 4 red';
    expect(toGame(line)).toEqual<Game>({
      index: 1,
      sets: [
        { blue: 12, red: 15, green: 2 },
        { blue: 5, red: 17, green: 8 },
        { blue: 17, red: 8, green: 0 },
        { blue: 1, red: 4, green: 9 },
      ],
    });
  });
});

describe('first part', () => {
  it('should sum...', () => {
    const lines = extractValuesFromFile(resolve(__dirname, 'values.txt'));
    const sumOfValidGameIndexes = lines.reduce<number>((sum, line) => {
      const game = toGame(line);
      if (isGameValid(game)) {
        sum += game.index;
      }
      return sum;
    }, 0);

    expect(sumOfValidGameIndexes).toBe(2716);
  });

  it.each([
    {
      line: 'Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green',
      isValid: true,
    },
    {
      line: 'Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue',
      isValid: true,
    },
    {
      line: 'Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red',
      isValid: false,
    },
    {
      line: 'Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red',
      isValid: false,
    },
    {
      line: 'Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green',
      isValid: true,
    },
  ])('should validate example inputs', ({ line, isValid }) => {
    expect(isGameValid(toGame(line))).toBe(isValid);
  });
});

describe('second part', () => {
  it('should', () => {
    const lines = extractValuesFromFile(resolve(__dirname, 'values.txt'));
    const sumOfPowers = lines.reduce<number>((acc, line) => {
      const game = toGame(line);
      const powerBase = getMinimumColorValues(game);
      acc += getPower(powerBase);
      return acc;
    }, 0);

    expect(sumOfPowers).toBe(72227);
  });
});
