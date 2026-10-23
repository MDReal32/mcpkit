import { defineTool } from "@usemcpkit/core";

export const issuesDiscussionsGetGroupsEpicsDiscussions = defineTool({
  name: "issues:discussions:get_groups_epics_discussions",
  description: "Retrieve a discussion for an epic. Retrieves a specified discussion for an epic.",
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
    path: "/groups/{id}/epics/{noteable_id}/discussions/{discussion_id}",
  },
});
