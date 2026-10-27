import { slugify } from "../../utils/naming/slugify";
import type { GitlabOperation } from "./types/gitlab-operation";

const READ_VERB = "get";

const LIST_VERB = "list";

const VERBS: Record<string, string> = {
  post: "create",
  put: "update",
  patch: "update",
  delete: "delete",
};

const isPathParameter = (segment: string) => segment.startsWith("{");

const LIST_SUMMARY = /^(list|get a list|get all)\b/i;

export const toActionName = ({ method, path, returnsArray, spec }: GitlabOperation) => {
  const isList = returnsArray || LIST_SUMMARY.test(spec.summary ?? "");
  const verb = VERBS[method] ?? (isList ? LIST_VERB : READ_VERB);
  const words = path
    .split("/")
    .filter((segment) => segment !== "" && !isPathParameter(segment))
    .map(slugify)
    .filter((word) => word !== "");
  return [verb, ...words].join("-");
};
