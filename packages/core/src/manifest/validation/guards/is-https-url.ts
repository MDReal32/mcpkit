export const isHttpsUrl = (value: unknown): value is string =>
  typeof value === "string" && value.startsWith("https://");
