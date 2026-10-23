import { defineTool } from "@usemcpkit/core";

export const issuesIssueWorklogsGetWorklogsForIds = defineTool({
  name: "issues:issue_worklogs:get_worklogs_for_ids",
  description: "Get worklogs. Returns worklog details for a list of worklog IDs.",
  input: {
    type: "object",
    properties: {
      expand: {
        type: "string",
        default: "",
        description:
          "Use expand to include additional information about worklogs in the response. This parameter accepts `properties` that returns the properties of each worklog.",
      },
      ids: {
        type: "array",
        description: "A list of worklog IDs.",
        items: {
          type: "integer",
        },
      },
    },
    required: ["ids"],
  },
  request: {
    method: "POST",
    path: "/rest/api/2/worklog/list",
    query: ["expand"],
    body: ["ids"],
  },
});
