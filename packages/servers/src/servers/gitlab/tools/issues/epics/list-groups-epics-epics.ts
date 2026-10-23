import { defineTool } from "@usemcpkit/core";

export const issuesEpicsListGroupsEpicsEpics = defineTool({
  name: "issues:epics:list_groups_epics_epics",
  description: "Get related epics. Lists all child epics of an epic.",
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
    path: "/groups/{id}/(-/)epics/{epic_iid}/epics",
  },
});
