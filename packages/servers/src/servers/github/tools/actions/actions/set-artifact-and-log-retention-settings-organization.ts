import { defineTool } from "@usemcpkit/core";

export const actionsActionsSetArtifactAndLogRetentionSettingsOrganization = defineTool({
  name: "actions:actions:set_artifact_and_log_retention_settings_organization",
  description:
    "Set artifact and log retention settings for an organization. Sets retention settings for checks, workflow runs, commit statuses, artifacts, and logs for an organization.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      days: {
        type: "integer",
        description: "The number of days to retain checks, workflow runs, commit statuses, artifacts, and logs",
      },
    },
    required: ["org", "days"],
  },
  request: {
    method: "PUT",
    path: "/orgs/{org}/actions/permissions/artifact-and-log-retention",
    body: ["days"],
  },
});
