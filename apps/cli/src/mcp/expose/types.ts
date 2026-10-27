export interface ExposedTool {
  /** The MCP tool name, such as `jira_issues_get_issue`. */
  name: string;
  /** The tool id, such as `atlassian:jira:issues:get_issue`. */
  id: string;
}
