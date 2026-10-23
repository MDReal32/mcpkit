import { defineTool } from "@usemcpkit/core";

export const issuesEpicsCreateGroupsEpicsTodo = defineTool({
  name: "issues:epics:create_groups_epics_todo",
  description:
    "Create a to-do item for an epic. Creates a to-do item for the current user on a specified epic. If a to-do item already exists for the user on that epic, status code 304 is returned.",
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
    method: "POST",
    path: "/groups/{id}/epics/{epic_iid}/todo",
  },
});
