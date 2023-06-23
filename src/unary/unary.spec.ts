import {
  splitBitsIntoIdenticalBitGroups,
  bitsToUnary,
  bitGroupToUnary,
  charsToUnary,
  charsToSevenBits,
} from './unary';

describe('identicalBitsToUnary', () => {
  it.each([
    { value: '1', expected: '0 0' },
    { value: '0', expected: '00 0' },
    { value: '11', expected: '0 00' },
    { value: '111', expected: '0 000' },
    { value: '00', expected: '00 00' },
    { value: '000', expected: '00 000' },
  ])('should convert...', ({ value, expected }) => {
    expect(bitGroupToUnary(value)).toBe(expected);
  });
});

describe('splitBitsIntoIdenticalBitGroups', () => {
  it.each([
    { value: '0', expected: ['0'] },
    { value: '1', expected: ['1'] },
    { value: '11', expected: ['11'] },
    { value: '00', expected: ['00'] },
    { value: '10', expected: ['1', '0'] },
    { value: '110', expected: ['11', '0'] },
    { value: '1100', expected: ['11', '00'] },
    { value: '11001', expected: ['11', '00', '1'] },
    { value: '110011', expected: ['11', '00', '11'] },
  ])('should split', ({ value, expected }) => {
    expect(splitBitsIntoIdenticalBitGroups(value).join('')).toBe(
      expected.join(''),
    );
  });
});

describe('bitsToUnary', () => {
  it.each([
    { value: '10', expected: '0 0 00 0' },
    { value: '1100', expected: '0 00 00 00' },
    { value: '11000', expected: '0 00 00 000' },
    { value: '110001', expected: '0 00 00 000 0 0' },
  ])('should convert...', ({ value, expected }) => {
    expect(bitsToUnary(value)).toBe(expected);
  });
});

describe('charsToUnary', () => {
  it.each([
    { value: 'C', expected: '0 0 00 0000 0 00' },
    { value: 'CC', expected: '0 0 00 0000 0 000 00 0000 0 00' },
    { value: '%', expected: '00 0 0 0 00 00 0 0 00 0 0 0' },
    { value: '0', expected: '00 0 0 00 00 0000' },
    { value: ' ', expected: '00 0 0 0 00 00000' },
  ])('should convert...', ({ value, expected }) => {
    expect(charsToUnary(value)).toBe(expected);
  });
});

describe('charsToSevenBits', () => {
  it.each([
    { value: 'C', expected: '1000011' },
    { value: 'CC', expected: '10000111000011' },
    { value: 'C C', expected: '100001101000001000011' },
  ])('should convert...', ({ value, expected }) => {
    expect(charsToSevenBits(value)).toBe(expected);
  });
});
