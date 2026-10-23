import { defineTool } from "@usemcpkit/core";

export const issuesIssuesGetIssues = defineTool({
  name: "issues:issues:get_issues",
  description: "Retrieve an issue. Retrieves a specified issue. Administrators only.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID of the issue.",
      },
    },
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/issues/{id}",
  },
});
