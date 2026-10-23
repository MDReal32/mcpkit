import { defineTool } from "@usemcpkit/core";

export const actionsActionsSetAllowedActionsOrganization = defineTool({
  name: "actions:actions:set_allowed_actions_organization",
  description:
    'Set allowed actions and reusable workflows for an organization. Sets the actions and reusable workflows that are allowed in an organization. To use this endpoint, the organization permission policy for `allowed_actions` must be configured to `selected`. For more information, see "Set GitHub Actions permissions for an organization."',
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      github_owned_allowed: {
        type: "boolean",
        description:
          "Whether GitHub-owned actions are allowed. For example, this includes the actions in the `actions` organization.",
      },
      verified_allowed: {
        type: "boolean",
        description:
          "Whether actions from GitHub Marketplace verified creators are allowed. Set to `true` to allow all actions by GitHub Marketplace verified creators.",
      },
      patterns_allowed: {
        type: "array",
        description:
          "Specifies a list of string-matching patterns to allow specific action(s) and reusable workflow(s). Wildcards, tags, and SHAs are allowed. For example, `monalisa/octocat@*`, `monalisa/octocat@v2`, `monalisa/*`.",
        items: {
          type: "string",
        },
      },
    },
    required: ["org"],
  },
  request: {
    method: "PUT",
    path: "/orgs/{org}/actions/permissions/selected-actions",
    body: ["github_owned_allowed", "verified_allowed", "patterns_allowed"],
  },
});
