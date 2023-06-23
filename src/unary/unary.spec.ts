import {
  binarsplitBinaryIntoHomogeneBlocksyToUnary,
  binaryToUnary,
} from './unary';

describe('binaryToUnary', () => {
  it.each([
    { value: '1', expected: '0 0' },
    { value: '0', expected: '00 0' },
    { value: '11', expected: '0 00' },
    { value: '00', expected: '00 00' },
  ])('should convert...', ({ value, expected }) => {
    expect(binaryToUnary(value)).toBe(expected);
  });
});

describe('splitBinaryIntoHomogeneBlocks', () => {
  it.each([
    { value: '0', expected: ['0'] },
    { value: '1', expected: ['1'] },
    { value: '11', expected: ['11'] },
    { value: '00', expected: ['00'] },
  ])('should split', ({ value, expected }) => {
    expect(binarsplitBinaryIntoHomogeneBlocksyToUnary(value)).toEqual(
      expect.arrayContaining(expected),
    );
  });
});
