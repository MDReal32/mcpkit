import { isJsonObject } from "../../../json";
import { isHttpsUrl } from "../guards/is-https-url";
import { isStringList } from "../guards/is-string-list";

const PROGRAM_NAME_PATTERN = /^[A-Za-z0-9._-]+$/;
const REF_PATTERN = /^[A-Za-z0-9._][A-Za-z0-9._/-]*$/;

const validateSetupStep = (step: unknown, position: number) => {
  const label = `upstream.repo.setup[${position}]`;
  if (!isJsonObject(step)) {
    return [`${label} must be an object`];
  }
  const errors: string[] = [];
  if (typeof step.command !== "string" || !PROGRAM_NAME_PATTERN.test(step.command)) {
    errors.push(`${label}.command must be a program name on PATH, not a path`);
  }
  if (step.args !== undefined && !isStringList(step.args)) {
    errors.push(`${label}.args must be a list of strings`);
  }
  return errors;
};

export const validateUpstreamRepo = (repo: unknown) => {
  if (!isJsonObject(repo)) {
    return ["upstream.repo must be an object"];
  }
  const errors: string[] = [];
  if (!isHttpsUrl(repo.url)) {
    errors.push("upstream.repo.url must be an https:// URL");
  }
  if (typeof repo.ref !== "string" || !REF_PATTERN.test(repo.ref)) {
    errors.push("upstream.repo.ref must be a commit, tag or branch, not starting with '-'");
  }
  if (repo.setup !== undefined) {
    if (Array.isArray(repo.setup)) {
      errors.push(...repo.setup.flatMap(validateSetupStep));
    } else {
      errors.push("upstream.repo.setup must be a list of steps");
    }
  }
  return errors;
};
