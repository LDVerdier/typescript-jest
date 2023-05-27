type AllowedRomanNumbers = 'I' | 'V';
const ROMAN_TO_ARABIC: Record<AllowedRomanNumbers, number> = {
  I: 1,
  V: 5,
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

        if (`${letter}${nextLetter}` === 'IV') {
          return acc - currentValue;
        }

        return acc + currentValue;
      },
      0,
    );
};
