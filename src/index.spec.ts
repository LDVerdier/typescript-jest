import { toArabic } from './index';

test.each([
  { romanNumber: 'I', expected: 1 },
  { romanNumber: 'II', expected: 2 },
  { romanNumber: 'III', expected: 3 },
  { romanNumber: 'IV', expected: 4 },
  { romanNumber: 'V', expected: 5 },
  { romanNumber: 'VI', expected: 6 },
  { romanNumber: 'VII', expected: 7 },
  { romanNumber: 'VIII', expected: 8 },
])('convert roman to arabic', ({ romanNumber, expected }) => {
  expect(toArabic(romanNumber)).toBe(expected);
});
