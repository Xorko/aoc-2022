export const add = (acc: number, curr: number): number => acc + curr;
export const subtract = (acc: number, curr: number): number => acc - curr;
export const multiply = (acc: number, curr: number): number => acc * curr;
export const divide = (acc: number, curr: number): number => acc / curr;
export const max = (acc: number, curr: number): number => Math.max(acc, curr);
export const min = (acc: number, curr: number): number => Math.min(acc, curr);
export const concat = (acc: string, curr: string): string => acc + curr;
export const concatWithSeparator = (
  separator: string,
  acc: string,
  curr: string,
): string => (acc === "" ? curr : `${acc}${separator}${curr}`);
export const concatWithNewline = concatWithSeparator.bind(null, "\n");
export const concatWithComma = concatWithSeparator.bind(null, ",");
export const concatWithSpace = concatWithSeparator.bind(null, " ");
export const concatWithCommaAndSpace = concatWithSeparator.bind(null, ", ");
export const concatWithCommaAndNewline = concatWithSeparator.bind(null, ",\n");
