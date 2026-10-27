import { TOOL_ID_SEPARATOR } from "../tools/const";
import { PATTERN_WILDCARD } from "./const";

const withoutCategory = (id: string) => id.slice(id.indexOf(TOOL_ID_SEPARATOR) + 1);

const matchesPrefix = (id: string, prefix: string) => id === prefix || id.startsWith(`${prefix}${TOOL_ID_SEPARATOR}`);

/**
 * A pattern is a tool id or the leading part of one, with or without its category and with an optional trailing `*`:
 * `atlassian:jira:issues`, `jira:issues:*` and `jira` all select every Jira issues tool.
 */
export const matchesExposedTool = (id: string, pattern: string) => {
  const prefix = pattern.endsWith(PATTERN_WILDCARD) ? pattern.slice(0, -1).replace(/:$/, "") : pattern;
  return matchesPrefix(id, prefix) || matchesPrefix(withoutCategory(id), prefix);
};
