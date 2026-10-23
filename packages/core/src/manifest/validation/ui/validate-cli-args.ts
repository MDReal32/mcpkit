import { UI_DOMAIN_PLACEHOLDERS } from "../../ui/const";
import { readPlaceholders } from "../../ui/read-placeholders";

export const validateCliArgs = (args: unknown, location: string, hasDomain: boolean) => {
  if (!Array.isArray(args) || !args.every((arg) => typeof arg === "string")) {
    return [`${location}.args must be an array of strings`];
  }
  const placeholders = args.flatMap((arg) => readPlaceholders(arg));
  const unknown = placeholders.filter((name) => !UI_DOMAIN_PLACEHOLDERS.includes(name));
  if (unknown.length > 0) {
    return [`${location}.args has unknown placeholders: ${unknown.map((name) => `{${name}}`).join(", ")}`];
  }
  if (!hasDomain && placeholders.length > 0) {
    return [`${location}.args uses the domain, so the manifest needs a domain`];
  }
  return [];
};
