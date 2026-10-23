import { defineTool } from "@usemcpkit/core";

export const securitySecretScanningBulkDeleteRepoCustomPatterns = defineTool({
  name: "security:secret_scanning:bulk_delete_repo_custom_patterns",
  description: "Bulk delete repository custom patterns. Bulk deletes secret scanning custom patterns for a repository.",
  input: {
    type: "object",
    properties: {
      owner: {
        type: "string",
        description: "The account owner of the repository. The name is not case sensitive.",
      },
      repo: {
        type: "string",
        description: "The name of the repository without the `.git` extension. The name is not case sensitive.",
      },
      patterns: {
        type: "array",
        description: "The list of custom patterns to delete.",
        items: {
          type: "object",
          description: "A custom pattern to delete in a bulk operation.",
          properties: {
            pattern_id: {
              type: "integer",
              description: "The ID of the custom pattern to delete.",
            },
            custom_pattern_version: {
              type: "string",
              description:
                "The version of the entity. This is used to confirm you're updating the current version of the entity and mitigate unintentionally overriding someone else's update.",
            },
          },
          required: ["pattern_id"],
        },
      },
      post_delete_action: {
        type: "string",
        description:
          'What to do with alerts associated with the deleted patterns. `delete_alerts` permanently removes the alerts. `resolve_alerts` resolves the alerts as "pattern deleted". Defaults to `delete_alerts` when not specified.',
        default: "delete_alerts",
        enum: ["delete_alerts", "resolve_alerts"],
      },
    },
    required: ["owner", "repo", "patterns"],
  },
  request: {
    method: "DELETE",
    path: "/repos/{owner}/{repo}/secret-scanning/custom-patterns",
    body: ["patterns", "post_delete_action"],
  },
});
