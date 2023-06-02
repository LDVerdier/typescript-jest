/**
 * I + I = II
 * IV + X = XIV
 * XCIX + I = C
 * CXXIV + MDCCCXCV = MMXIX
 */

export const addTwoRomanNumerals = (a: string, b: string) => {
  const translations: string[] = ['X', 'IV', 'I'];
  const indexOfA = translations.indexOf(a);
  const indexOfB = translations.indexOf(b);

  let result = indexOfA < indexOfB ? a + b : b + a;

  const hashmap = {
    IIIII: 'V',
    IIII: 'IV',
    VIV: 'IX',
  };

  Object.entries(hashmap).forEach(([key, value]) => {
    result = result.replace(key, value);
  });

  return result;
};
