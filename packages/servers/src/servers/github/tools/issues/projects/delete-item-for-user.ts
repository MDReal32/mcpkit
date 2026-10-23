import { defineTool } from "@usemcpkit/core";

export const issuesProjectsDeleteItemForUser = defineTool({
  name: "issues:projects:delete_item_for_user",
  description: "Delete project item for user. Delete a specific item from a user-owned project.",
  input: {
    type: "object",
    properties: {
      project_number: {
        type: "integer",
        description: "The project's number.",
      },
      username: {
        type: "string",
        description: "The handle for the GitHub user account.",
      },
      item_id: {
        type: "integer",
        description: "The unique identifier of the project item.",
      },
    },
    required: ["project_number", "username", "item_id"],
  },
  request: {
    method: "DELETE",
    path: "/users/{username}/projectsV2/{project_number}/items/{item_id}",
  },
});
