import { defineTool } from "@usemcpkit/core";

export const orgsReposUpdateOrgRuleset = defineTool({
  name: "orgs:repos:update_org_ruleset",
  description: "Update an organization repository ruleset. Update a ruleset for an organization.",
  input: {
    type: "object",
    properties: {
      org: {
        type: "string",
        description: "The organization name. The name is not case sensitive.",
      },
      ruleset_id: {
        type: "integer",
        description: "The ID of the ruleset.",
      },
      name: {
        type: "string",
        description: "The name of the ruleset.",
      },
      target: {
        type: "string",
        description: "The target of the ruleset",
        enum: ["branch", "tag", "push", "repository"],
      },
      enforcement: {
        type: "string",
        description:
          "The enforcement level of the ruleset. `evaluate` allows admins to test rules before enforcing them. Admins can view insights on the Rule Insights page (`evaluate` is only available with GitHub Enterprise).",
        enum: ["disabled", "active", "evaluate"],
      },
      bypass_actors: {
        type: "array",
        description: "The actors that can bypass the rules in this ruleset",
        items: {
          type: "object",
          description: "An actor that can bypass rules in a ruleset",
          properties: {
            actor_id: {
              type: "integer",
              description:
                "The ID of the actor that can bypass a ruleset. Required for `Integration`, `RepositoryRole`, `Team`, and `User` actor types. If `actor_type` is `OrganizationAdmin`, `actor_id` is ignored. If `actor_type` is `DeployKey`, this should be null. `OrganizationAdmin` is not applicable for personal repositories.",
            },
            actor_type: {
              type: "string",
              description: "The type of actor that can bypass a ruleset.",
              enum: ["Integration", "OrganizationAdmin", "RepositoryRole", "Team", "DeployKey", "User"],
            },
            bypass_mode: {
              type: "string",
              description:
                "When the specified actor can bypass the ruleset. `pull_request` means that an actor can only bypass rules on pull requests. `pull_request` is not applicable for the `DeployKey` actor type. Also, `pull_request` is only applicable to branch rulesets. When `bypass_mode` is `exempt`, rules will not be run for that actor and a bypass audit entry will not be created.",
              default: "always",
              enum: ["always", "pull_request", "exempt"],
            },
          },
          required: ["actor_type"],
        },
      },
      conditions: {
        type: "object",
        description:
          "Conditions for an organization ruleset. The branch and tag rulesets conditions object should contain both `repository_name` and `ref_name` properties, or both `repository_id` and `ref_name` properties, or both `repository_property` and `ref_name` properties. The push rulesets conditions object does not require the `ref_name` property. For repository policy rulesets, the conditions object should o…",
      },
      rules: {
        type: "array",
        description: "An array of rules within the ruleset.",
        items: {
          type: "object",
          description: "A repository rule.",
          properties: {
            type: {
              type: "string",
              enum: ["copilot_code_review"],
            },
            parameters: {
              type: "object",
            },
          },
          required: ["type"],
        },
      },
    },
    required: ["org", "ruleset_id"],
  },
  request: {
    method: "PUT",
    path: "/orgs/{org}/rulesets/{ruleset_id}",
    body: ["name", "target", "enforcement", "bypass_actors", "conditions", "rules"],
  },
});
