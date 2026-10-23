import { defineTool } from "@usemcpkit/core";

export const issuesIssueWorklogsGetIdsOfWorklogsModifiedSince = defineTool({
  name: "issues:issue_worklogs:get_ids_of_worklogs_modified_since",
  description:
    "Get IDs of updated worklogs. Returns a list of IDs and update timestamps for worklogs updated after a date and time.",
  input: {
    type: "object",
    properties: {
      since: {
        type: "integer",
        default: 0,
        description:
          "The date and time, as a UNIX timestamp in milliseconds, after which updated worklogs are returned.",
      },
      expand: {
        type: "string",
        default: "",
        description:
          "Use expand to include additional information about worklogs in the response. This parameter accepts `properties` that returns the properties of each worklog.",
      },
    },
  },
  request: {
    method: "GET",
    path: "/rest/api/2/worklog/updated",
    query: ["since", "expand"],
  },
});
