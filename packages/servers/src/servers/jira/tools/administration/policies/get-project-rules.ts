import { defineTool } from "@usemcpkit/core";

export const administrationPoliciesGetProjectRules = defineTool({
  name: "administration:policies:get_project_rules",
  description: "Get project policy rules. Returns the configuration of the queried rule type IDs for a given project.",
  input: {
    type: "object",
    properties: {
      projectIdOrKey: {
        type: "string",
        description: "project ID or project key",
      },
      ruleTypeIds: {
        type: "string",
        description: "the set of rule type IDs to query (comma-separated)",
      },
    },
    required: ["projectIdOrKey"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/policies/project/{projectIdOrKey}/rules",
    query: ["ruleTypeIds"],
  },
});
