import { isJsonObject } from '../../../json';

export const validateFixedValues = (values: unknown, location: string) => {
  if (values === undefined) {
    return [];
  }
  if (!isJsonObject(values)) {
    return [`${location} must be an object`];
  }
  return Object.entries(values)
    .filter(([, value]) => !['string', 'number', 'boolean'].includes(typeof value))
    .map(([key]) => `${location}.${key} must be a string, number or boolean`);
};
