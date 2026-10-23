import { defineTool } from "@usemcpkit/core";

export const administrationPoliciesGetPolicyState = defineTool({
  name: "administration:policies:get_policy_state",
  description: "Get project policy state. Returns the policies applied to a project.",
  input: {
    type: "object",
    properties: {
      projectIdOrKey: {
        type: "string",
        description: "project ID or project key",
      },
    },
    required: ["projectIdOrKey"],
  },
  request: {
    method: "GET",
    path: "/rest/api/2/policies/project/{projectIdOrKey}",
  },
});
