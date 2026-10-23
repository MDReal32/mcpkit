import { defineTool } from "@usemcpkit/core";

export const projectsDeployResourcesDeleteProjectsDeployments = defineTool({
  name: "projects:deploy_resources:delete_projects_deployments",
  description:
    "Delete a deployment. Deletes a specified deployment that is not currently the last deployment for an environment or in a `running` state.",
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
    },
    required: ["id", "deployment_id"],
  },
  request: {
    method: "DELETE",
    path: "/projects/{id}/deployments/{deployment_id}",
  },
});
