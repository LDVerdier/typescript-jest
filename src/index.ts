type AllowedRomanNumbers = 'I' | 'V';
const ROMAN_TO_ARABIC: Record<AllowedRomanNumbers, number> = {
  I: 1,
  V: 5,
};

export const toArabic = (romanNumber: string): number => {
  return romanNumber
    .split('')
    .reduce((acc: number, letter: AllowedRomanNumbers) => {
      const currentValue = ROMAN_TO_ARABIC[letter];

      return acc + currentValue;
    }, 0);
};
