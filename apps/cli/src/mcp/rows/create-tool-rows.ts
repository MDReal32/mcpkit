import { TOOL_ID_SEPARATOR } from "../tools/const";
import type { Catalog } from "../types/catalog";
import { ACTION_WORD_SEPARATOR, RESOURCE_AND_ACTION_PARTS, ROW_NAME_SEPARATOR } from "./const";
import type { ToolRow } from "./tool-row";

const splitTool = (tool: string) => {
  const parts = tool.split(TOOL_ID_SEPARATOR);
  const group = parts.slice(0, -RESOURCE_AND_ACTION_PARTS);
  const operation = parts.slice(-RESOURCE_AND_ACTION_PARTS).join(TOOL_ID_SEPARATOR);
  const verb = (parts.at(-1) ?? "").split(ACTION_WORD_SEPARATOR)[0] ?? "";
  return { group, operation, verb };
};

/**
 * One row per server, group and verb: `atlassian:jira` with tool `issues:issues:get_issue` lands in the row
 * `atlassian_jira_issues_get`, which also holds `issues:issue_comments:get_comments`. Built from tool names alone.
 */
export const createToolRows = (catalog: Catalog) => {
  const rows = new Map<string, ToolRow>();
  for (const server of catalog.servers) {
    for (const tool of server.tools) {
      const { group, operation, verb } = splitTool(tool);
      const name = [...server.id.split(TOOL_ID_SEPARATOR), ...group, verb].join(ROW_NAME_SEPARATOR);
      const row = rows.get(name) ?? {
        name,
        description: `Runs one ${server.id}${group.map((part) => ` ${part}`).join("")} tool whose action starts with "${verb}". Pass its "<resource>:<action>" as "tool" (see list_tools) and its arguments as "arguments".`,
        verb,
        serverId: server.id,
        group,
        operations: [],
      };
      rows.set(name, { ...row, operations: [...row.operations, operation] });
    }
  }
  return [...rows.values()];
};
