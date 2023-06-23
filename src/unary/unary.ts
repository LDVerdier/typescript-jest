export const bitGroupToUnary = (identicalBits: string): string => {
  const prefix = identicalBits[0] === '1' ? '0' : '00';

  const suffix = '0'.repeat(identicalBits.length);

  return `${prefix} ${suffix}`;
};

export const splitBitsIntoIdenticalBitGroups = (bits: string): string[] => {
  return bits.split('').reduce((arr: string[], currentBit: string) => {
    if (arr.length === 0) {
      arr.push(currentBit);

      return arr;
    }
    const lastStoredBit = arr[arr.length - 1][0];

    if (lastStoredBit === currentBit) {
      arr[arr.length - 1] += currentBit;

      return arr;
    }
    arr.push(currentBit);

    return arr;
  }, []);
};

export const charsToSevenBits = (chars: string): string => {
  return chars
    .split('')
    .map((char) => char.charCodeAt(0).toString(2).padStart(7, '0'))
    .join('');
};

export const bitsToUnary = (bits: string): string => {
  const bitGroups = splitBitsIntoIdenticalBitGroups(bits);

  return bitGroups.map((bitGroup) => bitGroupToUnary(bitGroup)).join(' ');
};

export const charsToUnary = (chars: string): string => {
  const bits = charsToSevenBits(chars);

  return bitsToUnary(bits);
};
