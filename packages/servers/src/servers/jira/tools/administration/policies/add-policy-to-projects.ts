import { defineTool } from "@usemcpkit/core";

export const administrationPoliciesAddPolicyToProjects = defineTool({
  name: "administration:policies:add_policy_to_projects",
  description:
    "Apply a policy to projects. Adds a policy to a set of projects. Handles partial results: each project is processed independently, and failures on individual projects do not prevent the operation from proceeding on the remaining projects.",
  input: {
    type: "object",
    properties: {
      policyId: {
        type: "string",
        description: "the policy ID to add",
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
    path: "/rest/api/2/policies/{policyId}/apply",
    body: ["projectIds"],
  },
});
