export const findDuplicates = (values: readonly unknown[]) => [
  ...new Set(values.filter((value, index) => values.indexOf(value) !== index)),
];
