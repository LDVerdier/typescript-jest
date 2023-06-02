import { addTwoRomanNumerals } from './index';

/**
 * Add two roman numbers
 *
 * The main intent of this kata is to practice Mob Programming and agree on a preferred mobbing style for the team.
 * For this we will run a variant of the Roman Numerals Converter kata, where we intend this time to calculate the sum of 2 roman numbers.
 * To add a bit of fun, we will do it without any use of integers
 *
 * Examples:
 *
 * I + I = II
 * IV + X = XIV
 * XCIX + I = C
 * CXXIV + MDCCCXCV = MMXIX
 */

test.each([
  { a: 'I', b: 'I', result: 'II' },
  { a: 'II', b: 'II', result: 'IV' },
  { a: 'III', b: 'II', result: 'V' },
  { a: 'V', b: 'I', result: 'VI' },
  { a: 'V', b: 'IV', result: 'IX' },
  { a: 'IV', b: 'X', result: 'XIV' },
])('add numbers', ({ a, b, result }) => {
  expect(addTwoRomanNumerals(a, b)).toBe(result);
  expect(addTwoRomanNumerals(b, a)).toBe(result);
});
