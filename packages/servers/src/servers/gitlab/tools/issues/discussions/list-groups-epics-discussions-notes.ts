import { defineTool } from "@usemcpkit/core";

export const issuesDiscussionsListGroupsEpicsDiscussionsNotes = defineTool({
  name: "issues:discussions:list_groups_epics_discussions_notes",
  description: "List comments in an epic discussion. Lists the comments in a specified epic discussion.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      discussion_id: {
        type: "string",
        description: "ID of the discussion.",
      },
      noteable_id: {
        type: "integer",
        description: "ID of the epic.",
      },
    },
    required: ["id", "discussion_id", "noteable_id"],
  },
  request: {
    method: "GET",
    path: "/groups/{id}/epics/{noteable_id}/discussions/{discussion_id}/notes",
  },
});
