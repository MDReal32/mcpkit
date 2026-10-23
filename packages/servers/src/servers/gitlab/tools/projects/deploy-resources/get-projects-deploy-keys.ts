import { defineTool } from "@usemcpkit/core";

export const projectsDeployResourcesGetProjectsDeployKeys = defineTool({
  name: "projects:deploy_resources:get_projects_deploy_keys",
  description: "Retrieve a deploy key. Retrieves a specified deploy key.",
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
    method: "GET",
    path: "/projects/{id}/deploy_keys/{key_id}",
  },
});
