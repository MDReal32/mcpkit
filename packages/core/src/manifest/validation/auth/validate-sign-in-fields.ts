import { isPort } from "../guards/is-port";
import { isStringList } from "../guards/is-string-list";

/** Fields shared by every interactive auth type. */
export const validateSignInFields = (auth: Readonly<Record<string, unknown>>, location: string) => {
  const errors: string[] = [];
  if (auth.scopes !== undefined && !isStringList(auth.scopes)) {
    errors.push(`${location}.scopes must be an array of strings`);
  }
  if (auth.redirectPort !== undefined && !isPort(auth.redirectPort)) {
    errors.push(`${location}.redirectPort must be an integer between 0 and 65535`);
  }
  return errors;
};
