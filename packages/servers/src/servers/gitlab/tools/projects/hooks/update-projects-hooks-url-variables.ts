import { defineTool } from "@usemcpkit/core";

export const projectsHooksUpdateProjectsHooksUrlVariables = defineTool({
  name: "projects:hooks:update_projects_hooks_url_variables",
  description: "Update a URL variable. Updates a URL variable for a specified webhook.",
  input: {
    type: "object",
    properties: {
      hook_id: {
        type: "integer",
        description: "ID of the hook.",
      },
      key: {
        type: "string",
        description: "Key of the URL variable.",
      },
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      value: {
        type: "string",
        description: "Value of the URL variable.",
      },
    },
    required: ["hook_id", "key", "id", "value"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/hooks/{hook_id}/url_variables/{key}",
    body: ["value"],
  },
});
