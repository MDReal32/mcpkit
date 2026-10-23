import { defineTool } from "@usemcpkit/core";

export const actionsActionsCreateRepoActionsPolicy = defineTool({
  name: "actions:actions:create_repo_actions_policy",
  description:
    "Create a repository Actions policy. Create an Actions policy for a repository. Omitting `workflow_path` targets all workflows without storing an explicit condition.",
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
      name: {
        type: "string",
        description: "The name of the policy.",
      },
      enforcement: {
        type: "string",
        description:
          "The enforcement level of the ruleset. `evaluate` allows admins to test rules before enforcing them. Admins can view insights on the Rule Insights page (`evaluate` is only available with GitHub Enterprise).",
        enum: ["disabled", "active", "evaluate"],
      },
      conditions: {
        type: "object",
        description:
          "Conditions for a repository Actions policy. The object may be empty to preserve or use the default workflow targeting, or contain only `workflow_path`.",
      },
      rules: {
        type: "array",
        description: "An array of rules within the policy.",
        items: {
          type: "object",
          description: "An actions rule.",
          properties: {
            type: {
              type: "string",
              enum: ["restrict_action_events"],
            },
            parameters: {
              type: "object",
            },
          },
          required: ["type"],
        },
      },
    },
    required: ["owner", "repo", "name", "enforcement"],
  },
  request: {
    method: "POST",
    path: "/repos/{owner}/{repo}/actions/policies",
    body: ["name", "enforcement", "conditions", "rules"],
  },
});
