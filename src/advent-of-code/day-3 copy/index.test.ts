class Char {
  constructor(private readonly char: string) {
    if (char.length !== 1) {
      throw Error('Char is too long!');
    }
  }

  static from(char: string): Char {
    return new Char(char);
  }

  isDigit(): boolean {
    return !!this.char[0].match(/^\d$/);
  }

  isSpecialChar(): boolean {
    return !this.isDigit() && this.char[0] !== '.';
  }
}

describe('Char', () => {
  it.each([
    { char: '1', expected: true },
    { char: '.', expected: false },
    { char: '$', expected: false },
  ])('isDigit', ({ char, expected }) => {
    expect(Char.from(char).isDigit()).toBe(expected);
  });
  it.each([
    { char: '1', expected: false },
    { char: '.', expected: false },
    { char: '$', expected: true },
  ])('isSpecialChar', ({ char, expected }) => {
    expect(Char.from(char).isSpecialChar()).toBe(expected);
  });
});

type NumberAtIndexArgs = {
  value: number;
  index: number;
};

class NumberAtIndex {
  constructor(private readonly args: NumberAtIndexArgs) {}

  static from(args: NumberAtIndexArgs): NumberAtIndex {
    return new NumberAtIndex(args);
  }

  isStartOfLine(): boolean {
    return this.args.index === 0;
  }

  getStartIndex(): number {
    return this.args.index;
  }

  getEndIndex(): number {
    return this.args.index + this.args.value.toString().length - 1;
  }

  getValue(): number {
    return this.args.value;
  }

  getAllIndexes(): number[] {
    const indexes: number[] = [];
    for (let i = this.getStartIndex(); i <= this.getEndIndex(); i++) {
      indexes.push(i);
    }

    return indexes;
  }
}

describe('NumberAtIndex', () => {
  it('getEndIndex', () => {
    expect(NumberAtIndex.from({ value: 1, index: 0 }).getEndIndex()).toBe(0);
    expect(NumberAtIndex.from({ value: 10, index: 0 }).getEndIndex()).toBe(1);
    expect(NumberAtIndex.from({ value: 123, index: 4 }).getEndIndex()).toBe(6);
  });
});

class Line {
  constructor(private readonly line: string) {}

  static from(line: string): Line {
    return new Line(line);
  }

  getNumbersAtIndexes(): NumberAtIndex[] {
    const matches = Array.from(this.line.matchAll(/(\d+)/g));

    return Array.from(matches).map((match) =>
      NumberAtIndex.from({
        value: +match[0],
        index: match.index,
      }),
    );
  }

  isPartNumber(numberAtIndex: NumberAtIndex): boolean {
    return (
      this.isPrecededBySpecialChar(numberAtIndex) ||
      this.isFollowedBySpecialChar(numberAtIndex)
    );
  }

  private isPrecededBySpecialChar(numberAtIndex: NumberAtIndex): boolean {
    if (numberAtIndex.isStartOfLine()) {
      return false;
    }

    const currentIndex = numberAtIndex.getStartIndex();
    const previousIndex = currentIndex - 1;

    return Char.from(this.line[previousIndex]).isSpecialChar();
  }

  private isFollowedBySpecialChar(numberAtIndex: NumberAtIndex): boolean {
    const currentIndex = numberAtIndex.getEndIndex();
    if (this.isEndOfLine(currentIndex)) {
      return false;
    }
    const nextIndex = currentIndex + 1;

    return Char.from(this.line[nextIndex]).isSpecialChar();
  }

  private isEndOfLine(index: number): boolean {
    return index === this.line.length - 1;
  }
}

describe('Line', () => {
  it.each<{
    line: string;
    expected: NumberAtIndex[];
  }>([
    {
      line: '...*......',
      expected: [],
    },
    {
      line: '1..*......',
      expected: [NumberAtIndex.from({ value: 1, index: 0 })],
    },
    {
      line: '12.*...34..',
      expected: [
        NumberAtIndex.from({ value: 12, index: 0 }),
        NumberAtIndex.from({ value: 34, index: 7 }),
      ],
    },
    {
      line: '.12.*...34',
      expected: [
        NumberAtIndex.from({ value: 12, index: 1 }),
        NumberAtIndex.from({ value: 34, index: 8 }),
      ],
    },
    {
      line: '*12.*...34',
      expected: [
        NumberAtIndex.from({ value: 12, index: 1 }),
        NumberAtIndex.from({ value: 34, index: 8 }),
      ],
    },
  ])('getNumbers', ({ line, expected }) => {
    expect(Line.from(line).getNumbersAtIndexes()).toEqual(expected);
  });
});

describe('determine if number is a part number', () => {
  it.each<{
    lineInput: string;
    expected: boolean;
  }>([
    {
      lineInput: '*1..*......',
      expected: true,
    },
    {
      lineInput: '.1..*......',
      expected: false,
    },
    {
      lineInput: '1..*......',
      expected: false,
    },
    {
      lineInput: '12.*......',
      expected: false,
    },
    {
      lineInput: '12*......',
      expected: true,
    },
    {
      lineInput: '....12',
      expected: false,
    },
    {
      lineInput: '...*12',
      expected: true,
    },
  ])('is a part number', ({ lineInput, expected }) => {
    const line = Line.from(lineInput);
    const numberAtIndex = line.getNumbersAtIndexes()[0];

    expect(line.isPartNumber(numberAtIndex)).toBe(expected);
  });
});

class Grid {
  constructor(readonly lines: string[]) {}

  static from(lines: string[]): Grid {
    return new Grid(lines);
  }

  getSumOfPartNumbers(): number {
    return this.lines
      .map((lineInput) => Line.from(lineInput))
      .reduce<number>((sum, currentLine) => {
        const currentLineSum = currentLine
          .getNumbersAtIndexes()
          .filter((numberAtIndex) => currentLine.isPartNumber(numberAtIndex))
          .reduce<number>((lineSum, currentNumber) => {
            return lineSum + currentNumber.getValue();
          }, 0);
        return sum + currentLineSum;
      }, 0);
  }
}

describe('Grid', () => {
  it.each<{
    linesInput: string[];
    expected: number;
  }>([
    {
      linesInput: ['*1..*......'],
      expected: 1,
    },
    {
      linesInput: ['*1..*..1...'],
      expected: 1,
    },
    {
      linesInput: ['*1..*..1*..'],
      expected: 2,
    },
    {
      linesInput: ['*12.*.21*..'],
      expected: 33,
    },
    // {
    //   linesInput: [
    //     '1..................................................',
    //     '*..................................................',
    //   ],
    //   expected: 1,
    // },
  ])('is a part number', ({ linesInput, expected }) => {
    const grid = Grid.from(linesInput);
    expect(grid.getSumOfPartNumbers()).toBe(expected);
  });
});

type Coordinate = {
  lineIndex: number;
  columnIndex: number;
};
class NumberInGrid {
  constructor(
    private readonly numberAtIndex: NumberAtIndex,
    private readonly lineIndex: number,
    private readonly grid: Grid,
  ) {}

  static from(
    numberAtIndex: NumberAtIndex,
    lineIndex: number,
    grid: Grid,
  ): NumberInGrid {
    return new NumberInGrid(numberAtIndex, lineIndex, grid);
  }

  getSurroundingCoordinates(): Coordinate[] {
    return [
      ...this.beforeAndAfterCoordinates(),
      ...this.aboveAndBelowCoordinates(),
    ];
  }

  beforeAndAfterCoordinates(): Coordinate[] {
    const coordinates: Coordinate[] = [];
    const lineLength = this.grid.lines[this.lineIndex].length;

    if (!this.numberAtIndex.isStartOfLine()) {
      coordinates.push({
        lineIndex: this.lineIndex,
        columnIndex: this.numberAtIndex.getStartIndex() - 1,
      });
    }

    if (this.numberAtIndex.getEndIndex() !== lineLength - 1) {
      coordinates.push({
        lineIndex: this.lineIndex,
        columnIndex: lineLength - 1,
      });
    }

    return coordinates;
  }

  aboveAndBelowCoordinates(): Coordinate[] {
    const coordinates: Coordinate[] = [];

    if (this.isFirstLineOfTheGrid()) {
      this.numberAtIndex.getAllIndexes().forEach((index) =>
        coordinates.push({
          lineIndex: this.lineIndex - 1,
          columnIndex: index,
        }),
      );
    }

    if (this.isLastLineOfTheGrid()) {
      this.numberAtIndex.getAllIndexes().forEach((index) =>
        coordinates.push({
          lineIndex: this.lineIndex + 1,
          columnIndex: index,
        }),
      );
    }

    return coordinates;
  }

  private isFirstLineOfTheGrid(): boolean {
    return this.lineIndex > 0;
  }

  private isLastLineOfTheGrid(): boolean {
    return this.lineIndex < this.grid.lines.length - 1;
  }
}

describe('NumberInGrid', () => {
  it.each<{
    numberAtIndex: NumberAtIndex;
    lineIndex: number;
    grid: Grid;
    expected: Coordinate[];
  }>([
    {
      numberAtIndex: NumberAtIndex.from({ value: 1, index: 0 }),
      lineIndex: 0,
      grid: Grid.from(['1']),
      expected: [],
    },
    {
      numberAtIndex: NumberAtIndex.from({ value: 1, index: 0 }),
      lineIndex: 0,
      grid: Grid.from(['1.']),
      expected: [
        {
          lineIndex: 0,
          columnIndex: 1,
        },
      ],
    },
    {
      numberAtIndex: NumberAtIndex.from({ value: 1, index: 0 }),
      lineIndex: 1,
      grid: Grid.from(['.', '1']),
      expected: [
        {
          lineIndex: 0,
          columnIndex: 0,
        },
      ],
    },
    {
      numberAtIndex: NumberAtIndex.from({ value: 1, index: 0 }),
      lineIndex: 0,
      grid: Grid.from(['1', '.']),
      expected: [
        {
          lineIndex: 1,
          columnIndex: 0,
        },
      ],
    },
  ])(
    'getSurroundingCoordinates',
    ({ numberAtIndex, lineIndex, grid, expected }) => {
      const numberInGrid = NumberInGrid.from(numberAtIndex, lineIndex, grid);
      expect(numberInGrid.getSurroundingCoordinates()).toEqual<Coordinate[]>(
        expected,
      );
    },
  );
});
