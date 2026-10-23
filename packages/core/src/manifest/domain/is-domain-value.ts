import { DOMAIN_VALUE_PATTERN } from "../const";

export const isDomainValue = (value: unknown): value is string =>
  typeof value === "string" && DOMAIN_VALUE_PATTERN.test(value);
