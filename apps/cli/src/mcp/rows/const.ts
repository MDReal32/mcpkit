export const ROW_NAME_SEPARATOR = "_";

/** The verb of a tool is the first word of its action name: `get_issue` is `get`. */
export const ACTION_WORD_SEPARATOR = "_";

/** A tool name is `<group>:<resource>:<action>`; the group is everything before the last two parts. */
export const RESOURCE_AND_ACTION_PARTS = 2;

/** Verbs that read, plus the ones that only close or restrict something: `disable` is safe, `enable` is not. */
export const SAFE_VERBS: readonly string[] = [
  "get",
  "list",
  "search",
  "find",
  "count",
  "read",
  "check",
  "download",
  "export",
  "validate",
  "compare",
  "diff",
  "fetch",
  "parse",
  "render",
  "analyse",
  "evaluate",
  "match",
  "expand",
  "suggested",
  "codeowners",
  "ping",
  "root",
  "is",
  "code",
  "commits",
  "issues",
  "labels",
  "repos",
  "topics",
  "users",
  "disable",
  "lock",
  "block",
  "suspend",
  "stop",
];

export const DESTRUCTIVE_VERBS: readonly string[] = ["delete", "remove", "revoke", "trash", "purge", "cancel"];
