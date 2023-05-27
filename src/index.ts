type AllowedRomanNumbers = 'I' | 'V' | 'X' | 'L' | 'C' | 'D' | 'M';
const ROMAN_TO_ARABIC: Record<AllowedRomanNumbers, number> = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000,
};

export const toArabic = (romanNumber: string): number => {
  return romanNumber
    .split('')
    .reduce(
      (
        acc: number,
        letter: AllowedRomanNumbers,
        letterIndex: number,
        letters: AllowedRomanNumbers[],
      ) => {
        const currentValue = ROMAN_TO_ARABIC[letter];
        const nextLetter = letters[letterIndex + 1];

        if (
          ['IV', 'IX', 'XL', 'XC', 'CD', 'CM'].includes(
            `${letter}${nextLetter}`,
          )
        ) {
          return acc - currentValue;
        }

        return acc + currentValue;
      },
      0,
    );
};
