import { isJsonObject } from "../../../json";

export const validateFixedHeaders = (headers: unknown, location: string) => {
  if (headers === undefined) {
    return [];
  }
  if (!isJsonObject(headers)) {
    return [`${location} must be an object`];
  }
  return Object.entries(headers)
    .filter(([, value]) => typeof value !== "string")
    .map(([name]) => `${location}.${name} must be a string`);
};
