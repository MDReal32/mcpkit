import { defineTool } from "@usemcpkit/core";

export const issuesEpicsListGroupsEpicsRelatedEpics = defineTool({
  name: "issues:epics:list_groups_epics_related_epics",
  description: "List all linked epics for an epic. Lists all linked epics for a specified epic.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      epic_iid: {
        type: "integer",
        description: "Internal ID of the epic.",
      },
    },
    required: ["id", "epic_iid"],
  },
  request: {
    method: "GET",
    path: "/groups/{id}/epics/{epic_iid}/related_epics",
  },
});
