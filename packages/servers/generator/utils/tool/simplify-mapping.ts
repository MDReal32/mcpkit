export const simplifyMapping = (mapping: Record<string, string>) =>
  Object.entries(mapping).every(([key, argName]) => key === argName) ? Object.keys(mapping) : mapping;
