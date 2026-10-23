import { defineTool } from "@usemcpkit/core";

export const administrationPoliciesValidatePolicyApplication = defineTool({
  name: "administration:policies:validate_policy_application",
  description:
    "Validate policy application to a project. Validates whether a set of policies can be applied to a project without actually applying them.",
  input: {
    type: "object",
    properties: {
      projectIdOrKey: {
        type: "string",
        description: "project ID or project key",
      },
      policyIds: {
        type: "array",
        items: {
          type: "string",
        },
      },
    },
    required: ["projectIdOrKey"],
  },
  request: {
    method: "POST",
    path: "/rest/api/2/policies/project/{projectIdOrKey}/validate",
    body: ["policyIds"],
  },
});
