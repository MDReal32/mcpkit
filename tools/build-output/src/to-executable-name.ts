export const toExecutableName = (name: string) => (process.platform === "win32" ? `${name}.exe` : name);
