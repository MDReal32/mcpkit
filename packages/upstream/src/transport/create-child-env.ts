import { FORWARDED_ENV_NAMES } from "../const";

export const createChildEnv = (env: Readonly<Record<string, string>> | undefined) => {
  const inherited = Object.fromEntries(
    FORWARDED_ENV_NAMES.flatMap((name) => {
      const value = process.env[name];
      return value === undefined ? [] : [[name, value]];
    }),
  );
  return { ...inherited, ...env };
};
