import { defineTool } from "@usemcpkit/core";

export const issuesEpicsListGroupsRelatedEpicLinks = defineTool({
  name: "issues:epics:list_groups_related_epic_links",
  description:
    "List all related epic links for a group. Lists all related epic links for a specified group and its subgroups. The user needs to have access to both the `source_epic` and `target_epic` to view the related epic link.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      updated_before: {
        type: "string",
        description: "Return related epic links updated on or before the specified time.",
      },
      updated_after: {
        type: "string",
        description: "Return related epic links updated on or after the specified time.",
      },
      created_before: {
        type: "string",
        description: "Return related epic links created on or before the specified time.",
      },
      created_after: {
        type: "string",
        description: "Return related epic links created on or after the specified time.",
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
    required: ["id"],
  },
  request: {
    method: "GET",
    path: "/groups/{id}/related_epic_links",
    query: ["updated_before", "updated_after", "created_before", "created_after", "page", "per_page"],
  },
});
