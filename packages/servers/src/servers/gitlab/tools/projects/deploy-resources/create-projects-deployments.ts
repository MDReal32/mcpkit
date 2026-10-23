import { defineTool } from "@usemcpkit/core";

export const projectsDeployResourcesCreateProjectsDeployments = defineTool({
  name: "projects:deploy_resources:create_projects_deployments",
  description: "Create a deployment. Creates a deployment.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      environment: {
        type: "string",
        description: "Name of the environment to create the deployment for.",
      },
      sha: {
        type: "string",
        description: "SHA of the commit that is deployed.",
      },
      ref: {
        type: "string",
        description: "Name of the branch or tag that is deployed.",
      },
      tag: {
        type: "boolean",
        description: "If `true`, the deployed ref is a tag.",
      },
      status: {
        type: "string",
        description: "Status of the deployment that is created.",
        enum: ["running", "success", "failed", "canceled"],
      },
    },
    required: ["id", "environment", "sha", "ref", "tag", "status"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/deployments",
    body: ["environment", "sha", "ref", "tag", "status"],
  },
});
