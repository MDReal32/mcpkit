export const parseVersion = (version: string) => version.split('.').map((part) => Number.parseInt(part, 10) || 0);
