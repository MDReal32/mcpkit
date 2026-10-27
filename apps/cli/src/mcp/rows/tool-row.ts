export interface ToolRow {
  /** The MCP tool name, such as `atlassian_jira_issues_get`. */
  name: string;
  description: string;
  /** The first word of the action names this row covers. */
  verb: string;
  serverId: string;
  /** The group parts of the tool names this row covers, such as `["issues"]`. */
  group: readonly string[];
  /** The `<resource>:<action>` tails the row covers, such as `issues:get_issue`. */
  operations: readonly string[];
}
