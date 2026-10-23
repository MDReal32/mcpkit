export const toTomlTableKey = (serversPath: readonly string[], name: string) => [...serversPath, name].join('.');
