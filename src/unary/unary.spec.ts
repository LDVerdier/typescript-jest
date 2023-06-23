import { binaryToUnary } from './unary';

describe('binaryToUnary', () => {
  it.each([
    { value: '1', expected: '0 0' },
    { value: '0', expected: '00 0' },
  ])('should convert...', ({ value, expected }) => {
    expect(binaryToUnary(value)).toBe(expected);
  });
});
