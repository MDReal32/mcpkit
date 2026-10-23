import { defineTool } from "@usemcpkit/core";

export const issuesDiscussionsGetGroupsEpicsDiscussionsNotes = defineTool({
  name: "issues:discussions:get_groups_epics_discussions_notes",
  description: "Retrieve a comment from an epic discussion. Retrieves a specified comment from a epic discussion.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the group.",
      },
      noteable_id: {
        type: "integer",
        description: "ID of the epic.",
      },
      discussion_id: {
        type: "string",
        description: "ID of the discussion.",
      },
      note_id: {
        type: "integer",
        description: "ID of the discussion note.",
      },
    },
    required: ["id", "noteable_id", "discussion_id", "note_id"],
  },
  request: {
    method: "GET",
    path: "/groups/{id}/epics/{noteable_id}/discussions/{discussion_id}/notes/{note_id}",
  },
});
