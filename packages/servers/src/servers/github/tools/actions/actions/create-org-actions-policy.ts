import { defineTool } from "@usemcpkit/core";

export const actionsActionsCreateOrgActionsPolicy = defineTool({
  name: "actions:actions:create_org_actions_policy",
  description:
    "Create an organization Actions policy. Create an Actions policy for an organization. Omitting `workflow_path` targets all workflows without storing an explicit condition.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
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
          "Conditions for an organization Actions policy. The conditions object should contain one of `repository_name`, `repository_id`, or `repository_property`, and may also contain `workflow_path`.",
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
    required: ["org", "name", "enforcement"],
  },
  request: {
    method: "POST",
    path: "/orgs/{org}/actions/policies",
    body: ["name", "enforcement", "conditions", "rules"],
  },
});
