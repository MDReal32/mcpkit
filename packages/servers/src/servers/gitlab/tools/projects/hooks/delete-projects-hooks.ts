import { defineTool } from "@usemcpkit/core";

export const projectsHooksDeleteProjectsHooks = defineTool({
  name: "projects:hooks:delete_projects_hooks",
  description: "Delete a project webhook. Deletes a specified webhook for a project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      hook_id: {
        type: "integer",
        description: "ID of the project webhook.",
      },
    },
    required: ["id", "hook_id"],
  },
  request: {
    method: "DELETE",
    path: "/projects/{id}/hooks/{hook_id}",
  },
});
