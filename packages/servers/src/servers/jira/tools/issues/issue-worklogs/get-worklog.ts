import { defineTool } from "@usemcpkit/core";

export const issuesIssueWorklogsGetWorklog = defineTool({
  name: "issues:issue_worklogs:get_worklog",
  description: "Get worklog. Returns a worklog.",
  input: {
    type: "object",
    properties: {
      issueIdOrKey: {
        type: "string",
        description: "The ID or key of the issue.",
      },
      id: {
        type: "string",
        description: "The ID of the worklog.",
      },
      expand: {
        type: "string",
        default: "",
        description:
          "Use expand to include additional information about work logs in the response. This parameter accepts",
      },
    },
    required: ["issueIdOrKey", "id"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/issue/{issueIdOrKey}/worklog/{id}",
    query: ["expand"],
  },
});
