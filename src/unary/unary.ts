export const identicalBitsToUnary = (identicalBits: string): string => {
  const prefix = identicalBits[0] === '1' ? '0' : '00';

  const suffix = '0'.repeat(identicalBits.length);

  return `${prefix} ${suffix}`;
};

export const splitBitsIntoIdenticalBitGroups = (binary: string): string[] => {
  return binary.split('').reduce((arr: string[], currentBit: string) => {
    if (arr.length === 0) {
      arr.push(currentBit);

      return arr;
    }
    const lastStoredBit = arr[arr.length - 1][0];

    if (lastStoredBit === currentBit) {
      arr[arr.length - 1] += currentBit;
    } else {
      arr.push(currentBit);
    }

    return arr;
  }, []);
};

export const bitsToUnary = (bits: string): string => {
  return '';
};
