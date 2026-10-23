import { defineTool } from "@usemcpkit/core";

export const administrationPoliciesRemovePolicyFromProjects = defineTool({
  name: "administration:policies:remove_policy_from_projects",
  description:
    "Remove a policy from projects. Removes a policy from a set of projects. Handles partial results: each project is processed independently, and failures on individual projects do not prevent the operation from proceeding on the remaining projects.",
  input: {
    type: "object",
    properties: {
      policyId: {
        type: "string",
        description: "the policy ID to remove",
      },
      projectIds: {
        type: "array",
        items: {
          type: "integer",
        },
      },
    },
    required: ["policyId"],
  },
  request: {
    method: "POST",
    path: "/rest/api/2/policies/{policyId}/remove",
    body: ["projectIds"],
  },
});
