import { describeError } from "../../../errors";
import { isJsonObject } from "../../../json";

const MAX_MATCH_LENGTH = 200;
const NAME_TEMPLATE_PATTERN = /^[a-z0-9_$&]+(:[a-z0-9_$&]+){2,}$/;

const validateRule = (rule: unknown, position: number) => {
  const label = `upstream.naming[${position}]`;
  if (!isJsonObject(rule)) {
    return [`${label} must be an object`];
  }
  const errors: string[] = [];
  if (typeof rule.match !== "string" || rule.match === "" || rule.match.length > MAX_MATCH_LENGTH) {
    errors.push(`${label}.match must be a regular expression of at most ${MAX_MATCH_LENGTH} characters`);
  } else {
    try {
      new RegExp(rule.match);
    } catch (error) {
      errors.push(`${label}.match is not a valid regular expression: ${describeError(error)}`);
    }
  }
  if (typeof rule.name !== "string" || !NAME_TEMPLATE_PATTERN.test(rule.name)) {
    errors.push(`${label}.name must be <group>:<resource>:<action> with $1… or $& for the upstream name`);
  }
  return errors;
};

export const validateUpstreamNaming = (naming: unknown) =>
  Array.isArray(naming) ? naming.flatMap(validateRule) : ["upstream.naming must be a list of rules"];
