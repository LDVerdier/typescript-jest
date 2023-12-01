import { readFileSync } from 'fs';

const syncReadFile = (path: string) => {
  const result = readFileSync(path, 'utf-8');

  return result;
};

const convertLinesToArray = (lines: string): string[] => {
  return lines.split(/\n/);
};

export const extractValuesFromFile = (filename: string): string[] => {
  const lines = syncReadFile(filename);

  return convertLinesToArray(lines);
};
