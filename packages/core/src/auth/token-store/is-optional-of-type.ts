export const isOptionalOfType = (value: unknown, type: "string" | "number") =>
  value === undefined || typeof value === type;
