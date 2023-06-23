import { binaryToUnary } from './unary';

describe('binaryToUnary', () => {
  it.each([{ value: '1', expected: '0 00' }])(
    'should convert...',
    ({ value, expected }) => {
      expect(binaryToUnary(value)).toBe(expected);
    },
  );
});
