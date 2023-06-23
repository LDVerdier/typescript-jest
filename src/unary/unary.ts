export const binaryToUnary = (binary: string): string => {
  const prefix = binary === '1' ? '0' : '00';

  const suffix = '0';

  return `${prefix} ${suffix}`;
};
