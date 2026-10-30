import { isJsonObject } from "../../../json";
import { isHttpsUrl } from "../guards/is-https-url";
import { isStringList } from "../guards/is-string-list";
import { validateUpstreamNaming } from "./validate-upstream-naming";
import { validateUpstreamRepo } from "./validate-upstream-repo";

const PROGRAM_NAME_PATTERN = /^[A-Za-z0-9._-]+$/;

const validateHttp = (upstream: Record<string, unknown>) =>
  isHttpsUrl(upstream.url) ? [] : ["upstream.url must be an https:// URL"];

const validateStdio = (upstream: Record<string, unknown>) => {
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
  if (upstream.optionalEnv !== undefined && !isStringList(upstream.optionalEnv)) {
    errors.push("upstream.optionalEnv must be a list of strings");
  }
  if (upstream.repo !== undefined) {
    errors.push(...validateUpstreamRepo(upstream.repo));
  }
  return errors;
};

export const validateUpstream = (upstream: unknown) => {
  if (!isJsonObject(upstream)) {
    return ["upstream must be an object"];
  }
  if (upstream.type !== "http" && upstream.type !== "stdio") {
    return ['upstream.type must be "http" or "stdio"'];
  }
  const transport = upstream.type === "http" ? validateHttp(upstream) : validateStdio(upstream);
  return [...transport, ...(upstream.naming === undefined ? [] : validateUpstreamNaming(upstream.naming))];
};
