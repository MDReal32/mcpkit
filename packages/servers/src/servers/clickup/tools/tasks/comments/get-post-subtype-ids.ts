import { defineTool } from "@usemcpkit/core";

export const tasksCommentsGetPostSubtypeIds = defineTool({
  name: "tasks:comments:get_post_subtype_ids",
  description:
    "Get Post Subtype IDs. Get the ID of each post subtype (Announcement, Discussion, Idea, and Update) for your Workspace, to use when sending a message with `type: post`. \\ \\ Subtype IDs are unique to each Workspace.",
  input: {
    type: "object",
    properties: {
      workspace_id: {
        type: "integer",
        description: "ID of the logged-in user's Workspace.",
      },
      comment_type: {
        type: "string",
        enum: ["post", "ai", "syncup", "ai_via_brain"],
      },
    },
    required: ["workspace_id", "comment_type"],
  },
  request: {
    method: "GET",
    path: "/v3/workspaces/{workspace_id}/comments/types/{comment_type}/subtypes",
  },
});
