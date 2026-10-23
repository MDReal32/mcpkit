import { defineTool } from "@usemcpkit/core";

export const issuesProjectsGetUserItem = defineTool({
  name: "issues:projects:get_user_item",
  description: "Get an item for a user owned project. Get a specific item from a user-owned project.",
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
      fields: {
        description:
          "Limit results to specific fields, by their IDs. If not specified, the title field will be returned.",
      },
    },
    required: ["project_number", "username", "item_id"],
  },
  request: {
    method: "GET",
    path: "/users/{username}/projectsV2/{project_number}/items/{item_id}",
    query: ["fields"],
  },
});
