export const warnOnStderr = (message: string) => {
  process.stderr.write(`${message}\n`);
};
