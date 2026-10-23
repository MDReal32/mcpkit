import { defineTool } from "@usemcpkit/core";

export const securityDependabotUpdateRepositoryAccessForOrg = defineTool({
  name: "security:dependabot:update_repository_access_for_org",
  description:
    "Updates Dependabot's repository access list for an organization. Updates repositories according to the list of repositories that organization admins have given Dependabot access to when they've updated dependencies.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      repository_ids_to_add: {
        type: "array",
        description: "List of repository IDs to add.",
        items: {
          type: "integer",
        },
      },
      repository_ids_to_remove: {
        type: "array",
        description: "List of repository IDs to remove.",
        items: {
          type: "integer",
        },
      },
    },
    required: ["org"],
  },
  request: {
    method: "PATCH",
    path: "/orgs/{org}/dependabot/repository-access",
    body: ["repository_ids_to_add", "repository_ids_to_remove"],
  },
});
