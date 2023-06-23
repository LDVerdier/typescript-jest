export const binaryToUnary = (binary: string): string => {
  const prefix = binary[0] === '1' ? '0' : '00';

  const suffix = '0'.repeat(binary.length);

  return `${prefix} ${suffix}`;
};

export const binarsplitBinaryIntoHomogeneBlocksyToUnary = (
  binary: string,
): string[] => {
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
