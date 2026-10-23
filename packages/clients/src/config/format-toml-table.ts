import { formatTomlValue } from './format-toml-value';

export const formatTomlTable = (tableKey: string, entry: Record<string, unknown>) => [
  `[${tableKey}]`,
  ...Object.entries(entry).map(([key, value]) => `${key} = ${formatTomlValue(value)}`),
];
