import { defineTool } from "@usemcpkit/core";

export const projectsDeployResourcesCreateProjectsDeploymentsApproval = defineTool({
  name: "projects:deploy_resources:create_projects_deployments_approval",
  description: "Approve or reject a deployment. Approves or rejects a deployment.",
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
        description: "Status of the approval.",
        enum: ["approved", "rejected"],
      },
      comment: {
        type: "string",
        description: "Comment to go with the approval.",
      },
      represented_as: {
        type: "string",
        description:
          "Name of the user, group, or role to use for the approval when the user belongs to multiple approval rules.",
      },
    },
    required: ["id", "deployment_id", "status"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/deployments/{deployment_id}/approval",
    body: ["status", "comment", "represented_as"],
  },
});
