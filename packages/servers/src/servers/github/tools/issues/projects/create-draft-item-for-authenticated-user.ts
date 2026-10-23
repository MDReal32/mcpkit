import { defineTool } from "@usemcpkit/core";

export const issuesProjectsCreateDraftItemForAuthenticatedUser = defineTool({
  name: "issues:projects:create_draft_item_for_authenticated_user",
  description:
    "Create draft item for user owned project. Create draft issue item for the specified user owned project.",
  input: {
    type: "object",
    properties: {
      user_id: {
        type: "string",
        description: "The unique identifier of the user.",
      },
      project_number: {
        type: "integer",
        description: "The project's number.",
      },
      title: {
        type: "string",
        description: "The title of the draft issue item to create in the project.",
      },
      body: {
        type: "string",
        description: "The body content of the draft issue item to create in the project.",
      },
    },
    required: ["user_id", "project_number", "title"],
  },
  request: {
    method: "POST",
    path: "/user/{user_id}/projectsV2/{project_number}/drafts",
    body: ["title", "body"],
  },
});
