import {
  splitBitsIntoIdenticalBitGroups,
  bitsToUnary,
  identicalBitsToUnary,
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
    expect(identicalBitsToUnary(value)).toBe(expected);
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
