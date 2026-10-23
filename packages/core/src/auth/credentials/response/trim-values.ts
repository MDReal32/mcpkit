export const trimValues = (values: Readonly<Record<string, string>>) =>
  Object.fromEntries(Object.entries(values).map(([key, value]) => [key, value.trim()]));
