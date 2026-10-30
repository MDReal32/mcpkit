import { TOOL_ID_SEPARATOR } from "../tools/const";
import { MAX_TOOL_NAME_LENGTH, NAME_PART_SEPARATOR } from "./const";
import { hashText } from "./hash-text";

const INVALID_NAME_CHARACTERS = /[^A-Za-z0-9_-]/g;
const TRAILING_SEPARATORS = /_+$/;

const dropRepeatedParts = (parts: readonly string[]) => parts.filter((part, index) => part !== parts[index - 1]);

const cutAtWordBoundary = (name: string, length: number) => {
  const cut = name.slice(0, length);
  const boundary = cut.lastIndexOf(NAME_PART_SEPARATOR);
  const kept = boundary > length / 2 ? cut.slice(0, boundary) : cut;
  return kept.replace(TRAILING_SEPARATORS, "");
};

/**
 * `git:github` with `issues:issues:get_issue` is `git_github_issues_get_issue`: a group and resource that repeat each
 * other are named once. A name that does not fit is cut
 * at a word boundary and ends in a hash of the full id, so it stays the same from run to run and the client's
 * permission rules keep matching. An empty `tool` names a server section: `git:github` is `git_github`. `attempt` is bumped by the caller when two tools land on the same name.
 */
export const createToolName = (serverId: string, tool: string, attempt = 0) => {
  const id = `${serverId}${TOOL_ID_SEPARATOR}${tool}`;
  const name = [
    ...serverId.split(TOOL_ID_SEPARATOR),
    ...dropRepeatedParts(tool.split(TOOL_ID_SEPARATOR).filter((part) => part !== "")),
  ]
    .join(NAME_PART_SEPARATOR)
    .replace(INVALID_NAME_CHARACTERS, "_");
  if (attempt === 0 && name.length <= MAX_TOOL_NAME_LENGTH) {
    return name;
  }
  const suffix = `${NAME_PART_SEPARATOR}${hashText(attempt === 0 ? id : `${id}#${attempt}`)}`;
  return `${cutAtWordBoundary(name, MAX_TOOL_NAME_LENGTH - suffix.length)}${suffix}`;
};
