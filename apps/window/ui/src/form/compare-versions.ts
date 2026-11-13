import { versionNumbers } from "./version-numbers";

/** Compares versions by their numbers like the server does (`3.9` < `3.14`); a missing number counts as 0. */
export const compareVersions = (left: string, right: string) => {
  const [leftNumbers, rightNumbers] = [versionNumbers(left), versionNumbers(right)];
  const length = Math.max(leftNumbers.length, rightNumbers.length);
  for (let index = 0; index < length; index += 1) {
    const difference = (leftNumbers[index] ?? 0) - (rightNumbers[index] ?? 0);
    if (difference !== 0) {
      return Math.sign(difference);
    }
  }
  return 0;
};
