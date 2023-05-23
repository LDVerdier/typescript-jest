import { toArabic } from './index';

test.each([
  { romanNumber: 'I', expected: 1 },
  { romanNumber: 'II', expected: 2 },
  { romanNumber: 'III', expected: 3 },
  //   { romanNumber: 'IV', expected: 4 },
])('convert roman to arabic', ({ romanNumber, expected }) => {
  expect(toArabic(romanNumber)).toBe(expected);
});
