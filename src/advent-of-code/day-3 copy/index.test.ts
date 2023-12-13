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
