import { toArabic } from './index';

test.each([{ romanNumber: 'I', expected: 1 }])(
  'convert roman to arabic',
  ({ romanNumber, expected }) => {
    expect(toArabic(romanNumber)).toBe(expected);
  },
);
