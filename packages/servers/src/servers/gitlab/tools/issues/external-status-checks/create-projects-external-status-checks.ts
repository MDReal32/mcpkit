import { defineTool } from "@usemcpkit/core";

export const issuesExternalStatusChecksCreateProjectsExternalStatusChecks = defineTool({
  name: "issues:external_status_checks:create_projects_external_status_checks",
  description:
    "Create external status check service. Creates an external status check service for a specified project.",
  input: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "ID or URL-encoded path of the project.",
      },
      name: {
        type: "string",
        description: "Display name of the external status check service.",
      },
      shared_secret: {
        type: "string",
        description: "HMAC secret for the external status check.",
      },
      external_url: {
        type: "string",
        description: "URL of the external status check service.",
      },
      protected_branch_ids: {
        type: "array",
        description: "IDs of protected branches to scope the rule by.",
        items: {
          type: "integer",
        },
      },
    },
    required: ["id", "name", "external_url"],
  },
  request: {
    method: "POST",
    path: "/projects/{id}/external_status_checks",
    body: ["name", "shared_secret", "external_url", "protected_branch_ids"],
  },
});
