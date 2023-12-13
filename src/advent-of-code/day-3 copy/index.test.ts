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
}

describe('Char', () => {
  it.each([
    { char: '1', expected: true },
    { char: '.', expected: false },
    { char: '$', expected: false },
  ])('isDigit', ({ char, expected }) => {
    expect(Char.from(char).isDigit()).toBe(expected);
  });
});
