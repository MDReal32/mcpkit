export const findDuplicate = (values: string[]) => {
  const seen = new Set<string>();
  return values.find((value) => {
    if (seen.has(value)) {
      return true;
    }
    seen.add(value);
    return false;
  });
};
