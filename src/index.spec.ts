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
  { romanNumber: 'IX', expected: 9 },
  { romanNumber: 'X', expected: 10 },
  { romanNumber: 'XI', expected: 11 },
  { romanNumber: 'XIV', expected: 14 },
  { romanNumber: 'XVI', expected: 16 },
  { romanNumber: 'XIX', expected: 19 },
  { romanNumber: 'XXIX', expected: 29 },
  { romanNumber: 'XL', expected: 40 },
  { romanNumber: 'L', expected: 50 },
])('convert roman to arabic', ({ romanNumber, expected }) => {
  expect(toArabic(romanNumber)).toBe(expected);
});
