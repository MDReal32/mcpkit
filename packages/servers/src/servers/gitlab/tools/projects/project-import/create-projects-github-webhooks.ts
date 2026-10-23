import { defineTool } from "@usemcpkit/core";

export const projectsProjectImportCreateProjectsGithubWebhooks = defineTool({
  name: "projects:project_import:create_projects_github_webhooks",
  description:
    "Receive a GitHub webhook delivery for an OAuth-connected repository. Verifies the webhook signature and, once available, triggers repository reconciliation.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "integer",
        description: "The ID of the project",
      },
    },
    required: ["id"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/github/webhooks",
  },
});
