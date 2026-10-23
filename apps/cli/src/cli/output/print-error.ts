export const printError = (text: string) => {
  process.stderr.write(`${text}\n`);
};
