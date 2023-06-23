export const binaryToUnary = (binary: string): string => {
  const prefix = binary[0] === '1' ? '0' : '00';

  const suffix = '0'.repeat(binary.length);

  return `${prefix} ${suffix}`;
};

export const binarsplitBinaryIntoHomogeneBlocksyToUnary = (
  binary: string,
): string[] => {
  return [binary];
};
