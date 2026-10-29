/** Single-quotes an argument for the `/bin/sh` that cron runs each line with. */
export const quoteShellArg = (arg: string) => `'${arg.replaceAll("'", `'\\''`)}'`;
