export const toArabic = (romanNumber: string): number => {
  const ROMAN_TO_ARABIC: { [key: string]: number } = {
    I: 1,
  };

  return romanNumber.split('').reduce((acc: number, letter: string) => {
    return acc + ROMAN_TO_ARABIC[letter];
  }, 0);
};
