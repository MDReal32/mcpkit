import { defineTool } from "@usemcpkit/core";

export const projectsDeployResourcesUpdateProjectsDeployments = defineTool({
  name: "projects:deploy_resources:update_projects_deployments",
  description: "Update a deployment. Updates a specified deployment.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      deployment_id: {
        type: "integer",
        description: "ID of the deployment.",
      },
      status: {
        type: "string",
        description: "New status of the deployment.",
        enum: ["running", "success", "failed", "canceled"],
      },
    },
    required: ["id", "deployment_id", "status"],
  },
  request: {
    method: "PUT",
    path: "/projects/{id}/deployments/{deployment_id}",
    body: ["status"],
  },
});
