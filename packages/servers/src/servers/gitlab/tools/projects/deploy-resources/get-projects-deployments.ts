import { defineTool } from "@usemcpkit/core";

export const projectsDeployResourcesGetProjectsDeployments = defineTool({
  name: "projects:deploy_resources:get_projects_deployments",
  description: "Retrieve a deployment. Retrieves a specified deployment.",
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
    method: "GET",
    path: "/projects/{id}/deployments/{deployment_id}",
  },
});
