import { defineTool } from "@usemcpkit/core";

export const workflowsIssueTypesGetIssueType = defineTool({
  name: "workflows:issue_types:get_issue_type",
  description: "Get issue type. Returns an issue type.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "The ID of the issue type.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/issuetype/{id}",
  },
});
