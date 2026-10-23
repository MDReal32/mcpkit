import { defineTool } from "@usemcpkit/core";

export const workflowsIssueTypesGetIssueAllTypes = defineTool({
  name: "workflows:issue_types:get_issue_all_types",
  description: "Get all issue types for user. Returns all issue types.",
  input: {
    type: "object",
    properties: {},
  },
  request: {
    method: "GET",
    path: "/rest/api/2/issuetype",
  },
});
