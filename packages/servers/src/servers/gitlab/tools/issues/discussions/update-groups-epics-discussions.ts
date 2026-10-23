import { defineTool } from "@usemcpkit/core";

export const issuesDiscussionsUpdateGroupsEpicsDiscussions = defineTool({
  name: "issues:discussions:update_groups_epics_discussions",
  description: "Resolve or unresolve an epic discussion. Resolves or unresolves a specified epic discussion.",
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
      resolved: {
        type: "boolean",
        description: "If `true`, resolves the discussion. If `false`, reopens the discussion.",
      },
    },
    required: ["id", "noteable_id", "discussion_id", "resolved"],
  },
  request: {
    method: "PUT",
    path: "/groups/{id}/epics/{noteable_id}/discussions/{discussion_id}",
    body: ["resolved"],
  },
});
