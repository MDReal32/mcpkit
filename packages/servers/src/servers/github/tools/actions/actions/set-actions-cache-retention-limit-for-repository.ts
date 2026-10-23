import { defineTool } from "@usemcpkit/core";

export const actionsActionsSetActionsCacheRetentionLimitForRepository = defineTool({
  name: "actions:actions:set_actions_cache_retention_limit_for_repository",
  description:
    "Set GitHub Actions cache retention limit for a repository. Sets GitHub Actions cache retention limit for a repository. This determines how long caches will be retained for, if not manually removed or evicted due to size constraints.",
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
      max_cache_retention_days: {
        type: "integer",
        description: "The maximum number of days to keep caches in this repository.",
      },
    },
    required: ["owner", "repo"],
  },
  request: {
    method: "PUT",
    path: "/repos/{owner}/{repo}/actions/cache/retention-limit",
    body: ["max_cache_retention_days"],
  },
});
