import { defineTool } from "@usemcpkit/core";

export const issuesEpicsListGroupsEpicsIssues = defineTool({
  name: "issues:epics:list_groups_epics_issues",
  description:
    "List all issues for an epic. Lists all issues assigned to a specified epic that are available to the authenticated user. Responses are paginated and return 20 results by default.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      epic_iid: {
        type: "string",
        description: "Internal ID of the epic.",
      },
      page: {
        type: "integer",
        default: 1,
        description: "Page number of results to retrieve.",
      },
      per_page: {
        type: "integer",
        default: 20,
        description: "Number of items to list per page.",
      },
    },
    required: ["id", "epic_iid"],
  },
  request: {
    method: "GET",
    path: "/groups/{id}/epics/{epic_iid}/issues",
    query: ["page", "per_page"],
  },
});
