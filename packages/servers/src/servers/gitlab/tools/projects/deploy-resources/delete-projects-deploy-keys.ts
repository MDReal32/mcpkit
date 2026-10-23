import { defineTool } from "@usemcpkit/core";

export const projectsDeployResourcesDeleteProjectsDeployKeys = defineTool({
  name: "projects:deploy_resources:delete_projects_deploy_keys",
  description:
    "Delete a deploy key. Deletes a deploy key from the project. If the deploy key is used only for this project, it is deleted from the system.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      key_id: {
        type: "integer",
        description: "ID of the deploy key.",
      },
    },
    required: ["id", "key_id"],
  },
  request: {
    method: "DELETE",
    path: "/projects/{id}/deploy_keys/{key_id}",
  },
});
