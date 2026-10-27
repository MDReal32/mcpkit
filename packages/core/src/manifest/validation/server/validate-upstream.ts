import { isJsonObject } from "../../../json";
import { isHttpsUrl } from "../guards/is-https-url";
import { isStringList } from "../guards/is-string-list";

const PROGRAM_NAME_PATTERN = /^[A-Za-z0-9._-]+$/;

export const validateUpstream = (upstream: unknown) => {
  if (!isJsonObject(upstream)) {
    return ["upstream must be an object"];
  }
  if (upstream.type === "http") {
    return isHttpsUrl(upstream.url) ? [] : ["upstream.url must be an https:// URL"];
  }
  if (upstream.type !== "stdio") {
    return ['upstream.type must be "http" or "stdio"'];
  }
  const errors: string[] = [];
  if (typeof upstream.command !== "string" || !PROGRAM_NAME_PATTERN.test(upstream.command)) {
    errors.push("upstream.command must be a program name on PATH, not a path");
  }
  if (upstream.args !== undefined && !isStringList(upstream.args)) {
    errors.push("upstream.args must be a list of strings");
  }
  if (upstream.forwardEnv !== undefined && !isStringList(upstream.forwardEnv)) {
    errors.push("upstream.forwardEnv must be a list of strings");
  }
  return errors;
};
